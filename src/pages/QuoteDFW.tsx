
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QuoteProgress } from "@/components/quote/QuoteProgress";
import { QuoteStepRenderer } from "@/components/quote/QuoteStepRenderer";
import { QuoteNavigation } from "@/components/quote/QuoteNavigation";
import { useQuoteFormDFW } from "@/hooks/useQuoteFormDFW";

const QuoteDFW = () => {
  console.log('QuoteDFW component rendered - using dedicated DFW hook');
  
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

  console.log('DFW Quote Form State:', {
    currentStep,
    totalSteps,
    formData: {
      garageType: formData.garageType,
      colorChoice: formData.colorChoice,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      zipCode: formData.zipCode
    },
    canProceed: canProceed(),
    isSubmitting
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
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

      <Footer />
    </div>
  );
};

export default QuoteDFW;
