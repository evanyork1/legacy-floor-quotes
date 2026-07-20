import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Clock, MapPin, Shield, Award, Wrench, CheckCircle, ArrowLeft, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import legacyLogo from "@/assets/legacy-logo-white.png";
import heroImage from "@/assets/commercial-hero.jpg";
import polishingImage from "@/assets/commercial-polishing-work.jpg";
import datacenterImg from "@/assets/commercial-datacenter.jpg";
import warehouseImg from "@/assets/commercial-warehouse.jpg";
import retailImg from "@/assets/commercial-retail.jpg";
import manufacturingImg from "@/assets/commercial-manufacturing.jpg";
import { CommercialContactModal } from "@/components/commercial/CommercialContactModal";
import { Seo } from "@/components/seo/Seo";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";

/* ──────────────── data ──────────────── */

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Case Study", href: "#casestudy" },
  { label: "Why Legacy", href: "#why" },
  { label: "About", href: "/about-commercial" },
  { label: "Contact", href: "#contact" },
];

const services = [
  { title: "Concrete Polishing", description: "Multi-step diamond polishing process to achieve mirror-like finishes. From 100-grit to 3000-grit, we deliver the exact sheen level your project demands." },
  { title: "Polishable Overlays", description: "Micro-topping and cementitious overlay systems applied over existing substrates to create a polishable surface — ideal for renovation and retrofit projects." },
  { title: "Concrete Restoration", description: "Joint filling, crack repair, and surface prep to bring damaged or aged concrete back to spec before polishing or coating." },
  { title: "Grind & Seal", description: "A cost-effective alternative to full polishing — grinding the surface and applying a topical sealer for a clean, durable finish." },
  { title: "Specialty Waterproofing", description: "Containment tanks, traffic coatings, and other specialized spaces which require specific materials and durable sealers to protect against moisture and chemical exposure." },
  { title: "Epoxy Floor Coatings", description: "High-performance epoxy and polyurea systems for chemical resistance, anti-slip finishes, and decorative applications in demanding commercial environments." },
];

const industries = [
  { title: "Data Centers", description: "Mission-critical facilities requiring floors that meet strict cleanliness, flatness, and static-control standards.", image: datacenterImg },
  { title: "Warehouses & Distribution", description: "Durable, dust-free floors built to handle heavy forklift traffic, racking loads, and 24/7 operations.", image: warehouseImg },
  { title: "Retail & Commercial", description: "High-gloss, easy-to-maintain floors that reflect light beautifully and resist staining in high-traffic environments.", image: retailImg },
  { title: "Manufacturing", description: "Seamless, chemical-resistant flooring for production facilities, assembly lines, and clean rooms.", image: manufacturingImg },
];

const reasons = [
  { icon: Award, title: "Industry-Leading Standards", description: "We follow and exceed ASCC, ACI, and ICRI specifications on every project. No shortcuts, no compromises." },
  { icon: MapPin, title: "Texas & Beyond", description: "Based in DFW with crews ready to mobilize across Texas and neighboring states for large-scale commercial work." },
  { icon: Clock, title: "Rapid Mobilization", description: "We can be on site fast. Our logistics team coordinates equipment, materials, and crews to meet the tightest schedules." },
  { icon: CheckCircle, title: "Night & Weekend Crews", description: "Occupied facility? Active warehouse? We work nights, weekends, and off-hours to keep your operations running." },
  { icon: Shield, title: "Spec-Grade Results", description: "Proper mix design, curing protocols, and polishing sequences specified per slab — not a one-size-fits-all approach." },
  { icon: Wrench, title: "Full-Service Capability", description: "From surface prep and joint filling to final polish and densification — one team handles it all with zero handoff issues." },
];

/* gallery images */
const galleryImages = [
  { id: 1, src: "/commercial/gallery-polished-warehouse.png", alt: "Polished warehouse floor" },
  { id: 2, src: "/commercial/gallery-epoxy-room.jpeg", alt: "Epoxy coated room" },
  { id: 3, src: "/commercial/gallery-polished-closeup.jpg", alt: "Polished concrete closeup" },
  { id: 4, src: "/commercial/gallery-grinding-warehouse.jpg", alt: "Grinding in warehouse" },
  { id: 5, src: "/commercial/aloe-vera-polished.png", alt: "Aloe Vera of America polished floor" },
];

/* ──────────────── counter ──────────────── */

function Counter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-bold text-5xl md:text-7xl tracking-tight text-white">
        {count}<span className="text-blue-400">{suffix}</span>
      </div>
      <p className="mt-3 text-sm uppercase tracking-[0.2em] text-gray-400 font-medium">{label}</p>
    </div>
  );
}

