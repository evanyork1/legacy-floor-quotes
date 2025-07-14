import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LandingMinimalHeader = () => {
  const navigate = useNavigate();

  const handlePhoneClick = () => {
    // Call the Google Ads conversion tracking function
    if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion('tel:214-305-6516');
    }
    
    // Call new conversion tracking for /dfwreslanding
    if (typeof window !== 'undefined' && window.location.pathname === '/dfwreslanding' && (window as any).gtag_report_conversion_new) {
      (window as any).gtag_report_conversion_new('tel:214-305-6516');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-28">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/de4de16e-71f2-4d7d-822d-5532d41f72cd.png" 
              alt="Legacy Industrial Coatings" 
              className="h-24 sm:h-16 md:h-20 lg:h-40 w-auto" 
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
              onClick={() => navigate('/quotedfw')} 
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 lg:px-6 text-sm lg:text-base"
            >
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};