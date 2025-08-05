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
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-lg font-bold">BOOK AN ESTIMATE</div>
              <div className="text-sm text-blue-100">https://www.billygo.com/schedule/</div>
            </div>
            <Button
              onClick={() => setShowBookingModal(true)}
              variant="outline"
              size="sm"
              className="bg-white text-blue-600 border-white hover:bg-blue-50 font-semibold"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
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