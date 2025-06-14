
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
          {/* Company Info */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center mb-4 sm:mb-6">
              {/* Logo space if needed */}
            </div>
            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              The only company you need for premium warranty floors. We handle everything - quoting, scheduling, installation coordination, and warranty service.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base break-all">support@legacyindustrialcoatings.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">214-305-6516</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">Nationwide Service</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">Home</a></li>
              <li><a href="/quote" className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">Get Quote</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">About Us</a></li>
              <li><a href="/apply" className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">Become an Installer</a></li>
              <li><a href="/warranty" className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">Warranty Info</a></li>
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
            <div className="flex space-x-4 sm:space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
