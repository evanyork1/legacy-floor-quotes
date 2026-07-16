## Fix: attach UTM tracking to the actual commercial-form table (`Lead Form Subissions`)

You're right — the Commercial page's contact form (`src/components/landing/LeadForm.tsx`, embedded in `Commercial.tsx`) inserts into the `Lead Form Subissions` table, not `commercial_submissions`. The tracking I added to `CommercialContactModal.tsx` never fires on `/commercial` because that modal isn't used there. Multiple other surfaces (`SimpleLeadModal`, `LeadForm`, `Financing`, visualizer modals) also write to `Lead Form Subissions`, so adding tracking here catches every lead form in one shot.

### 1. Migration — add UTM columns to `Lead Form Subissions`
Add 5 nullable columns (won't affect existing rows or RLS):
- `utm_source text`
- `utm_medium text`
- `utm_campaign text`
- `landing_page text`
- `referrer text`

### 2. `src/components/landing/LeadForm.tsx` (primary — this is the Commercial form)
On submit, read stored UTMs via the existing `readStoredUtms()` + `captureUtmsFromLocation()` from `BookingUrlContext`, and include the 5 fields in the `.insert(...)` payload.

### 3. `src/pages/Commercial.tsx`
Keep the existing `useEffect(() => captureUtmsFromLocation(), [])` (already added) so `/commercial?utm_source=...` captures on landing.

### 4. Other `Lead Form Subissions` writers — apply the same UTM append
Same pattern (import helpers, append 5 fields to `.insert`), so no lead source is lost regardless of entry point:
- `src/components/landing/SimpleLeadModal.tsx`
- `src/pages/Financing.tsx`
- `src/components/visualizer/VisualizerQuoteModal.tsx`
- `src/components/visualizer/ShareModal.tsx`

### 5. Leave `commercial_submissions` tracking in place
It's already wired and harmless. If you want, I can also revert the earlier `CommercialContactModal.tsx` / `commercial_submissions` changes — say the word and I'll strip them; otherwise I'll leave them for future use.

### Verification
- Visit `/commercial?utm_source=google-ads&utm_medium=cpc&utm_campaign=test`, submit the commercial form, confirm the new row in `Lead Form Subissions` has those values plus `landing_page` and `referrer`.
- Visit `/commercial` directly (no params), submit — `referrer` populated (e.g. `https://www.google.com/`), UTMs null.
- Existing form UI, thank-you flow, and Jobber booking URL unchanged.

### Zapier → Jobber
No code needed. In your existing Zap that watches `Lead Form Subissions`, add the 5 new fields and map them into a Jobber custom field ("Lead Source") or append to the client note.

**Question before I build:** do you want me to also revert the earlier `commercial_submissions` migration + `CommercialContactModal` edits since that table isn't in use, or leave them?