import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TrustedBrandSection from "@/components/sections/TrustedBrandSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import GalleryPreview from "@/components/sections/GalleryPreview";
import CommercialLinkSection from "@/components/sections/CommercialLinkSection";
import CTASection from "@/components/sections/CTASection";
import { CustomQuoteSection } from "@/components/sections/CustomQuoteSection";
import HomepageFAQ from "@/components/sections/HomepageFAQ";
import { QuickFeaturesSection } from "@/components/sections/QuickFeaturesSection";
import { FloatingEstimateCTA } from "@/components/ui/floating-estimate-cta";
import { AboutUsSection } from "@/components/sections/AboutUsSection";
import { ServiceAreasStrip } from "@/components/seo/ServiceAreasStrip";
import { StructuredData } from "@/components/seo/StructuredData";

const homepageFaqs = [
  {
    question: "What flooring services do you offer in Dallas-Fort Worth?",
    answer: "We install premium polyurea garage floor coatings, high-traffic epoxy systems, mechanical polished concrete, industrial floor coatings, and specialty waterproofing across the entire DFW metroplex."
  },
  {
    question: "How long does an epoxy garage floor coating take?",
    answer: "Most residential garage floor coatings are completed in one day and ready for vehicles in 24–48 hours."
  },
  {
    question: "Do you provide commercial polished concrete in DFW?",
    answer: "Yes. Our crews deliver mechanical concrete polishing for warehouses, retail stores, restaurants, and manufacturing facilities throughout Dallas, Fort Worth, Plano, Frisco, and the surrounding North Texas area."
  },
  {
    question: "Are your installations warrantied?",
    answer: "Residential polyurea garage floor coatings carry a limited lifetime warranty. Commercial and industrial epoxy projects are backed by manufacturer-specific warranties matched to each system."
  },
  {
    question: "Which DFW cities do you serve?",
    answer: "Dallas, Fort Worth, Plano, Frisco, McKinney, Allen, Richardson, Carrollton, Lewisville, Prosper, Celina, Sherman, Anna, Melissa, Sanger, The Colony, Flower Mound, and the broader North Texas region."
  }
];

const DFW = () => {
  return (
    <>
      <Helmet>
        <title>Legacy Industrial Coatings | Epoxy & Polished Concrete DFW</title>
        <meta name="description" content="Premium epoxy flooring, polyurea garage coatings & mechanical polished concrete across Dallas-Fort Worth. Lifetime warranty. Licensed & insured. 190+ reviews." />
        <meta name="author" content="Legacy Industrial Coatings" />
        <meta name="keywords" content="epoxy flooring Dallas, polished concrete Fort Worth, garage floor coating DFW, garage floor epoxy, epoxy garage floors, industrial floor coatings, high-traffic epoxy, mechanical concrete polishing, polyurea garage floors, DFW commercial flooring, Plano, Frisco, McKinney, Prosper, Celina" />

        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Dallas-Fort Worth Metroplex" />
        <meta name="geo.position" content="32.7767;-96.7970" />
        <meta name="ICBM" content="32.7767, -96.7970" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Legacy Industrial Coatings | Epoxy & Polished Concrete DFW" />
        <meta property="og:description" content="Premium epoxy flooring, polyurea garage coatings & mechanical polished concrete across Dallas-Fort Worth. Lifetime warranty." />
        <meta property="og:image" content="/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png" />
        <meta property="og:url" content="https://legacyindustrialcoatings.com" />
        <meta property="og:site_name" content="Legacy Industrial Coatings" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Legacy Industrial Coatings | Epoxy & Polished Concrete DFW" />
        <meta name="twitter:description" content="Premium epoxy flooring, polyurea garage coatings & mechanical polished concrete across Dallas-Fort Worth." />
        <meta name="twitter:image" content="/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png" />

        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com" />
      </Helmet>

      <StructuredData
        services={[
          { name: "Epoxy Garage Floor Coatings", description: "Premium polyurea flake garage floor coatings installed in one day with a lifetime warranty across Dallas-Fort Worth.", url: "/garagefloors" },
          { name: "Mechanical Polished Concrete", description: "Diamond-ground, densified, and burnished polished concrete floors for DFW commercial, retail, and warehouse facilities.", url: "/concrete-polishing" },
          { name: "Industrial Epoxy Flooring", description: "High-traffic epoxy and industrial floor coatings for warehouses, manufacturing, and aviation hangars.", url: "/industrial-epoxy" },
          { name: "Commercial Floor Coatings", description: "Turn-key DFW commercial flooring solutions including chemical-resistant and FDA-compliant systems.", url: "/commercialfloors" },
        ]}
        faqs={homepageFaqs}
      />

      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <HeroSection />
          <QuickFeaturesSection />
          <FeaturesSection />
          <AboutUsSection />
          <TestimonialsSection />
          <CommercialLinkSection />
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <TrustedBrandSection />
          </div>
          <GalleryPreview />
          <CustomQuoteSection />

          {/* Always-visible FAQ for AEO */}
          <section className="py-16 bg-white" aria-labelledby="dfw-faq-heading">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-10">
                <h2 id="dfw-faq-heading" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  Dallas-Fort Worth Flooring FAQ
                </h2>
                <p className="text-lg text-gray-600">
                  Quick answers about epoxy flooring and polished concrete services in DFW.
                </p>
              </div>
              <div className="space-y-8">
                {homepageFaqs.map((faq, i) => (
                  <article key={i} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <CTASection />
          <ServiceAreasStrip />
        </main>

        <div id="footer">
          <Footer />
        </div>
        <FloatingEstimateCTA />
      </div>
    </>
  );
};

export default DFW;
