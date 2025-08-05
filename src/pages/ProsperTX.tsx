import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TrustedBrandSection from "@/components/sections/TrustedBrandSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import GalleryPreview from "@/components/sections/GalleryPreview";
import CommercialLinkSection from "@/components/sections/CommercialLinkSection";
import CTASection from "@/components/sections/CTASection";
import { CustomQuoteSection } from "@/components/sections/CustomQuoteSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import EpoxyVsPolyureaSection from "@/components/sections/EpoxyVsPolyureaSection";
import HomepageFAQ from "@/components/sections/HomepageFAQ";
import { QuickFeaturesSection } from "@/components/sections/QuickFeaturesSection";
import { FloatingEstimateCTA } from "@/components/ui/floating-estimate-cta";

const ProsperLocationIntro = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-600 leading-relaxed">
            We proudly serve homeowners across Prosper's top communities including{" "}
            <span className="font-semibold text-blue-600">Windsong Ranch</span>,{" "}
            <span className="font-semibold text-blue-600">Light Farms</span>,{" "}
            <span className="font-semibold text-blue-600">Star Trail</span>,{" "}
            <span className="font-semibold text-blue-600">Lilyana</span>,{" "}
            <span className="font-semibold text-blue-600">Dominion at Brookhollow</span>, and{" "}
            <span className="font-semibold text-blue-600">Lakes at Legacy</span>. 
            Whether you're upgrading your builder-grade concrete or starting fresh with a new build, we've got you covered.
          </p>
        </div>
      </div>
    </section>
  );
};

const ProsperTX = () => {
  return (
    <>
      <Helmet>
        <title>Epoxy Garage Floor Coatings in Prosper, TX | Legacy Industrial Coatings</title>
        <meta name="description" content="Serving Prosper homeowners with beautiful garage floor coatings. Same-day estimates, industrial-grade durability, and a lifetime warranty." />
        <meta name="author" content="Legacy Industrial Coatings" />
        <meta name="keywords" content="epoxy flooring Prosper TX, garage floor coating Prosper, concrete coatings Prosper, polyurea coating Prosper, floor installation Prosper, garage renovation Prosper" />
        
        {/* Geo-location meta tags for Prosper, TX */}
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Prosper" />
        <meta name="geo.position" content="33.2362;-96.8011" />
        <meta name="ICBM" content="33.2362, -96.8011" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Epoxy Garage Floor Coatings in Prosper, TX | Legacy Industrial Coatings" />
        <meta property="og:description" content="Serving Prosper homeowners with beautiful garage floor coatings. Same-day estimates, industrial-grade durability, and a lifetime warranty." />
        <meta property="og:image" content="/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png" />
        <meta property="og:url" content="https://legacyindustrialcoatings.com/epoxy-flooring-prosper" />
        <meta property="og:site_name" content="Legacy Industrial Coatings" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Epoxy Garage Floor Coatings in Prosper, TX | Legacy Industrial Coatings" />
        <meta name="twitter:description" content="Serving Prosper homeowners with beautiful garage floor coatings. Same-day estimates, industrial-grade durability, and a lifetime warranty." />
        <meta name="twitter:image" content="/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png" />

        {/* Additional SEO and mobile optimization */}
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/epoxy-flooring-prosper" />
        
        {/* LocalBusiness Schema */}
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Legacy Industrial Coatings",
            "address": {
              "addressLocality": "Prosper",
              "addressRegion": "TX"
            },
            "areaServed": ["Prosper, TX", "Collin County, TX"],
            "description": "Professional epoxy garage floor coatings serving Prosper, TX homeowners",
            "telephone": "214-305-6516",
            "url": "https://legacyindustrialcoatings.com/epoxy-flooring-prosper"
          }`}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <Header />
        <HeroSection />
        <ProsperLocationIntro />
        <QuickFeaturesSection />
        <WhyChooseSection />
        <EpoxyVsPolyureaSection />
        <ProcessSection />
        <TestimonialsSection />
        <FeaturesSection />
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <TrustedBrandSection />
        </div>
        <GalleryPreview />
        <CustomQuoteSection />
        <CommercialLinkSection />
        <CTASection />
        <HomepageFAQ />
        <div id="footer">
          <Footer />
        </div>
        <FloatingEstimateCTA />
      </div>
    </>
  );
};

export default ProsperTX;