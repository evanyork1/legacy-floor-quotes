import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Calendar, Building2, Users, ClipboardCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookingModal } from "@/components/landing/BookingModal";
import showroomCars from "@/assets/showroom-cars.jpg";
import warehousePolished from "@/assets/warehouse-polished.jpg";
import dealershipOffice from "@/assets/dealership-office-polished.png";

const ConcretePolishing = () => {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const benefits = [
    "Durable high-gloss finish that lasts 20+ years",
    "Reduces lighting costs by up to 30%",
    "Dust-free, easy to maintain surface",
    "Chemical and stain resistant",
    "Eco-friendly - uses existing concrete"
  ];

  const partnerships = [
    {
      icon: <Building2 className="h-6 w-6" />,
      text: "Trusted by general contractors, property managers, and facility owners across Texas"
    },
    {
      icon: <Users className="h-6 w-6" />,
      text: "We coordinate seamlessly with GCs and site teams to keep your schedule on track"
    },
    {
      icon: <ClipboardCheck className="h-6 w-6" />,
      text: "Professional crews that understand commercial construction and respect your jobsite"
    }
  ];

  return (
    <>
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
        <section className="pt-24 pb-16 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Professional Concrete Polishing
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Transform existing concrete into durable, high-gloss floors for commercial spaces, warehouses, and showrooms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/contact')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
                >
                  Get A Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowBookingModal(true)}
                  className="px-8 py-6 text-lg"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Walkthrough
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="relative h-96 overflow-hidden rounded-lg">
                <img 
                  src={showroomCars}
                  alt="Luxury car dealership showroom with polished concrete floors" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-96 overflow-hidden rounded-lg">
                <img 
                  src={warehousePolished}
                  alt="Industrial warehouse with polished concrete and yellow safety markings" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-96 overflow-hidden rounded-lg">
                <img 
                  src={dealershipOffice}
                  alt="Modern dealership office space with polished concrete flooring" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-96 overflow-hidden rounded-lg">
                <img 
                  src="/lovable-uploads/14a68967-8843-4c6d-b339-dd48a8e278ae.png" 
                  alt="High-gloss polished concrete floor reflecting overhead lighting" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Why Polished Concrete?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                Built for Collaboration
              </h2>
              <p className="text-xl text-gray-600 mb-12 text-center">
                Partner-driven approach that keeps projects clean, safe, and on schedule.
              </p>
              <div className="space-y-6">
                {partnerships.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-slate-50 rounded-lg">
                    <div className="text-blue-600 flex-shrink-0">
                      {item.icon}
                    </div>
                    <p className="text-lg text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <p className="text-lg text-gray-700 text-center font-medium">
                  Built for collaboration — from pre-construction planning to final polish.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Floors?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Get a free consultation and see how polished concrete can work for your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                variant="secondary"
                className="px-8 py-6 text-lg"
              >
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowBookingModal(true)}
                className="px-8 py-6 text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Estimate
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

export default ConcretePolishing;