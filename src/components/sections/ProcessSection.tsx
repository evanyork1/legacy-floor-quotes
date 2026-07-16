import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/ui/cta-button";
import { useLocation, useNavigate } from "react-router-dom";
import { BookingModal } from "@/components/landing/BookingModal";
const ProcessSection = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const location = useLocation();
  const quoteUrl = '/contact';
  const phoneNumber = '214-305-6516';
  const steps = [{
    number: 1,
    title: "Diamond Grind Surface Preparation",
    description: "We diamond grind to prepare the surface properly for the coating, ensuring optimal adhesion and longevity.",
    image: "/lovable-uploads/7a02cc67-38e9-4f07-9b6e-e051b18f52a2.png"
  }, {
    number: 2,
    title: "Crack Repair & Surface Restoration",
    description: "We repair cracks so they don't create problems long term. Every floor has minor hairline cracks, even the newest concrete.",
    image: "/lovable-uploads/cf1d8da4-0027-41ff-a35e-e0fe7d638db4.png"
  }, {
    number: 3,
    title: "Polyurea Base Coat Application",
    description: "Our high-performance polyurea base coat provides the foundation for a durable, long-lasting floor system.",
    image: "/lovable-uploads/abfd686b-1b52-4bc9-a8e0-5bd5f130a682.png"
  }, {
    number: 4,
    title: "Polymer Flake Installation",
    description: "Decorative polymer flakes are broadcast into the base coat, creating texture and the signature look of your new floor.",
    image: "/lovable-uploads/184a567c-9bf6-4719-9e8b-8aec08c14ca3.png"
  }, {
    number: 5,
    title: "Polyaspartic Topcoat Protection",
    description: "Our polyaspartic topcoat protects the surface long term and gives it that signature feel and shine.",
    image: "/lovable-uploads/494eac69-523e-4734-b40b-ac20fd3a3245.png"
  }];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % steps.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, steps.length]);
  const nextStep = () => {
    setActiveStep(prev => (prev + 1) % steps.length);
  };
  const prevStep = () => {
    setActiveStep(prev => (prev - 1 + steps.length) % steps.length);
  };
  const goToStep = (index: number) => {
    setActiveStep(index);
    setIsAutoPlaying(false);
  };
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };
  const handleMouseLeave = () => {
    setTimeout(() => setIsAutoPlaying(true), 2000);
  };
  return <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 text-blue-900">
            Our Proven 5-Step Process
          </h2>
          
        </div>

        {/* Process Steps Container */}
        <div className="max-w-7xl mx-auto" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {/* Desktop Progress Bar */}
          <div className="hidden lg:flex justify-center items-center mb-12 relative">
            {/* Render step buttons with connecting lines */}
            {steps.map((step, index) => <div key={index} className="flex items-center">
                <button onClick={() => goToStep(index)} className={`relative z-10 w-12 h-12 rounded-full border-4 font-bold text-lg transition-all duration-300 transform hover:scale-110 ${index <= activeStep ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-gray-300 text-gray-400 hover:border-blue-300'}`}>
                  {step.number}
                </button>
                {/* Connection line (except for last step) */}
                {index < steps.length - 1 && <div className={`w-24 h-1 ${index < activeStep ? 'bg-blue-600' : 'bg-gray-200'} transition-all duration-300`}></div>}
              </div>)}
          </div>

          {/* Main Content Area */}
          <div className="relative">
            {/* Mobile Step Indicator */}
            <div className="lg:hidden flex justify-center space-x-2 mb-8">
              {steps.map((_, index) => <button key={index} onClick={() => goToStep(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeStep ? 'bg-blue-600 scale-125' : 'bg-gray-300'}`} />)}
            </div>

            {/* Auto-play indicator */}
            <div className="absolute top-4 right-4 z-20 bg-white/90 rounded-full p-2 shadow-lg">
              {isAutoPlaying ? <Pause className="w-4 h-4 text-blue-600" /> : <Play className="w-4 h-4 text-gray-400" />}
            </div>

            {/* Step Content */}
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[400px] sm:min-h-[500px]">
              {/* Left Side - Image */}
              <div className="relative order-2 lg:order-1">
                <div className="absolute -inset-4 bg-blue-900 rounded-2xl blur opacity-20 animate-pulse"></div>
                <div className="relative overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
                    <img src={steps[activeStep].image} alt={steps[activeStep].title} className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="order-1 lg:order-2 px-4 lg:px-0">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg sm:text-2xl font-bold text-white">{steps[activeStep].number}</span>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-tight">
                        {steps[activeStep].title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                    {steps[activeStep].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Controls - Positioned below content */}
            <div className="flex justify-center items-center mt-8 space-x-6">
              <button onClick={prevStep} className="bg-white hover:bg-gray-50 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200">
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              
              <button onClick={nextStep} className="bg-white hover:bg-gray-50 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200">
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <CTAButton onClick={() => setIsBookingModalOpen(true)} variant="primary" size="lg" fullWidthMobile={true}>
              Get A Free Estimate
            </CTAButton>
          </div>
        </div>
      </div>
      
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </section>;
};
export default ProcessSection;