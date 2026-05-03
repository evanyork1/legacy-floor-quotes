import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Calendar, MapPin, Phone, ArrowLeft } from "lucide-react";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import { BookingModal } from "@/components/landing/BookingModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchPostBySlug, type BlogPost } from "@/data/blogPosts";
import NotFound from "./NotFound";

const SITE_URL = "https://legacyindustrialcoatings.com";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    let active = true;
    if (!slug) {
      setLoading(false);
      return;
    }
    fetchPostBySlug(slug).then((data) => {
      if (!active) return;
      setPost(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <HeaderGeneric />
        <div className="container mx-auto px-4 py-24 text-center text-gray-500">
          Loading article…
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) return <NotFound />;

  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const rawImage = post.featuredImage || post.image;
  const image = rawImage.startsWith("http") ? rawImage : `${SITE_URL}${rawImage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedDate,
    author: { "@type": "Organization", name: "Legacy Industrial Coatings" },
    publisher: {
      "@type": "Organization",
      name: "Legacy Industrial Coatings",
      url: SITE_URL,
    },
    description: post.excerpt,
    image,
    mainEntityOfPage: canonical,
  };

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Legacy Industrial Coatings`}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={image} />
        <meta property="article:published_time" content={post.publishedDate} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={image} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <HeaderGeneric />

        <article className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="secondary">{post.category}</Badge>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedDate}>{post.date}</time>
                </div>
                {post.location && (
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin className="h-4 w-4" />
                    {post.location}
                  </div>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>

              <p className="text-gray-500 mb-8">By {post.author}</p>

              <img
                src={post.featuredImage || post.image}
                alt={post.title}
                className="w-full h-64 sm:h-96 object-cover rounded-xl shadow-lg mb-10"
                loading="eager"
              />

              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Bottom CTA */}
              <div className="mt-14 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 sm:p-10 text-center shadow-xl">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Ready to transform your floors?
                </h2>
                <p className="text-lg opacity-90 mb-6">
                  Talk to our team and get a clear plan for your space.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => setShowBookingModal(true)}
                    size="lg"
                    className="bg-white text-blue-700 hover:bg-gray-100 rounded-full px-8 py-3"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Book An Estimate
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-blue-700 rounded-full px-8 py-3"
                  >
                    <a href="tel:2143056516">
                      <Phone className="mr-2 h-5 w-5" />
                      Call 214-305-6516
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
};

export default BlogPostPage;
