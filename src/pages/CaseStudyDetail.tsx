import { Helmet } from "react-helmet-async";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Phone, MapPin, Wrench, Ruler, Clock, CheckCircle2 } from "lucide-react";
import { BookingModal } from "@/components/landing/BookingModal";
import { getCaseStudyBySlug } from "@/data/caseStudies";

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const cs = slug ? getCaseStudyBySlug(slug) : undefined;
  if (!cs) return <Navigate to="/case-studies" replace />;

  const canonical = `https://legacyindustrialcoatings.com/case-studies/${cs.slug}`;
  const heroImageAbs = `https://legacyindustrialcoatings.com${cs.heroImage}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.metaDescription,
    image: heroImageAbs,
    author: { "@type": "Organization", name: "Legacy Industrial Coatings" },
    publisher: {
      "@type": "Organization",
      name: "Legacy Industrial Coatings",
      logo: {
        "@type": "ImageObject",
        url: "https://legacyindustrialcoatings.com/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png",
      },
    },
    mainEntityOfPage: canonical,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://legacyindustrialcoatings.com/" },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://legacyindustrialcoatings.com/case-studies" },
      { "@type": "ListItem", position: 3, name: cs.title, item: canonical },
    ],
  };

  const PhotoGrid = ({
    title,
    description,
    photos,
  }: {
    title: string;
    description: string;
    photos: { src: string; alt: string }[];
  }) => (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 max-w-2xl">{description}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {photos.map((p, i) => (
          <button
            key={i}
            onClick={() => setLightbox(p)}
            className="aspect-square overflow-hidden rounded-md bg-slate-100 group focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{cs.metaTitle}</title>
        <meta name="description" content={cs.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={cs.metaTitle} />
        <meta property="og:description" content={cs.metaDescription} />
        <meta property="og:image" content={heroImageAbs} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HeaderGeneric />

      <main className="pt-24">
        {/* Back link above hero */}
        <div className="container mx-auto px-4 max-w-6xl pt-6 pb-4">
          <button
            onClick={() => navigate(cs.category === "residential" ? "/residential-case-studies" : "/commercial-case-studies")}
            className="inline-flex items-center text-gray-900 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> All Case Studies
          </button>
        </div>

        {/* Hero */}
        <section className="relative">
          <div className="relative h-[55vh] min-h-[420px] w-full overflow-hidden">
            <img src={cs.heroImage} alt={cs.heroAlt} className="w-full h-full object-cover" / loading="lazy" decoding="async" >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            <div className="absolute inset-0 flex items-end">
              <div className="container mx-auto px-4 max-w-6xl pb-12">
                <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-md mb-4 uppercase tracking-wide">
                  {cs.tag}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight">
                  {cs.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Project Facts */}
        <section className="py-10 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-700 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Location</p>
                  <p className="text-sm text-gray-900 font-medium">{cs.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Wrench className="h-5 w-5 text-blue-700 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Service</p>
                  <p className="text-sm text-gray-900 font-medium">{cs.serviceType}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Ruler className="h-5 w-5 text-blue-700 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Scope</p>
                  <p className="text-sm text-gray-900 font-medium">{cs.squareFootage}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-700 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Timeline</p>
                  <p className="text-sm text-gray-900 font-medium">{cs.timeline}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story: Challenge / Solution / Result */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">The Challenge</h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4 leading-relaxed">
                  {cs.challenge.map((p, i) => (<p key={i}>{p}</p>))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Our Approach</h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4 leading-relaxed">
                  {cs.solution.map((p, i) => (<p key={i}>{p}</p>))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">The Result</h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4 leading-relaxed">
                  {cs.result.map((p, i) => (<p key={i}>{p}</p>))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Before */}
        <section className="py-16 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4 max-w-6xl">
            <PhotoGrid
              title="Before"
              description="What the slab looked like when we walked in — eight years of wear with no protective sealant left."
              photos={cs.beforePhotos}
            />
          </div>
        </section>

        {/* During */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <PhotoGrid
              title="During the Restoration"
              description="Overnight deep cleaning and surface preparation before the new sealer went down."
              photos={cs.duringPhotos}
            />
          </div>
        </section>

        {/* After */}
        <section className="py-16 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4 max-w-6xl">
            <PhotoGrid
              title="After"
              description="Sealed, slip-rated, and back in service the next morning — placed on a planned 3-year reseal program."
              photos={cs.afterPhotos}
            />
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Key Takeaways</h2>
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-6 md:p-8">
                <ul className="space-y-4">
                  {[
                    "Concrete sealant wears down over time — restaurants should plan a 2–5 year reseal cycle, not a one-time install.",
                    "Once a sealer fails, daily spills and grit go straight into the slab, creating staining that eventually requires grinding instead of resealing.",
                    "A worn floor is a brand problem — customers read dull, stained concrete as an unsanitary, unprofessional restaurant.",
                    "Most commercial sealing jobs can be completed overnight, with the floor back in service by the next morning.",
                    "Quarterly professional deep cleaning between reseals can roughly double the useful life of a sealer.",
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-700 mt-0.5 shrink-0" />
                      <span className="text-gray-700 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Is your restaurant's sealant overdue?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              If your floor looks dull, dirty, or you can't remember the last time it was resealed — it's already
              past due. We'll take a look and give you a clear plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setShowBookingModal(true)}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Calendar className="mr-2 h-5 w-5" /> Book An Estimate
              </Button>
              <a href="tel:2143056516">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white border-white text-slate-900 hover:bg-slate-100 hover:text-slate-900"
                >
                  <Phone className="mr-2 h-5 w-5" /> 214-305-6516
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-full max-h-full object-contain rounded-md"
          / loading="lazy" decoding="async" >
        </div>
      )}
    </div>
  );
};

export default CaseStudyDetail;
