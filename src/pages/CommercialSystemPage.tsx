import { useState } from "react";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import { Seo } from "@/components/seo/Seo";
import { StructuredData } from "@/components/seo/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { BookingModal } from "@/components/landing/BookingModal";
import { getProduct } from "@/data/commercialSystems";
import { APPLICATIONS, SOLUTIONS } from "@/data/commercialNav";
import NotFound from "@/pages/NotFound";

interface Props {
  slug: string;
}

const CommercialSystemPage = ({ slug }: Props) => {
  const [showBooking, setShowBooking] = useState(false);
  const product = getProduct(slug);
  const nav = SOLUTIONS.find((s) => s.slug === slug);

  if (!product || !nav) return <NotFound />;

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title={product.metaTitle}
        description={product.metaDescription}
        path={nav.path}
        ogImage={product.heroImage}
      />
      <StructuredData
        services={product.systems.map((s) => ({ name: s.name, description: s.desc, url: nav.path }))}
        faqs={product.faqs.map((f) => ({ question: f.q, answer: f.a }))}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Commercial", url: "/commercial" },
          { name: product.shortTitle, url: nav.path },
        ]}
      />
      <HeaderGeneric />

      <section className="relative bg-[#0f2440] text-white">
        <img
          src={product.heroImage}
          alt={`${product.shortTitle} flooring system installed in Dallas-Fort Worth`}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2440] via-[#0f2440]/85 to-[#0f2440]/40" />
        <div className="relative container mx-auto px-4 py-24 md:py-32 max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-200 mb-4">
            Flooring Solutions
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">{product.title}</h1>
          <p className="text-base md:text-lg text-blue-100 max-w-3xl">{product.intro}</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button
              onClick={() => setShowBooking(true)}
              className="bg-white text-blue-900 hover:bg-blue-50 rounded-none px-7"
            >
              Book an Estimate <ArrowRight className="ml-2 h-4 w-4" />
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

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl md:text-[32px] font-bold text-gray-900 tracking-tight mb-5">
              About {product.shortTitle.toLowerCase()} systems
            </h2>
            {product.overview.map((p) => (
              <p key={p} className="text-gray-600 leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>
          <div>
            <h2 className="text-2xl md:text-[32px] font-bold text-gray-900 tracking-tight mb-5">Why specify it</h2>
            <ul className="space-y-3">
              {product.benefits.map((b) => (
                <li key={b} className="flex gap-3 text-gray-600">
                  <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50 border-y border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-[32px] font-bold text-gray-900 tracking-tight mb-8">System build-ups</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {product.systems.map((s) => (
              <Card key={s.name} className="border-gray-200 rounded-none">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-1">{s.name}</h3>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mt-10 mb-4">Where we install it</h3>
          <div className="flex flex-wrap gap-2">
            {product.useCases.map((u) => (
              <span key={u} className="text-sm bg-white border border-gray-300 px-3 py-1.5 text-gray-600">
                {u}
              </span>
            ))}
          </div>
        </div>
      </section>

      {product.extraSections?.map((sec) => (
        <section key={sec.heading} className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-700 mb-3">
              {sec.eyebrow}
            </p>
            <h2 className="text-2xl md:text-[32px] font-bold text-gray-900 tracking-tight mb-5">{sec.heading}</h2>
            {sec.paragraphs.map((p) => (
              <p key={p} className="text-gray-600 leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}

      <section className="py-14 md:py-16 bg-slate-50 border-y border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid sm:grid-cols-3 gap-3">
            {product.gallery.map((img, i) => (
              <div key={img + i} className="overflow-hidden bg-gray-100">
                <img
                  src={img}
                  alt={`${product.shortTitle} flooring project ${i + 1}`}
                  className="w-full h-60 object-cover transition-transform duration-500 hover:scale-105"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-[32px] font-bold text-gray-900 tracking-tight mb-8">
            {product.shortTitle} FAQ
          </h2>
          <div className="space-y-6">
            {product.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
                <p className="text-gray-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Other solutions</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {SOLUTIONS.filter((s) => s.path !== nav.path).map((s) => (
              <a
                key={s.path}
                href={s.path}
                className="text-sm border border-gray-300 px-3 py-1.5 text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Applications</h2>
          <div className="flex flex-wrap gap-2">
            {APPLICATIONS.map((a) => (
              <a
                key={a.path}
                href={a.path}
                className="text-sm border border-gray-300 px-3 py-1.5 text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0f2440] text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Talk through your specification</h2>
          <p className="text-blue-100 mb-7">
            Send drawings or a scope and we'll return a system recommendation and budget number.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => setShowBooking(true)}
              className="bg-white text-blue-900 hover:bg-blue-50 rounded-none px-7"
            >
              Book an Estimate <ArrowRight className="ml-2 h-4 w-4" />
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

export default CommercialSystemPage;
