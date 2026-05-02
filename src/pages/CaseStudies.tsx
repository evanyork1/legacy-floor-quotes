import { Helmet } from "react-helmet-async";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookingModal } from "@/components/landing/BookingModal";
import { getCaseStudiesByCategory } from "@/data/caseStudies";

interface CaseStudiesProps {
  category: "commercial" | "residential";
}

const CaseStudies = ({ category }: CaseStudiesProps) => {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const isCommercial = category === "commercial";
  const basePath = isCommercial ? "/commercial-case-studies" : "/residential-case-studies";
  const heading = isCommercial ? "Real Commercial Floor Projects" : "Real Residential Floor Projects";
  const eyebrow = isCommercial ? "Commercial Case Studies" : "Residential Case Studies";
  const title = isCommercial
    ? "Commercial Case Studies | Concrete Floor Projects | Legacy Industrial Coatings"
    : "Residential Case Studies | Garage & Patio Floor Projects | Legacy Industrial Coatings";
  const description = isCommercial
    ? "Real commercial concrete sealing, polishing, and coating case studies from Legacy Industrial Coatings. See before-and-after results from restaurants, breweries, warehouses, and more across DFW."
    : "Real residential garage floor and patio coating case studies from Legacy Industrial Coatings. See before-and-after results from homeowners across DFW.";
  const subhead = isCommercial
    ? "A look at the actual restaurants, breweries, kitchens, and warehouses we've protected — with the before, during, and after photos to back it up."
    : "A look at the actual garages, patios, and homes we've coated — with the before, during, and after photos to back it up.";
  const canonical = `https://legacyindustrialcoatings.com${basePath}`;

  const studies = getCaseStudiesByCategory(category);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://legacyindustrialcoatings.com/" },
      { "@type": "ListItem", position: 2, name: isCommercial ? "Commercial" : "Residential", item: `https://legacyindustrialcoatings.com/${isCommercial ? "commercial" : "residential"}` },
      { "@type": "ListItem", position: 3, name: "Case Studies", item: canonical },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <HeaderGeneric />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              {eyebrow}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              {heading}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">{subhead}</p>
          </div>
        </section>

        {/* Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            {studies.length === 0 ? (
              <div className="text-center text-gray-500 py-16">
                <p className="text-lg">New case studies coming soon.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {studies.map((cs) => (
                  <button
                    key={cs.slug}
                    onClick={() => navigate(`${basePath}/${cs.slug}`)}
                    className="text-left group"
                  >
                    <Card className="border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                      <div className="aspect-video overflow-hidden bg-slate-100">
                        <img
                          src={cs.heroImage}
                          alt={cs.heroAlt}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-6">
                        <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-md mb-3">
                          {cs.tag}
                        </span>
                        <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                          {cs.title}
                        </h2>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">{cs.summary}</p>
                        <span className="inline-flex items-center text-sm font-semibold text-blue-700">
                          Read case study <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Have a project like these?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Tell us about your space and we'll put together a clear scope, timeline, and number — no pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setShowBookingModal(true)}
                size="lg"
                className="bg-blue-700 hover:bg-blue-800 text-white"
              >
                <Calendar className="mr-2 h-5 w-5" /> Book An Estimate
              </Button>
              <a href="tel:2143056516">
                <Button size="lg" variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-50">
                  <Phone className="mr-2 h-5 w-5" /> 214-305-6516
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
    </div>
  );
};

export default CaseStudies;
