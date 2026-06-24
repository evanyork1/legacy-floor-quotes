// Public proxy for floor_packets so the customer-facing report page can read
// and update specific rows by ID without exposing the whole table via RLS.
// Validates the action and limits which columns may be written.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const ALLOWED_COLORS = new Set<string>([
  // Allow any non-empty string up to 100 chars; color list lives in client.
]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return json({ error: "Invalid body" }, 400);
    }

    const action = String(body.action || "");
    const id = String(body.id || "");
    if (!UUID_RE.test(id)) {
      return json({ error: "Invalid id" }, 400);
    }

    if (action === "get") {
      const { data, error } = await supabase
        .from("floor_packets")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) return json({ error: "Lookup failed" }, 500);
      if (!data) return json({ error: "Not found" }, 404);
      return json({ data });
    }

    if (action === "update_color") {
      const color = String(body.selected_color || "");
      if (!color || color.length > 100) {
        return json({ error: "Invalid color" }, 400);
      }
      const { error } = await supabase
        .from("floor_packets")
        .update({ selected_color: color })
        .eq("id", id);
      if (error) return json({ error: "Update failed" }, 500);
      return json({ ok: true });
    }

    if (action === "confirm_ready") {
      // Only allow setting true, and only on rows where it is currently false.
      const { data: existing, error: readErr } = await supabase
        .from("floor_packets")
        .select("ready_to_proceed")
        .eq("id", id)
        .maybeSingle();
      if (readErr || !existing) return json({ error: "Not found" }, 404);
      if (existing.ready_to_proceed) {
        return json({ ok: true, alreadyConfirmed: true });
      }
      const { error } = await supabase
        .from("floor_packets")
        .update({ ready_to_proceed: true })
        .eq("id", id);
      if (error) return json({ error: "Update failed" }, 500);
      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    console.error("public-floor-packet error", e);
    return json({ error: "Server error" }, 500);
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
