import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/ui/cta-button";
import { ArrowRight, Phone, Calendar } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { BookingModal } from "@/components/landing/BookingModal";
import { useState, useEffect, useMemo } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";

const HeroSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Determine quote path and content based on current location
  const isDFW = location.pathname === '/' || location.pathname === '/dfw' || location.pathname === '/dfwreslanding' || location.pathname === '/gpt';
  const isPHX = location.pathname === '/phx';
  const isCommercial = location.pathname === '/dfwcommercial';
  const isProsper = location.pathname === '/epoxy-flooring-prosper';
  const isFrisco = location.pathname === '/epoxy-flooring-frisco';
  
  const title = isCommercial ? "DFW's Commercial Flooring" : (isPHX ? "Phoenix's Epoxy Flooring" : (isDFW ? "DFW's Epoxy Flooring" : (isProsper ? "Prosper's Trusted Epoxy Flooring Experts" : (isFrisco ? "Frisco's Trusted Epoxy Flooring Experts" : "Get Your Dream Garage Floor in One Day"))));
  const showExpertsSuffix = true;
  const locationText = isPHX ? "Phoenix, AZ" : "Dallas - Fort Worth, TX";
  const subtext = isCommercial ? "Industrial Concrete Polishing & Epoxy Solutions" : (isPHX ? "Residential & Commercial Floors That Last" : (isDFW ? "Residential & Commercial Floors That Last" : (isProsper ? "Fast, durable, and stunning garage floors for Prosper homeowners." : (isFrisco ? "Beautiful garage floors installed fast — proudly serving Frisco homeowners." : "Elite Installers. Unmatched Quality. A Reputation Built on Results"))));
  
  const phoneNumber = isPHX ? "602-560-0974" : "214-305-6516";
  const quotePath = isPHX ? "/quotephx" : "/quotedfw";
  
  const handlePhoneClick = () => {
    if (typeof window !== 'undefined') {
      if (isPHX) {
        if ((window as any).gtag_report_conversion_phx) {
          (window as any).gtag_report_conversion_phx(`tel:${phoneNumber}`);
        } else if ((window as any).gtag_report_conversion) {
          (window as any).gtag_report_conversion(`tel:${phoneNumber}`);
        }
      } else {
        if ((window as any).gtag_report_conversion) {
          (window as any).gtag_report_conversion(`tel:${phoneNumber}`);
        }
      }
    }
  };

  // Gallery images for rotating background - memoized for performance
  const galleryImages = useMemo(() => [
    '/lovable-uploads/85530262-ab7f-4339-af86-ed63ee721679.png',
    '/lovable-uploads/259c870a-cc78-430c-867f-54d087457e73.png',
    '/lovable-uploads/4118a438-beef-487b-949a-0e4db42b6da7.png',
    '/lovable-uploads/f8190725-62df-42e7-9d92-285d2f3f78e3.png'
  ], []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000); // Increased interval for better performance

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.7; // 70vh hero height
      setScrolledPastHero(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // For DFW, PHX, DFW Res Landing, Prosper, and Frisco pages, use the new design
  if (isDFW || isPHX || isProsper || isFrisco) {
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
              <div className="h-[60vh] flex items-center justify-center pt-8">
                <div className="max-w-2xl space-y-6 sm:space-y-8 text-center">
                  {/* Google Reviews Badge - positioned above title */}
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <span className="font-bold text-blue-500">G</span>
                        <span className="font-bold text-red-500">o</span>
                        <span className="font-bold text-yellow-500">o</span>
                        <span className="font-bold text-blue-500">g</span>
                        <span className="font-bold text-green-500">l</span>
                        <span className="font-bold text-red-500">e</span>
                      </div>
                      <div className="flex items-center ml-2">
                        <span className="text-yellow-400 text-sm">★★★★★</span>
                        <span className="ml-1 text-white font-medium text-sm">190+</span>
                        <span className="ml-1 text-white text-sm">reviews</span>
                      </div>
                    </div>
                  </div>
                  
                  <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight">
                    {title}
                    {showExpertsSuffix && (
                      <>
                        {" "}
                        <span className="text-blue-900">
                          Experts
                        </span>
                      </>
                    )}
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
                      
                      {(isDFW || isPHX) && (
                        <Button 
                          asChild
                          onClick={handlePhoneClick}
                          className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6"
                        >
                          <a href={`tel:${phoneNumber}`} className="flex items-center gap-2">
                            <Phone size={18} />
                            {phoneNumber}
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Desktop Layout - Centered single column */}
          <div className="hidden lg:flex items-center justify-center pt-16 pb-12">
            <div className="max-w-4xl space-y-6 text-center">
              {/* Google Reviews Badge - positioned above title */}
              <div className="flex justify-center mb-4">
              <div className="flex items-center text-sm">
                <div className="flex items-center">
                  <span className="font-bold text-blue-500">G</span>
                  <span className="font-bold text-red-500">o</span>
                  <span className="font-bold text-yellow-500">o</span>
                  <span className="font-bold text-blue-500">g</span>
                  <span className="font-bold text-green-500">l</span>
                  <span className="font-bold text-red-500">e</span>
                </div>
                <div className="flex items-center ml-2">
                  <span className="text-yellow-400 text-sm">★★★★★</span>
                  <span className="ml-1 text-white font-medium">190+ reviews</span>
                  <span className="ml-1 text-gray-400">›</span>
                </div>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                {title}
                {showExpertsSuffix && (
                  <>
                    {" "}
                    <span className="text-blue-900">
                      Experts
                    </span>
                  </>
                )}
              </h1>
              
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-white leading-snug">
                  {isProsper || isFrisco ? subtext : "Residential & Commercial Floors That Last"}
                </div>
              </div>
              
               <div className="relative mt-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <CTAButton 
                    onClick={() => setShowBookingModal(true)} 
                    variant="primary"
                    size="lg"
                    icon={<Calendar />}
                    iconPosition="left"
                    fullWidthMobile={false}
                  >
                    Book An Estimate
                  </CTAButton>
                  
                  {(isDFW || isPHX) && (
                    <Button 
                      asChild
                      onClick={handlePhoneClick}
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 text-lg"
                    >
                      <a href={`tel:${phoneNumber}`} className="flex items-center gap-2">
                        <Phone size={20} />
                        {phoneNumber}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Floating Quote Button - Right Side - Only visible when scrolled past hero */}
        {scrolledPastHero && (
          <Button
            onClick={() => navigate(quotePath)}
            className="fixed right-[-90px] sm:right-[-120px] top-1/2 transform -translate-y-1/2 -rotate-90 origin-center font-bold px-3 py-4 sm:px-5 sm:py-6 text-sm sm:text-lg shadow-2xl z-50 rounded-l-xl rounded-r-none border-[3px] transition-all duration-300 bg-blue-600 text-white border-blue-600"
            style={{ transformOrigin: 'center center' }}
          >
            INSTANT GARAGE QUOTE
          </Button>
        )}

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
      <div className="absolute inset-0 bg-blue-900/5"></div>
      <div className="container mx-auto px-6 lg:px-8 relative w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-2xl space-y-8 sm:space-y-10">
            <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
              {isCommercial ? (
                <>
                  DFW's{" "}
                  <span className="text-blue-900">
                    Commercial
                  </span>
                  {" "}Flooring Experts
                </>
              ) : (
                title.split(" ").map((word, index) => {
                  if (word === "One" || word === "Day") {
                    return (
                      <span key={index} className="whitespace-nowrap text-blue-900">
                        {word}{" "}
                      </span>
                    );
                  }
                  return word + " ";
                })
              )}
            </h1>
            
            {isCommercial ? (
              <div className="space-y-2 sm:space-y-3">
                <div className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-gray-900 leading-relaxed">
                  {subtext}
                </div>
              </div>
            ) : (
              <p className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-gray-600 leading-relaxed">
                {subtext} in{" "}
                <span className="block sm:inline text-blue-900">{locationText}</span>
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
