import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import { Seo } from "@/components/seo/Seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Calendar,
  Building2,
  Factory,
  Warehouse,
  Hammer,
  Shield,
  CheckCircle2,
  MapPin,
  Home,
} from "lucide-react";
import { getCityBySlug, SERVICE_AREA_CITIES } from "@/data/serviceAreaCities";

const PHONE_DISPLAY = "214-305-6516";
const PHONE_HREF = "tel:+12143056516";
const BOOK_URL =
  "https://clienthub.getjobber.com/hubs/e7849464-5cd3-44cf-8cf8-c1fd5e2eb2fb/public/requests/2372073/new?utm_source=website";

const openBooking = () => window.open(BOOK_URL, "_blank", "noopener,noreferrer");

const COMMERCIAL_PHOTOS = [
  { src: "/lovable-uploads/171b7f71-4aa3-4b54-8c96-5f7143dddebf.png", alt: "Commercial epoxy floor installation in DFW warehouse" },
  { src: "/lovable-uploads/4a97932b-03f2-42ab-9e2f-2a90852befc0.png", alt: "Industrial urethane cement floor coating" },
  { src: "/lovable-uploads/b5e6bdc4-80f9-44ea-a580-29d22662f7d4.png", alt: "Commercial polished concrete floor" },
  { src: "/lovable-uploads/85530262-ab7f-4339-af86-ed63ee721679.png", alt: "Warehouse floor coating with line striping" },
];

const RESIDENTIAL_PHOTOS = [
  { src: "/lovable-uploads/008e4edb-0e9b-4952-8a51-b7d92f110955.png", alt: "Residential garage with speckled polyurea flake floor" },
  { src: "/lovable-uploads/e57c7675-310f-4345-ba29-137d7f5b6fc2.png", alt: "Large residential garage with premium epoxy coating" },
  { src: "/lovable-uploads/afa49718-8e01-4090-bf6e-4e50dd95630c.png", alt: "BMW on premium speckled garage floor" },
  { src: "/lovable-uploads/624693af-bec7-4554-be4d-134ef392147c.png", alt: "Sports cars on high-end residential garage floor" },
];

const CTAButtons = ({ city, variant = "default" }: { city: string; variant?: "default" | "light" }) => (
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
    <Button
      size="lg"
      onClick={openBooking}
      className="text-base"
    >
      <Calendar className="mr-2 h-5 w-5" />
      Book an Estimate in {city}
    </Button>
    <Button
      asChild
      size="lg"
      variant={variant === "light" ? "secondary" : "outline"}
      className="text-base"
    >
      <a href={PHONE_HREF}>
        <Phone className="mr-2 h-5 w-5" />
        Call {PHONE_DISPLAY}
      </a>
    </Button>
  </div>
);

