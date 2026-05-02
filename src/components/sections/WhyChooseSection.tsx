import { Shield, Clock, Sparkles } from "lucide-react";

const WhyChooseSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Lifetime Warranty",
      description: "We stand behind every floor we install. Our coatings are backed by a lifetime warranty—no flaking, peeling, or failing, ever. Peace of mind, built in."
    },
    {
      icon: Clock,
      title: "One-Day Installation",
      description: "We'll transform your garage or commercial space in just one day. No long timelines or delays—just efficient, professional service that respects your time."
    },
    {
      icon: Sparkles,
      title: "Clean Look, Low Maintenance",
      description: "Our premium flake system is designed to hide dust and dirt, keeping your floor looking spotless with minimal effort."
    },
    {
      icon: Clock,
      title: "Same-Day Estimates",
      description: "Get your quote within hours, not weeks."
    },
    {
      icon: Shield,
      title: "Direct Contact",
      description: "Call or text your project lead anytime."
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 lg:items-center">
          {/* Image */}
          <div className="mb-8 sm:mb-10 lg:mb-0">
            <div className="relative">
              <img
                src="/lovable-uploads/8d8cf4a3-4ed7-4f9b-8909-0cf80a149ecc.png"
                alt="Beautiful garage floor with concrete coating"
                className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] object-cover rounded-2xl shadow-2xl"
               loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                Why Homeowners Choose{" "}
                <span className="text-blue-600">Legacy</span>
              </h2>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;