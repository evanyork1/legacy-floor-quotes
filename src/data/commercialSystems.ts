import heroEpoxy from "@/assets/hero-epoxy.jpg";
import apartmentExterior from "@/assets/apartment-exterior.jpg";
import industryIndustrial from "@/assets/industry-industrial.webp";
import industryManufacturing from "@/assets/industry-manufacturing.webp";
import industryHealthcare from "@/assets/industry-healthcare.webp";
import industryDatacenter from "@/assets/industry-datacenter.webp";
import industryAerospace from "@/assets/industry-aerospace.webp";

import urethaneRed from "@/assets/urethane-cement-red.jpeg.asset.json";
import urethaneGray from "@/assets/urethane-cement-gray.jpg.asset.json";
import epoxyAutoShop from "@/assets/epoxy-auto-shop.png.asset.json";
import epoxyWhiteCorridor from "@/assets/epoxy-white-corridor.jpg.asset.json";
import polishedGrinding from "@/assets/polished-grinding.jpg.asset.json";
import polishedTastingDetail from "@/assets/polished-tasting-detail.jpg.asset.json";
import polishedTastingRoom from "@/assets/polished-tasting-room.jpg.asset.json";
import polishedWarehouse from "@/assets/polished-warehouse.jpg.asset.json";
import polishedCidery from "@/assets/polished-cidery.webp.asset.json";
import polishedShowroom from "@/assets/polished-showroom.jpg.asset.json";
import sealedTasting from "@/assets/sealed-concrete-tasting.jpg.asset.json";
import sealedCidery from "@/assets/sealed-concrete-cidery.webp.asset.json";

const epoxyGallery = [epoxyAutoShop.url, epoxyWhiteCorridor.url, heroEpoxy];
const urethaneGallery = [urethaneRed.url, urethaneGray.url, industryManufacturing];
const polishedGallery = [
  polishedShowroom.url,
  polishedTastingRoom.url,
  polishedWarehouse.url,
  polishedCidery.url,
  polishedTastingDetail.url,
  polishedGrinding.url,
];

export type Product = {
  slug: string;
  shortTitle: string;
  title: string;
  cardDesc: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  gallery: string[];
  intro: string;
  overview: string[];
  benefits: string[];
  useCases: string[];
  systems: { name: string; desc: string }[];
  faqs: { q: string; a: string }[];
  extraSections?: { eyebrow: string; heading: string; paragraphs: string[] }[];
};

const gallery = (img: string) => [img, heroEpoxy, apartmentExterior];

