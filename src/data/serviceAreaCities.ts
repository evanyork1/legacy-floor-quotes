// City landing page data for /epoxy-flooring/:city pages.
// Commercial-first content — residential is secondary.

export interface CityFaq {
  q: string;
  a: string;
}

export interface ServiceAreaCity {
  slug: string;
  name: string;
  county: string;
  nearbyCities: string[]; // slugs
  localHook: string;
  commercialAngle: string;
  residentialAngle: string;
  landmarks: string[];
  zipCodes: string[];
  faqs: CityFaq[];
}

const FAQ_COMMERCIAL_AFTER_HOURS = (city: string): CityFaq => ({
  q: `Do you handle commercial coatings in ${city} after hours or on weekends?`,
  a: `Yes. Our commercial crews routinely run nights and weekends across ${city} to keep tenants and operations running. We schedule pours around your business hours, stage materials off-site, and coordinate directly with the GC or facility manager.`,
});

const FAQ_OSHA = (city: string): CityFaq => ({
  q: `Do you pull permits and meet OSHA requirements on ${city} commercial jobs?`,
  a: `Yes — we carry full general liability and workers' comp, run OSHA-compliant safety plans, and handle permit coordination directly with the GC or property management group on every ${city} commercial install.`,
});

const FAQ_RES_TIMING = (city: string): CityFaq => ({
  q: `How fast can you coat a residential garage in ${city}?`,
  a: `Most ${city} residential garages are diamond-ground, repaired, and coated in a single day using our polyurea / polyaspartic system. Vehicles are typically back on the floor in 24–48 hours.`,
});

const FAQ_COMMERCIAL_LEAD_TIME = (city: string): CityFaq => ({
  q: `What's the lead time for a commercial bid in ${city}?`,
  a: `For most ${city} commercial and industrial projects we can walk the site within 3–5 business days and return a full ITB-ready bid — with scope, mockup options, and phasing plan — inside 7–10 business days. Rush turnarounds for active GC bids are available when the RFP window is tight; just flag the due date.`,
});

const FAQ_POLISHED_CONCRETE_RETAIL = (city: string): CityFaq => ({
  q: `Do you offer polished concrete for ${city} retail and restaurant buildouts?`,
  a: `Yes — mechanical polished concrete is one of our core commercial systems in ${city}. We handle new slabs and existing floors for retail, restaurant, showroom, and hospitality TI work, including FF/FL flatness on new pours, integrally colored/dyed finishes, joint filling, and densification. We coordinate with the GC on tenant-improvement schedules and phased night pours.`,
});

const baseFaqs = (city: string): CityFaq[] => [
  FAQ_COMMERCIAL_AFTER_HOURS(city),
  FAQ_OSHA(city),
  FAQ_RES_TIMING(city),
  FAQ_COMMERCIAL_LEAD_TIME(city),
  FAQ_POLISHED_CONCRETE_RETAIL(city),
];

