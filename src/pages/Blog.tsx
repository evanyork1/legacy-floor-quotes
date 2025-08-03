import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BookingModal } from "@/components/landing/BookingModal";

const Blog = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to Garage Floor Coatings in Dallas-Fort Worth",
      excerpt: "Discover why polyurea garage floor coatings are revolutionizing homes across DFW, from Plano to Prosper. Learn about installation, benefits, and what makes Legacy Industrial Coatings the trusted choice for Dallas homeowners.",
      image: "/lovable-uploads/8865d0d1-af13-4849-b194-a2611de34a0b.png",
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
      date: "January 15, 2024",
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
      date: "January 10, 2024",
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
      date: "January 5, 2024",
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
      image: "/lovable-uploads/9acbbf4d-30b4-4070-9bb9-5e1e7f9f7d8e.png",
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
      date: "December 28, 2023",
      readTime: "9 min read",
      category: "Design",
      tags: ["Decorative Floors", "Celina", "Home Design", "Custom Homes"],
      location: "Celina, Texas",
      featured: false
    }
  ];

  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <>
      <Helmet>
        <title>Garage Floor Coating Blog - Expert Tips & Insights | Legacy Industrial Coatings</title>
        <meta name="description" content="Expert insights on garage floor coatings, commercial flooring, and maintenance tips from Legacy Industrial Coatings. Serving Dallas, Plano, Frisco, Prosper, and Celina." />
        <meta name="keywords" content="garage floor coating blog, polyurea flooring tips, commercial flooring insights, Dallas flooring blog, Plano garage floors" />
        
        <meta property="og:title" content="Expert Flooring Blog | Legacy Industrial Coatings" />
        <meta property="og:description" content="Expert insights on garage floor coatings, commercial flooring, and maintenance tips from Legacy Industrial Coatings." />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/blog" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <Header />
        
        {selectedPost ? (
          /* Article View */
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedPost(null)}
                  className="mb-8 text-blue-600 hover:text-blue-700"
                >
                  ← Back to Blog
                </Button>
                
                <article className="prose prose-lg max-w-none">
                  <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="secondary">{selectedPost.category}</Badge>
                      <div className="flex items-center gap-2 text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{selectedPost.location}</span>
                      </div>
                    </div>
                    
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                      {selectedPost.title}
                    </h1>
                    
                    <div className="flex items-center gap-6 text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{selectedPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{selectedPost.readTime}</span>
                      </div>
                    </div>
                    
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {selectedPost.excerpt}
                    </p>
                  </div>
                  
                  <div 
                    className="prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }} 
                  />
                </article>
              </div>
            </div>
          </section>
        ) : (
          <>
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-slate-100">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Expert <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Insights</span> & Tips
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Stay informed with the latest insights, tips, and guides about garage floor coatings, 
              polyurea systems, maintenance, and industry best practices from our experts.
            </p>
          </div>
        </section>

        {/* Featured Post Section */}
        {featuredPost && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Article</h2>
                </div>
                
                <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative overflow-hidden">
                      <img 
                        src={featuredPost.image} 
                        alt={featuredPost.title}
                        className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-600 text-white">Featured</Badge>
                      </div>
                    </div>
                    <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {featuredPost.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredPost.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {featuredPost.location}
                        </div>
                      </div>
                      <Badge variant="outline" className="w-fit mb-4">{featuredPost.category}</Badge>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        {featuredPost.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <Button 
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 w-fit"
                        onClick={() => setSelectedPost(featuredPost)}
                      >
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
                <p className="text-lg text-gray-600">
                  Explore our collection of expert guides and industry insights
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group bg-white">
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="outline" className="bg-white/90">{post.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {post.location}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white w-full"
                        onClick={() => setSelectedPost(post)}
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
        </>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get expert flooring solutions from Legacy Industrial Coatings. Serving Dallas, Plano, Frisco, Prosper, Celina, and surrounding North Texas communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get A Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => setShowBookingModal(true)}
                variant="outline"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full transition-all duration-300"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book An Estimate
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      
      <BookingModal 
        isOpen={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
      />
    </>
  );
};

export default Blog;