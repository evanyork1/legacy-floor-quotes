import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Phone, CheckCircle2, Building2, Wrench, ParkingCircle, Store } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookingModal } from "@/components/landing/BookingModal";
import { OptimizedImage } from "@/components/OptimizedImage";
import heroImage from "@/assets/dealership-hero.jpg";
import officeImage from "@/assets/dealership-office.png";
import showroomImage from "@/assets/dealership-showroom.jpg";
import serviceBayImage from "@/assets/service-bay.jpg";
import serviceLaneImage from "@/assets/service-lane.jpg";
import parkingDeckImage from "@/assets/parking-deck.jpg";
const DealershipFloors = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const floorOptions = [{
    title: "Polished Concrete",
    description: "High-gloss finishes that create mirror-like reflections, elevating vehicle presentation and enhancing your brand image. Dust-free, low-maintenance surface ideal for customer-facing spaces.",
    icon: Store,
    image: showroomImage,
    benefits: ["Mirror-like reflections", "Zero dust emission", "Minimal maintenance", "Enhanced aesthetics"]
  }, {
    title: "Epoxy Systems",
    description: "Chemical-resistant coatings engineered for service bays and maintenance areas. Withstands oils, fluids, and heavy equipment while maintaining a clean, professional appearance.",
    icon: Wrench,
    image: serviceBayImage,
    benefits: ["Chemical resistant", "Oil-proof surface", "Impact resistant", "Easy cleanup"]
  }, {
    title: "Traffic Coatings",
    description: "Heavy-duty systems designed for service lanes and parking decks. Prevents tire marking, resists wear from constant vehicle traffic, and maintains appearance in all weather conditions.",
    icon: ParkingCircle,
    image: serviceLaneImage,
    benefits: ["Tire mark proof", "Extreme durability", "All-weather performance", "Custom striping"]
  }];
  const applications = [{
    name: "Showrooms",
    description: "Polished concrete with mirror-like clarity that showcases vehicles and reinforces brand excellence",
    icon: Store,
    image: showroomImage
  }, {
    name: "Service Lanes",
    description: "Traffic coatings engineered for constant vehicle movement and professional appearance",
    icon: ParkingCircle,
    image: serviceLaneImage
  }, {
    name: "Service Bays",
    description: "Epoxy systems resistant to chemicals, oils, and the rigors of daily maintenance operations",
    icon: Wrench,
    image: serviceBayImage
  }, {
    name: "Parking Structures",
    description: "Durable coatings for covered and exposed areas with superior weather resistance",
    icon: Building2,
    image: parkingDeckImage
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
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-navy-900 to-navy-800 text-primary-foreground overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 ring-1 ring-white/10 bg-white/5 text-white/90 text-xs font-medium tracking-widest uppercase">
                Automotive Facilities
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Professional Dealership Flooring Solutions
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed">
                Polished concrete, epoxy, and traffic coatings engineered for showrooms, service lanes, service bays, and parking structures.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-start gap-6">
                <a
                  href="tel:214-305-6516"
                  onClick={handlePhoneClick}
                  className="text-3xl md:text-4xl font-bold tracking-wide hover:text-white/90 transition-colors"
                >
                  214-305-6516
                </a>
                <Button
                  size="lg"
                  onClick={() => setIsBookingOpen(true)}
                  variant="secondary"
                  className="px-8 py-6 rounded-lg shadow-xl hover:shadow-2xl transition-all text-base font-semibold"
                >
                  Schedule Free Estimate
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:block hidden">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src={heroImage}
                  alt="Professional car dealership showroom with polished concrete flooring"
                  className="w-full h-[600px] object-cover"
                  priority
                />
                <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
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
                  <div className="aspect-video rounded-lg mb-6 overflow-hidden">
                    <OptimizedImage
                      src={option.image}
                      alt={`${option.title} for car dealerships`}
                      className="w-full h-full object-cover"
                    />
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
            <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
              <OptimizedImage
                src={officeImage}
                alt="Professional dealership office with polished concrete flooring"
                className="w-full h-full object-cover"
              />
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
                  <div className="aspect-video rounded-lg overflow-hidden mt-4">
                    <OptimizedImage
                      src={app.image}
                      alt={`${app.name} flooring for dealerships`}
                      className="w-full h-full object-cover"
                    />
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