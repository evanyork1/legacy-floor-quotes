// Scheduled Jobber token keep-alive. Called by pg_cron every 12h via pg_net.
// Gated by x-cron-secret header matching JOBBER_CRON_SECRET.
// Also refreshes on-demand from the frontend (admin-gated via RLS-checked caller).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cron-secret",
};

const JOBBER_TOKEN_URL = "https://api.getjobber.com/api/oauth/token";

function getSupabase() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function refreshAndPersist() {
  const supabase = getSupabase();
  const clientId = Deno.env.get("JOBBER_CLIENT_ID");
  const clientSecret = Deno.env.get("JOBBER_CLIENT_SECRET");
  if (!clientId || !clientSecret) return { ok: false, reason: "missing_creds" };

  const { data: rows, error } = await supabase
    .from("jobber_tokens")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);
  if (error || !rows?.length) return { ok: false, reason: "no_tokens" };
  const row = rows[0];

  const res = await fetch(JOBBER_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: row.refresh_token,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Jobber refresh HTTP failed", res.status, text);
    return { ok: false, reason: "refresh_http_failed", status: res.status, body: text };
  }

  const tokens = await res.json();
  if (!tokens?.access_token || !tokens?.refresh_token) {
    return { ok: false, reason: "malformed_response", body: tokens };
  }

  const expiresAt = new Date(Date.now() + (tokens.expires_in || 3600) * 1000).toISOString();

  // Retry the DB write up to 3x with backoff — if this ever silently fails
  // we've already burned the old refresh token and would lose the connection.
  let writeErr: unknown = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const { error: upErr } = await supabase
      .from("jobber_tokens")
      .update({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: expiresAt,
      })
      .eq("id", row.id);
    if (!upErr) {
      writeErr = null;
      break;
    }
    writeErr = upErr;
    console.error(`jobber_tokens update failed (attempt ${attempt}):`, upErr);
    await new Promise((r) => setTimeout(r, 250 * attempt));
  }

  if (writeErr) {
    // Safety net: preserve the freshly-rotated refresh token so an admin can restore it.
    await supabase.from("jobber_token_recovery").insert({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: expiresAt,
      reason: "token_write_failed_after_refresh",
    });
    return { ok: false, reason: "write_failed_recovery_saved" };
  }

  return { ok: true, expires_at: expiresAt };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const cronSecret = Deno.env.get("JOBBER_CRON_SECRET");
  const provided = req.headers.get("x-cron-secret");

  // If a cron secret is supplied it must match; if none is supplied, require an auth header
  // (edge function verify_jwt gate + admin-only surface handles user auth).
  if (provided) {
    if (!cronSecret || provided !== cronSecret) {
      return json({ error: "unauthorized" }, 401);
    }
  } else if (!req.headers.get("authorization")) {
    return json({ error: "unauthorized" }, 401);
  }

  const result = await refreshAndPersist();
  return json(result, result.ok ? 200 : 500);
});
