
import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, Headphones } from "lucide-react";
import { useLocation } from "react-router-dom";

const FeaturesSection = () => {
  const location = useLocation();
  const isDFW = location.pathname === '/dfw';
  
  const features = [{
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: "Certified Installers",
    description: isDFW 
      ? "Only certified, insured professionals"
      : "Only certified, insured professionals in our network"
  }, {
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    title: "Lifetime Warranty",
    description: "Industry-leading protection with comprehensive coverage"
  }, {
    icon: <Headphones className="h-8 w-8 text-blue-600" />,
    title: "World Class Service",
    description: "Choose what works best for you - virtual consultations or meet with our experts on-site. No need to take time out of your day unless you prefer the personal touch."
  }];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            Why Choose Legacy Industrial Coatings?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Thousands have trusted us as their floor coating experts.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/50">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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
