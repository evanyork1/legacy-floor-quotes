import { StructuredData } from "./StructuredData";

interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Lightweight wrapper that emits ONLY a BreadcrumbList JSON-LD block.
 * Use on every public page to give Google an explicit site hierarchy.
 * The first crumb should always be { name: "Home", url: "/" }.
 */
export const PageBreadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => (
  <StructuredData
    includeLocalBusiness={false}
    includeOrganization={false}
    breadcrumbs={items}
  />
);

export default PageBreadcrumbs;
