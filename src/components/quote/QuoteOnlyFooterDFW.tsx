
import { Mail, Phone, MapPin } from "lucide-react";

export const QuoteOnlyFooterDFW = () => {
  const handlePhoneClick = () => {
    // Call the Google Ads conversion tracking function
    if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion('tel:214-305-6516');
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-14 lg:gap-16 mb-12 sm:mb-14 lg:mb-16">
          {/* Company Info */}
          <div className="space-y-4 sm:space-y-6">
            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Family owned and operated in Dallas, we are committed to installing the highest quality residential and commercial flooring products available.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base break-all">support@legacyindustrialcoatings.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span onClick={handlePhoneClick} className="text-gray-300 text-sm sm:text-base cursor-pointer hover:text-blue-400 transition-colors">
                  214-305-6516
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">Plano, Dallas, Houston, Phoenix</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-center items-center">
            <div className="text-gray-400 text-xs sm:text-sm text-center">
              © 2025 Legacy Industrial Coatings. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
