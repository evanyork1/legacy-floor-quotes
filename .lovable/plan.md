## Goal

Make every public page on the site ship a unique `<title>` and `<meta name="description">` so Google stops collapsing/skipping pages in indexing. The prerender setup stays as-is.

## What's actually wrong

Audit of `src/pages/*.tsx` against routes in `src/App.tsx`:

**Duplicate titles (Google treats these as the same page):**
1. `"Garage Floor In One Day | Dallas-Fort Worth | Legacy Industrial"` — used by both `GaragePacketPage.tsx` (`/garagepacketpage`) and `GoogleGaragePage.tsx` (`/googlegaragepage`). `GaragePacketPage` will be marked noindex (see below), so `GoogleGaragePage` keeps the only public claim on this intent.
2. `"Free Garage Floor Giveaway - Win Premium Coating | Legacy Industrial Coatings"` — used by both `Giveaway.tsx` (`/giveaway`) and `GiveawayRaf.tsx` (`/giveawayraf`).

**Public page with NO title/description at all:**
3. `CommercialFloors.tsx` (`/commercialfloors`) — no `<Helmet>` or `<Seo>` block. Currently inherits the generic sitewide title from `index.html`.

**Gated/internal pages with no head tags** (Auth, CRM, SalesDashboard, SalesPresentation, Quote, QuoteDFW, QuotePHX, FloorVisualizer, LandingVisual, SplashSelect, NotFound):
These shouldn't be indexed. Add `<Seo noindex>` with a minimal unique title.

All other public pages already have unique titles + descriptions.

## Changes

### 1. Fix duplicate titles

- `GoogleGaragePage.tsx` → keep its existing title/description (it's the public-facing Google Ads landing page; conflict goes away once the packet page is noindex'd below).
- `GiveawayRaf.tsx` → title: `"Refer Friends, Win a Free Garage Floor | Legacy Industrial Coatings"`; description tuned to the referral variant. `Giveaway.tsx` keeps its current title.

### 2. Add head tags to `CommercialFloors.tsx`

Add a `<Helmet>` block to the returned JSX with:
- title: `"Commercial Concrete Polishing & Industrial Coatings — Texas | Legacy Industrial Coatings"`
- description: one sentence about commercial polished concrete + industrial coatings for GCs across Texas.
- canonical, og:title, og:description, og:url all pointing at `/commercialfloors`.

### 3. Mark internal pages noindex with unique titles

For each of `Auth.tsx`, `CRM.tsx`, `SalesDashboard.tsx`, `SalesPresentation.tsx`, `Quote.tsx`, `QuoteDFW.tsx`, `QuotePHX.tsx`, `FloorVisualizer.tsx`, `LandingVisual.tsx`, `SplashSelect.tsx`, `NotFound.tsx`, **and `GaragePacketPage.tsx`** (per your note — internal/unnecessary, so it goes noindex too):

Add one `<Seo>` (the existing `src/components/seo/Seo.tsx` component) call with `noindex` set, a unique short title (e.g. `"Sign In | Legacy Industrial Coatings"`, `"CRM | Legacy Industrial Coatings"`), a short description, and the correct `path` so canonical is correct. `noindex` removes them from Google entirely.

### 4. Update `scripts/verify-prerender.mjs` to also check uniqueness

Extend the existing post-build verifier so the Netlify build fails red if any two prerendered HTML files share the same `<title>`. Catches future regressions.

## What is NOT changing

- No new routes, no new components, no removed pages.
- No changes to prerender setup, `netlify.toml`, sitemap, robots.txt, or redirects.
- No page body copy or visual changes.

## After it ships

Once the Netlify deploy goes green:
1. Re-fetch `/`, `/commercialfloors`, `/googlegaragepage`, `/giveaway`, `/giveawayraf` in Google Search Console's URL Inspection tool and click "Request indexing."
2. Within a week, the "Duplicate without user-selected canonical" report should clear.
