// Case study data registry. Add new entries here and they'll show up on
// /case-studies and resolve at /case-studies/:slug

import after1 from "@/assets/case-studies/fast-casual-restaurant/after-1.jpg";
import after2 from "@/assets/case-studies/fast-casual-restaurant/after-2.jpg";
import after3 from "@/assets/case-studies/fast-casual-restaurant/after-3.jpg";
import after4 from "@/assets/case-studies/fast-casual-restaurant/after-4.jpg";
import after5 from "@/assets/case-studies/fast-casual-restaurant/after-5.jpg";
import after6 from "@/assets/case-studies/fast-casual-restaurant/after-6.jpg";
import before1 from "@/assets/case-studies/fast-casual-restaurant/before-1.jpg";
import before2 from "@/assets/case-studies/fast-casual-restaurant/before-2.jpg";
import before3 from "@/assets/case-studies/fast-casual-restaurant/before-3.jpg";
import before4 from "@/assets/case-studies/fast-casual-restaurant/before-4.jpg";
import before5 from "@/assets/case-studies/fast-casual-restaurant/before-5.jpg";
import before6 from "@/assets/case-studies/fast-casual-restaurant/before-6.jpg";
import during1 from "@/assets/case-studies/fast-casual-restaurant/during-1.jpg";
import during2 from "@/assets/case-studies/fast-casual-restaurant/during-2.jpg";
import during3 from "@/assets/case-studies/fast-casual-restaurant/during-3.jpg";
import during4 from "@/assets/case-studies/fast-casual-restaurant/during-4.jpg";
import during5 from "@/assets/case-studies/fast-casual-restaurant/during-5.jpg";

// Pharmaceutical manufacturing plant — polished concrete
import pharmAfter1 from "@/assets/case-studies/pharmaceutical-polished-concrete/after-1.jpg";
import pharmAfter2 from "@/assets/case-studies/pharmaceutical-polished-concrete/after-2.jpg";
import pharmAfter3 from "@/assets/case-studies/pharmaceutical-polished-concrete/after-3.jpg";
import pharmAfter4 from "@/assets/case-studies/pharmaceutical-polished-concrete/after-4.jpg";
import pharmAfter5 from "@/assets/case-studies/pharmaceutical-polished-concrete/after-5.jpg";
import pharmAfter6 from "@/assets/case-studies/pharmaceutical-polished-concrete/after-6.jpg";
import pharmBefore1 from "@/assets/case-studies/pharmaceutical-polished-concrete/before-1.jpg";
import pharmBefore2 from "@/assets/case-studies/pharmaceutical-polished-concrete/before-2.jpg";
import pharmBefore3 from "@/assets/case-studies/pharmaceutical-polished-concrete/before-3.jpg";
import pharmBefore4 from "@/assets/case-studies/pharmaceutical-polished-concrete/before-4.jpg";
import pharmBefore5 from "@/assets/case-studies/pharmaceutical-polished-concrete/before-5.jpg";
import pharmBefore6 from "@/assets/case-studies/pharmaceutical-polished-concrete/before-6.jpg";

export interface CaseStudyPhoto {
  src: string;
  alt: string;
}