const EpoxyFlooringCity = () => {
  const { city: slug } = useParams<{ city: string }>();
  const city = slug ? getCityBySlug(slug) : undefined;

  if (!city) {
    return <Navigate to="/service-areas" replace />;
  }

  const title = `Commercial & Residential Epoxy Flooring in ${city.name}, TX | Legacy Industrial Coatings`;
  const description = `Industrial epoxy, urethane cement, polished concrete and polyurea garage floors in ${city.name}, ${city.county}. Commercial-grade flooring contractor serving GCs, facility managers, and homeowners across DFW.`;

  const neighbors = city.nearbyCities
    .map((s) => SERVICE_AREA_CITIES.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => !!c);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Legacy Industrial Coatings — ${city.name}`,
    image: "https://legacyindustrialcoatings.com/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png",
    url: `https://legacyindustrialcoatings.com/epoxy-flooring/${city.slug}`,
    telephone: "+1-214-305-6516",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "6010 W Spring Creek Pkwy",
      addressLocality: "Plano",
      addressRegion: "TX",
      postalCode: "75024",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: `${city.name}, TX`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={title}
        description={description}
        path={`/epoxy-flooring/${city.slug}`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <HeaderGeneric />

      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <MapPin className="h-4 w-4" /> {city.county}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Commercial &amp; Residential Epoxy Flooring in {city.name}, TX
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Industrial epoxy, urethane cement, polished concrete, and polyurea
            coatings for {city.name} businesses, warehouses, restaurants, medical
            facilities — and the homeowner down the street.
          </p>
          <CTAButtons city={city.name} />
        </section>

        {/* Local intro */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <Card>
            <CardContent className="p-6 sm:p-8">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {city.localHook}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Commercial-first section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide mb-3">
              <Building2 className="h-4 w-4" /> Primary focus
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              Commercial &amp; Industrial Flooring in {city.name}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              {city.commercialAngle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: Warehouse,
                title: "Warehouse & Distribution",
                copy: "High-build epoxy and urethane cement systems engineered for forklift traffic, racking loads, and 24/7 operations.",
              },
              {
                icon: Factory,
                title: "Manufacturing & Industrial",
                copy: "Chemical-resistant urethane cement, thermal-shock-rated systems, and anti-slip topcoats for production environments.",
              },
              {
                icon: Building2,
                title: "Retail, Restaurant & Medical TI",
                copy: "Polished concrete, decorative epoxy, and food-service-grade urethane cement coordinated with the GC's schedule.",
              },
              {
                icon: Shield,
                title: "ESD / Anti-Static Floors",
                copy: "Conductive and static-dissipative epoxy for electronics manufacturing, lab spaces, and data centers.",
              },
              {
                icon: Hammer,
                title: "Polished Concrete",
                copy: "FF/FL-flat mechanically polished concrete for showrooms, lobbies, and high-traffic retail in {city.name}.",
              },
              {
                icon: CheckCircle2,
                title: "GC-Ready Bids",
                copy: "ITB-ready packages, full insurance, OSHA-compliant safety plans, and night/weekend pours in occupied facilities.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title}>
                  <CardHeader className="p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-base sm:text-lg">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 sm:p-6 pt-0 text-sm sm:text-base text-muted-foreground">
                    {item.copy.replace("{city.name}", city.name)}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8 sm:mt-10">
            <CTAButtons city={city.name} />
          </div>
        </section>

        {/* Why commercial buyers in city pick us */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <Card className="bg-muted/40">
            <CardHeader className="p-5 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl">
                Why {city.name} GCs &amp; Facility Managers Pick Legacy
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 sm:p-6 pt-0">
              <ul className="grid sm:grid-cols-2 gap-3 text-sm sm:text-base text-muted-foreground">
                {[
                  "Direct relationships with national and regional GCs across DFW",
                  "Full general liability and workers' comp on every job",
                  "OSHA-compliant crews — safety plans submitted with the bid",
                  "Night, weekend, and phased pours in occupied buildings",
                  "In-house diamond grinding, shot blasting, and crack repair",
                  "Manufacturer-certified installer for major coating systems",
                  `Local team — headquartered in Plano, working ${city.name} regularly`,
                  "Realistic schedules — we hit our dates",
                ].map((reason) => (
                  <li key={reason} className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Residential (secondary) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-foreground text-xs font-semibold uppercase tracking-wide mb-3">
              <Home className="h-4 w-4" /> Also serving homeowners
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              Residential Garage &amp; Patio Floors in {city.name}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              {city.residentialAngle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "Polyurea Flake Garage Floors",
                copy: "One-day install, lifetime warranty, full slab prep and crack repair included.",
              },
              {
                title: "Patios, Walkways & Pool Decks",
                copy: "UV-stable, slip-rated coatings built for Texas sun and pool chemistry.",
              },
              {
                title: "Workshops & Detached Garages",
                copy: "Same commercial-grade systems we install in industrial buildings, sized to your home.",
              },
            ].map((item) => (
              <Card key={item.title}>
                <CardHeader className="p-5 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-5 sm:p-6 pt-0 text-sm sm:text-base text-muted-foreground">
                  {item.copy}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center">
            {city.name} Flooring FAQs
          </h2>
          <div className="space-y-4">
            {city.faqs.map((faq) => (
              <Card key={faq.q}>
                <CardHeader className="p-5 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent className="p-5 sm:p-6 pt-0 text-sm sm:text-base text-muted-foreground">
                  {faq.a}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Nearby cities */}
        {neighbors.length > 0 && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 text-center">
              We Also Serve Nearby Cities
            </h2>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {neighbors.map((n) => (
                <Link
                  key={n.slug}
                  to={`/epoxy-flooring/${n.slug}`}
                  className="px-3 sm:px-4 py-2 bg-muted/50 hover:bg-muted rounded-full text-sm font-medium text-foreground transition-colors"
                >
                  Epoxy Flooring in {n.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Quote Your {city.name} Project?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            Whether it's a 200,000 sq ft warehouse, a 12-restaurant TI package,
            or a single residential garage — we'll be on-site fast with a
            realistic scope and price.
          </p>
          <CTAButtons city={city.name} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EpoxyFlooringCity;
