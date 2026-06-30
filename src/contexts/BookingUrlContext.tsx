import { createContext, useContext, ReactNode } from "react";

export const DEFAULT_BOOKING_URL =
  "https://clienthub.getjobber.com/hubs/e7849464-5cd3-44cf-8cf8-c1fd5e2eb2fb/public/requests/2372073/new?utm_source=website";

const BookingUrlContext = createContext<string>(DEFAULT_BOOKING_URL);

export const BookingUrlProvider = ({
  url,
  children,
}: {
  url: string;
  children: ReactNode;
}) => <BookingUrlContext.Provider value={url}>{children}</BookingUrlContext.Provider>;

export const useBookingUrl = () => useContext(BookingUrlContext);
