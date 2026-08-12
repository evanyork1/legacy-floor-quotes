// Industry photo sets — 3 real-looking images per industry
import iw1 from "@/assets/industries/industrial-warehouse-1.jpg";
import iw2 from "@/assets/industries/industrial-warehouse-2.jpg";
import iw3 from "@/assets/industries/industrial-warehouse-3.jpg";
import mf1 from "@/assets/industries/manufacturing-1.jpg";
import mf2 from "@/assets/industries/manufacturing-2.jpg";
import mf3 from "@/assets/industries/manufacturing-3.jpg";
import dc1 from "@/assets/industries/data-center-1.jpg";
import dc2 from "@/assets/industries/data-center-2.jpg";
import dc3 from "@/assets/industries/data-center-3.jpg";
import hc1 from "@/assets/industries/healthcare-1.jpg";
import hc2 from "@/assets/industries/healthcare-2.jpg";
import hc3 from "@/assets/industries/healthcare-3.jpg";
import ed1 from "@/assets/industries/education-1.jpg";
import ed2 from "@/assets/industries/education-2.jpg";
import ed3 from "@/assets/industries/education-3.jpg";
import ht1 from "@/assets/industries/hotel-hospitality-1.jpg";
import ht2 from "@/assets/industries/hotel-hospitality-2.jpg";
import ht3 from "@/assets/industries/hotel-hospitality-3.jpg";
import ae1 from "@/assets/industries/aerospace-1.jpg";
import ae2 from "@/assets/industries/aerospace-2.jpg";
import ae3 from "@/assets/industries/aerospace-3.jpg";
import mu1 from "@/assets/industries/multifamily-1.jpg";
import mu2 from "@/assets/industries/multifamily-2.jpg";
import mu3 from "@/assets/industries/multifamily-3.jpg";
import iwHeroAsset from "@/assets/industries/industrial-warehouse-hero.avif.asset.json";
import dcHeroAsset from "@/assets/industries/data-center-hero.avif.asset.json";
import aeHeroAsset from "@/assets/industries/aerospace-hero.avif.asset.json";
import muHeroAsset from "@/assets/industries/multifamily-hero.jpg.asset.json";
const iwHero = iwHeroAsset.url;
const dcHero = dcHeroAsset.url;
const aeHero = aeHeroAsset.url;
const muHero = muHeroAsset.url;
const htHero = "https://legacyindustrialcoatings.com/assets/after-2-JMxEp3Io.jpg";
import of1 from "@/assets/industries/office-corporate-1.jpg";
import of2 from "@/assets/industries/office-corporate-2.jpg";
import of3 from "@/assets/industries/office-corporate-3.jpg";
import rt1 from "@/assets/industries/retail-1.jpg";
import rt2 from "@/assets/industries/retail-2.jpg";
import rt3 from "@/assets/industries/retail-3.jpg";
import ag1 from "@/assets/industries/agriculture-facilities-1.jpg";
import ag2 from "@/assets/industries/agriculture-facilities-2.jpg";
import ag3 from "@/assets/industries/agriculture-facilities-3.jpg";

export type Industry = {
  slug: string;
  title: string;
  shortTitle: string;
  cardDesc: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  gallery: string[];
  intro: string;
  overview: string[];
  challenges: string[];
  systems: { name: string; desc: string }[];
  faqs: { q: string; a: string }[];
};

