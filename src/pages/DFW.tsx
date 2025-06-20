
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TrustedBrandSection from "@/components/sections/TrustedBrandSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DFWCommercialSection from "@/components/sections/DFWCommercialSection";

const DFW = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <TrustedBrandSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <DFWCommercialSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default DFW;
