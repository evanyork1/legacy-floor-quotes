## Important context first

Two things from your original request need adjusting:

1. **`vite-ssg` is Vue-only.** This project is React + Vite. The React equivalents (`vite-react-ssg`, `react-snap`) require restructuring the router and making every page SSR-safe. Many pages here (CRM, Auth, SalesDashboard, Quote forms, Presentation, FloorVisualizer) read `window`/`localStorage`/Supabase auth at render time and would crash during prerender without significant guarding work.
2. **Lovable hosting serves a single SPA `index.html` with a fallback for unknown paths.** Even if we generated `dist/about/index.html`, the platform would still serve the root `index.html` for `/about`. So per-route prerendered HTML wouldn't actually be returned to crawlers without moving off Lovable hosting.

You picked **"Per-page meta only"** — the right call. Modern Googlebot and Bingbot render JavaScript and will index React SPAs correctly as long as each route sets unique title/description/canonical and the sitemap is accurate. This is how the vast majority of React marketing sites rank fine.

---

## What this plan does

Make every public page individually SEO-correct using the `react-helmet-async` setup that's already wired into `App.tsx`. No build pipeline changes, no hosting migration.

### 1. Create a small `<Seo />` helper component
`src/components/seo/Seo.tsx` — wraps Helmet, takes `title`, `description`, `path`, optional `ogImage`. Always emits:
- `<title>`
- `<meta name="description">`
- `<link rel="canonical" href="https://legacyindustrialcoatings.com{path}">`
- Open Graph + Twitter title/description/url/image
- `<meta name="robots" content="index, follow">`

This keeps per-page edits to one line and guarantees canonical is never forgotten again.

### 2. Audit + backfill every public page
Most pages already have unique titles & descriptions. Gaps to fix:

| Page | Missing |
|------|---------|
| About.tsx | canonical |
| Commercial.tsx | canonical |
| Contact.tsx | canonical |
| Financing.tsx | canonical |
| Warranty.tsx | canonical |
| Gallery.tsx | title, description, canonical (no Helmet at all) |
| CommercialFloors.tsx | title, description, canonical |
| AboutCommercial.tsx | title, description, canonical |
| ServiceAreas.tsx | check & add if missing |
| FlowerMound.tsx, Prosper.tsx | verify canonicals are unique |
| DealershipFloors.tsx | canonical points to wrong domain (`legacyepoxyfloors.com`) — fix to `legacyindustrialcoatings.com` |

For each, swap the inline `<Helmet>` for `<Seo title="..." description="..." path="/..." />` and write a unique title + description that reflects the page's actual content.

### 3. Refresh `public/sitemap.xml`
Already exists and is mostly current. Update to:
- Include `/aquatotsflooring`, `/about-commercial`, `/commercialfloors`, `/dealershipfloors`, `/rentals`, `/floor-visualizer` (already there — verify)
- Drop any routes that are gated/internal (CRM, Auth, sales-dashboard, presentation/:id, packagepresentation, quotedfw, quotephx, giveaway internals, garagelandinginstant, garagepacketpage, packet-result/:id, splash, etc.)
- Update `lastmod` to today's date
- Confirm priorities are sensible (home 1.0, key services 0.8, secondary 0.7, legal 0.3)

### 4. Confirm `public/robots.txt`
Verify it contains:
```
User-agent: *
Allow: /
Disallow: /crm
Disallow: /auth
Disallow: /sales-dashboard
Disallow: /presentation/
Sitemap: https://legacyindustrialcoatings.com/sitemap.xml
```
If different, update to this.

### 5. Add JSON-LD where useful (light touch)
The project already has `src/components/seo/StructuredData.tsx`. Verify it's mounted on the homepage and main service pages so AI crawlers (Perplexity, ChatGPT, Google AI Overviews) get structured signals about the business, services, and location.

---

## Pages explicitly NOT touched
Internal/gated/dynamic routes — they should stay `noindex` and don't need SEO meta:
CRM, Auth, SalesDashboard, SalesPresentation, CustomerPresentationPage, PackagePresentation, GarageLandingInstant, GaragePacketPage/Results, QuoteDFW, QuotePHX, Quote, Giveaway*, SplashSelect, GarageFloorsDallasFB.

---

## Technical details

- No new dependencies. Uses existing `react-helmet-async` already in `App.tsx`.
- No build/router changes. `vite build` continues to produce a single SPA bundle that Lovable hosts as today.
- The `<Seo />` helper centralizes the canonical base URL constant so future domain changes are one-line edits.
- After deploy, test in Google Search Console's "URL Inspection → Test live URL → View rendered HTML" — that's the rendered DOM Googlebot actually indexes, and it will show full content. (The raw `view-source:` will still show the SPA shell — that's expected for any SPA, but it does NOT hurt SEO with modern crawlers.)

---

## What this will and won't do

**Will:**
- Give every public page a unique, accurate title + description + canonical
- Ensure crawlers can discover every public route via sitemap
- Provide correct OG/Twitter cards for social sharing
- Be indexed correctly by Google, Bing, and modern AI crawlers that execute JS

**Won't:**
- Make `view-source:` show full page text (that requires SSG + a host that serves per-route HTML — neither is available on Lovable hosting today)
- Help with crawlers that don't run JavaScript (a small minority — older bots, some scrapers)

If you later want true static HTML in `view-source:`, the path is: migrate to Netlify/Vercel + adopt `vite-react-ssg` + audit every page for SSR safety. I can plan that as a separate, larger project when you're ready.