
import { Card, CardContent } from "@/components/ui/card";
import { QuoteProgress } from "@/components/quote/QuoteProgress";
import { QuoteStepRenderer } from "@/components/quote/QuoteStepRenderer";
import { QuoteNavigation } from "@/components/quote/QuoteNavigation";
import { useQuoteForm } from "@/hooks/useQuoteForm";
import { useLocation } from "react-router-dom";

export const LandingQuoteForm = () => {
  const location = useLocation();
  
  // Check for DFW context to show appropriate message
  const isDFWPage = location.pathname.includes('quotedfw') || location.pathname.includes('/dfw');
  const activeDFWSubmission = sessionStorage.getItem('ACTIVE_DFW_SUBMISSION');
  const blockHouston = sessionStorage.getItem('BLOCK_HOUSTON_SUBMISSION');
  const submissionType = sessionStorage.getItem('SUBMISSION_TYPE');
  
  console.log("🔍 LandingQuoteForm - Context check:", {
    pathname: location.pathname,
    isDFWPage,
    shouldShowDFWMessage: isDFWPage || activeDFWSubmission || blockHouston === 'true' || submissionType === 'DFW_ONLY',
    currentURL: window.location.href
  });
  
  const isDFWContext = isDFWPage || activeDFWSubmission || blockHouston === 'true' || submissionType === 'DFW_ONLY';
  
  // Always call the hook - it will handle DFW context gracefully
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

  // Show message if in DFW context
  if (isDFWContext) {
    console.log("🔍 LandingQuoteForm - Showing DFW context message");
    return (
      <div className="max-w-2xl mx-auto p-8 bg-blue-50 border-2 border-blue-200 rounded-lg">
        <h2 className="text-blue-800 text-xl font-bold mb-4">DFW Quote Form</h2>
        <p className="text-blue-700">
          You are accessing the DFW quote system. Please use the DFW-specific quote form for submissions in the Dallas-Fort Worth area.
        </p>
        <p className="text-sm text-blue-600 mt-2">
          Current path: {location.pathname}
        </p>
      </div>
    );
  }

  console.log("✅ LandingQuoteForm - Rendering Houston quote form");

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
