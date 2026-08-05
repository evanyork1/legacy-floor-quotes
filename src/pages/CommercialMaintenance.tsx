import { useState } from "react";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Droplets,
  Wrench,
  Layers,
  ClipboardCheck,
  CheckCircle,
  GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BookingModal } from "@/components/landing/BookingModal";
import Seo from "@/components/seo/Seo";
import { StructuredData } from "@/components/seo/StructuredData";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";

import maintenanceHero from "@/assets/commercial-polishing-work.jpg";
import maintenanceDetail from "@/assets/concrete-sealing-floor-detail.jpg";
import maintenanceWarehouse from "@/assets/polishing-warehouse.jpg";

const FAQS = [
  {
    question: "Do you clean and maintain floors you didn't install?",
    answer:
      "Yes. We maintain any commercial floor in the Dallas-Fort Worth area regardless of who installed it. A large share of our maintenance customers came to us with existing epoxy, polished concrete, VCT, LVT, or carpet tile that was installed by another contractor.",
  },
  {
    question: "How are your cleaning crews trained?",
    answer:
      "Our cleaning crews are trained by the material and product manufacturers on the correct procedures for each floor system — approved chemistry, dilution ratios, pad and brush selection, dwell times, and rinse and recovery. That training is the reason nothing that could damage the floor is used during our cleaning process.",
  },
  {
    question: "Can the wrong cleaner damage an epoxy or polished concrete floor?",
    answer:
      "It can. High-pH strippers, acidic descalers, citrus and solvent-based degreasers, and aggressive pads can dull a coating's gloss, soften a resin surface, etch a densified slab, or leave a residue that turns slippery. Repeated use of the wrong product shortens the life of the floor and can void a manufacturer warranty. Manufacturer-approved chemistry avoids all of it.",
  },
  {
    question: "How often should a commercial floor be professionally cleaned?",
    answer:
      "Most facilities are on a monthly or quarterly deep-cleaning cycle in addition to their own daily housekeeping. Restaurants, commercial kitchens, breweries, and food-processing areas usually need quarterly deep cleaning and degreasing at minimum. High-traffic warehouses, schools, and medical facilities are often monthly.",
  },
  {
    question: "How often does a sealed or coated floor need resealing?",
    answer:
      "Most commercial floors need resealing every 2 to 5 years depending on traffic, wash-down frequency, and the chemistry originally applied. Light-traffic offices and showrooms can stretch to 4 or 5 years; kitchens, warehouses, and forklift-traffic areas are typically 2 to 3 years.",
  },
  {
    question: "How often does VCT need to be stripped and waxed?",
    answer:
      "VCT typically needs a full strip and re-wax every 12 to 24 months, with scrub-and-recoat and burnishing in between. High-traffic entries, corridors, and retail sales floors are on the shorter end of that window. We build the cadence around your traffic instead of a generic schedule.",
  },
  {
    question: "What floor types do you clean and maintain?",
    answer:
      "Epoxy, polyaspartic and polyurea coatings, urethane cement, polished concrete, sealed concrete, VCT, LVT, ceramic and porcelain tile, carpet, and carpet tile. Most facilities have several of these under one roof, and we maintain all of them on one program.",
  },
  {
    question: "Do you do repairs as part of a maintenance program?",
    answer:
      "Yes. Maintenance includes joint and crack repair, patching spalls and divots, re-coating worn traffic lanes, cove base repair, and re-sealing. Catching a small failure during a scheduled visit is far cheaper than a full tear-out later.",
  },
  {
    question: "Can you work after hours or on weekends?",
    answer:
      "Yes. Most of our commercial maintenance work is scheduled nights, early mornings, or weekends so your facility keeps operating. We coordinate access, equipment staging, and area sequencing with your facility manager before the first visit.",
  },
  {
    question: "How is a maintenance program priced?",
    answer:
      "Pricing is based on square footage, floor type, soil load, frequency, and access windows. We walk the facility, document the current condition of each floor type, and build a written program with a fixed per-visit price so there are no surprises.",
  },
];

