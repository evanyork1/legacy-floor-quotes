## The three issues — root causes

### Issue 3: og:url points to homepage on most pages

Audit shows only 4 pages set their own `og:url`. Every other page uses a direct `<Helmet>` block with title/description but no `og:url`, so crawlers inherit `<meta property="og:url" content="https://legacyindustrialcoatings.com" />` from the static `index.html`. Helmet only overrides what you explicitly re-declare.

### Issues 1 + 2: /commercial blank, homepage body not in snapshot

The prerender plugin signals completion via a `render-event` dispatched in `src/main.tsx`:

```ts
requestAnimationFrame(() => setTimeout(() => document.dispatchEvent(new Event('render-event')), 0));
```

That fires ~1 frame after React's first commit — before async work finishes:
- Lazy-loaded images / fonts that gate above-the-fold layout
- Sections that fetch from Supabase before rendering content (gallery, testimonials)
- Animation libraries that mount content inside effects

Result: Puppeteer snapshots an HTML shell with `<head>` populated by Helmet but a near-empty body for slower pages like `/commercial` and the heavy homepage.

## Fix

### 1. Strengthen the render-event signal (`src/main.tsx`)

Replace the single-rAF dispatch with a settle-based signal: dispatch only after React commits, fonts are ready, and the DOM is stable for 800 ms. Pseudocode:

```ts
async function signalPrerenderReady() {
  await new Promise(r => requestAnimationFrame(r));
  try { await (document as any).fonts?.ready; } catch {}
  // Wait for the page to actually stop mutating
  await new Promise<void>(resolve => {
    let timer = setTimeout(resolve, 800);
    const obs = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => { obs.disconnect(); resolve(); }, 800);
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
  });
  document.dispatchEvent(new Event('render-event'));
}
queueMicrotask(signalPrerenderReady);
```

Plus bump the puppeteer `timeout` in `vite.config.ts` from 60 s to 90 s to give the settle logic room. This single change fixes both the homepage body gap and `/commercial` going blank — same root cause.

### 2. Add per-route `og:url` (and canonical) to every page that uses direct `<Helmet>`

For each page in `src/pages/` that ships a direct `<Helmet>` block without `og:url`, add:

```tsx
<meta property="og:url" content="https://legacyindustrialcoatings.com<ROUTE>" />
<link rel="canonical" href="https://legacyindustrialcoatings.com<ROUTE>" />
```

…matching the page's actual route. Pages that already use the central `<Seo>` component are already correct (it sets canonical + og:url from `path`). Pages affected (audited just now): `DFW.tsx` already self-references but `DFWResLanding.tsx` incorrectly points at the homepage; `Commercial.tsx`, `Contact.tsx`, `Warranty.tsx`, `TermsAndConditions.tsx`, `PrivacyPolicy.tsx`, `FAQ.tsx`, `Financing.tsx`, `About.tsx`, `Blog.tsx`, `Gallery.tsx`, `ConcretePolishing.tsx`, `ConcreteSealing.tsx`, `IndustrialEpoxy.tsx`, `ResidentialGarageFloors.tsx`, `ResidentialPatio.tsx`, `FlakeFloors.tsx`, `FlakeFloorTemplate.tsx`, `AquaTotsFlooring.tsx`, `CaseStudies.tsx`, `CaseStudiesHub.tsx`, and the remaining `<Helmet>` pages.

For unindexed internal/landing pages (giveaway-style, Google Ads landers, internal tools) we still set the correct self-referencing og:url — wrong og:url is wrong even if noindex.

### 3. Tighten `scripts/verify-prerender.mjs`

Add two checks on top of the existing keyword checks so future regressions fail the Netlify build red:

- **Body length floor**: each route's HTML body (after stripping `<head>`) must be ≥ 5 KB. A near-empty React shell is ~1 KB; real pages are 20–80 KB.
- **Route-specific markers** tied to actual on-page copy:
  - `/` → "warranty" + "polyurea"
  - `/commercial/index.html` → "warehouse" + "polished concrete"
  - `/commercialfloors/index.html` → "industrial" + "polishing"
  - `/garagefloors/index.html` → "polyurea" + "garage"
  - `/industrial-epoxy/index.html` → "industrial" + "epoxy"
  - `/about/index.html`, `/contact/index.html` → existing phrases retained

If any check fails, Netlify aborts the deploy instead of shipping a half-empty page.

## After it ships

Verify with curl:

```bash
curl -s https://legacyindustrialcoatings.com/ | grep -ic 'warranty\|polyurea'
curl -s https://legacyindustrialcoatings.com/commercial/ | grep -ic 'warehouse\|polished concrete'
curl -s https://legacyindustrialcoatings.com/commercial/ | grep -i 'og:url'   # should show /commercial, not the homepage
```

Then re-fetch `/` and `/commercial` in Google Search Console's URL Inspection and click "Request indexing."

## What is NOT changing

- No new routes, no removed pages, no page-body copy changes.
- No changes to redirects, sitemap, or robots.txt.
- No changes to `netlify.toml` (the cache plugin install is already done).
