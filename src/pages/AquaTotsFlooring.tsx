import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CTAButton } from "@/components/ui/cta-button";
import {
  Shield,
  Droplets,
  AlertTriangle,
  Clock,
  Phone,
  Mail,
  Globe,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Biohazard,
  Hammer,
  Layers,
  Sparkles,
  Search,
  Wrench,
  MapPin,
  Award,
  Zap,
  Quote as QuoteIcon,
} from "lucide-react";
import aquatotsLogo from "@/assets/aquatots-logo.png";
import floorCloseup from "@/assets/aquatots-floor-closeup.webp";
import integratedCove from "@/assets/aquatots-integrated-cove.jpg";
import bathroom from "@/assets/aquatots-bathroom.jpg";
import lobby from "@/assets/aquatots-lobby.jpg";
import completed1 from "@/assets/aquatots-completed-1.jpg";
import completed2 from "@/assets/aquatots-completed-2.jpg";
import completed3 from "@/assets/aquatots-completed-3.jpg";
import completed4 from "@/assets/aquatots-completed-4.jpg";
import moldRemoval from "@/assets/aquatots-mold-removal.jpg";
import moistureMeter from "@/assets/aquatots-moisture-meter.jpg";
import trappedDebris from "@/assets/aquatots-trapped-debris.jpg";
import grinding from "@/assets/aquatots-grinding.jpg";
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
        <meta name="description" content="The flooring partner Aqua-Tots trusts nationwide. 7 locations completed. Polyurea systems engineered for swim school environments. No callbacks. No mold. No surprises." />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/aquatotsflooring" />
      </Helmet>

      <Header />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-800 text-white">
          <div className="absolute inset-0">
            <img src={completed1} alt="" className="w-full h-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-900/85 to-navy-900" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 lg:py-28 text-center">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <span className="text-xs uppercase tracking-[0.2em] text-blue-200">Official Flooring Partner</span>
            </div>

            <div className="flex items-center justify-center gap-6 sm:gap-10 mb-10">
              <img src="/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png" alt="Legacy Industrial Coatings" className="h-12 sm:h-14 w-auto" />
              <div className="text-white/40 text-2xl font-thin">×</div>
              <img src={aquatotsLogo} alt="Aqua-Tots Swim Schools" className="h-14 sm:h-20 w-auto bg-white rounded-lg px-4 py-2 shadow-lg" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight leading-tight">
              The Flooring Partner<br />
              <span className="text-blue-300">Aqua-Tots Trusts Nationwide</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-3xl mx-auto">
              7 locations completed. Zero callbacks. One team that does it right the first time.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <CTAButton variant="primary" size="lg" icon={<ArrowRight />} iconPosition="right" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Talk to Our Team
              </CTAButton>
              <a href="#proof" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/40 hover:border-white text-white font-semibold transition-all bg-white/5 backdrop-blur-sm w-full sm:w-auto">
                See the Work
              </a>
            </div>

            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto pt-10 border-t border-white/15">
              <div><div className="text-3xl font-bold text-blue-300">7</div><div className="text-xs text-white/60 uppercase tracking-wider mt-1">Locations</div></div>
              <div><div className="text-3xl font-bold text-blue-300">0</div><div className="text-xs text-white/60 uppercase tracking-wider mt-1">Callbacks</div></div>
              <div><div className="text-3xl font-bold text-blue-300">5 yr</div><div className="text-xs text-white/60 uppercase tracking-wider mt-1">Warranty</div></div>
              <div><div className="text-3xl font-bold text-blue-300">&lt;4 days</div><div className="text-xs text-white/60 uppercase tracking-wider mt-1">Avg Install</div></div>
            </div>
          </div>
        </section>

        {/* THE PROBLEM */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-14">
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold">What We Found</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
                What's <span className="text-amber-600">really</span> under your floor.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                During flooring removal at <strong className="text-gray-900">6 Aqua-Tots locations</strong>, our team discovered the same condition every single time: moisture from daily pool operations had migrated beneath the existing flooring and become trapped against the concrete slab — causing mold and bacteria growth.
                <br /><br />
                The floor above looked fine. The problem was invisible.
                <span className="block mt-4 text-amber-700 font-semibold">This isn't a cleaning issue. It's a flooring design failure.</span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-14">
              <div className="group rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={moldRemoval} alt="Mold found beneath existing flooring at Aqua-Tots location" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <Biohazard className="w-6 h-6 text-amber-600" />
                    <h3 className="text-xl font-bold text-gray-900">Mold & Bacteria — All 6 Locations</h3>
                  </div>
                  <p className="text-gray-600">Visible mold growth and microbial staining were present in every single facility we serviced. Same product. Same failure. Every time.</p>
                </div>
              </div>
              <div className="group rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={trappedDebris} alt="Wet debris trapped under flooring" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <Droplets className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">Trapped Moisture Against the Slab</h3>
                  </div>
                  <p className="text-gray-600">Rubberized VCT and rolled rubber flooring with seams and adhesive layers allowed water in — and gave it nowhere to evaporate.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-8 lg:p-12">
              <div className="grid lg:grid-cols-[auto,1fr] gap-8 items-start">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-8 h-8 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Health & Liability — A Children's Swim School Concern</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Children are more susceptible to airborne spores due to developing immune systems, higher breathing rates, and frequent contact with floor surfaces. Allowing moisture to remain beneath the flooring by design creates ongoing biological and operational risk — and direct liability exposure for owners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HORROR STORIES */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-red-50 border border-red-200">
                <XCircle className="w-4 h-4 text-red-600" />
                <span className="text-xs uppercase tracking-widest text-red-700 font-semibold">Why Cheap Costs More</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                The horror stories we keep getting called to fix.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <XCircle className="w-7 h-7" />, title: "They disappeared when problems started.", body: "A competitor installed flooring at an Aqua-Tots location, then became unreachable the moment issues surfaced. No warranty follow-through. No accountability. Just a bad floor and no one to call." },
                { icon: <Clock className="w-7 h-7" />, title: "Worn out in under a year.", body: "One location went with a low-cost vendor. The coating began degrading within 12 months. In a high-traffic, constant-moisture environment, cheap products simply do not hold up." },
                { icon: <AlertTriangle className="w-7 h-7" />, title: "Unqualified installers, serious consequences.", body: "Most flooring crews have no training for resinous coatings in aquatic environments. Improper prep, wrong products, no moisture testing — leading to delamination, slip hazards, and full reinstallation costs." },
              ].map((s, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mb-5">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR PROCESS */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-10 items-end mb-14">
              <div>
                <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200">
                  <CheckCircle2 className="w-4 h-4 text-blue-700" />
                  <span className="text-xs uppercase tracking-widest text-blue-700 font-semibold">Our Process</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                  How we do it <span className="text-blue-700">right.</span>
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                No shortcuts. No skipped prep. No mystery products. Every Aqua-Tots install follows the same five-step system that's earned us seven locations and zero callbacks.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { n: "01", icon: <Search className="w-6 h-6" />, title: "Assess", body: "Moisture meter on every slab. Excessive moisture is addressed before prep begins." },
                { n: "02", icon: <Hammer className="w-6 h-6" />, title: "Demo", body: "Full removal of existing flooring including scraping of glue residue, mold, and trapped moisture." },
                { n: "03", icon: <Wrench className="w-6 h-6" />, title: "Diamond Grind", body: "We diamond grind the entire slab and repair all cracks and divots. No shortcuts." },
                { n: "04", icon: <Layers className="w-6 h-6" />, title: "Polyurea Coat", body: "Polyurea base bonds deep into the concrete — seamless, watertight, no migration paths." },
                { n: "05", icon: <Sparkles className="w-6 h-6" />, title: "Finish", body: "Polyaspartic top coat with broadcast flake and grip additive. Beautiful, durable, sanitary." },
              ].map((s) => (
                <div key={s.n} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition">
                  <div className="text-xs font-mono text-blue-600 mb-3">{s.n}</div>
                  <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">{s.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid md:grid-cols-3 gap-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <img src={moistureMeter} alt="Moisture meter on concrete" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <img src={grinding} alt="Diamond grinding the slab" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <img src={floorCloseup} alt="Finished broadcast flake polyurea floor closeup" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* COVE BASE */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
                Two options for a <span className="text-blue-700">fully protected</span> install.
              </h2>
              <p className="text-lg text-gray-600">Where the floor meets the wall is where most aquatic facilities fail. We give you a choice — and we'll always tell you which one we'd pick.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="group rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={bathroom} alt="Cove base baseboard installation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Option 1</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Cove Base Baseboards</h3>
                  <p className="text-gray-600 leading-relaxed">Traditional cove base trim installed at the wall-floor transition. Clean appearance, standard protection — a solid choice for most spaces.</p>
                </div>
              </div>

              <div className="group rounded-2xl border-2 border-blue-600 bg-white overflow-hidden relative shadow-lg">
                <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">Recommended</div>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={integratedCove} alt="Integrated cove base — seamless watertight wall-to-floor transition" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <div className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-2">Option 2</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Integrated Cove Base</h3>
                  <p className="text-gray-700 leading-relaxed">Part of the seamless flooring system itself, creating a fully watertight seal at the wall. Stops moisture from wicking up behind the wall and into the sheetrock. The right call for any aquatic environment.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY POLYUREA */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
                Why polyurea — <span className="text-blue-700">not epoxy</span>, not tile, not rubber.
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Polyurea is engineered for environments with constant moisture exposure. It installs as a fully seamless system — no joints, no seams, no adhesive layers where water can travel. It cures rapidly, tolerates elevated moisture during installation, and bonds directly into the concrete. Combined with a polyaspartic top coat and slip-resistant additives, it's the only system that eliminates the root cause of every failure we've ever been called to fix.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-5 text-sm font-semibold text-gray-700 uppercase tracking-wider">Feature</th>
                    <th className="px-6 py-5 text-sm font-semibold text-blue-700 uppercase tracking-wider">Polyurea System</th>
                    <th className="px-6 py-5 text-sm font-semibold text-gray-500 uppercase tracking-wider">Rubber / Tile</th>
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
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900 font-medium">{label as string}</td>
                      <td className="px-6 py-4 text-center">{a ? <CheckCircle2 className="w-6 h-6 text-blue-600 mx-auto" /> : <XCircle className="w-6 h-6 text-gray-300 mx-auto" />}</td>
                      <td className="px-6 py-4 text-center">
                        {b === true ? <CheckCircle2 className="w-6 h-6 text-blue-600 mx-auto" /> :
                         b === false ? <XCircle className="w-6 h-6 text-red-400 mx-auto" /> :
                         <span className="text-gray-500 text-sm italic">Varies</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section id="proof" className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200">
                <Award className="w-4 h-4 text-blue-700" />
                <span className="text-xs uppercase tracking-widest text-blue-700 font-semibold">Our Work</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 tracking-tight">7 locations. Same result every time.</h2>
              <p className="text-gray-600 text-lg">Real installs at real Aqua-Tots locations.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              {[
                { src: completed1, caption: "Aqua-Tots — Lobby Install" },
                { src: completed3, caption: "Aqua-Tots — Reception" },
                { src: lobby, caption: "Aqua-Tots — Viewing Area" },
                { src: completed2, caption: "Aqua-Tots — Detail Shot" },
                { src: bathroom, caption: "Aqua-Tots — Restroom" },
                { src: completed4, caption: "Aqua-Tots — Pool Deck Lobby" },
              ].map((p, i) => (
                <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition">
                  <img src={p.src} alt={p.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-4 left-4 text-sm font-medium text-white">{p.caption}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="py-16 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 text-center">
              {[
                { v: "7", l: "Aqua-Tots locations completed" },
                { v: "<4 days", l: "Avg install (2,500 sq ft)" },
                { v: "5 yrs", l: "Warranty on every install" },
                { v: "48 hrs", l: "Return to business after final coat" },
              ].map((s, i) => (
                <div key={i} className="px-4">
                  <div className="text-4xl lg:text-6xl font-bold text-blue-300 tracking-tight">{s.v}</div>
                  <div className="text-xs lg:text-sm text-white/70 uppercase tracking-wider mt-3 leading-snug">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-10 lg:p-16 shadow-sm">
              <QuoteIcon className="w-14 h-14 text-blue-200 mb-6" />
              <p className="text-2xl lg:text-3xl font-light text-gray-900 leading-snug mb-10 tracking-tight">
                "Legacy has been our go-to flooring partner. They show up, do it right, and our owners don't have to worry about their floors ever again."
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-blue-100">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-bold text-xl text-white">K</div>
                <div>
                  <div className="font-semibold text-gray-900">Kirsten</div>
                  <div className="text-sm text-gray-600">Aqua-Tots Corporate — Legacy's Champion Contact</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OPERATIONAL VALUE */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
                Affordable. Fast. <span className="text-blue-700">Guaranteed.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Award className="w-7 h-7" />, title: "Affordably Priced", body: "We're not the cheapest. We're the most cost-effective. No repeat installs. No callbacks. No liability surprises." },
                { icon: <Zap className="w-7 h-7" />, title: "Minimal Downtime", body: "The average 2,500 sq ft Aqua-Tots location is completed in under 4 days. Back to business in 48 hours after the final coat." },
                { icon: <MapPin className="w-7 h-7" />, title: "Nationwide Capability", body: "We install across the country, year-round, with flexible scheduling — including off-hours installs to minimize disruption." },
              ].map((f, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5">{f.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 lg:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-center gap-6 mb-8">
              <img src="/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png" alt="Legacy Industrial Coatings" className="h-10 w-auto" />
              <div className="text-gray-300 text-2xl font-thin">×</div>
              <img src={aquatotsLogo} alt="Aqua-Tots Swim Schools" className="h-12 w-auto" />
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 tracking-tight">Ready to protect your location?</h2>
              <p className="text-lg text-gray-600">Talk to our team about your Aqua-Tots location.</p>
            </div>

            <div className="grid lg:grid-cols-[1fr,1.2fr] gap-8">
              <div className="space-y-4">
                <a href="tel:2143056516" className="flex items-center gap-4 p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition group">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center"><Phone className="w-5 h-5" /></div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500">Call</div>
                    <div className="text-lg font-semibold text-gray-900">214-305-6516</div>
                  </div>
                </a>
                <a href="mailto:Support@legacyindustrialcoatings.com" className="flex items-center gap-4 p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition group">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center"><Mail className="w-5 h-5" /></div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500">Email</div>
                    <div className="text-base font-semibold text-gray-900 break-all">Support@legacyindustrialcoatings.com</div>
                  </div>
                </a>
                <a href="https://legacyindustrialcoatings.com" className="flex items-center gap-4 p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition group">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center"><Globe className="w-5 h-5" /></div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500">Web</div>
                    <div className="text-lg font-semibold text-gray-900">legacyindustrialcoatings.com</div>
                  </div>
                </a>
              </div>

              <form onSubmit={handleSubmit} className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition" required />
                  <input type="text" placeholder="Location / City" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition" required />
                  <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition" required />
                </div>
                <textarea placeholder="Tell us about your location..." rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition resize-none" />
                <button type="submit" disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-60">
                  {submitting ? "Sending..." : <>Talk to Our Team <ArrowRight className="w-5 h-5" /></>}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AquaTotsFlooring;
