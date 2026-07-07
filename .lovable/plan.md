# Instant Quote → Deposit Flow

## How data is saved today

Every completed 3‑step "Get My Garage Price" modal already creates one row in `floor_packets` (name, email, phone, garage size, color, price, visualization URL). You already have a row for **every** instant quote — perfect for marketing/follow‑up. We'll extend that same row when they click the deposit button instead of creating a second row.

Missing on the row today: **address** and **deposit status**. We'll add those.

---

## Copy changes

**Modal – Step 3** (`GaragePacketModal.tsx`)
- Remove the entire blue "We'll only text you about your quote / No spam, no sales calls…" block.

**Results page** (`GaragePacketResults.tsx`)
- "Estimated total investment" → **"Final measurements on day of install"**
- Button "Ready to Move Forward" → **"Make a $100 Deposit to Get Started"**
- Fine print below button → **"Fully refundable. Once the deposit is made, we'll reach out to you to answer questions and schedule your installation."**
- Post‑submit confirmation card (replaces "You're All Set") → **"You will receive a text shortly with a link to make your $100 deposit."**

---

## New deposit modal

Clicking "Make a $100 Deposit to Get Started" opens a new `DepositModal.tsx` that:
- Pre‑fills **Name, Email, Phone** from the loaded packet (editable in case of typos).
- Adds one new required field: **Installation Address**.
- Submit → calls a new `request_deposit` action on the `public-floor-packet` edge function with `{ id, address, name, email, phone }`.

The edge function updates the same `floor_packets` row (address, deposit_requested=true, deposit_requested_at=now, plus any edited contact fields) and fires the deposit webhook.

This captures the deposit **request** — actual $100 charging would be a separate Stripe integration if you want that later.

---

## Database changes

### `floor_packets` — new columns
- `address text`
- `deposit_requested boolean not null default false`
- `deposit_requested_at timestamptz`

### `webhook_settings` — new column
- `deposit_webhook_url text` — pre‑seeded to `https://hooks.zapier.com/hooks/catch/18144828/4u13zqg/`

### Update `floor_packets_guard_public_update` trigger
Allow anonymous updates (via edge function) to touch `address`, `deposit_requested`, and `deposit_requested_at` in addition to `ready_to_proceed`. Everything else stays locked.

### SQL migration (this is the "sequel script" you asked for)

```sql
-- 1. New columns on floor_packets
ALTER TABLE public.floor_packets
  ADD COLUMN IF NOT EXISTS address text,
  ADD COLUMN IF NOT EXISTS deposit_requested boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS deposit_requested_at timestamptz;

-- 2. New webhook URL column, pre-seeded with your Zapier URL
ALTER TABLE public.webhook_settings
  ADD COLUMN IF NOT EXISTS deposit_webhook_url text;

UPDATE public.webhook_settings
   SET deposit_webhook_url = 'https://hooks.zapier.com/hooks/catch/18144828/4u13zqg/'
 WHERE id = 1;

-- 3. Replace guard trigger so edge function can also set address + deposit fields
CREATE OR REPLACE FUNCTION public.floor_packets_guard_public_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Authenticated admins may change anything
  IF auth.role() = 'authenticated' AND public.has_role(auth.uid(), 'admin') THEN
    RETURN NEW;
  END IF;

  -- Anonymous callers: block changes to protected columns
  IF NEW.name              IS DISTINCT FROM OLD.name              OR
     NEW.email             IS DISTINCT FROM OLD.email             OR
     NEW.phone             IS DISTINCT FROM OLD.phone             OR
     NEW.garage_type       IS DISTINCT FROM OLD.garage_type       OR
     NEW.estimated_price   IS DISTINCT FROM OLD.estimated_price   OR
     NEW.visualization_url IS DISTINCT FROM OLD.visualization_url OR
     NEW.selected_color    IS DISTINCT FROM OLD.selected_color    OR
     NEW.additional_spaces IS DISTINCT FROM OLD.additional_spaces OR
     NEW.custom_sqft       IS DISTINCT FROM OLD.custom_sqft       OR
     NEW.created_at        IS DISTINCT FROM OLD.created_at        THEN
    RAISE EXCEPTION 'Only ready_to_proceed, address, and deposit fields may be modified by anonymous users';
  END IF;

  -- ready_to_proceed may only flip to true
  IF NEW.ready_to_proceed IS DISTINCT FROM OLD.ready_to_proceed
     AND NEW.ready_to_proceed IS NOT TRUE THEN
    RAISE EXCEPTION 'ready_to_proceed may only be set to true';
  END IF;

  -- deposit_requested may only flip to true
  IF NEW.deposit_requested IS DISTINCT FROM OLD.deposit_requested
     AND NEW.deposit_requested IS NOT TRUE THEN
    RAISE EXCEPTION 'deposit_requested may only be set to true';
  END IF;

  RETURN NEW;
END;
$$;
```

Contact‑field edits from the deposit modal go through the edge function using the service role, so they bypass this trigger (which is intentional — the trigger only restricts anonymous direct writes).

---

## Webhooks (two of them, exactly as you described)

**1. Instant quote submitted → Slack notification**
Already wired: `send-floor-packet-webhook` fires on every packet creation and POSTs to `webhook_settings.floor_packet_webhook_url`. Paste your Slack‑notification Zap URL into the "Floor Packet Webhook URL" field in the admin **Webhooks** tab.

**2. Deposit requested → Jobber quote creation**
New edge function `send-deposit-webhook` that POSTs the full lead payload (id, name, email, phone, address, garage_type, custom_sqft, selected_color, estimated_price, visualization_url, deposit_requested_at, results_page_url) to `webhook_settings.deposit_webhook_url` (pre‑seeded above to `https://hooks.zapier.com/hooks/catch/18144828/4u13zqg/`).

The admin **Webhooks** tab (`WebhooksTab.tsx`) gets a third input for **Deposit Webhook URL** so you can change it later without SQL.

---

## Technical checklist

Frontend
- `src/components/packet/GaragePacketModal.tsx` — remove step‑3 blue notice block.
- `src/pages/GaragePacketResults.tsx` — copy edits; replace `handleReadyToProceed` with opening `DepositModal`.
- `src/components/packet/DepositModal.tsx` — new file (name, email, phone prefilled + required address).
- `src/components/admin/WebhooksTab.tsx` — add Deposit Webhook URL input.

Backend
- Migration above.
- `supabase/functions/public-floor-packet/index.ts` — add `request_deposit` action that validates id + address, updates row, then invokes `send-deposit-webhook` (non‑blocking).
- `supabase/functions/send-deposit-webhook/index.ts` — new function, mirrors `send-floor-packet-webhook`, reads `deposit_webhook_url`.
