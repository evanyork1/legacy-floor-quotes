import { CTAButton } from "@/components/ui/cta-button";
import { Phone } from "lucide-react";

interface CommercialCTAButtonsProps {
  onContactRequestClick: () => void;
}

export const CommercialCTAButtons = ({ onContactRequestClick }: CommercialCTAButtonsProps) => {
  return (
    <div className="flex justify-center">
      <CTAButton 
        onClick={onContactRequestClick}
        variant="primary"
        size="lg"
        icon={<Phone />}
        fullWidthMobile={true}
      >
        Get A Quote
      </CTAButton>
    </div>
  );
};