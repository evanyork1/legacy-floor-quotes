
import { Progress } from "@/components/ui/progress";

interface QuoteProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const QuoteProgress = ({ currentStep, totalSteps }: QuoteProgressProps) => {
  return (
    <div className="mb-8 sm:mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Get Your Instant Quote</h1>
        <div className="text-left sm:text-right">
          <div className="text-xl sm:text-2xl font-bold text-blue-600">Step {currentStep} of {totalSteps}</div>
          <div className="text-xs sm:text-sm text-gray-500">90 seconds to complete</div>
        </div>
      </div>
      <Progress value={currentStep / totalSteps * 100} className="h-2 sm:h-3" />
    </div>
  );
};
