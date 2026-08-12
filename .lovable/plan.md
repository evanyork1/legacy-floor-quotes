# Fix duplicate-title build failure

## What's wrong
The build's prerender verification aborts because two indexable pages ship the same `<title>`:

- `/commercial` — hard-coded "Commercial Epoxy Flooring DFW | Legacy Industrial Coatings"
- `/resinous-flooring` — renders the `epoxy-flooring` system entry, whose `metaTitle` is the identical string

Duplicate titles are an SEO problem, so the verifier treats it as a hard failure.

## Fix
Give the resinous/epoxy system page its own distinct title and description in `src/data/commercialSystems.ts`:

- `metaTitle`: "Resinous Flooring Systems DFW | Epoxy, Urethane & Quartz"
- Tighten `metaDescription` so it doesn't read as a near-copy of the `/commercial` page description.

Leave `/commercial` untouched — it's the older, established page.

## Verification
Run the production build locally so `verify-prerender` runs, and confirm it reports no duplicate titles across all 90 routes.

## Technical notes
Single-file change to the first entry in the `products` array (`slug: "epoxy-flooring"`). No route, nav, or sitemap changes needed since the URL stays `/resinous-flooring`.
