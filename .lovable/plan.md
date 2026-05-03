## Goals

1. Make `/` the single primary homepage; permanently redirect `/dfw` → `/`.
2. Replace the static `public/sitemap.xml` with a dynamic sitemap that always reflects all current pages plus every published blog post (read-only query against the existing `blog_posts` table — no schema changes).
3. Add LocalBusiness JSON-LD on the homepage and BreadcrumbList JSON-LD on all key pages.

**No database migrations. No new tables. No edits to any existing data.** The sitemap function only does a read-only `SELECT` against the blog table that already exists.

---

## 1. Canonicalize `/` and 301 `/dfw` → `/`

- `src/App.tsx`: change `<Route path="/dfw" element={<DFW />} />` to `<Route path="/dfw" element={<Navigate to="/" replace />} />`.
- `src/components/Header.tsx`: change `homePath = '/dfw'` to `homePath = '/'`.
- Sweep `rg "/dfw"` and update any other internal links to `/` (skipping `/quotedfw`, which is a different route).
- `public/_redirects`: add `/dfw  /  301!` so crawlers see a true 301 on hosts that honor the file.
- `public/robots.txt`: remove the `/dfw` allow line.

---

## 2. Dynamic sitemap (reads existing blog_posts table only)

**New edge function: `supabase/functions/sitemap/index.ts`**
- Public (no JWT). Returns `Content-Type: application/xml`, `Cache-Control: public, max-age=900`.
- Hard-coded URL list covering every public page in `App.tsx`:
  - `/` (priority 1.0)
  - Residential: `/garagefloors`, `/residential-patio`, `/residential-case-studies` (+ existing case study slugs from `src/data/caseStudies.ts`)
  - Commercial: `/commercial`, `/commercialfloors`, `/flake-floors`, `/industrial-epoxy`, `/concrete-polishing`, `/concrete-sealing`, `/commercial-case-studies` (+ slugs), `/about-commercial`
  - About dropdown: `/about`, `/gallery`, `/blog`, `/faq`, `/financing`
  - `/case-studies` (hub), `/contact`, `/service-areas`, `/flower-mound`, `/prosper`, `/floor-visualizer`, `/warranty`, `/privacy`, `/terms`
- Dynamic blog: `SELECT slug, published_date FROM blog_posts WHERE published = true` — appends `<url>` for each at `/blog/{slug}` with `lastmod = published_date`. **Read-only.**
- New blog rows show up automatically on the next request (within 15 min cache).

**Routing `/sitemap.xml` to the function**
- Delete `public/sitemap.xml` (otherwise the static file shadows the function).
- Add to `public/_redirects`:
  ```
  /sitemap.xml  https://byvazfrvoanojfayvsaz.supabase.co/functions/v1/sitemap  200
  /dfw          /                                                              301!
  /*            /index.html                                                    200
  ```

---

## 3. Structured data: LocalBusiness + BreadcrumbList

**LocalBusiness (homepage)**
- `src/components/seo/StructuredData.tsx` already emits a strong LocalBusiness schema and `DFW.tsx` (which renders at `/`) already includes it. I'll tighten the description and add an explicit `serviceType` array: "Epoxy flooring, concrete polishing, industrial coatings, garage floor coatings, commercial flooring." Phone, Plano TX address, and URL already match.

**BreadcrumbList (all key pages)**
- Extend `StructuredData.tsx` with an optional `breadcrumbs?: Array<{ name: string; url: string }>` prop. When provided, append a `BreadcrumbList` JSON-LD block.
- Add `breadcrumbs` to existing `<StructuredData />` usages on these pages (and add the component where missing):
  - `/about`, `/blog`, `/blog/:slug`, `/contact`, `/gallery`, `/faq`, `/financing`, `/warranty`
  - `/garagefloors`, `/residential-patio`, `/residential-case-studies`, `/residential-case-studies/:slug`
  - `/commercial`, `/commercialfloors`, `/flake-floors`, `/industrial-epoxy`, `/concrete-polishing`, `/concrete-sealing`, `/commercial-case-studies`, `/commercial-case-studies/:slug`, `/about-commercial`
  - `/case-studies`, `/case-studies/:slug`
- Each chain: `Home → {Section} → {Page}` (2–3 levels).

---

## Files

**New**
- `supabase/functions/sitemap/index.ts`

**Edit**
- `src/App.tsx` — `/dfw` → `<Navigate>`
- `src/components/Header.tsx` — `homePath = '/'`
- `src/components/seo/StructuredData.tsx` — add breadcrumbs + tighten LocalBusiness
- `public/_redirects` — sitemap proxy + `/dfw` 301
- `public/robots.txt` — drop `/dfw` allow
- ~20 page files — pass `breadcrumbs` into `<StructuredData />`

**Delete**
- `public/sitemap.xml` (replaced by edge function)
