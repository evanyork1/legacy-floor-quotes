import { Helmet } from "react-helmet-async";
import { DFW_CITIES } from "@/constants/serviceAreas";

interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface StructuredDataProps {
  includeLocalBusiness?: boolean;
  includeOrganization?: boolean;
  services?: Array<{ name: string; description: string; url?: string }>;
  faqs?: FAQItem[];
  breadcrumbs?: BreadcrumbItem[];
}

const SITE_URL = "https://legacyindustrialcoatings.com";

export const StructuredData = ({
  includeLocalBusiness = true,
  includeOrganization = true,
  services,
  faqs,
  breadcrumbs,
}: StructuredDataProps) => {
  const schemas: Record<string, unknown>[] = [];

  if (includeOrganization) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Legacy Industrial Coatings",
      url: SITE_URL,
      logo: `${SITE_URL}/lovable-uploads/31a07739-2d1a-4e04-afcf-284435670519.png`,
      sameAs: [
        "https://www.instagram.com/legacyindustrialcoatings/",
        "https://www.facebook.com/legacyindustrialcoatings",
        "https://maps.app.goo.gl/2idbg4BFnZVKvLNK9",
      ],
    });
  }

  if (includeLocalBusiness) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}#localbusiness`,
      name: "Legacy Industrial Coatings",
      description:
        "Premium epoxy flooring, polyurea garage coatings, mechanical polished concrete, and industrial floor coatings serving the Dallas-Fort Worth Metroplex.",
      image: `${SITE_URL}/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png`,
      url: SITE_URL,
      telephone: "+1-214-305-6516",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "6010 W Spring Creek Parkway",
        addressLocality: "Plano",
        addressRegion: "TX",
        postalCode: "75024",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 33.0198,
        longitude: -96.6989,
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Dallas-Fort Worth Metroplex" },
        ...DFW_CITIES.map((city) => ({
          "@type": "City",
          name: `${city}, TX`,
        })),
      ],
      makesOffer: [
        "Epoxy flooring",
        "Concrete polishing",
        "Industrial coatings",
        "Garage floor coatings",
        "Commercial flooring",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "16:00",
        },
      ],
      sameAs: [
        "https://www.instagram.com/legacyindustrialcoatings/",
        "https://www.facebook.com/legacyindustrialcoatings",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "190",
      },
    });
  }

  if (services && services.length > 0) {
    services.forEach((s) => {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: s.name,
        name: s.name,
        description: s.description,
        provider: {
          "@type": "LocalBusiness",
          name: "Legacy Industrial Coatings",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Dallas-Fort Worth Metroplex",
        },
        url: s.url ? `${SITE_URL}${s.url}` : undefined,
      });
    });
  }

  if (faqs && faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    });
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: b.url.startsWith("http") ? b.url : `${SITE_URL}${b.url}`,
      })),
    });
  }

  return (
    <Helmet>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default StructuredData;
