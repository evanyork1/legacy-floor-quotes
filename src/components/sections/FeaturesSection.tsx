import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers, Building, Sparkles, Users, Shield, Headphones, ArrowRight, Phone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
const FeaturesSection = () => {
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
  return <section className="py-20 bg-gradient-to-br from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            {sectionTitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isCommercial ? "Heavy-duty flooring systems designed for commercial and industrial environments." : isDFW || isHouston ? "Professional flooring solutions for every space and application." : "Thousands have trusted us as their floor coating experts."}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/50">
              <CardContent className="p-8">
                {(isDFW || isHouston || isCommercial) && feature.image && <div className="mb-6 relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl blur opacity-20"></div>
                    <img src={feature.image} alt={feature.title} className="relative w-full h-64 object-cover rounded-xl shadow-lg" />
                  </div>}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>)}
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          {isCommercial ? <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg px-10 py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              
            </Button> : <Button onClick={() => navigate(isDFW || isHouston ? isDFW ? '/quotedfw' : '/quotehou' : '/quotehou')} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg px-10 py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              Get Instant Quote
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>}
        </div>
      </div>
    </section>;
};
export default FeaturesSection;