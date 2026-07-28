import { Minus, Check } from "lucide-react";

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
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-medium tracking-[0.18em] uppercase text-gray-500 mb-4">
            Materials
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight leading-[1.15]">
            Epoxy vs. polyurea.
            <span className="block text-gray-500 font-normal">Why our floors outlast the rest.</span>
          </h2>
        </div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
          {/* Epoxy column */}
          <div className="bg-white">
            <div className="px-6 py-5 border-b border-gray-100 flex items-baseline justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Cheap epoxy coatings</h3>
              <span className="text-xs text-gray-500">Industry standard</span>
            </div>
            <ul className="divide-y divide-gray-100">
              {rows.map((r, i) => (
                <li key={i} className="flex items-start gap-3 px-6 py-5">
                  <Minus className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-600 leading-relaxed">{r.epoxy}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Polyurea column */}
          <div className="bg-white">
            <div className="px-6 py-5 border-b border-gray-100 flex items-baseline justify-between">
              <h3 className="text-sm font-semibold text-blue-900">Our polyurea flake system</h3>
              <span className="text-xs font-medium tracking-wider uppercase text-blue-900">Legacy</span>
            </div>
            <ul className="divide-y divide-gray-100">
              {rows.map((r, i) => (
                <li key={i} className="flex items-start gap-3 px-6 py-5">
                  <Check className="w-4 h-4 mt-0.5 text-blue-900 flex-shrink-0" />
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
