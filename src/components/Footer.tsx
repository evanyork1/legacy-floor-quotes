import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, MapIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { SERVICE_AREA_CITIES } from "@/data/serviceAreaCities";
const Footer = () => {
  const location = useLocation();
  const handlePhoneClick = () => {
    // Call the Google Ads conversion tracking function
    if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion('tel:214-305-6516');
    }
  };
  const handlePhoneClickPHX = () => {
    if (typeof window !== 'undefined') {
      if ((window as any).gtag_report_conversion_phx) {
        (window as any).gtag_report_conversion_phx('tel:602-560-0974');
      } else if ((window as any).gtag_report_conversion) {
        (window as any).gtag_report_conversion('tel:602-560-0974');
      }
    }
  };
  const services = [
    { href: "/commercial", label: "Commercial Floor Coatings" },
    { href: "/industrial-epoxy", label: "Industrial Epoxy Flooring" },
    { href: "/concrete-polishing", label: "Polished Concrete Floors" },
    { href: "/concrete-sealing", label: "Concrete Sealing" },
    { href: "/commercial-floor-maintenance", label: "Floor Cleaning & Maintenance" },
    { href: "/garagefloors", label: "Epoxy Garage Floor Coatings" },
    { href: "/flake-floors", label: "Polyurea Flake Floor Systems" },
    { href: "/residential-patio", label: "Residential Patio Coatings" },
  ];

  const cities = SERVICE_AREA_CITIES;
  return <footer className="bg-slate-800 text-white pt-16 sm:pt-20 lg:pt-24 pb-2">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          
          {/* Company Info & Logo */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <img src="/lovable-uploads/31a07739-2d1a-4e04-afcf-284435670519.png" alt="Legacy Industrial Coatings Logo" className="h-12 sm:h-16 w-auto"  loading="eager" decoding="async" />
            </div>
          </div>

          {/* Menu */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-wider">MENU</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-blue-400 transition-colors text-sm uppercase tracking-wide">HOME</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors text-sm uppercase tracking-wide">ABOUT</a></li>
              <li><a href="/careers" className="text-gray-300 hover:text-blue-400 transition-colors text-sm uppercase tracking-wide">CAREERS</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-blue-400 transition-colors text-sm uppercase tracking-wide">FAQ</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-blue-400 transition-colors text-sm uppercase tracking-wide">BLOG</a></li>
              <li><a href="/warranty" className="text-gray-300 hover:text-blue-400 transition-colors text-sm uppercase tracking-wide">WARRANTY</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-blue-400 transition-colors text-sm uppercase tracking-wide">TERMS</a></li>
              <li><a href="/privacy" className="text-gray-300 hover:text-blue-400 transition-colors text-sm uppercase tracking-wide">PRIVACY</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-wider">CONTACT</h3>
            <div className="space-y-6">
              {/* DFW Office */}
              <div>
                <h4 className="text-white font-semibold mb-2">DFW Office</h4>
                <div className="text-gray-300 text-sm space-y-1">
                  <p>6010 W Spring Creek Parkway</p>
                  <p>Plano, TX 75024</p>
                  <a href="tel:214-305-6516" onClick={handlePhoneClick} className="text-gray-300 hover:text-blue-400 transition-colors block">
                    (214) 305-6516
                  </a>
                </div>
              </div>

              {/* Fort Worth Office */}
              <div>
                <h4 className="text-white font-semibold mb-2">Fort Worth Office</h4>
                <div className="text-gray-300 text-sm space-y-1">
                  <p>1300 Summit Ave, #520</p>
                  <p>Fort Worth, TX 76102</p>
                  <a href="tel:214-305-6516" onClick={handlePhoneClick} className="text-gray-300 hover:text-blue-400 transition-colors block">
                    (214) 305-6516
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-wider">SERVICES</h3>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-wider">SERVICE AREAS</h3>
            <div className="text-gray-300 text-sm leading-relaxed">
              <p className="font-semibold mb-3">Dallas-Fort Worth Metroplex</p>
              <a
                href="/service-areas"
                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                View all service areas →
              </a>
            </div>
          </div>

          {/* Follow */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-wider">FOLLOW</h3>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a href="https://www.instagram.com/legacyindustrialcoatings/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 p-2 rounded hover:bg-blue-700 transition-colors">
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a href="https://www.facebook.com/legacyindustrialcoatings" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-blue-600 p-2 rounded hover:bg-blue-700 transition-colors">
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a href="https://www.linkedin.com/company/legacy-industrial-coatings1" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-blue-600 p-2 rounded hover:bg-blue-700 transition-colors">
                <Linkedin className="h-5 w-5 text-white" />
              </a>
              <a href="https://maps.app.goo.gl/2idbg4BFnZVKvLNK9" target="_blank" rel="noopener noreferrer" className="bg-blue-600 p-2 rounded hover:bg-blue-700 transition-colors">
                <MapIcon className="h-5 w-5 text-white" />
              </a>
            </div>
            
            {/* Contact Details */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                
                
              </div>
              <div className="flex items-start space-x-2 -ml-10">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:support@legacyindustrialcoatings.com" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  support@legacyindustrialcoatings.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6 pb-0">
          <div className="text-center">
            <div className="text-gray-400 text-xs">
              ©2025 Legacy Industrial Coatings. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;