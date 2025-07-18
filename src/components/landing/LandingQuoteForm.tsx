
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
    shouldBlockHoustonHooks: isDFWPage
  });
  
  if (isDFWPage) {
    console.log("🚫 BLOCKING LandingQuoteForm on DFW page - redirecting to DFW component");
    // Return null or redirect to prevent Houston hooks from loading on DFW pages
    return null;
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