export interface CaseStudy {
  slug: string;
  category: "commercial" | "residential";
  tag: string;
  title: string;
  summary: string;
  heroImage: string;
  heroAlt: string;
  // SEO
  metaTitle: string;
  metaDescription: string;
  // Project details
  location: string;
  serviceType: string;
  squareFootage: string;
  timeline: string;
  // Long-form content
  challenge: string[];
  solution: string[];
  result: string[];
  // Photo galleries
  beforePhotos: CaseStudyPhoto[];
  duringPhotos: CaseStudyPhoto[];
  afterPhotos: CaseStudyPhoto[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "fast-casual-restaurant-concrete-sealing",
    category: "commercial",
    tag: "Fast-Casual Restaurant",
    title: "Fast-Casual Restaurant — 8-Year-Old Sealant Restoration",
    summary:
      "An open dining room with a sealant that hadn't been touched since opening day eight years ago. Stained, dusting, and absorbing every spill. We deep-cleaned, restored, and resealed the slab in a single overnight visit.",
    heroImage: after2,
    heroAlt:
      "Restored and freshly sealed concrete dining room floor in a fast-casual restaurant after Legacy Industrial Coatings concrete sealing service",
    metaTitle:
      "Fast-Casual Restaurant Concrete Sealing Case Study | Legacy Industrial Coatings",
    metaDescription:
      "8-year-old restaurant sealant had failed and the slab was absorbing stains. See the before, during, and after photos of how we restored and resealed the concrete floor in one overnight visit.",
    location: "Plano, TX",
    serviceType: "Concrete Deep Clean & Reseal",
    squareFootage: "Open dining room + service area",
    timeline: "Single overnight visit",
    challenge: [
      "This fast-casual restaurant had its concrete floor sealed once — when the store first opened, eight years prior. Sealers wear down over time under daily traffic and cleaning, and at the eight-year mark there was effectively no protective layer left on the slab.",
      "Without that barrier, daily foot traffic and routine spills had been driving food oils, sauce, drink residue, and grit directly into the porous concrete. The floor had taken on a dull, blotchy appearance, was holding moisture in low spots, and was visibly dusting around high-traffic lanes.",
      "Left untreated, this is the stage where stains become permanent and the slab itself starts to break down — turning a routine reseal into a much more expensive grind-and-restoration project. It's also where customer perception starts to shift: a dirty-looking floor reads as an unsanitary, unprofessional restaurant, even when the kitchen behind it is spotless.",
    ],
    solution: [
      "We mobilized after closing and worked overnight so the restaurant didn't lose a single service. The first phase was a full mechanical and chemical deep clean — hot-water extraction with commercial-grade alkaline degreasers to pull eight years of embedded grease, biofilm, and dye out of the open pores of the slab.",
      "Once the concrete was clean and fully dry, we addressed isolated stain areas with targeted spot treatment, then applied a commercial-grade penetrating sealer matched to the floor's exposure: high-traffic dining, food and drink spills, and routine wet mopping.",
      "The sealer was applied in controlled coats with full cure time built into the overnight window so the floor was ready for full service the following morning.",
    ],
    result: [
      "By the time the morning crew arrived, the floor was back in service — only now it was sealed, protected, and dramatically easier to clean. The dull, dirty appearance was gone. Spills now bead up on the surface instead of soaking in, and nightly mopping actually gets the floor clean instead of just moving grime around.",
      "We placed this restaurant on a planned 3-year reseal cycle with quarterly professional deep cleaning in between, so they'll never again be in the position of waiting until the sealant has fully failed before doing something about it.",
      "This is the exact pattern we see in restaurants across DFW: a single sealing job at opening, then years of silence, then a panic call when the floor starts looking unprofessional. A planned reseal program prevents that — and protects the slab itself, which is the most expensive thing to replace.",
    ],
    beforePhotos: [
      { src: before1, alt: "Worn fast-casual restaurant concrete floor before sealing — visible staining and dulling from 8-year-old failed sealant" },
      { src: before2, alt: "Stained restaurant dining room concrete showing absorbed spills before sealing" },
      { src: before3, alt: "Concrete floor near service counter with embedded dirt and grime before deep cleaning" },
      { src: before4, alt: "Dull, dusting concrete floor in high-traffic restaurant lane before reseal" },
      { src: before5, alt: "Restaurant concrete with dark stains and worn-off sealant before treatment" },
      { src: before6, alt: "Eight-year-old failed concrete sealant in fast-casual restaurant before resealing" },
    ],
    duringPhotos: [
      { src: during1, alt: "Hot-water extraction deep cleaning concrete floor in restaurant overnight" },
      { src: during2, alt: "Commercial degreasing of concrete slab to remove embedded grease before resealing" },
      { src: during3, alt: "Mechanical deep clean of restaurant concrete floor in progress" },
      { src: during4, alt: "Concrete floor mid-cleaning showing brightening as embedded grime is extracted" },
      { src: during5, alt: "Restaurant concrete prepared for sealer application after deep clean" },
    ],
    afterPhotos: [
      { src: after1, alt: "Freshly sealed restaurant concrete floor — uniform, clean, and stain-resistant" },
      { src: after2, alt: "Restored fast-casual restaurant dining floor after professional concrete sealing" },
      { src: after3, alt: "Sealed concrete floor with anti-slip additive in restaurant wet zone" },
      { src: after4, alt: "Concrete floor near service counter after deep clean and reseal" },
      { src: after5, alt: "Restaurant concrete floor showing even, sealed appearance after Legacy Industrial Coatings work" },
      { src: after6, alt: "Final after photo of resealed concrete restaurant floor, ready for next-day service" },
    ],
  },
  {
    slug: "pharmaceutical-manufacturing-polished-concrete",
    category: "commercial",
    tag: "Pharmaceutical Manufacturing Plant",
    title: "Pharmaceutical Manufacturing Plant — 21,000 sq ft Polished Concrete",
    summary:
      "A 40-year-old pharmaceutical facility with badly cracked, undulating concrete needed a true high-gloss polish across 21,000 square feet — and zero production downtime. We worked overnight for four nights, filled every crack and divot with polyurea, and delivered an 800-grit polished slab the day shift never saw being built.",
    heroImage: pharmAfter5,
    heroAlt:
      "21,000 square foot pharmaceutical manufacturing plant with high-gloss 800-grit polished concrete floor by Legacy Industrial Coatings",
    metaTitle:
      "21,000 Sq Ft Pharmaceutical Plant Polished Concrete Case Study | Legacy Industrial Coatings",
    metaDescription:
      "How Legacy Industrial Coatings polished 21,000 sq ft of 40-year-old cracked concrete in a working pharmaceutical plant in Dallas, TX to an 800-grit high-gloss finish — overnight, with zero production downtime. Crack repair, polyurea fill, and FF/FL flatness capability.",
    location: "Dallas, TX",
    serviceType: "High-Gloss Polished Concrete (800 grit) + Polyurea Crack & Divot Repair",
    squareFootage: "21,000 sq ft",
    timeline: "3–4 overnight shifts (9 PM – early morning), zero production downtime",
    challenge: [
      "This was a fully operational pharmaceutical manufacturing plant in Dallas, TX, inside a 40-year-old building. The slab had four decades of forklift traffic, equipment moves, and thermal cycling on it — and it showed. Wide structural cracks ran through high-traffic lanes, surface divots and pop-outs were everywhere, and the slab had visible undulation across the 21,000 square foot footprint.",
      "Pharmaceutical environments are unforgiving floors. Dust generation has to be controlled, the surface has to clean easily, every joint and crack is a place for contamination to collect, and the floor has to handle constant pallet jack and forklift traffic without breaking down again. A bandage approach — a thin coating poured over the existing damage — would have failed within months and locked all that contamination in.",
      "The other constraint was operational. The facility runs production around the clock, and downtime in a pharma plant is measured in five and six figures per hour. We could not stop the line. Every square foot of work had to happen overnight, after the day shift left, and the floor had to be back in service before morning operations restarted.",
    ],
    solution: [
      "We mobilized after 9 PM each night and worked straight through into the early morning, four nights running. The first phase was a full survey and repair pass: every crack, divot, spall, and pop-out across the 21,000 sq ft was chased out, vacuumed clean, and filled with semi-rigid polyurea joint and crack filler. Polyurea cures fast, bonds tightly to the surrounding concrete, and grinds at the same rate as the slab — so when we polished over it, the repairs disappeared into the floor instead of telegraphing through as soft spots.",
      "From there we ran the full mechanical polishing progression. Metal-bond diamonds for the initial cut to flatten the surface and open the slab, then resin-bond diamonds stepping up through the grits — 100, 200, 400, 800 — with a lithium silicate densifier worked into the surface mid-process to harden the concrete and lock in the shine. The result is an 800-grit high-gloss polish: a finish you can read reflections in, achieved purely through mechanical refinement of the existing slab. No coatings, no topical sealers that wear off — the shine is the concrete itself.",
      "The client's spec did not require ASTM E1155 floor flatness inspections (FF/FL numbers), so we did not bring the certified F-Meter equipment to this site. It's worth noting we are equipped to perform FF (flatness) and FL (levelness) testing under ASTM E1155 on polished concrete projects when the spec calls for it — typical for warehouses with high-bay racking, automated guided vehicles, or pharma cleanrooms with strict tolerance requirements. On those jobs we measure the slab before grinding to set a baseline, polish to spec, and provide documented FF/FL numbers to the GC or owner. If your project needs documented flatness, we can scope it in.",
    ],
    result: [
      "By the end of the fourth night the floor was back in service for the day shift — only now it was a single, continuous, mirror-finish polished slab across the entire 21,000 sq ft. The cracks and divots that had defined the floor for years were gone. The undulation was visibly knocked down by the grind. The surface no longer generates dust under traffic, cleans with a routine auto-scrubber, and gives the plant the kind of bright, reflective floor that pharma auditors expect to see when they walk in.",
      "Polished concrete is the lowest lifecycle-cost floor we install for facilities like this. There is no coating to fail, no recoat cycle to budget for, and the densifier-hardened surface gets harder and more wear-resistant over time, not less. Maintenance is a clean water auto-scrub — that's it.",
      "If you operate a pharmaceutical, food, manufacturing, or distribution facility on an aging slab and the thought of shutting down production has been the thing stopping you from fixing the floor — that's the exact problem we solve. Overnight execution, full crack and divot repair, true mechanical polish, and ASTM E1155 flatness documentation when the spec requires it.",
    ],
    beforePhotos: [
      { src: pharmBefore1, alt: "21,000 square foot pharmaceutical manufacturing plant interior in Dallas, TX before polished concrete work — 40-year-old slab with cracking and surface wear" },
      { src: pharmBefore2, alt: "Aging concrete slab in pharmaceutical facility showing surface divots and pop-outs before polishing" },
      { src: pharmBefore3, alt: "Wide structural crack running through pharmaceutical plant concrete floor before polyurea repair" },
      { src: pharmBefore4, alt: "Damaged 40-year-old concrete in pharmaceutical manufacturing space prior to grinding and polishing" },
      { src: pharmBefore5, alt: "Cracked and worn warehouse-style concrete in pharma plant before mechanical polishing" },
      { src: pharmBefore6, alt: "Existing pharmaceutical plant concrete showing undulation and surface damage before Legacy Industrial Coatings polishing" },
    ],
    duringPhotos: [],
    afterPhotos: [
      { src: pharmAfter5, alt: "Reflective 21,000 sq ft polished concrete floor in Dallas, TX pharmaceutical manufacturing plant after Legacy Industrial Coatings overnight polishing project" },
      { src: pharmAfter1, alt: "Pharmaceutical plant corridor with finished high-gloss polished concrete reflecting overhead lights" },
      { src: pharmAfter2, alt: "Wide view of finished 800-grit polished concrete in pharmaceutical facility — uniform shine across the entire floor" },
      { src: pharmAfter6, alt: "Finished polished concrete in pharmaceutical plant — high-gloss, low-maintenance, ready for production" },
      { src: pharmAfter4, alt: "Close-up of polished concrete surface in pharmaceutical plant showing densified, mirror-grade 800-grit finish" },
      { src: pharmAfter3, alt: "Polyurea crack filler integrated into the finished polished concrete slab — repairs grind flush with the surrounding floor" },
    ],
  },
];

export const getCaseStudyBySlug = (slug: string) =>
  caseStudies.find((cs) => cs.slug === slug);

export const getCaseStudiesByCategory = (category: "commercial" | "residential") =>
  caseStudies.filter((cs) => cs.category === category);
