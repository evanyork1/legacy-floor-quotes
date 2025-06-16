
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-white py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Get Your Dream Garage Floor in{" "}
              <span className="whitespace-nowrap bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">One Day</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">Elite Installers. Unmatched Quality. A Reputation Built on Results in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Houston, TX</span></p>
            <div className="relative">
              <Button onClick={() => navigate('/quote')} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg px-10 py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                Get Instant Quote
                <ArrowRight className="ml-2 h-5 w-5" />
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
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 animate-pulse"></div>
            <img src="/lovable-uploads/a05a7933-8c9e-4367-9523-6c38e3b5944c.png" alt="Premium garage floor coating with luxury vehicles" className="relative w-full h-auto rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
