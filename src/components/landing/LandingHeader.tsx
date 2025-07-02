
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export const LandingHeader = () => {
  const scrollToQuote = () => {
    const element = document.getElementById('quote-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 sm:h-24 md:h-32">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/de4de16e-71f2-4d7d-822d-5532d41f72cd.png" 
              alt="Legacy Industrial Coatings" 
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto" 
            />
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="tel:214-305-6516" 
              className="hidden sm:inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
            >
              <Phone className="mr-2 h-5 w-5" />
              214-305-6516
            </a>
            <Button 
              onClick={scrollToQuote}
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
