import { Helmet } from "react-helmet-async";
import { LandingMinimalHeaderHouston } from "@/components/landing/LandingMinimalHeaderHouston";
import { LandingMinimalFooterHouston } from "@/components/landing/LandingMinimalFooterHouston";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TrustedBrandSection from "@/components/sections/TrustedBrandSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { LandingGalleryPreviewHouston } from "@/components/landing/LandingGalleryPreviewHouston";
import CommercialSection from "@/components/sections/CommercialSection";
import CTASection from "@/components/sections/CTASection";

const Houston = () => {
  return (
    <>
      <Helmet>
        <title>Premium Concrete Coatings Houston, TX - Legacy Industrial Coatings</title>
        <meta name="description" content="Premium concrete coatings and epoxy flooring in Houston, TX. Professional garage floor coating with lifetime warranty. Get your dream floor installed in one day." />
        <meta name="author" content="Legacy Industrial Coatings" />
        <meta name="keywords" content="concrete coatings Houston, epoxy flooring Houston, garage floor coating Houston, polyurea coating Houston, floor installation Houston, garage renovation Houston" />
        
        {/* Geo-location meta tags for Houston, TX */}
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Houston" />
        <meta name="geo.position" content="29.7604;-95.3698" />
        <meta name="ICBM" content="29.7604, -95.3698" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Premium Concrete Coatings Houston, TX - Legacy Industrial Coatings" />
        <meta property="og:description" content="Premium concrete coatings and epoxy flooring in Houston, TX. Professional garage floor coating with lifetime warranty. Get your dream floor installed in one day." />
        <meta property="og:image" content="/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png" />
        <meta property="og:url" content="https://legacyindustrialcoatings.com/houston" />
        <meta property="og:site_name" content="Legacy Industrial Coatings" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Premium Concrete Coatings Houston, TX - Legacy Industrial Coatings" />
        <meta name="twitter:description" content="Premium concrete coatings and epoxy flooring in Houston, TX. Professional garage floor coating with lifetime warranty. Get your dream floor installed in one day." />
        <meta name="twitter:image" content="/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png" />

        {/* Additional SEO and mobile optimization */}
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/houston" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <LandingMinimalHeaderHouston />
        <HeroSection />
        <FeaturesSection />
        <TrustedBrandSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <LandingGalleryPreviewHouston />
        <CommercialSection />
        <CTASection />
        <div id="footer">
          <LandingMinimalFooterHouston />
        </div>
      </div>
    </>
  );
};

export default Houston;