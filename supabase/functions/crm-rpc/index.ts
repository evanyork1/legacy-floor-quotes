// Edge function proxy for the four SECURITY DEFINER RPCs that were previously
// callable directly from the browser. Moving them behind this proxy lets us
// revoke EXECUTE from `authenticated` (so they're no longer in the exposed
// PostgREST surface for signed-in users) while still letting the CRM and
// sales dashboards aggregate across users.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Authenticate the caller using the user's JWT.
    const authHeader = req.headers.get("Authorization") || "";
    const jwt = authHeader.replace(/^Bearer\s+/i, "");
    if (!jwt) return json({ error: "Unauthorized" }, 401);

    const authedClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: `Bearer ${jwt}` } } }
    );
    const { data: userResult } = await authedClient.auth.getUser();
    if (!userResult?.user) return json({ error: "Unauthorized" }, 401);

    // Use service role for the actual RPC call (EXECUTE was revoked from
    // authenticated so the user's JWT can no longer invoke these directly).
    const service = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return json({ error: "Invalid body" }, 400);
    const action = String(body.action || "");

    if (action === "check_duplicate_lead") {
      const phone = body.check_phone == null ? "" : String(body.check_phone);
      const email = body.check_email == null ? "" : String(body.check_email);
      if (phone.length > 50 || email.length > 320) {
        return json({ error: "Input too long" }, 400);
      }
      const { data, error } = await service.rpc("check_duplicate_lead", {
        check_phone: phone,
        check_email: email,
      });
      if (error) return json({ error: error.message }, 500);
      return json({ data });
    }

    if (
      action === "get_prospecting_leaderboard" ||
      action === "get_sales_leaderboard" ||
      action === "get_crm_leaderboard"
    ) {
      const startKey = action === "get_sales_leaderboard" ? "month_start" :
                       action === "get_crm_leaderboard" ? "start_date" : "week_start";
      const endKey   = action === "get_sales_leaderboard" ? "month_end" :
                       action === "get_crm_leaderboard" ? "end_date" : "week_end";

      const start = String(body[startKey] || "");
      const end = String(body[endKey] || "");
      if (!DATE_RE.test(start) || !DATE_RE.test(end)) {
        return json({ error: "Invalid date" }, 400);
      }
      const { data, error } = await service.rpc(action, {
        [startKey]: start,
        [endKey]: end,
      });
      if (error) return json({ error: error.message }, 500);
      return json({ data });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    console.error("crm-rpc error", e);
    return json({ error: "Server error" }, 500);
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
