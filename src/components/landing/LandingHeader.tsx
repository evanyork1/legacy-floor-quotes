
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface LandingHeaderProps {
  isJAK?: boolean;
}

export const LandingHeader = ({ isJAK = false }: LandingHeaderProps) => {
  const scrollToQuote = () => {
    const element = document.getElementById('quote-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const phoneNumber = isJAK ? "(562) 285-6770" : "214-305-6516";
  const phoneHref = isJAK ? "tel:562-285-6770" : "tel:214-305-6516";
  const logoSrc = isJAK 
    ? "/lovable-uploads/9d272b96-7df8-41b8-a4dc-05d65b8fadfa.png"
    : "/lovable-uploads/de4de16e-71f2-4d7d-822d-5532d41f72cd.png";
  const logoAlt = isJAK ? "JAK Concrete Coatings" : "Legacy Industrial Coatings";
  const buttonColor = isJAK 
    ? "bg-orange-600 hover:bg-orange-700" 
    : "bg-blue-600 hover:bg-blue-700";
  const phoneColor = isJAK 
    ? "text-orange-600 hover:text-orange-700" 
    : "text-blue-600 hover:text-blue-700";

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          <div className="flex items-center">
            <img 
              src={logoSrc}
              alt={logoAlt}
              className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto" 
            />
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={phoneHref}
              className={`hidden sm:inline-flex items-center ${phoneColor} font-semibold text-lg transition-colors`}
            >
              <Phone className="mr-2 h-5 w-5" />
              {phoneNumber}
            </a>
            <Button 
              onClick={scrollToQuote}
              className={`${buttonColor} text-white rounded-full px-4 lg:px-6 text-sm lg:text-base`}
            >
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