export const industries: Industry[] = [
  {
    slug: "industrial-warehouse",
    shortTitle: "Industrial & Warehouse",
    title: "Industrial & Warehouse Epoxy Flooring in DFW",
    cardDesc: "Heavy-duty epoxy and urethane floors built for forklift traffic and hard use.",
    metaTitle: "Industrial & Warehouse Epoxy Flooring DFW | Legacy Industrial Coatings",
    metaDescription: "Heavy-duty epoxy, urethane, and polished concrete floors for warehouses and distribution centers across Dallas-Fort Worth. Built for forklift traffic and 24/7 use.",
    heroImage: iwHero,
    gallery: [iw1, iw2, iw3],
    intro: "Warehouse and distribution floors take a beating every day. Forklifts, pallet jacks, dropped loads, and constant foot traffic all wear a slab down fast. Legacy Industrial Coatings installs high-build epoxy and urethane resin systems that hold up to the punishment and keep your operation moving.",
    overview: [
      "We install thick-mil epoxy mortar, self-leveling epoxy, and cementitious urethane systems sized to your load and traffic. Every job starts with proper slab prep — diamond grinding or shot blasting to lock the resin to the concrete.",
      "Line striping, safety markings, and joint filling are all part of the scope. We can stage work in zones so racking never has to fully shut down.",
    ],
    challenges: [
      "Forklift wheels and pallet jacks that chew up bare concrete",
      "Oil, hydraulic fluid, and battery acid spills",
      "Dusting slabs that contaminate product",
      "Cracked control joints and worn saw cuts",
      "Fast turnaround needs — no room for long shutdowns",
    ],
    systems: [
      { name: "High-Build Epoxy Mortar", desc: "3/16\" to 1/4\" epoxy mortar for the toughest wheel and impact loads." },
      { name: "Cementitious Urethane", desc: "Handles thermal shock, chemical spills, and hot wash-downs." },
      { name: "Polished Concrete", desc: "Densified and diamond-polished slabs for showrooms and light-duty aisles." },
      { name: "Joint Filling & Repair", desc: "Semi-rigid polyurea to protect joints from spalling under wheel loads." },
    ],
    faqs: [
      { q: "How long will a warehouse epoxy floor last?", a: "A properly prepped high-build epoxy warehouse floor lasts 10 to 20 years under normal forklift traffic. Urethane systems can last even longer in harsh environments." },
      { q: "Can you install while we stay operational?", a: "Yes. We phase the work by zone, work nights or weekends if needed, and use fast-cure resin so racking areas are back in service in hours." },
    ],
  },
  {
    slug: "manufacturing",
    shortTitle: "Manufacturing",
    title: "Manufacturing Plant Resin Flooring in DFW",
    cardDesc: "Chemical-resistant resin floors for plants and production lines.",
    metaTitle: "Manufacturing Plant Epoxy & Urethane Flooring DFW | Legacy Industrial Coatings",
    metaDescription: "Chemical-resistant epoxy, urethane cement, and quartz resin floors for manufacturing plants across Dallas-Fort Worth. Built for heat, chemicals, and heavy production.",
    heroImage: mf1,
    gallery: [mf1, mf2, mf3],
    intro: "Manufacturing floors have to handle chemicals, heat, heavy equipment, and non-stop production. Legacy Industrial Coatings installs resin flooring systems that stand up to the process — clean, seamless, and safe underfoot.",
    overview: [
      "We spec resin systems that match your specific chemical, thermal, and load profile. Every install includes moisture testing, slab prep, and coordination with your production schedule.",
      "Anti-slip broadcast, colored zones, and cove base come standard for plants that need clear safety zoning and sanitary detailing.",
    ],
    challenges: [
      "Chemical spills that eat through unprotected concrete",
      "Thermal shock from hot equipment and wash-downs",
      "Heavy machinery loads and vibration",
      "Downtime pressure — every hour of shutdown costs money",
      "Slip and safety compliance",
    ],
    systems: [
      { name: "Urethane Cement", desc: "The go-to for high-heat, chemical, and thermal-shock plants." },
      { name: "Chemical-Resistant Epoxy", desc: "Novolac and vinyl ester epoxies for aggressive chemical exposure." },
      { name: "Quartz Broadcast", desc: "Non-slip, decorative quartz systems for production zones." },
      { name: "Secondary Containment", desc: "Chemical-resistant resin linings for containment areas and berms." },
    ],
    faqs: [
      { q: "What resin holds up to hot oil and steam?", a: "Cementitious urethane is the standard for hot wash-down and thermal-shock areas. It handles temperatures up to 250°F and resists most process chemicals." },
      { q: "Can you match our safety color code?", a: "Yes. We tint resin to match OSHA and internal safety color standards for walkways, hazard zones, and equipment pads." },
    ],
  },
  {
    slug: "data-center",
    shortTitle: "Data Center",
    title: "Data Center ESD Flooring in DFW",
    cardDesc: "ESD-rated static-control resin floors that meet ANSI/ESD S20.20.",
    metaTitle: "Data Center ESD Epoxy Flooring DFW | Legacy Industrial Coatings",
    metaDescription: "Static-dissipative and conductive ESD resin flooring for data centers across Dallas-Fort Worth. Meets ANSI/ESD S20.20 with documented resistance testing.",
    heroImage: dcHero,
    gallery: [dc1, dc2, dc3],
    intro: "Data center floors have to protect sensitive equipment from static discharge without giving up durability or cleanliness. Legacy Industrial Coatings installs ESD-rated resin systems that meet ANSI/ESD S20.20 with documented testing.",
    overview: [
      "We install static-dissipative and conductive epoxy systems with a copper grounding grid, tied into your building ground. Every job includes point-to-point resistance testing and a written report.",
      "Low-VOC, low-odor systems keep clean rooms and live IT space safe during install.",
    ],
    challenges: [
      "Static discharge risk to servers and switch gear",
      "Cleanliness and dust control in live rooms",
      "24/7 uptime — no room for long shutdowns",
      "Precise grounding and resistance requirements",
    ],
    systems: [
      { name: "ESD Conductive Epoxy", desc: "Meets ANSI/ESD S20.20 with resistance between 2.5×10⁴ and 1×10⁶ ohms." },
      { name: "Static-Dissipative Epoxy", desc: "Controlled resistance for equipment rooms and network operations centers." },
      { name: "Low-VOC Systems", desc: "Safe for install in occupied, sensitive spaces." },
    ],
    faqs: [
      { q: "Do you test the finished floor?", a: "Yes. We perform point-to-point and point-to-ground resistance testing per ANSI/ESD S20.20 and provide a written report." },
      { q: "Can you install without shutting the room down?", a: "In most cases, yes. We stage by aisle or row and use low-VOC, fast-cure systems to keep live equipment safe." },
    ],
  },
  {
    slug: "healthcare",
    shortTitle: "Healthcare",
    title: "Healthcare & Hospital Resin Flooring in DFW",
    cardDesc: "Seamless, easy-to-clean resin floors for hospitals, labs, and clinics.",
    metaTitle: "Healthcare & Hospital Epoxy Flooring DFW | Legacy Industrial Coatings",
    metaDescription: "Seamless, antimicrobial resin flooring for hospitals, surgery centers, labs, and clinics across Dallas-Fort Worth. Easy to clean and infection-control ready.",
    heroImage: hc1,
    gallery: [hc1, hc2, hc3],
    intro: "Healthcare floors have to be seamless, sanitary, and safe. Legacy Industrial Coatings installs resin flooring systems that meet infection control standards and hold up to constant cleaning and heavy carts.",
    overview: [
      "Seamless epoxy and urethane systems with integral cove base eliminate the seams and joints where bacteria hide. Antimicrobial additives are available for surgery and clean-room areas.",
      "We work nights and weekends around live patient wings and use low-odor, low-VOC systems so operations continue safely.",
    ],
    challenges: [
      "Infection control and easy cleaning",
      "Chemical resistance to strong disinfectants",
      "Heavy cart and gurney wheels",
      "Working around occupied patient care areas",
    ],
    systems: [
      { name: "Seamless Epoxy with Integral Cove", desc: "Eliminates seams and floor-to-wall joints for full sanitation." },
      { name: "Urethane Cement", desc: "Handles surgical wash-downs and thermal shock in sterilization areas." },
      { name: "Antimicrobial Resin", desc: "Silver-ion additives for infection-control zones." },
    ],
    faqs: [
      { q: "Are your resin floors safe for clean rooms?", a: "Yes. Our low-VOC, low-odor systems are safe for occupied and sensitive spaces, and antimicrobial resin is available for clean-room applications." },
      { q: "Can you work around live patient areas?", a: "Yes. We schedule around your operations, use low-odor systems, and phase the work so patient care never stops." },
    ],
  },
  {
    slug: "education",
    shortTitle: "Education",
    title: "School & University Resin Flooring in DFW",
    cardDesc: "Long-lasting epoxy and polished concrete for schools, labs, and gyms.",
    metaTitle: "School Epoxy & Polished Concrete Flooring DFW | Legacy Industrial Coatings",
    metaDescription: "Durable resin and polished concrete floors for K-12 schools, universities, labs, and gyms across Dallas-Fort Worth. Installed on summer schedules with clean punch.",
    heroImage: ed1,
    gallery: [ed1, ed2, ed3],
    intro: "Schools and universities need floors that survive years of heavy foot traffic, backpacks, and cleaning crews. Legacy Industrial Coatings installs resin and polished concrete floors that look sharp and last through decades of use.",
    overview: [
      "We work to tight summer schedules and school-district specs, from single classrooms to full campus re-coats. Polished concrete is popular for common areas, epoxy for labs and shops.",
      "Chemical-resistant systems for chem labs and shops keep spills off the slab and easy to clean.",
    ],
    challenges: [
      "Tight summer install windows",
      "Heavy foot traffic and dragged furniture",
      "Chemical spills in science labs and shops",
      "Budget and district spec compliance",
    ],
    systems: [
      { name: "Polished Concrete", desc: "Low-maintenance, high-gloss finish for hallways, gyms, and common areas." },
      { name: "Chemical-Resistant Epoxy", desc: "For chem labs, shop floors, and CTE spaces." },
      { name: "Decorative Flake Epoxy", desc: "Colored flake systems for locker rooms and back-of-house." },
    ],
    faqs: [
      { q: "Can you install on a summer break schedule?", a: "Yes. Most school jobs run on 6 to 10 week summer windows. We plan around your calendar and use fast-cure systems where needed." },
      { q: "What is the best floor for a chem lab?", a: "Chemical-resistant epoxy or novolac epoxy is the standard. Both stand up to acids and bases used in school labs." },
    ],
  },
  {
    slug: "hotel-hospitality",
    shortTitle: "Hotel & Hospitality",
    title: "Hotel & Hospitality Resin Flooring in DFW",
    cardDesc: "Polished concrete and decorative resin floors for back-of-house and public spaces.",
    metaTitle: "Hotel & Hospitality Epoxy Flooring DFW | Legacy Industrial Coatings",
    metaDescription: "Polished concrete, decorative resin, and epoxy floors for hotel kitchens, back-of-house, and public areas across Dallas-Fort Worth. Guest-safe and quiet installs.",
    heroImage: htHero,
    gallery: [ht1, ht2, ht3],
    intro: "Hotels and hospitality properties need floors that look great in public spaces and hold up in the back-of-house. Legacy Industrial Coatings installs polished concrete, decorative resin, and urethane cement floors that handle both.",
    overview: [
      "Polished concrete and decorative flake epoxy for lobbies and public areas. Urethane cement for kitchens, dish rooms, and laundry.",
      "We work nights and around guest activity, use low-odor systems, and coordinate with property management to protect the guest experience.",
    ],
    challenges: [
      "Guest-facing spaces need great aesthetics",
      "Kitchens face grease, heat, and daily wash-downs",
      "Occupied properties — install has to be quiet and low-odor",
      "Fast turnaround on guest rooms and public areas",
    ],
    systems: [
      { name: "Polished Concrete", desc: "High-gloss, low-maintenance finish for lobbies and public space." },
      { name: "Urethane Cement", desc: "For kitchens, dish rooms, and laundry — handles grease and hot water." },
      { name: "Decorative Flake or Quartz", desc: "Custom-blended flake for back-of-house and support spaces." },
    ],
    faqs: [
      { q: "Can you install while guests are on site?", a: "Yes. We use low-VOC, low-odor systems, work nights when needed, and phase the job to protect the guest experience." },
      { q: "What is the best floor for a hotel kitchen?", a: "Cementitious urethane. It handles hot grease, wash-downs, and thermal shock better than any other resin system." },
    ],
  },
  {
    slug: "aerospace",
    shortTitle: "Aerospace",
    title: "Aerospace Hangar & MRO Flooring in DFW",
    cardDesc: "Clean, high-gloss resin floors for hangars, MRO shops, and assembly bays.",
    metaTitle: "Aerospace Hangar Epoxy Flooring DFW | Legacy Industrial Coatings",
    metaDescription: "High-build epoxy, urethane, and ESD resin flooring for aerospace hangars, MRO facilities, and assembly bays across Dallas-Fort Worth. Chemical and fuel resistant.",
    heroImage: aeHero,
    gallery: [ae1, ae2, ae3],
    intro: "Aerospace floors face jet fuel, hydraulic fluid, and heavy aircraft loads. Legacy Industrial Coatings installs high-build epoxy and urethane systems that stand up to hangar and MRO work — clean, bright, and easy to spot FOD on.",
    overview: [
      "High-build epoxy for tug and towbar loads, chemical-resistant systems for fuel and Skydrol resistance, and ESD-rated resin for avionics bays.",
      "Bright, high-reflectance finishes cut lighting costs and make FOD easy to see.",
    ],
    challenges: [
      "Jet fuel, Skydrol, and hydraulic fluid exposure",
      "Heavy aircraft, tug, and jack point loads",
      "FOD visibility on shop floors",
      "ESD control in avionics areas",
    ],
    systems: [
      { name: "High-Build Epoxy Mortar", desc: "Thick-mil epoxy for tow bar, tug, and jack point loads." },
      { name: "Chemical-Resistant Novolac", desc: "Stands up to Skydrol, jet fuel, and hydraulic fluid." },
      { name: "ESD Conductive Resin", desc: "For avionics bays and static-sensitive assembly." },
    ],
    faqs: [
      { q: "What resin holds up to Skydrol?", a: "Novolac epoxy is the standard for Skydrol resistance. It handles the aggressive fluid without softening or blistering." },
      { q: "Can the floor be bright enough for FOD checks?", a: "Yes. High-reflectance white or light-gray topcoats bounce light and make foreign object debris easy to see." },
    ],
  },
  {
    slug: "multifamily",
    shortTitle: "Multifamily",
    title: "Multifamily Epoxy & Polished Concrete in DFW",
    cardDesc: "Epoxy and polished concrete for garages, breezeways, and amenity spaces.",
    metaTitle: "Multifamily Epoxy Garage & Breezeway Flooring DFW | Legacy Industrial Coatings",
    metaDescription: "Epoxy, deck coatings, and polished concrete for multifamily garages, breezeways, and amenity areas across Dallas-Fort Worth. Turn-and-burn schedules welcome.",
    heroImage: muHero,
    gallery: [mu1, mu2, mu3],
    intro: "Multifamily properties need durable, good-looking resin floors for garages, breezeways, trash rooms, and amenity spaces. Legacy Industrial Coatings installs systems that hold up to residents, guests, and years of turnover.",
    overview: [
      "Decorative flake epoxy for breezeways and amenity floors, deck coatings for elevated walkways, and high-build epoxy for parking garages.",
      "We phase work around resident traffic and coordinate with property management on notices and access.",
    ],
    challenges: [
      "Resident and guest traffic through the work zone",
      "Elevated deck waterproofing on breezeways",
      "Trash room chemicals and odors",
      "Fast turnover between phases",
    ],
    systems: [
      { name: "Decorative Flake Epoxy", desc: "Colored flake for breezeways, trash rooms, and amenity areas." },
      { name: "Neogard Deck Coatings", desc: "Waterproof pedestrian deck coatings for elevated walkways." },
      { name: "High-Build Garage Epoxy", desc: "Wheel- and oil-resistant epoxy for parking structures." },
    ],
    faqs: [
      { q: "Can you seal an elevated breezeway or walkway?", a: "Yes. We install Neogard and Hempel waterproof deck coating systems for elevated pedestrian decks and walkways." },
      { q: "Will residents smell the install?", a: "We use low-VOC, low-odor systems and work by zone with clear notices posted, so daily life keeps moving." },
    ],
  },
  {
    slug: "office-corporate",
    shortTitle: "Office & Corporate",
    title: "Office & Corporate Polished Concrete in DFW",
    cardDesc: "Polished concrete and decorative resin for modern workspaces and lobbies.",
    metaTitle: "Office & Corporate Polished Concrete Flooring DFW | Legacy Industrial Coatings",
    metaDescription: "Polished concrete and decorative resin floors for corporate offices, lobbies, and workspaces across Dallas-Fort Worth. Modern finishes, clean installs.",
    heroImage: of1,
    gallery: [of1, of2, of3],
    intro: "Modern offices want floors that look sharp, cost less to maintain, and hold up to daily traffic. Legacy Industrial Coatings installs polished concrete and decorative resin systems that fit the design vision and the operating budget.",
    overview: [
      "Diamond-polished concrete in a range of aggregate exposures and gloss levels. Decorative flake epoxy and metallic resin for accent areas and lobbies.",
      "Low-VOC, low-dust processes let us work in occupied buildings without shutting the whole floor down.",
    ],
    challenges: [
      "Design-forward look with real durability",
      "Working around occupied office space",
      "Low-VOC and low-dust requirements",
      "Coordination with GC on tenant fit-outs",
    ],
    systems: [
      { name: "Polished Concrete", desc: "Diamond-ground and densified for high gloss and low maintenance." },
      { name: "Decorative Flake Epoxy", desc: "Custom-blend flake for accent spaces and break rooms." },
      { name: "Metallic Epoxy", desc: "One-of-a-kind decorative resin for lobbies and feature areas." },
    ],
    faqs: [
      { q: "How long does polished concrete last in an office?", a: "A properly polished and densified concrete floor lasts 20 years or more with minimal maintenance — usually just periodic burnishing and a re-guard." },
      { q: "Is it noisy or dusty to polish concrete indoors?", a: "We use HEPA-vacuumed grinders and wet or dry polishing depending on the space. Most jobs are low-dust and can run in occupied buildings." },
    ],
  },
  {
    slug: "retail",
    shortTitle: "Retail",
    title: "Retail Store Flooring in DFW",
    cardDesc: "Durable resin and polished concrete floors that hold up to foot traffic.",
    metaTitle: "Retail Epoxy & Polished Concrete Flooring DFW | Legacy Industrial Coatings",
    metaDescription: "Polished concrete, decorative resin, and epoxy floors for retail stores, showrooms, and shopping centers across Dallas-Fort Worth. Overnight install available.",
    heroImage: rt1,
    gallery: [rt1, rt2, rt3],
    intro: "Retail floors have to sell the brand and take the punishment of thousands of shoppers a week. Legacy Industrial Coatings installs polished concrete and resin systems that look right for the store and hold up to the traffic.",
    overview: [
      "Polished concrete in custom gloss and aggregate levels. Decorative resin for accent zones and back-of-house. Fast-cure systems for overnight resets between store hours.",
      "We work national and regional store rollouts on tight schedules and consistent specs.",
    ],
    challenges: [
      "Brand-matched aesthetics",
      "High foot traffic and rolling carts",
      "Tight overnight install windows",
      "Roll-out consistency across multiple locations",
    ],
    systems: [
      { name: "Polished Concrete", desc: "Custom gloss and aggregate exposure to match the brand." },
      { name: "Decorative Flake or Quartz", desc: "Color-blended systems for accent and back-of-house zones." },
      { name: "Fast-Cure Epoxy", desc: "Overnight-return systems for stores that can't lose a day of sales." },
    ],
    faqs: [
      { q: "Can you install in an overnight window?", a: "Yes. Fast-cure resin systems can be installed and open to foot traffic in 8 to 12 hours." },
      { q: "Do you handle national retail rollouts?", a: "Yes. We work off national spec packages and coordinate with your construction team on consistent finish and schedule across locations." },
    ],
  },
  {
    slug: "agriculture-facilities",
    shortTitle: "Agriculture Facilities",
    title: "Agriculture & Food Facility Resin Flooring in DFW",
    cardDesc: "Sanitary, wash-down resin floors for barns, plants, and processing spaces.",
    metaTitle: "Agriculture & Food Facility Epoxy Flooring DFW | Legacy Industrial Coatings",
    metaDescription: "Sanitary urethane cement, epoxy, and quartz resin floors for agriculture, food processing, and wash-down facilities across Dallas-Fort Worth. USDA and FDA friendly.",
    heroImage: ag1,
    gallery: [ag1, ag2, ag3],
    intro: "Agriculture and food processing floors face daily wash-downs, harsh chemicals, and heavy loads. Legacy Industrial Coatings installs urethane cement and resin systems that are USDA and FDA friendly and built for hard, sanitary use.",
    overview: [
      "Cementitious urethane with integral cove base for wash-down zones. Chemical-resistant epoxy for processing rooms. Anti-slip broadcast systems for wet areas.",
      "Every install is planned around your production schedule with fast-cure systems where downtime is critical.",
    ],
    challenges: [
      "Daily wash-downs with hot water and sanitizers",
      "Thermal shock from cook and cool cycles",
      "USDA and FDA sanitary requirements",
      "Slip resistance in wet zones",
    ],
    systems: [
      { name: "Cementitious Urethane", desc: "The gold standard for USDA and FDA wet processing environments." },
      { name: "Integral Cove Base", desc: "Seamless resin cove where wall meets floor for full sanitation." },
      { name: "Anti-Slip Broadcast", desc: "Aggregate-broadcast finish for safe footing in wet zones." },
    ],
    faqs: [
      { q: "Is your resin flooring USDA compliant?", a: "Yes. Cementitious urethane and USDA-compliant epoxy systems meet federal sanitary standards for food and beverage processing." },
      { q: "Can you install with integral cove?", a: "Yes. We install seamless resin cove base up the wall to eliminate the floor-to-wall joint where bacteria collect." },
    ],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
