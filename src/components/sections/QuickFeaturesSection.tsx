import { Clock, Calendar, DollarSign } from "lucide-react";

export const QuickFeaturesSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Same Day Estimate",
      description: "We'll be at your door within hours."
    },
    {
      icon: Calendar,
      title: "Online Booking",
      description: "Pick your day and time no phone calls needed."
    },
    {
      icon: DollarSign,
      title: "Honest Pricing",
      description: "Clear, upfront pricing with no surprises."
    }
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};