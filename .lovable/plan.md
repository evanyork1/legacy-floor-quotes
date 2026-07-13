
## Goal
When a user clicks "See My Garage Price" on step 3 of `InlineGaragePacket` (the `/garage-packet-page` flow):
1. Create a Jobber client with contact info + **ZIP only**
2. Create a Jobber quote for that client with color/size/price and a **$100 required deposit**
3. Auto-send the quote (`AWAITING_RESPONSE`) so Jobber emails the client the Client Hub link

Later, when the user clicks the deposit button on the packet results page and enters their full street address, we update the Jobber client's billing address / property with the full info.

Existing `public-floor-packet` DB save + navigation to results page stays unchanged. Jobber sync runs in parallel and never blocks the user.

## Changes

### 1. `src/components/packet/InlineGaragePacket.tsx`
- Add `zip` field to `FormData` and step 3 (below Phone Number, labeled "ZIP Code").
- Small gray helper text below it: **"We collect this for drive time estimations."**
- ZIP is required (5 digits) to submit.
- After the existing `public-floor-packet` invoke succeeds, fire-and-forget invoke of a new `jobber-quote-from-packet` edge function. Do NOT await — user navigates immediately.

### 2. New edge function `supabase/functions/jobber-quote-from-packet/index.ts`
Reuses token logic from existing `jobber-api` (auto-refresh on 401). Steps:
1. Split `name` into firstName / lastName.
2. `clientCreate` with email, phone, and `billingAddress { postalCode }` (ZIP only — Jobber accepts this; a property is auto-created).
3. Read the created client's `properties.nodes[0].id`.
4. `quoteCreate`:
   - `clientId`, `propertyId`
   - `title`: "Garage Floor Coating — {color} — {size}"
   - `message`: color, sqft, estimated price summary
   - `lineItems`: one item, "Polyurea Garage Floor Coating", quantity 1, `unitPrice = estimated_price`, `saveToProductsAndServices: false`
   - `depositAmount: 100`
5. If Jobber rejects `depositAmount` on create, retry create without it then `quoteEdit` to set `depositAmount: 100`.
6. `quoteStatusChange` → `AWAITING_RESPONSE` so Jobber emails the client.
7. Update `floor_packets` row with `jobber_client_id`, `jobber_property_id`, `jobber_quote_id`, `jobber_quote_url`.

### 3. Existing deposit flow (`DepositModal.tsx` + `send-deposit-webhook`)
When the customer submits their full address in the deposit modal on the results page, additionally invoke a small update path (added to the same `jobber-quote-from-packet` function with `action: "updateAddress"`, or a lightweight new function) that:
- Reads `jobber_client_id` from the `floor_packets` row.
- Runs a `clientEdit` mutation with the full `billingAddress { street1, city, province, postalCode }`.
- Runs a `propertyEdit` on the stored `jobber_property_id` with the same address so the quote's property reflects it.

If either ID is missing (Jobber sync never happened), skip silently.

### 4. Migration
Add nullable columns to `floor_packets`:
- `jobber_client_id text`
- `jobber_property_id text`
- `jobber_quote_id text`
- `jobber_quote_url text`

## Non-goals
- No changes to older Houston/DFW quote form.
- No retry UI. Jobber failures are logged (edge function logs) — push manually if needed.
- Jobber must already be connected via OAuth. If disconnected, the function logs and exits silently.

## Technical notes
- `JOBBER_CLIENT_ID` / `JOBBER_CLIENT_SECRET` already configured.
- GraphQL API version `2025-01-20`, matching the existing `jobber-api` function.
- New edge function inherits `verify_jwt = false` default (public, no auth — called from the browser like `public-floor-packet`).
