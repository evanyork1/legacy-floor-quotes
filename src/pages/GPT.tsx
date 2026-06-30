import DFW from "./DFW";
import { BookingUrlProvider } from "@/contexts/BookingUrlContext";

const GPT_BOOKING_URL =
  "https://clienthub.getjobber.com/hubs/e7849464-5cd3-44cf-8cf8-c1fd5e2eb2fb/public/requests/2372073/new?utm_source=chatgpt";

const GPT = () => (
  <BookingUrlProvider url={GPT_BOOKING_URL}>
    <DFW />
  </BookingUrlProvider>
);

export default GPT;
