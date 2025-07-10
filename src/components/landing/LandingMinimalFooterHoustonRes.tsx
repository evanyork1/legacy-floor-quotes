import { Mail, Phone, MapPin, Instagram } from "lucide-react";

export const LandingMinimalFooterHoustonRes = () => {
  const handlePhoneClick = () => {
    // Call the Google Ads conversion tracking function
    if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion('tel:214-305-6516');
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Company Info */}
          <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-10 lg:mb-12">
            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Family owned and operated in Dallas, we are committed to installing the highest quality residential and commercial flooring products available.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
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
                <span className="text-gray-300 text-sm sm:text-base">Houston, Dallas, Plano, Phoenix</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © 2025 Legacy Industrial Coatings. All rights reserved.
            </div>
            <div className="flex justify-center">
              <a href="https://www.instagram.com/legacyindustrialcoatings/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 p-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-110">
                <Instagram className="h-6 w-6 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};