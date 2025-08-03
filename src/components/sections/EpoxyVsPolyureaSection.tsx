import { X, Check } from "lucide-react";

const EpoxyVsPolyureaSection = () => {
  const epoxyFeatures = [
    "Minimal prep — weak bond",
    "Chips, peels, and fades within 6–12 months",
    "Yellows in sunlight",
    "Brittle in extreme temps",
    "Long cure time (2–5 days)"
  ];

  const polyureFeatures = [
    "Full mechanical prep for lifetime adhesion",
    "Won't chip, peel, or discolor",
    "100% UV stable — stays vibrant for years",
    "Flexible in heat or cold",
    "Installed and ready in 1 day"
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Epoxy vs. Polyurea: What You Should Know
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Not all garage coatings are the same. Here's why homeowners across DFW are ditching epoxy.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Epoxy Column */}
          <div className="space-y-6">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/614ed682-963b-4559-b96b-07c42be58d0f.png" 
                alt="Failed epoxy floor showing chips and peeling" 
                className="w-1/2 h-52 object-cover rounded-xl"
              />
            </div>
            <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
              <h3 className="text-2xl font-bold text-red-800 mb-6 text-center">
                Cheap Epoxy Coatings
              </h3>
              <div className="space-y-4">
                {epoxyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <X className="w-5 h-5 text-red-500" />
                    </div>
                    <p className="text-red-700 font-medium">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Polyurea Column */}
          <div className="space-y-6">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/57f768f2-8d88-45f9-9d4e-a4c13cf1ed0b.png" 
                alt="Beautiful polyurea floor with decorative flakes" 
                className="w-1/2 h-52 object-cover rounded-xl"
              />
            </div>
            <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                  RECOMMENDED
                </span>
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">
                Our Polyurea Flake Floors
              </h3>
              <div className="space-y-4">
                {polyureFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-green-700 font-medium">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl max-w-2xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 rounded-full p-2">
              <span className="text-white text-sm font-bold">💡</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-blue-800 mb-1">Fun Fact</h4>
              <p className="text-blue-700">
                Over 50% of our projects start by removing a failed epoxy floor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EpoxyVsPolyureaSection;