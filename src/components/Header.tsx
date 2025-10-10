
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResidentialOpen, setIsResidentialOpen] = useState(false);
  const [isCommercialOpen, setIsCommercialOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Force DFW context for this header
  const isDFW = true;
  
  // Always use DFW paths
  const quotePath = '/quotedfw';
  const homePath = '/dfw';
  
  const navItems = [{
    name: "Home",
    path: homePath
  }, {
    name: "Gallery",
    path: "/gallery"
  }, {
    name: "Contact",
    path: "/contact"
  }];

const aboutItems = [
  { name: "About Us", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Additional Services", path: "/additional-services" },
  { name: "FAQ", path: "/faq" },
  { name: "Financing", path: "/financing" }
];

const residentialItems = [
  { name: "Garage Floors", path: "/garagefloors" },
  { name: "Patios", path: "/residential-patio" },
  { name: "Additional Services", path: "/additional-services" }
];

  const commercialItems = [
    { name: "Flake Floors", path: "/flake-floors" },
    { name: "Industrial Epoxy", path: "/industrial-epoxy" },
    { name: "Concrete Polishing", path: "/concrete-polishing" },
    { name: "Dealerships", path: "/dealershipfloors" }
  ];

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-28">
          {/* Logo - Responsive sizing - 20% smaller */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate(homePath)}>
            <img src="/lovable-uploads/a18e3648-17a6-4222-808b-0a78d3ea50b9.png" alt="Legacy Industrial Coatings" className="h-12 sm:h-16 md:h-19 lg:h-22 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href={navItems[0].path} className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium text-xs lg:text-sm">
              {navItems[0].name}
            </a>
            
            {/* Residential Dropdown */}
            <div className="relative" onMouseEnter={() => setIsResidentialOpen(true)} onMouseLeave={() => setIsResidentialOpen(false)}>
              <button 
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium text-xs lg:text-sm flex items-center"
              >
                Residential
                <ChevronDown className="ml-1 h-3 w-3" />
              </button>
              {isResidentialOpen && (
                <div className="absolute top-full left-0 mt-0 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {residentialItems.map(item => (
                    <a 
                      key={item.name} 
                      href={item.path}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Commercial Dropdown */}
            <div className="relative" onMouseEnter={() => setIsCommercialOpen(true)} onMouseLeave={() => setIsCommercialOpen(false)}>
              <button 
                onClick={() => navigate('/commercial')}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium text-xs lg:text-sm flex items-center"
              >
                Commercial
                <ChevronDown className="ml-1 h-3 w-3" />
              </button>
              {isCommercialOpen && (
                <div className="absolute top-full left-0 mt-0 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {commercialItems.map(item => (
                    <a 
                      key={item.name} 
                      href={item.path}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div className="relative" onMouseEnter={() => setIsAboutOpen(true)} onMouseLeave={() => setIsAboutOpen(false)}>
              <button 
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium text-xs lg:text-sm flex items-center"
              >
                About
                <ChevronDown className="ml-1 h-3 w-3" />
              </button>
              {isAboutOpen && (
                <div className="absolute top-full left-0 mt-0 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {aboutItems.map(item => (
                    <a 
                      key={item.name} 
                      href={item.path}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            
            {navItems.slice(1).map(item => (
              <a key={item.name} href={item.path} className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium text-xs lg:text-sm">
                {item.name}
              </a>
            ))}
            
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 lg:px-6 text-sm lg:text-base">
              <a href="tel:214-305-6516">
                <Phone className="mr-2 h-4 w-4" />
                214-305-6516
              </a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 bg-white">
            <nav className="flex flex-col space-y-4">
              {navItems.map(item => (
                <a key={item.name} href={item.path} className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium px-4 py-3 text-base rounded-lg hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Residential Section */}
              <div className="px-4">
                <div className="text-gray-800 font-semibold text-base mb-2">Residential</div>
                {residentialItems.map(item => (
                  <a 
                    key={item.name} 
                    href={item.path}
                    className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2 text-sm pl-4 rounded-lg hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Mobile Commercial Section */}
              <div className="px-4">
                <div className="text-gray-800 font-semibold text-base mb-2">Commercial</div>
                {commercialItems.map(item => (
                  <a 
                    key={item.name} 
                    href={item.path}
                    className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2 text-sm pl-4 rounded-lg hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Mobile About Section */}
              <div className="px-4">
                <div className="text-gray-800 font-semibold text-base mb-2">About</div>
                {aboutItems.map(item => (
                  <a 
                    key={item.name} 
                    href={item.path}
                    className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2 text-sm pl-4 rounded-lg hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              
              <div className="px-4 pt-2">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-full py-3 text-base font-medium">
                  <a href="tel:214-305-6516" onClick={() => setIsMenuOpen(false)}>
                    <Phone className="mr-2 h-4 w-4" />
                    214-305-6516
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
    </>
  );
};

export default Header;
