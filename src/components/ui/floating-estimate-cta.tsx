import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { BookingModal } from "@/components/landing/BookingModal";

export const FloatingEstimateCTA = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <>
      {/* Fixed bottom CTA block */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-blue-600 text-white shadow-2xl border-t-4 border-blue-500">
        <div className="container mx-auto px-4 py-4">
          <div 
            className="text-center cursor-pointer" 
            onClick={() => setShowBookingModal(true)}
          >
            <div className="text-lg font-bold">Book An Estimate</div>
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
      />
    </>
  );
};