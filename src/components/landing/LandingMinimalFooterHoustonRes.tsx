import { Facebook, Instagram } from "lucide-react";

export const LandingMinimalFooterHoustonRes = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <img 
              src="/lovable-uploads/de4de16e-71f2-4d7d-822d-5532d41f72cd.png" 
              alt="Legacy Industrial Coatings" 
              className="h-16 w-auto mb-4 filter brightness-0 invert" 
            />
            <p className="text-gray-300 text-sm">
              Premium concrete coatings and epoxy flooring solutions. Professional installation with lifetime warranty.
            </p>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Polyurea Floor Coatings</li>
              <li>Epoxy Flooring</li>
              <li>Concrete Polishing</li>
              <li>Commercial Coatings</li>
              <li>Garage Floor Coating</li>
            </ul>
          </div>

          {/* Locations */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Houston</li>
              <li>Dallas</li>
              <li>Plano</li>
              <li>Phoenix</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>Phone: 214-305-6516</p>
              <p>Email: info@legacyindustrialcoatings.com</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Legacy Industrial Coatings. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};