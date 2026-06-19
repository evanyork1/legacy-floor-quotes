# Fix: Raw HTML returns only `<head>` (AI tools + Google indexability)

## Root cause

The site is a Vite + React SPA. `index.html` ships an empty `<div id="root"></div>`; React Router renders everything client-side. Any fetcher that doesn't execute JavaScript (ChatGPT/Perplexity browse, LinkedIn/Slack/Facebook preview crawlers, basic `curl`, AI training scrapers) sees only the head tags. AI assistants fall back to **cached Wix-era content** because that's the last version of the URL they could actually read.

Google's renderer does eventually execute JS, but with this many routes it deprioritizes JS-only pages and often collapses them under the homepage's metadata — which matches what you're seeing.

## Fix: build-time prerendering

Generate a static `.html` snapshot for every public marketing route at `vite build` time. At runtime the site is still a SPA — React hydrates the prerendered HTML and behaves identically. No backend, no SSR server, no infra change. Lovable's static hosting serves the prerendered file when crawlers request `/garagefloors`, `/commercialfloors`, `/concrete-polishing`, etc.

### Tool

Use **`vite-plugin-prerender`** (or `vite-prerender-plugin`) — a Puppeteer-driven plugin that:
1. After Vite's normal build, spins up a headless Chrome
2. Visits each listed route against the built bundle
3. Waits for React + Helmet to finish rendering
4. Writes the final HTML to `dist/<route>/index.html`

Routes to prerender (public, indexable, no auth):

```
/                          /phx                       /gallery
/garagefloors              /flake-floors              /residential-patio
/commercial                /commercialfloors          /about-commercial
/concrete-polishing        /concrete-sealing          /industrial-epoxy
/service-areas             /flower-mound              /prosper
/faq                       /financing                 /warranty
/contact                   /terms                     /privacy
/blog                      (+ each /blog/:slug from src/data/blogPosts.ts)
                           (+ each /case-studies/:slug)
```

Excluded from prerendering: `/auth`, `/crm`, `/sales-dashboard`, admin routes, quote flows with dynamic state, `/garage-packet-results/*` — these are app-like or user-specific and don't need crawler HTML.

### Files to change

1. **`package.json`** — add `vite-plugin-prerender` (or `vite-prerender-plugin`) + `puppeteer` as devDependencies.
2. **`vite.config.ts`** — register the prerender plugin with the route list above and a `renderAfterDocumentEvent: 'render-event'` trigger.
3. **`src/main.tsx`** — after `ReactDOM` mounts, dispatch `document.dispatchEvent(new Event('render-event'))` so the prerenderer knows the page is ready (and Helmet has flushed).
4. **`src/components/seo/Seo.tsx`** — already correct, no change. Helmet output gets baked into each prerendered file.
5. **`public/robots.txt`** — verify `Sitemap:` line points at `https://legacyindustrialcoatings.com/sitemap.xml` so Google rediscovers all the now-crawlable routes.

### Verification

After deploying:
1. `curl -s https://legacyindustrialcoatings.com/ | grep -i "premium epoxy"` — should return matching body copy, not just meta tags.
2. `curl -s https://legacyindustrialcoatings.com/commercialfloors | grep -i "Aloe Vera"` — confirms per-route prerendering worked.
3. Run the URL through Google's Rich Results Test and the Facebook Sharing Debugger — both should now see full content and the correct per-page title/description.
4. Ask ChatGPT to "summarize https://legacyindustrialcoatings.com/garagefloors" — should return current Legacy content, not Wix data.
5. Google Search Console → URL Inspection → request re-indexing on 3–4 key routes to accelerate the refresh.

## What this does NOT fix

- **Existing AI training data** that already memorized the Wix site. Models won't forget until they retrain. But any *live* browse/scrape from now on will hit real HTML.
- **Social preview caches** (LinkedIn, Facebook) — you'll need to force-refresh each platform's debugger once after deploy.
- **Google's existing index** — re-crawl takes days to weeks. The Search Console re-index requests above speed it up for top pages.

## Technical notes

- Build time will increase (~30–60s) because Puppeteer renders ~25–40 routes.
- Bundle size and runtime behavior are unchanged.
- If `vite-plugin-prerender` has compatibility issues with Vite 5, fall back to `vite-prerender-plugin` (actively maintained fork). Both have the same API shape.
- Helmet's per-route `<title>`, `<meta description>`, canonical, and og:* tags get baked into each file's `<head>` — so each prerendered page has correct, unique metadata in raw HTML (which also solves the duplicate-homepage-metadata indexing issue).
