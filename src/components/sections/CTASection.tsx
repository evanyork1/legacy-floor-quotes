
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/ui/cta-button";
import { ArrowRight, Phone, Calendar } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { BookingModal } from "@/components/landing/BookingModal";

const CTASection = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine quote path based on current location
  const isCommercial = location.pathname === '/dfwcommercial';
  const quotePath = '/contact';

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90"></div>
      <div className="container mx-auto px-4 text-center relative">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          {isCommercial ? "Ready for your commercial flooring project?" : "Ready to discover your new floor?"}
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {isCommercial 
            ? "Contact our commercial specialists for a professional consultation and project assessment"
            : "Get your free instant quote and experience Legacy's full-service approach"
          }
        </p>
        {isCommercial ? (
          <CTAButton 
            asChild 
            variant="primary"
            size="lg"
            icon={<Phone />}
            fullWidthMobile={true}
            className="bg-white text-blue-600 hover:bg-gray-50"
          >
            <a 
              href="tel:214-305-6516" 
              onClick={() => {
                // Call new conversion tracking for /dfwcommercial
                if (typeof window !== 'undefined' && window.location.pathname === '/dfwcommercial' && (window as any).gtag_report_conversion_new) {
                  (window as any).gtag_report_conversion_new('tel:214-305-6516');
                }
              }}
            >
              Call Commercial Team
            </a>
          </CTAButton>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton 
              onClick={() => navigate('/contact')} 
              variant="outline"
              size="lg"
              icon={<ArrowRight />}
              iconPosition="right"
              fullWidthMobile={true}
              className="!bg-white !text-blue-600 hover:!bg-gray-50 border-white"
            >
              Contact Us
            </CTAButton>
            
            <CTAButton
              onClick={() => setShowBookingModal(true)}
              variant="outline"
              size="lg"
              icon={<Calendar />}
              fullWidthMobile={true}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600"
            >
              Book An Estimate
            </CTAButton>
          </div>
        )}
      </div>
      
      <BookingModal 
        isOpen={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
      />
    </section>
  );
};

export default CTASection;
