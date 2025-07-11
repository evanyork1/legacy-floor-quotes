import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface CommercialCTAButtonsProps {
  onContactRequestClick: () => void;
}

export const CommercialCTAButtons = ({ onContactRequestClick }: CommercialCTAButtonsProps) => {
  return (
    <div className="flex justify-center">
      <Button 
        onClick={onContactRequestClick}
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm sm:text-base lg:text-lg px-4 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
      >
        <Phone className="mr-2 sm:mr-3 h-4 w-4 lg:h-5 lg:w-5" />
        Get A Quote
      </Button>
    </div>
  );
};