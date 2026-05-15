import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BOOKING_URL =
  "https://clienthub.getjobber.com/hubs/e7849464-5cd3-44cf-8cf8-c1fd5e2eb2fb/public/requests/2372073/new?utm_source=website";

export const LeadFormModal = ({ isOpen, onClose }: LeadFormModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-gray-900">
            Thank You for Submitting!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 text-center">
          <p className="text-gray-600">
            We will reach out within 2 hours! Want to schedule your estimate faster?
          </p>
          
          <div className="space-y-3">
            <Button 
              asChild 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            >
              <a href="tel:214-305-6516">
                <Phone className="mr-2 h-4 w-4" />
                Call Us Now: 214-305-6516
              </a>
            </Button>
            
            <Button 
              onClick={() => setShowIframe(true)}
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Schedule Estimate Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};