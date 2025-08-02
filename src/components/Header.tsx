
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    name: "Commercial",
    path: `${homePath}#commercial`
  }, {
    name: "Gallery",
    path: "/gallery"
  }, {
    name: "How It Works",
    path: `${homePath}#how-it-works`
  }, {
    name: "About",
    path: `${homePath}#testimonials`
  }, {
    name: "Contact",
    path: `${homePath}#footer`
  }];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-28">
          {/* Logo - Responsive sizing - 20% smaller */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate(homePath)}>
            <img src="/lovable-uploads/a18e3648-17a6-4222-808b-0a78d3ea50b9.png" alt="Legacy Industrial Coatings" className="h-12 sm:h-16 md:h-19 lg:h-22 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map(item => (
              <a key={item.name} href={item.path} className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium text-sm lg:text-base">
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
  );
};

export default Header;
