// Blog posts data extracted for better performance
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  /** Alias of `image`, kept for the new schema field name. */
  featuredImage?: string;
  content: string;
  author: string;
  date: string;
  /** ISO 8601 date used for schema.org and sorting. */
  publishedDate: string;
  readTime: string;
  category: string;
  tags: string[];
  location: string;
  featured: boolean;
}

export const BLOG_CATEGORIES = [
  "Garage Floors",
  "Commercial Flooring",
  "Industrial Coatings",
  "Concrete Polishing",
  "Maintenance & Care",
  "Project Spotlights",
] as const;

export const blogPostsData: BlogPost[] = [
  {
    id: 100,
    slug: "epoxy-vs-polyaspartic-garage-floor-coating",
    title: "Epoxy vs Polyaspartic: Which Garage Floor Coating Is Right for You?",
    excerpt:
      "Epoxy and polyaspartic coatings both look great on day one — but they age very differently. Here's how to pick the right system for your DFW garage based on cure time, UV resistance, and lifetime cost.",
    image: "/lovable-uploads/008e4edb-0e9b-4952-8a51-b7d92f110955.png",
    content: `
      <p>If you've shopped around for a garage floor coating in Dallas-Fort Worth, you've probably heard two words over and over: <strong>epoxy</strong> and <strong>polyaspartic</strong>. Both create a hard, glossy floor. Both can be installed with decorative flake. But under the hood they behave very differently — and that difference shows up after a couple of Texas summers.</p>

      <h2>Epoxy: The Old Standard</h2>
      <p>Epoxy is a two-part resin that cures slowly into a hard plastic-like film. It's affordable, widely available, and produces a thick, glossy finish. The downsides: epoxy is sensitive to UV, prone to yellowing, and can delaminate when hot tires sit on it for hours. Cure time runs 24–72 hours per coat.</p>

      <h2>Polyaspartic / Polyurea: The Modern Upgrade</h2>
      <p>Polyaspartic (a type of polyurea) cures in under an hour, resists UV, and stays flexible enough to handle concrete movement without cracking. It's the system we install at Legacy Industrial Coatings because it holds up to Texas heat, hot tires, and road salt without yellowing or peeling.</p>

      <h2>Side-by-Side</h2>
      <ul>
        <li><strong>Cure time:</strong> Epoxy 1–3 days &middot; Polyaspartic same day</li>
        <li><strong>UV stability:</strong> Epoxy yellows &middot; Polyaspartic stays clear</li>
        <li><strong>Hot tire pickup:</strong> Common with epoxy &middot; Rare with polyaspartic</li>
        <li><strong>Lifespan:</strong> Epoxy 3–7 years &middot; Polyaspartic 15–20+ years</li>
      </ul>

      <h2>Which Should You Choose?</h2>
      <p>If budget is the only factor and the garage rarely sees sun, epoxy can work. For everyone else — especially homeowners in Plano, Frisco, McKinney, and Prosper — polyaspartic is the better long-term value.</p>
    `,
    author: "Legacy Industrial Coatings Team",
    date: "April 28, 2026",
    publishedDate: "2026-04-28",
    readTime: "6 min read",
    category: "Garage Floors",
    tags: ["Garage Floors", "Polyaspartic", "Epoxy", "DFW"],
    location: "Dallas-Fort Worth",
    featured: true,
  },
  {
    id: 101,
    slug: "14000-sqft-dfw-golf-club-coating-project",
    title: "How We Coated 14,000 Sq Ft at a DFW Golf Club",
    excerpt:
      "A behind-the-scenes look at a 14,000 square foot commercial coating project at a private golf club in Dallas-Fort Worth — from diamond grinding to final polyaspartic topcoat in a 4-day window.",
    image: "/lovable-uploads/e6d46c38-cab4-4c0e-b5f7-a13f414dc01b.png",
    content: `
      <p>When a private golf club in DFW needed to refresh 14,000 square feet of cart barn and back-of-house flooring without disrupting member play, they brought in Legacy Industrial Coatings. Here's how the project came together.</p>

      <h2>Day 1 — Prep & Grind</h2>
      <p>We staged equipment at 5 a.m. and ran four diamond grinders simultaneously to open the concrete profile. Existing coatings, mastic, and oil stains were removed down to clean, sound substrate.</p>

      <h2>Day 2 — Crack Repair & Base Coat</h2>
      <p>Every visible crack was chased, cleaned, and filled with a structural polyurea. We then rolled a tinted polyurea base coat across the full 14,000 sq ft and broadcast color flake into the wet film to refusal.</p>

      <h2>Day 3 — Scrape & Topcoat</h2>
      <p>Excess flake was scraped and vacuumed. A clear polyaspartic topcoat was squeegeed and back-rolled for an even, high-build finish.</p>

      <h2>Day 4 — Reopen</h2>
      <p>By 7 a.m. the floor was cured and ready for cart traffic. Total downtime: under 96 hours for a space that previously took two weeks to recoat with epoxy.</p>

      <h2>The Result</h2>
      <p>A seamless, slip-resistant, easy-to-clean floor backed by our commercial warranty — and a club that didn't lose a single tee time.</p>
    `,
    author: "Legacy Industrial Coatings Team",
    date: "April 21, 2026",
    publishedDate: "2026-04-21",
    readTime: "5 min read",
    category: "Project Spotlights",
    tags: ["Commercial", "Polyaspartic", "Case Study", "DFW"],
    location: "Dallas-Fort Worth",
    featured: false,
  },
  {
    id: 102,
    slug: "questions-to-ask-commercial-epoxy-contractor",
    title: "What to Ask Before Hiring a Commercial Epoxy Contractor",
    excerpt:
      "Not every commercial flooring contractor is built for warehouse-scale work. Use these questions to separate real industrial coating crews from the weekend garage installers.",
    image: "/lovable-uploads/de857ed2-571d-46fc-a514-07461bffbb2b.png",
    content: `
      <p>Hiring the wrong contractor for a commercial coating job is expensive — both in dollars and downtime. Before you sign a proposal, work through this short list with anyone bidding your project.</p>

      <h2>1. What surface prep method will you use?</h2>
      <p>Acceptable answers: diamond grinding or shot blasting. If they say "acid etch" or "pressure wash," walk away. Mechanical profile is non-negotiable for a commercial-grade bond.</p>

      <h2>2. What system are you specifying — and why?</h2>
      <p>A real industrial contractor can explain why they chose a specific resin (epoxy, polyurea, urethane cement) for your environment: chemical exposure, thermal shock, forklift traffic, USDA requirements, etc.</p>

      <h2>3. What's your moisture mitigation plan?</h2>
      <p>Slab moisture kills coatings. Ask how they test (calcium chloride, RH probes) and what mitigation primer they use if readings are high.</p>

      <h2>4. How do you handle joints and cracks?</h2>
      <p>Joints should be honored or filled with semi-rigid joint filler — not bridged with coating. Cracks should be chased and filled with a structural polyurea before the base coat.</p>

      <h2>5. Who is on-site, and what's the warranty?</h2>
      <p>You want a named project lead, an in-house crew (not subbed out), and a written warranty covering adhesion, delamination, and topcoat failure.</p>

      <h2>Bonus: Ask for References at Similar Scale</h2>
      <p>A contractor who's done 50,000 sq ft of warehouse can do your 8,000 sq ft shop. The reverse isn't always true. Always ask for references at or above your project size.</p>
    `,
    author: "Legacy Industrial Coatings Team",
    date: "April 14, 2026",
    publishedDate: "2026-04-14",
    readTime: "7 min read",
    category: "Commercial Flooring",
    tags: ["Commercial", "Hiring Guide", "Industrial Coatings"],
    location: "Dallas-Fort Worth",
    featured: false,
  },
  {
    id: 1,
    slug: "ultimate-guide-garage-floor-coatings-dfw",
    title: "The Ultimate Guide to Garage Floor Coatings in Dallas-Fort Worth",
    excerpt:
      "Discover why polyurea garage floor coatings are revolutionizing homes across DFW, from Plano to Prosper. Learn about installation, benefits, and what makes Legacy Industrial Coatings the trusted choice for Dallas homeowners.",
    image: "/lovable-uploads/008e4edb-0e9b-4952-8a51-b7d92f110955.png",
    content: `
      <p>If you're a homeowner in Dallas–Fort Worth, you know just how much wear and tear your garage floor goes through. From hot tires in summer to spilled tools and car fluids, your concrete floor takes a beating. That's why more DFW homeowners are turning to polyurea garage floor coatings — a modern, industrial-grade solution designed to last.</p>
      <h2>What Is a Polyurea Flake Floor System?</h2>
      <p>Polyurea is a fast-curing, highly durable coating that penetrates deep into the concrete. It's far superior to traditional epoxy, offering flexibility, UV resistance, and a flawless bond that doesn't peel. The flake layer adds texture, color, and slip resistance, making it ideal for garages.</p>
      <h2>Why DFW Homeowners Choose Polyurea</h2>
      <ul>
        <li><strong>Lifetime durability</strong> – No peeling, chipping, or yellowing</li>
        <li><strong>One-day installs</strong> – Your garage is ready for light traffic in hours</li>
        <li><strong>Hot tire safe</strong> – Resistant to delamination from heated tires</li>
        <li><strong>Low maintenance</strong> – Just mop and sweep to keep it clean</li>
      </ul>
      <h2>Installation Process</h2>
      <p>Legacy Industrial Coatings prepares your surface by grinding the concrete with diamond tooling. We then repair cracks, apply a polyurea base coat, broadcast color flakes, and seal it with a UV-stable topcoat. The result: a gorgeous, non-slip floor built to last.</p>
      <h2>From Plano to Prosper: Service Areas</h2>
      <p>We proudly install garage floor coatings throughout Plano, Prosper, McKinney, Frisco, Celina, Allen, and more.</p>
    `,
    author: "Legacy Industrial Coatings Team",
    date: "July 28, 2025",
    publishedDate: "2025-07-28",
    readTime: "8 min read",
    category: "Garage Floors",
    tags: ["Garage Floors", "Polyurea", "Dallas"],
    location: "Dallas-Fort Worth",
    featured: false,
  },
  {
    id: 2,
    slug: "commercial-flooring-plano-businesses",
    title: "Commercial Flooring Solutions: Why Plano Businesses Choose Legacy Industrial Coatings",
    excerpt:
      "From automotive shops in Frisco to warehouses in Dallas, discover how commercial-grade polyurea and polished concrete solutions are transforming business spaces across North Texas.",
    image: "/lovable-uploads/e6d46c38-cab4-4c0e-b5f7-a13f414dc01b.png",
    content: `
      <p>Businesses in North Texas need flooring that holds up to heavy foot traffic, forklifts, spills, and more.</p>
      <h2>Polyurea and Polished Concrete for Commercial Spaces</h2>
      <p>Our polyurea coatings are ideal for businesses needing a fast turnaround and long-term durability.</p>
      <h2>Industries We Serve</h2>
      <ul>
        <li>Warehouses</li>
        <li>Retail & Grocery</li>
        <li>Automotive Shops</li>
        <li>Industrial Plants</li>
      </ul>
    `,
    author: "Legacy Industrial Coatings Team",
    date: "July 22, 2025",
    publishedDate: "2025-07-22",
    readTime: "7 min read",
    category: "Commercial Flooring",
    tags: ["Commercial Flooring", "Plano", "Industrial"],
    location: "Plano, Texas",
    featured: false,
  },
  {
    id: 3,
    slug: "garage-floor-maintenance-prosper",
    title: "Garage Floor Coating Maintenance: Keeping Your Prosper Home's Floor Looking New",
    excerpt:
      "Learn the simple maintenance tips that keep polyurea garage floors in Prosper, Celina, and North Dallas looking showroom-perfect year after year.",
    image: "/lovable-uploads/8d8cf4a3-4ed7-4f9b-8909-0cf80a149ecc.png",
    content: `
      <p>Once your polyurea garage floor is installed, keeping it clean is a breeze.</p>
      <h2>Easy Maintenance Tips</h2>
      <ul>
        <li>Sweep weekly to keep dust and debris off the surface</li>
        <li>Use a soft mop with water and mild detergent for deeper cleaning</li>
        <li>Avoid harsh chemicals like bleach or degreasers</li>
        <li>Rinse spills quickly — especially oil or paint</li>
      </ul>
    `,
    author: "Legacy Industrial Coatings Team",
    date: "July 15, 2025",
    publishedDate: "2025-07-15",
    readTime: "6 min read",
    category: "Maintenance & Care",
    tags: ["Maintenance", "Prosper", "Garage Care"],
    location: "Prosper, Texas",
    featured: false,
  },
  {
    id: 4,
    slug: "decorative-concrete-coatings-celina",
    title: "Why Celina Homeowners Are Upgrading to Decorative Concrete Coatings",
    excerpt:
      "Explore the growing trend of decorative garage floors in Celina and North Dallas. From metallic epoxy to flake systems, discover stunning transformations.",
    image: "/lovable-uploads/de857ed2-571d-46fc-a514-07461bffbb2b.png",
    content: `
      <p>Celina and North Dallas homeowners are increasingly choosing decorative concrete coatings to upgrade the look and feel of their garages and patios.</p>
      <h2>Decorative Options We Offer</h2>
      <ul>
        <li><strong>Metallic epoxy</strong> – High-gloss finishes with marbled effects</li>
        <li><strong>Color flake blends</strong> – Bold or subtle texture with slip resistance</li>
        <li><strong>Quartz systems</strong> – Durable with a contemporary aesthetic</li>
      </ul>
    `,
    author: "Legacy Industrial Coatings Team",
    date: "July 8, 2025",
    publishedDate: "2025-07-08",
    readTime: "9 min read",
    category: "Garage Floors",
    tags: ["Decorative Floors", "Celina", "Custom Homes"],
    location: "Celina, Texas",
    featured: false,
  },
];

export const getSortedPosts = (): BlogPost[] =>
  [...blogPostsData].sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
  );

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPostsData.find((p) => p.slug === slug);
