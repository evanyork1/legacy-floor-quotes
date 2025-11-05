import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QuickFeaturesSection } from "@/components/sections/QuickFeaturesSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import EpoxyVsPolyureaSection from "@/components/sections/EpoxyVsPolyureaSection";
import ProcessSection from "@/components/sections/ProcessSection";
import { GiveawayForm } from "@/components/landing/GiveawayForm";

const Giveaway = () => {
  return (
    <>
      <Helmet>
        <title>Free Garage Floor Giveaway - Win Premium Coating | Legacy Industrial Coatings</title>
        <meta name="description" content="Enter to win a FREE garage floor coating valued up to $4,000! Premium polyurea flake floor with lifetime warranty. Referral bonus - earn extra entries!" />
        <meta name="keywords" content="garage floor giveaway, free garage floor, floor coating contest, win garage renovation" />
        
        <meta property="og:title" content="Free Garage Floor Giveaway | Legacy Industrial Coatings" />
        <meta property="og:description" content="Enter to win a FREE garage floor coating valued up to $4,000! Premium polyurea flake floor with lifetime warranty." />
        <meta property="og:image" content="/lovable-uploads/b4732a11-b0eb-48f7-9950-d9c8e186ab97.png" />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/giveaway" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Giveaway Form Hero Section */}
        <GiveawayForm />
        
        <QuickFeaturesSection />
        
        <EpoxyVsPolyureaSection />
        
        <WhyChooseSection />
        
        <ProcessSection />

        <Footer />
      </div>
    </>
  );
};

export default Giveaway;
