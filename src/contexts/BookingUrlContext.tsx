import { createContext, useContext, useEffect, ReactNode } from "react";

const BASE_BOOKING_URL =
  "https://clienthub.getjobber.com/hubs/e7849464-5cd3-44cf-8cf8-c1fd5e2eb2fb/public/requests/4986053/new";

/** Bare base link — attribution params are appended at click time. */
export const DEFAULT_BOOKING_URL = BASE_BOOKING_URL;

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid", "fbclid", "msclkid"] as const;

const STORAGE_KEY = "lic_utms";
const TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

type AttributionKey = (typeof UTM_KEYS)[number] | (typeof CLICK_ID_KEYS)[number];
type UtmMap = Partial<Record<AttributionKey, string>>;

type StoredAttribution = {
  data: UtmMap;
  ts: number;
};

const readRaw = (): StoredAttribution | null => {
  if (typeof window === "undefined") return null;
  for (const store of [window.localStorage, window.sessionStorage]) {
    try {
      const raw = store.getItem(STORAGE_KEY);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      // Backwards-compat: older versions stored the flat map directly.
      if (parsed && typeof parsed === "object" && "data" in parsed) {
        const stored = parsed as StoredAttribution;
        if (Date.now() - stored.ts > TTL_MS) continue;
        return stored;
      }
      return { data: parsed as UtmMap, ts: Date.now() };
    } catch {
      // try next store
    }
  }
  return null;
};

export const readStoredUtms = (): UtmMap => readRaw()?.data ?? {};

const writeStoredUtms = (data: UtmMap) => {
  if (typeof window === "undefined") return;
  const payload = JSON.stringify({ data, ts: Date.now() } satisfies StoredAttribution);
  try {
    window.localStorage.setItem(STORAGE_KEY, payload);
  } catch {
    // ignore
  }
  try {
    window.sessionStorage.setItem(STORAGE_KEY, payload);
  } catch {
    // ignore
  }
};

/** Map a referrer hostname to a coarse source/medium pair. */
const sourceFromReferrer = (referrer: string): UtmMap => {
  if (!referrer) return { utm_source: "direct", utm_medium: "none" };
  let host = "";
  try {
    host = new URL(referrer).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return { utm_source: "direct", utm_medium: "none" };
  }

  if (typeof window !== "undefined" && host === window.location.hostname.replace(/^www\./, "")) {
    return {};
  }

  if (/(^|\.)google\./.test(host)) return { utm_source: "google", utm_medium: "organic" };
  if (/(^|\.)bing\./.test(host)) return { utm_source: "bing", utm_medium: "organic" };
  if (/(^|\.)(duckduckgo|yahoo|ecosia)\./.test(host))
    return { utm_source: host.split(".")[0], utm_medium: "organic" };
  if (/(facebook|fb\.com|instagram)/.test(host))
    return { utm_source: host.includes("instagram") ? "instagram" : "facebook", utm_medium: "social" };
  if (/(chatgpt|openai)/.test(host)) return { utm_source: "chatgpt", utm_medium: "referral" };
  if (/(youtube)/.test(host)) return { utm_source: "youtube", utm_medium: "social" };
  if (/(nextdoor|yelp|linkedin|tiktok|pinterest|x\.com|twitter)/.test(host))
    return { utm_source: host.split(".")[0], utm_medium: "referral" };

  return { utm_source: host, utm_medium: "referral" };
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
    for (const key of CLICK_ID_KEYS) {
      const value = params.get(key);
      if (value) captured[key] = value;
    }

    const hasGoogleClickId = Boolean(captured.gclid || captured.gbraid || captured.wbraid);

    // Google Ads auto-tagging only appends gclid/gbraid/wbraid — no UTMs.
    if (hasGoogleClickId && !captured.utm_source) {
      captured.utm_source = "google";
      captured.utm_medium = captured.utm_medium || "cpc";
    }
    if (captured.fbclid && !captured.utm_source) {
      captured.utm_source = "facebook";
      captured.utm_medium = captured.utm_medium || "paid_social";
    }
    if (captured.msclkid && !captured.utm_source) {
      captured.utm_source = "bing";
      captured.utm_medium = captured.utm_medium || "cpc";
    }

    if (Object.keys(captured).length > 0) {
      // New tagged visit: merge over any previous values (last paid touch wins
      // for the keys present, older keys persist).
      writeStoredUtms({ ...readStoredUtms(), ...captured });
      return;
    }

    // Untagged landing. Only infer from referrer if we have nothing stored yet,
    // so we never overwrite a real ad click captured earlier in the journey.
    if (Object.keys(readStoredUtms()).length > 0) return;

    const inferred = sourceFromReferrer(
      typeof document !== "undefined" ? document.referrer || "" : ""
    );
    if (Object.keys(inferred).length > 0) writeStoredUtms(inferred);
  } catch {
    // ignore
  }
};

// Capture on module load (client-side).
if (typeof window !== "undefined") {
  captureUtmsFromLocation();
}

/**
 * Build the Jobber booking URL with attribution appended.
 *
 * Any params already present on `baseUrl` are treated as an explicit override
 * (e.g. /gpt pins utm_source=chatgpt) and are never replaced by stored values.
 */
export const buildBookingUrl = (baseUrl: string = DEFAULT_BOOKING_URL): string => {
  try {
    const url = new URL(baseUrl);
    const stored = readStoredUtms();

    for (const key of [...UTM_KEYS, ...CLICK_ID_KEYS] as AttributionKey[]) {
      const value = stored[key];
      if (value && !url.searchParams.has(key)) {
        url.searchParams.set(key, value);
      }
    }

    if (!url.searchParams.has("utm_source")) {
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
