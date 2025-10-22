
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
import { AboutUsSection } from "@/components/sections/AboutUsSection";

const DFW = () => {
  return (
    <>
      <Helmet>
        <title>DFW Epoxy Flooring Experts | Dallas, Plano, Frisco | Legacy Industrial Coatings</title>
        <meta name="description" content="Premier epoxy flooring contractors serving Dallas, Plano, Frisco, McKinney, Allen & DFW metroplex. Professional garage floor coatings with lifetime warranty. Licensed & insured." />
        <meta name="author" content="Legacy Industrial Coatings" />
        <meta name="keywords" content="DFW epoxy flooring, Dallas garage floor coating, Plano concrete coatings, Frisco polyurea flooring, McKinney epoxy contractors, Allen garage floors, Richardson floor coating, Carrollton garage flooring, Garland epoxy installation, Lewisville concrete coating, The Colony garage renovation, Prosper floor contractors, Celina epoxy flooring" />
        
        {/* Geo-location meta tags for DFW metroplex */}
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Dallas-Fort Worth Metroplex" />
        <meta name="geo.position" content="32.7767;-96.7970" />
        <meta name="ICBM" content="32.7767, -96.7970" />
        <meta name="DC.coverage" content="Dallas, Plano, Frisco, McKinney, Allen, Richardson, Garland, Carrollton, Lewisville, The Colony, Prosper, Celina" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="DFW Epoxy Flooring Experts | Dallas, Plano, Frisco | Legacy Industrial Coatings" />
        <meta property="og:description" content="Premier epoxy flooring contractors serving Dallas, Plano, Frisco, McKinney, Allen & DFW metroplex. Professional garage floor coatings with lifetime warranty. Licensed & insured." />
        <meta property="og:image" content="/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png" />
        <meta property="og:url" content="https://legacyindustrialcoatings.com" />
        <meta property="og:site_name" content="Legacy Industrial Coatings" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DFW Epoxy Flooring Experts | Dallas, Plano, Frisco | Legacy Industrial Coatings" />
        <meta name="twitter:description" content="Premier epoxy flooring contractors serving Dallas, Plano, Frisco, McKinney, Allen & DFW metroplex. Professional garage floor coatings with lifetime warranty. Licensed & insured." />
        <meta name="twitter:image" content="/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png" />

        {/* Additional SEO and mobile optimization */}
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <Header />
        <HeroSection />
        <QuickFeaturesSection />
        <WhyChooseSection />
        <AboutUsSection />
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

export default DFW;
