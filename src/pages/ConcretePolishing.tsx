import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building, Sparkles, Droplets, Recycle, CheckCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookingModal } from "@/components/landing/BookingModal";
const ConcretePolishing = () => {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const applications = [{
    icon: <Building className="h-8 w-8 text-blue-600" />,
    title: "Retail Stores",
    description: "High-gloss polished concrete creates an attractive, durable surface that enhances the shopping experience while reducing maintenance costs."
  }, {
    icon: <Sparkles className="h-8 w-8 text-blue-600" />,
    title: "Restaurants & Hospitality",
    description: "Easy-to-clean, stain-resistant surfaces perfect for food service environments requiring both aesthetics and hygiene."
  }, {
    icon: <Building className="h-8 w-8 text-blue-600" />,
    title: "Warehouses",
    description: "Dustproof, high-traffic surfaces that improve lighting efficiency and reduce maintenance in distribution and storage facilities."
  }, {
    icon: <Recycle className="h-8 w-8 text-blue-600" />,
    title: "Manufacturing",
    description: "Durable, chemical-resistant floors that withstand industrial processes while maintaining a professional appearance."
  }];
  const benefits = [{
    title: "Cost-Effective",
    description: "Transform existing concrete into beautiful, high-performance flooring without the need for additional materials or coatings."
  }, {
    title: "Sustainable Solution",
    description: "Eco-friendly process that utilizes existing concrete, reducing waste and environmental impact while improving performance."
  }, {
    title: "Enhanced Durability",
    description: "Densified concrete surface becomes harder, more abrasion-resistant, and less susceptible to damage and wear."
  }, {
    title: "Improved Safety",
    description: "Slip-resistant finish options available, along with better light reflectivity that enhances workplace safety and visibility."
  }];
  const polishLevels = [{
    level: "Level 1 - Cream Polish",
    description: "Light grinding and polishing for a smooth, low-sheen finish ideal for industrial applications.",
    applications: ["Warehouses", "Manufacturing facilities", "Back-of-house areas"]
  }, {
    level: "Level 2 - Salt & Pepper",
    description: "Medium grind exposing fine aggregate for moderate sheen and enhanced durability.",
    applications: ["Retail spaces", "Restaurants", "Office buildings"]
  }, {
    level: "Level 3 - Medium Aggregate",
    description: "Deeper grind exposing larger aggregate with high-gloss finish for maximum visual impact.",
    applications: ["Showrooms", "Hotels", "High-end retail spaces"]
  }];
  const features = ["Dust-free surface", "Chemical and stain resistant", "Non-slip texture options", "Enhanced light reflectivity", "Low maintenance requirements", "Long-lasting durability", "Environmentally friendly", "Cost-effective solution"];
  return <>
      <Helmet>
        <title>Concrete Polishing Services - Professional Polished Concrete Floors | Legacy Industrial Coatings</title>
        <meta name="description" content="Professional concrete polishing for commercial spaces. Transform existing concrete into beautiful, durable polished floors. Serving warehouses, retail, restaurants, and more." />
        <meta name="keywords" content="concrete polishing, polished concrete floors, commercial concrete polishing, warehouse polishing, retail floor polishing, restaurant flooring" />
        
        <meta property="og:title" content="Concrete Polishing Services - Professional Polished Concrete Floors | Legacy Industrial Coatings" />
        <meta property="og:description" content="Professional concrete polishing for commercial spaces. Transform existing concrete into beautiful, durable polished floors." />
        <meta property="og:image" content="/lovable-uploads/14a68967-8843-4c6d-b339-dd48a8e278ae.png" />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/concrete-polishing" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-slate-100">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Professional <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Concrete Polishing</span> Services
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform your existing concrete into beautiful, high-performance polished floors. 
                  Our professional concrete polishing services create durable, attractive surfaces perfect for 
                  commercial spaces, warehouses, retail stores, and restaurants.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => navigate('/contact')} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" onClick={() => setShowBookingModal(true)} className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full transition-all duration-300">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book An Estimate
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-20"></div>
                <img src="/lovable-uploads/14a68967-8843-4c6d-b339-dd48a8e278ae.png" alt="Beautiful polished concrete floor" className="relative w-full h-96 object-cover rounded-2xl shadow-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* What is Concrete Polishing Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                What is <span className="text-blue-600">Concrete Polishing?</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Concrete polishing is a mechanical process that uses progressively finer diamond grinding tools to create 
                a smooth, durable, and attractive floor surface from existing concrete. The process densifies the concrete, 
                making it harder, more stain-resistant, and easier to maintain while creating a beautiful high-gloss finish.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Performance Benefits</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>)}
                </div>
              </div>
              <div className="relative">
                <img src="/lovable-uploads/fee5b01c-b997-4a5e-994f-83f57fe35fbd.png" alt="Polished concrete floor in modern commercial space with reflective finish" className="w-full h-80 object-cover rounded-xl shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Perfect for Commercial Spaces
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Polished concrete is ideal for a wide range of commercial and industrial applications.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {applications.map((application, index) => <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/50">
                  <CardContent className="p-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {application.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{application.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{application.description}</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Polish Levels Section */}
        

        {/* Benefits Section */}
        

        {/* Process Section */}
        

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Transform Your Concrete Today
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Contact us for a free consultation and discover how polished concrete can enhance your commercial space 
              while reducing long-term maintenance costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/contact')} variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Get Free Consultation
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
export default ConcretePolishing;