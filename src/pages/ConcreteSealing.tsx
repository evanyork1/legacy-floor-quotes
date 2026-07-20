import { Helmet } from "react-helmet-async";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Droplets, Sparkles, CheckCircle, Calendar, Phone, UtensilsCrossed, Beer, Warehouse, ChefHat, Clock, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookingModal } from "@/components/landing/BookingModal";
import { StructuredData } from "@/components/seo/StructuredData";

import sealingHero from "@/assets/concrete-sealing-tasting-room.jpg";
import sealingDetail from "@/assets/concrete-sealing-floor-detail.jpg";
import sealingCidery from "@/assets/concrete-sealing-cidery.webp";
import sealingWarehouse from "@/assets/concrete-sealing-warehouse.jpg";
import restaurantCaseStudyHero from "@/assets/case-studies/fast-casual-restaurant/after-2.jpg";

const sealingFaqs = [
  {
    question: "What is concrete sealing?",
    answer: "Concrete sealing is the application of a penetrating or topical sealer to a concrete slab to block moisture, oils, food acids, and stains from absorbing into the porous surface. Unlike a coating, a sealer is thin and breathable — it preserves the natural look of concrete while making it dramatically easier to clean and far more resistant to staining."
  },
  {
    question: "What's the difference between concrete sealing, concrete coating, and polished concrete?",
    answer: "A concrete sealer is a low-build, often invisible barrier that soaks into or sits just on top of the slab. A concrete coating (epoxy, polyaspartic, urethane cement) is a thick film system that builds a new wear surface on the floor. Polished concrete is a mechanically refined and densified slab with no film at all. Sealing is the lightest, fastest, most cost-effective option for facilities that want stain protection without changing the look or shutting down for days."
  },
  {
    question: "How often does commercial concrete need to be resealed?",
    answer: "Most commercial floors need resealing every 2–5 years. Light-traffic offices and showrooms can stretch to 4–5 years; restaurants, breweries, commercial kitchens, and warehouses with daily wash-downs and forklift traffic typically need it every 2–3 years. Sealers wear off mechanically (foot and wheel traffic) and chemically (degreasers, food acids, sanitizers), and once they're gone the slab starts absorbing stains again."
  },
  {
    question: "Why do I need to reseal concrete instead of doing it once?",
    answer: "Sealers are sacrificial. Every mop, scrub, spill, and footstep removes a tiny amount of the protective layer. When the sealer thins out, water no longer beads, stains start to set, and the floor begins to look dull or blotchy. Resealing on a planned 2–5 year cycle is far cheaper than letting the slab absorb grease and dyes that require grinding to remove."
  },
  {
    question: "How often should sealed concrete be deep cleaned in a restaurant or kitchen?",
    answer: "Sealed concrete in restaurants, bars, and commercial kitchens should be professionally deep cleaned every quarter (every 3 months). Nightly mopping pushes greasy water into floor joints and around equipment — quarterly deep cleaning extracts what mops leave behind, restores slip resistance, and dramatically extends the life of the sealer."
  },
  {
    question: "Will concrete sealing make my floor slippery?",
    answer: "No — we use commercial-grade sealers with anti-slip additives where required, so wet sealed concrete in kitchens, breweries, and bar areas meets or exceeds slip-resistance standards. We match the sealer chemistry and texture to your environment."
  },
  {
    question: "How long does concrete sealing take?",
    answer: "Most commercial sealing projects are completed overnight or in a single day. Penetrating sealers are typically walkable within hours, and your facility can be back in full operation the next morning — unlike a full coating system that requires multiple days of downtime."
  },
  {
    question: "Which DFW areas do you serve for concrete sealing?",
    answer: "We seal concrete floors across Dallas, Fort Worth, Plano, Frisco, McKinney, Allen, Richardson, Carrollton, Lewisville, Prosper, Celina, The Colony, Flower Mound, and more — including restaurants, breweries, tasting rooms, commercial kitchens, warehouses, and food-processing facilities. For projects over 10,000 sq ft, we also mobilize crews nationwide."
  }
];

