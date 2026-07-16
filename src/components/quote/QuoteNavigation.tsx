
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";

interface QuoteNavigationProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  isSubmitting: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  customFinalButton?: React.ReactNode;
}

export const QuoteNavigation = ({
  currentStep,
  totalSteps,
  canProceed,
  isSubmitting,
  onNext,
  onPrevious,
  onSubmit,
  customFinalButton
}: QuoteNavigationProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
      <Button 
        variant="outline" 
        onClick={onPrevious} 
        disabled={currentStep === 1 || isSubmitting} 
        className="flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm order-2 sm:order-1"
      >
        <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
        Previous
      </Button>
      {currentStep < totalSteps ? 
        <Button 
          onClick={onNext} 
          disabled={!canProceed} 
          className="bg-blue-900 hover:bg-blue-950 flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm order-1 sm:order-2"
        >
          Next Step
          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1.5 sm:ml-2" />
        </Button> : 
        customFinalButton ? customFinalButton :
        <Button 
          onClick={onNext}
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm order-1 sm:order-2"
        >
          Finish
          <Check className="h-3 w-3 sm:h-4 sm:w-4 ml-1.5 sm:ml-2" />
        </Button>
      }
    </div>
  );
};
