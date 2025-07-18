
import { Card, CardContent } from "@/components/ui/card";
import { QuoteProgress } from "@/components/quote/QuoteProgress";
import { QuoteStepRenderer } from "@/components/quote/QuoteStepRenderer";
import { QuoteNavigation } from "@/components/quote/QuoteNavigation";
import { useQuoteFormData } from "@/hooks/quote/useQuoteFormData";
import { useQuoteNavigationDFW } from "@/hooks/quote/useQuoteNavigationDFW";
import { useQuoteFileHandling } from "@/hooks/quote/useQuoteFileHandling";
import { useQuotePricing } from "@/hooks/quote/useQuotePricing";
import { useQuoteSubmissionDFW } from "@/hooks/quote/useQuoteSubmissionDFW";
import { useLocation } from "react-router-dom";

export const LandingQuoteFormDFW = () => {
  const location = useLocation();
  
  console.log("🎯 LandingQuoteFormDFW - Initializing DFW quote form:");
  console.log("  - Current path:", location.pathname);
  console.log("  - Current URL:", window.location.href);
  console.log("  - This is the CORRECT DFW component");
  
  const { formData, updateFormData } = useQuoteFormData();
  const { calculatePrice } = useQuotePricing(formData);
  
  // Use DFW-specific navigation hook (no submission logic)
  const { currentStep, totalSteps, nextStep, prevStep, canProceed } = useQuoteNavigationDFW(formData);

  const { handleFileUpload, removePhoto } = useQuoteFileHandling(formData, updateFormData);
  
  // Use DFW submission hook
  const { handleSubmit: submitQuoteDFW, isSubmitting } = useQuoteSubmissionDFW();
  
  const handleSubmit = () => {
    console.log("🎯 DFW Form Submit Button Clicked");
    console.log("  - Form data:", formData);
    console.log("  - Current path:", location.pathname);
    console.log("  - This will trigger DFW-specific submission");
    
    const estimatedPrice = calculatePrice();
    console.log("  - Estimated price:", estimatedPrice);
    
    submitQuoteDFW(formData, estimatedPrice);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4 p-3 bg-green-100 border border-green-400 rounded-lg">
        <p className="text-green-800 text-sm font-medium">
          ✅ DFW Quote Form Active - Submissions will go to quotes_dfw table
        </p>
        <p className="text-green-600 text-xs mt-1">
          Path: {location.pathname} | Component: LandingQuoteFormDFW
        </p>
      </div>
      
      <QuoteProgress currentStep={currentStep} totalSteps={totalSteps} />

      <Card className="shadow-xl border-0 overflow-hidden">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <QuoteStepRenderer
            currentStep={currentStep}
            formData={formData}
            updateFormData={updateFormData}
            handleFileUpload={handleFileUpload}
            removePhoto={removePhoto}
            estimatedPrice={calculatePrice()}
          />
          <QuoteNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            canProceed={canProceed()}
            isSubmitting={isSubmitting}
            onNext={nextStep}
            onPrevious={prevStep}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};
