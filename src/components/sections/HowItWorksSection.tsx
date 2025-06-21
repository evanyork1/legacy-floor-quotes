
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const HowItWorksSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine quote path based on current location
  const quotePath = location.pathname === '/dfw' ? '/quotedfw' : '/quotehou';

  const steps = [
    {
      number: "1",
      title: "Create Custom Quote",
      description: "Use our intelligent quote builder or have one of our team members measure in person"
    },
    {
      number: "2", 
      title: "Schedule Your Installation Day",
      description: "One person will help you find the perfect install day within the next week"
    },
    {
      number: "3",
      title: "Enjoy Your New Floor",
      description: "Relax while we transform your space with professional installation"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From consultation to completion, we make the process simple and stress-free
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto mb-12">
          {/* Steps Container */}
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-0.5 bg-blue-200 z-0"></div>
            
            {steps.map((step, index) => (
              <div key={index} className="relative text-center z-10">
                {/* Step Number Circle */}
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 relative z-10">
                  {step.number}
                </div>
                
                {/* Step Content Box */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
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
