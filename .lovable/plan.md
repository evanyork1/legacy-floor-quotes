## What's actually happening (plain English)

The browser has to call **something** on Supabase to save the lead and to make Zapier fire — it can't just talk to Postgres directly for anonymous public users. So there are two edge functions doing two different jobs:

- **`public-floor-packet`** — the "database gate." When a visitor fills out the form or clicks the $100 deposit button, the browser calls this one function. It writes the row (or updates the deposit column) in the `floor_packets` table on your behalf. This exists because the table is locked down (RLS) — the browser cannot write to it directly.
- **`send-floor-packet-webhook`** — the "Zapier caller" for new leads. It POSTs to your `FLOOR_PACKET_WEBHOOK_URL` Zap.
- **`send-deposit-webhook`** — the "Zapier caller" for the deposit click. It POSTs to your `DEPOSIT_WEBHOOK_URL` Zap.

So you're right that the current setup is messy: the **browser** is calling both `public-floor-packet` AND `send-floor-packet-webhook` on submit. That's why you're seeing weird double-fire behavior. The browser should only ever call ONE thing, and Supabase should handle the rest internally.

## What I want to change

Make the front end dumb. It calls exactly one edge function per user action, and that edge function handles both the DB write and the Zapier call server-side.

### Front-end (browser) calls — after this change

| User action | Browser calls | That's it |
|---|---|---|
| Submits "Get My Garage Price" | `public-floor-packet` (action: `create`) | ✅ |
| Clicks "$100 Deposit" | `public-floor-packet` (action: `request_deposit`) | ✅ |

No more `send-floor-packet-webhook` or `send-deposit-webhook` calls from the browser. Ever.

### Server-side (inside `public-floor-packet`)

- On `create`: insert row → invoke `send-floor-packet-webhook` in the background → return the new ID to the browser immediately.
- On `request_deposit`: update the row → invoke `send-deposit-webhook` in the background → return success.

The two webhook functions stay exactly as they are (they're already correct and read the right secrets). We just stop calling them from the browser.

### Files touched

1. `src/components/packet/InlineGaragePacket.tsx` — remove the `send-floor-packet-webhook` call. Only call `public-floor-packet`.
2. `src/components/packet/GaragePacketModal.tsx` — same cleanup (also calls the webhook directly today).
3. `src/components/packet/DepositModal.tsx` — already only calls `public-floor-packet`, no change needed.
4. `supabase/functions/public-floor-packet/index.ts` — on `create`, fire `send-floor-packet-webhook` server-side using `EdgeRuntime.waitUntil(...)` so it doesn't slow down the response. Deposit branch already does this — leave it alone.

### About the "blank then full" webhook you saw

That was almost certainly the browser firing `send-floor-packet-webhook` twice (once from `InlineGaragePacket`, once from `GaragePacketModal` on some paths, or React strict-mode double-invocation in dev). Once the browser stops calling webhooks directly, this goes away.

### About the wrong-Zap-fired issue

Still worth checking that `FLOOR_PACKET_WEBHOOK_URL` and `DEPOSIT_WEBHOOK_URL` are not swapped in Supabase secrets. That's a 30-second visual check in the dashboard, no code change needed. I'll flag it after the code cleanup so we can test end-to-end and see which Zap actually receives which event.

### Verification after the change

1. Submit the packet form → confirm ONE row appears in `floor_packets`, ONE hit to the lead Zap, zero hits to the deposit Zap.
2. Click $100 deposit → confirm the row updates, ONE hit to the deposit Zap, zero hits to the lead Zap.
3. If the wrong Zap fires for an event, the secrets are swapped — fix in the Supabase dashboard.