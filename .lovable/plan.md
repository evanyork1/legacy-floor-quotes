## Fix: Make prerendering actually run on Netlify

The site ships an empty SPA shell because the prerender plugin in `vite.config.ts` silently skips itself when Puppeteer's Chromium isn't found — which is exactly what happens on Netlify's default build image. Fix it at the build config level so Netlify installs Chromium, runs the prerender, and refuses to deploy if the output is empty.

### 1. Add `netlify.toml` at repo root
- Set `PUPPETEER_SKIP_DOWNLOAD = "false"` and a stable `PUPPETEER_CACHE_DIR` (e.g. `./.cache/puppeteer`) so Chromium lands somewhere predictable.
- Build command: `npx puppeteer browsers install chrome && npm run build && node scripts/verify-prerender.mjs`
- Publish directory: `dist`
- Node version: `20`
- Add `netlify-plugin-cache` pointed at `.cache/puppeteer` so Chromium (~150 MB) is reused between builds instead of redownloaded every time.

### 2. Make `hasChromium()` honest in `vite.config.ts`
- Keep the existing detection, but in production builds throw a clear error when Chromium is missing — unless `SKIP_PRERENDER=1` is set for the rare intentional skip.
- Result: a misconfigured Netlify build fails red instead of silently shipping an empty SPA.

### 3. Add `scripts/verify-prerender.mjs` (the post-build verifier)
- After `vite build`, this script reads a handful of critical files in `dist/` (`index.html`, `commercial/index.html`, `garagefloors/index.html`, `industrial-epoxy/index.html`).
- For each, greps for a known phrase from that page's real copy (e.g. "epoxy", "garage", "commercial").
- If any file is missing the phrase, `process.exit(1)` with a clear message naming the offending route.
- This is the safety net: even if prerender silently regresses again later, the deploy turns red instead of going live broken.

### 4. Verify after first green Netlify deploy
- `curl -s https://legacyindustrialcoatings.com/ | grep -ic epoxy` → non-zero
- `curl -s https://legacyindustrialcoatings.com/commercial/ | grep -ic epoxy` → non-zero
- Submit `/` and `/commercial/` for re-indexing in Google Search Console.

### What is NOT changing
- No React/page/component code.
- No routes added or removed from `PRERENDER_ROUTES`.
- No DNS, redirect, or Netlify-site changes — just config files inside the repo.

### Technical notes
- First Netlify build with this change will be ~3–5 min slower (Chromium download). Subsequent builds are normal speed thanks to `netlify-plugin-cache`.
- `netlify.toml` is only read by Netlify when the site is built from a connected Git repo. If Netlify is still deploying via drag-and-drop, none of this applies — that has to be switched to Git-connected first.
