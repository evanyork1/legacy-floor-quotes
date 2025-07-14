import { Helmet } from "react-helmet-async";
import { LandingMinimalHeader } from "@/components/landing/LandingMinimalHeader";
import { LandingMinimalFooter } from "@/components/landing/LandingMinimalFooter";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TrustedBrandSection from "@/components/sections/TrustedBrandSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import GalleryPreview from "@/components/sections/GalleryPreview";

import CTASection from "@/components/sections/CTASection";

const DFWResLanding = () => {
  return (
    <>
      <Helmet>
        <title>Premium Concrete Coatings Dallas, TX - Legacy Industrial Coatings</title>
        <meta name="description" content="Premium concrete coatings and epoxy flooring in Dallas-Fort Worth, TX. Professional garage floor coating with lifetime warranty. Get your dream floor installed in one day." />
        <meta name="author" content="Legacy Industrial Coatings" />
        <meta name="keywords" content="concrete coatings Dallas, epoxy flooring Dallas, garage floor coating DFW, polyurea coating Dallas, floor installation Dallas, garage renovation DFW" />
        
        {/* Geo-location meta tags for Dallas, TX */}
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Dallas" />
        <meta name="geo.position" content="32.7767;-96.7970" />
        <meta name="ICBM" content="32.7767, -96.7970" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Premium Concrete Coatings Dallas, TX - Legacy Industrial Coatings" />
        <meta property="og:description" content="Premium concrete coatings and epoxy flooring in Dallas-Fort Worth, TX. Professional garage floor coating with lifetime warranty. Get your dream floor installed in one day." />
        <meta property="og:image" content="/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png" />
        <meta property="og:url" content="https://legacyindustrialcoatings.com" />
        <meta property="og:site_name" content="Legacy Industrial Coatings" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Premium Concrete Coatings Dallas, TX - Legacy Industrial Coatings" />
        <meta name="twitter:description" content="Premium concrete coatings and epoxy flooring in Dallas-Fort Worth, TX. Professional garage floor coating with lifetime warranty. Get your dream floor installed in one day." />
        <meta name="twitter:image" content="/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png" />

        {/* Additional SEO and mobile optimization */}
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <LandingMinimalHeader />
        <HeroSection />
        <TrustedBrandSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <GalleryPreview />
        <CTASection />
        <div id="footer">
          <LandingMinimalFooter />
        </div>
      </div>
    </>
  );
};

export default DFWResLanding;