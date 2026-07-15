import { Helmet } from "react-helmet-async";
import { useState } from "react";
import GiveawayHeader from "@/components/GiveawayHeader";
import Footer from "@/components/Footer";
import EpoxyVsPolyureaSection from "@/components/sections/EpoxyVsPolyureaSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { BookingModal } from "@/components/landing/BookingModal";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteProgress } from "@/components/quote/QuoteProgress";
import { QuoteStepRenderer } from "@/components/quote/QuoteStepRenderer";
import { QuoteNavigation } from "@/components/quote/QuoteNavigation";
import { useQuoteFormDFW } from "@/hooks/useQuoteFormDFW";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
const GarageLandingInstant = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
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

  // Empty photo handling functions since DFW quotes don't use photos
  const handleFileUpload = () => {};
  const removePhoto = () => {};

  // Custom final button for DFW quote form
  const customFinalButton = <div className="order-1 sm:order-2 flex flex-col gap-3">
      <Button asChild className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 sm:px-8 py-3 text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
        <a href="https://clienthub.getjobber.com/hubs/e7849464-5cd3-44cf-8cf8-c1fd5e2eb2fb/public/requests/4986053/new?utm_source=website" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
          <Calendar className="h-5 w-5 mr-2" />
          Book In Person Measurement
        </a>
      </Button>
      <p className="text-xs text-center text-gray-600">
        Schedule your free measurement to finalize pricing
      </p>
    </div>;
  return <>
      <Helmet>
        <title>Instant Quote - Garage Floor Coating | Legacy Industrial Coatings</title>
        <meta name="description" content="Get an instant quote for your garage floor coating. Premium polyurea flake system with lifetime warranty. Professional installation in Dallas-Fort Worth." />
        <meta name="keywords" content="garage floor coating quote, instant estimate, polyurea floors, Dallas Fort Worth" />
        
        <meta property="og:title" content="Instant Quote - Garage Floor Coating | Legacy Industrial Coatings" />
        <meta property="og:description" content="Get an instant quote for premium polyurea garage floor coating with lifetime warranty." />
        <meta property="og:image" content="/lovable-uploads/b4732a11-b0eb-48f7-9950-d9c8e186ab97.png" />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/garagelandinginstant" />
        <meta property="og:url" content="https://legacyindustrialcoatings.com/garagelandinginstant" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <GiveawayHeader />
        
        {/* Hero Section with Quote Form */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 md:py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
                {/* Left Column - Content */}
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-5 lg:mb-6 leading-tight">
                    Get your floor installed{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">in one day.      </span>
                  </h1>
                  
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-xl text-gray-600 mb-4 md:mb-5 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Limited spots are open this week. Premium polyurea floor system with lifetime warranty. One day install.
                  </p>
                  
                  {/* Google Reviews Badge - Full Version */}
                  <div className="inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg shadow-md mb-4 md:mb-5">
                    <svg className="w-6 h-6 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">Google Reviews</span>
                      <span className="text-xs text-gray-500">190+ five star reviews</span>
                    </div>
                  </div>
                  
                  <p className="text-base md:text-lg text-gray-600">
                    Same-day estimates available • Serving Dallas-Fort Worth
                  </p>
                </div>

                {/* Right Column - Instant Quote Form */}
                <div className="w-full">
                  <Card className="shadow-xl border-0 overflow-hidden">
                    <CardContent className="p-3 sm:p-4">
                      <div className="text-center mb-3">
                        
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Get Your Instant Quote</h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Answer a few quick questions
                        </p>
                      </div>
                      
                      <QuoteProgress currentStep={currentStep} totalSteps={totalSteps} />
                      
                      <div className="mt-3">
                        <QuoteStepRenderer currentStep={currentStep} formData={formData} updateFormData={updateFormData} handleFileUpload={handleFileUpload} removePhoto={removePhoto} estimatedPrice={calculatePrice()} />
                        <QuoteNavigation currentStep={currentStep} totalSteps={totalSteps} canProceed={canProceed()} isSubmitting={isSubmitting} onNext={nextStep} onPrevious={prevStep} onSubmit={handleSubmit} customFinalButton={customFinalButton} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Before & After Showcase Section */}
        <section className="py-8 md:py-12 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6 md:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Real Garage <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Transformations</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                See real results from homeowners across Dallas–Fort Worth who upgraded their garage just like you're considering.
              </p>
            </div>
            
            <div className="grid gap-6 md:gap-8 lg:gap-12">
              {/* Transformation 1 */}
              <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
                <div className="grid grid-cols-2 gap-2 h-48 sm:h-64 md:h-80 lg:h-96">
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                    <img src="/lovable-uploads/64f61c96-ce73-4ef1-adb6-6e3d1644de30.png" alt="Before garage floor transformation" className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" />
                    <div className="absolute top-2 left-2 md:top-3 md:left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] md:text-xs font-semibold">
                        BEFORE
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                    <img src="/lovable-uploads/303d5679-dcda-4e82-b1da-4e309d1fb5dd.png" alt="After garage floor transformation with flake coating" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                    <div className="absolute top-2 left-2 md:top-3 md:left-3">
                      <span className="bg-white text-blue-600 px-2 py-1 rounded text-[10px] md:text-xs font-semibold border border-blue-600">
                        AFTER
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lg:pl-8 px-2 md:px-4 lg:px-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3 lg:mb-4">From Stained to Stunning</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    This homeowner's garage went from a stained, cracked concrete floor to a beautiful flake system that completely transformed the space. The durable polyurea coating not only looks amazing but provides decades of protection.
                  </p>
                </div>
              </div>

              {/* Transformation 2 */}
              <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
                <div className="order-2 lg:order-1 lg:pr-8 px-2 md:px-4 lg:px-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3 lg:mb-4">Complete Garage Makeover</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    A typical residential garage transformation showing how our flake floor coating system turns an ordinary concrete floor into a showroom-quality surface that adds value to the home.
                  </p>
                </div>
                <div className="order-1 lg:order-2 grid grid-cols-2 gap-2 h-48 sm:h-64 md:h-80 lg:h-96">
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                    <img src="/lovable-uploads/f57a3511-7157-4235-ba23-509e1df21d59.png" alt="Before garage floor coating" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                    <div className="absolute top-2 left-2 md:top-3 md:left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] md:text-xs font-semibold">
                        BEFORE
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                    <img src="/lovable-uploads/002da108-5855-41da-aaea-3e1d1a9de98e.png" alt="After garage floor coating with premium finish" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                    <div className="absolute top-2 left-2 md:top-3 md:left-3">
                      <span className="bg-white text-blue-600 px-2 py-1 rounded text-[10px] md:text-xs font-semibold border border-blue-600">
                        AFTER
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transformation 3 */}
              <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
                <div className="grid grid-cols-2 gap-2 h-48 sm:h-64 md:h-80 lg:h-96">
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                    <img src="/lovable-uploads/c499e5d5-764f-4feb-b2be-635e5b67ea69.png" alt="Before large garage transformation" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                    <div className="absolute top-2 left-2 md:top-3 md:left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] md:text-xs font-semibold">
                        BEFORE
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                    <img src="/lovable-uploads/e98aa310-42f2-46db-ac00-8502f2d71097.png" alt="After large garage floor coating" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                    <div className="absolute top-2 left-2 md:top-3 md:left-3">
                      <span className="bg-white text-blue-600 px-2 py-1 rounded text-[10px] md:text-xs font-semibold border border-blue-600">
                        AFTER
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lg:pl-8 px-2 md:px-4 lg:px-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3 lg:mb-4">Large Space Transformation</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    Even large garages get the premium treatment. Our polyurea system covers every square foot with consistent quality and durability, perfect for multi-car garages.
                  </p>
                </div>
              </div>

              {/* Transformation 4 */}
              <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
                <div className="order-2 lg:order-1 lg:pr-8 px-2 md:px-4 lg:px-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3 lg:mb-4">Professional Results Every Time</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    Our certified installers deliver consistent, professional results that exceed expectations. Every project gets the same attention to detail and quality craftsmanship.
                  </p>
                </div>
                <div className="order-1 lg:order-2 grid grid-cols-2 gap-2 h-48 sm:h-64 md:h-80 lg:h-96">
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                    <img src="/lovable-uploads/1e76caef-6851-4869-9f2e-df3b59bf64ef.png" alt="Before professional garage coating" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                    <div className="absolute top-2 left-2 md:top-3 md:left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] md:text-xs font-semibold">
                        BEFORE
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                    <img src="/lovable-uploads/ef50769f-f8f0-4bd8-9f4c-5238689c933b.png" alt="After professional garage floor coating" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                    <div className="absolute top-2 left-2 md:top-3 md:left-3">
                      <span className="bg-white text-blue-600 px-2 py-1 rounded text-[10px] md:text-xs font-semibold border border-blue-600">
                        AFTER
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <TestimonialsSection />
        
        <EpoxyVsPolyureaSection />
        
        <ProcessSection />
        
        {/* Mid-Page CTA Quote Form */}
        <section className="py-10 md:py-12 lg:py-16 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 px-4">
                  Ready to Transform Your Garage?
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-blue-100 px-4">
              </p>
              </div>
              <div className="max-w-3xl mx-auto">
                <Card className="shadow-xl border-0 overflow-hidden">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <QuoteProgress currentStep={currentStep} totalSteps={totalSteps} />
                    
                    <div className="mt-4">
                      <QuoteStepRenderer currentStep={currentStep} formData={formData} updateFormData={updateFormData} handleFileUpload={handleFileUpload} removePhoto={removePhoto} estimatedPrice={calculatePrice()} />
                      <QuoteNavigation currentStep={currentStep} totalSteps={totalSteps} canProceed={canProceed()} isSubmitting={isSubmitting} onNext={nextStep} onPrevious={prevStep} onSubmit={handleSubmit} customFinalButton={customFinalButton} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      
      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
    </>;
};
export default GarageLandingInstant;