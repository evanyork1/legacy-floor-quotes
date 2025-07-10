
import { useLocation } from "react-router-dom";

const HowItWorksSection = () => {
  const location = useLocation();
  const isCommercial = location.pathname === '/dfwcommercial';
  const isDFW = location.pathname === '/dfw' || location.pathname === '/dfwreslanding' || location.pathname === '/houstonreslanding';
  
  const steps = isCommercial ? [{
    step: "1",
    title: "Site Assessment & Consultation",
    description: "Our commercial specialists conduct a thorough facility assessment and provide detailed project specifications",
    gradient: "from-blue-500 to-blue-700"
  }, {
    step: "2",
    title: "Custom Solution Design",
    description: "We design a flooring system tailored to your operational needs, timeline, and compliance requirements",
    gradient: "from-blue-600 to-blue-800"
  }, {
    step: "3",
    title: "Professional Installation",
    description: "Expert installation with minimal disruption to your operations and comprehensive quality assurance",
    gradient: "from-blue-700 to-indigo-700"
  }] : [{
    step: "1",
    title: isDFW ? "Get a Custom Quote" : "Create Your Own Quote",
    description: isDFW 
      ? "Use our intelligent quote builder or meet with a member of our team"
      : "Use our intelligent quote builder to get accurate pricing instantly",
    gradient: "from-blue-500 to-blue-700"
  }, {
    step: "2",
    title: "Schedule Your Installation Day",
    description: isDFW 
      ? "Find the perfect install day that works with your schedule."
      : "One person will help you find the perfect install day within the next week.",
    gradient: "from-blue-600 to-blue-800"
  }, {
    step: "3",
    title: "Enjoy Your New Floor",
    description: "Relax while we transform your space with professional installation",
    gradient: "from-blue-700 to-indigo-700"
  }];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden" id="how-it-works">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-blue-700/5 to-blue-800/5"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-blue-800 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {isCommercial 
              ? "Professional process designed for commercial projects and business requirements"
              : "Three simple steps to transform your space with Legacy's premium service"
            }
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="group relative">
                {/* Connecting line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-full w-12 h-0.5 bg-gradient-to-r from-blue-300 to-blue-500 transform translate-x-4 z-10"></div>
                )}
                
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100">
                  <div className="absolute -top-6 left-8">
                    <div className={`bg-gradient-to-r ${step.gradient} text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {step.step}
                    </div>
                  </div>
                  
                  <div className="pt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Decorative gradient overlay */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Central connecting element for mobile */}
          <div className="lg:hidden flex justify-center mt-8">
            <div className="w-1 h-16 bg-gradient-to-b from-blue-300 to-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
