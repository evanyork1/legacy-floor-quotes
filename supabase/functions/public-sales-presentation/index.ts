// Public proxy for sales_presentations so a client can open a shareable
// presentation link, mark it viewed, and sign it — without giving anonymous
// users full SELECT/UPDATE access to the table via RLS.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const ALLOWED_PACKAGES = new Set(["silver", "gold", "platinum"]);

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
        .from("sales_presentations")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) return json({ error: "Lookup failed" }, 500);
      if (!data) return json({ error: "Not found" }, 404);
      return json({ data });
    }

    if (action === "mark_viewed") {
      const { data: existing } = await supabase
        .from("sales_presentations")
        .select("status")
        .eq("id", id)
        .maybeSingle();
      if (!existing) return json({ error: "Not found" }, 404);
      if (existing.status === "pending") {
        await supabase
          .from("sales_presentations")
          .update({ status: "viewed" })
          .eq("id", id);
      }
      return json({ ok: true });
    }

    if (action === "sign") {
      const selectedPackage = String(body.selected_package || "");
      const depositAmount = Number(body.selected_deposit_amount);
      const signature = String(body.signature_data || "");
      if (!ALLOWED_PACKAGES.has(selectedPackage)) {
        return json({ error: "Invalid package" }, 400);
      }
      if (!Number.isFinite(depositAmount) || depositAmount < 0) {
        return json({ error: "Invalid deposit amount" }, 400);
      }
      if (!signature.startsWith("data:image/") || signature.length > 500_000) {
        return json({ error: "Invalid signature" }, 400);
      }

      const { data: existing } = await supabase
        .from("sales_presentations")
        .select("signed_at")
        .eq("id", id)
        .maybeSingle();
      if (!existing) return json({ error: "Not found" }, 404);
      if (existing.signed_at) {
        return json({ error: "Already signed" }, 409);
      }

      const { error } = await supabase
        .from("sales_presentations")
        .update({
          selected_package: selectedPackage,
          selected_deposit_amount: depositAmount,
          signature_data: signature,
          signed_at: new Date().toISOString(),
          agreement_accepted: true,
          status: "signed",
        })
        .eq("id", id);
      if (error) return json({ error: "Sign failed" }, 500);
      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    console.error("public-sales-presentation error", e);
    return json({ error: "Server error" }, 500);
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
