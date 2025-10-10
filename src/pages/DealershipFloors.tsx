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
    title: "Polished Concrete for Showrooms",
    description: "High-gloss, impressive finishes that elevate presentation and impress clients. Our polished concrete creates mirror-like reflections that showcase your vehicles in the best possible light.",
    icon: Store,
    image: "/lovable-uploads/placeholder-showroom.png",
    benefits: ["Mirror-like finish", "Enhances vehicle presentation", "Low maintenance", "Dust-free surface"]
  }, {
    title: "Epoxy for Maintenance Areas",
    description: "Oil and spill-resistant systems that handle the toughest service bay conditions. Chemical-resistant formulations designed specifically for automotive fluids and heavy-duty shop operations.",
    icon: Wrench,
    image: "/lovable-uploads/placeholder-maintenance.png",
    benefits: ["Chemical resistant", "Oil & fluid proof", "Easy to clean", "Impact resistant"]
  }, {
    title: "Traffic Coatings for Service Lanes",
    description: "Heavy-duty systems that prevent wear and tire marking in high-traffic service lanes and parking decks. Engineered to withstand constant vehicle traffic and maintain professional appearance.",
    icon: ParkingCircle,
    image: "/lovable-uploads/placeholder-service-lane.png",
    benefits: ["Tire mark resistant", "High traffic durability", "Weather resistant", "Professional striping"]
  }];
  const applications = [{
    name: "Showrooms",
    description: "Mirror-like polished concrete that creates stunning reflections and elevates vehicle presentation",
    icon: Store,
    image: "/lovable-uploads/placeholder-dealership-showroom.png"
  }, {
    name: "Service Lanes",
    description: "Durable traffic coatings that handle heavy vehicle traffic and resist tire marking",
    icon: ParkingCircle,
    image: "/lovable-uploads/placeholder-service-lane-2.png"
  }, {
    name: "Maintenance Areas",
    description: "Chemical-resistant epoxy that stands up to oils, fluids, and daily shop operations",
    icon: Wrench,
    image: "/lovable-uploads/placeholder-maintenance-bay.png"
  }, {
    name: "Parking Decks",
    description: "Weather-resistant systems designed for both covered and exposed parking areas",
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
      <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/placeholder-hero-dealership.png')] bg-cover bg-center" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            High-Performance Floors Built for Dealerships
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
            Serving Texas dealerships with premium flooring systems built for performance and presentation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={() => setIsBookingOpen(true)} className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6">
              <Phone className="mr-2" />
              Get A Quote
            </Button>
            <Button size="lg" variant="outline" onClick={() => setIsBookingOpen(true)} className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Book An Estimate
            </Button>
          </div>
          <div className="mt-8">
            <a href="tel:214-305-6516" onClick={handlePhoneClick} className="text-2xl font-bold hover:text-blue-200 transition-colors">
              📞 214-305-6516
            </a>
          </div>
        </div>
      </section>

      {/* Floor Options Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Premium Flooring Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three specialized systems designed to meet every area of your dealership
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
                Why Dealerships Choose Legacy
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Minimal Downtime</h3>
                    <p className="text-muted-foreground">
                      Fast installation schedules designed around your business hours. We work efficiently to minimize disruption to your operations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Immaculate Finishes</h3>
                    <p className="text-muted-foreground">
                      Show-quality floors that enhance your vehicles and brand image. Our finishes reflect the quality and professionalism of your dealership.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Ongoing Maintenance Options</h3>
                    <p className="text-muted-foreground">
                      Keep your floors looking new year after year with our professional maintenance programs tailored for dealerships.
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
            <h2 className="text-4xl font-bold mb-4 text-foreground">Complete Dealership Coverage</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From showroom to service bay, we have the right flooring solution for every area
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
            <h2 className="text-4xl font-bold mb-4">Dealership Flooring Benefits</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Engineered for the unique demands of automotive environments
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
            Ready to Upgrade Your Dealership Floors?
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
            Get a free consultation and discover how our flooring solutions can enhance your dealership
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" onClick={() => setIsBookingOpen(true)} className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6">
              <Phone className="mr-2" />
              Schedule Free Estimate
            </Button>
          </div>
          <a href="tel:214-305-6516" onClick={handlePhoneClick} className="text-3xl font-bold hover:text-blue-200 transition-colors inline-block">
            📞 214-305-6516
          </a>
          <p className="mt-4 text-blue-100">
            Serving Dallas-Fort Worth and surrounding areas
          </p>
        </div>
      </section>

      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>;
};
export default DealershipFloors;