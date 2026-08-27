import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import Seo from "@/components/seo/Seo";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { CAREER_MARKETS, TOTAL_SEATS } from "@/data/careersMarkets";

const Careers = () => {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Commercial Flooring Sales Careers | Legacy Industrial Coatings"
        description="Nine commission-only commercial flooring sales seats across eight markets. $2,000 to $50,000 per deal, no cap, no split territories. Experienced reps only."
        path="/careers"
      />
      <PageBreadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Careers", url: "/careers" },
        ]}
      />
      <HeaderGeneric />

      <main>
        <section className="bg-blue-900 text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-blue-200 uppercase tracking-widest text-sm font-semibold mb-4">
              Careers
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {TOTAL_SEATS} commercial sales seats. Eight markets.
            </h1>
            <p className="mt-6 text-lg text-blue-100 leading-relaxed">
              We install industrial floor systems for warehouses, distribution
              centers, food plants, and manufacturing facilities. The install
              side is solved. We're building the sales side, one market at a
              time, and we're only talking to people who have already done this
              work.
            </p>
            <p className="mt-6 text-lg font-bold">
              Commission only. $2,000 to $50,000 per deal. No cap, no split
              territories.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Open roles
            </h2>
            <ul className="divide-y divide-slate-200 border-y border-slate-200">
              {CAREER_MARKETS.map((m) => (
                <li key={m.slug}>
                  <Link
                    to={`/careers/${m.slug}`}
                    className="group flex items-center justify-between gap-4 py-5 hover:bg-slate-50 transition-colors px-2 -mx-2"
                  >
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-lg font-semibold text-slate-900">
                        Outside Sales Representative
                      </span>
                      <span className="text-slate-600">
                        {m.city}, {m.stateAbbr}
                      </span>
                      <span className="text-sm font-semibold text-blue-900 bg-blue-50 border border-blue-100 px-2 py-0.5">
                        {m.seats} {m.seats === 1 ? "seat" : "seats"}
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-900 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-lg text-slate-800 leading-relaxed">
              This is commission only and it's an experience job. If you haven't
              sold commercial finish-out and you haven't worked commission-only
              before, this isn't going to work for either of us. We're not going
              to be the ones who teach you this trade.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
