
import { Card, CardContent } from "@/components/ui/card";
import { QuoteOnlyHeader } from "@/components/quote/QuoteOnlyHeader";
import Footer from "@/components/Footer";
import { QuoteProgress } from "@/components/quote/QuoteProgress";
import { QuoteStepRenderer } from "@/components/quote/QuoteStepRenderer";
import { QuoteNavigation } from "@/components/quote/QuoteNavigation";
import { useQuoteFormDFW } from "@/hooks/useQuoteFormDFW";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { buildBookingUrl } from "@/contexts/BookingUrlContext";

const QuoteDFW = () => {
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
  } = useQuoteFormDFW();

  const handlePhoneClick = () => {
    // Call the Google Ads conversion tracking function
    if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion('tel:214-305-6516');
    }
  };

  // Empty photo handling functions since DFW quotes don't use photos
  const handleFileUpload = () => {};
  const removePhoto = () => {};

  // Custom final button for DFW quote form
  const customFinalButton = (
    <div className="order-1 sm:order-2 flex flex-col gap-3">
      <Button 
        asChild
        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 sm:px-8 py-3 text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
      >
        <a 
          href={buildBookingUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center"
        >
          <Calendar className="h-5 w-5 mr-2" />
          Book In Person Measurement
        </a>
      </Button>
      <p className="text-xs text-center text-gray-600">
        Schedule your free measurement to finalize pricing
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Seo title="DFW Garage Floor Quote | Legacy Industrial Coatings" description="Get a fast Dallas-Fort Worth garage floor coating quote." path="/quotedfw" noindex />
      <QuoteOnlyHeader phone="214-305-6516" onPhoneClick={handlePhoneClick} />
      
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto">
          <QuoteProgress currentStep={currentStep} totalSteps={totalSteps} />

          <Card className="shadow-2xl border-0 overflow-hidden">
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
                customFinalButton={customFinalButton}
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
