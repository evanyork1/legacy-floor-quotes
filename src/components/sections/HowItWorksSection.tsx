import { useLocation } from "react-router-dom";
const HowItWorksSection = () => {
  const location = useLocation();
  const isCommercial = location.pathname === '/dfwcommercial';
  const isDFW = location.pathname === '/' || location.pathname === '/dfw' || location.pathname === '/dfwreslanding';
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
    description: isDFW ? "Get a free personalized quote based on your project" : "Get a free personalized quote based on your project",
    gradient: "from-blue-500 to-blue-700"
  }, {
    step: "2",
    title: "Schedule Your Installation Day",
    description: isDFW ? "Find the perfect install day that works with your schedule." : "One person will help you find the perfect install day within the next week.",
    gradient: "from-blue-600 to-blue-800"
  }, {
    step: "3",
    title: "Enjoy Your New Floor",
    description: "Relax while we transform your space with professional installation",
    gradient: "from-blue-700 to-indigo-700"
  }];
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Our streamlined process makes it easy to get your perfect floor coating
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${step.gradient} text-white flex items-center justify-center text-lg sm:text-xl font-bold mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {step.step}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">{step.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorksSection;