import { Helmet } from "react-helmet-async";
import { Star } from "lucide-react";
import { InlineGaragePacket } from "@/components/packet/InlineGaragePacket";
import Footer from "@/components/Footer";
import HomepageFAQ from "@/components/sections/HomepageFAQ";
import garageHero from "@/assets/garage-packet-hero.webp";

const GaragePacketPage = () => {
  return <>
      <Helmet>
        <title>Garage Floor In One Day | Dallas-Fort Worth | Legacy Industrial</title>
        <meta name="description" content="Transform your garage floor in just one day. Professional polyurea coating with lifetime warranty. Book your free estimate today." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Slim Phone Banner */}
        <div className="bg-[#1e3a5f] py-2.5">
          <a
            href="tel:214-305-6516"
            className="flex items-center justify-center gap-2 text-white text-sm md:text-[15px] tracking-wide hover:text-blue-100 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span className="font-medium">Call or text</span>
            <span className="font-semibold tracking-tight">214-305-6516</span>
          </a>
        </div>

        {/* Simple Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          
        </header>

        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/70 z-10" />
          <img
            src={garageHero}
            alt="Premium polyurea garage floor coating in Dallas–Fort Worth"
            className="w-full h-[58vh] min-h-[440px] md:h-[68vh] object-cover"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                {/* Google Reviews Badge */}
                <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-sm border border-white/40 mb-5 sm:mb-6">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-800">4.9 · 200+ Google Reviews</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 leading-[1.05] tracking-tight">
                  Get Your Instant<br className="hidden sm:block" />
                  {" "}Garage Floor Price
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-200/90 max-w-xl mx-auto leading-relaxed">
                  Customize your floor, compare colors, and get your exact price instantly.
                  <br className="hidden sm:block" /> No sales visit. No waiting. No obligation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline 3-Step Quote */}
        <section className="py-10 md:py-14 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <InlineGaragePacket />
            </div>
          </div>
        </section>



        {/* Testimonials Section - One Massive Review + Stats */}
        <section className="py-10 md:py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Featured Review */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg border border-gray-100 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg sm:text-xl md:text-2xl text-gray-800 font-medium leading-relaxed mb-6">
                  "Incredible how much better these floors make your garage look and feel. My wife said it made the garage feel like an extension of the house now."
                </blockquote>
                <p className="font-semibold text-gray-900 text-base sm:text-lg">Matthew S.</p>
                <p className="text-gray-500 text-sm">Prosper, TX</p>
              </div>

              {/* Trust Stats */}
              <div className="mt-6 md:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { label: "200+", sub: "Five Star Reviews" },
                  { label: "4,000+", sub: "Trusted by Over 4,000 Homeowners Across DFW" },
                  { label: "Lifetime", sub: "Warranty" },
                  { label: "One Day", sub: "Installation" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white border border-gray-200 rounded-xl px-3 py-4 sm:py-5 text-center shadow-sm"
                  >
                    <p className="text-lg sm:text-xl font-bold text-blue-600">{stat.label}</p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{stat.sub}</p>
                  </div>
                ))}
              </div>
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
                  <img src="/lovable-uploads/64f61c96-ce73-4ef1-adb6-6e3d1644de30.png" alt="Before garage floor transformation" className="w-full h-full object-cover"  loading="eager" decoding="async" fetchpriority="high" />
                  <div className="absolute top-2 left-2 md:top-3 md:left-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] md:text-xs font-semibold">
                      BEFORE
                    </span>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                  <img src="/lovable-uploads/303d5679-dcda-4e82-b1da-4e309d1fb5dd.png" alt="After garage floor transformation with flake coating" className="w-full h-full object-cover"  loading="eager" decoding="async" fetchpriority="high" />
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
                  <img src="/lovable-uploads/f57a3511-7157-4235-ba23-509e1df21d59.png" alt="Before garage floor coating" className="w-full h-full object-cover"  loading="eager" decoding="async" fetchpriority="high" />
                  <div className="absolute top-2 left-2 md:top-3 md:left-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] md:text-xs font-semibold">
                      BEFORE
                    </span>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                  <img src="/lovable-uploads/002da108-5855-41da-aaea-3e1d1a9de98e.png" alt="After garage floor coating with premium finish" className="w-full h-full object-cover"  loading="eager" decoding="async" fetchpriority="high" />
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
                  <img src="/lovable-uploads/c499e5d5-764f-4feb-b2be-635e5b67ea69.png" alt="Before large garage transformation" className="w-full h-full object-cover"  loading="eager" decoding="async" fetchpriority="high" />
                  <div className="absolute top-2 left-2 md:top-3 md:left-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] md:text-xs font-semibold">
                      BEFORE
                    </span>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                  <img src="/lovable-uploads/e98aa310-42f2-46db-ac00-8502f2d71097.png" alt="After large garage floor coating" className="w-full h-full object-cover"  loading="eager" decoding="async" fetchpriority="high" />
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
        <section className="py-14 md:py-20 bg-[#0f1f3d] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#0f1f3d] to-black opacity-90" />
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
              Ready to see your price?
            </h2>
            <p className="text-blue-100/80 text-base md:text-lg mb-6 max-w-xl mx-auto">
              Choose your color and get your price in 60 seconds. No appointment needed.
            </p>
            <a
              href="#top"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 bg-white text-[#1e3a5f] font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get My Instant Price
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>
        </section>

        <HomepageFAQ />

        <Footer />
      </div>
    </>;
};

export default GaragePacketPage;
