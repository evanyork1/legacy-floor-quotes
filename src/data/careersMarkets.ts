export type CareerMarket = {
  slug: string;
  city: string;
  state: string;
  stateAbbr: string;
  seats: number;
  headline: string;
  intro: string;
  corridors: string[];
  industries: string[];
};

export const CAREER_MARKETS: CareerMarket[] = [
  {
    slug: "dallas-tx",
    city: "Dallas",
    state: "Texas",
    stateAbbr: "TX",
    seats: 2,
    headline: "Two seats open in our home market",
    intro:
      "This is where we've spent ten years and built over 200 five-star reviews. The install side is solved, the crews are deep, and the inbound bid flow is already running. Two reps here aren't splitting a territory. There's more industrial square footage in this metroplex than any two of our other markets combined.",
    corridors: [
      "Great Southwest Industrial District",
      "Stemmons Corridor",
      "Southern Dallas inland port and the I-45 spine",
      "DFW Airport freight and air cargo",
    ],
    industries: [
      "Distribution and fulfillment",
      "Food and beverage processing",
      "Light manufacturing",
      "Cold storage",
    ],
  },
  {
    slug: "houston-tx",
    city: "Houston",
    state: "Texas",
    stateAbbr: "TX",
    seats: 1,
    headline: "The heaviest industrial floor in the country",
    intro:
      "Nothing else on this list has Houston's density of plant, terminal, and processing work. Urethane cement and chemical-resistant systems aren't a niche here, they're the whole conversation. If you already know the Ship Channel and the plants along it, this seat is worth more to you than any other one we have.",
    corridors: [
      "Houston Ship Channel and Bayport",
      "Baytown and the east petrochemical corridor",
      "Northwest Houston along the 290 corridor",
      "Katy and Brookshire distribution",
    ],
    industries: [
      "Petrochemical and plant maintenance",
      "Food processing and cold storage",
      "Terminal and warehouse distribution",
      "Turnaround and shutdown work",
    ],
  },
  {
    slug: "austin-tx",
    city: "Austin",
    state: "Texas",
    stateAbbr: "TX",
    seats: 1,
    headline: "New construction and tight tolerances",
    intro:
      "Austin builds new more than it renovates, which means specs get written before the slab is poured and the rep who's in the room early wins the job. Cleanroom-adjacent facilities and food and beverage production drive the technical end of this market.",
    corridors: [
      "SH-130 corridor",
      "Southeast Austin and Del Valle",
      "Georgetown and Round Rock industrial",
      "Northeast Austin manufacturing",
    ],
    industries: [
      "Semiconductor support and advanced manufacturing",
      "Food and beverage production",
      "Breweries and distilleries",
      "Distribution",
    ],
  },
  {
    slug: "san-antonio-tx",
    city: "San Antonio",
    state: "Texas",
    stateAbbr: "TX",
    seats: 1,
    headline: "Automotive, food, and military logistics",
    intro:
      "San Antonio runs on three engines and all three need floor. The automotive supply base on the south side, the food processing corridor, and the logistics operations around Port San Antonio and East Kelly. The I-35 run north toward New Braunfels is filling in fast.",
    corridors: [
      "Port San Antonio and East Kelly",
      "Southside automotive corridor",
      "I-35 north toward New Braunfels",
      "Northeast industrial and the Randolph corridor",
    ],
    industries: [
      "Automotive supply and assembly",
      "Food processing",
      "Military and government logistics",
      "Distribution",
    ],
  },
  {
    slug: "oklahoma-city-ok",
    city: "Oklahoma City",
    state: "Oklahoma",
    stateAbbr: "OK",
    seats: 1,
    headline: "Aerospace maintenance and the I-40 distribution spine",
    intro:
      "OKC is an underserved market with real industrial volume and fewer serious resinous contractors chasing it than any Texas metro on this list. Aerospace maintenance work carries specification requirements most local competitors aren't equipped to meet.",
    corridors: [
      "I-40 distribution corridor",
      "Will Rogers air cargo and the aerospace campus",
      "Yukon and El Reno distribution",
      "Southeast OKC manufacturing",
    ],
    industries: [
      "Aerospace maintenance and overhaul",
      "Distribution and fulfillment",
      "Food processing",
      "Energy services",
    ],
  },
  {
    slug: "kansas-city-mo",
    city: "Kansas City",
    state: "Missouri",
    stateAbbr: "MO",
    seats: 1,
    headline: "Food processing and cold storage at scale",
    intro:
      "Kansas City has the heaviest concentration of food processing and cold storage on this list. That work lives on urethane cement and chemical-resistant systems, it gets replaced on a cycle, and the facilities that buy it buy it again. This is a relationship market more than a bid market.",
    corridors: [
      "Logistics Park KC in Edgerton",
      "Fairfax industrial district",
      "Riverside and the Northland",
      "I-70 and I-35 distribution corridors",
    ],
    industries: [
      "Food and protein processing",
      "Cold storage and refrigerated distribution",
      "Animal health and life sciences",
      "Rail and intermodal logistics",
    ],
  },
  {
    slug: "wichita-ks",
    city: "Wichita",
    state: "Kansas",
    stateAbbr: "KS",
    seats: 1,
    headline: "Aerospace manufacturing, and not much competition",
    intro:
      "Wichita is a small metro with outsized industrial floor demand because of what gets built here. Aerospace manufacturing floors carry specification and static-control requirements most regional flooring contractors can't bid. One rep who owns these relationships owns the market.",
    corridors: [
      "West Wichita industrial",
      "Aerospace manufacturing campuses",
      "I-135 corridor",
      "Southeast Wichita and Derby",
    ],
    industries: [
      "Aerospace manufacturing",
      "Agricultural processing",
      "Metal fabrication",
      "Distribution",
    ],
  },
  {
    slug: "baton-rouge-la",
    city: "Baton Rouge",
    state: "Louisiana",
    stateAbbr: "LA",
    seats: 1,
    headline: "Plant work along the river corridor",
    intro:
      "The stretch of river between Baton Rouge and the Gulf is one of the densest petrochemical corridors anywhere. This is maintenance and turnaround work, chemical-resistant systems, and secondary containment. The buyers are plant maintenance managers and reliability engineers, and they stay in their seats for decades.",
    corridors: [
      "Mississippi River petrochemical corridor",
      "Geismar and Gonzales plant corridor",
      "Port Allen and West Baton Rouge",
      "LA-1 industrial",
    ],
    industries: [
      "Petrochemical and refining",
      "Plant maintenance and turnaround",
      "Secondary containment",
      "Marine and port facilities",
    ],
  },
];

export const getCareerMarket = (slug?: string) =>
  CAREER_MARKETS.find((m) => m.slug === slug);

export const TOTAL_SEATS = CAREER_MARKETS.reduce((n, m) => n + m.seats, 0);
