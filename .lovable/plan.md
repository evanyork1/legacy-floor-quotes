## Problem

Clicking "Get My Free Report" fails with a Postgres RLS/permission error (code 42501) on `floor_packets`. Two root causes:

1. The `floor_packets` table has **no table-level GRANTs** for `anon`/`authenticated`, so PostgREST rejects the INSERT before RLS even runs.
2. Even if INSERT succeeded, `.insert(...).select().single()` needs SELECT — but the only SELECT policy is admin-only, so the returned row would be filtered out and `.single()` would throw.

## Fix

**1. Add a `create` action to the existing `public-floor-packet` edge function** (already uses the service role, already the pattern used by the results page):

- Validates `name`, `email`, `phone` (non-empty), `garage_type`, optional `custom_sqft`, `selected_color`, `visualization_url`.
- Inserts the row via service role (bypasses RLS) and returns the new `id`.

**2. Update `src/components/packet/GaragePacketModal.tsx`** `handleSubmit`:

- Replace the direct `supabase.from('floor_packets').insert(...)` call with `supabase.functions.invoke('public-floor-packet', { body: { action: 'create', ...fields } })`.
- Use the returned `id` to navigate to `/garage-packet-result/:id` and to trigger the existing `send-floor-packet-webhook`.

No DB migration required — service role bypasses the missing grants and RLS. Table stays locked down (admin-only reads), matching the existing security posture.

## Files

- `supabase/functions/public-floor-packet/index.ts` — add `create` action.
- `src/components/packet/GaragePacketModal.tsx` — swap insert for edge function call.

## Verification

- Fill out packet flow end-to-end in preview, confirm redirect to `/garage-packet-result/:id` and that the results page loads the new row.
- Check edge function logs for the `create` call.
