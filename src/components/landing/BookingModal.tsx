import { useEffect } from "react";
import { useBookingUrl } from "@/contexts/BookingUrlContext";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const url = useBookingUrl();

  useEffect(() => {
    if (isOpen) {
      window.open(url, "_blank", "noopener,noreferrer");
      onClose();
    }
  }, [isOpen, onClose, url]);

  return null;
};