export const SERVICE_AREA_CITIES: ServiceAreaCity[] = [
  {
    slug: "plano",
    name: "Plano",
    county: "Collin County",
    nearbyCities: ["frisco", "allen", "richardson", "carrollton", "mckinney", "the-colony"],
    localHook:
      "Legacy Industrial Coatings is headquartered in Plano at 6010 W Spring Creek Parkway. We've installed millions of square feet of industrial epoxy, urethane cement, and polished concrete across Collin County — from Legacy West corporate campuses to the homeowner on the same block.",
    commercialAngle:
      "Plano's corporate base — Toyota, JPMorgan Chase, Liberty Mutual, FedEx Office, Capital One — drives demand for FF/FL-flat polished concrete in showrooms and lobbies, anti-static epoxy in data and lab spaces, and urethane cement in medical-office back-of-house. We work directly with GCs and facility managers on ITB packages and night/weekend pours across Legacy West, Granite Park, and the Tollway corridor.",
    residentialAngle:
      "Plano homes range from '90s-era West Plano garages with cracked, oil-stained slabs to fresh new builds in Willow Bend and Kings Gate. Our polyurea flake systems handle both, and every residential install carries our lifetime warranty against peeling, chipping, and UV yellowing.",
    landmarks: ["Legacy West", "Granite Park", "The Shops at Willow Bend", "Toyota HQ"],
    zipCodes: ["75023", "75024", "75025", "75074", "75075", "75093", "75094"],
    faqs: baseFaqs("Plano"),
  },
  {
    slug: "frisco",
    name: "Frisco",
    county: "Collin & Denton Counties",
    nearbyCities: ["plano", "mckinney", "little-elm", "the-colony", "prosper", "celina"],
    localHook:
      "Frisco's growth — corporate HQ relocations, the PGA of America campus, The Star, and constant new commercial construction — has made it one of our busiest markets for both industrial coatings and high-end residential garages.",
    commercialAngle:
      "We coat retail, restaurant, and medical-office floors across The Star, Frisco Station, and Stonebriar, and run industrial epoxy and polished concrete systems for warehouses and corporate campuses along the Dallas North Tollway. Frisco's pace demands fast turn-times — we mobilize quickly and work overnight to hit tenant-improvement schedules.",
    residentialAngle:
      "From luxury custom builds in Newman Village and Phillips Creek Ranch to production homes in Frisco Lakes, we install one-day polyurea flake garage floors that handle 110° summer slabs and DFW humidity without softening or yellowing.",
    landmarks: ["The Star", "PGA HQ", "Stonebriar Centre", "Frisco Station"],
    zipCodes: ["75033", "75034", "75035", "75036"],
    faqs: baseFaqs("Frisco"),
  },
  {
    slug: "dallas",
    name: "Dallas",
    county: "Dallas County",
    nearbyCities: ["richardson", "carrollton", "garland", "addison", "farmers-branch", "north-dallas"],
    localHook:
      "Dallas is our largest commercial service market — from Design District showrooms to industrial parks along I-35 and Stemmons, healthcare facilities in the Medical District, and high-end residential garages in Preston Hollow and Lake Highlands.",
    commercialAngle:
      "We install industrial epoxy, urethane cement, mechanical polished concrete, and anti-static / ESD systems across Dallas warehouses, manufacturing plants, restaurants, hospitals, and retail buildouts. Our crews work directly with national GCs on ITB packages and handle night/weekend pours in occupied commercial buildings throughout the city.",
    residentialAngle:
      "Older Dallas homes (Lakewood, M Streets, Preston Hollow) often have slabs that need crack repair and grinding before any coating goes down — we do that prep work in-house instead of skipping it like a one-day garage outfit.",
    landmarks: ["Design District", "Medical District", "Deep Ellum", "Preston Center"],
    zipCodes: ["75201", "75204", "75205", "75206", "75214", "75218", "75225", "75230"],
    faqs: baseFaqs("Dallas"),
  },
  {
    slug: "fort-worth",
    name: "Fort Worth",
    county: "Tarrant County",
    nearbyCities: ["dallas", "flower-mound", "coppell", "lewisville"],
    localHook:
      "Fort Worth's Alliance corridor, AllianceTexas, and the industrial belt along I-35W make it a heavy commercial market for us — distribution centers, manufacturing floors, and FedEx-grade warehouses where the coating has to outlast the forklift traffic.",
    commercialAngle:
      "We install urethane cement and high-build industrial epoxy for distribution and manufacturing floors across AllianceTexas and the Mercantile Center, plus polished concrete for retail and restaurant buildouts in Sundance Square and West 7th. National-GC experience, full insurance, and OSHA-compliant crews.",
    residentialAngle:
      "Custom homes in Westover Hills, Mira Vista, and the Tanglewood area get our polyurea flake garage system with lifetime warranty — built to handle Tarrant County summers without softening or yellowing.",
    landmarks: ["AllianceTexas", "Sundance Square", "Cultural District"],
    zipCodes: ["76102", "76107", "76109", "76137", "76177"],
    faqs: baseFaqs("Fort Worth"),
  },
  {
    slug: "mckinney",
    name: "McKinney",
    county: "Collin County",
    nearbyCities: ["allen", "frisco", "plano", "melissa", "anna", "fairview"],
    localHook:
      "McKinney's commercial growth along US-75 and SH-121, combined with the residential boom in Tucker Hill, Adriatica, and Stonebridge Ranch, keeps our crews busy across both sides of the business.",
    commercialAngle:
      "We coat medical-office back-of-house, restaurant kitchens, retail buildouts, and light-industrial floors throughout McKinney — including projects along Craig Ranch, the McKinney National Airport business park, and the Custer Road corridor. Direct GC relationships, ITB-ready bids.",
    residentialAngle:
      "McKinney custom homes and master-planned communities get our one-day polyurea flake garage floor with lifetime warranty — same crew, same system whether you're in Stonebridge Ranch or a new build off Virginia Parkway.",
    landmarks: ["Stonebridge Ranch", "Adriatica Village", "Craig Ranch"],
    zipCodes: ["75069", "75070", "75071", "75072"],
    faqs: baseFaqs("McKinney"),
  },
  {
    slug: "allen",
    name: "Allen",
    county: "Collin County",
    nearbyCities: ["plano", "mckinney", "fairview", "parker", "frisco"],
    localHook:
      "Allen is a tight 27-square-mile city with strong commercial demand around Watters Creek, the Allen Premium Outlets, and the Twin Creeks business district — plus a steady residential pipeline for garage coatings.",
    commercialAngle:
      "Retail and restaurant tenant-improvement work at Watters Creek and Allen Premium Outlets, polished concrete for showrooms and lobbies along US-75, and industrial epoxy for the Twin Creeks light-industrial cluster. We coordinate directly with national GCs and handle overnight pours.",
    residentialAngle:
      "Allen garages in Twin Creeks, Star Creek, and Watters Crossing get our polyurea flake system with a lifetime warranty — installed in a day, with full slab prep and crack repair included.",
    landmarks: ["Watters Creek", "Allen Premium Outlets", "Twin Creeks"],
    zipCodes: ["75002", "75013"],
    faqs: baseFaqs("Allen"),
  },
  {
    slug: "prosper",
    name: "Prosper",
    county: "Collin & Denton Counties",
    nearbyCities: ["celina", "frisco", "mckinney", "aubrey", "little-elm"],
    localHook:
      "Prosper has exploded with new commercial development along Preston Road and US-380, plus high-end custom residential in Whitley Place, Windsong Ranch, and Lakes of Prosper.",
    commercialAngle:
      "We install retail and medical-office flooring along the Preston / 380 corridor, polished concrete for new commercial buildouts in Windsong Ranch's town center, and light-industrial epoxy across the SH-289 business parks.",
    residentialAngle:
      "Prosper's three- and four-car luxury garages get our flake polyurea system — UV stable, chemical resistant, and warrantied for life. Same-day install, no peel, no yellowing in the Texas heat.",
    landmarks: ["Windsong Ranch", "Whitley Place", "Gates of Prosper"],
    zipCodes: ["75078"],
    faqs: baseFaqs("Prosper"),
  },
  {
    slug: "celina",
    name: "Celina",
    county: "Collin County",
    nearbyCities: ["prosper", "frisco", "mckinney", "gunter", "anna"],
    localHook:
      "Celina is one of the fastest-growing cities in America — new master-planned communities like Light Farms and Mustang Lakes, plus commercial buildout along the Dallas North Tollway extension.",
    commercialAngle:
      "We coat new restaurant and retail spaces along the Tollway and Preston Road, plus light-industrial and warehouse floors supporting Celina's commercial growth. We work hand-in-hand with national GCs on TI packages.",
    residentialAngle:
      "New-build garages in Light Farms and Mustang Lakes get our one-day polyurea flake system with lifetime warranty — installed before move-in or any time after.",
    landmarks: ["Light Farms", "Mustang Lakes", "Old Celina Park"],
    zipCodes: ["75009"],
    faqs: baseFaqs("Celina"),
  },
  {
    slug: "little-elm",
    name: "Little Elm",
    county: "Denton County",
    nearbyCities: ["frisco", "the-colony", "aubrey", "prosper", "lewisville"],
    localHook:
      "Little Elm has grown from a small lakeside community into a full-service commercial and residential market along the Lake Lewisville corridor.",
    commercialAngle:
      "Retail and restaurant TI work along FM-423 and US-380, polished concrete for new commercial buildouts, and industrial epoxy for the warehouse and light-industrial properties along the Eldorado / 423 corridor.",
    residentialAngle:
      "Little Elm waterfront and master-planned community garages get our polyurea flake system with lifetime warranty — one-day install, full prep included.",
    landmarks: ["Lake Lewisville", "Lakefront Trails", "Hillstone Pointe"],
    zipCodes: ["75068"],
    faqs: baseFaqs("Little Elm"),
  },
  {
    slug: "the-colony",
    name: "The Colony",
    county: "Denton County",
    nearbyCities: ["frisco", "plano", "little-elm", "carrollton", "lewisville"],
    localHook:
      "The Colony sits at the center of Grandscape, Nebraska Furniture Mart, and the SH-121 retail/commercial corridor — heavy commercial buildout, heavy traffic, heavy demand for coatings that hold up.",
    commercialAngle:
      "Grandscape's retail, restaurant, and entertainment buildouts drive constant TI demand. We install polished concrete for showrooms and lobbies, urethane cement for restaurant kitchens, and industrial epoxy for warehouse and back-of-house spaces.",
    residentialAngle:
      "Stewart Peninsula and other waterfront-adjacent Colony neighborhoods get our flake polyurea garage system — lifetime warranty, full prep, one-day install.",
    landmarks: ["Grandscape", "Nebraska Furniture Mart", "Stewart Peninsula"],
    zipCodes: ["75056"],
    faqs: baseFaqs("The Colony"),
  },
  {
    slug: "aubrey",
    name: "Aubrey",
    county: "Denton County",
    nearbyCities: ["little-elm", "prosper", "celina", "lewisville"],
    localHook:
      "Aubrey and the Providence Village / Paloma Creek area have grown fast on the back of US-380 commercial development and Denton County's residential push.",
    commercialAngle:
      "Light-industrial epoxy and warehouse coatings along US-380, plus retail and restaurant TI flooring for the new commercial centers serving Providence Village.",
    residentialAngle:
      "Aubrey and Providence Village garages get our one-day flake polyurea system with lifetime warranty — same crew, same materials we put down in Plano and Frisco.",
    landmarks: ["Providence Village", "Paloma Creek", "US-380 corridor"],
    zipCodes: ["76227"],
    faqs: baseFaqs("Aubrey"),
  },
  {
    slug: "lewisville",
    name: "Lewisville",
    county: "Denton County",
    nearbyCities: ["flower-mound", "highland-village", "the-colony", "carrollton", "coppell"],
    localHook:
      "Lewisville's I-35E commercial corridor, Vista Ridge Mall area, and Old Town redevelopment keep both our commercial and residential crews busy year-round.",
    commercialAngle:
      "Industrial epoxy and urethane cement for the warehouse and light-manufacturing belt along I-35E, polished concrete for Old Town retail and restaurant buildouts, and TI flooring for the medical and office space along SH-121.",
    residentialAngle:
      "Castle Hills, Lakeview, and Lewisville Lake-adjacent garages get our polyurea flake system with lifetime warranty — single-day install with full slab prep.",
    landmarks: ["Old Town Lewisville", "Vista Ridge", "Castle Hills"],
    zipCodes: ["75056", "75057", "75067", "75077"],
    faqs: baseFaqs("Lewisville"),
  },
  {
    slug: "carrollton",
    name: "Carrollton",
    county: "Dallas / Denton / Collin Counties",
    nearbyCities: ["addison", "farmers-branch", "lewisville", "coppell", "plano"],
    localHook:
      "Carrollton's industrial and light-manufacturing belt along I-35E and Belt Line is one of the strongest commercial coating markets in DFW.",
    commercialAngle:
      "We install urethane cement and high-build industrial epoxy across the I-35E / Belt Line manufacturing belt, polished concrete for office and showroom space, and TI flooring for restaurants and medical office along Josey Lane and Hebron Parkway.",
    residentialAngle:
      "Carrollton garages — from older custom homes to new builds in The Grove and Castle Hills — get our flake polyurea system with lifetime warranty, full prep included.",
    landmarks: ["Old Downtown Carrollton", "Furneaux Creek", "I-35E corridor"],
    zipCodes: ["75006", "75007", "75010"],
    faqs: baseFaqs("Carrollton"),
  },
  {
    slug: "richardson",
    name: "Richardson",
    county: "Dallas & Collin Counties",
    nearbyCities: ["plano", "garland", "dallas", "addison", "murphy"],
    localHook:
      "Richardson's Telecom Corridor — AT&T, Texas Instruments, Cisco, Verizon, State Farm — runs on cleanroom-grade flooring, anti-static epoxy, and polished concrete in office space and data centers.",
    commercialAngle:
      "Anti-static / ESD epoxy for electronics manufacturing and data centers, urethane cement for medical-office and food-service back-of-house, and FF/FL-flat polished concrete for corporate showrooms across the Telecom Corridor and Galatyn Park.",
    residentialAngle:
      "Richardson garages — Canyon Creek, Heights of Richardson, Cottonwood Heights — get our flake polyurea system with full prep and lifetime warranty.",
    landmarks: ["Telecom Corridor", "CityLine", "UT Dallas"],
    zipCodes: ["75080", "75081", "75082", "75083"],
    faqs: baseFaqs("Richardson"),
  },
  {
    slug: "garland",
    name: "Garland",
    county: "Dallas County",
    nearbyCities: ["richardson", "sachse", "wylie", "murphy", "dallas"],
    localHook:
      "Garland has one of the largest industrial bases in DFW — manufacturing, distribution, and food production along I-30, I-635, and PGBT.",
    commercialAngle:
      "Urethane cement and high-build industrial epoxy for Garland's manufacturing and food production plants, polished concrete for warehouse and distribution centers, anti-static systems for electronics work. We've done millions of square feet across the I-30 / 635 industrial belt.",
    residentialAngle:
      "Garland custom home garages get our flake polyurea system with lifetime warranty — one-day install, full prep included.",
    landmarks: ["Firewheel Town Center", "Downtown Garland Square"],
    zipCodes: ["75040", "75041", "75042", "75043", "75044"],
    faqs: baseFaqs("Garland"),
  },
  {
    slug: "anna",
    name: "Anna",
    county: "Collin County",
    nearbyCities: ["melissa", "mckinney", "van-alstyne", "celina", "princeton"],
    localHook:
      "Anna is one of the fastest-growing small cities in Collin County, with new residential, retail, and light-commercial buildout along US-75.",
    commercialAngle:
      "Retail and restaurant TI flooring for the US-75 commercial corridor, plus light-industrial epoxy for the new warehouse and service buildings going up around Anna's commercial expansion.",
    residentialAngle:
      "New-build Anna garages get our one-day flake polyurea system with lifetime warranty — same materials and crew we put down in Plano and Frisco.",
    landmarks: ["Anna Town Square", "US-75 corridor"],
    zipCodes: ["75409"],
    faqs: baseFaqs("Anna"),
  },
  {
    slug: "melissa",
    name: "Melissa",
    county: "Collin County",
    nearbyCities: ["anna", "mckinney", "van-alstyne", "celina"],
    localHook:
      "Melissa has grown quickly on US-75 north of McKinney — new residential master-planned communities and a growing commercial base along the highway.",
    commercialAngle:
      "Retail and restaurant TI flooring along US-75, plus light-industrial epoxy for warehouse and service buildings around the Melissa commercial expansion.",
    residentialAngle:
      "Melissa garages — new builds in Liberty, North Creek, and Wolf Creek Farms — get our flake polyurea system with lifetime warranty, single-day install.",
    landmarks: ["Liberty", "Wolf Creek Farms", "Melissa High School"],
    zipCodes: ["75454"],
    faqs: baseFaqs("Melissa"),
  },
  {
    slug: "fairview",
    name: "Fairview",
    county: "Collin County",
    nearbyCities: ["allen", "mckinney", "lucas", "parker", "plano"],
    localHook:
      "Fairview's Village at Fairview commercial center and large-lot residential market both drive demand for premium flooring work.",
    commercialAngle:
      "Polished concrete and TI flooring for The Village at Fairview's retail and restaurant tenants, plus medical-office urethane cement and back-of-house epoxy.",
    residentialAngle:
      "Fairview luxury garages — large-lot custom homes with three- and four-car bays — get our flake polyurea system with lifetime warranty.",
    landmarks: ["The Village at Fairview", "Heritage Ranch"],
    zipCodes: ["75069"],
    faqs: baseFaqs("Fairview"),
  },
  {
    slug: "parker",
    name: "Parker",
    county: "Collin County",
    nearbyCities: ["allen", "fairview", "lucas", "plano", "murphy"],
    localHook:
      "Parker is a low-density, large-lot residential community — most of our work here is high-end custom-home garages and outbuildings.",
    commercialAngle:
      "Light-commercial and equestrian / agricultural facility coatings — barns, workshops, and tractor / equipment buildings get urethane cement or high-build epoxy that survives heavy use.",
    residentialAngle:
      "Parker's custom-home garages and detached shops get our flake polyurea system with lifetime warranty. Multi-bay layouts, no problem — we scope and install in a single day.",
    landmarks: ["Southfork Ranch", "FM-2551 corridor"],
    zipCodes: ["75002", "75094"],
    faqs: baseFaqs("Parker"),
  },
  {
    slug: "princeton",
    name: "Princeton",
    county: "Collin County",
    nearbyCities: ["mckinney", "anna", "melissa", "lowry-crossing"],
    localHook:
      "Princeton has grown rapidly along US-380 with new residential, retail, and light-commercial development.",
    commercialAngle:
      "Retail and restaurant TI flooring along the US-380 commercial corridor, plus warehouse and light-industrial epoxy for the service buildings supporting Princeton's growth.",
    residentialAngle:
      "Princeton new-build garages get our one-day polyurea flake system with lifetime warranty — full prep, single visit.",
    landmarks: ["Princeton Town Center", "US-380 corridor"],
    zipCodes: ["75407"],
    faqs: baseFaqs("Princeton"),
  },
  {
    slug: "sachse",
    name: "Sachse",
    county: "Dallas & Collin Counties",
    nearbyCities: ["wylie", "garland", "murphy", "richardson"],
    localHook:
      "Sachse sits between Garland's industrial base and Wylie's residential growth — we serve both sides from our Plano HQ.",
    commercialAngle:
      "Light-industrial epoxy and TI flooring for Sachse's commercial properties along SH-78 and PGBT, with polished concrete options for retail and showroom space.",
    residentialAngle:
      "Sachse garages — Woodbridge, Hudson Cove, and surrounding subdivisions — get our flake polyurea system with lifetime warranty.",
    landmarks: ["Woodbridge Golf Club", "SH-78 corridor"],
    zipCodes: ["75048"],
    faqs: baseFaqs("Sachse"),
  },
  {
    slug: "wylie",
    name: "Wylie",
    county: "Collin / Dallas / Rockwall Counties",
    nearbyCities: ["sachse", "murphy", "garland", "mckinney"],
    localHook:
      "Wylie's growth along SH-78 and FM-544 brings new commercial buildout alongside a strong residential base.",
    commercialAngle:
      "Retail and restaurant TI flooring throughout Wylie's commercial centers, urethane cement for medical-office and food-service back-of-house, and industrial epoxy for the light-manufacturing properties along the city's east side.",
    residentialAngle:
      "Wylie garages — Woodbridge, Inspiration, and surrounding subdivisions — get our flake polyurea system with lifetime warranty, full prep included.",
    landmarks: ["Inspiration", "Woodbridge", "Downtown Wylie"],
    zipCodes: ["75098"],
    faqs: baseFaqs("Wylie"),
  },
  {
    slug: "murphy",
    name: "Murphy",
    county: "Collin County",
    nearbyCities: ["plano", "parker", "wylie", "sachse", "richardson"],
    localHook:
      "Murphy is a tight, well-planned suburb with strong residential demand and a small but active commercial market along FM-544.",
    commercialAngle:
      "Retail and restaurant TI flooring along FM-544 and Murphy Marketplace, plus medical-office urethane cement and back-of-house epoxy.",
    residentialAngle:
      "Murphy garages get our flake polyurea system with lifetime warranty — same one-day install we do across Plano and Allen.",
    landmarks: ["Murphy Marketplace", "Murphy Central Park"],
    zipCodes: ["75094"],
    faqs: baseFaqs("Murphy"),
  },
  {
    slug: "farmers-branch",
    name: "Farmers Branch",
    county: "Dallas County",
    nearbyCities: ["addison", "carrollton", "dallas", "north-dallas"],
    localHook:
      "Farmers Branch's I-35E industrial belt and Mercer business district make it one of our highest-volume commercial markets in DFW.",
    commercialAngle:
      "Industrial epoxy and urethane cement for Farmers Branch's heavy distribution and manufacturing base, polished concrete for the corporate and showroom space along I-635 and IH-35E, plus TI flooring for restaurants and medical office.",
    residentialAngle:
      "Farmers Branch custom-home garages get our flake polyurea system with lifetime warranty, full prep included.",
    landmarks: ["Mercer Business District", "Brookhaven", "I-635 / I-35E corridor"],
    zipCodes: ["75234", "75244"],
    faqs: baseFaqs("Farmers Branch"),
  },
  {
    slug: "north-dallas",
    name: "North Dallas",
    county: "Dallas County",
    nearbyCities: ["dallas", "addison", "richardson", "farmers-branch", "plano"],
    localHook:
      "North Dallas — Preston Hollow, Preston Center, the Tollway corridor — combines high-end residential garages with constant retail and corporate buildout.",
    commercialAngle:
      "Polished concrete for showrooms, retail, and corporate lobbies along the Tollway and Preston Center, urethane cement for restaurant and medical-office back-of-house, and industrial epoxy for warehouse and service space along Forest and LBJ.",
    residentialAngle:
      "Preston Hollow and Bent Tree custom-home garages get our flake polyurea system with full prep and lifetime warranty.",
    landmarks: ["Preston Hollow", "Preston Center", "Bent Tree"],
    zipCodes: ["75230", "75240", "75248", "75254"],
    faqs: baseFaqs("North Dallas"),
  },
  {
    slug: "addison",
    name: "Addison",
    county: "Dallas County",
    nearbyCities: ["north-dallas", "farmers-branch", "carrollton", "dallas", "richardson"],
    localHook:
      "Addison's restaurant row, Addison Circle, and the Quorum / Belt Line office cluster keep our commercial crews busy with TI buildouts year-round.",
    commercialAngle:
      "Urethane cement for Addison's heavy restaurant kitchen market, polished concrete for corporate lobbies and showrooms in the Quorum, and industrial epoxy for light-manufacturing and service space.",
    residentialAngle:
      "Addison-area garages get our flake polyurea system with lifetime warranty — full prep, one-day install.",
    landmarks: ["Addison Circle", "Addison Airport", "Restaurant Row"],
    zipCodes: ["75001"],
    faqs: baseFaqs("Addison"),
  },
  {
    slug: "hebron",
    name: "Hebron",
    county: "Denton County",
    nearbyCities: ["carrollton", "lewisville", "the-colony", "plano"],
    localHook:
      "Hebron's location at the SH-121 / I-35E junction makes it a strong light-industrial and commercial flex space market.",
    commercialAngle:
      "Industrial epoxy and urethane cement for Hebron's flex / warehouse market along SH-121 and Hebron Parkway, plus polished concrete and TI flooring for the commercial buildouts feeding the corridor.",
    residentialAngle:
      "Hebron-area garages get our flake polyurea system with lifetime warranty — same materials, same crew we use across DFW.",
    landmarks: ["SH-121 / I-35E junction", "Hebron Parkway"],
    zipCodes: ["75010", "75056"],
    faqs: baseFaqs("Hebron"),
  },
  {
    slug: "highland-village",
    name: "Highland Village",
    county: "Denton County",
    nearbyCities: ["flower-mound", "lewisville", "coppell", "lake-dallas"],
    localHook:
      "Highland Village is a high-end residential community on Lake Lewisville with a tight commercial footprint — most of our work here is luxury garages and select retail TI.",
    commercialAngle:
      "Polished concrete and TI flooring for The Shops at Highland Village and the FM-2499 commercial corridor — restaurants, retail, and medical office.",
    residentialAngle:
      "Highland Village luxury garages and lake-house outbuildings get our flake polyurea system with lifetime warranty, full prep included.",
    landmarks: ["Shops at Highland Village", "Lake Lewisville"],
    zipCodes: ["75077"],
    faqs: baseFaqs("Highland Village"),
  },
  {
    slug: "flower-mound",
    name: "Flower Mound",
    county: "Denton & Tarrant Counties",
    nearbyCities: ["highland-village", "lewisville", "coppell", "fort-worth"],
    localHook:
      "Flower Mound's Lakeside DFW, River Walk, and FM-2499 corridor have added a heavy commercial buildout to what's already a strong luxury residential market.",
    commercialAngle:
      "Polished concrete and TI flooring for the Lakeside DFW and River Walk retail and restaurant tenants, urethane cement for medical-office and food-service back-of-house, and industrial epoxy for the light-manufacturing properties along FM-1171.",
    residentialAngle:
      "Flower Mound luxury garages — Bridlewood, Wellington, Lakeside — get our flake polyurea system with lifetime warranty, single-day install.",
    landmarks: ["Lakeside DFW", "River Walk", "Bridlewood"],
    zipCodes: ["75022", "75028"],
    faqs: baseFaqs("Flower Mound"),
  },
  {
    slug: "coppell",
    name: "Coppell",
    county: "Dallas & Denton Counties",
    nearbyCities: ["carrollton", "lewisville", "flower-mound", "farmers-branch"],
    localHook:
      "Coppell sits on the DFW Airport border — a deep distribution and logistics market combined with a strong residential base.",
    commercialAngle:
      "Industrial epoxy and urethane cement for Coppell's massive DFW Airport-adjacent distribution and logistics market, polished concrete for office and showroom space, and TI flooring for retail and restaurants along Sandy Lake and MacArthur.",
    residentialAngle:
      "Coppell garages get our flake polyurea system with lifetime warranty — full prep, one-day install.",
    landmarks: ["DFW Airport corridor", "Old Town Coppell"],
    zipCodes: ["75019"],
    faqs: baseFaqs("Coppell"),
  },
  {
    slug: "van-alstyne",
    name: "Van Alstyne",
    county: "Grayson County",
    nearbyCities: ["anna", "melissa", "howe", "sherman", "gunter"],
    localHook:
      "Van Alstyne's growth along US-75 has brought new commercial buildout and residential development to a small-town Grayson County market.",
    commercialAngle:
      "Retail, restaurant, and light-industrial TI flooring along US-75 as Van Alstyne builds out — full GC coordination and ITB-ready bids.",
    residentialAngle:
      "Van Alstyne new-build and acreage-property garages get our flake polyurea system with lifetime warranty.",
    landmarks: ["Downtown Van Alstyne", "US-75 corridor"],
    zipCodes: ["75495"],
    faqs: baseFaqs("Van Alstyne"),
  },
  {
    slug: "sherman",
    name: "Sherman",
    county: "Grayson County",
    nearbyCities: ["denison", "howe", "van-alstyne", "gunter"],
    localHook:
      "Sherman is a fast-growing North Texas industrial market — Texas Instruments, Globitech, GlobalWafers, and a growing semiconductor manufacturing base have driven serious demand for industrial flooring.",
    commercialAngle:
      "Anti-static / ESD epoxy, urethane cement, and FF/FL-flat polished concrete for Sherman's semiconductor and advanced manufacturing facilities, plus retail and restaurant TI work for the commercial buildout supporting the workforce.",
    residentialAngle:
      "Sherman residential garages get our flake polyurea system with lifetime warranty — same materials and crew we put down in Plano and Frisco.",
    landmarks: ["Texas Instruments Sherman", "Globitech", "Downtown Sherman"],
    zipCodes: ["75090", "75092"],
    faqs: baseFaqs("Sherman"),
  },
  {
    slug: "denison",
    name: "Denison",
    county: "Grayson County",
    nearbyCities: ["sherman", "howe", "van-alstyne"],
    localHook:
      "Denison's industrial base and Lake Texoma tourism market combine for steady commercial flooring demand.",
    commercialAngle:
      "Industrial epoxy and urethane cement for Denison's manufacturing and distribution buildings, plus polished concrete and TI flooring for the restaurant and retail tenants along US-75 and US-69.",
    residentialAngle:
      "Denison and Lake Texoma-area garages get our flake polyurea system with lifetime warranty.",
    landmarks: ["Lake Texoma", "Downtown Denison"],
    zipCodes: ["75020", "75021"],
    faqs: baseFaqs("Denison"),
  },
  {
    slug: "gunter",
    name: "Gunter",
    county: "Grayson County",
    nearbyCities: ["celina", "van-alstyne", "howe", "sherman"],
    localHook:
      "Gunter's growth as the Dallas North Tollway extends north has opened up new commercial and residential opportunities in southern Grayson County.",
    commercialAngle:
      "Light-industrial epoxy and warehouse coatings, plus retail and restaurant TI flooring for the new commercial buildout coming with Tollway expansion.",
    residentialAngle:
      "Gunter acreage and new-build garages get our flake polyurea system with lifetime warranty.",
    landmarks: ["Dallas North Tollway extension"],
    zipCodes: ["75058"],
    faqs: baseFaqs("Gunter"),
  },
  {
    slug: "howe",
    name: "Howe",
    county: "Grayson County",
    nearbyCities: ["van-alstyne", "sherman", "denison", "anna"],
    localHook:
      "Howe sits on US-75 between Van Alstyne and Sherman — small-town Grayson County with growing residential demand.",
    commercialAngle:
      "Light-commercial and small-industrial epoxy work along US-75, plus retail TI for the local commercial properties.",
    residentialAngle:
      "Howe residential and acreage-property garages get our flake polyurea system with lifetime warranty.",
    landmarks: ["US-75 corridor"],
    zipCodes: ["75459"],
    faqs: baseFaqs("Howe"),
  },
  {
    slug: "blue-ridge",
    name: "Blue Ridge",
    county: "Collin County",
    nearbyCities: ["anna", "melissa", "princeton"],
    localHook:
      "Blue Ridge is a small eastern Collin County community with growing residential and light-commercial demand.",
    commercialAngle:
      "Light-industrial epoxy and small-commercial TI flooring for Blue Ridge's commercial buildings.",
    residentialAngle:
      "Blue Ridge residential and acreage-property garages get our flake polyurea system with lifetime warranty.",
    landmarks: ["Downtown Blue Ridge"],
    zipCodes: ["75424"],
    faqs: baseFaqs("Blue Ridge"),
  },
];

export const CITY_SLUGS = SERVICE_AREA_CITIES.map((c) => c.slug);

export const getCityBySlug = (slug: string) =>
  SERVICE_AREA_CITIES.find((c) => c.slug === slug);

export const cityToSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
