import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const ProfessionalHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Force DFW context for this header
  const isDFW = true;
  
  // Always use DFW paths
  const quotePath = '/quotedfw';
  const homePath = '/dfw';
  
  const mainNavItems = [
    { name: "Home", path: homePath },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" }
  ];

  const serviceItems = [
    { name: "Residential Garage Floors", path: "/garagefloors" },
    { name: "Residential Patios", path: "/residential-patio" },
    { name: "Commercial Flooring", path: "/commercial" },
    { name: "Flake Floors", path: "/flake-floors" },
    { name: "Industrial Epoxy", path: "/industrial-epoxy" },
  ];

  const aboutItems = [
    { name: "About Us", path: "/about" },
    { name: "Service Areas", path: "/service-areas" },
    { name: "Blog", path: "/blog" },
    { name: "FAQ", path: "/faq" },
    { name: "Warranty", path: "/warranty" },
    { name: "Financing", path: "/financing" }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-steel-200 sticky top-0 z-50">
      <div className="mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate(homePath)}>
            <img 
              src="/lovable-uploads/a18e3648-17a6-4222-808b-0a78d3ea50b9.png" 
              alt="Legacy Industrial Coatings" 
              className="h-16 w-auto" 
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {mainNavItems.map(item => (
              <a 
                key={item.name}
                href={item.path} 
                className="text-steel-700 hover:text-brand-navy-900 transition-colors duration-200 font-medium text-sm uppercase tracking-wide"
              >
                {item.name}
              </a>
            ))}
            
            {/* Services Dropdown */}
            <div 
              className="relative" 
              onMouseEnter={() => setIsServicesOpen(true)} 
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="text-steel-700 hover:text-brand-navy-900 transition-colors duration-200 font-medium text-sm uppercase tracking-wide flex items-center">
                Services
                <ChevronDown className="ml-1 h-3 w-3" />
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl border border-steel-200 py-2 z-50">
                  {serviceItems.map(item => (
                    <a 
                      key={item.name} 
                      href={item.path}
                      className="block px-6 py-3 text-sm text-steel-700 hover:text-brand-navy-900 hover:bg-steel-50 transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div 
              className="relative" 
              onMouseEnter={() => setIsAboutOpen(true)} 
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <button className="text-steel-700 hover:text-brand-navy-900 transition-colors duration-200 font-medium text-sm uppercase tracking-wide flex items-center">
                Company
                <ChevronDown className="ml-1 h-3 w-3" />
              </button>
              {isAboutOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl border border-steel-200 py-2 z-50">
                  {aboutItems.map(item => (
                    <a 
                      key={item.name} 
                      href={item.path}
                      className="block px-6 py-3 text-sm text-steel-700 hover:text-brand-navy-900 hover:bg-steel-50 transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="text-right">
              <div className="text-xs text-steel-600 uppercase tracking-wider">Call Today</div>
              <a 
                href="tel:214-305-6516"
                className="text-brand-navy-900 font-bold text-lg hover:text-brand-navy-800 transition-colors"
              >
                214-305-6516
              </a>
            </div>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => navigate(quotePath)}
              className="ml-4"
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 hover:bg-steel-100 transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-steel-200 py-4 bg-white">
            <nav className="flex flex-col space-y-1">
              {mainNavItems.map(item => (
                <a 
                  key={item.name} 
                  href={item.path} 
                  className="text-steel-700 hover:text-brand-navy-900 transition-colors font-medium px-4 py-3 text-sm uppercase tracking-wide hover:bg-steel-50" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Services Section */}
              <div className="px-4 py-2">
                <div className="text-brand-navy-900 font-bold text-sm mb-2 uppercase tracking-wider">Services</div>
                {serviceItems.map(item => (
                  <a 
                    key={item.name} 
                    href={item.path}
                    className="block text-steel-600 hover:text-brand-navy-900 transition-colors py-2 text-sm pl-4 hover:bg-steel-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Mobile Company Section */}
              <div className="px-4 py-2">
                <div className="text-brand-navy-900 font-bold text-sm mb-2 uppercase tracking-wider">Company</div>
                {aboutItems.map(item => (
                  <a 
                    key={item.name} 
                    href={item.path}
                    className="block text-steel-600 hover:text-brand-navy-900 transition-colors py-2 text-sm pl-4 hover:bg-steel-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              
              {/* Mobile Contact */}
              <div className="px-4 pt-4 border-t border-steel-200 mt-4">
                <div className="text-center mb-4">
                  <div className="text-xs text-steel-600 uppercase tracking-wider mb-1">Call Today</div>
                  <a 
                    href="tel:214-305-6516"
                    className="text-brand-navy-900 font-bold text-xl"
                  >
                    214-305-6516
                  </a>
                </div>
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    navigate(quotePath);
                    setIsMenuOpen(false);
                  }}
                >
                  Get Quote
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default ProfessionalHeader;