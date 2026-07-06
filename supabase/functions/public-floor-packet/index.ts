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

    if (action === "create") {
      const name = String(body.name || "").trim();
      const email = String(body.email || "").trim();
      const phone = String(body.phone || "").trim();
      const garage_type = String(body.garage_type || "").trim();
      if (!name || !email || !phone || !garage_type) {
        return json({ error: "Missing required fields" }, 400);
      }
      if (name.length > 200 || email.length > 200 || phone.length > 50 || garage_type.length > 50) {
        return json({ error: "Field too long" }, 400);
      }
      const selected_color = body.selected_color ? String(body.selected_color).slice(0, 100) : null;
      const visualization_url = body.visualization_url ? String(body.visualization_url).slice(0, 2000) : null;
      const custom_sqft = body.custom_sqft != null && body.custom_sqft !== ""
        ? Number(body.custom_sqft) : null;
      const estimated_price = body.estimated_price != null ? Number(body.estimated_price) : null;

      const { data, error } = await supabase
        .from("floor_packets")
        .insert({
          name,
          email,
          phone,
          garage_type,
          custom_sqft: Number.isFinite(custom_sqft as number) ? custom_sqft : null,
          selected_color,
          visualization_url,
          estimated_price: Number.isFinite(estimated_price as number) ? estimated_price : null,
        })
        .select("id")
        .single();
      if (error) {
        console.error("create floor_packet error", error);
        return json({ error: "Create failed" }, 500);
      }
      return json({ id: data.id });
    }

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
