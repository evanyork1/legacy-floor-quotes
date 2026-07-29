import { Helmet } from "react-helmet-async";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { QuickFeaturesSection } from "@/components/sections/QuickFeaturesSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import EpoxyVsPolyureaSection from "@/components/sections/EpoxyVsPolyureaSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ProcessSection from "@/components/sections/ProcessSection";

import { Shield, Clock, Palette, Wrench, CheckCircle, Calendar, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingModal } from "@/components/landing/BookingModal";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
const garageFaqs = [
  { question: "How long does the garage floor installation take at my home?", answer: "Most residential garage floors are completed in just one day. You can park your cars back in the garage within 24–48 hours." },
  { question: "What does a residential garage floor coating cost?", answer: "For a typical 2-3 car residential garage using our premium polyurea flake system, pricing ranges from $2,800–$4,500. This investment adds significant value to your home while providing a lifetime of beauty and durability." },
  { question: "Will my garage floor coating handle daily home use?", answer: "Absolutely! Our residential garage floors are designed to handle everything from hot tires and oil drips to kids' bikes and home storage. The coating won't chip, peel, or stain under normal home use." },
  { question: "How do I maintain my garage floor?", answer: "Maintenance is incredibly easy! Simply sweep as needed and mop occasionally with any household cleaner. No special products or treatments required." },
  { question: "Does my residential garage floor come with a warranty?", answer: "Yes! Your residential garage floor comes with our limited lifetime warranty against peeling, discoloration, and cracking under normal home use." },
  { question: "Do you offer financing?", answer: "Yes. Get started for as low as $99 down with 0% financing." },
  { question: "How fast can I schedule?", answer: "We often provide estimates the same day you contact us." },
];

