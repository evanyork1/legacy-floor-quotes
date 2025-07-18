
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
import { useEffect } from "react";

export const LandingQuoteFormDFW = () => {
  const location = useLocation();
  
  // CRITICAL: Set DFW session locks immediately when component loads
  useEffect(() => {
    console.log("🎯 LandingQuoteFormDFW - Setting DFW session locks on component mount");
    sessionStorage.setItem('BLOCK_HOUSTON_SUBMISSION', 'true');
    sessionStorage.setItem('SUBMISSION_TYPE', 'DFW_ONLY');
    
    return () => {
      // Clean up on unmount if no active submission
      if (!sessionStorage.getItem('ACTIVE_DFW_SUBMISSION')) {
        sessionStorage.removeItem('BLOCK_HOUSTON_SUBMISSION');
        sessionStorage.removeItem('SUBMISSION_TYPE');
        console.log("🔓 LandingQuoteFormDFW - Cleared session locks on unmount");
      }
    };
  }, []);
  
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
