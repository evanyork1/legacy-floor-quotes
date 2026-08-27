import { Navigate, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import Seo from "@/components/seo/Seo";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { getCareerMarket } from "@/data/careersMarkets";

const SITE_URL = "https://legacyindustrialcoatings.com";
const APPLY_EMAIL = "careers@legacyindustrialcoatings.com";

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((t) => (
      <li key={t} className="flex gap-3 text-slate-700 leading-relaxed">
        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-900 shrink-0" />
        <span>{t}</span>
      </li>
    ))}
  </ul>
);

const CareerMarketPage = () => {
  const { city } = useParams();
  const market = getCareerMarket(city);

  if (!market) return <Navigate to="/careers" replace />;

  const path = `/careers/${market.slug}`;
  const title = `Commercial Flooring Sales Rep — ${market.city}, ${market.state} | Legacy Industrial Coatings`;
  const description = `${market.headline}. Commission-only commercial flooring sales seat in ${market.city}, ${market.state}. $2,000 to $50,000 per deal, no cap, no split territories.`;

  const datePosted = "2026-01-01";
  const validThrough = "2027-01-01";

  const jobPosting = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Commercial Flooring Sales Rep",
    description: `${market.headline}. ${market.intro} Commission only, $2,000 to $50,000 per deal, no cap and no split territories. This is an experience job: commercial finish-out sales background and prior commission-only experience required.`,
    datePosted,
    validThrough,
    employmentType: "FULL_TIME",
    directApply: true,
    hiringOrganization: {
      "@type": "Organization",
      name: "Legacy Industrial Coatings",
      sameAs: SITE_URL,
      logo: `${SITE_URL}/lovable-uploads/31a07739-2d1a-4e04-afcf-284435670519.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: market.city,
        addressRegion: market.stateAbbr,
        addressCountry: "US",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: 80000,
        maxValue: 250000,
        unitText: "YEAR",
      },
    },
    url: `${SITE_URL}${path}`,
  };

  const mailto = `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(
    `Sales Rep — ${market.city}`,
  )}`;

  return (
    <div className="min-h-screen bg-white">
      <Seo title={title} description={description} path={path} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jobPosting)}</script>
      </Helmet>
      <PageBreadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Careers", url: "/careers" },
          { name: `${market.city}, ${market.state}`, url: path },
        ]}
      />
      <HeaderGeneric />

      <main>
        {/* 1. Header */}
        <section className="bg-blue-900 text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-blue-200 uppercase tracking-widest text-sm font-semibold mb-4">
              {market.city}, {market.state} — {market.seats}{" "}
              {market.seats === 1 ? "seat" : "seats"}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Commercial Flooring Sales Rep.
            </h1>
            <p className="mt-6 text-xl text-blue-100">{market.headline}</p>
            <Link
              to="/careers"
              className="inline-block mt-8 text-sm text-blue-200 hover:text-white underline underline-offset-4"
            >
              All open markets
            </Link>
          </div>
        </section>

        {/* 2. Compensation */}
        <section className="py-14 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Compensation
            </h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              This is a commission-only role. Contracts typically range from
              $20,000 to $500,000, with commission of $2,000 to $50,000 per
              deal. There is no cap and no split territories.
            </p>
          </div>
        </section>

        {/* 3. Why city */}
        <section className="py-14 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Why {market.city}
            </h2>
            <p className="mt-4 text-slate-700 leading-relaxed">{market.intro}</p>
            <div className="grid md:grid-cols-2 gap-10 mt-10">
              <div>
                <h3 className="font-bold text-slate-900 mb-4">
                  Where the work is
                </h3>
                <Bullets items={market.corridors} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Who buys</h3>
                <Bullets items={market.industries} />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Who this is for */}
        <section className="py-14 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Who this is for
            </h2>
            <p className="mt-4 text-lg font-bold text-slate-900">
              This is an experience job. Full stop.
            </p>
            <div className="mt-6">
              <Bullets
                items={[
                  "You've sold commercial finish-out. Flooring is ideal: resinous systems, polished concrete, VCT, carpet tile, LVT. Close-adjacent trades count too, including coatings, roofing, glazing, drywall and acoustical, and mechanical.",
                  "You've worked commission-only before. Not open to it. Done it.",
                  "You can read plans and specs, walk a facility, read the substrate, and build the bid yourself.",
                  `You already know facility managers, plant managers, GCs, or industrial brokers in your market.`,
                ]}
              />
            </div>
          </div>
        </section>

        {/* 5. Who this is not for */}
        <section className="py-14 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Who this is not for
            </h2>
            <div className="mt-6">
              <Bullets
                items={[
                  "Anyone who needs a base or a draw to bridge the ramp",
                  "Residential sales reps stepping up into commercial",
                  "Order takers waiting on a lead sheet",
                  "First sales job",
                ]}
              />
            </div>
            <p className="mt-6 text-slate-800 font-semibold">
              We're not going to be the ones who teach you this trade. Come in
              already knowing it.
            </p>
          </div>
        </section>

        {/* 6. What you're selling with */}
        <section className="py-14 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              What you're selling with
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  h: "Commission paid in thirds",
                  p: "A third at signed contract, a third at first draw, the balance at final collection. Every competitor you've worked for made you wait until the job collected. We don't.",
                },
                {
                  h: "Recoverable draw available",
                  p: "If you need to bridge the first ninety days, we'll advance against commission. It's a bridge, not a base.",
                },
                {
                  h: "Crews that finish clean",
                  p: "Subcontractor model, no capacity ceiling, over 200 five-star reviews. Your referrals compound instead of dying on a bad install.",
                },
                {
                  h: "Pricing in hours",
                  p: "Direct access to the owner. You're not waiting a week on a number while the GC moves on.",
                },
                {
                  h: "No cap, no split territories",
                  p: "You close it, you get paid on it.",
                },
              ].map((item) => (
                <div
                  key={item.h}
                  className="border border-slate-200 p-6 bg-white"
                >
                  <h3 className="font-bold text-slate-900">{item.h}</h3>
                  <p className="mt-2 text-slate-700 leading-relaxed">
                    {item.p}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Apply */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold">Apply</h2>
            <p className="mt-4 text-blue-100">
              Send your resume and answer three questions:
            </p>
            <ol className="mt-4 space-y-2 text-blue-100 list-decimal list-inside">
              <li>
                The last three commercial jobs you closed. What they were and
                what they were worth.
              </li>
              <li>
                Where you've worked commission-only, and what you earned doing
                it.
              </li>
              <li>
                Who you already know in {market.city} that buys flooring.
              </li>
            </ol>
            <p className="mt-4 text-blue-100">
              Short answers are fine. Specific answers get a call.
            </p>
            <a
              href={mailto}
              className="inline-block mt-8 bg-white text-blue-900 font-bold px-8 py-4 border border-white hover:bg-blue-50 transition-colors"
            >
              Email {APPLY_EMAIL}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CareerMarketPage;
