
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TrustedBrandSection from "@/components/sections/TrustedBrandSection";
import DFWTestimonialsSection from "@/components/sections/DFWTestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import Header from "@/components/Header";
import DFWFooter from "@/components/DFWFooter";
import DFWCommercialSection from "@/components/sections/DFWCommercialSection";

const DFW = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection isDFW={true} />
      <TrustedBrandSection isDFW={true} />
      <FeaturesSection />
      <HowItWorksSection isDFW={true} />
      <DFWTestimonialsSection />
      <DFWCommercialSection />
      <CTASection />
      <DFWFooter />
    </div>
  );
};

export default DFW;
