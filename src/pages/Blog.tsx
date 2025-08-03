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
        <h2>Why Dallas Homeowners Are Choosing Polyurea Over Epoxy</h2>
        <p>In the Dallas-Fort Worth metroplex, where summer temperatures soar and weather can be unpredictable, choosing the right garage floor coating is crucial. Homeowners in Plano, Frisco, Prosper, and Celina are increasingly turning to polyurea coatings over traditional epoxy for several compelling reasons.</p>
        
        <h3>Superior Heat Resistance</h3>
        <p>Texas heat is no joke, and garage floors bear the brunt of it. Traditional epoxy coatings can soften and become tacky under extreme heat, especially when hot tires from vehicles parked outside meet the garage floor. Polyurea coatings maintain their integrity even in temperatures exceeding 180°F, making them perfect for Dallas summers.</p>
        
        <h3>Fast Installation for Busy DFW Families</h3>
        <p>Time is precious for families in fast-growing communities like Prosper and Celina. While epoxy installations can take 3-5 days with multiple coats and long cure times, our polyurea systems are typically installed in one day and ready for vehicle traffic within 24 hours. This means minimal disruption to your daily routine.</p>
        
        <h3>The Legacy Difference in North Texas</h3>
        <p>At Legacy Industrial Coatings, we've perfected our installation process specifically for North Texas conditions. Our team understands the unique challenges of concrete in this region, from foundation settling to temperature fluctuations. We've successfully transformed garages across Dallas, Plano, Frisco, McKinney, Allen, and surrounding communities.</p>
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
        <h2>Meeting the Demands of North Texas Commercial Spaces</h2>
        <p>Commercial facilities across the Dallas-Fort Worth area face unique flooring challenges. From automotive dealerships in Plano to manufacturing facilities in Frisco, business owners need flooring solutions that can withstand heavy traffic, chemical exposure, and the demanding pace of North Texas commerce.</p>
        
        <h3>Automotive Industry Solutions</h3>
        <p>The automotive sector is thriving in communities like Plano and Frisco, with numerous dealerships and repair facilities. These businesses require floors that can handle hydraulic fluid spills, hot tire marks, and heavy vehicle traffic. Our commercial-grade polyurea systems provide the chemical resistance and durability these facilities demand.</p>
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
        <h2>Protecting Your Investment in North Texas</h2>
        <p>Your new garage floor coating represents a significant investment in your Prosper or Celina home. With proper maintenance, these floors can look showroom-perfect for decades.</p>
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
        <h2>The Aesthetic Revolution in North Texas Garages</h2>
        <p>Gone are the days when garages were purely functional spaces. Homeowners in Celina, Little Elm, and throughout North Dallas are transforming their garages into extensions of their homes.</p>
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