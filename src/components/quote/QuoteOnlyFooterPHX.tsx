
const QuoteOnlyFooterPHX = () => {
  const handlePhoneClick = () => {
    // Call the Google Ads conversion tracking function for PHX
    if (typeof window !== 'undefined') {
      if ((window as any).gtag_report_conversion_phx) {
        (window as any).gtag_report_conversion_phx('tel:602-560-0974');
      } else if ((window as any).gtag_report_conversion) {
        (window as any).gtag_report_conversion('tel:602-560-0974');
      }
    }
  };

  return (
    <footer className="bg-slate-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="space-y-2">
            <p className="text-gray-300 text-sm">
              Legacy Industrial Coatings - Professional epoxy flooring experts serving the Phoenix metro area.
            </p>
            <p className="text-gray-300 text-sm">
              Licensed & Insured | Family Owned & Operated
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
            <a 
              href="mailto:support@legacyindustrialcoatings.com" 
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              support@legacyindustrialcoatings.com
            </a>
            <span className="hidden sm:inline text-gray-500">|</span>
            <a 
              href="tel:602-560-0974" 
              onClick={handlePhoneClick}
              className="text-gray-300 hover:text-blue-400 transition-colors font-semibold"
            >
              (602) 560-0974
            </a>
          </div>

          <div className="text-gray-400 text-xs pt-4 border-t border-gray-700">
            <p>Serving Phoenix, Scottsdale, Mesa, Tempe, Gilbert, Chandler, Glendale & Greater Phoenix Metro</p>
            <p className="mt-2">©2025 Legacy Industrial Coatings. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { QuoteOnlyFooterPHX };
