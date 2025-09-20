import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Calendar } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";

const ProfessionalHeroSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine context and content
  const isDFW = location.pathname === '/' || location.pathname === '/dfw';
  const isCommercial = location.pathname === '/commercial';
  const isHouston = location.pathname === '/houston';

  // Professional hero images - high quality, clean compositions
  const heroImages = useMemo(() => [
    '/lovable-uploads/85530262-ab7f-4339-af86-ed63ee721679.png',
    '/lovable-uploads/f8190725-62df-42e7-9d92-285d2f3f78e3.png',
    '/lovable-uploads/4118a438-beef-487b-949a-0e4db42b6da7.png',
  ], []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const heroContent = {
    title: isCommercial 
      ? "Commercial Flooring Solutions" 
      : isHouston 
        ? "Houston's Premier Epoxy Flooring" 
        : "Dallas-Fort Worth's Premier Epoxy Flooring",
    subtitle: isCommercial
      ? "Industrial-grade concrete polishing and epoxy solutions for commercial spaces"
      : "Professional floor coatings that combine durability with exceptional aesthetics",
    location: isHouston ? "Houston, Texas" : "Dallas-Fort Worth, Texas"
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Hero Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-2000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${image}')`,
            }}
          />
          {/* Professional gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-950/85 via-brand-navy-900/70 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="mx-auto px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            {/* Professional badge/certification */}
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium tracking-wide uppercase">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Licensed & Insured Professional Installers
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl lg:text-8xl font-bold text-white leading-none mb-8">
              {heroContent.title.split(' ').map((word, index) => {
                if (word === 'Epoxy' || word === 'Flooring' || word === 'Commercial') {
                  return (
                    <span key={index} className="block lg:inline text-transparent bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text">
                      {word}{' '}
                    </span>
                  );
                }
                return (
                  <span key={index} className="block lg:inline">
                    {word}{' '}
                  </span>
                );
              })}
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-steel-100 leading-relaxed mb-4 max-w-2xl">
              {heroContent.subtitle}
            </p>

            {/* Location */}
            <p className="text-lg text-steel-200 mb-12 font-medium">
              Serving {heroContent.location}
            </p>

            {/* Professional Stats */}
            <div className="flex flex-wrap gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">15+</div>
                <div className="text-sm text-steel-200 uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">1000+</div>
                <div className="text-sm text-steel-200 uppercase tracking-wider">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">180+</div>
                <div className="text-sm text-steel-200 uppercase tracking-wider">5-Star Reviews</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/quotedfw')}
                className="bg-white text-brand-navy-900 hover:bg-steel-100 border-0 px-8 py-4 text-base"
              >
                GET FREE ESTIMATE
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 border-white text-white hover:bg-white hover:text-brand-navy-900 px-8 py-4 text-base"
              >
                <a href="tel:214-305-6516" className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  (214) 305-6516
                </a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 pt-8 border-t border-white/20">
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center text-steel-200 text-sm">
                  <span className="text-green-400 mr-2">✓</span>
                  Licensed & Insured
                </div>
                <div className="flex items-center text-steel-200 text-sm">
                  <span className="text-green-400 mr-2">✓</span>
                  Lifetime Warranty Available
                </div>
                <div className="flex items-center text-steel-200 text-sm">
                  <span className="text-green-400 mr-2">✓</span>
                  Same-Day Installation
                </div>
                <div className="flex items-center text-steel-200 text-sm">
                  <span className="text-green-400 mr-2">✓</span>
                  Free Estimates
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white/60">
          <div className="text-xs uppercase tracking-wider mb-2">Scroll to explore</div>
          <div className="w-px h-8 bg-white/40"></div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalHeroSection;