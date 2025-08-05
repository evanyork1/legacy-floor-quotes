import { Shield, Clock, Sparkles } from "lucide-react";

const WhyChooseSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Lifetime Warranty",
      description: "We'll be at your door within hours."
    },
    {
      icon: Clock,
      title: "One-Day Installation",
      description: "Pick your day and time no phone calls needed."
    },
    {
      icon: Sparkles,
      title: "Clean Look, Low Maintenance",
      description: "Clear, upfront pricing with no surprises."
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Image */}
          <div className="mb-12 lg:mb-0">
            <div className="relative">
              <img
                src="/lovable-uploads/8d8cf4a3-4ed7-4f9b-8909-0cf80a149ecc.png"
                alt="Beautiful garage floor with concrete coating"
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Why Homeowners Across DFW Choose{" "}
                <span className="text-blue-600">Legacy</span>
              </h2>
            </div>

            <div className="space-y-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
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