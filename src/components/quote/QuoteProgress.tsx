
import { Progress } from "@/components/ui/progress";

interface QuoteProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const QuoteProgress = ({ currentStep, totalSteps }: QuoteProgressProps) => {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-3 gap-2 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Get Your Instant Quote</h1>
        <div className="text-left sm:text-right">
          <div className="text-sm sm:text-base font-bold text-blue-600">Step {currentStep} of {totalSteps}</div>
          <div className="text-[10px] sm:text-xs text-gray-500">90 seconds to complete</div>
        </div>
      </div>
      <Progress value={currentStep / totalSteps * 100} className="h-1" />
    </div>
  );
};
