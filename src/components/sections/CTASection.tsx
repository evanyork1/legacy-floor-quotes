
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine quote path based on current location
  const isCommercial = location.pathname === '/dfwcommercial';
  const quotePath = (location.pathname === '/dfw' || location.pathname === '/dfwreslanding') ? '/quotedfw' : '/quotehou';

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90"></div>
      <div className="container mx-auto px-4 text-center relative">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          {isCommercial ? "Ready for your commercial flooring project?" : "Ready to discover your new floor?"}
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {isCommercial 
            ? "Contact our commercial specialists for a professional consultation and project assessment"
            : "Get your free instant quote and experience Legacy's full-service approach"
          }
        </p>
        {isCommercial ? (
          <Button asChild className="bg-white text-blue-600 hover:bg-gray-50 text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <a 
              href="tel:214-305-6516" 
              className="flex items-center"
              onClick={() => {
                // Call new conversion tracking for /dfwcommercial
                if (typeof window !== 'undefined' && window.location.pathname === '/dfwcommercial' && (window as any).gtag_report_conversion_new) {
                  (window as any).gtag_report_conversion_new('tel:214-305-6516');
                }
              }}
            >
              <Phone className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Call Commercial Team
            </a>
          </Button>
        ) : (
          <Button onClick={() => navigate(quotePath)} className="bg-white text-blue-600 hover:bg-gray-50 text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            Start Your Quote
            <ArrowRight className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        )}
      </div>
    </section>
  );
};

export default CTASection;
