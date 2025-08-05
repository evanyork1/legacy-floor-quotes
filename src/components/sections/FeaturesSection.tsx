import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/ui/cta-button";
import { Layers, Building, Sparkles, Users, Shield, Headphones, ArrowRight, Phone, Calendar } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookingModal } from "@/components/landing/BookingModal";
const FeaturesSection = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDFW = location.pathname === '/dfw' || location.pathname === '/dfwreslanding';
  const isCommercial = location.pathname === '/dfwcommercial';
  const isHouston = location.pathname === '/houston' || location.pathname === '/houstonreslanding';
  const features = isCommercial ? [{
    icon: <Sparkles className="h-8 w-8 text-blue-600" />,
    title: "Concrete Polishing",
    description: "Professional concrete polishing for warehouses, restaurants, retail stores, and manufacturing facilities. High-gloss, durable finishes that withstand heavy commercial traffic.",
    image: "/lovable-uploads/14a68967-8843-4c6d-b339-dd48a8e278ae.png"
  }, {
    icon: <Building className="h-8 w-8 text-blue-600" />,
    title: "Industrial Epoxy",
    description: "Heavy-duty epoxy systems engineered for commercial environments including airplane hangars, distribution centers, food processing plants, and automotive facilities.",
    image: "/lovable-uploads/7a412198-403e-4444-bc3d-56e2e28ac9fd.png"
  }, {
    icon: <Layers className="h-8 w-8 text-blue-600" />,
    title: "Specialty Coatings",
    description: "Custom commercial flooring solutions including anti-static, chemical-resistant, and FDA-compliant coatings for specialized industrial applications.",
    image: "/lovable-uploads/8865d0d1-af13-4849-b194-a2611de34a0b.png"
  }] : isDFW || isHouston ? [{
    icon: <Layers className="h-8 w-8 text-blue-600" />,
    title: "Flake Floors",
    description: "Our standard product is a Polyurea flake floor system. This is a Lifetime Warrantied product that has been perfected with science to look great and perform for years to come.",
    image: "/lovable-uploads/8865d0d1-af13-4849-b194-a2611de34a0b.png"
  }, {
    icon: <Building className="h-8 w-8 text-blue-600" />,
    title: "Industrial Epoxy",
    description: "Cutting edge epoxy materials are now available for industrial applications such as airplane hangars, warehouses, restaurants, and more.",
    image: "/lovable-uploads/7a412198-403e-4444-bc3d-56e2e28ac9fd.png"
  }, {
    icon: <Sparkles className="h-8 w-8 text-blue-600" />,
    title: "Concrete Polishing",
    description: "Concrete polishing is ideal for commercial spaces such as warehouses, restaurants, retail stores, and more. Durable finishes that offer a great looking result.",
    image: "/lovable-uploads/14a68967-8843-4c6d-b339-dd48a8e278ae.png"
  }] : [{
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: "Certified Installers",
    description: "Only certified, insured professionals in our network"
  }, {
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    title: "Lifetime Warranty",
    description: "Industry-leading protection with comprehensive coverage"
  }, {
    icon: <Headphones className="h-8 w-8 text-blue-600" />,
    title: "World Class Service",
    description: "Choose what works best for you - virtual consultations or meet with our experts on-site. No need to take time out of your day unless you prefer the personal touch."
  }];
  const sectionTitle = isCommercial ? "Commercial & Industrial Flooring Solutions" : isDFW || isHouston ? "Premium Polyurea, Epoxy, and Polished Floors" : "Why Choose Legacy Industrial Coatings?";
  
  return (
    <section className="py-20 bg-gradient-to-br from-white to-slate-50" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            {sectionTitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isCommercial 
              ? "Specialized commercial flooring solutions designed for high-traffic industrial environments"
              : isDFW || isHouston
                ? "Discover the Legacy difference with premium coating solutions designed to last"
                : "From our network of certified installers to our lifetime warranty, we deliver excellence at every step"
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/30">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
                  </div>
                </div>
                {feature.image && (
                  <div className="mt-4 rounded-lg overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {(isDFW || isHouston) && (
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton 
                onClick={() => navigate('/contact')} 
                variant="primary"
                size="lg"
                icon={<ArrowRight />}
                iconPosition="right"
                fullWidthMobile={true}
              >
                Get Your Quote
              </CTAButton>
              
              <CTAButton
                onClick={() => setShowBookingModal(true)}
                variant="outline"
                size="lg"
                icon={<Calendar />}
                fullWidthMobile={true}
              >
                Book An Estimate
              </CTAButton>
            </div>
          </div>
        )}
      </div>
      
      <BookingModal 
        isOpen={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
      />
    </section>
  );
};
export default FeaturesSection;