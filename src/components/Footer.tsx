import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { useLocation } from "react-router-dom";
const Footer = () => {
  const location = useLocation();
  const isDFW = location.pathname === '/dfw';
  const serviceArea = isDFW ? "Dallas, Plano, Houston" : "Nationwide Service";
  const handlePhoneClick = () => {
    // Call the Google Ads conversion tracking function
    if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion('tel:214-305-6516');
    }
  };
  return <footer className="bg-gray-900 text-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
          {/* Company Info */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center mb-4 sm:mb-6">
              {/* Logo space if needed */}
            </div>
            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">Family owned and operated in Dallas, we are committed to installing the highest quality residential and commercial flooring products available.</p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base break-all">support@legacyindustrialcoatings.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-3 flex-shrink-0" />
                <a href="tel:214-305-6516" onClick={handlePhoneClick} className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">
                  214-305-6516
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">{serviceArea}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">Home</a></li>
              <li><a href="/quote" className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">Get Quote</a></li>
              <li><a href="/gallery" className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">Gallery</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">About Us</a></li>
              <li><a href="/apply" className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">Become an Installer</a></li>
              <li><a href="/warranty" className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">Warranty Info</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">Terms and Conditions</a></li>
              <li><a href="/privacy" className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Third column can be added here if needed */}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © 2025 Legacy Industrial Coatings. All rights reserved.
            </div>
            <div className="flex justify-center">
              <a href="#" className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-110">
                <Instagram className="h-6 w-6 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;