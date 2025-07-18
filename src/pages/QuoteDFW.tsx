
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

const QuoteDFW = () => {
  console.log("🎯 EMERGENCY DFW PAGE RENDER");
  console.log("  - Current path:", window.location.pathname);
  console.log("  - Current URL:", window.location.href);
  console.log("  - Page component: QuoteDFW");
  console.log("  - Target table: quotes_dfw");
  
  // Initialize hooks
  const { formData, updateFormData } = useQuoteFormData();
  const { calculatePrice } = useQuotePricing(formData);
  
  const { 
    currentStep, 
    totalSteps, 
    nextStep, 
    prevStep, 
    canProceed 
  } = useQuoteNavigationDFW(formData);
  
  const { handleFileUpload, removePhoto } = useQuoteFileHandling(formData, updateFormData);
  const { handleSubmit: submitQuoteDFW, isSubmitting } = useQuoteSubmissionDFW();

  console.log("🎯 DFW HOOKS INITIALIZED");
  console.log("  - Current step:", currentStep);
  console.log("  - Can proceed:", canProceed());
  console.log("  - Is submitting:", isSubmitting);
  console.log("  - Form data keys:", Object.keys(formData));

  const handleSubmit = () => {
    console.log("🚨 EMERGENCY DFW SUBMIT BUTTON CLICKED");
    console.log("  - Current path:", window.location.pathname);
    console.log("  - Current step:", currentStep);
    console.log("  - Total steps:", totalSteps);
    console.log("  - Is final step:", currentStep === totalSteps);
    console.log("  - Form data:", formData);
    console.log("  - Target: quotes_dfw table");
    
    const estimatedPrice = calculatePrice();
    console.log("  - Calculated price:", estimatedPrice);
    console.log("🚨 CALLING DFW SUBMISSION HOOK...");
    
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
