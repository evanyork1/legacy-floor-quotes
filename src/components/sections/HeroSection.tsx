
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-white py-20 sm:py-28 lg:py-36 min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
      <div className="container mx-auto px-6 lg:px-8 relative w-full">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-24 items-center">
          <div className="max-w-2xl space-y-10 lg:space-y-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-tight">
              Get Your Dream Garage Floor in{" "}
              <span className="whitespace-nowrap bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">One Day</span>
            </h1>
            <p className="text-2xl lg:text-3xl xl:text-4xl text-gray-600 leading-relaxed">Elite Installers. Unmatched Quality. A Reputation Built on Results in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Houston, TX</span></p>
            <div className="relative pt-4">
              <Button onClick={() => navigate('/quote')} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xl lg:text-2xl px-12 lg:px-16 py-6 lg:py-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                Get Instant Quote
                <ArrowRight className="ml-3 h-6 w-6 lg:h-7 lg:w-7" />
              </Button>
              
              {/* Hand-drawn arrow and text */}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-6 hidden lg:flex items-start">
                {/* Hand-drawn style arrow */}
                
                <div className="ml-2 transform rotate-1">
                  
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 animate-pulse"></div>
            <img src="/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png" alt="Premium garage floor coating with luxury vehicles" className="relative w-full h-auto rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
