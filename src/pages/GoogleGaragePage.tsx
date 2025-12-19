import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Phone, Star, Trophy, MapPin, ArrowUp } from "lucide-react";
import { SimpleLeadModal } from "@/components/landing/SimpleLeadModal";
import { CTAButton } from "@/components/ui/cta-button";
import Footer from "@/components/Footer";
import garagePacketHero from "@/assets/garage-packet-hero.jpg";
import ProcessSection from "@/components/sections/ProcessSection";

const GoogleGaragePage = () => {
  const [showLeadModal, setShowLeadModal] = useState(false);
  const testimonials = [{
    name: "Matthew S.",
    location: "Prosper, TX",
    text: "Incredible how much better these floors make your garage look and feel. My wife said it made the garage feel like an extension of the house now.",
    rating: 5
  }, {
    name: "Bharat A.",
    location: "Frisco, TX",
    text: "Excellent experience from start to finish. The crew did an amazing job with the final result.",
    rating: 5
  }, {
    name: "Scott C.",
    location: "McKinney, TX",
    text: "Totally exceeded my expectations. Crew was experienced and professional. Finished floor is amazing.",
    rating: 5
  }, {
    name: "Chris C.",
    location: "Plano, TX",
    text: "Great company to work with. Competent, genuinely helpful staff. Would highly recommend!",
    rating: 5
  }];

  const transformations = [
    {
      before: "/lovable-uploads/64f61c96-ce73-4ef1-adb6-6e3d1644de30.png",
      after: "/lovable-uploads/303d5679-dcda-4e82-b1da-4e309d1fb5dd.png",
      beforeAlt: "Before garage floor transformation",
      afterAlt: "After garage floor transformation with flake coating"
    },
    {
      before: "/lovable-uploads/f57a3511-7157-4235-ba23-509e1df21d59.png",
      after: "/lovable-uploads/002da108-5855-41da-aaea-3e1d1a9de98e.png",
      beforeAlt: "Before garage floor coating",
      afterAlt: "After garage floor coating with premium finish"
    },
    {
      before: "/lovable-uploads/c499e5d5-764f-4feb-b2be-635e5b67ea69.png",
      after: "/lovable-uploads/e98aa310-42f2-46db-ac00-8502f2d71097.png",
      beforeAlt: "Before large garage transformation",
      afterAlt: "After large garage floor coating"
    },
    {
      before: "/lovable-uploads/1e76caef-6851-4869-9f2e-df3b59bf64ef.png",
      after: "/lovable-uploads/ef50769f-f8f0-4bd8-9f4c-5238689c933b.png",
      beforeAlt: "Before residential garage floor",
      afterAlt: "After residential garage floor with flake finish"
    },
    {
      before: "/lovable-uploads/69253a31-4762-4988-897d-8bc135fd43bd.png",
      after: "/lovable-uploads/b4732a11-b0eb-48f7-9950-d9c8e186ab97.png",
      beforeAlt: "Before garage concrete floor",
      afterAlt: "After beautiful polyurea garage floor"
    }
  ];

  return <>
      <Helmet>
        <title>Garage Floor In One Day | Dallas-Fort Worth | Legacy Industrial</title>
        <meta name="description" content="Transform your garage floor in just one day. Professional polyurea coating with lifetime warranty. Book your free estimate today." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Sticky Phone Banner */}
        <div className="bg-blue-600 py-2 sticky top-0 z-50">
          <a href="tel:214-444-6269" className="flex items-center justify-center gap-2 text-white font-semibold hover:text-blue-100 transition-colors">
            <Phone className="h-4 w-4" />
            <span>(214) 444-6269</span>
          </a>
        </div>

        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-10" />
          <img src={garagePacketHero} alt="Beautiful garage floor coating" className="w-full h-[85vh] sm:h-[75vh] md:h-[80vh] object-cover" />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                {/* Google Reviews Badge */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg border border-gray-100 mb-8 sm:mb-10">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">180+ 5 Star Reviews</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 whitespace-nowrap">
                  Get Your Dream Garage
                </h1>
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-400 mb-8 sm:mb-10">
                  In One Day
                </p>
                <p className="text-lg sm:text-xl text-gray-200 mb-10 sm:mb-12 max-w-xl mx-auto">
                  Shockingly beautiful, lifetime warranty, installed in only one day.
                </p>
                
                {/* Primary CTA */}
                <button 
                  onClick={() => setShowLeadModal(true)} 
                  className="bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg ring-2 ring-white/40 transition-all duration-200 hover:ring-white/60"
                >
                  Get A Free Estimate
                </button>

                {/* Arrow and Join text */}
                <div className="mt-6 flex flex-col items-center">
                  <ArrowUp className="h-5 w-5 text-white animate-bounce" />
                  <p className="text-white text-sm font-medium mt-2">
                    Join over 3,000 homeowners in DFW
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            {/* Voted #1 Banner */}
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-yellow-500 text-gray-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg text-xs sm:text-sm md:text-base font-bold">
                <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Voted #1 Floor Company in Plano 2025</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />)}
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3 line-clamp-3">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm">{testimonial.name}</p>
                  <p className="text-gray-500 text-[10px] sm:text-xs">{testimonial.location}</p>
                </div>
              ))}
            </div>

            {/* Service Area Message */}
            <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8 text-gray-600">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <p className="text-sm sm:text-base md:text-lg font-medium">
                Proudly serving the entire DFW Metroplex and beyond
              </p>
            </div>

            {/* CTA after testimonials */}
            <div className="flex justify-center mt-6 sm:mt-8">
              <button 
                onClick={() => setShowLeadModal(true)} 
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-md transition-colors"
              >
                Get A Free Quote
              </button>
            </div>
          </div>
        </section>

        {/* Before & After Section */}
        <section className="py-8 sm:py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                Real Garage <span className="text-blue-600">Transformations</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
                See real results from homeowners across Dallas–Fort Worth.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
              {transformations.slice(0, 3).map((transformation, index) => (
                <div key={index} className="grid grid-cols-2 gap-1.5 sm:gap-2 h-40 sm:h-56 md:h-72 lg:h-80">
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                    <img src={transformation.before} alt={transformation.beforeAlt} className="w-full h-full object-cover" />
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 md:top-3 md:left-3">
                      <span className="bg-blue-600 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[9px] sm:text-[10px] md:text-xs font-semibold">
                        BEFORE
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                    <img src={transformation.after} alt={transformation.afterAlt} className="w-full h-full object-cover" />
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 md:top-3 md:left-3">
                      <span className="bg-white text-blue-600 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[9px] sm:text-[10px] md:text-xs font-semibold border border-blue-600">
                        AFTER
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA after first 3 transformations */}
            <div className="flex justify-center mt-6 sm:mt-8">
              <button 
                onClick={() => setShowLeadModal(true)} 
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-md transition-colors"
              >
                Get A Free Quote
              </button>
            </div>

            {/* More transformations */}
            <div className="grid gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto mt-6 sm:mt-8">
              {transformations.slice(3).map((transformation, index) => (
                <div key={index} className="grid grid-cols-2 gap-1.5 sm:gap-2 h-40 sm:h-56 md:h-72 lg:h-80">
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                    <img src={transformation.before} alt={transformation.beforeAlt} className="w-full h-full object-cover" />
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 md:top-3 md:left-3">
                      <span className="bg-blue-600 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[9px] sm:text-[10px] md:text-xs font-semibold">
                        BEFORE
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                    <img src={transformation.after} alt={transformation.afterAlt} className="w-full h-full object-cover" />
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 md:top-3 md:left-3">
                      <span className="bg-white text-blue-600 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[9px] sm:text-[10px] md:text-xs font-semibold border border-blue-600">
                        AFTER
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <ProcessSection />

        {/* Final CTA Section */}
        <section className="py-10 sm:py-12 md:py-16 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Ready to Transform Your Garage?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-5 sm:mb-6 max-w-xl mx-auto px-2">
              Get a free, no-obligation estimate. Same-day appointments available.
            </p>
            <button 
              onClick={() => setShowLeadModal(true)} 
              className="w-full sm:w-auto bg-white hover:bg-gray-100 text-blue-600 text-lg sm:text-xl font-bold px-8 sm:px-12 py-4 sm:py-5 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Get A Free Estimate Now →
            </button>
          </div>
        </section>

        <Footer />
      </div>

      <SimpleLeadModal isOpen={showLeadModal} onClose={() => setShowLeadModal(false)} />
    </>;
};
export default GoogleGaragePage;
