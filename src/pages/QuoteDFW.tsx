
import { Card, CardContent } from "@/components/ui/card";
import { LandingMinimalHeader } from "@/components/landing/LandingMinimalHeader";
import { LandingMinimalFooter } from "@/components/landing/LandingMinimalFooter";
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

const QuoteDFW = () => {
  const location = useLocation();
  
  // CRITICAL: Set DFW session locks immediately when page loads
  useEffect(() => {
    console.log("🎯 QuoteDFW PAGE - Setting DFW session locks on page load");
    sessionStorage.setItem('BLOCK_HOUSTON_SUBMISSION', 'true');
    sessionStorage.setItem('SUBMISSION_TYPE', 'DFW_ONLY');
    
    return () => {
      // Clean up on unmount if no active submission
      if (!sessionStorage.getItem('ACTIVE_DFW_SUBMISSION')) {
        sessionStorage.removeItem('BLOCK_HOUSTON_SUBMISSION');
        sessionStorage.removeItem('SUBMISSION_TYPE');
        console.log("🔓 QuoteDFW PAGE - Cleared session locks on unmount");
      }
    };
  }, []);
  
  console.log("🎯 QuoteDFW PAGE - Rendering DFW quote page:");
  console.log("  - Current path:", location.pathname);
  console.log("  - Current URL:", window.location.href);
  console.log("  - This page uses DFW-specific hooks");
  
  // Use individual hooks directly for DFW
  const { formData, updateFormData } = useQuoteFormData();
  const { calculatePrice } = useQuotePricing(formData);
  
  // Use DFW-specific navigation hook (no submission logic)
  const { 
    currentStep, 
    totalSteps, 
    nextStep, 
    prevStep, 
    canProceed 
  } = useQuoteNavigationDFW(formData);
  
  const { handleFileUpload, removePhoto } = useQuoteFileHandling(formData, updateFormData);
  
  // Use DFW submission hook
  const { handleSubmit: submitQuoteDFW, isSubmitting } = useQuoteSubmissionDFW();

  const handleSubmit = () => {
    console.log("🎯 QuoteDFW PAGE - Submit button clicked:");
    console.log("  - Current path:", location.pathname);
    console.log("  - Form data:", formData);
    console.log("  - Will use DFW submission hook");
    
    const estimatedPrice = calculatePrice();
    console.log("  - Estimated price:", estimatedPrice);
    
    submitQuoteDFW(formData, estimatedPrice);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <LandingMinimalHeader />
      
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto">
          <QuoteProgress currentStep={currentStep} totalSteps={totalSteps} />

          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-6 sm:p-8 lg:p-12">
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
      </div>

      <LandingMinimalFooter />
    </div>
  );
};

export default QuoteDFW;
