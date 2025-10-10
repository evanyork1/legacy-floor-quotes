import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building, Sparkles, Droplets, Recycle, CheckCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookingModal } from "@/components/landing/BookingModal";
import polishingShowroom from "@/assets/polishing-gallery-showroom.jpg";
import polishingWarehouse from "@/assets/polishing-gallery-warehouse.jpg";
import polishingOffice from "@/assets/polishing-gallery-office.png";
const ConcretePolishing = () => {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const applications = [{
    icon: <Building className="h-8 w-8 text-blue-600" />,
    title: "Warehouses",
    description: "Dustproof surfaces that boost lighting and cut maintenance costs."
  }, {
    icon: <Building className="h-8 w-8 text-blue-600" />,
    title: "Retail Stores",
    description: "High-gloss finish that enhances customer experience and reduces upkeep."
  }, {
    icon: <Sparkles className="h-8 w-8 text-blue-600" />,
    title: "Restaurants & Hospitality",
    description: "Stain-resistant, easy-to-clean surface ideal for food service."
  }, {
    icon: <Recycle className="h-8 w-8 text-blue-600" />,
    title: "Manufacturing",
    description: "Chemical-resistant floors built for heavy industrial use."
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
                  Transform existing concrete into durable, high-performance polished floors for warehouses, retail, restaurants, and more.
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

        {/* Why Work With Legacy Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Work With <span className="text-blue-600">Legacy?</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Professional crews, industrial equipment, and a commitment to excellence on every project.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
                      <p className="text-gray-600">Day or night — we work around your operations to avoid disruptions.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Detail-Oriented Crews</h3>
                      <p className="text-gray-600">Clean, efficient teams that take pride in every job.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Competitive Pricing</h3>
                      <p className="text-gray-600">Fair pricing without cutting corners on quality or service.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Industrial-Grade Equipment</h3>
                      <p className="text-gray-600">Experienced technicians with professional tools deliver flawless results.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Visible Difference</h3>
                      <p className="text-gray-600">You'll see the difference in shine, safety, and speed of execution.</p>
                    </div>
                  </div>
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

        {/* Featured Projects Gallery */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Results That <span className="text-blue-600">Speak for Themselves</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From showrooms to warehouses, we deliver flawless finishes that last.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img src={polishingShowroom} alt="High-end automotive showroom with polished concrete floors showcasing luxury vehicles" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-6 font-semibold">Luxury Automotive Showroom</p>
                </div>
              </div>
              
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img src={polishingWarehouse} alt="Industrial warehouse polished concrete with yellow safety markings" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-6 font-semibold">Industrial Warehouse</p>
                </div>
              </div>
              
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img src={polishingOffice} alt="Modern dealership office space with polished concrete flooring" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-6 font-semibold">Modern Dealership Office</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Gallery Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Our <span className="text-blue-600">Recent Projects</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See the quality and craftsmanship of our polished concrete work.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img src="/src/assets/polishing-showroom-cars.jpg" alt="Polished concrete showroom floor with luxury vehicles" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-6 font-semibold">Automotive Showroom</p>
                </div>
              </div>
              
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img src="/src/assets/polishing-warehouse.jpg" alt="Industrial warehouse polished concrete floor" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-6 font-semibold">Warehouse Facility</p>
                </div>
              </div>
              
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img src="/src/assets/polishing-dealership-office.png" alt="Commercial office space with polished concrete" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-6 font-semibold">Dealership Office</p>
                </div>
              </div>
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
              Get a free consultation and discover how polished concrete enhances your space while cutting maintenance costs.
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