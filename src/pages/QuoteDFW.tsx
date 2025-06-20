
import { useQuoteFormDFW } from "@/hooks/useQuoteFormDFW";
import Header from "@/components/Header";
import DFWFooter from "@/components/DFWFooter";
import QuoteProgress from "@/components/quote/QuoteProgress";
import QuoteStepRenderer from "@/components/quote/QuoteStepRenderer";
import QuoteNavigation from "@/components/quote/QuoteNavigation";

const QuoteDFW = () => {
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
  } = useQuoteFormDFW();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <QuoteProgress currentStep={currentStep} totalSteps={totalSteps} />
          
          <QuoteStepRenderer
            currentStep={currentStep}
            formData={formData}
            updateFormData={updateFormData}
            handleFileUpload={handleFileUpload}
            removePhoto={removePhoto}
            calculatePrice={calculatePrice}
          />

          <QuoteNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            onSubmit={handleSubmit}
            canProceed={canProceed()}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
      <DFWFooter />
    </div>
  );
};

export default QuoteDFW;
