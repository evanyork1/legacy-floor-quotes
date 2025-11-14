import { Helmet } from "react-helmet-async";
import { useState } from "react";
import GiveawayHeader from "@/components/GiveawayHeader";
import Footer from "@/components/Footer";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import EpoxyVsPolyureaSection from "@/components/sections/EpoxyVsPolyureaSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { LeadForm } from "@/components/landing/LeadForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookingModal } from "@/components/landing/BookingModal";

const GarageLandingForm = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  return <>
      <Helmet>
        <title>Professional Garage Floor Coating | Legacy Industrial Coatings</title>
        <meta name="description" content="Transform your garage with premium polyurea flake floor coating. Lifetime warranty, professional installation, same-day estimates available in Dallas-Fort Worth." />
        <meta name="keywords" content="garage floor coating, polyurea floors, garage renovation, Dallas Fort Worth" />
        
        <meta property="og:title" content="Professional Garage Floor Coating | Legacy Industrial Coatings" />
        <meta property="og:description" content="Transform your garage with premium polyurea flake floor coating. Lifetime warranty and professional installation." />
        <meta property="og:image" content="/lovable-uploads/b4732a11-b0eb-48f7-9950-d9c8e186ab97.png" />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/garagelandingform" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <GiveawayHeader />
        
        {/* Hero Section with Form */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Column - Content */}
                <div className="text-left">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                    Get your floor installed{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                      before Thanksgiving
                    </span>
                  </h1>
                  
                  <p className="text-lg sm:text-xl text-gray-600 mb-4">
                    Limited spots are open this week. Premium polyurea floor system with lifetime warranty. One day install.
                  </p>
                  
                  {/* Google Reviews Badge */}
                  <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">5.0 (180+ reviews)</span>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Same-day estimates available • Serving Dallas-Fort Worth
                  </p>
                </div>

                {/* Right Column - Lead Form */}
                <div className="w-full">
                  <LeadForm />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Before & After Showcase Section - Moved to second position */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Real Garage <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Transformations</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                See how we transform ordinary concrete floors into stunning, durable surfaces that homeowners love
              </p>
            </div>
            
            <div className="grid gap-8 lg:gap-12">
              {/* Transformation 1 */}
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                <div className="grid grid-cols-2 gap-2 h-64 sm:h-80 lg:h-96">
                  <div className="relative overflow-hidden rounded-xl">
                    <img src="/lovable-uploads/64f61c96-ce73-4ef1-adb6-6e3d1644de30.png" alt="Before garage floor transformation" className="w-full h-full object-cover" />
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        BEFORE
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl">
                    <img src="/lovable-uploads/303d5679-dcda-4e82-b1da-4e309d1fb5dd.png" alt="After garage floor transformation with flake coating" className="w-full h-full object-cover" />
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                      <span className="bg-white text-blue-600 px-2 py-1 rounded text-xs font-semibold border border-blue-600">
                        AFTER
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lg:pl-8 px-4 lg:px-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">From Stained to Stunning</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    This homeowner's garage went from a stained, cracked concrete floor to a beautiful flake system that completely transformed the space. The durable polyurea coating not only looks amazing but provides decades of protection.
                  </p>
                </div>
              </div>

              {/* Transformation 2 */}
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                <div className="order-2 lg:order-1 lg:pr-8 px-4 lg:px-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Complete Garage Makeover</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Watch how a dated garage floor becomes a showpiece with our professional coating application. The transformation speaks for itself - from ordinary concrete to a stunning, maintenance-free surface.
                  </p>
                </div>
                <div className="order-1 lg:order-2 grid grid-cols-2 gap-2 h-64 sm:h-80 lg:h-96">
                  <div className="relative overflow-hidden rounded-xl">
                    <img src="/lovable-uploads/dee22f69-e885-489a-a567-40d7d224064f.png" alt="Before garage floor coating" className="w-full h-full object-cover" />
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        BEFORE
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl">
                    <img src="/lovable-uploads/d1b328fa-3e30-4126-8266-ae64a33edd79.png" alt="After garage floor coating" className="w-full h-full object-cover" />
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                      <span className="bg-white text-blue-600 px-2 py-1 rounded text-xs font-semibold border border-blue-600">
                        AFTER
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transformation 3 */}
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                <div className="grid grid-cols-2 gap-2 h-64 sm:h-80 lg:h-96">
                  <div className="relative overflow-hidden rounded-xl">
                    <img src="/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png" alt="Before garage floor" className="w-full h-full object-cover" />
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        BEFORE
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl">
                    <img src="/lovable-uploads/0fd4e444-b540-4c31-b624-49d7b2cb00a6.png" alt="After garage floor" className="w-full h-full object-cover" />
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                      <span className="bg-white text-blue-600 px-2 py-1 rounded text-xs font-semibold border border-blue-600">
                        AFTER
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lg:pl-8 px-4 lg:px-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Premium Quality Results</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    See the incredible difference our premium polyurea system makes. This garage went from worn and uninviting to a polished, professional space that adds real value to the home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <TestimonialsSection />
        
        <EpoxyVsPolyureaSection />
        
        <WhyChooseSection />
        
        <ProcessSection />
        
        {/* Mid-Page CTA Form */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Ready to Transform Your Garage?
                </h2>
                <p className="text-xl text-blue-100">
                  Don't miss out on our limited-time Thanksgiving special!
                </p>
              </div>
              <div className="max-w-2xl mx-auto">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Homeowner Questions About Garage Floors
                </h2>
                <p className="text-lg text-gray-600">
                  Common questions from homeowners about our garage floor coating services
                </p>
              </div>
              
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                    How long does the garage floor installation take at my home?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Most residential garage floors are completed in just one day. You can park your cars back in the garage within 24–48 hours.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                    What does a residential garage floor coating cost?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    For a typical 2-3 car residential garage using our premium polyurea flake system, pricing ranges from $2,800–$4,500. This investment adds significant value to your home while providing a lifetime of beauty and durability.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                    Will my garage floor coating handle daily home use?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Absolutely! Our residential garage floors are designed to handle everything from hot tires and oil drips to kids' bikes and home storage. The coating won't chip, peel, or stain under normal home use.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                    How do I maintain my garage floor?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Maintenance is incredibly easy! Simply sweep as needed and mop occasionally with any household cleaner. No special products or treatments required.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                    Does my residential garage floor come with a warranty?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Yes! Your residential garage floor comes with our limited lifetime warranty against peeling, discoloration, and cracking under normal home use.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                    Do you offer financing?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Yes. Get started for as low as $99 down with 0% financing.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7" className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                    How fast can I schedule?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    We often provide estimates the same day you contact us.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      
      <BookingModal 
        isOpen={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
      />
    </>;
};

export default GarageLandingForm;
