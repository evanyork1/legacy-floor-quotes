## What's broken

I traced the booking-link attribution end to end. Three separate bugs, any one of which alone would kill Google Ads attribution.

**1. The UTM builder short-circuits itself (root cause).**
In `src/contexts/BookingUrlContext.tsx`, the default booking URL is the base Jobber link with `?utm_source=website` already baked in (line 6). `buildBookingUrl` then has a rule: "if the URL already has `utm_source`, return it verbatim" (lines 55–57). Since the default *always* has it, the stored UTMs from the ad click are *never* applied. Every booking link on the site resolves to `utm_source=website` — including ad traffic.

**2. Google Ads auto-tagging doesn't send UTMs at all.**
With auto-tagging on (the default), Google appends `gclid` — not `utm_source`. The current code only looks for `utm_source`/`utm_medium`/`utm_campaign`, so an ad click with just `?gclid=...` stores nothing and falls through to `utm_source=website`.

**3. Several booking buttons bypass the helper entirely.**
These hardcode `?utm_source=website` and never read stored UTMs:
- `src/pages/EpoxyFlooringCity.tsx`
- `src/pages/QuoteDFW.tsx`
- `src/pages/GarageLandingInstant.tsx`
- `src/components/landing/SimpleLeadModal.tsx`
- `src/components/landing/LeadFormModal.tsx`
- the Jivosite "Book an Estimate" hijack script in `index.html`

Also: UTMs are stored in `sessionStorage`, so attribution is lost if the visitor returns in a new tab or later session.

## The fix

**A. Rewrite the attribution core (`BookingUrlContext.tsx`)**
- Change `DEFAULT_BOOKING_URL` to the bare base link (no `utm_source`).
- Capture `gclid`, `gbraid`, `wbraid`, plus `utm_term`/`utm_content` alongside the existing UTM keys.
- Derive source when Google auto-tagging is in play: if `gclid`/`gbraid`/`wbraid` is present and no explicit `utm_source`, set `utm_source=google`, `utm_medium=cpc`.
- Fallback for untagged paid/social/organic: if no UTM and no click ID, infer from `document.referrer` (e.g. `google` → `organic`, `facebook` → `facebook`, empty → `direct`).
- Store in `localStorage` (90-day expiry) with a `sessionStorage` mirror, so first-touch survives new tabs/returns.
- Remove the "return verbatim if `utm_source` exists" short-circuit; instead, hard-pinned pages like `/gpt` pass an explicit override flag that wins over stored values.
- Always append `gclid` to the Jobber URL too, so the click ID is visible on the lead.

**B. Route every booking link through the helper**
Replace the six hardcoded `?utm_source=website` links (list above) with `useBookingUrl()` / `buildBookingUrl()`. For `index.html`'s Jivosite hijack, read the same stored value from `localStorage` and build the URL there.

**C. Keep `/gpt` behavior**
`/gpt` continues to force `utm_source=chatgpt` via the explicit override path.

## What you'll see in Jobber afterward

Request source on each Jobber request will read:
- `google` / `cpc` for ad clicks (with the `gclid` carried through)
- `chatgpt` for `/gpt`
- `organic`, `facebook`, `direct`, etc. for everything else

## Verification before I call it done

I'll load the preview with `?gclid=TEST123`, `?utm_source=google&utm_medium=cpc`, and a clean URL, then read the resolved `href` on the hero CTA, the sticky mobile bar, and the modal links to confirm each carries the right parameters.

## Technical notes

No backend or database changes; this is entirely client-side URL construction. Jobber's public request form records whatever query params it receives, so no Jobber-side configuration is needed. One caveat: Jobber's public request link must not strip unknown query params — I'll confirm the params survive the redirect during verification, and if it drops them we'll fall back to encoding source into a single supported field.
