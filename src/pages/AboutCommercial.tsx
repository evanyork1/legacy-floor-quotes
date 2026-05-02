import { motion } from "framer-motion";
import { ArrowLeft, Award, Shield, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import legacyLogo from "@/assets/legacy-logo-white.png";
import { Seo } from "@/components/seo/Seo";

const AboutCommercial = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0,0%,5%)] text-white">
      <Seo
        title="About Legacy Industrial Coatings — Commercial Concrete & Polishing Partner for GCs"
        description="Tech consultants for general contractors. Millions of square feet of commercial concrete polishing and industrial coatings delivered to spec for ITBs across Texas."
        path="/about-commercial"
      />
      {/* ─── Navbar ─── */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-[hsl(0,0%,5%)]/80 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-6 flex items-center justify-between h-16">
            <button onClick={() => navigate("/commercialfloors")} className="flex items-center gap-3 group">
              <img src={legacyLogo} alt="Legacy Industrial Coatings" className="h-8" / loading="eager" decoding="async" fetchpriority="high" >
            </button>
            <button onClick={() => navigate("/commercialfloors")} className="flex items-center gap-2 text-white/60 hover:text-blue-400 text-xs uppercase tracking-[0.2em] font-medium transition-colors">
              <ArrowLeft size={14} /> Back
            </button>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <div className="w-16 h-[2px] bg-blue-500 mb-8" />
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-6 font-medium">About Us</p>
            <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
              MILLIONS OF<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">SQUARE FEET.</span>
              <br />
              ONE STANDARD.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ─── Mission ─── */}
      <section className="py-20 md:py-28 bg-[hsl(0,0%,8%)]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="w-12 h-[2px] bg-blue-500 mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
                OUR <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">APPROACH</span>
              </h2>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-6">
              <p className="text-white/70 text-lg leading-relaxed">
                Our approach is built on technical oversight and risk mitigation. We specialize in navigating the high-stakes requirements of Mission Critical, Logistics, and Healthcare sectors—where floor flatness (FF/FL) and operational uptime are non-negotiable. By leveraging a deep, vetted network of specialized crews and advanced technology, we mobilize the precise resources needed to hit 24/7 construction schedules without the bottlenecks of equipment availability.
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                We position ourselves as a consultant to the General Contractor, providing expert guidance on moisture mitigation, slab stabilization, and chemical selection. At Legacy, our mission is to own the outcome of every square foot, ensuring that every project is delivered with OSHA-compliant safety standards, manufacturer-backed warranties, and a finish that stands up to industrial-scale wear.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Pillars ─── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {[
              { icon: Shield, title: "Risk Mitigation", desc: "Technical oversight on every slab — moisture testing, chemical selection, and spec compliance before work begins." },
              { icon: Users, title: "Vetted Crews", desc: "A deep network of specialized teams mobilized with the exact skills each project demands." },
              { icon: Award, title: "Own the Outcome", desc: "OSHA-compliant safety, manufacturer-backed warranties, and a finish built for industrial-scale wear." },
              { icon: MapPin, title: "National Reach", desc: "Based in DFW, deploying across the country for mission-critical, logistics, and healthcare projects." },
            ].map((pillar, i) => (
              <motion.div key={pillar.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-[hsl(0,0%,5%)] p-10">
                <pillar.icon className="w-7 h-7 text-blue-400 mb-5" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold tracking-wide mb-3">{pillar.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 md:py-28 bg-[hsl(0,0%,8%)] border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              LET'S <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">BUILD</span> TOGETHER
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
              Ready to discuss your next project? Our estimators are standing by.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate("/commercialfloors#contact")} className="px-8 py-4 bg-blue-600 text-white font-semibold text-sm uppercase tracking-[0.15em] hover:bg-blue-500 transition-colors inline-flex items-center justify-center">
                Contact Us
              </button>
              <a href="tel:2143056516" className="px-8 py-4 border border-white/30 text-white font-semibold text-sm uppercase tracking-[0.15em] hover:border-blue-400 hover:text-blue-400 transition-colors inline-flex items-center justify-center gap-2">
                (214) 305-6516
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <img src={legacyLogo} alt="Legacy Industrial Coatings" className="h-8 mb-2" / loading="lazy" decoding="async" >
              <p className="text-white/40 text-sm">Dallas-Fort Worth, TX — Serving Texas & Beyond</p>
            </div>
            <button onClick={() => navigate("/commercialfloors")} className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-blue-400 transition-colors flex items-center gap-1">
              <ArrowLeft size={12} /> Commercial Floors
            </button>
          </div>
          <div className="w-full h-[2px] bg-blue-500/20 mt-8" />
          <p className="mt-6 text-center text-white/30 text-xs tracking-wider">
            © {new Date().getFullYear()} Legacy Industrial Coatings. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutCommercial;
