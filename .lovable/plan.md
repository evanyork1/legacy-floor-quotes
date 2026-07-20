## Root cause of the recurring disconnects

Jobber uses **rotating refresh tokens**. Every time we exchange the refresh token for a new access token, Jobber issues a *new* refresh token and invalidates the old one. Two things break this in the current setup:

1. **No proactive refresh.** Tokens only refresh when a packet is submitted. If a week passes with no submissions (or all submissions hit some other error before the refresh path), the refresh token ages out and Jobber revokes it.
2. **Refresh-and-save is not atomic.** If `jobber-api` refreshes successfully but the `UPDATE jobber_tokens` write fails (network blip, RLS quirk, function timeout), Jobber has already rotated the token — the old one is dead, the new one was never saved, and the row is permanently broken. This matches what happened: the row is now empty/unusable.

## Permanent fix

### 1. Keep-alive cron (the main fix)
Add a scheduled job that refreshes the Jobber token every 12 hours regardless of user activity. Jobber's refresh tokens last ~60 days of inactivity, so refreshing twice a day keeps the chain alive indefinitely.

- Enable `pg_cron` and `pg_net` extensions (already needed for other scheduled work).
- New edge function `jobber-token-refresh` (verify_jwt = false, called only by cron with a shared secret header): reads current row, calls Jobber `/api/oauth/token` with `grant_type=refresh_token`, writes new tokens in a transaction, logs result.
- Cron schedule: `0 */12 * * *` (twice daily).
- Store the cron shared secret via `generate_secret` as `JOBBER_CRON_SECRET`.

### 2. Atomic refresh-and-save + retry
In `jobber-api` (and the new refresh function):
- Wrap the token refresh + DB write so a failed write triggers an immediate retry (up to 3x with backoff) before returning.
- If all retries fail, log the raw new refresh token to a new `jobber_token_recovery` table (admin-only RLS) so it can be manually restored instead of lost.

### 3. Failure visibility
- New table `jobber_sync_failures` (packet_id, error, created_at, admin-only RLS).
- On any Jobber sync failure in `jobber-quote-from-packet`, write a row before returning.
- Red banner on `/sales-dashboard` when rows exist in the last 7 days: "N packets failed to sync to Jobber — click to retry."
- Each row has a **Retry** button that re-invokes `jobber-quote-from-packet` with the stored `packet_id`.

### 4. Live connection health on `/sales-dashboard`
- `JobberStatus` polls every 60s (not just on mount).
- Turns **red** when `jobber_tokens` is empty or `expires_at` is in the past.
- Shows "Last refreshed: X min ago" pulled from the token row's `updated_at`.

### 5. Backfill the missed leads (one-time)
After reconnect, run a script that iterates every `floor_packets` row from the last 30 days where `jobber_client_id IS NULL` and calls `jobber-quote-from-packet` for each. Exposed as an admin-only button on `/sales-dashboard`: "Backfill missed Jobber leads (last 30 days)".

## Technical details

- **Migrations:** create `jobber_sync_failures` and `jobber_token_recovery` (both admin-only RLS + service_role writes); enable `pg_cron` / `pg_net`; schedule the cron job.
- **New edge function** `jobber-token-refresh` deployed with `verify_jwt = false` and gated by header `x-cron-secret === JOBBER_CRON_SECRET`.
- **`jobber-api` change:** extract token-refresh into a helper `refreshAndPersist()` with retry logic; reuse from both the API function and the cron function.
- **Frontend:** update `JobberStatus.tsx` for polling + red state + last-refresh label; add banner + backfill button on `SalesDashboard.tsx`.
- **No changes** to the packet submission flow itself — it stays fire-and-forget.

## Verification

1. **Cron works:** wait 12h (or trigger manually), confirm `jobber_tokens.updated_at` advances and `expires_at` moves forward.
2. **Atomicity:** simulate a DB write failure (temporarily break the update path in a dev branch), confirm a row lands in `jobber_token_recovery` with the new refresh token instead of being lost.
3. **Sync failure surfaces:** delete the tokens row, submit a test packet, confirm `jobber_sync_failures` gets a row and the red banner appears on `/sales-dashboard`.
4. **Backfill:** submit a packet while disconnected, reconnect, click **Backfill missed Jobber leads**, confirm the packet gets `jobber_client_id` and `jobber_quote_id` populated and appears in Jobber with the $100 deposit and Awaiting Response status.

## What you still need to do once

Reconnect Jobber one final time via `/sales-dashboard` → **Connect to Jobber**. From that point on, the cron keeps it alive and the safeguards prevent silent loss.
