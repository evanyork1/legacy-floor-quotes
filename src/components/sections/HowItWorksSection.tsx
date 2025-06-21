import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Camera, Palette, CheckCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const HowItWorksSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine quote path based on current location
  const quotePath = location.pathname === '/dfw' ? '/quotedfw' : '/quotehou';

  const steps = [
    {
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      title: "Schedule Your Free Consultation",
      description: "Book a convenient time for our expert to assess your space and provide personalized recommendations.",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      icon: <Camera className="h-8 w-8 text-blue-600" />,
      title: "Professional Assessment",
      description: "Our certified technician evaluates your floor condition and discusses your vision and requirements.",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      icon: <Palette className="h-8 w-8 text-blue-600" />,
      title: "Expert Installation",
      description: "Our skilled team transforms your space with precision application of premium coating systems.",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
      title: "Enjoy Your New Floor",
      description: "Experience the beauty, durability, and easy maintenance of your professionally coated floor.",
      bgColor: "from-blue-50 to-blue-100"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From consultation to completion, we make the process simple and stress-free
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/50 relative">
              <CardContent className="p-8">
                <div className={`bg-gradient-to-br ${step.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                <div className="absolute -top-3 -left-3 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            onClick={() => navigate(quotePath)} 
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            Get Instant Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
