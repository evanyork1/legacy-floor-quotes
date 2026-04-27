import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CTAButton } from "@/components/ui/cta-button";
import {
  Shield,
  Droplets,
  AlertTriangle,
  Phone,
  Mail,
  Globe,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Biohazard,
  MapPin,
  Award,
  Zap,
  Quote as QuoteIcon,
} from "lucide-react";
import aquatotsLogo from "@/assets/aquatots-logo.png";
import integratedCove from "@/assets/aquatots-integrated-cove.jpg";
import baseboardFlake from "@/assets/aquatots-baseboard-flake.jpg";
import bathroom from "@/assets/aquatots-bathroom.jpg";
import lobby from "@/assets/aquatots-lobby.jpg";
import completed1 from "@/assets/aquatots-completed-1.jpg";
import completed2 from "@/assets/aquatots-completed-2.jpg";
import completed3 from "@/assets/aquatots-completed-3.jpg";
import completed4 from "@/assets/aquatots-completed-4.jpg";
import moldSpores from "@/assets/aquatots-mold-spores.png";
import wetDebris from "@/assets/aquatots-wet-debris.png";
import horrorCircled from "@/assets/aquatots-horror-circled.png";
import horror2 from "@/assets/aquatots-horror-2.jpg";
import horror3 from "@/assets/aquatots-horror-3.jpg";
import moldCornerBlue from "@/assets/aquatots-mold-corner-blue.png";
import standardVct from "@/assets/aquatots-standard-vct.jpg";
import floorLayers from "@/assets/aquatots-floor-layers.png";
import evanYork from "@/assets/evan-york.jpg";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  location: z.string().trim().min(1, "Location required").max(120),
  phone: z.string().trim().min(7, "Phone required").max(30),
  email: z.string().trim().email("Valid email required").max(255),
  message: z.string().trim().max(1000).optional(),
});

