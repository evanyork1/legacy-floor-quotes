import { useState, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BookingModal } from "@/components/landing/BookingModal";
import { getSortedPosts } from "@/data/blogPosts";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { FeaturedBlogPost } from "@/components/blog/FeaturedBlogPost";

const Blog = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const navigate = useNavigate();

  const { featuredPost, regularPosts } = useMemo(() => {
    const sorted = getSortedPosts();
    const featured = sorted.find((post) => post.featured) ?? sorted[0];
    const regular = sorted.filter((post) => post.id !== featured?.id);
    return { featuredPost: featured, regularPosts: regular };
  }, []);

  const handleNavigateToContact = useCallback(() => navigate("/contact"), [navigate]);
  const handleShowBookingModal = useCallback(() => setShowBookingModal(true), []);
  const handleCloseBookingModal = useCallback(() => setShowBookingModal(false), []);

  return (
    <>
      <Helmet>
        <title>Garage Floor Coating Blog - Expert Tips & Insights | Legacy Industrial Coatings</title>
        <meta
          name="description"
          content="Expert insights on garage floor coatings, commercial flooring, and maintenance tips from Legacy Industrial Coatings. Serving Dallas, Plano, Frisco, Prosper, and Celina."
        />
        <meta property="og:title" content="Expert Flooring Blog | Legacy Industrial Coatings" />
        <meta
          property="og:description"
          content="Expert insights on garage floor coatings, commercial flooring, and maintenance tips from Legacy Industrial Coatings."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/blog" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <HeaderGeneric />

        {/* Hero */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-slate-100">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Expert{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Insights
              </span>{" "}
              & Tips
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Stay informed with the latest insights, tips, and guides about garage floor coatings,
              polyurea systems, maintenance, and industry best practices from our experts.
            </p>
          </div>
        </section>

        {/* Featured */}
        {featuredPost && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Article</h2>
                </div>
                <FeaturedBlogPost post={featuredPost} />
              </div>
            </div>
          </section>
        )}

        {/* Grid */}
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
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get expert flooring solutions from Legacy Industrial Coatings. Serving Dallas, Plano,
              Frisco, Prosper, Celina, and surrounding North Texas communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleNavigateToContact}
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get A Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={handleShowBookingModal}
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

      <BookingModal isOpen={showBookingModal} onClose={handleCloseBookingModal} />
    </>
  );
};

export default Blog;