const ConcreteSealing = () => {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const industries = [
    { icon: <UtensilsCrossed className="h-8 w-8 text-blue-600" />, title: "Restaurants", description: "Stain-proof dining rooms and back-of-house floors that wipe clean and pass health inspections." },
    { icon: <Beer className="h-8 w-8 text-blue-600" />, title: "Breweries & Tasting Rooms", description: "Sealed slabs that resist hops, yeast, beer spills, and constant rinsing." },
    { icon: <ChefHat className="h-8 w-8 text-blue-600" />, title: "Commercial Kitchens", description: "Grease, oil, and acid-resistant sealers built for daily wash-down environments." },
    { icon: <Warehouse className="h-8 w-8 text-blue-600" />, title: "Warehouses & Distribution", description: "Dust-proof, easy-to-sweep floors that hold up to forklift and pallet jack traffic." }
  ];

  const benefits = [
    { icon: <Shield className="h-6 w-6 text-blue-600" />, title: "Stain Resistance", description: "Blocks oil, grease, wine, beer, food acids, and sanitizers from absorbing into the slab." },
    { icon: <Droplets className="h-6 w-6 text-blue-600" />, title: "Easy Cleaning", description: "Sealed concrete wipes and mops clean in a fraction of the time of raw concrete." },
    { icon: <Sparkles className="h-6 w-6 text-blue-600" />, title: "Enhanced Appearance", description: "Brings out the natural color and depth of the slab with matte, satin, or wet-look finishes." },
    { icon: <CheckCircle className="h-6 w-6 text-blue-600" />, title: "Durability", description: "Reduces dusting, abrasion, and freeze-thaw damage — extending the useful life of the slab." }
  ];

  const phoneNumber = "214-305-6516";

  return (
    <>
      <Helmet>
        <title>Commercial Concrete Sealing Dallas-Fort Worth | Restaurants, Breweries & Warehouses</title>
        <meta name="description" content="Professional commercial concrete sealing across DFW. Stain-resistant, easy-clean sealed concrete floors for restaurants, breweries, commercial kitchens, and warehouses. Reseal every 2–5 years." />
        <meta name="keywords" content="concrete sealing Dallas, concrete sealer Fort Worth, restaurant concrete sealing, brewery floor sealer, commercial kitchen concrete sealer, warehouse concrete sealing, reseal concrete DFW, food-safe concrete sealer" />
        <meta property="og:title" content="Commercial Concrete Sealing DFW | Legacy Industrial Coatings" />
        <meta property="og:description" content="Stain-proof, easy-to-clean sealed concrete floors for DFW restaurants, breweries, commercial kitchens and warehouses." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/concrete-sealing" />
        <meta property="og:url" content="https://legacyindustrialcoatings.com/concrete-sealing" />
      </Helmet>

      <StructuredData
        services={[
          { name: "Commercial Concrete Sealing", description: "Penetrating and topical concrete sealing for DFW restaurants, breweries, commercial kitchens, and warehouses. Stain-resistant, easy-clean, slip-rated sealers with quarterly deep-clean and 2–5 year reseal programs.", url: "/concrete-sealing" },
        ]}
        faqs={sealingFaqs}
      />

      <div className="min-h-screen bg-white">
        <HeaderGeneric />
        <main>

        {/* Hero */}
        <section className="pt-24 pb-16 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                  Commercial Concrete Sealing in <span className="text-blue-700">Dallas–Fort Worth</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Stain-proof, easy-to-clean sealed concrete floors for restaurants, breweries, commercial kitchens, and warehouses across DFW. Installed overnight, recommended to reseal every 2–5 years.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="bg-blue-700 hover:bg-blue-800 text-white px-7 py-3 rounded-md shadow-sm">
                    <a href={`tel:${phoneNumber}`}>
                      <Phone className="mr-2 h-5 w-5" />
                      {phoneNumber}
                    </a>
                  </Button>
                  <Button variant="outline" onClick={() => setShowBookingModal(true)} className="border-blue-700 text-blue-700 hover:bg-blue-50 px-7 py-3 rounded-md">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book An Estimate
                  </Button>
                </div>
                <p className="mt-6 text-sm text-gray-500 uppercase tracking-wider">Nationwide capability on jobs over 10,000 sq ft</p>
              </div>
              <div className="relative">
                <img src={sealingHero} alt="Sealed concrete floor in a brewery tasting room with bar seating and wine barrels" className="relative w-full h-[28rem] object-cover rounded-md shadow-xl" loading="eager" decoding="async" fetchpriority="high" />
              </div>
            </div>
          </div>
        </section>

        {/* Sealing vs Coating vs Polishing */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Sealing vs. Coating vs. Polished Concrete
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Three different ways to protect commercial concrete. Here's how they compare so you can pick the right one for your facility.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-blue-200 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">Concrete Sealing</h3>
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">A thin, often invisible barrier that penetrates or lays just on top of the slab to block stains and moisture.</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li><strong>Build:</strong> Thin / penetrating</li>
                    <li><strong>Downtime:</strong> Overnight</li>
                    <li><strong>Cost:</strong> Lowest of the three</li>
                    <li><strong>Lifespan:</strong> Reseal every 2–5 years</li>
                    <li><strong>Best for:</strong> Restaurants, breweries, kitchens, warehouses</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Concrete Coating</h3>
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">A thick epoxy, polyaspartic, or urethane cement film that builds an entirely new wear surface on the slab.</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li><strong>Build:</strong> 20–250+ mils film</li>
                    <li><strong>Downtime:</strong> 1–4 days</li>
                    <li><strong>Cost:</strong> Highest</li>
                    <li><strong>Lifespan:</strong> 10–20+ years</li>
                    <li><strong>Best for:</strong> Heavy chemical, thermal, or impact environments</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Polished Concrete</h3>
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">The existing slab refined with diamond tooling and lithium-silicate densifier. No film at all.</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li><strong>Build:</strong> None — slab itself</li>
                    <li><strong>Downtime:</strong> Phased / off-hours</li>
                    <li><strong>Cost:</strong> Mid-to-high</li>
                    <li><strong>Lifespan:</strong> 3–10 years (varies with traffic; rebuff/redensify to refresh)</li>
                    <li><strong>Best for:</strong> Warehouses, retail, showrooms</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* When you need it */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img src={sealingDetail} alt="Close-up of sealed concrete floor in a commercial tasting room with metal chairs" className="w-full h-[26rem] object-cover rounded-md shadow-lg"  loading="eager" decoding="async" />
              </div>
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                  Signs Your Restaurant or Kitchen Needs Concrete Sealing
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Raw concrete is porous. In a restaurant or commercial kitchen, that means grease, food acids, wine, beer, sanitizers, and dropped sauces soak straight into the slab — creating permanent stains, odor traps, and surfaces that fail health inspections.
                </p>
                <p className="text-base font-semibold text-gray-900 mb-3">Consider sealing if any of these apply:</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0 mt-1 mr-3" /><span>You're in a new build-out and want protection in place before opening day.</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0 mt-1 mr-3" /><span>Your floor is dusting, looks blotchy, or no longer beads water when splashed.</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0 mt-1 mr-3" /><span>Stains are setting in faster than your nightly mop crew can keep up with.</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0 mt-1 mr-3" /><span>A health inspector flagged porous, stained, or hard-to-sanitize flooring.</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0 mt-1 mr-3" /><span>Your last sealer was applied two or more years ago and needs to be refreshed.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Benefits of Sealed Concrete
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Why operators across DFW choose sealing as their first line of defense.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b, i) => (
                <Card key={i} className="border border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="bg-slate-100 w-11 h-11 rounded-md flex items-center justify-center mb-4">
                      {b.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{b.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{b.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Industries We Serve</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Sealed concrete works wherever a porous slab meets daily abuse — from a 1,200 sq ft tasting room to a 50,000 sq ft distribution warehouse.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {industries.map((ind, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-md p-5">
                      <div className="mb-3">{ind.icon}</div>
                      <h3 className="text-base font-semibold text-gray-900 mb-1">{ind.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{ind.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img src={sealingCidery} alt="Sealed concrete floor in a cidery tasting room with wood ceiling and dining tables" className="w-full h-[28rem] object-cover rounded-md shadow-lg"  loading="eager" decoding="async" />
              </div>
            </div>
          </div>
        </section>

        {/* Reseal cycle */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How Often Should You Reseal? <span className="text-blue-600">Every 2–5 Years.</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Sealers are sacrificial — they wear off mechanically (foot and wheel traffic) and chemically (degreasers, food acids, sanitizers). The right reseal interval depends on how hard your floor works.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Clock className="h-6 w-6 text-blue-600 mr-2" />
                    <h3 className="text-lg font-bold text-gray-900">Every 4–5 Years</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-2"><strong>Light traffic:</strong> Offices, showrooms, retail back-of-house, low-volume tasting rooms.</p>
                  <p className="text-sm text-gray-600">Foot traffic only, minimal chemical exposure, no daily wash-downs.</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-2 border-blue-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Clock className="h-6 w-6 text-blue-600 mr-2" />
                    <h3 className="text-lg font-bold text-gray-900">Every 3 Years</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-2"><strong>Medium traffic:</strong> Most restaurants, breweries, bars, tasting rooms with food service.</p>
                  <p className="text-sm text-gray-600">Daily mopping, regular spills, mixed foot and cart traffic.</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Clock className="h-6 w-6 text-blue-600 mr-2" />
                    <h3 className="text-lg font-bold text-gray-900">Every 2 Years</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-2"><strong>Heavy traffic:</strong> Commercial kitchens, food processing, warehouses with forklifts and pallet jacks.</p>
                  <p className="text-sm text-gray-600">Daily wash-downs, hot grease, harsh sanitizers, wheeled loads.</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-6 max-w-4xl mx-auto">
              <div className="flex items-start">
                <RefreshCw className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1 mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Why You Have to Reapply</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Every mop pass, scrub, spill, and footstep removes a microscopic layer of sealer. Once it thins out, water stops beading, stains start to set, and the floor begins to look dull, blotchy, or hazy. Resealing on a planned cycle is dramatically cheaper than letting grease, dyes, and food acids absorb into the bare slab — once that happens, the only fix is mechanical grinding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nationwide capability */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <img src={sealingWarehouse} alt="Large sealed concrete warehouse floor with overhead doors and mezzanine" className="w-full h-[26rem] object-cover rounded-md shadow-2xl"  loading="eager" decoding="async" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-blue-300 mb-3">Large-format projects</p>
                <h2 className="text-3xl lg:text-4xl font-bold mb-5 tracking-tight">
                  Nationwide capability for jobs over 10,000 sq ft
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed mb-6">
                  For warehouses, distribution centers, food-processing plants, and multi-site rollouts above 10,000 square feet, we mobilize crews and equipment outside the DFW metroplex. One point of contact, consistent specs, and a single accountable team across every location.
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1 mr-3" /><span>Single-source pricing for multi-location portfolios</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1 mr-3" /><span>Phased night and weekend work to keep operations running</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1 mr-3" /><span>Standardized sealer specs and reseal schedules across every site</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Maintenance & Cleaning */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Maintenance & Quarterly Deep Cleaning
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                The fastest way to wreck a sealed floor is to rely on the nightly mop bucket. Here's what actually keeps it looking new.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Daily / Nightly Routine</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1 mr-3" /><span>Sweep or dust mop to remove grit (the #1 cause of sealer wear).</span></li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1 mr-3" /><span>Damp mop with a pH-neutral cleaner — never harsh acids or strong degreasers.</span></li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1 mr-3" /><span>Change mop water frequently. Dirty water just smears grease and grit across the floor.</span></li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-2 border-blue-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Quarterly Professional Deep Clean</h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    In a restaurant, brewery, or commercial kitchen, sealed concrete needs a <strong>professional deep clean every 3 months</strong>. Mops only push greasy water around — they leave a film in joints, around equipment legs, and along baseboards that nightly cleaning never extracts.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1 mr-3" /><span>Hot-water extraction lifts embedded grease and biofilm.</span></li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1 mr-3" /><span>Restores slip resistance and the sealer's natural sheen.</span></li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1 mr-3" /><span>Doubles the life of the sealer between reseals.</span></li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="py-16 bg-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Seal Your Floor?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Free on-site assessment across DFW. Most jobs completed overnight — no shutdown required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="secondary" className="bg-white text-blue-700 hover:bg-gray-100 px-7 py-3 rounded-md shadow-sm">
                <a href={`tel:${phoneNumber}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {phoneNumber}
                </a>
              </Button>
              <Button variant="outline" onClick={() => setShowBookingModal(true)} className="border-white text-white hover:bg-white hover:text-blue-700 px-7 py-3 rounded-md bg-white/10">
                <Calendar className="mr-2 h-5 w-5" />
                Book An Estimate
              </Button>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Case Study</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A real DFW concrete sealing project we recently delivered.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <button
                onClick={() => navigate("/commercial-case-studies/fast-casual-restaurant-concrete-sealing")}
                className="text-left w-full group"
              >
                <Card className="border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="md:grid md:grid-cols-2">
                    <div className="aspect-video md:aspect-auto md:h-full overflow-hidden bg-slate-100">
                      <img
                        src={restaurantCaseStudyHero}
                        alt="Restored fast-casual restaurant concrete floor after Legacy Industrial Coatings sealing"
                        loading="eager"
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                      <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-md mb-3 w-fit">
                        Fast-Casual Restaurant
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        8-Year-Old Sealant Restoration
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        A fast-casual restaurant whose concrete had been sealed once at opening and never again.
                        See how we deep-cleaned, restored, and resealed the slab in a single overnight visit —
                        with full before, during, and after photos.
                      </p>
                      <span className="inline-flex items-center text-sm font-semibold text-blue-700">
                        View case study <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </CardContent>
                  </div>
                </Card>
              </button>
            </div>
          </div>
        </section>

        {/* SEO long-form content */}
        <section className="py-20 bg-slate-50" aria-labelledby="sealing-content-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="sealing-content-heading" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-center">
              Commercial Concrete Sealing in Dallas-Fort Worth
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-5 leading-relaxed">
              <p>
                Legacy Industrial Coatings provides <strong>commercial concrete sealing</strong> across the Dallas-Fort Worth metroplex for restaurants, breweries, tasting rooms, commercial kitchens, food-processing facilities, and warehouses. A properly specified sealer is the fastest, lowest-cost way to protect a concrete slab from the staining and dusting that comes with daily commercial use.
              </p>
              <p>
                Unlike a thick epoxy or polyaspartic coating, a sealer is a thin, often invisible barrier — penetrating sealers chemically react inside the slab to block moisture and oils, while topical sealers form a low-build film that beads water and resists food acids. Both options preserve the natural look of concrete and most installations are completed overnight, so your facility is back in operation by morning.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Food-Safe & Slip-Rated</h3>
              <p>
                For food and beverage environments, we specify sealers that are compatible with USDA, FDA, and local health-department requirements, and we add anti-slip aggregates wherever required by code. Wet kitchens, beer-line drips in tasting rooms, and walk-in cooler thresholds all need slip-rated chemistry — not a generic concrete sealer from a hardware store.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">2–5 Year Reseal Programs</h3>
              <p>
                Sealers are sacrificial. We build a planned reseal schedule into every commercial bid so you're never surprised by a stained, dusting floor. Most restaurants and breweries fall into a <strong>3-year reseal cycle</strong>; high-output kitchens and warehouses fall into a <strong>2-year cycle</strong>; light-use offices and showrooms can stretch to <strong>4–5 years</strong>.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Quarterly Deep Cleaning Extends Sealer Life</h3>
              <p>
                The single biggest factor in how long a sealer lasts is what happens between reseal jobs. Nightly mopping handles surface dirt, but it leaves grease, biofilm, and embedded grit in joints and around equipment. <strong>Quarterly professional deep cleaning</strong> with hot-water extraction pulls that residue out, restores slip resistance, and routinely doubles the useful life of the sealer.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Where We Seal Concrete</h3>
              <p>
                Our crews seal concrete floors throughout <strong>Dallas, Fort Worth, Plano, Frisco, McKinney, Allen, Richardson, Carrollton, Lewisville, Prosper, Celina, The Colony, Flower Mound, and more</strong> — including new restaurant build-outs, brewery and tasting room expansions, commercial kitchen remodels, food-processing plants, and distribution warehouses. For projects over <strong>10,000 sq ft</strong>, we also mobilize crews <strong>nationwide</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white" aria-labelledby="sealing-faq-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <h2 id="sealing-faq-heading" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Concrete Sealing FAQ
              </h2>
              <p className="text-lg text-gray-600">
                Common questions about commercial concrete sealing in DFW.
              </p>
            </div>
            <div className="space-y-8">
              {sealingFaqs.map((faq, i) => (
                <article key={i} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Get Your Concrete Sealed</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Free on-site assessment, food-safe sealer specifications, and a planned reseal schedule for your facility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="secondary" className="bg-white text-blue-700 hover:bg-gray-100 px-7 py-3 rounded-md shadow-sm">
                <a href={`tel:${phoneNumber}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {phoneNumber}
                </a>
              </Button>
              <Button variant="outline" onClick={() => setShowBookingModal(true)} className="border-white text-white hover:bg-white hover:text-blue-700 px-7 py-3 rounded-md bg-white/10">
                <Calendar className="mr-2 h-5 w-5" />
                Book An Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        </main>

        <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />

        <Footer />
      </div>
    </>
  );
};

export default ConcreteSealing;
