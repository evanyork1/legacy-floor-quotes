
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
  
  // CRITICAL: Set DFW session locks IMMEDIATELY - even before other hooks
  console.log("🎯 LandingQuoteFormDFW - IMMEDIATE DFW session lock setup");
  sessionStorage.setItem('BLOCK_HOUSTON_SUBMISSION', 'true');
  sessionStorage.setItem('SUBMISSION_TYPE', 'DFW_ONLY');
  sessionStorage.setItem('DFW_COMPONENT_ACTIVE', 'true');
  
  useEffect(() => {
    console.log("🎯 LandingQuoteFormDFW - Reinforcing DFW session locks");
    sessionStorage.setItem('BLOCK_HOUSTON_SUBMISSION', 'true');
    sessionStorage.setItem('SUBMISSION_TYPE', 'DFW_ONLY');
    sessionStorage.setItem('DFW_COMPONENT_ACTIVE', 'true');
    
    return () => {
      if (!sessionStorage.getItem('ACTIVE_DFW_SUBMISSION')) {
        sessionStorage.removeItem('BLOCK_HOUSTON_SUBMISSION');
        sessionStorage.removeItem('SUBMISSION_TYPE');
        sessionStorage.removeItem('DFW_COMPONENT_ACTIVE');
        console.log("🔓 LandingQuoteFormDFW - Cleared session locks on unmount");
      }
    };
  }, []);
  
  console.log("🎯 LandingQuoteFormDFW - Component initialized:", {
    path: location.pathname,
    url: window.location.href,
    sessionFlags: {
      BLOCK_HOUSTON_SUBMISSION: sessionStorage.getItem('BLOCK_HOUSTON_SUBMISSION'),
      SUBMISSION_TYPE: sessionStorage.getItem('SUBMISSION_TYPE'),
      DFW_COMPONENT_ACTIVE: sessionStorage.getItem('DFW_COMPONENT_ACTIVE')
    }
  });
  
  const { formData, updateFormData } = useQuoteFormData();
  const { calculatePrice } = useQuotePricing(formData);
  
  const { currentStep, totalSteps, nextStep, prevStep, canProceed } = useQuoteNavigationDFW(formData);
  
  const { handleFileUpload, removePhoto } = useQuoteFileHandling(formData, updateFormData);
  const { handleSubmit: submitQuoteDFW, isSubmitting } = useQuoteSubmissionDFW();
  
  const handleSubmit = () => {
    console.log("🎯 DFW FORM SUBMIT - Final submission triggered");
    console.log("  - Path:", location.pathname);
    console.log("  - Form data:", formData);
    console.log("  - Will save to quotes_dfw table");
    
    const estimatedPrice = calculatePrice();
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