export const products: Product[] = [
  {
    slug: "epoxy-flooring",
    shortTitle: "Epoxy",
    title: "Commercial Epoxy Flooring in Dallas-Fort Worth",
    cardDesc: "Seamless high-build epoxy and self-leveling systems for tough commercial spaces.",
    metaTitle: "Commercial Epoxy Flooring DFW | Legacy Industrial Coatings",
    metaDescription: "Seamless high-build epoxy, self-leveling epoxy, and decorative flake and quartz broadcast systems installed across Dallas-Fort Worth. Built for warehouses, plants, and clean spaces.",
    heroImage: epoxyAutoShop.url,
    gallery: epoxyGallery,
    intro: "Epoxy is the workhorse of commercial resin flooring. Legacy Industrial Coatings installs seamless, high-build epoxy systems that hold up to forklifts, chemicals, and years of hard use across the DFW Metroplex.",
    overview: [
      "We install self-leveling epoxy, high-build epoxy mortar, and decorative flake or quartz broadcast systems. Every job starts with diamond-ground or shot-blasted slab prep so the resin bonds tight to the concrete.",
      "Colors, non-slip aggregate, safety striping, and cove base are all part of the scope. We match the system to your load, chemicals, and thermal profile — not a one-size answer.",
    ],
    benefits: [
      "Seamless surface with no grout lines or seams to trap dirt",
      "Chemical, oil, and impact resistant",
      "Easy to clean and sanitize",
      "Custom colors, flake blends, and safety zoning",
      "10 to 20-year service life with proper prep",
    ],
    useCases: [
      "Warehouses and distribution centers",
      "Manufacturing plants and production lines",
      "Automotive shops and service bays",
      "Commercial kitchens and back-of-house",
      "Showrooms and retail floors",
    ],
    systems: [
      { name: "Self-Leveling Epoxy", desc: "Smooth, seamless finish at 40 to 125 mils for warehouses and plants." },
      { name: "High-Build Epoxy Mortar", desc: "3/16\" to 1/4\" trowel-applied mortar for the toughest wheel and impact loads." },
      { name: "Decorative Flake Broadcast", desc: "Colored vinyl flake broadcast into epoxy for a bright, non-slip surface." },
      { name: "Quartz Broadcast", desc: "Colored quartz broadcast into resin for extra durability and grip." },
    ],
    faqs: [
      { q: "How long does a commercial epoxy floor last?", a: "A properly prepped and installed commercial epoxy floor lasts 10 to 20 years or more, depending on traffic, chemicals, and use." },
      { q: "How long does an epoxy install take?", a: "Most commercial epoxy jobs take 2 to 5 days from prep to final cure. Fast-cure systems can be back in service in hours." },
      { q: "Do you install over old epoxy?", a: "Sometimes. We inspect the old coating, test bond strength, and either re-coat or grind it off before installing a new resin floor." },
      { q: "What is a moisture mitigation system?", a: "It's an epoxy vapor barrier we roll onto the slab before the epoxy floor goes down. It stops water vapor from pushing up through the concrete and lifting the finish floor." },
      { q: "Do you always moisture test the slab?", a: "Yes. On commercial jobs we bring in a third-party testing company to run moisture tests on the slab before we quote the system. That way the numbers are neutral and the right mitigation is spec'd." },
    ],
    extraSections: [
      {
        eyebrow: "Slab Protection",
        heading: "Moisture Mitigation Systems",
        paragraphs: [
          "Concrete slabs give off water vapor. If that vapor is too high, it will push up through the slab and lift, blister, or peel an epoxy floor. On any commercial epoxy job, we plan for this up front.",
          "Before we quote the system, we bring in a third-party moisture testing company to run calcium chloride (ASTM F1869) and in-slab relative humidity (ASTM F2170) tests on your slab. Using an outside testing company keeps the numbers neutral — the readings are not coming from the crew that wants to sell you the floor.",
          "If the slab reads high, we install a moisture mitigation system before the epoxy goes down. This is a two-coat epoxy vapor barrier that seals the slab and gives the epoxy floor a stable surface to bond to. Once the mitigation is in, we install the epoxy system on top the same way we would on a dry slab.",
          "Not every slab needs mitigation. When the tests come back low, we skip it and save you the cost. When they come back high, mitigation is the difference between a floor that lasts 15 years and a floor that fails in the first year.",
        ],
      },
    ],
  },
  {
    slug: "urethane-cement",
    shortTitle: "Urethane Cement",
    title: "Urethane Cement Flooring in Dallas-Fort Worth",
    cardDesc: "Cementitious urethane systems built for heat, chemicals, and wet processing.",
    metaTitle: "Urethane Cement Flooring DFW | Legacy Industrial Coatings",
    metaDescription: "Cementitious urethane flooring for food and beverage plants, cold storage, and wet processing across Dallas-Fort Worth. USDA and FDA-friendly, thermal-shock resistant.",
    heroImage: urethaneRed.url,
    gallery: urethaneGallery,
    intro: "Urethane cement is the gold standard for food plants, breweries, and any space that sees hot wash-downs, thermal shock, or heavy chemical exposure. Legacy Industrial Coatings installs USDA and FDA-friendly urethane systems across DFW.",
    overview: [
      "Cementitious urethane bonds to green or older concrete and handles temperature swings that would crack a standard epoxy. It's the go-to system for food and beverage processing, breweries, dairies, and cold storage.",
      "We install slurry, mortar, and self-leveling grades, with integral cove base and anti-slip broadcast for full sanitary detail.",
    ],
    benefits: [
      "Handles thermal shock from cook and cool cycles",
      "USDA and FDA-friendly for food contact zones",
      "Resistant to acids, sugars, oils, and sanitizers",
      "Steam and hot wash-down safe",
      "Bonds to green concrete for fast schedules",
    ],
    useCases: [
      "Food and beverage processing",
      "Breweries and distilleries",
      "Dairies and meat plants",
      "Cold storage and freezer rooms",
      "Commercial kitchens and dishrooms",
    ],
    systems: [
      { name: "Urethane Slurry", desc: "3/16\" trowel-applied urethane slurry for wet processing zones." },
      { name: "Urethane Mortar", desc: "1/4\" heavy-duty mortar for the most extreme thermal and chemical loads." },
      { name: "Self-Leveling Urethane", desc: "Smooth, seamless urethane finish for lighter-duty sanitary spaces." },
      { name: "Integral Cove Base", desc: "Seamless resin cove where wall meets floor to eliminate bacteria traps." },
    ],
    faqs: [
      { q: "Is urethane cement USDA compliant?", a: "Yes. Cementitious urethane meets federal USDA and FDA sanitary standards for food and beverage processing environments." },
      { q: "Can you install urethane in a cold storage room?", a: "Yes. Urethane cement is one of the few resin systems that installs and cures reliably at low temperatures." },
      { q: "How is urethane different from epoxy?", a: "Urethane cement handles heat, thermal shock, and hot wash-downs better than epoxy. Epoxy is harder and better for pure abrasion and chemical resistance in dry environments." },
    ],
  },
  {
    slug: "quartz-flooring",
    shortTitle: "Quartz Flooring",
    title: "Quartz Broadcast Flooring in Dallas-Fort Worth",
    cardDesc: "Colored quartz broadcast into resin for a sanitary, non-slip commercial surface.",
    metaTitle: "Quartz Broadcast Flooring DFW | Legacy Industrial Coatings",
    metaDescription: "Colored quartz broadcast resin flooring for labs, kitchens, restrooms, and pharma across Dallas-Fort Worth. Sanitary, non-slip, and easy to clean.",
    heroImage: industryHealthcare,
    gallery: gallery(industryHealthcare),
    intro: "Quartz broadcast flooring layers colored quartz into resin for a durable, sanitary, non-slip surface that looks clean and works hard. Legacy Industrial Coatings installs quartz systems across labs, kitchens, and healthcare spaces in DFW.",
    overview: [
      "We broadcast double or triple layers of colored quartz into an epoxy or urethane base and seal it with a clear topcoat. The result is a decorative, easy-clean floor with built-in slip resistance.",
      "Standard and custom color blends let you match brand or safety zoning. Integral cove base and coved corners keep the space fully sanitary.",
    ],
    benefits: [
      "Non-slip surface, even when wet",
      "Sanitary and easy to clean",
      "Decorative color blends",
      "Chemical and stain resistant",
      "Long service life with a simple topcoat re-coat",
    ],
    useCases: [
      "Laboratories and cleanrooms",
      "Commercial kitchens and restrooms",
      "Pharmaceutical and biotech facilities",
      "Locker rooms and shower areas",
      "Veterinary and animal care spaces",
    ],
    systems: [
      { name: "Double Broadcast Quartz", desc: "Two-layer quartz broadcast for standard-duty sanitary spaces." },
      { name: "Triple Broadcast Quartz", desc: "Three-layer system for high-traffic labs and kitchens." },
      { name: "Custom Color Blends", desc: "Mixed quartz colors to match brand or safety zoning." },
      { name: "Coved Detail Work", desc: "Integral cove base and floor drains detailed in resin." },
    ],
    faqs: [
      { q: "Is quartz flooring slip resistant?", a: "Yes. The broadcast quartz creates a textured surface that stays slip resistant in wet and dry conditions." },
      { q: "How long does a quartz floor last?", a: "A quartz broadcast system lasts 15 to 20 years with a simple clear topcoat re-coat every 5 to 10 years, depending on traffic." },
      { q: "Can I match a specific color?", a: "Yes. We offer standard blends and custom quartz colors to match brand palettes or safety zones." },
    ],
  },
  {
    slug: "polished-concrete",
    shortTitle: "Polished Concrete",
    title: "Polished Concrete Flooring in Dallas-Fort Worth",
    cardDesc: "Diamond-ground and densified polished concrete for a low-maintenance, high-gloss finish.",
    metaTitle: "Polished Concrete Flooring DFW | Legacy Industrial Coatings",
    metaDescription: "Diamond-ground and densified polished concrete for showrooms, warehouses, and retail across Dallas-Fort Worth. Low maintenance, high-gloss, long service life.",
    heroImage: polishedShowroom.url,
    gallery: polishedGallery,
    intro: "Polished concrete turns your existing slab into a hard, dust-free, high-gloss floor with minimal ongoing maintenance. Legacy Industrial Coatings polishes concrete for showrooms, warehouses, retail, and open commercial spaces across DFW.",
    overview: [
      "We diamond-grind the slab in progressive steps, densify it with a lithium hardener, and polish to your chosen sheen — matte, satin, or high-gloss. A penetrating sealer locks it in.",
      "Options include cream, salt-and-pepper, or aggregate exposure, plus dyes for color. Every finish is a stronger, denser, dust-free version of the concrete you already own.",
    ],
    benefits: [
      "Uses your existing slab — no added material",
      "Hard, dust-free, and low maintenance",
      "High-gloss or matte finish, your choice",
      "Reflective surface can reduce lighting cost",
      "20+ year service life",
    ],
    useCases: [
      "Showrooms and auto dealerships",
      "Retail and grocery stores",
      "Warehouses and distribution centers",
      "Corporate offices and lobbies",
      "Schools and public buildings",
    ],
    systems: [
      { name: "Cream Polish", desc: "Minimal grind that keeps the smooth cream layer of the slab." },
      { name: "Salt-and-Pepper", desc: "Light grind that exposes fine aggregate for a subtle pattern." },
      { name: "Aggregate Exposure", desc: "Deeper grind that exposes the full stone aggregate in the slab." },
      { name: "Dyed & Stained", desc: "Penetrating dyes and stains for color before densifying and polishing." },
    ],
    faqs: [
      { q: "How long does polished concrete last?", a: "A properly polished and densified concrete floor lasts 20 years or more with basic cleaning and periodic burnishing." },
      { q: "Can you polish an old slab?", a: "In most cases, yes. We assess the slab first — cracks, contamination, and hardness all affect the result. We'll tell you straight if it's a good candidate." },
      { q: "Is polished concrete slippery?", a: "Polished concrete has a similar slip rating to other hard floors when clean and dry. Anti-slip conditioners can be added if needed." },
    ],
  },
  {
    slug: "specialty-systems",
    shortTitle: "Specialty Systems",
    title: "Specialty Resin Flooring Systems in Dallas-Fort Worth",
    cardDesc: "MMA, ESD, moisture mitigation, containment, and joint repair for special needs.",
    metaTitle: "Specialty Resin Flooring Systems DFW | Legacy Industrial Coatings",
    metaDescription: "MMA, static-dissipative ESD, moisture mitigation, secondary containment, and joint filling systems for commercial and industrial spaces across Dallas-Fort Worth.",
    heroImage: industryAerospace,
    gallery: gallery(industryAerospace),
    intro: "Not every commercial floor fits a standard system. Legacy Industrial Coatings installs specialty resin systems for the jobs that need something different — fast-cure MMA, static control, moisture mitigation, containment, and joint repair.",
    overview: [
      "We spec and install the right system for your space, chemicals, and schedule. Every specialty install is engineered — not a stock kit — with the right primer, base, and topcoat for the environment.",
      "If you're not sure what your floor needs, we'll walk it with you, test the slab, and put a system on paper before quoting.",
    ],
    benefits: [
      "Fast-cure options that go back in service in hours",
      "Static control for electronics and aerospace",
      "Moisture blocking for high-humidity slabs",
      "Chemical containment for spill zones",
      "Joint and crack repair that stops spalling",
    ],
    useCases: [
      "Aerospace and electronics manufacturing",
      "Data centers and server rooms",
      "Chemical storage and containment areas",
      "Cold storage with tight shutdown windows",
      "Slabs with high moisture vapor emissions",
    ],
    systems: [
      { name: "MMA (Methyl Methacrylate)", desc: "Fast-cure resin that installs at low temps and is back in service in 1 to 2 hours." },
      { name: "ESD / Static-Dissipative", desc: "Grounded resin systems for electronics, aerospace, and data centers." },
      { name: "Moisture Mitigation", desc: "Epoxy vapor barrier for slabs with high moisture vapor emission rates." },
      { name: "Secondary Containment", desc: "Chemical-resistant resin and cove for spill and containment areas." },
      { name: "Joint Filling & Crack Repair", desc: "Semi-rigid polyurea joint fill and crack repair to stop spalling." },
    ],
    faqs: [
      { q: "Do you install ESD floors?", a: "Yes. We install grounded static-dissipative resin systems for electronics manufacturing, aerospace, and data centers." },
      { q: "What is moisture mitigation?", a: "It's an epoxy vapor barrier applied to a slab with high moisture emissions, so the finish flooring on top doesn't fail from trapped moisture." },
      { q: "Can you match a specific spec?", a: "Yes. Send us the spec, product data sheet, or engineer's callout and we'll install exactly to it." },
    ],
  },
  {
    slug: "static-control-flooring",
    shortTitle: "Static-Control (ESD)",
    title: "Static-Control (ESD) Resin Flooring in Dallas-Fort Worth",
    cardDesc: "Grounded ESD and static-dissipative resin systems for electronics, aerospace, and data centers.",
    metaTitle: "Static-Control (ESD) Resin Flooring DFW | Legacy Industrial Coatings",
    metaDescription: "Grounded static-dissipative and conductive ESD resin flooring for electronics, aerospace, and data centers across Dallas-Fort Worth. Installed to ANSI/ESD S20.20.",
    heroImage: industryAerospace,
    gallery: gallery(industryAerospace),
    intro: "Static-Control (ESD) flooring protects sensitive electronics, aerospace components, and data-center equipment from electrostatic discharge. Legacy Industrial Coatings installs grounded, code-tested ESD resin systems across the DFW Metroplex.",
    overview: [
      "We install both static-dissipative and fully conductive resin systems, engineered to ANSI/ESD S20.20 targets. Every job includes a grounded copper strip network tied into building ground so the whole floor drains static reliably.",
      "Systems are tested for resistance to ground and person-to-ground on install and can be re-tested at scheduled intervals. We match the sheen, color, and non-slip profile to your production environment.",
    ],
    benefits: [
      "Meets ANSI/ESD S20.20 and MIL-STD-1686 targets",
      "Grounded copper network tied to building ground",
      "Static-dissipative or fully conductive options",
      "Chemical and abrasion resistant",
      "Custom colors and safety zoning",
    ],
    useCases: [
      "Electronics and semiconductor manufacturing",
      "Aerospace and defense assembly lines",
      "Data centers and server rooms",
      "Munitions and energetic-material handling",
      "Medical device and pharma cleanrooms",
    ],
    systems: [
      { name: "ESD Static-Dissipative Epoxy", desc: "Resistance range 1x10^6 to 1x10^9 ohms for standard electronics assembly." },
      { name: "ESD Conductive Epoxy", desc: "Resistance range 2.5x10^4 to 1x10^6 ohms for high-sensitivity and munitions work." },
      { name: "ESD Urethane Topcoat", desc: "Chemical- and UV-stable ESD topcoat over epoxy base for tough environments." },
      { name: "Grounding Grid Install", desc: "Copper strip grid bonded through the resin and tied to building ground." },
    ],
    faqs: [
      { q: "Does your ESD floor meet ANSI/ESD S20.20?", a: "Yes. We install and test systems that meet ANSI/ESD S20.20 targets for resistance to ground and person-to-ground, and we provide install-day readings." },
      { q: "What's the difference between static-dissipative and conductive?", a: "Static-dissipative floors drain charge slowly (10^6 to 10^9 ohms) — right for most electronics. Conductive floors drain fast (below 10^6 ohms) — required for munitions and highly sensitive assembly." },
      { q: "Can you install ESD flooring in a live facility?", a: "Yes. We stage the work in zones, install grounded copper on schedule, and use fast-cure resin where a short shutdown window is required." },
    ],
  },
  {
    slug: "deck-coatings",
    shortTitle: "Deck Coatings",
    title: "Commercial Deck Coatings in Dallas-Fort Worth",
    cardDesc: "Waterproof pedestrian and vehicular deck coatings for parking decks, balconies, and rooftops.",
    metaTitle: "Commercial Deck Coatings DFW | Legacy Industrial Coatings",
    metaDescription: "Waterproof pedestrian and vehicular deck coating systems for parking garages, balconies, and rooftop decks across Dallas-Fort Worth. Installed with Neogard and Hempel systems.",
    heroImage: apartmentExterior,
    gallery: gallery(apartmentExterior),
    intro: "Deck coatings waterproof and protect elevated concrete — parking garages, balconies, walkways, and rooftop decks — from water, freeze-thaw, and traffic wear. Legacy Industrial Coatings installs pedestrian and vehicular deck systems across the DFW Metroplex.",
    overview: [
      "We install traffic-bearing urethane and polyurethane deck coatings from Neogard, Hempel, and other spec-grade manufacturers. Every install starts with slab prep, crack routing, and detail work at drains, expansion joints, and terminations.",
      "Systems are built in layers — base coat, intermediate with aggregate broadcast, and UV-stable topcoat — matched to whether the deck sees pedestrian traffic, light vehicles, or full parking-garage loads.",
    ],
    benefits: [
      "Waterproofs elevated concrete slabs",
      "Handles freeze-thaw and thermal movement",
      "Pedestrian and vehicular traffic-rated systems",
      "UV-stable topcoats that hold color",
      "Custom colors and non-slip aggregate",
    ],
    useCases: [
      "Parking garages and elevated parking decks",
      "Multifamily and hotel balconies",
      "Rooftop amenity decks and walkways",
      "Stadium and arena concourses",
      "Plaza decks over occupied space",
    ],
    systems: [
      { name: "Pedestrian Deck Coating", desc: "Urethane traffic coating for balconies, walkways, and rooftop decks." },
      { name: "Vehicular Deck Coating", desc: "Heavier urethane system built for parking-garage tire wear and turning loads." },
      { name: "Plaza / Split-Slab System", desc: "Waterproofing membrane for plaza decks and elevated slabs over occupied space." },
      { name: "Detail & Joint Work", desc: "Drain, expansion joint, and termination detailing that keeps water out long-term." },
    ],
    faqs: [
      { q: "How long does a deck coating last?", a: "A properly installed vehicular deck coating lasts 8 to 15 years with periodic topcoat re-coats. Pedestrian systems on balconies can go longer with lighter wear." },
      { q: "Do you install Neogard and Hempel systems?", a: "Yes. We're installers for Neogard and Hempel deck coating systems, and we can install to a specific engineer's or property manager's spec." },
      { q: "Can you re-coat an existing deck?", a: "Usually, yes. We inspect the existing coating, test adhesion, repair failed areas, and re-coat with a compatible topcoat to extend service life." },
    ],
  },
  {
    slug: "sealed-concrete",
    shortTitle: "Sealed Concrete",
    title: "Sealed Concrete Flooring in Dallas-Fort Worth",
    cardDesc: "Densified and sealed concrete for a clean, low-cost, low-maintenance commercial floor.",
    metaTitle: "Sealed Concrete Flooring DFW | Legacy Industrial Coatings",
    metaDescription: "Concrete sealing and densifying for tasting rooms, breweries, retail, and warehouses across Dallas-Fort Worth. A clean, low-cost, low-maintenance sealed concrete floor.",
    heroImage: sealedTasting.url,
    gallery: [sealedTasting.url, sealedCidery.url, polishedTastingRoom.url],
    intro: "Sealed concrete is the simple, low-cost way to lock down a slab. Legacy Industrial Coatings cleans, densifies, and seals concrete for tasting rooms, breweries, retail, and warehouses across the DFW Metroplex — a clean floor that stops dust and holds up to daily use.",
    overview: [
      "We start by cleaning and lightly prepping the slab. Then we densify it with a lithium hardener so the top layer of concrete gets harder and tighter. Last, we roll or spray a penetrating sealer to lock out water, oil, and stains.",
      "Sealed concrete is not the same as polished concrete. There is no long grind or high-gloss polish. You keep the natural look of the slab and get a floor that is dust-free, easy to clean, and ready to use.",
    ],
    benefits: [
      "Low cost — uses the slab you already have",
      "Stops concrete dust and surface wear",
      "Blocks water, oil, and common stains",
      "Fast install with short downtime",
      "Easy to clean and re-seal over time",
    ],
    useCases: [
      "Tasting rooms, breweries, and cideries",
      "Retail floors and back-of-house",
      "Warehouses and light industrial",
      "Offices, lobbies, and showrooms",
      "Restaurants and event spaces",
    ],
    systems: [
      { name: "Lithium Densifier", desc: "Penetrating hardener that tightens the top layer of the slab so it wears longer." },
      { name: "Penetrating Sealer", desc: "Water- or solvent-based sealer that blocks water, oil, and stains without a film." },
      { name: "Film-Forming Sealer", desc: "Acrylic or urethane topcoat for a light sheen and extra stain protection." },
      { name: "Re-Seal & Maintenance", desc: "Scheduled re-seal and clean to keep the floor tight and clean for years." },
    ],
    faqs: [
      { q: "What's the difference between sealed and polished concrete?", a: "Sealed concrete keeps the natural look of your slab and just adds a hardener and sealer. Polished concrete is ground and polished in many steps for a high-gloss, showroom finish. Sealed is faster and cheaper. Polished lasts longer and looks glossier." },
      { q: "How long does sealed concrete last?", a: "A penetrating sealer lasts 3 to 7 years depending on traffic. Film-forming sealers can last less and may need a re-coat sooner. We can set up a simple re-seal schedule." },
      { q: "Can you seal an old warehouse or shop floor?", a: "Yes. We clean the slab, patch cracks and joints if needed, and apply the right densifier and sealer for the space. Most jobs are back in service in a day or two." },
    ],
  },
  {
    slug: "maintenance",
    shortTitle: "Maintenance",
    title: "Commercial Floor Cleaning & Maintenance in Dallas-Fort Worth",
    cardDesc: "Manufacturer-trained cleaning, resealing, repairs, degreasing, and VCT wax programs.",
    metaTitle: "Commercial Floor Cleaning & Maintenance DFW | Legacy",
    metaDescription: "Manufacturer-trained commercial floor cleaning and maintenance in Dallas-Fort Worth. Epoxy, polished concrete, carpet tile, LVT, and VCT — resealing, repairs, degreasing, and wax programs.",
    heroImage: polishedShowroom.url,
    gallery: [polishedShowroom.url, epoxyWhiteCorridor.url, polishedWarehouse.url],
    intro: "A floor lasts as long as the care behind it. Legacy Industrial Coatings runs commercial floor cleaning and maintenance programs across the DFW Metroplex — manufacturer-trained crews, approved cleaners only, and scheduled service that keeps resin, concrete, carpet tile, LVT, and VCT looking new for years.",
    overview: [
      "Our cleaning crews are trained by the material and product manufacturers themselves. That training covers the right pads, the right pH, the right dwell time, and the right machine speed for each floor type. Nothing that could harm your floor — no harsh solvents, no wrong-pH strippers, no aggressive pads on a coated surface — is ever used during our cleaning process.",
      "That matters more than most people think. The fastest way to ruin a good epoxy, urethane, or polished concrete floor is the wrong cleaner. Generic janitorial chemicals can dull gloss, haze a sealer, break down a topcoat, or leave a slick film. We follow the manufacturer's written care spec for the exact system on your floor.",
      "Maintenance is an essential piece of having a floor done with us. It is the single best way to protect the investment and get the full service life out of the system — and it keeps your warranty and finish intact year after year.",
      "We clean and maintain more than resin. Carpet tile, LVT, and VCT are all part of our program, so one crew can cover an entire facility instead of juggling three vendors.",
    ],
    benefits: [
      "Crews trained directly by material and product manufacturers",
      "Only manufacturer-approved cleaners, pads, and equipment",
      "Scheduled programs — nightly, weekly, monthly, or quarterly",
      "One vendor for resin, concrete, carpet tile, LVT, and VCT",
      "Extends floor life and protects your original investment",
      "Available to any facility, even if we didn't install the floor",
    ],
    useCases: [
      "Warehouses, plants, and distribution centers",
      "Medical, dental, and clinical facilities",
      "Schools, gyms, and campus buildings",
      "Offices, lobbies, and corporate corridors",
      "Retail, restaurants, and hospitality floors",
      "Multifamily common areas and clubhouses",
    ],
    systems: [
      { name: "Deep Cleaning & Scrubbing", desc: "Auto-scrub and hand-detail cleaning with the pads and pH the manufacturer specifies for your floor." },
      { name: "Degreasing", desc: "Safe removal of oil, grease, and production residue from shop, kitchen, and plant floors without attacking the coating." },
      { name: "Resealing & Re-Coat", desc: "Fresh sealer or topcoat on concrete and resin floors to restore gloss, stain resistance, and wear life." },
      { name: "Repairs", desc: "Patching chips, gouges, joint failures, and worn traffic lanes so small damage never turns into a full replacement." },
      { name: "VCT Strip & Wax", desc: "Strip, seal, and wax maintenance for VCT, including burnishing and scheduled re-coats." },
      { name: "Carpet Tile & LVT Care", desc: "Hot-water extraction and encapsulation for carpet tile, plus safe scrub-and-finish programs for LVT." },
    ],
    faqs: [
      { q: "Do you clean floors you didn't install?", a: "Yes. Our cleaning and maintenance service is open to any commercial facility in DFW, whether or not Legacy Industrial Coatings installed the floor. We identify the existing system first, then follow that manufacturer's care spec." },
      { q: "How are your cleaning crews trained?", a: "Our crews are trained by the material and product manufacturers on proper cleaning technique for each floor type — correct chemicals, pH, pads, dwell time, and equipment. Nothing that could harm the floor is used during the cleaning process." },
      { q: "What floor types do you maintain?", a: "Epoxy, urethane cement, quartz, polished concrete, sealed concrete, and deck coatings — plus carpet tile, LVT, and VCT." },
      { q: "Why is a maintenance program worth it?", a: "Scheduled maintenance is the best way to keep a floor performing for years. Regular cleaning and periodic resealing cost a fraction of a re-install and keep gloss, slip resistance, and stain protection where they should be." },
      { q: "Do you wax and burnish VCT?", a: "Yes. We handle full VCT programs — strip, seal, wax, burnish, and scheduled re-coats on whatever cycle your facility needs." },
      { q: "Can you do repairs and resealing without shutting us down?", a: "Usually yes. We schedule around your operation — nights, weekends, or zoned work — and use fast-cure products where a short return-to-service window is required." },
      { q: "How often should a commercial floor be resealed?", a: "It depends on traffic. Most sealed concrete floors need a re-seal every 3 to 7 years, high-traffic resin floors benefit from a topcoat refresh around year 5 to 8, and VCT wax cycles run monthly to quarterly." },
    ],
    extraSections: [
      {
        eyebrow: "Open To Everyone",
        heading: "You Don't Need to Be an Install Customer",
        paragraphs: [
          "We offer cleaning and maintenance as a standalone service for any commercial property in Dallas-Fort Worth — even if your floor was installed by someone else, or came with the building.",
          "Send us the floor type, or let us come identify it. We'll confirm the system, pull the manufacturer's care requirements, and build a cleaning and maintenance plan around your schedule and budget.",
        ],
      },
    ],
  },
];


export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
