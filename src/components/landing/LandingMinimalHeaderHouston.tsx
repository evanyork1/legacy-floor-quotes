
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LandingMinimalHeaderHouston = () => {
  const navigate = useNavigate();

  const handlePhoneClick = () => {
    // Call the Google Ads conversion tracking function
    if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion('tel:214-305-6516');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-28">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/a18e3648-17a6-4222-808b-0a78d3ea50b9.png" 
              alt="Legacy Industrial Coatings" 
              className="h-12 sm:h-16 md:h-19 lg:h-22 w-auto" 
            />
          </div>

          {/* Phone and Quote Button */}
          <div className="flex items-center gap-4">
            <a 
              href="tel:214-305-6516"
              onClick={handlePhoneClick}
              className="hidden sm:inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
            >
              <Phone className="mr-2 h-5 w-5" />
              214-305-6516
            </a>
            <Button 
              onClick={() => navigate('/quotehou')} 
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 lg:px-6 text-sm lg:text-base w-auto"
            >
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
