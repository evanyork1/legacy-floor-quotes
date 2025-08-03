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
          src="https://clienthub.getjobber.com/booking/6d9d5f65-b789-442b-929c-940430d7028d"
          className="w-full h-[70vh] border-0"
          title="Book An Estimate"
        />
      </DialogContent>
    </Dialog>
  );
};