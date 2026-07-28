import { Shield, Clock, Sparkles, Phone } from "lucide-react";

const WhyChooseSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Lifetime warranty",
      description: "Every floor is backed for life against peeling, flaking, and failure.",
    },
    {
      icon: Clock,
      title: "One-day installation",
      description: "Most garages are prepped, coated, and finished in a single day.",
    },
    {
      icon: Sparkles,
      title: "Low maintenance",
      description: "Our flake system hides dust and cleans up with a mop.",
    },
    {
      icon: Clock,
      title: "Same-day estimates",
      description: "Quotes returned in hours, not weeks.",
    },
    {
      icon: Phone,
      title: "Direct contact",
      description: "Call or text your project lead anytime.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image */}
          <div className="lg:sticky lg:top-24">
            <div className="text-xs font-medium tracking-[0.18em] uppercase text-gray-500 mb-4">
              Why Legacy
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight leading-[1.15] mb-8">
              A floor built the right way,
              <span className="block text-gray-500 font-normal">the first time.</span>
            </h2>
            <div className="relative overflow-hidden rounded-lg border border-gray-200">
              <img
                src="/lovable-uploads/8d8cf4a3-4ed7-4f9b-8909-0cf80a149ecc.png"
                alt="Finished residential garage with polyurea flake floor"
                className="w-full h-[320px] md:h-[420px] object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Feature list */}
          <ul className="divide-y divide-gray-100 border-y border-gray-100">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <li key={index} className="py-6 flex items-start gap-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-md border border-gray-200 flex items-center justify-center bg-white">
                    <Icon className="w-4 h-4 text-blue-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 mb-1 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
