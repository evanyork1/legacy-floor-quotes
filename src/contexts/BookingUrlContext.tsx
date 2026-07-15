import { createContext, useContext, useEffect, ReactNode } from "react";

const BASE_BOOKING_URL =
  "https://clienthub.getjobber.com/hubs/e7849464-5cd3-44cf-8cf8-c1fd5e2eb2fb/public/requests/4986053/new";

export const DEFAULT_BOOKING_URL = `${BASE_BOOKING_URL}?utm_source=website`;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
const STORAGE_KEY = "lic_utms";

type UtmMap = Partial<Record<(typeof UTM_KEYS)[number], string>>;

const readStoredUtms = (): UtmMap => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmMap) : {};
  } catch {
    return {};
  }
};

export const captureUtmsFromLocation = () => {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const captured: UtmMap = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) captured[key] = value;
    }
    if (Object.keys(captured).length === 0) return;
    // Merge with any previously captured UTMs so first-touch persists per key,
    // but new params override for that key.
    const merged = { ...readStoredUtms(), ...captured };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // ignore
  }
};

// Capture on module load (client-side).
if (typeof window !== "undefined") {
  captureUtmsFromLocation();
}

export const buildBookingUrl = (baseUrl: string = DEFAULT_BOOKING_URL): string => {
  try {
    const url = new URL(baseUrl);
    const stored = readStoredUtms();
    const hasStored = Object.keys(stored).length > 0;

    // If the caller-provided URL already specifies utm_source (e.g. /gpt
    // hardcodes utm_source=chatgpt), preserve it verbatim as a special case.
    if (url.searchParams.has("utm_source")) {
      return url.toString();
    }

    if (hasStored) {
      for (const key of UTM_KEYS) {
        const value = stored[key];
        if (value) url.searchParams.set(key, value);
      }
    } else {
      url.searchParams.set("utm_source", "website");
    }
    return url.toString();
  } catch {
    return baseUrl;
  }
};

const BookingUrlContext = createContext<string>(DEFAULT_BOOKING_URL);

export const BookingUrlProvider = ({
  url,
  children,
}: {
  url: string;
  children: ReactNode;
}) => {
  useEffect(() => {
    captureUtmsFromLocation();
  }, []);
  return <BookingUrlContext.Provider value={url}>{children}</BookingUrlContext.Provider>;
};

export const useBookingUrl = () => {
  const base = useContext(BookingUrlContext);
  useEffect(() => {
    captureUtmsFromLocation();
  }, []);
  return buildBookingUrl(base);
};
