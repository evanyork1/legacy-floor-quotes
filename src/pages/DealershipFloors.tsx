import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Phone, CheckCircle2, Building2, Wrench, ParkingCircle, Store } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookingModal } from "@/components/landing/BookingModal";
const DealershipFloors = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const floorOptions = [{
    title: "Polished Concrete",
    description: "High-gloss finishes that create mirror-like reflections, elevating vehicle presentation and enhancing your brand image. Dust-free, low-maintenance surface ideal for customer-facing spaces.",
    icon: Store,
    image: "/lovable-uploads/placeholder-showroom.png",
    benefits: ["Mirror-like reflections", "Zero dust emission", "Minimal maintenance", "Enhanced aesthetics"]
  }, {
    title: "Epoxy Systems",
    description: "Chemical-resistant coatings engineered for service bays and maintenance areas. Withstands oils, fluids, and heavy equipment while maintaining a clean, professional appearance.",
    icon: Wrench,
    image: "/lovable-uploads/placeholder-maintenance.png",
    benefits: ["Chemical resistant", "Oil-proof surface", "Impact resistant", "Easy cleanup"]
  }, {
    title: "Traffic Coatings",
    description: "Heavy-duty systems designed for service lanes and parking decks. Prevents tire marking, resists wear from constant vehicle traffic, and maintains appearance in all weather conditions.",
    icon: ParkingCircle,
    image: "/lovable-uploads/placeholder-service-lane.png",
    benefits: ["Tire mark proof", "Extreme durability", "All-weather performance", "Custom striping"]
  }];
  const applications = [{
    name: "Showrooms",
    description: "Polished concrete with mirror-like clarity that showcases vehicles and reinforces brand excellence",
    icon: Store,
    image: "/lovable-uploads/placeholder-dealership-showroom.png"
  }, {
    name: "Service Lanes",
    description: "Traffic coatings engineered for constant vehicle movement and professional appearance",
    icon: ParkingCircle,
    image: "/lovable-uploads/placeholder-service-lane-2.png"
  }, {
    name: "Service Bays",
    description: "Epoxy systems resistant to chemicals, oils, and the rigors of daily maintenance operations",
    icon: Wrench,
    image: "/lovable-uploads/placeholder-maintenance-bay.png"
  }, {
    name: "Parking Structures",
    description: "Durable coatings for covered and exposed areas with superior weather resistance",
    icon: Building2,
    image: "/lovable-uploads/placeholder-parking-deck.png"
  }];
  const benefits = ["Enhanced Brand Image", "Chemical & Oil Resistance", "Easy Maintenance & Cleaning", "Long-Term Durability", "Safety & Slip Resistance", "Professional Appearance"];
  const galleryImages = [{
    src: "/lovable-uploads/placeholder-gallery-1.png",
    alt: "Dealership showroom with polished concrete flooring"
  }, {
    src: "/lovable-uploads/placeholder-gallery-2.png",
    alt: "Service lane with traffic coating striping"
  }, {
    src: "/lovable-uploads/placeholder-gallery-3.png",
    alt: "Maintenance bay with epoxy flooring"
  }, {
    src: "/lovable-uploads/placeholder-gallery-4.png",
    alt: "Luxury car on polished showroom floor"
  }, {
    src: "/lovable-uploads/placeholder-gallery-5.png",
    alt: "Service area with chemical-resistant coating"
  }, {
    src: "/lovable-uploads/placeholder-gallery-6.png",
    alt: "Parking deck with durable traffic coating"
  }];
  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion('tel:214-305-6516');
    }
  };
  return <>
      <Helmet>
        <title>Car Dealership Flooring Solutions Dallas-Fort Worth | Epoxy, Polished Concrete & Traffic Coatings</title>
        <meta name="description" content="Professional dealership flooring for showrooms, service lanes, and maintenance areas. Polished concrete, epoxy, and traffic coatings designed for Texas dealerships." />
        <meta name="keywords" content="dealership flooring Dallas, car dealership floors DFW, showroom flooring, service lane coatings, dealership epoxy, automotive flooring Texas" />
        <link rel="canonical" href="https://legacyepoxyfloors.com/dealershipfloors" />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#3b82f6] text-white overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2djRoLTR2LTRoNHptMCAxMnY0aC00di00aDR6bS0xMiAwdjRoLTR2LTRoNHptMTItMTJ2NGgtNHYtNGg0em0tMTIgMHY0aC00di00aDR6bTAgMTJ2NGgtNHYtNGg0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Main heading with better typography */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              Professional Dealership
              <br />
              <span className="text-white/90">Flooring Solutions</span>
            </h1>
            
            {/* Subtitle with improved spacing */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
              Premium flooring systems engineered for showrooms, service bays, and high-traffic areas
            </p>
            
            {/* CTA section with professional layout */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="tel:214-305-6516" 
                onClick={handlePhoneClick} 
                className="text-3xl md:text-4xl font-bold hover:text-white/80 transition-all duration-300 tracking-wide"
              >
                214-305-6516
              </a>
              <Button 
                size="lg" 
                onClick={() => setIsBookingOpen(true)} 
                className="bg-white text-blue-600 hover:bg-white/95 hover:scale-105 transition-all duration-300 text-lg px-10 py-7 shadow-xl font-semibold rounded-lg"
              >
                Schedule Free Estimate
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom fade effect */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Floor Options Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Specialized Flooring Systems</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three distinct solutions engineered for automotive environments
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {floorOptions.map((option, index) => <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <option.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{option.title}</h3>
                  <p className="text-muted-foreground mb-6">{option.description}</p>
                  <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center text-muted-foreground">
                    Image Placeholder: {option.title}
                  </div>
                  <ul className="space-y-2">
                    {option.benefits.map((benefit, idx) => <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                        {benefit}
                      </li>)}
                  </ul>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Why Dealerships Choose Legacy */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                The Legacy Advantage
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Minimal Disruption</h3>
                    <p className="text-muted-foreground">
                      Efficient installation schedules coordinated with your operations to keep your dealership running smoothly.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Show-Quality Results</h3>
                    <p className="text-muted-foreground">
                      Immaculate finishes that reflect your brand's commitment to excellence and enhance vehicle presentation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Long-Term Partnership</h3>
                    <p className="text-muted-foreground">
                      Comprehensive maintenance programs designed to preserve your investment and maintain pristine appearance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
              Image Placeholder: Professional dealership showroom with immaculate flooring
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Comprehensive Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Specialized flooring for every area of your automotive facility
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {applications.map((app, index) => <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <app.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-foreground">{app.name}</h3>
                      <p className="text-muted-foreground">{app.description}</p>
                    </div>
                  </div>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground mt-4">
                    Image Placeholder: {app.name}
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Performance Benefits</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Engineered specifically for automotive facility demands
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-all">
                <div className="flex items-center">
                  <CheckCircle2 className="w-6 h-6 mr-3 flex-shrink-0" />
                  <h3 className="text-lg font-semibold">{benefit}</h3>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Your Dealership Floors
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
            Schedule a free consultation to discuss your facility's flooring needs
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="tel:214-305-6516" onClick={handlePhoneClick} className="text-3xl md:text-4xl font-bold hover:text-blue-200 transition-colors">
              214-305-6516
            </a>
            <Button size="lg" onClick={() => setIsBookingOpen(true)} className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 shadow-lg">
              Schedule Free Estimate
            </Button>
          </div>
          <p className="mt-8 text-blue-100 text-lg">
            Serving Dallas-Fort Worth and surrounding areas
          </p>
        </div>
      </section>

      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>;
};
export default DealershipFloors;