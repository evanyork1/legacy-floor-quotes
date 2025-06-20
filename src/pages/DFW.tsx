
import DFWHeroSection from "@/components/sections/DFWHeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import DFWHowItWorksSection from "@/components/sections/DFWHowItWorksSection";
import DFWTrustedBrandSection from "@/components/sections/DFWTrustedBrandSection";
import DFWTestimonialsSection from "@/components/sections/DFWTestimonialsSection";
import DFWCommercialSection from "@/components/sections/DFWCommercialSection";
import CTASection from "@/components/sections/CTASection";
import Header from "@/components/Header";
import DFWFooter from "@/components/DFWFooter";

const DFW = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <DFWHeroSection />
      <DFWTrustedBrandSection />
      <FeaturesSection />
      <DFWHowItWorksSection />
      <DFWTestimonialsSection />
      <DFWCommercialSection />
      <CTASection />
      <DFWFooter />
    </div>
  );
};

export default DFW;
