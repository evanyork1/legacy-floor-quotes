import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Phone, Calendar, User, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();

  // Sample blog posts - in a real app, these would come from a CMS or database
  const blogPosts = [
    {
      id: 1,
      title: "5 Signs Your Garage Floor Needs a Professional Coating",
      excerpt: "Discover the warning signs that indicate it's time to upgrade your garage floor with a professional polyurea coating system.",
      author: "Legacy Industrial Team",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Maintenance",
      image: "/lovable-uploads/8865d0d1-af13-4849-b194-a2611de34a0b.png",
      featured: true
    },
    {
      id: 2,
      title: "Polyurea vs Epoxy: Which Garage Floor Coating is Right for You?",
      excerpt: "A comprehensive comparison of polyurea and epoxy coatings to help you make the best choice for your garage floor.",
      author: "Legacy Industrial Team",
      date: "2024-01-10",
      readTime: "7 min read",
      category: "Education",
      image: "/lovable-uploads/e6d46c38-cab4-4c0e-b5f7-a13f414dc01b.png",
      featured: false
    },
    {
      id: 3,
      title: "How to Prepare Your Garage for Floor Coating Installation",
      excerpt: "Essential steps homeowners can take to ensure a smooth and successful garage floor coating installation process.",
      author: "Legacy Industrial Team",
      date: "2024-01-05",
      readTime: "4 min read",
      category: "Installation",
      image: "/lovable-uploads/8d8cf4a3-4ed7-4f9b-8909-0cf80a149ecc.png",
      featured: false
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <>
      <Helmet>
        <title>Blog - Garage Floor Coating Tips & Insights | Legacy Industrial Coatings</title>
        <meta name="description" content="Expert insights, tips, and guides about garage floor coatings, polyurea systems, maintenance, and more from Legacy Industrial Coatings." />
        <meta name="keywords" content="garage floor blog, polyurea coating tips, floor coating maintenance, garage renovation guides" />
        
        <meta property="og:title" content="Blog - Garage Floor Coating Tips & Insights | Legacy Industrial Coatings" />
        <meta property="og:description" content="Expert insights, tips, and guides about garage floor coatings, polyurea systems, maintenance, and more." />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/blog" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <Header />
        
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get A Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('tel:+14698704668', '_self')}
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full transition-all duration-300"
              >
                <Phone className="mr-2 h-5 w-5" />
                Book An Estimate
              </Button>
            </div>
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
                          <User className="h-4 w-4" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(featuredPost.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                      <Badge variant="outline" className="w-fit mb-4">{featuredPost.category}</Badge>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        {featuredPost.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 w-fit">
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
                          <User className="h-3 w-3" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white w-full">
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

        {/* Newsletter Signup Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Stay Updated
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Subscribe to our newsletter for the latest tips, guides, and industry insights delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-3 rounded-full">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Transform Your Garage?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Put our expertise to work for you. Get a free quote and discover why Legacy Industrial Coatings is the trusted choice for garage floor transformations.
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
                variant="outline"
                onClick={() => window.open('tel:+14698704668', '_self')}
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full transition-all duration-300"
              >
                <Phone className="mr-2 h-5 w-5" />
                Book An Estimate
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Blog;