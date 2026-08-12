# Commercial expansion: hero copy, mega menu, and 20 imported pages

## 1. Hero copy

Change the homepage hero subtext from "Residential & Commercial Floors That Last" to "Commercial & Residential Floors That Last" (both the DFW and PHX variants use the same string).

## 2. Commercial mega menu

Replace the current single-column Commercial dropdown with a wide hover breakout, styled to match this site (white panel, navy headings, thin border, blue hover states — no new visual language):

```text
+-------------------------- Commercial --------------------------+
| APPLICATIONS                    | SOLUTIONS                     |
| Industrial & Warehouse          | Epoxy                         |
| Manufacturing                   | Urethane Cement               |
| Data Center                     | Quartz Flooring               |
| Healthcare                      | Polished Concrete             |
| Education                       | Specialty Systems             |
| Hotel & Hospitality             | Static-Control (ESD)          |
| Aerospace                       | Deck Coatings                 |
| Multifamily                     | Sealed Concrete               |
| Office & Corporate              | Maintenance                   |
| Retail                          |                               |
| Agriculture Facilities          |                               |
+-----------------------------------------------------------------+
```

Mobile menu gets the same two labeled groups, stacked. Applied to both `Header.tsx` and `HeaderGeneric.tsx`.

## 3. Pulling content from the other Lovable project

Yes — I can read the Legacy Commercial Floors project directly. I already checked out a read-only snapshot of it and confirmed:

- 11 industry pages and 9 product pages are data-driven: all copy (intros, overviews, challenges, systems, FAQs, meta titles/descriptions) lives in `industries.ts` and `products.ts`, rendered by one template page each.
- That means the import is mostly a content copy, not 20 hand-built pages.

Import approach:

1. Copy the two data files into this project, dropping their styling-specific bits.
2. Build two new template pages here — `IndustryDetail` and `ProductDetail` — using **this** site's components (`Header`, `Footer`, `Seo`, `StructuredData`, `PageBreadcrumbs`, existing button and section styling), not the other site's layout.
3. Routes: `/industries/:slug` and `/commercial-systems/:slug`. No collisions with current routes.
4. Images: plain image files copy straight over. The other project also uses CDN pointer files that only resolve on its own domain — those get downloaded and re-uploaded as assets on this project so nothing breaks.
5. Add all 20 URLs to the sitemap function and to the mega menu.

## 4. Existing commercial pages stay

`/industrial-epoxy`, `/concrete-polishing`, `/concrete-sealing`, `/flake-floors`, and `/commercial-floor-maintenance` are untouched — they keep their URLs and rankings. To avoid the new pages cannibalizing them:

- The Solutions column links Epoxy → existing `/industrial-epoxy`, Polished Concrete → existing `/concrete-polishing`, Sealed Concrete → existing `/concrete-sealing`, Maintenance → existing `/commercial-floor-maintenance`.
- Only the systems that have no page here today get new `/commercial-systems/` pages: Urethane Cement, Quartz Flooring, Specialty Systems, Static-Control (ESD), Deck Coatings.
- The imported copy for the four overlapping systems is used to *strengthen* the existing pages instead of creating duplicates (added sections, FAQs) — same URLs, richer content.
- Industry pages are all net-new and cross-link down to the relevant solution page.

Net result: 11 new industry pages + 5 new system pages + 4 upgraded existing pages.

## 5. The 404'ing URLs from search

None of these exist in the app today, so they all 404. Each gets wired up — no existing page is touched.

Residential (both point at the existing garage floors page via a 301-style redirect):

| URL | Behavior |
| --- | --- |
| `/garage-floor-coating` | redirects to `/garagefloors` |
| `/polyaspartic-garage-floor` | redirects to `/garagefloors` |

Commercial (redirect where an equivalent page already exists, real page where it doesn't):

| URL | Behavior |
| --- | --- |
| `/polished-concrete` | redirects to existing `/concrete-polishing` |
| `/warehouse-epoxy-flooring` | redirects to existing `/industrial-epoxy` |
| `/commercial-flooring` | redirects to existing `/commercial` |
| `/resinous-flooring` | new page (imported Epoxy/resinous systems content) |
| `/healthcare-flooring` | new page — the Healthcare industry page lives at this URL |
| `/manufacturing-floor-coating` | new page — the Manufacturing industry page lives at this URL |

## 6. URLs for every new Applications / Solutions page

Each imported page gets its own clean, keyword-shaped URL rather than a generic nested slug — the three above are simply part of this same map.

Applications (industries):

`/warehouse-flooring`, `/manufacturing-floor-coating`, `/data-center-flooring`, `/healthcare-flooring`, `/school-flooring`, `/hotel-flooring`, `/aerospace-hangar-flooring`, `/multifamily-flooring`, `/office-flooring`, `/retail-flooring`, `/agriculture-facility-flooring`

Solutions (systems):

`/resinous-flooring`, `/urethane-cement-flooring`, `/quartz-flooring`, `/specialty-floor-systems`, `/esd-static-control-flooring`, `/deck-coatings` — plus the four already-existing pages the menu links to (`/industrial-epoxy`, `/concrete-polishing`, `/concrete-sealing`, `/commercial-floor-maintenance`).

All of these go into the sitemap, the mega menu, and the footer.


## Technical notes

- New files: `src/data/industries.ts`, `src/data/commercialSystems.ts`, `src/pages/IndustryDetail.tsx`, `src/pages/CommercialSystemDetail.tsx`, `src/components/CommercialMegaMenu.tsx`.
- Routing: each page is registered at its own top-level path (no `:slug` params), so the URL table above is exact. Redirect URLs use `<Navigate replace>`.

- Edited: `src/App.tsx` (routes), `Header.tsx`, `HeaderGeneric.tsx`, `HeroSection.tsx`, `Footer.tsx`, `supabase/functions/sitemap/index.ts`, plus the four existing system pages.
- Every detail page ships `Seo` meta, breadcrumb + Service + FAQPage JSON-LD, one H1, and lazy-loaded gallery images.
- Assets migrated via `lovable-assets create`; no cross-project pointer files referenced.
