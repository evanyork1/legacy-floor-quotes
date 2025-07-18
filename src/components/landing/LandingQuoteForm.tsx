
import { Card, CardContent } from "@/components/ui/card";
import { QuoteProgress } from "@/components/quote/QuoteProgress";
import { QuoteStepRenderer } from "@/components/quote/QuoteStepRenderer";
import { QuoteNavigation } from "@/components/quote/QuoteNavigation";
import { useQuoteForm } from "@/hooks/useQuoteForm";
import { useLocation } from "react-router-dom";

export const LandingQuoteForm = () => {
  const location = useLocation();
  
  // BLOCK HOUSTON HOOKS ON DFW PAGES - CRITICAL FIX
  const isDFWPage = location.pathname.includes('quotedfw') || location.pathname.includes('/dfw');
  
  console.log("🔍 LandingQuoteForm - Route check:", {
    pathname: location.pathname,
    isDFWPage,
    shouldBlockHoustonHooks: isDFWPage,
    currentURL: window.location.href
  });
  
  if (isDFWPage) {
    console.log("🚫 BLOCKING LandingQuoteForm on DFW page - this should use LandingQuoteFormDFW instead");
    console.error("❌ CRITICAL ERROR: LandingQuoteForm (Houston) should NOT be used on DFW pages");
    // Return error message instead of null to make it visible
    return (
      <div className="max-w-2xl mx-auto p-8 bg-red-100 border-2 border-red-500 rounded-lg">
        <h2 className="text-red-800 text-xl font-bold mb-4">Configuration Error</h2>
        <p className="text-red-700">
          Houston quote form component loaded on DFW page. This should use DFW-specific components.
        </p>
        <p className="text-sm text-red-600 mt-2">
          Current path: {location.pathname}
        </p>
      </div>
    );
  }
  
  // Use Houston-specific hook only for non-DFW pages
  const {
    currentStep,
    totalSteps,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    handleFileUpload,
    removePhoto,
    calculatePrice,
    canProceed,
    handleSubmit,
    isSubmitting
  } = useQuoteForm();

  console.log("✅ LandingQuoteForm - Using Houston hooks for non-DFW page");

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
