import { useEffect } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BOOKING_URL =
  "https://clienthub.getjobber.com/hubs/e7849464-5cd3-44cf-8cf8-c1fd5e2eb2fb/public/requests/2372073/new?utm_source=website";

export const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  useEffect(() => {
    if (isOpen) {
      window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
      onClose();
    }
  }, [isOpen, onClose]);

  return null;
};
