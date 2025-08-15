import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { QuickFeaturesSection } from "@/components/sections/QuickFeaturesSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import EpoxyVsPolyureaSection from "@/components/sections/EpoxyVsPolyureaSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { ArrowRight, Shield, Clock, Palette, Wrench, CheckCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookingModal } from "@/components/landing/BookingModal";
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
  const features = ["Resists hot tire marks and oil stains", "Slip-resistant surface for family safety", "UV stable colors that won't fade or yellow", "Impact resistant against dropped tools", "Easy to clean with household products", "Adds value to your home"];
  return <>
      <Helmet>
        <title>Residential Garage Floor Coatings - Polyurea Flake Floors | Legacy Industrial Coatings</title>
        <meta name="description" content="Transform your residential garage with premium polyurea flake floor coatings. Lifetime warranty, one-day installation, and beautiful custom designs. Perfect for homeowners seeking durable garage floors." />
        <meta name="keywords" content="residential garage floors, garage floor coating, home garage renovation, polyurea garage floors, decorative garage flooring, garage makeover" />
        
        <meta property="og:title" content="Residential Garage Floor Coatings - Polyurea Flake Floors | Legacy Industrial Coatings" />
        <meta property="og:description" content="Transform your residential garage with premium polyurea flake floor coatings. Lifetime warranty, one-day installation, and beautiful custom designs." />
        <meta property="og:image" content="/lovable-uploads/8865d0d1-af13-4849-b194-a2611de34a0b.png" />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/residential-garage-floors" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-slate-100">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Premium <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Garage Floors</span><br className="lg:hidden" /> <span className="text-gray-900">in One Day</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform your garage with premium polyurea flake floor coatings. Our excellent service from start to finish ensures a beautiful, durable floor with lifetime warranty protection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => navigate('/contact')} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" onClick={() => setShowBookingModal(true)} className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full transition-all duration-300">
                    <Calendar className="mr-2 h-5 w-5" />
                    Get Free Home Estimate
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-20"></div>
                <img src="/lovable-uploads/8865d0d1-af13-4849-b194-a2611de34a0b.png" alt="Beautiful residential garage floor with polyurea flake coating" className="relative w-full h-96 object-cover rounded-2xl shadow-2xl" />
              </div>
            </div>
          </div>
        </section>
        
        <QuickFeaturesSection />
        
        <TestimonialsSection />
        
        <WhyChooseSection />
        
        {/* Legacy Service Experience Section */}
        <section className="py-24 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  ⭐ What Sets Us Apart
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                  The <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Legacy Service</span><br />Experience
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-3"></div>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      <span className="text-white font-semibold">80% of our Google reviews</span> talk about the experience customers had with our company, not just the product. That is why we are different.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-3"></div>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      You will always be <span className="text-white font-semibold">handled with care</span>, can call or text your point of contact, will not fall through the cracks, and we are your advisors.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-3"></div>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      <span className="text-white font-semibold">From the first conversation to a finished floor</span>, you'll experience what sets Legacy apart. We don't just install floors – we build relationships.
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-3xl blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
                  <img 
                    src="/lovable-uploads/72eecda8-16d0-46b7-910a-0f72bee32409.png" 
                    alt="Legacy Industrial Coatings team member preparing garage floor with hand grinder" 
                    className="w-full h-96 object-cover rounded-xl shadow-2xl" 
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl border border-blue-500">
                  <div className="text-3xl font-bold">80%</div>
                  <div className="text-sm opacity-90">Reviews mention our service</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Are Garage Floor Coatings Section */}
        

        <EpoxyVsPolyureaSection />

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
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Transform Your Garage?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get a free estimate for your residential garage floor coating. Our home improvement experts will help you design the perfect floor for your garage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/contact')} variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" onClick={() => setShowBookingModal(true)} className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full transition-all duration-300 bg-white/10">
                <Calendar className="mr-2 h-5 w-5" />
                Get Free Home Estimate
              </Button>
            </div>
          </div>
        </section>

        <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />

        <Footer />
      </div>
    </>;
};
export default ResidentialGarageFloors;