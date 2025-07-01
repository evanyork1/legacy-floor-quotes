
import { Button } from "@/components/ui/button";

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
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-28">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/de4de16e-71f2-4d7d-822d-5532d41f72cd.png" 
              alt="Legacy Industrial Coatings" 
              className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto" 
            />
          </div>
          <Button 
            onClick={scrollToQuote}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 lg:px-6 text-sm lg:text-base"
          >
            Get Quote
          </Button>
        </div>
      </div>
    </header>
  );
};
