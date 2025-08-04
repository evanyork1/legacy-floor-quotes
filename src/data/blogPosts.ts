// Blog posts data extracted for better performance
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  location: string;
  featured: boolean;
}

export const blogPostsData: BlogPost[] = [
  {
    id: 1,
    title: "The Ultimate Guide to Garage Floor Coatings in Dallas-Fort Worth",
    excerpt: "Discover why polyurea garage floor coatings are revolutionizing homes across DFW, from Plano to Prosper. Learn about installation, benefits, and what makes Legacy Industrial Coatings the trusted choice for Dallas homeowners.",
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
      <p>We proudly install garage floor coatings throughout Plano, Prosper, McKinney, Frisco, Celina, Allen, and more. If you're ready to upgrade your garage, our team can deliver a flawless install with a lifetime warranty.</p>
      
      <h2>Ready to Transform Your Garage?</h2>
      <p>Legacy Industrial Coatings is DFW's trusted name in polyurea garage floors. Reach out today for a quote — and see why homeowners from Plano to Prosper are ditching epoxy for good.</p>
    `,
    author: "Legacy Industrial Coatings Team",
    date: "July 28, 2025",
    readTime: "8 min read",
    category: "Residential",
    tags: ["Garage Floors", "Polyurea", "Dallas", "Home Improvement"],
    location: "Dallas-Fort Worth",
    featured: true
  },
  {
    id: 2,
    title: "Commercial Flooring Solutions: Why Plano Businesses Choose Legacy Industrial Coatings",
    excerpt: "From automotive shops in Frisco to warehouses in Dallas, discover how commercial-grade polyurea and polished concrete solutions are transforming business spaces across North Texas.",
    image: "/lovable-uploads/e6d46c38-cab4-4c0e-b5f7-a13f414dc01b.png",
    content: `
      <p>Businesses in North Texas need flooring that holds up to heavy foot traffic, forklifts, spills, and more. Whether you run a warehouse in Dallas or an automotive shop in Frisco, Legacy Industrial Coatings offers commercial-grade solutions that outperform standard epoxy.</p>
      
      <h2>Polyurea and Polished Concrete for Commercial Spaces</h2>
      <p>Our polyurea coatings are ideal for businesses needing a fast turnaround and long-term durability. For showrooms or industrial settings, polished concrete offers a clean, professional finish that's incredibly low maintenance.</p>
      
      <h2>Why Plano Businesses Choose Us</h2>
      <ul>
        <li>Quick installation with minimal downtime</li>
        <li>Customizable finishes to match your brand or facility style</li>
        <li>Chemical resistance for service bays, production lines, and more</li>
        <li>Long lifespan with lower total cost of ownership</li>
      </ul>
      
      <h2>Industries We Serve</h2>
      <ul>
        <li>Warehouses</li>
        <li>Retail & Grocery</li>
        <li>Automotive Shops</li>
        <li>Industrial Plants</li>
        <li>Breweries & Commercial Kitchens</li>
      </ul>
      
      <h2>DFW's Commercial Coating Experts</h2>
      <p>Plano, Frisco, McKinney, and surrounding cities trust Legacy to deliver flooring that performs. Contact us today to schedule an on-site assessment and get a detailed quote.</p>
    `,
    author: "Legacy Industrial Coatings Team",
    date: "July 22, 2025",
    readTime: "7 min read",
    category: "Commercial",
    tags: ["Commercial Flooring", "Business", "Plano", "Industrial"],
    location: "Plano, Texas",
    featured: false
  },
  {
    id: 3,
    title: "Garage Floor Coating Maintenance: Keeping Your Prosper Home's Floor Looking New",
    excerpt: "Learn the simple maintenance tips that keep polyurea garage floors in Prosper, Celina, and North Dallas looking showroom-perfect year after year.",
    image: "/lovable-uploads/8d8cf4a3-4ed7-4f9b-8909-0cf80a149ecc.png",
    content: `
      <p>Once your polyurea garage floor is installed, keeping it clean is a breeze. Still, a few key habits will help keep it looking like new for years to come.</p>
      
      <h2>Easy Maintenance Tips</h2>
      <ul>
        <li>Sweep weekly to keep dust and debris off the surface</li>
        <li>Use a soft mop with water and mild detergent for deeper cleaning</li>
        <li>Avoid harsh chemicals like bleach or degreasers</li>
        <li>Rinse spills quickly — especially oil or paint</li>
      </ul>
      
      <h2>Long-Term Protection</h2>
      <p>Polyurea floors resist UV rays, hot tires, and abrasions. With proper care, you'll maintain the glossy, showroom-like finish for 15–20 years or more.</p>
      
      <h2>Seasonal Notes for Prosper & Celina</h2>
      <p>North Dallas weather can vary, but polyurea won't flake in the cold or fade in the heat. Just avoid snow salt build-up in winter by rinsing the floor as needed.</p>
      
      <p>Need help or have questions about care? Legacy offers ongoing support to every customer.</p>
    `,
    author: "Legacy Industrial Coatings Team",
    date: "July 15, 2025",
    readTime: "6 min read",
    category: "Maintenance",
    tags: ["Maintenance", "Prosper", "Garage Care", "Home Tips"],
    location: "Prosper, Texas",
    featured: false
  },
  {
    id: 4,
    title: "Why Celina Homeowners Are Upgrading to Decorative Concrete Coatings",
    excerpt: "Explore the growing trend of decorative garage floors in Celina and North Dallas. From metallic epoxy to flake systems, discover stunning transformations.",
    image: "/lovable-uploads/de857ed2-571d-46fc-a514-07461bffbb2b.png",
    content: `
      <p>Celina and North Dallas homeowners are increasingly choosing decorative concrete coatings to upgrade the look and feel of their garages and patios. These aren't just functional — they're beautiful.</p>
      
      <h2>Decorative Options We Offer</h2>
      <ul>
        <li><strong>Metallic epoxy</strong> – High-gloss finishes with marbled effects</li>
        <li><strong>Color flake blends</strong> – Bold or subtle texture with slip resistance</li>
        <li><strong>Quartz systems</strong> – Durable with a contemporary aesthetic</li>
      </ul>
      
      <h2>Why Decorative Coatings?</h2>
      <ul>
        <li>Boost curb appeal and resale value</li>
        <li>Customize to match your home's exterior</li>
        <li>Stand out from builder-grade concrete</li>
      </ul>
      
      <h2>Perfect for Custom Homes</h2>
      <p>Whether you've just built a custom home in Celina or are renovating, our decorative systems add instant polish and personality.</p>
      
      <p>Contact Legacy Industrial Coatings to view our full color chart and book your upgrade today.</p>
    `,
    author: "Legacy Industrial Coatings Team",
    date: "July 8, 2025",
    readTime: "9 min read",
    category: "Design",
    tags: ["Decorative Floors", "Celina", "Home Design", "Custom Homes"],
    location: "Celina, Texas",
    featured: false
  }
];