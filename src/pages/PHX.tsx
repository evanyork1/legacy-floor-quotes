
import { Helmet } from "react-helmet-async";
import HeaderPHX from "@/components/HeaderPHX";
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

const PHX = () => {
  return (
    <>
      <Helmet>
        <title>Phoenix Epoxy Flooring Experts | Scottsdale, Mesa, Tempe | Legacy Industrial Coatings</title>
        <meta name="description" content="Premier epoxy flooring contractors serving Phoenix, Scottsdale, Mesa, Tempe, Gilbert, Chandler & greater Phoenix metro. Professional garage floor coatings with lifetime warranty. Licensed & insured." />
        <meta name="author" content="Legacy Industrial Coatings" />
        <meta name="keywords" content="Phoenix epoxy flooring, Scottsdale garage floor coating, Mesa concrete coatings, Tempe polyurea flooring, Gilbert epoxy contractors, Chandler garage floors, Glendale floor coating, Peoria garage flooring, Surprise epoxy installation, Avondale concrete coating, Phoenix metro garage renovation, Arizona floor contractors, Phoenix epoxy flooring" />
        
        {/* Geo-location meta tags for Phoenix metroplex */}
        <meta name="geo.region" content="US-AZ" />
        <meta name="geo.placename" content="Phoenix Metropolitan Area" />
        <meta name="geo.position" content="33.4484;-112.0740" />
        <meta name="ICBM" content="33.4484, -112.0740" />
        <meta name="DC.coverage" content="Phoenix, Scottsdale, Mesa, Tempe, Gilbert, Chandler, Glendale, Peoria, Surprise, Avondale" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Phoenix Epoxy Flooring Experts | Scottsdale, Mesa, Tempe | Legacy Industrial Coatings" />
        <meta property="og:description" content="Premier epoxy flooring contractors serving Phoenix, Scottsdale, Mesa, Tempe, Gilbert, Chandler & greater Phoenix metro. Professional garage floor coatings with lifetime warranty. Licensed & insured." />
        <meta property="og:image" content="/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png" />
        <meta property="og:url" content="https://legacyindustrialcoatings.com/phx" />
        <meta property="og:site_name" content="Legacy Industrial Coatings" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Phoenix Epoxy Flooring Experts | Scottsdale, Mesa, Tempe | Legacy Industrial Coatings" />
        <meta name="twitter:description" content="Premier epoxy flooring contractors serving Phoenix, Scottsdale, Mesa, Tempe, Gilbert, Chandler & greater Phoenix metro. Professional garage floor coatings with lifetime warranty. Licensed & insured." />
        <meta name="twitter:image" content="/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png" />

        {/* Additional SEO and mobile optimization */}
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/phx" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <HeaderPHX />
        <HeroSection />
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

export default PHX;