const floorTypes = [
  {
    icon: Layers,
    title: "Epoxy, Polyaspartic & Urethane Cement",
    body:
      "Manufacturer-approved neutral cleaners and correct pad selection keep resinous floors glossy without hazing, scratching, or stripping the topcoat.",
  },
  {
    icon: Sparkles,
    title: "Polished & Sealed Concrete",
    body:
      "Auto-scrubbing with pH-neutral chemistry plus burnishing to bring clarity and sheen back, and re-densifying or re-sealing when the surface starts absorbing again.",
  },
  {
    icon: Droplets,
    title: "VCT, LVT & Tile",
    body:
      "Scrub-and-recoat, full strip and wax, burnishing for VCT, and manufacturer-safe cleaning for LVT and grouted tile that won't break down the wear layer.",
  },
  {
    icon: ShieldCheck,
    title: "Carpet & Carpet Tile",
    body:
      "Hot-water extraction, encapsulation, spot treatment, and entry-area programs to keep soil from tracking onto the hard surfaces next door.",
  },
];

const services = [
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    body: "Auto-scrubbing, edge and corner detail, and extraction that pulls out what nightly mopping leaves behind.",
  },
  {
    icon: Droplets,
    title: "Degreasing",
    body: "Kitchen, bar, and production-floor degreasing with approved chemistry that restores slip resistance instead of destroying the finish.",
  },
  {
    icon: Wrench,
    title: "Repairs",
    body: "Crack and joint repair, spall patching, cove base fixes, and worn traffic-lane recoating handled during scheduled visits.",
  },
  {
    icon: ShieldCheck,
    title: "Resealing",
    body: "Re-application of sealers and topcoats on a 2 to 5 year cycle before the slab starts absorbing stains again.",
  },
  {
    icon: Layers,
    title: "VCT Strip & Wax",
    body: "Full strip, re-wax, scrub-and-recoat, and burnishing programs that keep VCT looking new between full cycles.",
  },
  {
    icon: ClipboardCheck,
    title: "Scheduled Programs",
    body: "Nightly, monthly, or quarterly service with documented scope, fixed per-visit pricing, and after-hours scheduling.",
  },
];