const ResidentialGarageFloors = () => {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const benefits = [{
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    title: "Lifetime Warranty",
    description: "Our residential garage floor coatings come with an industry-leading lifetime warranty, protecting your home investment for years to come."
  }, {
    icon: <Clock className="h-8 w-8 text-blue-600" />,
    title: "One-Day Installation",
    description: "Transform your garage in just one day! Most residential garages are completed in a single day with minimal disruption to your routine."
  }, {
    icon: <Palette className="h-8 w-8 text-blue-600" />,
    title: "Custom Design Options",
    description: "Choose from dozens of flake colors and patterns to create a garage floor that perfectly complements your home's style."
  }, {
    icon: <Wrench className="h-8 w-8 text-blue-600" />,
    title: "Easy Home Maintenance",
    description: "Keep your garage floor looking pristine with simple sweeping and occasional mopping - no special cleaners required."
  }];
  return <>
      <Helmet>
        <title>Residential Garage Floor Coatings - Polyurea Flake Floors | Legacy Industrial Coatings</title>
        <meta name="description" content="Transform your residential garage with premium polyurea flake floor coatings. Lifetime warranty, one-day installation, and beautiful custom designs. Perfect for homeowners seeking durable garage floors." />
        <meta name="keywords" content="residential garage floors, garage floor coating, home garage renovation, polyurea garage floors, decorative garage flooring, garage makeover" />
        
        <meta property="og:title" content="Residential Garage Floor Coatings - Polyurea Flake Floors | Legacy Industrial Coatings" />
        <meta property="og:description" content="Transform your residential garage with premium polyurea flake floor coatings. Lifetime warranty, one-day installation, and beautiful custom designs." />
        <meta property="og:image" content="/lovable-uploads/8865d0d1-af13-4849-b194-a2611de34a0b.png" />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/garagefloors" />
        <meta property="og:url" content="https://legacyindustrialcoatings.com/garagefloors" />
      </Helmet>

      <StructuredData
        services={[{ name: "Residential Garage Floor Coatings", description: "Premium polyurea flake garage floor coatings for homeowners — installed in one day with a lifetime warranty across Dallas-Fort Worth.", url: "/garagefloors" }]}
        faqs={garageFaqs}
      />

      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Residential", url: "/garagefloors" }, { name: "Garage Floors", url: "/garagefloors" }]} />

      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 md:pt-32 pb-10 md:pb-20 bg-slate-50">
          <div className="container mx-auto px-5 w-full">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              <div className="text-center lg:text-left">
                {/* Reviews Badge */}
                <div className="flex justify-center lg:justify-start mb-5">
                  <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
                    <span className="text-yellow-400 text-sm tracking-tight">★★★★★</span>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">200+ Google reviews</span>
                  </div>
                </div>
                <h1 className="text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
                  Premium <span className="text-blue-900">Garage Floors</span> in One Day
                </h1>
                <p className="text-base sm:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed max-w-md mx-auto lg:mx-0 lg:max-w-none">
                  Transform your garage with premium polyurea flake coatings — beautiful, durable, and backed by a lifetime warranty.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Button onClick={() => setShowBookingModal(true)} className="bg-blue-900 hover:bg-blue-950 text-white h-12 px-6 rounded-md text-base font-semibold shadow-sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book My Free Estimate
                  </Button>
                  <Button asChild variant="outline" className="border-gray-300 text-gray-900 hover:bg-gray-50 h-12 px-6 rounded-md text-base font-semibold">
                    <a href="tel:214-305-6516">
                      <Phone className="mr-2 h-4 w-4" />
                      214-305-6516
                    </a>
                  </Button>
                </div>
              </div>
              <div className="relative mt-6 lg:mt-0">
                <div className="relative h-[260px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-2xl shadow-lg">
                  <div className="grid grid-cols-2 h-full gap-1">
                    <div className="relative overflow-hidden">
                      <img src="/lovable-uploads/69253a31-4762-4988-897d-8bc135fd43bd.png" alt="Before: concrete garage floor" className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-black/70 backdrop-blur text-white px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide">BEFORE</span>
                      </div>
                    </div>
                    <div className="relative overflow-hidden">
                      <img src="/lovable-uploads/b4732a11-b0eb-48f7-9950-d9c8e186ab97.png" alt="After: polyurea flake garage floor" className="w-full h-full object-cover" loading="eager" decoding="async" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-white text-blue-900 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide shadow-sm">AFTER</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        
        {/* Video Showcase Section */}
        <section className="py-10 md:py-20 bg-white">
          <div className="container mx-auto px-5">
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-black aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/LIHMnK4rbyc?si=uNfk1Jr8mpHX-RUS"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="flex justify-center mt-6 md:mt-8">
                <Button
                  onClick={() => setShowBookingModal(true)}
                  className="bg-blue-900 hover:bg-blue-950 text-white h-12 px-6 rounded-md text-base font-semibold shadow-sm"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Book A Free Estimate
                </Button>
              </div>
            </div>
          </div>
        </section>

        
        {/* Legacy Service Experience Section */}
        <section className="py-12 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center bg-blue-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg mb-6">
                  <div className="text-xl sm:text-2xl font-bold mr-2 sm:mr-3">80%</div>
                  <div className="text-xs sm:text-sm">Reviews mention our service</div>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
                  The <span className="text-blue-900">Legacy Service</span> Experience
                </h2>
                <div className="space-y-4 md:space-y-6">
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 md:mb-6">
                    Over 80% of our Google reviews don't just talk about the floors, they talk about the experience. That's because what truly sets Legacy apart is how we take care of you from start to finish.
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="relative">
                  <img src="/lovable-uploads/72eecda8-16d0-46b7-910a-0f72bee32409.png" alt="Legacy Industrial Coatings team member preparing garage floor with hand grinder" className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg border border-gray-200"  loading="eager" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <EpoxyVsPolyureaSection />
        
        <WhyChooseSection />
        
        <ProcessSection />

        {/* Before & After Showcase Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Real Garage <span className="text-blue-900">Transformations</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                See how we transform ordinary concrete floors into stunning, durable surfaces that homeowners love
              </p>
            </div>
            
            <div className="grid gap-8 lg:gap-12">
              {/* Transformation 1 */}
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                <div className="grid grid-cols-2 gap-2 h-64 sm:h-80 lg:h-96">
                  <div className="relative overflow-hidden rounded-lg">
                    <img src="/lovable-uploads/64f61c96-ce73-4ef1-adb6-6e3d1644de30.png" alt="Before garage floor transformation" className="w-full h-full object-cover"  loading="eager" decoding="async" />
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        BEFORE
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg">
                    <img src="/lovable-uploads/303d5679-dcda-4e82-b1da-4e309d1fb5dd.png" alt="After garage floor transformation with flake coating" className="w-full h-full object-cover"  loading="eager" decoding="async" />
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
                    A typical residential garage transformation showing how our flake floor coating system turns an ordinary concrete floor into a showroom-quality surface that adds value to the home.
                  </p>
                </div>
                <div className="order-1 lg:order-2 grid grid-cols-2 gap-2 h-64 sm:h-80 lg:h-96">
                  <div className="relative overflow-hidden rounded-lg">
                    <img src="/lovable-uploads/f57a3511-7157-4235-ba23-509e1df21d59.png" alt="Before garage floor coating" className="w-full h-full object-cover"  loading="eager" decoding="async" />
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        BEFORE
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg">
                    <img src="/lovable-uploads/002da108-5855-41da-aaea-3e1d1a9de98e.png" alt="After garage floor with beautiful flake finish" className="w-full h-full object-cover"  loading="eager" decoding="async" />
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                      <span className="bg-white text-blue-600 px-2 py-1 rounded text-xs font-semibold border border-blue-600">
                        AFTER
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transformation 3 - Large Space */}
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                <div className="grid grid-cols-2 gap-2 h-64 sm:h-80 lg:h-96">
                  <div className="relative overflow-hidden rounded-lg">
                    <img src="/lovable-uploads/c499e5d5-764f-4feb-b2be-635e5b67ea69.png" alt="Before large garage space concrete floor" className="w-full h-full object-cover"  loading="eager" decoding="async" />
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        BEFORE
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg">
                    <img src="/lovable-uploads/e98aa310-42f2-46db-ac00-8502f2d71097.png" alt="After large garage space with premium flake coating" className="w-full h-full object-cover"  loading="eager" decoding="async" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white text-blue-600 px-2 py-1 rounded text-xs font-semibold border border-blue-600">
                        AFTER
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lg:pl-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Large Space Transformation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Even larger garage spaces benefit tremendously from our coating systems. This transformation shows how our flake floors can completely change the look and feel of any size garage space.
                  </p>
                </div>
              </div>

              {/* Transformation 4 */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1 lg:pr-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Results Every Time</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our process consistently delivers beautiful results. From preparation to final topcoat, every step is performed with precision to ensure your garage floor looks perfect and lasts for decades.
                  </p>
                </div>
                <div className="order-1 lg:order-2 grid grid-cols-2 gap-2 h-80 lg:h-96">
                  <div className="relative overflow-hidden rounded-lg">
                    <img src="/lovable-uploads/1e76caef-6851-4869-9f2e-df3b59bf64ef.png" alt="Before garage floor concrete surface" className="w-full h-full object-cover"  loading="eager" decoding="async" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        BEFORE
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg">
                    <img src="/lovable-uploads/ef50769f-f8f0-4bd8-9f4c-5238689c933b.png" alt="After professional garage floor coating installation" className="w-full h-full object-cover"  loading="eager" decoding="async" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white text-blue-600 px-2 py-1 rounded text-xs font-semibold border border-blue-600">
                        AFTER
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* FAQ Section */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container mx-auto px-5">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                  Homeowner Questions
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  Common questions about our garage floor coatings
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {garageFaqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i+1}`} className="border border-gray-200 rounded-xl px-5 sm:px-6 bg-white">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-900 text-sm sm:text-base py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-14 md:py-20 bg-blue-900 text-white">
          <div className="container mx-auto px-5 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 tracking-tight">
              Ready to Transform Your Garage?
            </h2>
            <p className="text-base sm:text-xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto">
              Get a free estimate on your residential garage floor coating.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto sm:max-w-none">
              <Button onClick={() => setShowBookingModal(true)} className="bg-white hover:bg-gray-100 text-blue-900 h-12 px-6 rounded-md text-base font-semibold">
                <Calendar className="mr-2 h-4 w-4" />
                Book My Free Estimate
              </Button>
              <Button asChild variant="outline" className="border-white/40 text-white hover:bg-white hover:text-blue-900 h-12 px-6 rounded-md text-base font-semibold bg-transparent">
                <a href="tel:214-305-6516">
                  <Phone className="mr-2 h-4 w-4" />
                  214-305-6516
                </a>
              </Button>
            </div>
          </div>
        </section>



        <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
        <StickyMobileCTA />

        <Footer />
      </div>
    </>;
};
export default ResidentialGarageFloors;