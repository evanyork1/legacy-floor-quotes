
import { Progress } from "@/components/ui/progress";

interface QuoteProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const QuoteProgress = ({ currentStep, totalSteps }: QuoteProgressProps) => {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Get Your Instant Quote</h1>
        <div className="text-left sm:text-right">
          <div className="text-lg sm:text-xl font-bold text-blue-600">Step {currentStep} of {totalSteps}</div>
          <div className="text-xs sm:text-sm text-gray-500">90 seconds to complete</div>
        </div>
      </div>
      <Progress value={currentStep / totalSteps * 100} className="h-2" />
    </div>
  );
};
