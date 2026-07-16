## Goal
Track the traffic source (Google Ads, Facebook, etc.) for every submission of the commercial contact form on `/commercial`, so you know which channel drove each lead.

## How attribution will flow

```
Visitor lands on /commercial?utm_source=google-ads&utm_medium=cpc&utm_campaign=spring
        │
        │  UTM params captured to sessionStorage on page load
        │  (reusing the same `lic_utms` store already used for Jobber booking)
        ▼
Visitor fills out the Commercial Project Request form
        │
        │  On submit, we read stored UTMs + page/referrer and include them
        ▼
Row inserted into `commercial_submissions` with utm_source, utm_medium,
utm_campaign, landing_page, referrer
        │
        ▼
(Optional) Zapier watches new rows → pushes to Jobber with UTM fields
mapped into custom fields / notes so you see the source inside Jobber.
```

The tracking itself lives in your database — you do **not** need Zapier for the tracking to work. Zapier only matters if you want the UTM values to appear inside the Jobber lead record.

## Changes

### 1. Database (migration)
Add 5 nullable columns to `commercial_submissions`:
- `utm_source text`
- `utm_medium text`
- `utm_campaign text`
- `landing_page text` (first page they hit)
- `referrer text` (document.referrer, e.g. google.com, facebook.com — catches organic/social when no UTMs)

Existing rows stay valid (all nullable). RLS/grants unchanged.

### 2. `src/components/commercial/CommercialContactModal.tsx`
- Import the existing UTM helper from `BookingUrlContext` (add a small exported `readStoredUtms()` there, or duplicate the sessionStorage read).
- On submit, read stored UTMs + `window.location.href` + `document.referrer` and include them in the `.insert(...)` payload.
- Fallback: if no stored UTMs and no referrer, `utm_source` stays null (direct traffic).

### 3. `src/pages/Commercial.tsx`
- On mount, call `captureUtmsFromLocation()` so a visitor who lands directly on `/commercial?utm_source=...` gets their UTMs captured even if they never touch the booking flow. (The provider already does this on other pages; Commercial needs it too.)

### 4. Admin view (`src/components/admin/LeadsTab.tsx` or wherever commercial submissions are listed)
Show the new columns in the admin table so you can see the source at a glance. Small, additive column — no layout overhaul.

### 5. Zapier → Jobber (setup instructions, no code)
After the code ships, in your existing Zap that pushes commercial submissions to Jobber:
- Add the new fields (`utm_source`, `utm_medium`, `utm_campaign`, `landing_page`, `referrer`) from the Supabase trigger step.
- Map them into a Jobber custom field (e.g. "Lead Source") or append them to the client note so they show up on the Jobber lead.

I'll give you the exact Zap mapping steps once the code is deployed.

## Verification
- Visit `/commercial?utm_source=google-ads&utm_medium=cpc&utm_campaign=test`, submit the form, confirm the new row in `commercial_submissions` has those three values plus `landing_page` and `referrer` populated.
- Visit `/commercial` directly (no params) from a Google search result, submit, confirm `referrer` = `https://www.google.com/` and UTMs are null.
- Existing form UX (fields, thank-you message, styling) is unchanged.

## Answer to your question
Zapier is **not** required to track the source — the attribution is stored in your own database the moment the form is submitted. Zapier is only used if you also want those UTM values to appear inside the Jobber lead record, which is a simple field-mapping step in your existing Zap.