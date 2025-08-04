import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/ui/cta-button";
import { ArrowRight, Phone, Calendar } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { LeadForm } from "@/components/landing/LeadForm";
import { BookingModal } from "@/components/landing/BookingModal";
import { useState, useEffect, useMemo } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";

const HeroSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Determine quote path and content based on current location
  const isDFW = location.pathname === '/dfw' || location.pathname === '/dfwreslanding';
  const isCommercial = location.pathname === '/dfwcommercial';
  const isHouston = location.pathname === '/houston' || location.pathname === '/houstonreslanding';
  const isHoustonLanding = location.pathname === '/houstonreslanding';
  const title = isCommercial ? "DFW's Commercial Flooring" : (isDFW ? "DFW's Epoxy Flooring" : (isHouston ? "Houston's Epoxy Flooring" : "Get Your Dream Garage Floor in One Day"));
  const locationText = isDFW ? "Dallas - Fort Worth, TX" : "Houston, TX";
  const subtext = isCommercial ? "Industrial Concrete Polishing & Epoxy Solutions" : (isDFW ? "Residential & Commercial Floor Coatings That Last" : (isHouston ? "Residential & Commercial Floor Coatings That Last" : "Elite Installers. Unmatched Quality. A Reputation Built on Results"));

  // Gallery images for rotating background - memoized for performance
  const galleryImages = useMemo(() => [
    '/lovable-uploads/85530262-ab7f-4339-af86-ed63ee721679.png',
    '/lovable-uploads/259c870a-cc78-430c-867f-54d087457e73.png',
    '/lovable-uploads/4118a438-beef-487b-949a-0e4db42b6da7.png',
    '/lovable-uploads/f8190725-62df-42e7-9d92-285d2f3f78e3.png'
  ], []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000); // Increased interval for better performance

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  // For DFW and DFW Res Landing pages, use the new design
  if (isDFW) {
    return (
      <section className="relative overflow-hidden">
        {/* Hero Container - Fixed Height on Mobile */}
        <div className="h-[70vh] lg:min-h-screen relative flex items-center">
        {/* Background Images with Optimized Fade Transition */}
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundAttachment: 'scroll',
              willChange: index === currentImageIndex || index === (currentImageIndex + 1) % galleryImages.length ? 'opacity' : 'auto'
            }}
          />
        ))}
        
        <div className="container mx-auto px-4 lg:px-8 relative w-full z-10">
          {/* Mobile Layout - Hero content with larger text */}
          <div className="lg:hidden">
            <div className="flex flex-col">
              {/* Hero content - takes up more space with larger text */}
              <div className="h-[60vh] flex items-center justify-center pt-20">
                <div className="max-w-2xl space-y-6 sm:space-y-8 text-center">
                  <h1 className="text-6xl sm:text-7xl font-bold text-white leading-tight">
                    {title}{" "}
                    <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                      Experts
                    </span>
                  </h1>
                  
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl text-white leading-snug">
                      {subtext}
                    </div>
                  </div>
                  
                   <div className="relative mt-8 sm:mt-10">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
                      <CTAButton 
                        onClick={() => setShowBookingModal(true)} 
                        variant="primary"
                        size="md"
                        icon={<Calendar />}
                        iconPosition="left"
                        fullWidthMobile={false}
                        className="w-auto"
                      >
                        Book An Estimate
                      </CTAButton>
                      
                      <a 
                        href="tel:214-305-6516"
                        className="text-white text-lg flex items-center gap-2 hover:text-blue-200 transition-colors"
                      >
                        <Phone size={18} />
                        Call us at: 214-305-6516
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Desktop Layout - Original side-by-side layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-4 lg:gap-6 items-center">
            <div className="max-w-2xl space-y-4 sm:space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                {title}{" "}
                <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                  Experts
                </span>
              </h1>
              
              <div className="text-center lg:text-left">
                <div className="text-base sm:text-lg lg:text-xl xl:text-2xl text-white leading-snug">
                  {subtext}
                </div>
              </div>
              
               <div className="relative mt-6 sm:mt-8">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <CTAButton 
                    onClick={() => setShowBookingModal(true)} 
                    variant="primary"
                    size="sm"
                    icon={<Calendar />}
                    iconPosition="left"
                    fullWidthMobile={false}
                  >
                    Book An Estimate
                  </CTAButton>
                  
                  <a 
                    href="tel:214-305-6516"
                    className="text-white text-lg flex items-center gap-2 hover:text-blue-200 transition-colors"
                  >
                    <Phone size={18} />
                    Call us at: 214-305-6516
                  </a>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end lg:pr-2">
              <div className="w-full max-w-md">
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Background Transition Section for Mobile */}
        <div className="lg:hidden bg-gradient-to-b from-transparent via-gray-100/50 to-gray-50 py-4">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <LeadForm />
            </div>
          </div>
        </div>

        <BookingModal 
          isOpen={showBookingModal} 
          onClose={() => setShowBookingModal(false)} 
        />
      </section>
    );
  }

  // Original design for other pages
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-white py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-800/5"></div>
      <div className="container mx-auto px-6 lg:px-8 relative w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-2xl space-y-8 sm:space-y-10">
            <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
              {isCommercial ? (
                <>
                  DFW's{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Commercial
                  </span>
                  {" "}Flooring Experts
                </>
              ) : isHoustonLanding ? (
                <>
                  {title}{" "}
                  <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                    Experts
                  </span>
                </>
              ) : (
                title.split(" ").map((word, index) => {
                  if (word === "One" || word === "Day") {
                    return (
                      <span key={index} className="whitespace-nowrap bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        {word}{" "}
                      </span>
                    );
                  }
                  return word + " ";
                })
              )}
            </h1>
            
            {isHoustonLanding || isCommercial ? (
              <div className="space-y-2 sm:space-y-3">
                <div className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-gray-900 leading-relaxed">
                  {subtext}
                </div>
              </div>
            ) : (
              <p className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-gray-600 leading-relaxed">
                {subtext} in{" "}
                <span className="block sm:inline bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">{locationText}</span>
              </p>
            )}
            
            {!isCommercial && (
              <div className="relative mb-8 sm:mb-10">
                <div className="flex flex-col sm:flex-row gap-4">
                  <CTAButton 
                    onClick={() => navigate('/contact')} 
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight />}
                    iconPosition="right"
                    fullWidthMobile={true}
                  >
                    Get A Quote
                  </CTAButton>
                  
                  {isHoustonLanding && (
                    <CTAButton 
                      asChild 
                      variant="outline" 
                      size="lg"
                      icon={<Phone />}
                      fullWidthMobile={true}
                    >
                      <a 
                        href="tel:214-305-6516"
                        onClick={() => {
                          // Call new conversion tracking for /dfwreslanding
                          if (typeof window !== 'undefined' && window.location.pathname === '/dfwreslanding' && (window as any).gtag_report_conversion_new) {
                            (window as any).gtag_report_conversion_new('tel:214-305-6516');
                          }
                        }}
                      >
                        Call Us Now
                      </a>
                    </CTAButton>
                  )}
                </div>
              </div>
            )}
            
            {isCommercial && (
              <div className="relative mb-8 sm:mb-10 mt-8">
                <CTAButton 
                  onClick={() => {
                    // We need to pass the modal opening function here
                    // This will be handled by the parent component
                    const event = new CustomEvent('openCommercialModal');
                    window.dispatchEvent(event);
                  }}
                  variant="primary"
                  size="lg"
                  icon={<Phone />}
                  fullWidthMobile={true}
                >
                  Get A Quote
                </CTAButton>
              </div>
            )}
          </div>
          <div className="relative">
            <OptimizedImage 
              src={isCommercial ? "/lovable-uploads/a75e1253-9da2-40ae-82e0-a78d8e1a4967.png" : "/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png"}
              alt={isCommercial ? "Airplane hangar with polished concrete flooring" : "Premium garage floor coating with luxury vehicles"}
              className="relative w-full h-auto rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              priority={true}
            />
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
      />
    </section>
  );
};

export default HeroSection;
