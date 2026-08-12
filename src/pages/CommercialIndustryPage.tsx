import { useState } from "react";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import { Seo } from "@/components/seo/Seo";
import { StructuredData } from "@/components/seo/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Phone, AlertTriangle } from "lucide-react";
import { BookingModal } from "@/components/landing/BookingModal";
import { getIndustry } from "@/data/commercialIndustries";
import { APPLICATIONS, SOLUTIONS } from "@/data/commercialNav";
import NotFound from "@/pages/NotFound";

interface Props {
  slug: string;
}

const CommercialIndustryPage = ({ slug }: Props) => {
  const [showBooking, setShowBooking] = useState(false);
  const industry = getIndustry(slug);
  const nav = APPLICATIONS.find((a) => a.slug === slug);

  if (!industry || !nav) return <NotFound />;

  const related = APPLICATIONS.filter((a) => a.slug !== slug).slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title={industry.metaTitle}
        description={industry.metaDescription}
        path={nav.path}
        ogImage={industry.heroImage}
      />
      <StructuredData
        services={industry.systems.map((s) => ({ name: s.name, description: s.desc, url: nav.path }))}
        faqs={industry.faqs.map((f) => ({ question: f.q, answer: f.a }))}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Commercial", url: "/commercial" },
          { name: industry.shortTitle, url: nav.path },
        ]}
      />
      <HeaderGeneric />

      {/* Hero */}
      <section className="relative bg-blue-900 text-white">
        <img
          src={industry.heroImage}
          alt={`${industry.shortTitle} flooring project in Dallas-Fort Worth`}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="relative container mx-auto px-4 py-20 md:py-28 max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-200 mb-4">
            Commercial Applications
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">{industry.title}</h1>
          <p className="text-base md:text-lg text-blue-100 max-w-3xl">{industry.intro}</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button
              onClick={() => setShowBooking(true)}
              className="bg-white text-blue-900 hover:bg-blue-50 rounded-none px-7"
            >
              Request a Bid <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/70 text-white hover:bg-white/10 rounded-none px-7 bg-transparent"
            >
              <a href="tel:214-305-6516">
                <Phone className="mr-2 h-4 w-4" /> 214-305-6516
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Overview + challenges */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
              Our approach to {industry.shortTitle.toLowerCase()} floors
            </h2>
            {industry.overview.map((p) => (
              <p key={p} className="text-gray-600 leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">What we solve</h2>
            <ul className="space-y-3">
              {industry.challenges.map((c) => (
                <li key={c} className="flex gap-3 text-gray-600">
                  <AlertTriangle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Systems */}
      <section className="py-16 md:py-20 bg-slate-50 border-y border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Systems we install</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {industry.systems.map((s) => (
              <Card key={s.name} className="border-gray-200 rounded-none">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{s.name}</h3>
                      <p className="text-sm text-gray-600">{s.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Recent work</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {industry.gallery.map((img, i) => (
              <img
                key={img + i}
                src={img}
                alt={`${industry.shortTitle} floor coating project ${i + 1}`}
                className="w-full h-56 object-cover"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-slate-50 border-y border-gray-200">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            {industry.shortTitle} flooring FAQ
          </h2>
          <div className="space-y-6">
            {industry.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
                <p className="text-gray-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Other applications</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {related.map((r) => (
              <a
                key={r.path}
                href={r.path}
                className="text-sm border border-gray-300 px-3 py-1.5 text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                {r.label}
              </a>
            ))}
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Flooring solutions</h2>
          <div className="flex flex-wrap gap-2">
            {SOLUTIONS.map((s) => (
              <a
                key={s.path}
                href={s.path}
                className="text-sm border border-gray-300 px-3 py-1.5 text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Get a bid for your {industry.shortTitle.toLowerCase()} floor
          </h2>
          <p className="text-blue-100 mb-7">
            Serving Dallas-Fort Worth and mobilizing nationwide on projects over 10,000 sq ft.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => setShowBooking(true)}
              className="bg-white text-blue-900 hover:bg-blue-50 rounded-none px-7"
            >
              Request a Bid <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/70 text-white hover:bg-white/10 rounded-none px-7 bg-transparent"
            >
              <a href="tel:214-305-6516">
                <Phone className="mr-2 h-4 w-4" /> 214-305-6516
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
};

export default CommercialIndustryPage;
