import { Dialog, DialogContent } from "@/components/ui/dialog";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] p-0">
        <iframe
          src="https://clienthub.getjobber.com/hubs/e7849464-5cd3-44cf-8cf8-c1fd5e2eb2fb/public/requests/2372073/new?utm_source=website"
          className="w-full h-[70vh] border-0"
          title="Schedule Your Estimate Now"
        />
      </DialogContent>
    </Dialog>
  );
};