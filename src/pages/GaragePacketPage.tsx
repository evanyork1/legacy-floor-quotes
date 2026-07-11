import { Helmet } from "react-helmet-async";
import { Star } from "lucide-react";
import { InlineGaragePacket } from "@/components/packet/InlineGaragePacket";
import Footer from "@/components/Footer";
import garageHero from "@/assets/garage-packet-hero.webp";

const GaragePacketPage = () => {
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
  return <>
      <Helmet>
        <title>Garage Floor In One Day | Dallas-Fort Worth | Legacy Industrial</title>
        <meta name="description" content="Transform your garage floor in just one day. Professional polyurea coating with lifetime warranty. Book your free estimate today." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Blue Banner with Phone Number */}
        <div className="bg-blue-600 py-3">
          <a 
            href="tel:214-305-6516"
            className="flex items-center justify-center gap-2 text-white font-semibold hover:text-blue-100 transition-colors text-sm md:text-base"
          >
            <span>📞</span>
            <span>Call Us: 214-305-6516</span>
            <span>📞</span>
          </a>
        </div>

        {/* Simple Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          
        </header>

        {/* Hero Section - Full Width with Overlay */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
          <img 
            src={garageHero} 
            alt="Beautiful garage floor coating" 
            className="w-full h-[60vh] md:h-[70vh] object-cover" 
          loading="eager" decoding="async" fetchPriority="high" />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                {/* Google Reviews Badge */}
                <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md border border-gray-100 mb-4 sm:mb-6">
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
                  <span className="text-xs sm:text-sm font-medium text-gray-700">190+ Google Reviews</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
                  <span className="whitespace-nowrap">Your Dream Garage</span><br />
                  <span className="text-blue-600">In One Day</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-w-lg mx-auto px-2">
                  Preview color options, see pricing, and reserve your install in 60 seconds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline 3-Step Quote — replaces modal, always loaded */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-gray-100 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <InlineGaragePacket />
            </div>
          </div>
        </section>

        {/* Testimonials Section - Compact, No Title */}
        <section className="py-8 md:py-10 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                  <p className="text-gray-500 text-xs">{testimonial.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before & After Section - Same style as GarageLandingForm */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                We've Installed Over <span className="text-blue-600">4,000 Garage Floors</span> in Your Town
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                See real results from homeowners across Dallas–Fort Worth.
              </p>
            </div>

            <div className="grid gap-6 md:gap-8 max-w-5xl mx-auto">
              {/* Transformation 1 */}
              <div className="grid grid-cols-2 gap-2 h-48 sm:h-64 md:h-80">
                <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                  <img src="/lovable-uploads/64f61c96-ce73-4ef1-adb6-6e3d1644de30.png" alt="Before garage floor transformation" className="w-full h-full object-cover"  loading="eager" decoding="async" fetchPriority="high" />
                  <div className="absolute top-2 left-2 md:top-3 md:left-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] md:text-xs font-semibold">
                      BEFORE
                    </span>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                  <img src="/lovable-uploads/303d5679-dcda-4e82-b1da-4e309d1fb5dd.png" alt="After garage floor transformation with flake coating" className="w-full h-full object-cover"  loading="eager" decoding="async" fetchPriority="high" />
                  <div className="absolute top-2 left-2 md:top-3 md:left-3">
                    <span className="bg-white text-blue-600 px-2 py-1 rounded text-[10px] md:text-xs font-semibold border border-blue-600">
                      AFTER
                    </span>
                  </div>
                </div>
              </div>

              {/* Transformation 2 */}
              <div className="grid grid-cols-2 gap-2 h-48 sm:h-64 md:h-80">
                <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                  <img src="/lovable-uploads/f57a3511-7157-4235-ba23-509e1df21d59.png" alt="Before garage floor coating" className="w-full h-full object-cover"  loading="eager" decoding="async" fetchPriority="high" />
                  <div className="absolute top-2 left-2 md:top-3 md:left-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] md:text-xs font-semibold">
                      BEFORE
                    </span>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                  <img src="/lovable-uploads/002da108-5855-41da-aaea-3e1d1a9de98e.png" alt="After garage floor coating with premium finish" className="w-full h-full object-cover"  loading="eager" decoding="async" fetchPriority="high" />
                  <div className="absolute top-2 left-2 md:top-3 md:left-3">
                    <span className="bg-white text-blue-600 px-2 py-1 rounded text-[10px] md:text-xs font-semibold border border-blue-600">
                      AFTER
                    </span>
                  </div>
                </div>
              </div>

              {/* Transformation 3 */}
              <div className="grid grid-cols-2 gap-2 h-48 sm:h-64 md:h-80">
                <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                  <img src="/lovable-uploads/c499e5d5-764f-4feb-b2be-635e5b67ea69.png" alt="Before large garage transformation" className="w-full h-full object-cover"  loading="eager" decoding="async" fetchPriority="high" />
                  <div className="absolute top-2 left-2 md:top-3 md:left-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] md:text-xs font-semibold">
                      BEFORE
                    </span>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                  <img src="/lovable-uploads/e98aa310-42f2-46db-ac00-8502f2d71097.png" alt="After large garage floor coating" className="w-full h-full object-cover"  loading="eager" decoding="async" fetchPriority="high" />
                  <div className="absolute top-2 left-2 md:top-3 md:left-3">
                    <span className="bg-white text-blue-600 px-2 py-1 rounded text-[10px] md:text-xs font-semibold border border-blue-600">
                      AFTER
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Garage?
            </h2>
            <p className="text-blue-100 text-lg mb-6 max-w-xl mx-auto">
              Get a free, no-obligation estimate.
            </p>
            <CTAButton onClick={() => setShowQuoteModal(true)} variant="outline" size="lg" icon={<Calendar />} className="bg-white text-blue-600 hover:bg-gray-100 border-white">
              Get My Garage Price
            </CTAButton>
          </div>
        </section>

        <Footer />
      </div>

      <GaragePacketModal isOpen={showQuoteModal} onClose={() => setShowQuoteModal(false)} />
    </>;
};

export default GaragePacketPage;
