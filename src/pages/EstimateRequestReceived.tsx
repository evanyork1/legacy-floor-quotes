import { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const STEPS = [
  {
    title: "We review your project",
    description:
      "We look over your details and photos to understand the scope.",
  },
  {
    title: "We call to confirm",
    description:
      "A team member will reach out to confirm timing and answer questions.",
  },
  {
    title: "We walk the job site",
    description:
      "We visit your property, take measurements, and finalize your quote.",
  },
];

export default function EstimateRequestReceived() {
  const { pathname } = useLocation();
  const isBooking = pathname === "/booking-confirmed";
  const formType = isBooking ? "booking" : "estimate_request";
  const heading = isBooking
    ? "Your estimate is booked"
    : "Thanks, we've got your request";
  const subheading = isBooking
    ? "You're on the calendar and we'll see you at the scheduled time."
    : "We'll review your request and call you within one business day.";

  const hasPushed = useRef(false);

  useEffect(() => {
    document.title = heading;

    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, [heading]);

  useEffect(() => {
    const storageKey = `legacy_conversion_${formType}`;
    if (hasPushed.current || sessionStorage.getItem(storageKey)) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lead_form_submitted",
      form_type: formType,
      form_source: "jobber_hosted",
    });

    hasPushed.current = true;
    sessionStorage.setItem(storageKey, "1");
  }, [formType]);

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-8">
              <Check className="h-10 w-10 text-blue-900" strokeWidth={2.5} />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-950 mb-4 tracking-tight">
              {heading}
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto">
              {subheading}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button
                asChild
                className="bg-blue-900 hover:bg-blue-950 text-white rounded-md px-8 py-6 text-base font-semibold shadow-lg hover:scale-[1.02] transition-transform w-full sm:w-auto"
              >
                <a href="tel:214-305-6516">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (214) 305-6516
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-blue-900 text-blue-900 hover:bg-blue-50 rounded-md px-8 py-6 text-base font-semibold w-full sm:w-auto"
              >
                <Link to="/">Back to home</Link>
              </Button>
            </div>

            <div className="text-left mb-16">
              <h2 className="text-xl sm:text-2xl font-bold text-blue-950 mb-8 text-center">
                What happens next
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {STEPS.map((step, index) => (
                  <div
                    key={step.title}
                    className="bg-slate-50 rounded-lg p-6 border border-slate-100"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-blue-950 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-medium text-slate-600 border-t border-slate-100 pt-8">
              <span>Licensed & Insured</span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span>Family Owned & Operated</span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span>Serving the Dallas-Fort Worth Metroplex</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
