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

const FAQS = [
  {
    question: "How are your cleaning crews trained?",
    answer:
      "Our crews are trained by the material and product manufacturers on the correct chemistry, dilution, pads, and dwell times for each floor system. Nothing that could damage the floor is used.",
  },
  {
    question: "What floor types do you maintain?",
    answer:
      "Epoxy, polyaspartic, polyurea, urethane cement, polished and sealed concrete, VCT, LVT, tile, carpet, and carpet tile.",
  },
  {
    question: "How often should a commercial floor be professionally cleaned?",
    answer:
      "Most facilities are on a monthly or quarterly deep-clean cycle. Kitchens, breweries, and food-processing areas typically need quarterly service at minimum.",
  },
  {
    question: "Do you do repairs as part of maintenance?",
    answer:
      "Yes. We handle crack and joint repair, spall patching, worn traffic-lane recoating, cove base repair, and resealing during scheduled visits.",
  },
  {
    question: "How often does VCT need to be stripped and waxed?",
    answer:
      "VCT usually needs a full strip and re-wax every 12 to 24 months, with scrub-and-recoat and burnishing in between.",
  },
  {
    question: "Can you work after hours or weekends?",
    answer:
      "Yes. Most of our maintenance work is scheduled nights, early mornings, or weekends so your facility stays open.",
  },
  {
    question: "How is maintenance priced?",
    answer:
      "Pricing is based on square footage, floor type, soil load, and frequency. We walk the facility and provide a fixed per-visit price.",
  },
  {
    question: "Do you maintain floors you didn't install?",
    answer:
      "Yes. We clean and maintain commercial floors across Dallas-Fort Worth regardless of who installed them.",
  },
];

const services = [
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    body: "Auto-scrubbing, edge detail, and extraction that removes what nightly mopping leaves behind.",
  },
  {
    icon: Droplets,
    title: "Degreasing",
    body: "Kitchen, bar, and production-floor degreasing with approved chemistry that restores slip resistance.",
  },
  {
    icon: Wrench,
    title: "Repairs",
    body: "Crack and joint repair, spall patching, cove base fixes, and worn traffic-lane recoating.",
  },
  {
    icon: ShieldCheck,
    title: "Resealing",
    body: "Re-application of sealers and topcoats before the slab starts absorbing stains again.",
  },
  {
    icon: Layers,
    title: "VCT Strip & Wax",
    body: "Full strip, re-wax, scrub-and-recoat, and burnishing programs that keep VCT looking new.",
  },
  {
    icon: Calendar,
    title: "Scheduled Programs",
    body: "Nightly, monthly, or quarterly service with documented scope and fixed per-visit pricing.",
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
              "Scheduled commercial floor cleaning and maintenance in Dallas-Fort Worth by manufacturer-trained crews.",
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
                  Scheduled cleaning, repairs, resealing, and VCT wax programs performed by
                  manufacturer-trained crews. Maintenance protects the investment and keeps your floor
                  performing for years.
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
                  fetchPriority="high"
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
                  Every crew is trained by the material and product manufacturers on the correct cleaning
                  technique for that specific system — approved chemistry, dilution, pads, and dwell times.
                  The wrong product can dull a coating, etch polished concrete, or break down a wear layer.
                  We don't use anything that could harm the floor.
                </p>
                <ul className="space-y-3">
                  {[
                    "Manufacturer-approved chemistry for every floor type",
                    "Correct pad, brush, and equipment selection per surface",
                    "No harsh strippers or acids on coated or polished floors",
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

        {/* What's included */}
        <section className="py-16 lg:py-20 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                What maintenance includes
              </h2>
              <p className="text-lg text-gray-700">
                One program that covers cleaning and the repairs most facilities chase down separately.
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

        {/* Floor types + process */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Floor types we maintain
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  Most buildings have several surfaces under one roof. We maintain all of them on one
                  program.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Epoxy, polyaspartic & polyurea",
                    "Polished & sealed concrete",
                    "VCT, LVT & tile",
                    "Carpet & carpet tile",
                  ].map((type) => (
                    <div key={type} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-900 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  How it works
                </h2>
                <div className="space-y-6">
                  {[
                    { title: "Walkthrough", body: "We map every surface, note damage, and identify wear patterns." },
                    { title: "Written scope", body: "You get a documented scope with a fixed per-visit price." },
                    { title: "Scheduled service", body: "Nights, early mornings, or weekends — your facility stays open." },
                    { title: "Condition reporting", body: "Repairs and resealing get scheduled before they become emergencies." },
                  ].map((step, i) => (
                    <div key={step.title} className="flex gap-4">
                      <div className="text-2xl font-bold text-blue-900 w-8">{String(i + 1).padStart(2, "0")}</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                        <p className="text-gray-700">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-20 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-10 text-center">
              Common questions
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
