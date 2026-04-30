import { Helmet } from "react-helmet-async";

const SITE_URL = "https://legacyindustrialcoatings.com";
const DEFAULT_OG_IMAGE = "/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png";

interface SeoProps {
  title: string;
  description: string;
  /** Path beginning with "/" — e.g. "/about". Used to build the canonical URL. */
  path: string;
  ogImage?: string;
  /** Set to true on gated/internal pages so they aren't indexed. */
  noindex?: boolean;
}

/**
 * Centralised <head> tags for every page: title, description, canonical,
 * Open Graph, Twitter card, and robots directive.
 *
 * Using a single component guarantees we never ship a page that's missing
 * a canonical URL or has a duplicate title.
 */
export const Seo = ({ title, description, path, ogImage, noindex }: SeoProps) => {
  const canonical = `${SITE_URL}${path}`;
  const image = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${SITE_URL}${ogImage}`
    : `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Legacy Industrial Coatings" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default Seo;
