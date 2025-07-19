
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuoteOnlyHeaderProps {
  phone: string;
  onPhoneClick?: () => void;
  showCallButton?: boolean;
}

export const QuoteOnlyHeader = ({ phone, onPhoneClick, showCallButton = false }: QuoteOnlyHeaderProps) => {
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

          {/* Phone Number and Call Button */}
          <div className="flex items-center gap-4">
            {showCallButton ? (
              <Button 
                asChild 
                variant="outline" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full px-4 lg:px-6 text-sm lg:text-base bg-transparent"
                onClick={onPhoneClick}
              >
                <a href={`tel:${phone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </a>
              </Button>
            ) : (
              <a 
                href={`tel:${phone}`}
                onClick={onPhoneClick}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
              >
                <Phone className="mr-2 h-5 w-5" />
                {phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
