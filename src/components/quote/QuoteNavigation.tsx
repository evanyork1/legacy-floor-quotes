
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
}

export const QuoteNavigation = ({
  currentStep,
  totalSteps,
  canProceed,
  isSubmitting,
  onNext,
  onPrevious,
  onSubmit
}: QuoteNavigationProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
      <Button 
        variant="outline" 
        onClick={onPrevious} 
        disabled={currentStep === 1 || isSubmitting} 
        className="flex items-center justify-center px-4 sm:px-6 py-2 text-sm sm:text-base order-2 sm:order-1"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      {currentStep < totalSteps ? 
        <Button 
          onClick={onNext} 
          disabled={!canProceed} 
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex items-center justify-center px-4 sm:px-6 py-2 text-sm sm:text-base order-1 sm:order-2"
        >
          Next Step
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button> : 
        <Button 
          onClick={onNext}
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 flex items-center justify-center px-4 sm:px-6 py-2 text-sm sm:text-base order-1 sm:order-2"
        >
          Finish
          <Check className="h-4 w-4 ml-2" />
        </Button>
      }
    </div>
  );
};
