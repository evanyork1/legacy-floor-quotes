
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine quote path and content based on current location
  const isDFW = location.pathname === '/dfw';
  const quotePath = isDFW ? '/quotedfw' : '/quotehou';
  
  const title = isDFW 
    ? "Your Local Epoxy Flooring"
    : "Get Your Dream Garage Floor in One Day";
    
  const locationText = isDFW 
    ? "Dallas - Fort Worth, TX"
    : "Houston, TX";

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-white py-20 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
      <div className="container mx-auto px-6 lg:px-8 relative w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-2xl space-y-8 sm:space-y-10 lg:space-y-12">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-relaxed mb-4 sm:mb-6">
              {isDFW ? (
                <>
                  {title}{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Experts
                  </span>
                </>
              ) : (
                title.split(" ").map((word, index) => {
                  if (word === "One" || word === "Day") {
                    return (
                      <span key={index} className="whitespace-nowrap bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {word}{" "}
                      </span>
                    );
                  }
                  return word + " ";
                })
              )}
            </h1>
            <p className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-gray-600 leading-relaxed mb-4 sm:mb-6">
              {isDFW ? (
                <>
                  Unmatched Quality and a Reputation Built on Results<br />
                  Serving{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {locationText}
                  </span>
                </>
              ) : (
                <>
                  Elite Installers. Unmatched Quality. A Reputation Built on Results in{" "}
                  <span className="block sm:inline bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{locationText}</span>
                </>
              )}
            </p>
            <div className="relative pt-8 sm:pt-10">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => navigate(quotePath)} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm sm:text-base lg:text-lg px-4 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                  Get Instant Quote
                  <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
                
                {isDFW && (
                  <Button 
                    asChild
                    variant="outline" 
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm sm:text-base lg:text-lg px-4 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 bg-transparent"
                  >
                    <a href="tel:214-305-6516">
                      <Phone className="mr-2 sm:mr-3 h-4 w-4 lg:h-5 lg:w-5" />
                      Call Us Now
                    </a>
                  </Button>
                )}
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
