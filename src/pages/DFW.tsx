
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TrustedBrandSection from "@/components/sections/TrustedBrandSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import GalleryPreview from "@/components/sections/GalleryPreview";
import CommercialSection from "@/components/sections/CommercialSection";
import CTASection from "@/components/sections/CTASection";

const DFW = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TrustedBrandSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <GalleryPreview />
      <CommercialSection />
      <CTASection />
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default DFW;
