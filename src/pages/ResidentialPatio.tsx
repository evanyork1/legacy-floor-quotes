import { Helmet } from "react-helmet-async";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ProcessSection from "@/components/sections/ProcessSection";
import { ArrowRight, Shield, Clock, Palette, Wrench, CheckCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookingModal } from "@/components/landing/BookingModal";
const ResidentialPatio = () => {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const benefits = [{
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    title: "Lifetime Warranty",
    description: "Our polyurea patio floors come with an industry-leading lifetime warranty, ensuring your outdoor investment is protected for years to come."
  }, {
    icon: <Clock className="h-8 w-8 text-blue-600" />,
    title: "Fast Installation",
    description: "Most residential patio projects can be completed in just one day, minimizing disruption to your outdoor living space."
  }, {
    icon: <Palette className="h-8 w-8 text-blue-600" />,
    title: "Customizable Design",
    description: "Choose from a wide variety of flake colors and patterns to create a unique patio surface that complements your outdoor décor and landscape."
  }, {
    icon: <Wrench className="h-8 w-8 text-blue-600" />,
    title: "Low Maintenance",
    description: "Once installed, patio flake floors require minimal maintenance - just simple cleaning with standard outdoor cleaning products."
  }];
  const features = ["Weather and UV resistant", "Slip-resistant texture for safety", "Freeze-thaw resistant", "Impact and abrasion resistant", "Easy to clean and maintain", "Available in multiple color combinations"];
  return <>
      <Helmet>
        <title>Polyurea Patio Floors - Premium Outdoor Patio Coatings | Legacy Industrial Coatings</title>
        <meta name="description" content="Transform your outdoor patio with our premium polyurea flake floors. Lifetime warranty, weather-resistant, and endless customization options. Perfect for outdoor living spaces." />
        <meta name="keywords" content="polyurea patio floors, outdoor patio coating, flake flooring, decorative concrete, patio renovation, outdoor floor coating Dallas, weather resistant flooring" />
        
        <meta property="og:title" content="Polyurea Patio Floors - Premium Outdoor Patio Coatings | Legacy Industrial Coatings" />
        <meta property="og:description" content="Transform your outdoor patio with our premium polyurea flake floors. Lifetime warranty, weather-resistant, and endless customization options." />
        <meta property="og:image" content="/lovable-uploads/7b59a18f-94c1-45aa-88f1-9bc7c3277305.png" />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/residential-patio" />
        <meta property="og:url" content="https://legacyindustrialcoatings.com/residential-patio" />
      </Helmet>

      <StructuredData
        services={[{ name: "Residential Patio Coatings", description: "Decorative polyurea flake and concrete overlay coatings for patios, pool decks, and outdoor living spaces — UV-stable, slip-resistant, and built for Texas weather across Dallas-Fort Worth.", url: "/residential-patio" }]}
      />

      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Residential", url: "/garagefloors" }, { name: "Patios", url: "/residential-patio" }]} />

      <div className="min-h-screen bg-white">
        <HeaderGeneric />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Premium <span className="text-blue-900">Patio Floors</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform your outdoor living space with our signature polyurea flake patio system. Designed specifically for outdoor environments, 
                  these floors combine superior weather resistance with stunning aesthetics. Perfect for patios, pool decks, outdoor entertainment areas, and walkways. With a lifetime warranty and endless customization options, it's the ideal solution for any outdoor space.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => navigate('/contact')} className="bg-blue-900 hover:bg-blue-950 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Call Us Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" onClick={() => setShowBookingModal(true)} className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full transition-all duration-300">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book An Estimate
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-900 rounded-2xl blur opacity-20"></div>
                <img src="/lovable-uploads/7b59a18f-94c1-45aa-88f1-9bc7c3277305.png" alt="Beautiful polyurea flake patio installation" className="relative w-full h-96 object-cover rounded-2xl shadow-2xl" loading="eager" decoding="async" fetchPriority="high" />
              </div>
            </div>
          </div>
        </section>

        {/* What Are Patio Flake Floors Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                What Are <span className="text-blue-600">Polyurea Patio Floors?</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Polyurea patio floors are our premium outdoor flooring solution that combines a high-performance polyurea base coat 
                with decorative vinyl flakes, topped with a crystal-clear protective topcoat. Specifically engineered for outdoor environments, these systems excel in patios, pool decks, outdoor kitchens, and entertainment areas. This versatile solution creates a durable, beautiful, and long-lasting outdoor floor that outperforms traditional concrete stains and sealers in every way.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Superior Outdoor Performance Features</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>)}
                </div>
              </div>
              <div className="relative">
                <img src="/lovable-uploads/527e9b8a-a124-4c0a-9735-37c08cb429b2.png" alt="Close-up of polyurea flake patio floor texture" className="w-full h-80 object-cover rounded-xl shadow-lg"  loading="eager" decoding="async" />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Patio Flake Floors?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the advantages that make polyurea flake floors the preferred choice for outdoor patios, pool decks, and entertainment spaces.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group hover:-translate-y-2 bg-white">
                  <CardContent className="p-6">
                    <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        <ProcessSection />

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600">
                  Common questions about our patio floor coating services
                </p>
              </div>
              
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                    How long does a patio floor coating take to install?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Most residential patio floors are installed in just one day, and ready for foot traffic within 24–48 hours.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                    Will the coating handle outdoor weather conditions?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Yes. Our polyurea patio coatings are specifically designed for outdoor use and resist UV rays, rain, freeze-thaw cycles, and temperature extremes without fading, cracking, or peeling.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                    Is the surface slip-resistant when wet?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Yes. The flake system provides excellent slip resistance, even when wet, making it safe for outdoor use around pools and in rainy conditions.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                    How do I clean and maintain my patio floor?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Simply hose down and scrub with mild soap as needed. Our coatings are non-porous and resist stains from food, drinks, and outdoor elements.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                    Do you offer a warranty on outdoor installations?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Yes. Most of our outdoor options do come with a warranty. Length depends on which option is chosen.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Transform Your Outdoor Space?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get a free quote for your custom polyurea patio floor installation. Our experts will help you choose the perfect design for your outdoor living space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/contact')} variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Call Us Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" onClick={() => setShowBookingModal(true)} className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full transition-all duration-300 bg-white/10">
                <Calendar className="mr-2 h-5 w-5" />
                Book An Estimate
              </Button>
            </div>
          </div>
        </section>

        <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />

        <Footer />
      </div>
    </>;
};
export default ResidentialPatio;