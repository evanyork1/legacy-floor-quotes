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
  return;
};
export default HowItWorksSection;