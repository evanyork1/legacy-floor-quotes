import { Helmet } from "react-helmet-async";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Factory, Shield, Zap, Truck, CheckCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookingModal } from "@/components/landing/BookingModal";

const IndustrialEpoxy = () => {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const applications = [
    {
      icon: <Factory className="h-8 w-8 text-blue-600" />,
      title: "Manufacturing Facilities",
      description: "Heavy-duty epoxy systems designed to withstand the demanding conditions of manufacturing environments, including chemical exposure and heavy machinery."
    },
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Warehouses & Distribution",
      description: "High-performance flooring solutions for logistics facilities, providing durability against constant forklift traffic and heavy load storage."
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "Airplane Hangars",
      description: "Specialized epoxy coatings engineered to handle aircraft weight loads, fuel spills, and extreme temperature variations in aviation facilities."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Food Processing Plants",
      description: "FDA-compliant epoxy systems that meet strict hygiene standards while providing chemical resistance against cleaning agents and food acids."
    }
  ];

  const features = [
    "Chemical and solvent resistant",
    "Heavy load bearing capacity",
    "Seamless, non-porous surface",
    "Easy to clean and sanitize",
    "Anti-static options available",
    "Thermal shock resistant",
    "Slip-resistant formulations",
    "Fast cure times for minimal downtime"
  ];

  const benefits = [
    {
      title: "Extreme Durability",
      description: "Our industrial epoxy systems are formulated to withstand the harshest commercial environments, providing decades of reliable service."
    },
    {
      title: "Chemical Resistance",
      description: "Superior resistance to acids, bases, solvents, and other aggressive chemicals commonly found in industrial applications."
    },
    {
      title: "Low Maintenance",
      description: "Seamless surfaces that are easy to clean and maintain, reducing long-term operational costs and downtime."
    },
    {
      title: "Custom Solutions",
      description: "Tailored formulations to meet specific industry requirements, including anti-static, conductive, and specialized coating systems."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Industrial Epoxy Flooring Dallas-Fort Worth | Legacy Industrial Coatings</title>
        <meta name="description" content="Heavy-duty industrial epoxy floor coatings for warehouses, manufacturing, and high-traffic facilities across DFW." />
        <meta name="keywords" content="industrial epoxy flooring, commercial floor coating, warehouse flooring, hangar flooring, manufacturing floor, food grade epoxy, chemical resistant flooring" />
        
        <meta property="og:title" content="Industrial Epoxy Flooring Dallas-Fort Worth | Legacy Industrial Coatings" />
        <meta property="og:description" content="Heavy-duty industrial epoxy floor coatings for warehouses, manufacturing, and high-traffic facilities across DFW." />
        <meta property="og:image" content="/lovable-uploads/7a412198-403e-4444-bc3d-56e2e28ac9fd.png" />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/industrial-epoxy" />
        <meta property="og:url" content="https://legacyindustrialcoatings.com/industrial-epoxy" />
      </Helmet>

      <StructuredData
        services={[{ name: "Industrial Epoxy Flooring", description: "High-performance industrial epoxy and urethane floor systems for warehouses, manufacturing plants, distribution centers, food processing, and aviation hangars across Dallas-Fort Worth.", url: "/industrial-epoxy" }]}
      />

      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Commercial", url: "/commercial" }, { name: "Industrial Epoxy", url: "/industrial-epoxy" }]} />

      <div className="min-h-screen bg-white">
        <HeaderGeneric />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Heavy-Duty <span className="text-blue-900">Industrial Epoxy</span> Flooring
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Cutting-edge epoxy materials engineered for the most demanding industrial environments. 
                  From airplane hangars to manufacturing facilities, our industrial-grade systems deliver unmatched performance and durability.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => navigate('/contact')}
                    className="bg-blue-900 hover:bg-blue-950 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Call Us Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowBookingModal(true)}
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full transition-all duration-300"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Book An Estimate
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-900 rounded-2xl blur opacity-20"></div>
                <img 
                  src="/lovable-uploads/7a412198-403e-4444-bc3d-56e2e28ac9fd.png" 
                  alt="Industrial epoxy flooring in commercial facility" 
                  className="relative w-full h-96 object-cover rounded-2xl shadow-2xl"
                loading="eager" decoding="async" fetchPriority="high" />
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Industrial Applications
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our industrial epoxy systems are designed for the most demanding commercial and industrial environments.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {applications.map((application, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group hover:-translate-y-2 bg-white">
                  <CardContent className="p-6">
                    <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {application.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{application.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{application.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features & Benefits Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Engineered for <span className="text-blue-600">Extreme Performance</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our industrial epoxy systems are formulated with the latest polymer technology to deliver superior performance 
                  in the most challenging industrial environments. Each system is custom-designed to meet the specific requirements 
                  of your facility.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Performance Features</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 relative">
                  <img 
                    src="/lovable-uploads/c7682b64-17bd-49b5-ac6c-96416093f159.png" 
                    alt="Helicopter hangar with industrial epoxy flooring" 
                    className="w-3/4 h-64 object-cover rounded-xl shadow-lg"
                   loading="eager" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Types Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Industrial Epoxy System Types
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose from our range of specialized epoxy systems, each engineered for specific industrial requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "High-Build Epoxy",
                  description: "Thick-film systems ideal for heavily trafficked areas requiring maximum durability and impact resistance.",
                  applications: ["Manufacturing floors", "Warehouse traffic lanes", "Loading docks"]
                },
                {
                  title: "Chemical-Resistant Epoxy",
                  description: "Specialized formulations designed to withstand aggressive chemicals and frequent washdowns.",
                  applications: ["Chemical processing", "Pharmaceutical facilities", "Food & beverage plants"]
                },
                {
                  title: "Conductive/Anti-Static",
                  description: "ESD-safe flooring systems for electronics manufacturing and other static-sensitive environments.",
                  applications: ["Electronics assembly", "Clean rooms", "Explosive environments"]
                }
              ].map((system, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{system.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{system.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Ideal for:</h4>
                      <ul className="space-y-1">
                        {system.applications.map((app, appIndex) => (
                          <li key={appIndex} className="text-gray-600 text-sm flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {app}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready for Industrial-Grade Performance?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Contact our industrial flooring specialists to discuss your project requirements and get a custom solution designed for your facility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Call Us Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowBookingModal(true)}
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full transition-all duration-300 bg-white/10"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book An Estimate
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

export default IndustrialEpoxy;