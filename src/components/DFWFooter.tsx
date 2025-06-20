
import { Instagram, Phone, Mail, MapPin } from "lucide-react";

const DFWFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">Legacy Industrial Coatings</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Premier epoxy flooring and concrete coating specialists serving Dallas-Fort Worth, Plano, and Houston with lifetime warranties.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://www.instagram.com/legacyindustrialcoatings/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-blue-400" />
                <span className="text-gray-400">(214) 305-6516</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-blue-400" />
                <span className="text-gray-400">info@legacycoatings.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-blue-400" />
                <span className="text-gray-400">Dallas-Fort Worth, Plano, Houston</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Warranty Information
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Legacy Industrial Coatings. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default DFWFooter;
