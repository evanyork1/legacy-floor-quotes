import { X, Check } from "lucide-react";

const EpoxyVsPolyureaSection = () => {
  const rows = [
    { epoxy: "Minimal prep — weak bond", polyurea: "Full mechanical prep for lifetime adhesion" },
    { epoxy: "Chips, peels, and fades within 6–12 months", polyurea: "Won't chip, peel, or discolor" },
    { epoxy: "Yellows in sunlight", polyurea: "100% UV stable — stays vibrant for years" },
    { epoxy: "Brittle in extreme temps", polyurea: "Flexible in heat and cold" },
    { epoxy: "Long cure time (2–5 days)", polyurea: "Installed and ready in one day" },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-medium tracking-[0.18em] uppercase text-gray-500 mb-4">
            Materials
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight leading-[1.15]">
            Epoxy vs. polyurea.
            <span className="block text-gray-500 font-normal">Why our floors outlast the rest.</span>
          </h2>
        </div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Epoxy column — AVOID */}
          <div className="rounded-lg border border-gray-200 overflow-hidden bg-white flex flex-col">
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src="/lovable-uploads/69253a31-4762-4988-897d-8bc135fd43bd.png"
                alt="Failing epoxy garage floor peeling"
                className="w-full h-full object-cover grayscale opacity-90"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 bg-white text-red-700 border border-red-200 px-2.5 py-1 rounded text-[11px] font-semibold tracking-wide uppercase">
                  <X className="w-3 h-3" /> Avoid
                </span>
              </div>
            </div>
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">Cheap epoxy coatings</h3>
              <p className="text-xs text-gray-500 mt-0.5">Industry standard — short lifespan</p>
            </div>
            <ul className="divide-y divide-gray-100 flex-1">
              {rows.map((r, i) => (
                <li key={i} className="flex items-start gap-3 px-6 py-4">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-red-600" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-gray-600 leading-relaxed">{r.epoxy}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Polyurea column — RECOMMENDED */}
          <div className="rounded-lg border-2 border-blue-900 overflow-hidden bg-white flex flex-col shadow-sm">
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src="/lovable-uploads/b4732a11-b0eb-48f7-9950-d9c8e186ab97.png"
                alt="Finished polyurea flake garage floor"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 bg-blue-900 text-white px-2.5 py-1 rounded text-[11px] font-semibold tracking-wide uppercase">
                  <Check className="w-3 h-3" /> Recommended
                </span>
              </div>
            </div>
            <div className="px-6 py-5 border-b border-gray-100 bg-blue-50/40">
              <h3 className="text-base font-semibold text-blue-900">Our polyurea flake system</h3>
              <p className="text-xs text-blue-900/70 mt-0.5">Legacy Industrial Coatings — lifetime finish</p>
            </div>
            <ul className="divide-y divide-gray-100 flex-1">
              {rows.map((r, i) => (
                <li key={i} className="flex items-start gap-3 px-6 py-4">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-gray-900 leading-relaxed">{r.polyurea}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footnote */}
        <p className="mt-10 max-w-2xl text-sm text-gray-500 leading-relaxed">
          <span className="text-gray-900 font-medium">Over half</span> of our projects begin by removing a failed epoxy floor. We recommend starting with polyurea.
        </p>
      </div>
    </section>
  );
};

export default EpoxyVsPolyureaSection;
