import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { LandingCommercialHeader } from "@/components/landing/LandingCommercialHeader";
import { LandingMinimalFooter } from "@/components/landing/LandingMinimalFooter";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TrustedBrandSection from "@/components/sections/TrustedBrandSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CommercialSpacesSection from "@/components/sections/CommercialSpacesSection";
import { CommercialContactModal } from "@/components/commercial/CommercialContactModal";
import { CommercialCTAButtons } from "@/components/commercial/CommercialCTAButtons";

const DFWCommercialLanding = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
        
        {/* CTA after Hero */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <CommercialCTAButtons onContactRequestClick={() => setIsContactModalOpen(true)} />
          </div>
        </section>
        
        <FeaturesSection />
        
        {/* CTA after Features */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <CommercialCTAButtons onContactRequestClick={() => setIsContactModalOpen(true)} />
          </div>
        </section>
        
        <TrustedBrandSection />
        
        {/* CTA after Trusted Brand */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <CommercialCTAButtons onContactRequestClick={() => setIsContactModalOpen(true)} />
          </div>
        </section>
        
        <HowItWorksSection />
        
        {/* CTA after How It Works */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <CommercialCTAButtons onContactRequestClick={() => setIsContactModalOpen(true)} />
          </div>
        </section>
        
        <CommercialSpacesSection />
        
        {/* CTA after Commercial Spaces */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <CommercialCTAButtons onContactRequestClick={() => setIsContactModalOpen(true)} />
          </div>
        </section>
        
        <TestimonialsSection />
        
        {/* CTA after Testimonials */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <CommercialCTAButtons onContactRequestClick={() => setIsContactModalOpen(true)} />
          </div>
        </section>
        
        <div id="footer">
          <LandingMinimalFooter />
        </div>
        
        <CommercialContactModal 
          open={isContactModalOpen}
          onOpenChange={setIsContactModalOpen}
        />
      </div>
    </>
  );
};

export default DFWCommercialLanding;