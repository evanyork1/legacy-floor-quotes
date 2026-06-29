
## Goal
Turn each DFW city in the Service Areas list into a hyperlinked, dedicated, SEO-optimized landing page. Pages lead with commercial/industrial coatings (primary sales focus) and still capture residential garage/patio business as a secondary motion.

## What gets built

### 1. Dynamic city route
- New route: `/epoxy-flooring/:city` rendered by `src/pages/EpoxyFlooringCity.tsx`
- Slugged URLs (e.g. `/epoxy-flooring/plano`, `/epoxy-flooring/fort-worth`)
- Registered in `src/App.tsx`

### 2. City data file
`src/data/serviceAreaCities.ts` — one entry per city with the fields the page template needs:
```ts
{
  slug, name, county, population, nearbyCities,
  localHook,            // 1–2 sentence intro tying us to the city
  commercialAngle,      // PRIMARY — industries, business parks, GCs, facility types
  residentialAngle,     // SECONDARY — neighborhoods/home styles we serve
  landmarks,            // for natural geo signals
  zipCodes,
  faqs                  // 3 city-specific Q&As (2 commercial, 1 residential)
}
```
Seeded for all 34 cities in `ServiceAreas.tsx`. Specific where local detail is strong (Legacy West, Alliance, Frisco Star, Stonebriar), generic where it's thin.

### 3. Update the existing Service Areas page
- Each city tile in `src/pages/ServiceAreas.tsx` becomes a `<Link to="/epoxy-flooring/{slug}">`
- Same visual style; just clickable

### 4. SEO on every city page (via `Seo` component + JSON-LD)
- `<title>`: `Commercial & Residential Epoxy Flooring in {City}, TX | Legacy Industrial Coatings`
- `<meta description>`: 150-char city-specific blurb leading with commercial/industrial coatings
- Canonical: `https://legacyindustrialcoatings.com/epoxy-flooring/{slug}`
- LocalBusiness + Service JSON-LD with `areaServed = {City, TX}`
- BreadcrumbList: Home › Service Areas › {City}
- Internal links to `/commercialfloors`, `/industrial-epoxy`, `/concrete-polishing`, `/concrete-sealing` (primary), then `/garagefloors`, `/flake-floors`, `/residential-patio` (secondary), plus `/contact` and 3–4 nearby city pages
- Added to `scripts/prerender.mjs` route list so each city ships as static HTML for crawlers

---

## Page template (what each city page looks like)

1. **Hero** — H1: `Commercial & Residential Epoxy Flooring in {City}, TX`. Sub-line: 190+ five-star reviews, serving {City} from our Plano HQ, OSHA-compliant commercial crews. CTAs: "Request Commercial Estimate" (primary) + "Call (214) 305-6516". **No "lifetime polyurea warranty" line in the hero.**
2. **Local intro paragraph** — uses `localHook`, leading with the commercial story (business parks, industries, GCs).
3. **Commercial & industrial services in {City}** — *Primary section, placed first, larger visual weight, more cards.* Industrial epoxy, mechanical polished concrete, urethane cement, anti-static / ESD, FDA-compliant systems, commercial floor coatings, concrete sealing, specialty waterproofing. Each tied to `commercialAngle` (e.g. Plano: corporate campuses & medical office; Fort Worth: Alliance distribution; Frisco: PGA HQ / The Star). Each links to its main service page. Section closes with an ITB / facility-manager CTA.
4. **Residential services in {City}** — *Secondary section, shorter.* Polyurea garage floors, flake systems, patio coatings. Brief local angle + link to `/garagefloors`. Lifetime warranty mentioned **here** (not in hero).
5. **Why {City} chooses Legacy** — millions of sq ft installed, OSHA-compliant crews, manufacturer-backed industrial systems, in-house polishing crews, night/weekend pours, local references. Commercial-first framing.
6. **Project spotlight** — pulls 1–2 case studies from `src/data/caseStudies.ts`, preferring commercial. Fallback: generic "recent {City}-area commercial install" block.
7. **Service radius / nearby cities** — chips linking to 4–6 neighboring city pages (interlinking for SEO).
8. **City-specific FAQ** (3 Qs, FAQPage JSON-LD) — weighted commercial:
   - "Do you handle commercial coatings in {City} after hours / on weekends?"
   - "Do you pull permits and meet OSHA requirements for {City} commercial jobs?"
   - "How fast can you coat a residential garage in {City}?"
9. **Final CTA** — Dual: "Request Commercial Estimate" (primary) + "Book Residential Estimate" + Call (214) 305-6516.
10. **Footer** (existing).

---

## Preview: sample copy for **Plano, TX**

**H1:** Commercial & Residential Epoxy Flooring in Plano, TX

**Intro:** Legacy Industrial Coatings is headquartered right here in Plano at 6010 W Spring Creek Parkway. From corporate campuses along the Legacy West and Tollway corridor to medical-office back-of-house in West Plano, we've installed millions of square feet of industrial epoxy, urethane cement, and mechanical polished concrete across Collin County — and we still take care of the homeowner on the same block.

**Commercial in Plano (primary section):**
> Plano's corporate base — Toyota, JPMorgan Chase, Liberty Mutual, FedEx Office — drives demand for FF/FL-flat polished concrete in showrooms and lobbies, anti-static epoxy in data and lab spaces, and urethane cement in medical-office back-of-house. We work directly with GCs and facility managers on ITB packages and night/weekend pours to keep tenants operational. In-house polishing crews, OSHA-compliant safety plans, manufacturer-backed warranties on every industrial system we install.

**Residential in Plano (secondary section):**
> Plano's mix of '90s-era custom homes and new Legacy West builds means everything from cracked, oil-stained garages to fresh slabs ready for a one-day polyurea flake system. Residential installs carry our lifetime warranty against peeling, chipping, and UV yellowing — useful in a city where afternoon sun bakes west-facing garages well into October.

**City FAQ examples (commercial-weighted):**
- *Can you handle a Plano commercial property after hours?* Yes. Our commercial crews routinely run nights and weekends for Legacy West and Granite Park tenants to avoid business interruption.
- *Do you pull permits and meet OSHA requirements on Plano commercial jobs?* Yes — we run OSHA-compliant safety plans, carry full GL + workers' comp, and coordinate directly with the GC or facility manager on permits.
- *How fast can you coat a residential garage in Plano?* Most Plano residential garages are scoped, prepped, and coated in a single day, with vehicles back on the floor in 24–48 hours.

(Equivalent copy generated per city, swapping in local neighborhoods, employers, business parks, and landmarks.)

---

## Files touched

- `src/pages/EpoxyFlooringCity.tsx` (new)
- `src/data/serviceAreaCities.ts` (new)
- `src/pages/ServiceAreas.tsx` (link each tile to `/epoxy-flooring/{slug}`)
- `src/App.tsx` (route)
- `scripts/prerender.mjs` (add 34 routes so they prerender)
- Sitemap edge function if present (add new URLs)

## Out of scope (ask if you want it)
- Unique hero photo per city
- Embedded Google Map per city
- Pulling live Google reviews filtered by city
