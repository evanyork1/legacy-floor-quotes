I found the biggest crawl problem: the Lovable published URL has a broken `/sitemap.xml` because `_redirects` sends it to a Supabase sitemap endpoint that returns `Not found`. Your custom domain sitemap works, but the Lovable published URL advertised in this project does not. I also see mixed canonical/sitemap domains (`legacy-floor-quotes.lovable.app` vs `legacyindustrialcoatings.com`), which can confuse Google if Search Console is checking the wrong property.

Plan:
1. Replace the broken sitemap redirect with a real static `public/sitemap.xml` that returns XML directly from the site.
2. Update `public/robots.txt` so the `Sitemap:` line points to the live canonical domain you actually want Google to index: `https://legacyindustrialcoatings.com/sitemap.xml`.
3. Keep internal/gated routes blocked, but ensure public money pages remain allowed.
4. Align sitemap entries with the public routes in `src/App.tsx`, including service pages, blog/case-study hubs, contact, FAQ, financing, warranty, privacy, and terms.
5. Verify after the change that:
   - `/robots.txt` returns `Allow: /` and the correct sitemap URL.
   - `/sitemap.xml` returns valid XML, not `Not found`.
   - the homepage returns `200` and has `index, follow`.

Technical details:
- Edit `public/_redirects` to remove the `/sitemap.xml -> Supabase function` redirect.
- Add or update `public/sitemap.xml` as a static XML file.
- Edit `public/robots.txt` only where needed.
- No design/page content changes.