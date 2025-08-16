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
import { ArrowRight, Shield, Clock, Palette, Wrench, CheckCircle, Calendar, Phone } from "lucide-react";
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
                {/* Google Reviews Badge - positioned above title */}
                <div className="flex justify-center lg:justify-start mb-6">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <span className="font-bold text-blue-500">G</span>
                      <span className="font-bold text-red-500">o</span>
                      <span className="font-bold text-yellow-500">o</span>
                      <span className="font-bold text-blue-500">g</span>
                      <span className="font-bold text-green-500">l</span>
                      <span className="font-bold text-red-500">e</span>
                    </div>
                    <div className="flex items-center ml-2">
                      <span className="text-yellow-400 text-sm">★★★★★</span>
                      <span className="ml-1 text-gray-900 font-medium text-sm">170+</span>
                      <span className="ml-1 text-gray-600 text-sm">reviews</span>
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Premium <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Garage Floors</span><br className="lg:hidden" /> <span className="text-gray-900">in One Day</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform your garage with premium polyurea flake floor coatings. Our excellent service from start to finish ensures a beautiful, durable floor with lifetime warranty protection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <a href="tel:214-305-6516">
                      <Phone className="mr-2 h-5 w-5" />
                      214-305-6516
                    </a>
                  </Button>
                  <Button variant="outline" onClick={() => setShowBookingModal(true)} className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full transition-all duration-300">
                    <Calendar className="mr-2 h-5 w-5" />
                    Get My Free Estimate
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
        
        {/* Featured Google Review */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-blue-200 shadow-xl bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        M
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="font-bold text-gray-900 mr-2">Matthew Schultz</h3>
                        <span className="text-sm text-gray-500">Local Guide • 16 reviews • 10 photos</span>
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-lg">★</span>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">6 days ago</span>
                        <span className="ml-2 bg-green-600 text-white text-xs px-2 py-1 rounded">NEW</span>
                      </div>
                      <p className="text-gray-800 leading-relaxed text-lg">
                        <strong>Great price</strong><br />
                        Great communication, friendly service, excellent quality and a beautiful finished product. It is incredible how much better these floors make your garage look and feel. My wife said it made the garage feel like an extension of the house now. The team we interacted with was professional and it went from communication to completion. Easily one of the best (minor) investments we've made in our home.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <TestimonialsSection />
        
        {/* Legacy Service Experience Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl shadow-xl mb-6">
                  <div className="text-2xl font-bold mr-3">80%</div>
                  <div className="text-sm">Reviews mention our service</div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                  The <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Legacy Service</span> Experience
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    Over 80% of our Google reviews don't just talk about the floors, they talk about the experience. That's because what truly sets Legacy apart is how we take care of you from start to finish.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Instant Confirmations</h4>
                        <p className="text-gray-600">Booking confirmations and reminders</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Every Stage Updates</h4>
                        <p className="text-gray-600">Follow-up at every stage</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Always Informed</h4>
                        <p className="text-gray-600">Always know what's next</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Phone className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Direct Contact</h4>
                        <p className="text-gray-600">Just a call or text away</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    From your first conversation to the moment you walk across your finished floor, you'll feel the difference. It's more than just good communication—it's a service experience built with intention, powered by technology, and backed by people who genuinely care.
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-20"></div>
                <div className="relative">
                  <img 
                    src="/lovable-uploads/72eecda8-16d0-46b7-910a-0f72bee32409.png" 
                    alt="Legacy Industrial Coatings team member preparing garage floor with hand grinder" 
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <WhyChooseSection />
        

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