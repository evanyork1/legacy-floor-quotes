## Goal
Fix the two Supabase edge functions so both Zapier webhooks actually fire. No triggers, no DB webhooks — the frontend calls the edge functions (as it already does), and the edge functions POST to Zapier.

## Root cause of current failure
- `send-floor-packet-webhook` reads `webhook_settings.floor_packet_webhook_url` from the DB. That column is `NULL`, so the function logs "No floor packet webhook URL configured" and returns 200 without ever calling Zapier.
- `send-deposit-webhook` happens to work only because `deposit_webhook_url` is populated in the same table. Same fragile pattern.

## Fix
1. **Store Zapier URLs as Supabase secrets** (single source of truth, no DB row that can silently be NULL):
   - `FLOOR_PACKET_WEBHOOK_URL` — new-lead Zap (user pastes)
   - `DEPOSIT_WEBHOOK_URL` — deposit Zap (user confirms reuse or pastes)

2. **Rewrite `supabase/functions/send-floor-packet-webhook/index.ts`:**
   - Delete the `webhook_settings` lookup.
   - Read `Deno.env.get('FLOOR_PACKET_WEBHOOK_URL')`.
   - Build the same payload it builds today (id, name, email, phone, garage_type, custom_sqft, selected_color, estimated_price, visualization_url, results_page_url, event_type `floor_packet_submitted`, timestamp).
   - POST to Zapier. Return 200 with the Zapier response status.
   - Use production domain (user-provided) for `results_page_url`.

3. **Rewrite `supabase/functions/send-deposit-webhook/index.ts`:**
   - Delete the `webhook_settings` lookup.
   - Read `Deno.env.get('DEPOSIT_WEBHOOK_URL')`.
   - Same payload shape as today (adds address + `deposit_requested_at`, event_type `deposit_requested`).
   - POST to Zapier. Return 200 with the Zapier response status.
   - Use production domain for `results_page_url`.

4. **Leave the frontend alone.** It already invokes:
   - `send-floor-packet-webhook` from `InlineGaragePacket.tsx` after the packet is created.
   - `send-deposit-webhook` from `public-floor-packet` when `request_deposit` marks the column true.
   Nothing changes there.

5. **Leave `webhook_settings` table and Admin > Webhooks tab as-is.** They still power other legacy webhooks (lead, DFW). Out of scope for this fix.

## Verification after deploy
- Submit a test packet on the live domain → check Zapier "new lead" Zap history for a fired run.
- Click "$100 deposit" on the results page → check Zapier "deposit" Zap history for a fired run.
- If either fails, pull edge function logs (I'll link them) to see the exact response from Zapier.

## What I need from you before build mode
1. **New-lead Zapier Catch Hook URL** (Zap → Trigger step → copy the custom webhook URL).
2. **Deposit URL** — reuse `https://hooks.zapier.com/hooks/catch/18144828/4u13zqg/` or provide a new one?
3. **Production domain** for `results_page_url` (e.g. `https://yourdomain.com`).

## Technical notes
- Both edge functions already have `verify_jwt = false` in `supabase/config.toml` — no config change needed.
- Edge functions auto-deploy to your connected Supabase project when I save the files. No manual step.
- Secrets are added via a secure form; you paste values once, they're available as `Deno.env.get(...)` in the functions.
