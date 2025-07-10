import { Helmet } from "react-helmet-async";
import { LandingCommercialHeader } from "@/components/landing/LandingCommercialHeader";
import { LandingMinimalFooter } from "@/components/landing/LandingMinimalFooter";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TrustedBrandSection from "@/components/sections/TrustedBrandSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import GalleryPreview from "@/components/sections/GalleryPreview";
import CommercialSection from "@/components/sections/CommercialSection";

const DFWCommercialLanding = () => {
  return (
    <>
      <Helmet>
        <title>Commercial Concrete Polishing & Industrial Epoxy Flooring Dallas, TX - Legacy Industrial Coatings</title>
        <meta name="description" content="Professional commercial concrete polishing and industrial epoxy flooring in Dallas-Fort Worth, TX. Serving warehouses, hangars, restaurants, and manufacturing facilities with durable flooring solutions." />
        <meta name="author" content="Legacy Industrial Coatings" />
        <meta name="keywords" content="commercial concrete polishing Dallas, industrial epoxy flooring DFW, warehouse flooring Dallas, hangar flooring DFW, restaurant flooring Dallas, manufacturing floor coating Dallas" />
        
        {/* Geo-location meta tags for Dallas, TX */}
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Dallas" />
        <meta name="geo.position" content="32.7767;-96.7970" />
        <meta name="ICBM" content="32.7767, -96.7970" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Commercial Concrete Polishing & Industrial Epoxy Flooring Dallas, TX - Legacy Industrial Coatings" />
        <meta property="og:description" content="Professional commercial concrete polishing and industrial epoxy flooring in Dallas-Fort Worth, TX. Serving warehouses, hangars, restaurants, and manufacturing facilities with durable flooring solutions." />
        <meta property="og:image" content="/lovable-uploads/7a412198-403e-4444-bc3d-56e2e28ac9fd.png" />
        <meta property="og:url" content="https://legacyindustrialcoatings.com/dfwcommercial" />
        <meta property="og:site_name" content="Legacy Industrial Coatings" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Commercial Concrete Polishing & Industrial Epoxy Flooring Dallas, TX - Legacy Industrial Coatings" />
        <meta name="twitter:description" content="Professional commercial concrete polishing and industrial epoxy flooring in Dallas-Fort Worth, TX. Serving warehouses, hangars, restaurants, and manufacturing facilities with durable flooring solutions." />
        <meta name="twitter:image" content="/lovable-uploads/7a412198-403e-4444-bc3d-56e2e28ac9fd.png" />

        {/* Additional SEO and mobile optimization */}
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/dfwcommercial" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <LandingCommercialHeader />
        <HeroSection />
        <FeaturesSection />
        <TrustedBrandSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <GalleryPreview />
        <CommercialSection />
        <div id="footer">
          <LandingMinimalFooter />
        </div>
      </div>
    </>
  );
};

export default DFWCommercialLanding;