

## Full SEO + AEO Overhaul (Revised)

### 1. Technical SEO & Metadata

**Homepage H1 (`HeroSection.tsx`)**
- Change H1 to: **"Premium Epoxy Flooring & Polished Concrete in Dallas-Fort Worth"**
- Audit homepage for any duplicate `<h1>` and downgrade to `<h2>`.
- Update reviews badge `180+` → `190+` (mobile + desktop).

**Per-route metadata** — unique `<title>` (≤60 chars) + 150-char meta description for every route, with strict keyword separation:
- Homepage: `Legacy Industrial Coatings | Epoxy & Polished Concrete DFW`
- `/concrete-polishing`: polishing-only keywords (no epoxy)
- `/garagefloors`, `/industrial-epoxy`, `/flake-floors`, `/residential-patio`: epoxy/coating keywords
- `/commercialfloors`, `/about-commercial`: commercial + DFW
- All other routes (`/gallery`, `/faq`, `/blog`, `/financing`, `/about`, `/warranty`, `/contact`, `/service-areas`, `/flower-mound`, `/prosper`): unique titles + descriptions
- Update `index.html` defaults to match homepage.

**Semantic HTML** — wrap each page's main content in `<main>`; verify `<nav>`, `<footer>`, `<section>` landmarks.

**Image alt-text & WebP**
- Add descriptive, location-rich alt text to every `<img>` / `OptimizedImage` (e.g., "Polished concrete floor in Dallas warehouse", "Epoxy garage floor coating in Plano TX").
- Convert local hero/gallery PNG/JPG assets in `src/assets/` and `public/commercial/` to `.webp` siblings; update imports/string refs.

### 2. Content & Keyword Depth (Hybrid approach)

**Homepage — expand existing, add city strip**
- Extend `AboutUsSection` and `FeaturesSection` copy so keywords live inside real content (industrial floor coatings, high-traffic epoxy, mechanical concrete polishing, garage floor coating, DFW commercial flooring).
- New `<ServiceAreasStrip />` component placed above the footer: a clean styled band titled **"Serving North Texas"** with cities rendered as small linked pills/text linking to `/service-areas`. Looks intentional, not spammy.
- Total homepage copy lands at 500+ unique words.

**ConcretePolishing.tsx — polishing-only expansion to 500+ words**
- Add sections: mechanical polishing process, densification chemistry, FF/FL flatness, salt-and-pepper finish, DFW cities served. **Zero epoxy keywords.**
- Updated title: "Polished Concrete Dallas-Fort Worth | Legacy Industrial Coatings".

**Keyword segmentation rules**
- Epoxy pages only: garage floor epoxy, garage floor coating, polyurea, flake systems, high-traffic epoxy.
- Polishing pages only: mechanical concrete polishing, densification, FF/FL.
- Shared: DFW commercial flooring, industrial floor coatings.

### 3. AEO (AI Engine Optimization)

**JSON-LD schema** — new `src/components/seo/StructuredData.tsx` injected via Helmet:
- `LocalBusiness` (name, address, phone 214-305-6516, geo, sameAs, openingHours, areaServed = full DFW city list).
- `Service` schema for Epoxy, Polyurea, Polished Concrete, Specialty Waterproofing.
- `Organization` with logo + sameAs.
- Page-level `FAQPage` schema generated from FAQ data.
- Mounted on homepage, polishing, garagefloors, commercialfloors, faq.

**FAQ visibility — clean Q&A list**
- `src/components/sections/HomepageFAQ.tsx` (used on `/garagefloors`): replace Radix Accordion with a clean editorial layout — bold `<h3>` question + paragraph answer, all visible in initial HTML.
- Add similar always-visible Q&A blocks to homepage, polishing, and commercialfloors with 4-6 questions each.
- FAQPage JSON-LD stays in sync.

**llms.txt** — new `public/llms.txt` (markdown):
- Business identity, locations (Plano TX HQ + Phoenix), phone numbers.
- Service catalog with one-line descriptions.
- Authority signals (millions of sq ft, lifetime warranty, licensed/insured, 190+ Google reviews).
- DFW service-area city list.
- Key page URLs for AI crawlers.

### 4. Navigation & Internal Linking

**Footer.tsx**
- Add "Services" column with descriptive links: "Epoxy Garage Floor Coatings", "Polished Concrete Floors", "Industrial Epoxy Flooring", "Commercial Floor Coatings", "Residential Patio Coatings".
- Expand "Service Areas" column with North Texas cities: Dallas, Fort Worth, Plano, Frisco, McKinney, Allen, Richardson, Carrollton, Lewisville, Prosper, Celina, Sherman, Anna, Melissa, Sanger, The Colony, Flower Mound.

**Anchor-text audit** — sweep "Click here" / "Learn more" / "Read more" → descriptive anchors ("View our Polished Concrete services", "See DFW garage floor coating gallery", "Get an epoxy flooring quote in Dallas").

### 5. Build Errors

The 7 pre-existing TypeScript build errors (unrelated to SEO work, in `IntakeForm.tsx`, `useQuoteSubmission.tsx`, `useCRM.ts`, `Financing.tsx`) will be fixed in the same pass so the project builds cleanly.

### Technical Details

- Shared city list lives in new `src/constants/serviceAreas.ts`, consumed by `ServiceAreasStrip`, `Footer`, JSON-LD, and SEO copy.
- New components: `src/components/seo/StructuredData.tsx`, `src/components/seo/ServiceAreasStrip.tsx`.
- New file: `public/llms.txt`.
- Edited: `index.html`, `src/pages/DFW.tsx`, `src/pages/ConcretePolishing.tsx`, all other route pages (metadata only), `src/components/sections/HeroSection.tsx`, `src/components/sections/HomepageFAQ.tsx`, `src/components/sections/AboutUsSection.tsx`, `src/components/sections/FeaturesSection.tsx`, `src/components/Footer.tsx`, plus alt-text edits across image components.

### Visual Impact

- Homepage gains one new "Serving North Texas" strip above the footer (looks like a real service-area block).
- `/garagefloors` FAQ becomes a clean editorial Q&A list instead of click-to-open accordions.
- Everything else is invisible to users (metadata, schema, alt-text, copy expansion inside existing sections).