const AquaTotsFlooring = () => {
  const [form, setForm] = useState({ name: "", location: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast({ title: "Check your info", description: parsed.error.errors[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await supabase.from("crm_leads").insert({
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        address: parsed.data.location,
        notes: `Aqua Tots partner inquiry: ${parsed.data.message ?? ""}`,
        source: "aquatotsflooring",
        status: "new",
      } as any);
      toast({ title: "Message sent", description: "We'll be in touch shortly." });
      setForm({ name: "", location: "", phone: "", email: "", message: "" });
    } catch (err) {
      toast({ title: "Submitted", description: "We'll be in touch shortly." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Legacy x Aqua-Tots — Nationwide Flooring Partner</title>
        <meta name="description" content="The flooring partner Aqua-Tots trusts nationwide. 7 locations completed. Polyurea systems engineered for swim school environments." />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/aquatotsflooring" />
      </Helmet>

      <Header />

      <main>
        {/* HERO — clean, partnership-focused, no car photo */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
            <div className="text-center">
              <div className="text-xs uppercase tracking-[0.25em] text-blue-700 font-semibold mb-6">
                Partnership Showcase
              </div>

              <div className="flex items-center justify-center mb-10">
                <img src={aquatotsLogo} alt="Aqua-Tots Swim Schools" className="h-16 sm:h-24 w-auto" />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 tracking-tight leading-tight max-w-4xl mx-auto">
                The <span className="text-blue-700">flooring</span> team Aqua-Tots owners trust nationwide.
              </h1>

              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                A flooring system built specifically for the conditions inside a swim school — and a team that's done the work to prove it.
              </p>
            </div>
          </div>
        </section>

        {/* GALLERY — first thing after hero */}
        <section id="proof" className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-10 max-w-3xl">
              <div className="text-xs uppercase tracking-widest text-blue-700 font-semibold mb-3">Completed Work</div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Real installs at real Aqua-Tots locations.
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              {[
                { src: completed1, caption: "Lobby Install" },
                { src: completed3, caption: "Reception" },
                { src: lobby, caption: "Viewing Area" },
                { src: completed2, caption: "Detail Shot" },
                { src: bathroom, caption: "Restroom" },
                { src: completed4, caption: "Pool Deck Lobby" },
              ].map((p, i) => (
                <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition">
                  <img src={p.src} alt={p.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE PROBLEM */}
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-12">
              <div className="text-xs uppercase tracking-widest text-amber-700 font-semibold mb-3">What We Found On-Site</div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                What's really under your floor.
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                <strong className="text-gray-900">Every single one had mold under the floor.</strong>
              </p>
              <p className="text-base text-gray-600 leading-relaxed mt-4">
                Not because the owners were negligent. Not because of a leak. Because the flooring they were sold was never designed for a swim school. Water gets in. It can't get out. And it just sits there — under a surface that looks completely fine.
              </p>
            </div>

            {/* Standard VCT — what every location starts with */}
            <div className="mb-10 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm max-w-2xl mx-auto">
              <div className="relative">
                <img
                  src={standardVct}
                  alt="Standard VCT flooring inside an Aqua-Tots location"
                  className="w-full h-48 sm:h-56 object-cover"
                  style={{ objectPosition: "center 70%" }}
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-gray-900 shadow-sm">
                  Standard VCT
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Most Aqua-Tots location starts with a standard VCT tile. It looks fine on the surface, but underneath is where the real problem develops.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5 mb-10">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="bg-gray-100 flex items-center justify-center p-4">
                  <img src={moldSpores} alt="Mold spores discovered beneath existing flooring" className="max-h-64 w-auto object-contain" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Biohazard className="w-5 h-5 text-amber-600" />
                    <h3 className="text-base font-bold text-gray-900">Mold & Bacteria</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">Visible mold growth and microbial staining were present in every facility we serviced.</p>
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="bg-gray-100 flex items-center justify-center p-4">
                  <img src={wetDebris} alt="Wet debris trapped under flooring" className="max-h-64 w-auto object-contain" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-5 h-5 text-blue-600" />
                    <h3 className="text-base font-bold text-gray-900">Trapped Moisture & Debris</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">Rubberized VCT with seams and adhesive layers let water in — and gave it nowhere to evaporate.</p>
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="bg-gray-100 flex items-center justify-center p-4">
                  <img src={moldCornerBlue} alt="Mold spores spreading at wall corner" className="max-h-64 w-auto object-contain" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Biohazard className="w-5 h-5 text-amber-600" />
                    <h3 className="text-base font-bold text-gray-900">Spreading At The Walls</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">Wall transitions are where moisture migrates and mold colonies establish first — exactly where children play.</p>
                </div>
              </div>
            </div>

            {/* Health & Liability — smaller, no badge */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-6 max-w-2xl mx-auto">
              <h3 className="text-base font-bold text-gray-900 mb-1">Health & Liability</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Children are more susceptible to airborne spores due to developing immune systems and frequent contact with floor surfaces. Trapped moisture by design creates ongoing biological risk and direct liability exposure for owners.
              </p>
            </div>
          </div>
        </section>

        {/* HORROR STORIES — with photos */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-10">
              <div className="text-xs uppercase tracking-widest text-red-700 font-semibold mb-3">Why Cheap Costs More</div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Why choosing the wrong company is a bad idea.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                { img: horrorCircled, title: "They disappeared when problems started.", body: "A competitor installed flooring at an Aqua-Tots location, then became unreachable the moment issues surfaced. No warranty follow-through. No accountability." },
                { img: horror2, title: "Worn out in under a year.", body: "One location went with a low-cost vendor. The coating began degrading within 12 months — cheap products do not survive constant moisture." },
                { img: horror3, title: "Unqualified installers, serious consequences.", body: "Most flooring crews have no training for resinous coatings in aquatic environments. Improper prep means delamination, slip hazards, full reinstalls." },
              ].map((s, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">{s.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BASEBOARD OPTIONS */}
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-10">
              <div className="text-xs uppercase tracking-widest text-blue-700 font-semibold mb-3">Wall-to-Floor Transition</div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                Baseboard options.
              </h2>
              <p className="text-base text-gray-600">Where the floor meets the wall. We offer two approaches.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                <div className="aspect-[5/4] overflow-hidden bg-gray-100">
                  <img src={integratedCove} alt="Cove base baseboards" className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">Option 1</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Cove Base Baseboards</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Traditional cove base trim installed at the wall-floor transition. Clean appearance, standard protection.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                <div className="aspect-[5/4] overflow-hidden bg-gray-100">
                  <img src={baseboardFlake} alt="Integrated cove base — seamless flake-coated baseboard" className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">Option 2</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Integrated Cove Base</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Part of the seamless flooring system itself, creating a fully watertight seal at the wall — moisture cannot wick up behind the wall and into the sheetrock.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUR FLOORING SYSTEM — simplified */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-8">
              <div className="text-xs uppercase tracking-widest text-blue-700 font-semibold mb-3">Comparison</div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Our Flooring System
              </h2>
            </div>

            <div className="mb-10 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5 sm:p-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
              <img
                src={floorLayers}
                alt="Polyurea floor system layers: topcoat, flakes, basecoat, concrete"
                className="w-2/3 max-w-xs sm:max-w-sm lg:max-w-sm h-auto"
              />
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-blue-700 font-semibold mb-3">How It's Built</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 tracking-tight">Four bonded layers. Zero seams.</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  A polyaspartic polyurea topcoat over a custom flake blend, locked into a polyurea basecoat that bonds directly to the prepared concrete. The result is a single, continuous, waterproof surface — not tiles sitting on top of moisture.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full min-w-[420px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">Feature</th>
                    <th className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-blue-700 uppercase tracking-wider">Polyurea</th>
                    <th className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">VCT/Other</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Seamless", true, false],
                    ["Waterproof", true, false],
                    ["Mold-resistant", true, false],
                    ["Bonds to concrete", true, false],
                    ["Slip-resistant", true, "varies"],
                    ["5-Year warranty", true, false],
                  ].map(([label, a, b], i) => (
                    <tr key={i}>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-gray-900 font-medium">{label as string}</td>
                      <td className="px-2 sm:px-6 py-3 sm:py-4 text-center">{a ? <CheckCircle2 className="w-5 h-5 text-blue-600 mx-auto" /> : <XCircle className="w-5 h-5 text-gray-300 mx-auto" />}</td>
                      <td className="px-2 sm:px-6 py-3 sm:py-4 text-center">
                        {b === true ? <CheckCircle2 className="w-5 h-5 text-blue-600 mx-auto" /> :
                         b === false ? <XCircle className="w-5 h-5 text-red-400 mx-auto" /> :
                         <span className="text-gray-500 text-xs sm:text-sm italic">Varies</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="rounded-2xl bg-white border border-gray-200 p-8 lg:p-12 shadow-sm">
              <QuoteIcon className="w-10 h-10 text-blue-200 mb-5" />
              <p className="text-xl lg:text-2xl font-light text-gray-900 leading-snug mb-8 tracking-tight">
                "Legacy has been our go-to flooring partner. They show up, do it right, and our owners don't have to worry about their floors ever again."
              </p>
              <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center font-bold text-white">K</div>
                <div>
                  <div className="font-semibold text-gray-900">Kirsten</div>
                  <div className="text-sm text-gray-600">Aqua-Tots Corporate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OPERATIONAL VALUE */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Affordable. Fast. Guaranteed.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                { icon: <Award className="w-6 h-6" />, title: "Affordably Priced", body: "Not the cheapest — the most cost-effective. No repeat installs. No callbacks. No liability surprises." },
                { icon: <Zap className="w-6 h-6" />, title: "Minimal Downtime", body: "The average 2,500 sq ft Aqua-Tots location is completed in under 4 days. Back to business in 48 hours after the final coat." },
                { icon: <MapPin className="w-6 h-6" />, title: "Nationwide Capability", body: "We install across the country, year-round, with flexible scheduling — including off-hours installs to minimize disruption." },
              ].map((f, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">{f.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-16 lg:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-center mb-6">
              <img src={aquatotsLogo} alt="Aqua-Tots Swim Schools" className="h-12 w-auto" />
            </div>

            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-tight">Ready to protect your location?</h2>
              <p className="text-base text-gray-600">Talk to our team about your Aqua-Tots location.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
              {/* Point of Contact */}
              <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 lg:p-8 text-center">
                <div className="text-xs uppercase tracking-widest text-blue-700 font-semibold mb-5">Your Point of Contact</div>
                <div className="w-40 h-40 mx-auto mb-5 rounded-full overflow-hidden border-4 border-blue-50 shadow-sm">
                  <img src={evanYork} alt="Evan York" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Evan York</h3>
                <p className="text-sm text-gray-600 mt-1">Legacy Industrial Coatings</p>
              </div>

              {/* Contact methods */}
              <div className="space-y-3">
                <a href="tel:2143056516" className="flex items-center gap-4 p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition">
                  <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center"><Phone className="w-5 h-5" /></div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500">Office</div>
                    <div className="text-base font-semibold text-gray-900">214-305-6516</div>
                  </div>
                </a>
                <a href="tel:2147245279" className="flex items-center gap-4 p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition">
                  <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center"><Phone className="w-5 h-5" /></div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500">Contact Evan</div>
                    <div className="text-base font-semibold text-gray-900">214-724-5279</div>
                  </div>
                </a>
                <a href="mailto:evan@licoat.com" className="flex items-center gap-4 p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition">
                  <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center"><Mail className="w-5 h-5" /></div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500">Email</div>
                    <div className="text-base font-semibold text-gray-900 break-all">evan@licoat.com</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AquaTotsFlooring;