const CommercialMaintenance = () => {
  const navigate = useNavigate();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <Seo
        title="Commercial Floor Cleaning & Maintenance in DFW | Legacy"
        description="Manufacturer-trained commercial floor cleaning and maintenance in Dallas-Fort Worth. Deep cleaning, degreasing, repairs, resealing, and VCT strip and wax."
        path="/commercial-floor-maintenance"
      />

      <StructuredData
        includeLocalBusiness={false}
        includeOrganization={false}
        services={[
          {
            name: "Commercial Floor Cleaning & Maintenance",
            description:
              "Scheduled commercial floor cleaning and maintenance in Dallas-Fort Worth: deep cleaning, degreasing, repairs, resealing, and VCT strip and wax, performed by crews trained by the material and product manufacturers.",
            url: "/commercial-floor-maintenance",
          },
        ]}
        faqs={FAQS}
      />

      <PageBreadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Commercial", url: "/commercial" },
          { name: "Maintenance", url: "/commercial-floor-maintenance" },
        ]}
      />

      <div className="min-h-screen bg-white">
        <HeaderGeneric />

        {/* Hero */}
        <section className="pt-20 pb-16 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-semibold tracking-wide text-blue-900 uppercase mb-4">
                  Commercial Maintenance
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Commercial Floor Cleaning &amp; Maintenance in Dallas–Fort Worth
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                  Scheduled cleaning, degreasing, repairs, resealing, and VCT wax programs — performed by
                  crews trained by the material and product manufacturers, so nothing that could harm your
                  floor is ever used on it.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="bg-blue-900 hover:bg-blue-950 text-white px-8 py-3 shadow-md"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Book a Facility Walkthrough
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-3"
                  >
                    <a href="tel:214-305-6516">
                      <Phone className="mr-2 h-5 w-5" />
                      214-305-6516
                    </a>
                  </Button>
                </div>
              </div>
              <div>
                <img
                  src={maintenanceHero}
                  alt="Commercial floor cleaning crew maintaining a polished concrete floor in a Dallas-Fort Worth facility"
                  className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-xl"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturer-trained crews */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-blue-900 font-semibold mb-4">
                  <GraduationCap className="h-5 w-5" />
                  Manufacturer-Trained Crews
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Trained by the people who make the floor
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Every crew that touches your floor is trained by the material and product manufacturers on
                  the correct cleaning technique for that specific system. That means approved chemistry,
                  correct dilution, the right pad or brush, proper dwell time, and full rinse and recovery —
                  not whatever cleaner happened to be on the truck.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  The wrong product will dull a coating, etch a densified slab, break down a wear layer, or
                  leave a slick residue behind. We don't use anything that could harm the floor during the
                  cleaning process. That discipline is the difference between a floor that still looks
                  installed in year eight and one that has to be ground off and redone.
                </p>
                <ul className="space-y-3">
                  {[
                    "Manufacturer-approved chemistry for every floor type on site",
                    "Correct pad, brush, and equipment selection per surface",
                    "No harsh strippers or acids on coated or polished surfaces",
                    "Documented procedures that protect your warranty",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle className="h-5 w-5 text-blue-900 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <img
                  src={maintenanceDetail}
                  alt="Close-up of a professionally cleaned and resealed commercial concrete floor"
                  className="w-full h-80 lg:h-[28rem] object-cover rounded-xl shadow-lg"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why maintenance matters */}
        <section className="py-16 lg:py-20 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Maintenance is how a floor lasts
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                A new floor is an investment in your facility. Maintenance is what protects it. Scheduled
                professional cleaning is the single best way to keep a floor performing for years — it is an
                essential part of every floor we install, and it's the reason our installations still look
                right long after the install crew has left.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "Protects the surface",
                  body: "Grit, grease, and food acids grind down and eat into a finish. Removing them on a schedule keeps the wear surface intact instead of sacrificial.",
                },
                {
                  title: "Catches problems early",
                  body: "Our crews document cracks, joint failures, and worn traffic lanes on every visit — small repairs now instead of a tear-out later.",
                },
                {
                  title: "Keeps it safe and presentable",
                  body: "Correct cleaning restores slip resistance and appearance, which matters for inspections, customers, and your team.",
                },
              ].map((item) => (
                <Card key={item.title} className="bg-white border border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                What our maintenance service includes
              </h2>
              <p className="text-lg text-gray-700">
                One program that covers cleaning and the repair work most facilities have to chase down
                separately.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <Card key={s.title} className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <s.icon className="h-8 w-8 text-blue-900 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{s.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Floor types */}
        <section className="py-16 lg:py-20 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Floor types we clean and maintain
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Most commercial buildings have four or five different floor surfaces under one roof. We
                  maintain all of them on a single program instead of making you coordinate separate vendors.
                </p>
                <div className="space-y-5">
                  {floorTypes.map((f) => (
                    <div key={f.title} className="flex items-start gap-4">
                      <f.icon className="h-6 w-6 text-blue-900 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{f.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{f.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img
                  src={maintenanceWarehouse}
                  alt="Large commercial warehouse floor maintained on a scheduled cleaning program"
                  className="w-full h-80 lg:h-[30rem] object-cover rounded-xl shadow-lg"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Program cadence */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Building your maintenance program
              </h2>
              <p className="text-lg text-gray-700">
                We start with a walkthrough, document the condition of every floor type in the building, and
                write a program around your traffic and your access windows.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Walkthrough", body: "We map every floor surface, note existing damage, and identify what's causing wear." },
                { step: "02", title: "Written scope", body: "You get a documented scope per area with a fixed per-visit price — nightly, monthly, or quarterly." },
                { step: "03", title: "Scheduled service", body: "Crews work nights, early mornings, or weekends so your facility keeps running." },
                { step: "04", title: "Condition reporting", body: "Each visit is documented so repairs and resealing get scheduled before they become emergencies." },
              ].map((s) => (
                <Card key={s.step} className="bg-white border border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-blue-900 mb-3">{s.step}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{s.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-20 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-10 text-center">
              Commercial floor maintenance questions
            </h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {FAQS.map((f) => (
                <Card key={f.question} className="bg-white border border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{f.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{f.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Related services */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
              Related commercial services
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                { name: "Commercial Flooring", path: "/commercial" },
                { name: "Concrete Sealing", path: "/concrete-sealing" },
                { name: "Concrete Polishing", path: "/concrete-polishing" },
                { name: "Commercial Case Studies", path: "/commercial-case-studies" },
              ].map((l) => (
                <Button
                  key={l.path}
                  variant="outline"
                  onClick={() => navigate(l.path)}
                  className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white justify-between h-auto py-4"
                >
                  {l.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Anyone can use it */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                We maintain floors we didn't install
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                You don't have to be an existing customer. We clean and maintain commercial floors across
                Dallas-Fort Worth regardless of who installed them — epoxy, polished concrete, VCT, LVT,
                tile, and carpet. If someone else put the floor in and nobody has taken care of it since,
                that's exactly the kind of building we're set up for.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Get a maintenance program for your facility
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Free walkthrough and a written per-visit price for every floor type in your building.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book a Walkthrough
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3"
              >
                <a href="tel:214-305-6516">
                  <Phone className="mr-2 h-5 w-5" />
                  214-305-6516
                </a>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </>
  );
};

export default CommercialMaintenance;
