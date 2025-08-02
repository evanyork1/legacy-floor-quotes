import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { LeadForm } from "@/components/landing/LeadForm";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine quote path and content based on current location
  const isDFW = location.pathname === '/dfw' || location.pathname === '/dfwreslanding';
  const isCommercial = location.pathname === '/dfwcommercial';
  const isHouston = location.pathname === '/houston' || location.pathname === '/houstonreslanding';
  const isHoustonLanding = location.pathname === '/houstonreslanding';
  const title = isCommercial ? "DFW's Commercial Flooring" : (isDFW ? "DFW's Epoxy Flooring" : (isHouston ? "Houston's Epoxy Flooring" : "Get Your Dream Garage Floor in One Day"));
  const locationText = isDFW ? "Dallas - Fort Worth, TX" : "Houston, TX";
  const subtext = isCommercial ? "Industrial Concrete Polishing & Epoxy Solutions" : (isDFW ? "Residential & Commercial Floor Coatings That Last" : (isHouston ? "Residential & Commercial Floor Coatings That Last" : "Elite Installers. Unmatched Quality. A Reputation Built on Results"));

  // Gallery images for rotating background
  const galleryImages = [
    '/lovable-uploads/ca4188dd-c83d-4e6b-83ba-1fa6d780b466.png',
    '/lovable-uploads/85530262-ab7f-4339-af86-ed63ee721679.png',
    '/lovable-uploads/259c870a-cc78-430c-867f-54d087457e73.png',
    '/lovable-uploads/4118a438-beef-487b-949a-0e4db42b6da7.png',
    '/lovable-uploads/f8190725-62df-42e7-9d92-285d2f3f78e3.png',
    '/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png',
    '/lovable-uploads/a75e1253-9da2-40ae-82e0-a78d8e1a4967.png'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  // For DFW and DFW Res Landing pages, use the new design
  if (isDFW) {
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Images with Fade Transition */}
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${image}')`
            }}
          />
        ))}
        
        <div className="container mx-auto px-6 lg:px-8 relative w-full z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="max-w-2xl space-y-8 sm:space-y-10">
              <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                {title}{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                  Experts
                </span>
              </h1>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-white leading-relaxed">
                  {subtext}
                </div>
              </div>
              
              <div className="relative mb-8 sm:mb-10">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    asChild 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm sm:text-base lg:text-lg px-4 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                  >
                    <a href="tel:214-305-6516">
                      <Phone className="mr-2 sm:mr-3 h-4 w-4 lg:h-5 lg:w-5" />
                      Call Us Now
                    </a>
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/gallery')} 
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-sm sm:text-base lg:text-lg px-4 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 bg-transparent"
                  >
                    See Gallery
                    <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 lg:h-5 lg:w-5" />
                  </Button>
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
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
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
                  <Button 
                    onClick={() => navigate('/quotehou')} 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm sm:text-base lg:text-lg px-4 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                  >
                    Get Instant Quote
                    <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 lg:h-5 lg:w-5" />
                  </Button>
                  
                  {isHoustonLanding && (
                    <Button 
                      asChild 
                      variant="outline" 
                      className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm sm:text-base lg:text-lg px-4 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 bg-transparent"
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
                        <Phone className="mr-2 sm:mr-3 h-4 w-4 lg:h-5 lg:w-5" />
                        Call Us Now
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}
            
            {isCommercial && (
              <div className="relative mb-8 sm:mb-10 mt-8">
                <Button 
                  onClick={() => {
                    // We need to pass the modal opening function here
                    // This will be handled by the parent component
                    const event = new CustomEvent('openCommercialModal');
                    window.dispatchEvent(event);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm sm:text-base lg:text-lg px-4 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <Phone className="mr-2 sm:mr-3 h-4 w-4 lg:h-5 lg:w-5" />
                  Get A Quote
                </Button>
              </div>
            )}
          </div>
          <div className="relative">
            <img 
              src={isCommercial ? "/lovable-uploads/a75e1253-9da2-40ae-82e0-a78d8e1a4967.png" : "/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png"} 
              alt={isCommercial ? "Airplane hangar with polished concrete flooring" : "Premium garage floor coating with luxury vehicles"} 
              className="relative w-full h-auto rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
