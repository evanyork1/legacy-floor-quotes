import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LeadForm } from "@/components/landing/LeadForm";
import { BookingModal } from "@/components/landing/BookingModal";
import { Building, Factory, Car, Plane, Dog, Church, Store, School, Utensils, ArrowRight, Phone, Calendar } from "lucide-react";
const Commercial = () => {
  const navigate = useNavigate();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const services = [{
    title: "Concrete Polishing",
    description: "Transform your concrete floors with our professional polishing services. Achieve a high-gloss, durable finish that's perfect for retail spaces, showrooms, and high-traffic commercial areas."
  }, {
    title: "Industrial Epoxy",
    description: "Heavy-duty epoxy systems designed for manufacturing, warehouses, and industrial facilities. Chemical resistant, extremely durable, and built to withstand the toughest conditions."
  }, {
    title: "Flake Floors",
    description: "Decorative and durable flake flooring systems perfect for commercial spaces. Provides excellent slip resistance, hides imperfections, and offers endless design possibilities for retail stores, restaurants, and showrooms."
  }];
  const applications = [{
    name: "Airplane Hangars",
    icon: <Plane className="h-6 w-6" />
  }, {
    name: "Warehouses",
    icon: <Factory className="h-6 w-6" />
  }, {
    name: "Manufacturing Plants",
    icon: <Factory className="h-6 w-6" />
  }, {
    name: "Car Dealerships",
    icon: <Car className="h-6 w-6" />
  }, {
    name: "Dog Kennels",
    icon: <Dog className="h-6 w-6" />
  }, {
    name: "Commercial Kitchens",
    icon: <Utensils className="h-6 w-6" />
  }, {
    name: "Wedding Venues",
    icon: <Church className="h-6 w-6" />
  }, {
    name: "Retail Stores",
    icon: <Store className="h-6 w-6" />
  }, {
    name: "Schools & Universities",
    icon: <School className="h-6 w-6" />
  }, {
    name: "Distribution Centers",
    icon: <Building className="h-6 w-6" />
  }, {
    name: "Food Processing",
    icon: <Utensils className="h-6 w-6" />
  }, {
    name: "And More",
    icon: <Building className="h-6 w-6" />
  }];
  const commercialImages = [{
    src: "/lovable-uploads/171b7f71-4aa3-4b54-8c96-5f7143dddebf.png",
    alt: "Commercial restaurant with polished concrete floors"
  }, {
    src: "/lovable-uploads/4a97932b-03f2-42ab-9e2f-2a90852befc0.png",
    alt: "Commercial restroom with epoxy flooring"
  }, {
    src: "/lovable-uploads/b5e6bdc4-80f9-44ea-a580-29d22662f7d4.png",
    alt: "Industrial floor coating detail"
  }, {
    src: "/lovable-uploads/85530262-ab7f-4339-af86-ed63ee721679.png",
    alt: "Commercial warehouse flooring"
  }, {
    src: "/lovable-uploads/57f768f2-8d88-45f9-9d4e-a4c13cf1ed0b.png",
    alt: "Industrial epoxy floor installation"
  }, {
    src: "/lovable-uploads/701db69b-4439-4779-9115-583d175298af.png",
    alt: "Helicopter hangar with polished concrete floors"
  }, {
    src: "/lovable-uploads/d1b328fa-3e30-4126-8266-ae64a33edd79.png",
    alt: "Medical facility with epoxy flooring"
  }, {
    src: "/lovable-uploads/36244d7f-fc1a-4402-928c-de98a796b0d7.png",
    alt: "Garage with polished concrete flooring"
  }, {
    src: "/lovable-uploads/79ce02fc-d147-4c75-b50f-753c518a0483.png",
    alt: "Aircraft maintenance hangar flooring"
  }];
  return <>
      <Helmet>
        <title>Commercial Epoxy Flooring DFW | Legacy Industrial Coatings</title>
        <meta name="description" content="Large-scale commercial epoxy flooring in Dallas-Fort Worth. Warehouses, dealerships, industrial facilities. Heavy-duty floor systems built to last." />
        <meta name="keywords" content="commercial flooring Dallas, industrial epoxy DFW, concrete polishing Dallas, warehouse flooring, retail store flooring, restaurant flooring" />
        
        {/* Geo-location meta tags */}
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Dallas" />
        <meta name="geo.position" content="32.7767;-96.7970" />
        <meta name="ICBM" content="32.7767, -96.7970" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Commercial Epoxy Flooring DFW | Legacy Industrial Coatings" />
        <meta property="og:description" content="Large-scale commercial epoxy flooring in Dallas-Fort Worth. Warehouses, dealerships, industrial facilities. Heavy-duty floor systems built to last." />
        <meta property="og:image" content="/lovable-uploads/171b7f71-4aa3-4b54-8c96-5f7143dddebf.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/commercial" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <HeaderGeneric />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-slate-100">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Professional <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Commercial Flooring</span> Solutions
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform your commercial space with our professional flooring systems. 
                  We specialize in industrial epoxy, concrete polishing, and decorative floors perfect for 
                  warehouses, retail stores, restaurants, and commercial facilities across Dallas-Fort Worth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => navigate('/contact')} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Call Us Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" onClick={() => setIsBookingModalOpen(true)} className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full transition-all duration-300">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book An Estimate
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-20"></div>
                <img src="/lovable-uploads/171b7f71-4aa3-4b54-8c96-5f7143dddebf.png" alt="Professional commercial flooring installation" className="relative w-full h-96 object-cover rounded-2xl shadow-2xl" loading="eager" decoding="async" fetchPriority="high" />
              </div>
            </div>
          </div>
        </section>

        {/* Commercial Floor Solutions */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                Our Commercial Solutions
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Durable, professional flooring systems designed for commercial and industrial environments
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {services.map((service, index) => <Card key={index} className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <Button variant="outline" onClick={() => navigate(service.title === "Concrete Polishing" ? "/concrete-polishing" : service.title === "Industrial Epoxy" ? "/industrial-epoxy" : "/flake-floors")} className="group-hover:bg-blue-50 border-blue-200 hover:border-blue-400">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>)}
              </div>
              
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl aspect-[3/2]">
                  <img src="/lovable-uploads/171b7f71-4aa3-4b54-8c96-5f7143dddebf.png" alt="Commercial flooring installation" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial Spaces */}
        <section className="py-20 bg-gradient-to-br from-slate-100 via-white to-blue-50/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/3 to-blue-800/3"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                Commercial Spaces We Install
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Professional flooring solutions for businesses across Dallas-Fort Worth
              </p>
            </div>

            {/* Applications Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
              {applications.map((app, index) => <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200/50 hover:bg-white/90 transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-1">
                  <div className="text-blue-600 mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {app.icon}
                  </div>
                  <p className="text-gray-800 text-sm font-medium">{app.name}</p>
                </div>)}
            </div>

            {/* Commercial Images Gallery */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {commercialImages.map((image, index) => <div key={index} className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl blur opacity-15"></div>
                  <div className="relative bg-white/90 rounded-xl aspect-[3/2] overflow-hidden border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"  loading="lazy" decoding="async" />
                  </div>
                </div>)}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        

        {/* Contact Form Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Get Your Commercial Quote
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Ready to transform your commercial space? Fill out the form below and we'll get back to you with a detailed quote.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        <Footer />
        
        <BookingModal 
          isOpen={isBookingModalOpen} 
          onClose={() => setIsBookingModalOpen(false)} 
        />
      </div>
    </>;
};
export default Commercial;