import { Helmet } from "react-helmet-async";
import { useState } from "react";
import GiveawayHeader from "@/components/GiveawayHeader";
import Footer from "@/components/Footer";
import EpoxyVsPolyureaSection from "@/components/sections/EpoxyVsPolyureaSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { LeadForm } from "@/components/landing/LeadForm";
import { BookingModal } from "@/components/landing/BookingModal";
import garageLandingHero from "@/assets/garage-landing-hero.jpg";
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
        <meta property="og:url" content="https://legacyindustrialcoatings.com/garagelandingform" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <GiveawayHeader />
        
        {/* Hero Section with Photo Background */}
        <section className="relative min-h-[600px] md:min-h-[700px] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img src={garageLandingHero} alt="Premium garage floor coating" className="w-full h-full object-cover" loading="eager" decoding="async" fetchpriority="high" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Column - Content */}
                <div className="text-left">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Get Your Dream Garage Floor{" "}
                    <span className="text-blue-400">In One Day</span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-xl">Stunning garage floors installed by Dallas' #1 crews.</p>
                  
                  {/* Google Reviews Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/20 mb-6">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">Google Reviews</span>
                      <span className="text-xs text-gray-300">200+ five star reviews</span>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-300">
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
        
        {/* Section Order: Reviews → Epoxy vs Polyurea → Process → Transformations */}
        <TestimonialsSection />
        
        <EpoxyVsPolyureaSection />
        
        <ProcessSection />
        
        {/* Real Garage Transformations Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Real Garage <span className="text-blue-900">Transformations</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                See real results from homeowners across Dallas–Fort Worth who upgraded their garage just like you're considering.
              </p>
            </div>
            
            <div className="grid gap-6 md:gap-8 lg:gap-12">
              {/* Transformation 1 */}
              <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
                <div className="grid grid-cols-2 gap-2 h-48 sm:h-64 md:h-80 lg:h-96">
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                    <img src="/lovable-uploads/64f61c96-ce73-4ef1-adb6-6e3d1644de30.png" alt="Before garage floor transformation" className="w-full h-full object-cover"  loading="eager" decoding="async" />
                    <div className="absolute top-2 left-2 md:top-3 md:left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] md:text-xs font-semibold">
                        BEFORE
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                    <img src="/lovable-uploads/303d5679-dcda-4e82-b1da-4e309d1fb5dd.png" alt="After garage floor transformation with flake coating" className="w-full h-full object-cover"  loading="eager" decoding="async" />
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
                    <img src="/lovable-uploads/f57a3511-7157-4235-ba23-509e1df21d59.png" alt="Before garage floor coating" className="w-full h-full object-cover"  loading="eager" decoding="async" />
                    <div className="absolute top-2 left-2 md:top-3 md:left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] md:text-xs font-semibold">
                        BEFORE
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                    <img src="/lovable-uploads/002da108-5855-41da-aaea-3e1d1a9de98e.png" alt="After garage floor coating with premium finish" className="w-full h-full object-cover"  loading="eager" decoding="async" />
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
                    <img src="/lovable-uploads/c499e5d5-764f-4feb-b2be-635e5b67ea69.png" alt="Before large garage transformation" className="w-full h-full object-cover"  loading="eager" decoding="async" />
                    <div className="absolute top-2 left-2 md:top-3 md:left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] md:text-xs font-semibold">
                        BEFORE
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                    <img src="/lovable-uploads/e98aa310-42f2-46db-ac00-8502f2d71097.png" alt="After large garage floor coating" className="w-full h-full object-cover"  loading="eager" decoding="async" />
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
                    <img src="/lovable-uploads/1e76caef-6851-4869-9f2e-df3b59bf64ef.png" alt="Before professional garage coating" className="w-full h-full object-cover"  loading="eager" decoding="async" />
                    <div className="absolute top-2 left-2 md:top-3 md:left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] md:text-xs font-semibold">
                        BEFORE
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                    <img src="/lovable-uploads/ef50769f-f8f0-4bd8-9f4c-5238689c933b.png" alt="After professional garage floor coating" className="w-full h-full object-cover"  loading="eager" decoding="async" />
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
        
        {/* Mid-Page CTA Form */}
        <section className="py-10 md:py-12 lg:py-16 bg-blue-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 px-4">
                  Ready to Transform Your Garage?
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-blue-100 px-4">
                  Get your free estimate today!
                </p>
              </div>
              <div className="max-w-2xl mx-auto">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      
      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
    </>;
};
export default GarageLandingForm;