import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { useBookingUrl } from "@/contexts/BookingUrlContext";

interface StickyMobileCTAProps {
  label?: string;
  threshold?: number;
}

export const StickyMobileCTA = ({
  label = "Book My Free Estimate",
  threshold = 300,
}: StickyMobileCTAProps) => {
  const url = useBookingUrl();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <>
      {/* Spacer so page content isn't hidden behind the fixed bar on mobile */}
      <div className={`md:hidden ${visible ? "h-20" : "h-0"} transition-[height] duration-300`} aria-hidden="true" />
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 bg-white/95 backdrop-blur border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!visible}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full bg-blue-900 hover:bg-blue-950 active:bg-blue-950 text-white font-semibold py-2 rounded-md text-sm"
        >
          <Calendar className="mr-2 h-4 w-4" />
          {label}
        </a>
      </div>
    </>
  );
};

export default StickyMobileCTA;
