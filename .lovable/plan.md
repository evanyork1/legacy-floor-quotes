## Security Hardening Plan

Lock down PII, prevent unauthorized writes, and disable open signup. No data is deleted; only RLS policies and a few frontend files change.

### 1. Database RLS migration (schema-only changes to policies)

**`Lead Form Subissions`** — Currently `SELECT USING (true)` exposes every lead's name/email/phone publicly.
- Drop "Admins can view all leads" (misnamed, it's actually public)
- Add: `SELECT` restricted to `has_role(auth.uid(), 'admin')`
- Keep public `INSERT` (needed for the form)

**`quotes`** and **`dfwquotes`** — Same problem (public SELECT exposes customer PII).
- Drop the public-read SELECT policies
- Keep authenticated/admin SELECT and public INSERT

**`floor_packets`** — Public SELECT + public UPDATE exposes customer contact info and lets anyone tamper.
- Drop "Anyone can read floor packets" and "Anyone can update ready_to_proceed"
- Keep public INSERT (form submission)
- Keep authenticated SELECT for admins
- Add a narrow public UPDATE policy *only* for `ready_to_proceed` if needed by the public results page (will verify usage in `PacketResultsPage` before deciding; otherwise route the update through an edge function)

**`gallery_photos`** — Public INSERT/UPDATE/DELETE allows vandalism.
- Drop "Allow public gallery photo uploads/updates/deletes"
- Keep public SELECT (gallery is meant to be visible)
- Keep "Allow admin access to manage gallery photos" (authenticated only)

**`sales_presentations`** — `UPDATE USING (true)` lets anyone overwrite signed contracts.
- Replace "Anyone can sign presentations" with a tighter policy: only allow updating signature fields (`signature_data`, `signed_at`, `agreement_accepted`, `status`) on rows where `signed_at IS NULL`. Implement via a `BEFORE UPDATE` trigger that rejects edits to other columns when the caller is anonymous.
- Keep "Anyone can view presentations by ID" (needed for shared links)

**`commercial_submissions`**, **`giveaway`**, **`visualizer_analytics`**, **`webhook_settings`**, **`location_pricing`**, **`pricing_settings`** — already restrict SELECT to `authenticated`. Tighten further to `has_role(... ,'admin')` where appropriate (webhook_settings, pricing tables) so non-admin reps can't read webhook URLs or change pricing.

### 2. Frontend changes

**`src/pages/Auth.tsx`**
- Remove the "Sign Up" tab entirely. New reps must be added via `pending_invites` (admin-only), then they sign in.
- Remove the hardcoded `evan@licoat.com` admin check. Replace with a `has_role` query against `user_roles` after sign-in.

**`src/pages/SalesDashboard.tsx`**
- Remove hardcoded admin email check. Use `user_roles` lookup (same `useUserRole` hook pattern already used elsewhere) to gate admin UI.

### 3. Manual steps for the user (Supabase Dashboard)

I'll provide direct links after the migration runs:
- Shorten OTP expiry to ≤ 1 hour
- Enable "Leaked password protection"
- Confirm email auto-confirm setting matches your invite flow

### Files to be edited
- New SQL migration (RLS policy updates + sales_presentations trigger)
- `src/pages/Auth.tsx`
- `src/pages/SalesDashboard.tsx`

### What will NOT change
- No tables dropped, no columns removed, no data deleted
- No changes to `auth.*`, `storage.*`, or other reserved schemas
- Public-facing forms (lead, quote, DFW quote, floor packet, commercial, giveaway) continue to accept submissions anonymously
- Public gallery viewing, public presentation viewing by link, and public pricing reads continue to work