/* ──────────────── page ──────────────── */

const CommercialFloors = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const navigate = useNavigate();
  const galleryRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[hsl(0,0%,5%)] text-white">
      <Seo
        title="Commercial Concrete Polishing & Industrial Flooring | Legacy Industrial Coatings"
        description="Spec-grade commercial concrete polishing, polishable overlays, grind & seal, and industrial epoxy systems. Texas-based crews, ASCC/ACI/ICRI standards, night and weekend mobilization."
        path="/commercialfloors"
      />
      <StructuredData
        services={[{ name: "Commercial Concrete Polishing & Industrial Flooring", description: "Spec-grade commercial concrete polishing, polishable overlays, grind & seal, and industrial epoxy systems built to ASCC/ACI/ICRI standards across Dallas-Fort Worth, with night and weekend mobilization.", url: "/commercialfloors" }]}
      />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Commercial Floors", url: "/commercialfloors" }]} />
      {/* ─── Navbar ─── */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-[hsl(0,0%,5%)]/80 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-6 flex items-center justify-between h-16">
            <button onClick={() => navigate("/")} className="flex items-center gap-3 group">
              <img src={legacyLogo} alt="Legacy Industrial Coatings" className="h-8" loading="eager" decoding="async" fetchpriority="high" />
            </button>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <button key={link.label} onClick={() => navigate(link.href)} className="text-white/60 hover:text-blue-400 text-xs uppercase tracking-[0.2em] font-medium transition-colors">
                    {link.label}
                  </button>
                ) : (
                  <a key={link.label} href={link.href} className="text-white/60 hover:text-blue-400 text-xs uppercase tracking-[0.2em] font-medium transition-colors">
                    {link.label}
                  </a>
                )
              )}
              <button onClick={() => setContactOpen(true)} className="px-5 py-2 bg-blue-600 text-white font-semibold text-xs uppercase tracking-[0.15em] hover:bg-blue-500 transition-colors">
                Get a Quote
              </button>
            </nav>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white" aria-label="Toggle menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="md:hidden bg-[hsl(0,0%,5%)]/95 backdrop-blur-lg border-b border-white/10">
              <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
                {navLinks.map((link) =>
                  link.href.startsWith("/") ? (
                    <button key={link.label} onClick={() => { navigate(link.href); setMenuOpen(false); }} className="text-white/70 hover:text-blue-400 text-sm uppercase tracking-[0.2em] font-medium transition-colors text-left">
                      {link.label}
                    </button>
                  ) : (
                    <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-blue-400 text-sm uppercase tracking-[0.2em] font-medium transition-colors">
                      {link.label}
                    </a>
                  )
                )}
                <button onClick={() => { setContactOpen(true); setMenuOpen(false); }} className="mt-2 px-5 py-3 bg-blue-600 text-white font-semibold text-xs uppercase tracking-[0.15em] text-center">
                  Get a Quote
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Polished commercial concrete floor" className="w-full h-full object-cover"  loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(0,0%,5%)]/70 via-[hsl(0,0%,5%)]/40 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-32">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="w-16 h-[2px] bg-blue-500 mb-8" />
              <p className="text-sm uppercase tracking-[0.3em] text-blue-400 mb-6 font-medium">
                Commercial Floor Solutions
              </p>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
              PRECISION
              <br />
              <span className="text-blue-900">COMMERCIAL</span>
              <br />
              FLOORS.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="mt-8 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed font-light">
              Legacy Industrial Coatings delivers elite-level concrete polishing, epoxy coatings, and floor systems for warehouses, data centers, retail, and beyond.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 }} className="mt-10 flex flex-col sm:flex-row gap-4">
              <button onClick={() => setContactOpen(true)} className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold text-sm uppercase tracking-[0.15em] hover:bg-blue-500 transition-colors">
                Get a Quote
              </button>
              <a href="#industries" className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-semibold text-sm uppercase tracking-[0.15em] hover:border-blue-400 hover:text-blue-400 transition-colors">
                Our Work
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent" />
        </motion.div>
      </section>

      {/* ─── Stats ─── */}
      <section className="py-24 md:py-32 border-b border-white/10">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <Counter end={3000} suffix="+" label="Projects Completed" />
            <Counter end={15} suffix="+" label="Years Experience" />
            <Counter end={50} suffix="M" label="Sq Ft Installed" />
            <Counter end={100} suffix="%" label="Client Satisfaction" />
          </motion.div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section id="services" className="py-24 md:py-32 bg-[hsl(0,0%,8%)]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="w-12 h-[2px] bg-blue-500 mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                OUR<br /><span className="text-blue-900">SERVICES</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md">
                From new construction to full restoration, we deliver specification-grade results that exceed industry standards.
              </p>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={polishingImage} alt="Concrete polishing in action" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"  loading="eager" decoding="async" />
              </div>
            </motion.div>

            <div className="grid gap-0">
              {services.map((service, i) => (
                <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="py-6 border-b border-white/10 group cursor-default">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold tracking-wide group-hover:text-blue-400 transition-colors">{service.title}</h3>
                      <p className="mt-2 text-white/50 text-sm leading-relaxed max-w-md">{service.description}</p>
                    </div>
                    <span className="text-blue-400 text-2xl opacity-0 group-hover:opacity-100 transition-opacity mt-1">→</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Gallery ─── */}
      <section className="py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-6 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="w-12 h-[2px] bg-blue-500 mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              OUR <span className="text-blue-900">WORK</span>
            </h2>
          </motion.div>
        </div>
        <div
          ref={galleryRef}
          className="flex gap-4 overflow-x-auto pb-4 px-6 scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {galleryImages.map((img) => (
            <div key={img.id} className="flex-shrink-0 w-72 md:w-96 aspect-[3/2] overflow-hidden group">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
               loading="eager" decoding="async" />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Industries ─── */}
      <section id="industries" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <div className="w-12 h-[2px] bg-blue-500 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              INDUSTRIES <span className="text-blue-900">WE SERVE</span>
            </h2>
            <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
              From mission-critical data centers to high-traffic retail — we deliver the right specification for every environment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-1">
            {industries.map((industry, i) => (
              <motion.div key={industry.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} className="group relative aspect-[4/3] overflow-hidden cursor-pointer">
                <img src={industry.image} alt={industry.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"  loading="eager" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,5%)]/90 via-[hsl(0,0%,5%)]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{industry.title}</h3>
                  <p className="mt-2 text-white/60 text-sm leading-relaxed max-w-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    {industry.description}
                  </p>
                  <div className="w-8 h-[2px] bg-blue-500 mt-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Case Study: Aloe Vera of America ─── */}
      <section id="casestudy" className="py-24 md:py-32 bg-[hsl(0,0%,8%)]">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
            <div className="w-12 h-[2px] bg-blue-500 mb-6" />
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-4 font-medium">Aloe Vera of America</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[0.95]">
              CASE<br />
              <span className="text-blue-900">STUDY</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[hsl(0,0%,12%)] p-6 border border-white/10">
                    <p className="text-3xl md:text-4xl font-bold text-blue-400">50,000</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 mt-2">Square Feet</p>
                  </div>
                  <div className="bg-[hsl(0,0%,12%)] p-6 border border-white/10">
                    <p className="text-3xl md:text-4xl font-bold text-blue-400">40</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 mt-2">Year Old Building</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[hsl(0,0%,12%)] p-6 border border-white/10">
                    <p className="text-sm font-semibold text-white">Night Shifts</p>
                    <p className="text-xs text-white/50 mt-1">Zero business disruption</p>
                  </div>
                  <div className="bg-[hsl(0,0%,12%)] p-6 border border-white/10">
                    <p className="text-sm font-semibold text-white">Full Restoration</p>
                    <p className="text-xs text-white/50 mt-1">Concrete polishing & repair</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 aspect-video overflow-hidden border border-white/10">
                <img src="/commercial/aloe-vera-polished.png" alt="Aloe Vera of America — 50,000 sq ft polished concrete" className="w-full h-full object-cover"  loading="eager" decoding="async" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-6">
              <h3 className="text-2xl font-bold tracking-tight">Concrete Restoration & Polishing</h3>
              <p className="text-white/60 leading-relaxed">
                Legacy Industrial Coatings completed a large-scale concrete restoration and polishing project for Aloe Vera of America — transforming 50,000 square feet of polished concrete in a 40-year-old facility.
              </p>
              <p className="text-white/60 leading-relaxed">
                The project required working around significant damage, extensive crack repair, and thorough joint filling across aging concrete substrates. Our crew navigated challenging conditions including deteriorated slabs and decades of wear.
              </p>
              <p className="text-white/60 leading-relaxed">
                To ensure zero disruption to ongoing business operations, all work was performed during night shifts. Our team mobilized specialized equipment and coordinated phased sections to maintain full facility access during daytime hours.
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-white/40 uppercase tracking-[0.2em] mb-2">Scope of Work</p>
                <ul className="space-y-2">
                  {[
                    "50,000 sq ft polished concrete",
                    "Extensive crack repair & joint filling",
                    "Surface restoration on 40-year-old substrate",
                    "Night shift operations — zero business disruption",
                    "Multi-phase project coordination"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                      <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Why Legacy ─── */}
      <section id="why" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <div className="w-12 h-[2px] bg-blue-500 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              WHY <span className="text-blue-900">LEGACY</span>
            </h2>
            <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
              When it has to be right the first time — you call us.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {reasons.map((reason, i) => (
              <motion.div key={reason.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-[hsl(0,0%,5%)] p-8 group">
                <reason.icon className="w-6 h-6 text-blue-400 mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold tracking-wide mb-3">{reason.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact" className="py-24 md:py-32 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="w-12 h-[2px] bg-blue-500 mb-6" />
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[0.95]">
                READY TO<br /><span className="text-blue-900">START?</span>
              </h2>
              <p className="mt-6 text-white/60 text-lg leading-relaxed max-w-md">
                Need to submit an Invitation to Bid or need to speak with one of our estimators? Submit the form here and you will be contacted within one business day. You may also call us at the number below.
              </p>
              <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-blue-400 font-semibold uppercase tracking-wider">Phone</span>
                  <a href="tel:2143056516" className="text-white/60 hover:text-blue-400 transition-colors">(214) 305-6516</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-400 font-semibold uppercase tracking-wider">Email</span>
                  <span className="text-white/60">info@legacyindustrialcoatings.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-400 font-semibold uppercase tracking-wider">Base</span>
                  <span className="text-white/60">Dallas-Fort Worth, TX</span>
                </div>
              </div>
            </motion.div>

            <motion.form initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-4" onSubmit={(e) => { e.preventDefault(); setContactOpen(true); }}>
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Name" className="w-full px-4 py-4 bg-[hsl(0,0%,12%)] text-white placeholder:text-white/40 border border-white/10 focus:border-blue-500 focus:outline-none text-sm transition-colors" />
                <input type="text" placeholder="Company" className="w-full px-4 py-4 bg-[hsl(0,0%,12%)] text-white placeholder:text-white/40 border border-white/10 focus:border-blue-500 focus:outline-none text-sm transition-colors" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="email" placeholder="Email" className="w-full px-4 py-4 bg-[hsl(0,0%,12%)] text-white placeholder:text-white/40 border border-white/10 focus:border-blue-500 focus:outline-none text-sm transition-colors" />
                <input type="tel" placeholder="Phone" className="w-full px-4 py-4 bg-[hsl(0,0%,12%)] text-white placeholder:text-white/40 border border-white/10 focus:border-blue-500 focus:outline-none text-sm transition-colors" />
              </div>
              <select className="w-full px-4 py-4 bg-[hsl(0,0%,12%)] text-white/40 border border-white/10 focus:border-blue-500 focus:outline-none text-sm transition-colors">
                <option>Project Type</option>
                <option>Warehouse / Distribution</option>
                <option>Data Center</option>
                <option>Retail / Commercial</option>
                <option>Manufacturing</option>
                <option>Dealership</option>
                <option>Other</option>
              </select>
              <textarea placeholder="Tell us about your project — square footage, timeline, location..." rows={4} className="w-full px-4 py-4 bg-[hsl(0,0%,12%)] text-white placeholder:text-white/40 border border-white/10 focus:border-blue-500 focus:outline-none text-sm transition-colors resize-none" />
              <button type="submit" className="w-full px-8 py-4 bg-blue-600 text-white font-semibold text-sm uppercase tracking-[0.15em] hover:bg-blue-500 transition-colors">
                Request a Quote
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-16 bg-[hsl(0,0%,8%)] border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <img src={legacyLogo} alt="Legacy Industrial Coatings" className="h-8 mb-2"  loading="eager" decoding="async" />
              <p className="text-white/40 text-sm">Dallas-Fort Worth, TX — Serving Texas & Beyond</p>
            </div>
            <div className="flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-white/50">
              <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
              <a href="#industries" className="hover:text-blue-400 transition-colors">Industries</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
              <button onClick={() => navigate("/")} className="hover:text-blue-400 transition-colors flex items-center gap-1">
                <ArrowLeft size={12} /> Home
              </button>
            </div>
          </div>
          <div className="w-full h-[2px] bg-blue-500/20 mt-8" />
          <p className="mt-6 text-center text-white/30 text-xs tracking-wider">
            © {new Date().getFullYear()} Legacy Industrial Coatings. All rights reserved.
          </p>
        </div>
      </footer>

      <CommercialContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default CommercialFloors;
