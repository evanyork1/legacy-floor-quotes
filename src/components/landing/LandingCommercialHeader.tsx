import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LandingCommercialHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-24 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/a18e3648-17a6-4222-808b-0a78d3ea50b9.png" 
            alt="Legacy Industrial Coatings Logo" 
            className="h-12 w-auto sm:h-16 md:h-19 lg:h-22" 
          / loading="lazy" decoding="async" >
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Phone Number Display */}
          <a 
            href="tel:214-305-6516"
            onClick={() => {
              // Call new conversion tracking for /dfwcommercial
              if (typeof window !== 'undefined' && window.location.pathname === '/dfwcommercial' && (window as any).gtag_report_conversion_new) {
                (window as any).gtag_report_conversion_new('tel:214-305-6516');
              }
            }}
            className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span className="font-semibold">214-305-6516</span>
          </a>
          
          {/* Call Now Button */}
          <Button 
            asChild 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a 
              href="tel:214-305-6516" 
              className="flex items-center space-x-2"
              onClick={() => {
                // Call new conversion tracking for /dfwcommercial
                if (typeof window !== 'undefined' && window.location.pathname === '/dfwcommercial' && (window as any).gtag_report_conversion_new) {
                  (window as any).gtag_report_conversion_new('tel:214-305-6516');
                }
              }}
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};