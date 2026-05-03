import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import { ArrowRight, Building2, Home } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";

const CaseStudiesHub = () => {
  const navigate = useNavigate();

  const commercialHero = caseStudies.find((c) => c.category === "commercial")?.heroImage;
  const residentialHero = caseStudies.find((c) => c.category === "residential")?.heroImage;

  const canonical = "https://legacyindustrialcoatings.com/case-studies";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://legacyindustrialcoatings.com/" },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: canonical },
    ],
  };

  const cards = [
    {
      key: "commercial",
      title: "Commercial Case Studies",
      description:
        "Restaurants, manufacturing plants, kennels, swim schools, and back-of-house spaces — real projects with real before, during, and after photos.",
      image: commercialHero,
      icon: Building2,
      path: "/commercial-case-studies",
    },
    {
      key: "residential",
      title: "Residential Case Studies",
      description:
        "High-end garages, patios, and home flooring projects — including tear-outs of failed cheap installs and full rebuilds done the right way.",
      image: residentialHero,
      icon: Home,
      path: "/residential-case-studies",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Case Studies | Commercial & Residential Floor Projects | Legacy Industrial Coatings</title>
        <meta
          name="description"
          content="Explore real commercial and residential concrete floor case studies from Legacy Industrial Coatings — before, during, and after photos from projects across DFW."
        />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HeaderGeneric />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white">
          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at top, hsl(217 91% 60% / 0.35), transparent 60%), radial-gradient(ellipse at bottom right, hsl(217 91% 40% / 0.25), transparent 60%)",
            }}
          />
          <div className="relative container mx-auto px-4 py-20 md:py-28 max-w-5xl text-center">
            <span className="inline-block bg-blue-500/10 border border-blue-400/30 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full mb-5 uppercase tracking-[0.15em]">
              Case Studies
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
              The Floors. The Story. The Receipts.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Pick the side that fits you — every project is a real job we ran, documented from the failure that brought us in to the floor we left behind.
            </p>
          </div>
        </section>

        {/* Selection Cards */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              {cards.map((card) => {
                const Icon = card.icon;
                return (
                  <button
                    key={card.key}
                    onClick={() => navigate(card.path)}
                    className="group relative text-left rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white"
                  >
                    <div className="relative aspect-[4/3] md:aspect-[5/4] overflow-hidden bg-slate-900">
                      {card.image && (
                        <img
                          src={card.image}
                          alt={card.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />
                      <div className="absolute top-5 left-5">
                        <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                          <Icon className="h-3.5 w-3.5" />
                          {card.key === "commercial" ? "Commercial" : "Residential"}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                        <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                          {card.title}
                        </h2>
                      </div>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="text-gray-600 leading-relaxed mb-5">
                        {card.description}
                      </p>
                      <span className="inline-flex items-center text-base font-semibold text-blue-700 group-hover:text-blue-900 transition-colors">
                        View {card.key} case studies
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudiesHub;
