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
];

export const getCaseStudyBySlug = (slug: string) =>
  caseStudies.find((cs) => cs.slug === slug);
