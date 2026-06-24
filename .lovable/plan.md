## Plan: ship real prerendered HTML via react-snap

The current setup (event-based prerender + fallback body injection) is unreliable. Replace it with `react-snap`, which writes fully rendered HTML to disk after `vite build`.

Base domain for all canonical and og:url values: **https://legacyindustrialcoatings.com**

## Changes

1. **Remove the fallback body injection**
   - Delete `scripts/inject-static-fallbacks.mjs` and its `package.json` postbuild step.
   - Stop relying on hand-injected body content. Crawlers must see real rendered React output.

2. **Remove the existing `@prerenderer/rollup-plugin` flow**
   - Drop the plugin from `vite.config.ts` and remove its devDependencies.
   - Remove the `render-event`/`MutationObserver` settle logic in `src/main.tsx`. Replace with a normal `createRoot().render()` plus a `hydrateRoot` path when `react-snap` has prerendered the page.

3. **Adopt `react-snap` as the postbuild prerenderer**
   - Add `react-snap` as a devDependency.
   - Add a `postbuild` script in `package.json` so the build flow becomes:

     ```text
     vite build
     react-snap
     node scripts/verify-prerender.mjs
     ```

   - Add a `reactSnap` config block in `package.json` with:
     - `source: "dist"`
     - explicit `include` list of public marketing routes (`/`, `/commercial`, `/commercialfloors`, `/garagefloors`, `/industrial-epoxy`, `/concrete-polishing`, `/concrete-sealing`, `/flake-floors`, `/residential-patio`, `/gallery`, `/service-areas`, `/about`, `/about-commercial`, `/contact`, `/financing`, `/faq`, `/blog`, `/warranty`, `/terms`, `/privacy`, `/case-studies`, `/commercial-case-studies`, `/residential-case-studies`, `/floor-visualizer`)
     - `crawl: false` to keep app-like/auth/customer pages (CRM, auth, sales dashboards, garage packet results, presentation detail, quote forms) out of the prerender
     - `puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"]`
     - `inlineCss: false` and `removeStyleTags: false` to keep the build deterministic
     - `skipThirdPartyRequests: true` so prerendering does not wait on GTM, Hotjar, Meta Pixel, Jivosite
     - `waitFor` set high enough for Helmet/React content to render

4. **Switch `src/main.tsx` to hydrate when prerendered HTML is present**
   - If `#root` already has children (the react-snap output), call `hydrateRoot`. Otherwise `createRoot().render()`.
   - This is the standard react-snap integration and is what makes the postbuild HTML correct.

5. **Force canonical and og:url to https://legacyindustrialcoatings.com**
   - Update `index.html` static head to use `https://legacyindustrialcoatings.com/` for canonical and og:url.
   - Update the centralized SEO component and every page-level `<Helmet>` block (Commercial, Home/DFW, About, Contact, Warranty, Terms, Privacy, FAQ, Financing, Blog, Gallery, Concrete Polishing, Concrete Sealing, Industrial Epoxy, Residential Garage Floors, Residential Patio, Flake Floors, Flake Floor Template, AquaTots, Case Studies, Case Studies Hub, Commercial Floors, About Commercial, DFW Res Landing, Garage Landing Form, Garage Landing Instant, Garage Floors Dallas FB, Floor Visualizer) so each route's canonical and og:url self-reference `https://legacyindustrialcoatings.com<route>`.
   - Remove any remaining references to the `legacy-floor-quotes.lovable.app` preview domain in head metadata, sitemap, and structured data.

6. **Strengthen the postbuild verifier**
   - Keep `scripts/verify-prerender.mjs` and tighten it:
     - Every included route must produce `dist/<route>/index.html` (or `dist/index.html` for `/`).
     - Each file's body (post `</head>`) must be ≥ 5 KB.
     - Each file's `#root` must contain rendered children (no `<div id="root"></div>` empty shell).
     - Route-specific keyword checks remain (`/` requires "polyurea" + "warranty"; `/commercial` requires "warehouse" + "polished concrete"; etc.).
     - Canonical/og:url must start with `https://legacyindustrialcoatings.com`.
   - Any failure aborts the Netlify build before deploy.

7. **Verification after build**
   - Inspect `dist/index.html` and `dist/commercial/index.html`:
     - Body contains real rendered sections, not an empty `#root`.
     - Canonical = `https://legacyindustrialcoatings.com/` (homepage) and `https://legacyindustrialcoatings.com/commercial` (commercial).
     - og:url matches canonical on each.
   - After the next successful Netlify deploy, request re-indexing for `/` and `/commercial` in Google Search Console.

## What is NOT changing

- No new public routes, removed pages, or copy edits.
- No router change — `BrowserRouter` stays.
- No SSR runtime — this remains a fully static build.
- No changes to robots.txt, sitemap entries, edge functions, or Supabase.