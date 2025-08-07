import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/sections/CTASection";

const services = [
  {
    key: "painting",
    title: "Garage Painting",
    description:
      "Complete wall and ceiling painting to brighten and protect your garage. We prep, patch, and use premium coatings for a durable, clean finish that elevates your space.",
    image: "/lovable-uploads/7b59a18f-94c1-45aa-88f1-9bc7c3277305.png",
    alt: "Garage painting service with fresh, bright walls",
  },
  {
    key: "cabinetry",
    title: "Custom Cabinetry",
    description:
      "Built-for-you storage systems that fit your garage and your lifestyle. From tall lockers to workbenches and drawers, we create a place for everything.",
    image: "/lovable-uploads/31a07739-2d1a-4e04-afcf-284435670519.png",
    alt: "Custom garage cabinetry with organized storage",
  },
  {
    key: "slat",
    title: "Slat Walls & Hanging Racks",
    description:
      "Maximize vertical space with durable slat walls and overhead racks. Keep tools, bikes, and seasonal items tidy, accessible, and off the floor.",
    image: "/lovable-uploads/c7682b64-17bd-49b5-ac6c-96416093f159.png",
    alt: "Garage slat wall system with hanging racks",
  },
  {
    key: "pest",
    title: "Pest Control",
    description:
      "A proactive treatment that helps protect your floor and home for years. Seal entry points and deter pests to preserve your investment.",
    image: "/lovable-uploads/4118a438-beef-487b-949a-0e4db42b6da7.png",
    alt: "Pest control service for garages",
  },
  {
    key: "pressure",
    title: "Pressure Washing",
    description:
      "Deep cleaning for driveways, patios, and walkways. Remove grime, mildew, and stains to refresh your exterior surfaces before or after your floor install.",
    image: "/lovable-uploads/30880d71-5ddb-4653-8b75-4f05283e8728.png",
    alt: "Pressure washing concrete surfaces",
  },
];

const AdditionalServices = () => {
  return (
    <>
      <Helmet>
        <title>Garage Makeover & Additional Services | Legacy</title>
        <meta
          name="description"
          content="Explore garage painting, custom cabinetry, slat walls, pest control, and pressure washing. Complete garage makeovers by Legacy Industrial Coatings."
        />
        <link rel="canonical" href="/additional-services" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Legacy Additional Services",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Service",
                name: s.title,
                description: s.description,
              },
            })),
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />

        <main className="pt-20">
          <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-slate-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Complete Garage Makeovers & <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Additional Services</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
                Many of our customers choose a complete garage makeover—pairing their new floor with painting, storage, and organization. Explore our most popular add-ons below.
              </p>
            </div>
          </section>

          <section className="py-10 sm:py-16 bg-white">
            <div className="container mx-auto px-6 max-w-6xl space-y-12 sm:space-y-16">
              {services.map((s, idx) => (
                <article
                  key={s.key}
                  className={`grid items-center gap-6 sm:gap-10 md:grid-cols-2 ${idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
                >
                  <div className="w-full">
                    <div className="overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={s.image}
                        alt={s.alt}
                        loading="lazy"
                        className="w-full h-72 sm:h-80 md:h-96 object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                      <div className="h-1 w-12 bg-blue-600 rounded-full mb-4" />
                      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
                        {s.title}
                      </h2>
                      <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

<CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AdditionalServices;
