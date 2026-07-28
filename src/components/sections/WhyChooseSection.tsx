import { Shield, Clock, Sparkles, Phone, Wrench } from "lucide-react";

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
      icon: Wrench,
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
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="order-1 lg:order-1 relative">
            <img
              src="/lovable-uploads/8d8cf4a3-4ed7-4f9b-8909-0cf80a149ecc.png"
              alt="Finished residential garage with polyurea flake floor"
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[520px] object-cover rounded-lg border border-gray-200"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Copy + features */}
          <div className="order-2 lg:order-2">
            <div className="text-xs font-medium tracking-[0.18em] uppercase text-gray-500 mb-4">
              Why Legacy
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight leading-[1.15] mb-8">
              A floor built the right way,
              <span className="block text-gray-500 font-normal">the first time.</span>
            </h2>

            <ul className="divide-y divide-gray-200 border-y border-gray-200">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <li key={index} className="py-5 flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-md bg-white border border-gray-200 flex items-center justify-center">
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
      </div>
    </section>
  );
};

export default WhyChooseSection;
