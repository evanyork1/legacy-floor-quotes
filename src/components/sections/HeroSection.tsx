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
                  {/* Google Reviews Badge for Mobile */}
                  <div className="flex justify-center mb-8">
                    <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200">
                      <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium text-gray-700">Google Reviews</span>
                        <span className="text-xs text-gray-500">170+ five star reviews</span>
                      </div>
                    </div>
                  </div>
                  
                  <h1 className="text-6xl sm:text-7xl font-bold text-white leading-none sm:leading-tight">
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
                        214-305-6516
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Google Reviews Badge */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-gray-700">Google Reviews</span>
                <span className="text-xs text-gray-500">170+ five star reviews</span>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Original side-by-side layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-3 lg:gap-4 items-center">
            <div className="max-w-2xl space-y-4 sm:space-y-6 text-center lg:text-left pl-8 xl:pl-16">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
                {title}{" "}
                <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                  Experts
                </span>
              </h1>
              
              <div className="text-center lg:text-left">
                <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white leading-snug">
                  Residential & Commercial Floor Coatings<br />That Last
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
                    214-305-6516
                  </a>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-start lg:pl-4">
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

        {/* Floating Quote Button - Right Side */}
        <Button
          onClick={() => navigate('/quotedfw')}
          className="fixed right-0 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-4 text-lg shadow-xl z-50 rounded-l-xl rounded-r-none border-2 border-red-700"
          style={{ transformOrigin: 'center center' }}
        >
          INSTANT GARAGE QUOTE
        </Button>

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
