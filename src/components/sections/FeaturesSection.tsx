import { Card, CardContent } from "@/components/ui/card";
import { Layers, Building, Sparkles, Users, Shield, Headphones } from "lucide-react";
import { useLocation } from "react-router-dom";

const FeaturesSection = () => {
  const location = useLocation();
  const isDFW = location.pathname === '/dfw';
  
  const features = isDFW ? [
    {
      icon: <Layers className="h-8 w-8 text-blue-600" />,
      title: "Flake Floors",
      description: "Our standard product is a Polyurea flake floor system. This is a Lifetime Warrantied product that has been perfected with science to look great and perform for years to come.",
      image: "/lovable-uploads/a9ec528c-6c11-4afa-8889-bd3d77742cc1.png"
    },
    {
      icon: <Building className="h-8 w-8 text-blue-600" />,
      title: "Industrial Epoxy",
      description: "Cutting edge epoxy materials are now available for industrial applications such as airplane hangars, warehouses, restaurants, and more.",
      image: "/lovable-uploads/80e063fc-473a-4a20-8f6e-a9cf88273165.png"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-blue-600" />,
      title: "Concrete Polishing",
      description: "Concrete polishing is ideal for commercial spaces such as warehouses, restaurants, retail stores, and more. Durable finishes that offer a great looking result.",
      image: "/lovable-uploads/c85a692b-80a3-4ce7-a6b5-c8364e4d4d93.png"
    }
  ] : [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Certified Installers",
      description: "Only certified, insured professionals in our network"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Lifetime Warranty",
      description: "Industry-leading protection with comprehensive coverage"
    },
    {
      icon: <Headphones className="h-8 w-8 text-blue-600" />,
      title: "World Class Service",
      description: "Choose what works best for you - virtual consultations or meet with our experts on-site. No need to take time out of your day unless you prefer the personal touch."
    }
  ];

  const sectionTitle = isDFW 
    ? "Premium Polyurea, Epoxy, and Polished Floors"
    : "Why Choose Legacy Industrial Coatings?";

  return (
    <section className="py-20 bg-gradient-to-br from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            {sectionTitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isDFW 
              ? "Professional flooring solutions for every space and application."
              : "Thousands have trusted us as their floor coating experts."
            }
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/50">
              <CardContent className="p-8">
                {isDFW && feature.image && (
                  <div className="mb-6 relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl blur opacity-20"></div>
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="relative w-full h-48 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                )}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
