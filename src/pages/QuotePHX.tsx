
import { Card, CardContent } from "@/components/ui/card";
import { QuoteOnlyHeader } from "@/components/quote/QuoteOnlyHeader";
import { QuoteProgress } from "@/components/quote/QuoteProgress";
import { QuoteStepRenderer } from "@/components/quote/QuoteStepRenderer";
import { QuoteNavigation } from "@/components/quote/QuoteNavigation";
import { useQuoteFormPHX } from "@/hooks/useQuoteFormPHX";
import { QuoteOnlyFooterPHX } from "@/components/quote/QuoteOnlyFooterPHX";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Seo } from "@/components/seo/Seo";

const QuotePHX = () => {
  const {
    currentStep,
    totalSteps,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    calculatePrice,
    canProceed,
    handleSubmit,
    isSubmitting
  } = useQuoteFormPHX();

  const handlePhoneClick = () => {
    if (typeof window !== 'undefined') {
      if ((window as any).gtag_report_conversion_phx) {
        (window as any).gtag_report_conversion_phx('tel:602-560-0974');
      } else if ((window as any).gtag_report_conversion) {
        (window as any).gtag_report_conversion('tel:602-560-0974');
      }
    }
  };

  // Placeholder functions since photos aren't used in PHX quotes
  const handleFileUpload = () => {};
  const removePhoto = () => {};

  // Custom final button for PHX with Phoenix booking link
  const customFinalButton = (
    <div className="flex flex-col gap-4 w-full">
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting || !canProceed()}
        size="lg"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg"
      >
        {isSubmitting ? "Submitting..." : "Submit Quote Request"}
      </Button>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-6 text-lg"
      >
        <a 
          href="https://calendar.app.google/HY4BsSxFfwRZtRcr8" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Calendar className="mr-2 h-5 w-5" />
          Or Book In-Person Measurement
        </a>
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
      <Seo title="Phoenix Garage Floor Quote | Legacy Industrial Coatings" description="Get a fast Phoenix-area garage floor coating quote." path="/quotephx" noindex />
      <QuoteOnlyHeader 
        phone="602-560-0974"
        onPhoneClick={handlePhoneClick}
        showCallButton={true}
      />
      
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        <QuoteProgress currentStep={currentStep} totalSteps={totalSteps} />
        
        <Card className="shadow-xl border-0">
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
              onNext={nextStep}
              onPrevious={prevStep}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              customFinalButton={customFinalButton}
            />
          </CardContent>
        </Card>
      </div>
      
      <QuoteOnlyFooterPHX />
    </div>
  );
};

export default QuotePHX;
