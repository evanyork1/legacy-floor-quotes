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
      content: `
        <h2>Why Dallas Homeowners Are Choosing Polyurea Over Epoxy</h2>
        <p>In the Dallas-Fort Worth metroplex, where summer temperatures soar and weather can be unpredictable, choosing the right garage floor coating is crucial. Homeowners in Plano, Frisco, Prosper, and Celina are increasingly turning to polyurea coatings over traditional epoxy for several compelling reasons.</p>
        
        <h3>Superior Heat Resistance</h3>
        <p>Texas heat is no joke, and garage floors bear the brunt of it. Traditional epoxy coatings can soften and become tacky under extreme heat, especially when hot tires from vehicles parked outside meet the garage floor. Polyurea coatings maintain their integrity even in temperatures exceeding 180°F, making them perfect for Dallas summers.</p>
        
        <h3>Fast Installation for Busy DFW Families</h3>
        <p>Time is precious for families in fast-growing communities like Prosper and Celina. While epoxy installations can take 3-5 days with multiple coats and long cure times, our polyurea systems are typically installed in one day and ready for vehicle traffic within 24 hours. This means minimal disruption to your daily routine.</p>
        
        <h3>The Legacy Difference in North Texas</h3>
        <p>At Legacy Industrial Coatings, we've perfected our installation process specifically for North Texas conditions. Our team understands the unique challenges of concrete in this region, from foundation settling to temperature fluctuations. We've successfully transformed garages across Dallas, Plano, Frisco, McKinney, Allen, and surrounding communities.</p>
        
        <h3>Investment Value for DFW Real Estate</h3>
        <p>The North Texas real estate market is competitive, and garage floor coatings have become a sought-after feature for homebuyers in Plano, Frisco, and Prosper. A professionally installed polyurea floor not only protects your investment but can increase your home's value and appeal to potential buyers.</p>
        
        <h3>Maintenance Made Simple</h3>
        <p>Between Dallas dust storms and tracked-in mud from Texas rain, garage floors take a beating. Polyurea's non-porous surface means spills wipe up easily, and regular maintenance requires nothing more than occasional mopping. No more oil stains or tire marks permanently embedded in your concrete.</p>
      `,
      author: "Legacy Industrial Coatings Team",
      date: "January 15, 2024",
      readTime: "8 min read",
      category: "Residential",
      tags: ["Garage Floors", "Polyurea", "Dallas", "Home Improvement"],
      location: "Dallas-Fort Worth"
    },
    {
      id: 2,
      title: "Commercial Flooring Solutions: Why Plano Businesses Choose Legacy Industrial Coatings",
      excerpt: "From automotive shops in Frisco to warehouses in Dallas, discover how commercial-grade polyurea and polished concrete solutions are transforming business spaces across North Texas.",
      content: `
        <h2>Meeting the Demands of North Texas Commercial Spaces</h2>
        <p>Commercial facilities across the Dallas-Fort Worth area face unique flooring challenges. From automotive dealerships in Plano to manufacturing facilities in Frisco, business owners need flooring solutions that can withstand heavy traffic, chemical exposure, and the demanding pace of North Texas commerce.</p>
        
        <h3>Automotive Industry Solutions</h3>
        <p>The automotive sector is thriving in communities like Plano and Frisco, with numerous dealerships and repair facilities. These businesses require floors that can handle hydraulic fluid spills, hot tire marks, and heavy vehicle traffic. Our commercial-grade polyurea systems provide the chemical resistance and durability these facilities demand.</p>
        
        <h3>Warehouse and Distribution Centers</h3>
        <p>With Dallas serving as a major logistics hub, warehouse flooring must withstand forklift traffic, pallet drops, and constant movement. Our polished concrete solutions provide the smooth, durable surface needed for efficient operations while reducing maintenance costs and improving safety.</p>
        
        <h3>Food Service and Processing</h3>
        <p>Restaurants and food processing facilities in the DFW area require floors that meet strict health department standards. Our antimicrobial coatings resist bacteria growth while providing easy cleanup and slip resistance, essential for fast-paced commercial kitchens.</p>
        
        <h3>Healthcare and Laboratory Facilities</h3>
        <p>Medical facilities across Plano, Frisco, and surrounding areas need specialized flooring that can withstand chemical disinfectants while maintaining a professional appearance. Our healthcare-grade coatings provide the seamless, non-porous surface required for these critical environments.</p>
        
        <h3>Minimizing Business Downtime</h3>
        <p>We understand that downtime costs money. That's why we offer flexible scheduling, including after-hours and weekend installations, to keep your Plano or Dallas business running smoothly. Our fast-cure polyurea systems can often be installed overnight, allowing normal operations to resume the next business day.</p>
        
        <h3>Local Partnership and Support</h3>
        <p>As a trusted partner to North Texas businesses, Legacy Industrial Coatings provides ongoing support and maintenance programs. We're not just contractors; we're local partners invested in the success of the DFW business community.</p>
      `,
      author: "Legacy Industrial Coatings Team",
      date: "January 10, 2024",
      readTime: "7 min read",
      category: "Commercial",
      tags: ["Commercial Flooring", "Business", "Plano", "Industrial"],
      location: "Plano, Texas"
    },
    {
      id: 3,
      title: "Garage Floor Coating Maintenance: Keeping Your Prosper Home's Floor Looking New",
      excerpt: "Learn the simple maintenance tips that keep polyurea garage floors in Prosper, Celina, and North Dallas looking showroom-perfect year after year. Expert advice from Legacy Industrial Coatings.",
      content: `
        <h2>Protecting Your Investment in North Texas</h2>
        <p>Your new garage floor coating represents a significant investment in your Prosper or Celina home. With proper maintenance, these floors can look showroom-perfect for decades. Here's everything North Texas homeowners need to know about maintaining their polyurea garage floors.</p>
        
        <h3>Daily and Weekly Care</h3>
        <p>The beauty of polyurea coatings lies in their low maintenance requirements. For homes in Prosper and surrounding areas, simple daily care involves:</p>
        <ul>
          <li>Sweeping or using a leaf blower to remove debris</li>
          <li>Wiping up spills immediately with a damp cloth</li>
          <li>Weekly mopping with warm water and mild detergent</li>
        </ul>
        
        <h3>Dealing with North Texas Weather</h3>
        <p>The DFW climate brings unique challenges, from dust storms to sudden temperature changes. Here's how to protect your floor:</p>
        
        <h4>Summer Heat Protection</h4>
        <p>While polyurea handles heat better than epoxy, placing mats under motorcycles or lawn equipment that might leak fluids provides extra protection during Dallas's scorching summers.</p>
        
        <h4>Winter Considerations</h4>
        <p>North Texas winters can bring ice and road salt on vehicle tires. Simply rinse these off with water to prevent any potential surface dulling over time.</p>
        
        <h3>Addressing Common Concerns</h3>
        <p>Homeowners in Plano and Frisco often worry about specific maintenance scenarios:</p>
        
        <h4>Oil and Fluid Spills</h4>
        <p>Unlike concrete, polyurea won't absorb spills. Even automotive fluids can be wiped away without staining, making cleanup effortless.</p>
        
        <h4>Tire Marks</h4>
        <p>The flexibility of polyurea means tire marks are virtually eliminated. Any scuff marks can be removed with a simple cleaning solution.</p>
        
        <h3>Long-term Care for Maximum Lifespan</h3>
        <p>With proper care, garage floors in Prosper and Celina homes can maintain their appearance for 15-20 years or more. Annual professional inspections can identify any minor issues before they become problems.</p>
        
        <h3>When to Call the Professionals</h3>
        <p>Legacy Industrial Coatings provides ongoing support to our North Texas customers. If you notice any changes in your floor's appearance or have questions about care, our team is just a phone call away.</p>
      `,
      author: "Legacy Industrial Coatings Team",
      date: "January 5, 2024",
      readTime: "6 min read",
      category: "Maintenance",
      tags: ["Maintenance", "Prosper", "Garage Care", "Home Tips"],
      location: "Prosper, Texas"
    },
    {
      id: 4,
      title: "Why Celina Homeowners Are Upgrading to Decorative Concrete Coatings",
      excerpt: "Explore the growing trend of decorative garage floors in Celina and North Dallas. From metallic epoxy to flake systems, discover how Legacy Industrial Coatings transforms ordinary garages into stunning spaces.",
      content: `
        <h2>The Aesthetic Revolution in North Texas Garages</h2>
        <p>Gone are the days when garages were purely functional spaces. Homeowners in Celina, Little Elm, and throughout North Dallas are transforming their garages into extensions of their homes with decorative concrete coatings that rival any interior design magazine.</p>
        
        <h3>Celina's Growing Home Design Trend</h3>
        <p>As Celina continues to grow with new construction and custom homes, homeowners are increasingly viewing their garages as valuable living space. The three-car garages common in Celina neighborhoods provide the perfect canvas for decorative flooring that matches the home's sophisticated design aesthetic.</p>
        
        <h3>Popular Decorative Options in North Texas</h3>
        
        <h4>Metallic Epoxy Systems</h4>
        <p>These stunning floors create a unique, three-dimensional appearance with swirling metallic patterns. Popular in upscale Celina and Prosper neighborhoods, these floors reflect light beautifully and create a truly one-of-a-kind surface.</p>
        
        <h4>Decorative Flake Systems</h4>
        <p>Our signature flake floors combine durability with style. Choose from dozens of color combinations to complement your home's exterior or create a bold statement. These systems are particularly popular in Frisco and Plano for their perfect balance of beauty and practicality.</p>
        
        <h4>Solid Color Coatings</h4>
        <p>Sometimes elegance lies in simplicity. Our solid color systems provide a clean, sophisticated look that enhances the architectural beauty of Celina's modern homes.</p>
        
        <h3>Functional Beauty for North Texas Living</h3>
        <p>Decorative doesn't mean sacrificing function. These beautiful floors still provide all the durability and chemical resistance needed for garage use, while elevating the space aesthetically.</p>
        
        <h3>Integration with Home Design</h3>
        <p>Working with interior designers and builders across the DFW area, we help coordinate garage floor colors and patterns with overall home design themes. This attention to detail has made us the preferred choice for custom homes in Celina and surrounding communities.</p>
        
        <h3>The Entertainment Space Revolution</h3>
        <p>Many Celina homeowners are converting portions of their garages into entertainment spaces, workshops, or home gyms. Decorative coatings provide the perfect foundation for these multi-use spaces, offering comfort and style for extended use.</p>
        
        <h3>Return on Investment</h3>
        <p>Beyond personal enjoyment, decorative garage floors add significant value to North Texas homes. Real estate professionals in Celina and Prosper report that these features are increasingly sought after by homebuyers.</p>
        
        <h3>Professional Installation Makes the Difference</h3>
        <p>The key to stunning decorative floors lies in proper installation. Legacy Industrial Coatings' experienced team ensures perfect surface preparation and application, delivering results that exceed expectations for Celina homeowners.</p>
      `,
      author: "Legacy Industrial Coatings Team",
      date: "December 28, 2023",
      readTime: "9 min read",
      category: "Design",
      tags: ["Decorative Floors", "Celina", "Home Design", "Custom Homes"],
      location: "Celina, Texas"
    }
  ];

  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

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
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Expert Insights on <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Flooring Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Professional tips, industry insights, and expert advice on garage floor coatings and commercial flooring solutions from the Legacy Industrial Coatings team.
            </p>
          </div>
        </section>

        {selectedPost ? (
          /* Article View */
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedPost(null)}
                  className="mb-8 text-primary hover:text-primary/80"
                >
                  ← Back to Blog
                </Button>
                
                <article className="prose prose-lg max-w-none">
                  <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="secondary">{selectedPost.category}</Badge>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{selectedPost.location}</span>
                      </div>
                    </div>
                    
                    <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
                      {selectedPost.title}
                    </h1>
                    
                    <div className="flex items-center gap-6 text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{selectedPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{selectedPost.readTime}</span>
                      </div>
                    </div>
                    
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      {selectedPost.excerpt}
                    </p>
                  </div>
                  
                  <div 
                    className="prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }} 
                  />
                  
                  <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Ready to Get Started?</h3>
                    <p className="text-muted-foreground mb-4">
                      Contact Legacy Industrial Coatings for expert flooring solutions in {selectedPost.location} and surrounding areas.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        onClick={() => navigate('/contact')}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Get A Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={() => setShowBookingModal(true)}
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Book An Estimate
                      </Button>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>
        ) : (
          /* Blog Listing */
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="cursor-pointer hover:shadow-lg transition-shadow border border-border hover:border-primary/30">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">{post.category}</Badge>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span className="text-xs">{post.location}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl leading-tight hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-between text-primary hover:text-primary/80 hover:bg-primary/10"
                        onClick={() => setSelectedPost(post)}
                      >
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
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
                className="bg-background text-primary hover:bg-background/90 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get A Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => setShowBookingModal(true)}
                variant="outline"
                className="border-2 border-background bg-transparent text-primary-foreground hover:bg-background hover:text-primary px-8 py-3 rounded-full transition-all duration-300"
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