## Wire city links to the new `/epoxy-flooring/:city` pages

The city pages exist but nothing points at them. Two places to fix:

### 1. `src/components/Footer.tsx`
- Replace the hardcoded `cities` string array with the canonical list from `src/data/serviceAreaCities.ts` (so the footer matches the routes that actually exist).
- Change each city `<li>` from `<a href="/service-areas">` to `<a href="/epoxy-flooring/{slug}">{city}, TX</a>`.

### 2. `src/components/seo/ServiceAreasStrip.tsx`
- Swap `DFW_CITIES` (constant strings, all linking to `/service-areas`) for `SERVICE_AREA_CITIES` from `src/data/serviceAreaCities.ts`.
- Each pill becomes `<Link to={`/epoxy-flooring/${city.slug}`}>` so the homepage strip deep-links to the city pages.

### 3. Verify `src/pages/ServiceAreas.tsx`
- Already links each grid tile to `/epoxy-flooring/:slug` — no change needed, just confirming.

### Out of scope
- No changes to the city template, routes, or prerender script — those were wired correctly last turn; this is purely connecting the existing entry points.
