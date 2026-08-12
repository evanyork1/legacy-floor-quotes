/**
 * Central map of the Commercial mega-menu.
 * `slug` refers to the entry in commercialIndustries.ts / commercialSystems.ts.
 * `path` is the public URL for that page (every page gets its own top-level URL).
 * `external: true` means the page already existed on this site — we link to it,
 * we never duplicate it.
 */
export type NavEntry = {
  label: string;
  path: string;
  slug?: string;
  existing?: boolean;
};

export const APPLICATIONS: NavEntry[] = [
  { label: "Industrial & Warehouse", path: "/warehouse-flooring", slug: "industrial-warehouse" },
  { label: "Manufacturing", path: "/manufacturing-floor-coating", slug: "manufacturing" },
  { label: "Data Center", path: "/data-center-flooring", slug: "data-center" },
  { label: "Healthcare", path: "/healthcare-flooring", slug: "healthcare" },
  { label: "Education", path: "/school-flooring", slug: "education" },
  { label: "Hotel & Hospitality", path: "/hotel-flooring", slug: "hotel-hospitality" },
  { label: "Aerospace", path: "/aerospace-hangar-flooring", slug: "aerospace" },
  { label: "Multifamily", path: "/multifamily-flooring", slug: "multifamily" },
  { label: "Office & Corporate", path: "/office-flooring", slug: "office-corporate" },
  { label: "Retail", path: "/retail-flooring", slug: "retail" },
  { label: "Agriculture Facilities", path: "/agriculture-facility-flooring", slug: "agriculture-facilities" },
];

export const SOLUTIONS: NavEntry[] = [
  { label: "Epoxy", path: "/industrial-epoxy", existing: true },
  { label: "Resinous Flooring", path: "/resinous-flooring", slug: "epoxy-flooring" },
  { label: "Urethane Cement", path: "/urethane-cement-flooring", slug: "urethane-cement" },
  { label: "Quartz Flooring", path: "/quartz-flooring", slug: "quartz-flooring" },
  { label: "Polished Concrete", path: "/concrete-polishing", existing: true },
  { label: "Specialty Systems", path: "/specialty-floor-systems", slug: "specialty-systems" },
  { label: "Static-Control (ESD)", path: "/esd-static-control-flooring", slug: "static-control-flooring" },
  { label: "Deck Coatings", path: "/deck-coatings", slug: "deck-coatings" },
  { label: "Sealed Concrete", path: "/concrete-sealing", existing: true },
  { label: "Flake Floors", path: "/flake-floors", existing: true },
  { label: "Maintenance", path: "/commercial-floor-maintenance", existing: true },
];

/** Every commercial URL that should appear in the sitemap. */
export const COMMERCIAL_NEW_PATHS = [
  ...APPLICATIONS.map((a) => a.path),
  ...SOLUTIONS.filter((s) => !s.existing).map((s) => s.path),
];
