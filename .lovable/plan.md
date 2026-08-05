# Commercial Floor Cleaning & Maintenance Page

Add a new SEO-focused page at `/commercial-floor-maintenance`, listed in the Commercial dropdown as "Maintenance".

## What the page says

1. **Hero** — "Commercial Floor Cleaning & Maintenance Programs in DFW" with a short subhead about factory-trained cleaning crews, plus Book Estimate / Call CTAs.
2. **Manufacturer-trained crews** — the core differentiator: our cleaning crews are trained by the material and product manufacturers on correct cleaning techniques, chemistry, pads, and dilution, so nothing that could damage the floor or void a coating is ever used.
3. **Why maintenance matters** — a maintenance program is an essential part of having a floor installed by us; scheduled cleaning is the single best way to protect the investment and keep the floor performing for years.
4. **Floor types we clean** — epoxy, polyaspartic/polyurea, urethane cement, polished and sealed concrete, plus carpet, carpet tile, LVT, VCT and tile.
5. **What maintenance includes** — deep cleaning and degreasing, repairs, resealing, scrubbing/burnishing, and VCT strip, wax, and buff programs.
6. **Program cadence** — quarterly/monthly/nightly options and what a walkthrough covers.
7. **FAQ** — 8–10 questions targeting real search phrasing (how often to reseal, can you clean a floor you didn't install, what chemicals damage epoxy, VCT waxing frequency, deep cleaning cost drivers, etc.).
8. **Closing section** — stated at the bottom: we service any commercial floor, including floors installed by someone else.
9. **CTA band** — book an estimate + phone.

## SEO

- `Seo` component: title/description/canonical targeting "commercial floor cleaning and maintenance DFW", plus OG/Twitter tags.
- Single H1, semantic H2/H3 section headings, descriptive alt text on all images.
- `StructuredData`: Service schema (Commercial Floor Cleaning & Maintenance), FAQPage schema from the FAQ list, LocalBusiness/Organization as on sibling pages.
- `PageBreadcrumbs`: Home → Commercial → Maintenance.
- Internal links to `/commercial`, `/concrete-sealing`, `/concrete-polishing`, `/flake-floors`, `/commercial-case-studies`; add a link back from `/commercial`.
- Add the route to the dynamic sitemap edge function so it gets indexed.
- Keyword validation via Semrush before finalizing headings and FAQ wording.

## Technical notes

- New `src/pages/CommercialMaintenance.tsx`, modeled on `ConcreteSealing.tsx` (HeaderGeneric + Footer + BookingModal + Card sections), using the flattened non-gradient navy/slate styling used site-wide.
- Route registered in `src/App.tsx`.
- "Maintenance" added to `commercialItems` in `src/components/Header.tsx` (desktop dropdown and mobile section both read from that array).
- New entry in `supabase/functions/sitemap/index.ts` static URL list.
- Imagery: reuse existing commercial/cleaning assets in `src/assets`; generate one or two supporting images only if no suitable photo exists. No invented stats, certifications, or testimonials.
