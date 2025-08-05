import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import { LandingGallery } from "@/components/landing/LandingGallery";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import CTASection from "@/components/sections/CTASection";
import HomepageFAQ from "@/components/sections/HomepageFAQ";
import { LandingMinimalFooter } from "@/components/landing/LandingMinimalFooter";
import { LandingMinimalHeader } from "@/components/landing/LandingMinimalHeader";
import ScrollToTop from "@/components/ScrollToTop";

const FriscoTX = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Legacy Industrial Coatings",
    "address": {
      "addressLocality": "Frisco",
      "addressRegion": "TX"
    },
    "areaServed": ["Frisco, TX", "Collin County, TX"]
  };

  return (
    <>
      <Helmet>
        <title>Epoxy Garage Floor Coatings in Frisco, TX | Legacy Industrial Coatings</title>
        <meta 
          name="description" 
          content="Frisco homeowners trust Legacy for long-lasting, beautiful garage floor coatings. Get a same-day estimate, transparent pricing, and a lifetime warranty." 
        />
        <meta name="keywords" content="epoxy garage floor, concrete coatings, Frisco TX, garage floor coating, polyurea flooring" />
        <meta name="geo.region" content="TX" />
        <meta name="geo.placename" content="Frisco" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/epoxy-flooring-frisco" />
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
      
      <LandingMinimalHeader />
      <main>
        <HeroSection />
        
        {/* Location-specific intro paragraph */}
        <section className="py-8 bg-gradient-to-br from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-gray-700 leading-relaxed">
                We're proud to serve homeowners across Frisco neighborhoods like The Grove, Newman Village, Phillips Creek Ranch, Grayhawk, Starwood, and Panther Creek. From new builds to garage upgrades, our team delivers high-quality flooring with speed and precision.
              </p>
            </div>
          </div>
        </section>

        <FeaturesSection />
        <LandingGallery />
        <TestimonialsSection />
        <ProcessSection />
        <CTASection />
        <HomepageFAQ />
      </main>
      <LandingMinimalFooter />
      <ScrollToTop />
    </>
  );
};

export default FriscoTX;