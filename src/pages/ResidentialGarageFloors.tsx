import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Shield, Clock, Palette, Wrench, CheckCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookingModal } from "@/components/landing/BookingModal";

const ResidentialGarageFloors = () => {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const benefits = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Lifetime Warranty",
      description: "Our residential garage floor coatings come with an industry-leading lifetime warranty, protecting your home investment for years to come."
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "One-Day Installation",
      description: "Transform your garage in just one day! Most residential garages are completed in a single day with minimal disruption to your routine."
    },
    {
      icon: <Palette className="h-8 w-8 text-blue-600" />,
      title: "Custom Design Options",
      description: "Choose from dozens of flake colors and patterns to create a garage floor that perfectly complements your home's style."
    },
    {
      icon: <Wrench className="h-8 w-8 text-blue-600" />,
      title: "Easy Home Maintenance",
      description: "Keep your garage floor looking pristine with simple sweeping and occasional mopping - no special cleaners required."
    }
  ];

  const features = [
    "Resists hot tire marks and oil stains",
    "Slip-resistant surface for family safety",
    "UV stable colors that won't fade or yellow",
    "Impact resistant against dropped tools",
    "Easy to clean with household products",
    "Adds value to your home"
  ];

  return (
    <>
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
                  Beautiful <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Garage Floors</span> for Your Home
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform your residential garage into a beautiful, functional space with our premium polyurea flake floor coatings. 
                  Designed specifically for homeowners who want a garage that's as impressive as the rest of their home. 
                  With lifetime warranty protection and same-day installation, it's the perfect home improvement investment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => navigate('/contact')}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowBookingModal(true)}
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full transition-all duration-300"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Get Free Home Estimate
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-20"></div>
                <img 
                  src="/lovable-uploads/8865d0d1-af13-4849-b194-a2611de34a0b.png" 
                  alt="Beautiful residential garage floor with polyurea flake coating" 
                  className="relative w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What Are Garage Floor Coatings Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Premium <span className="text-blue-600">Garage Floor Coatings</span> for Your Home
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our residential garage floor system combines a high-performance polyurea base with decorative vinyl flakes 
                and a crystal-clear protective topcoat. This creates a stunning, durable surface that transforms your garage 
                from a utilitarian space into a beautiful extension of your home. Say goodbye to stained, cracked concrete 
                and hello to a floor that adds real value to your property.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Perfect for Residential Garages</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/lovable-uploads/e6d46c38-cab4-4c0e-b5f7-a13f414dc01b.png" 
                  alt="Close-up of residential garage floor flake coating texture" 
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Homeowners Choose Our Garage Floors
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover why thousands of homeowners have chosen our garage floor coatings to enhance their homes.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/50">
                  <CardContent className="p-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Your Garage Floor Installation Process
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professional installation in your home ensures your garage floor will look amazing and perform for decades.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Home Consultation & Prep",
                  description: "We visit your home to assess your garage and thoroughly prepare the concrete surface, ensuring optimal results."
                },
                {
                  step: "02", 
                  title: "Premium Base Application",
                  description: "Our high-performance polyurea base coat is applied to your garage floor, providing superior durability for daily home use."
                },
                {
                  step: "03",
                  title: "Custom Flake Design",
                  description: "Your chosen decorative flakes are broadcast and sealed with a protective topcoat that will keep your garage beautiful for life."
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
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
              <Button 
                onClick={() => navigate('/contact')}
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowBookingModal(true)}
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full transition-all duration-300 bg-white/10"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Get Free Home Estimate
              </Button>
            </div>
          </div>
        </section>

        <BookingModal 
          isOpen={showBookingModal} 
          onClose={() => setShowBookingModal(false)} 
        />

        <Footer />
      </div>
    </>
  );
};

export default ResidentialGarageFloors;