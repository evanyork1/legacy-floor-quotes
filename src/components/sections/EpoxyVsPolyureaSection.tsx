import { X, Check } from "lucide-react";
const EpoxyVsPolyureaSection = () => {
  const epoxyFeatures = ["Minimal prep — weak bond", "Chips, peels, and fades within 6–12 months", "Yellows in sunlight", "Brittle in extreme temps", "Long cure time (2–5 days)"];
  const polyureFeatures = ["Full mechanical prep for lifetime adhesion", "Won't chip, peel, or discolor", "100% UV stable — stays vibrant for years", "Flexible in heat or cold", "Installed and ready in 1 day"];
  return <section className="py-16 sm:py-20 lg:py-24 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Epoxy vs. <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Polyurea</span>: What You Should Know
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Not all garage coatings are the same. Here's why homeowners across DFW are ditching epoxy for our premium polyurea solutions.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Epoxy Column */}
          <div className="space-y-6">
            <div>
              <img src="/lovable-uploads/614ed682-963b-4559-b96b-07c42be58d0f.png" alt="Failed epoxy floor showing chips and peeling" className="w-4/5 h-64 object-cover rounded-2xl shadow-xl mx-auto" />
            </div>
            <div className="bg-white rounded-2xl p-8 border border-red-200 shadow-xl hover:shadow-2xl transition-all duration-500">
              <h3 className="text-2xl font-bold text-red-600 mb-6 text-center">
                Cheap Epoxy Coatings
              </h3>
              <div className="space-y-4">
                {epoxyFeatures.map((feature, index) => <div key={index} className="flex items-start space-x-4 p-3 rounded-lg bg-red-50/50">
                    <div className="flex-shrink-0 mt-1 bg-red-100 p-1 rounded-full">
                      <X className="w-4 h-4 text-red-500" />
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">{feature}</p>
                  </div>)}
              </div>
            </div>
          </div>

          {/* Polyurea Column */}
          <div className="space-y-6">
            <div className="relative">
              <img src="/lovable-uploads/57f768f2-8d88-45f9-9d4e-a4c13cf1ed0b.png" alt="Beautiful polyurea floor with decorative flakes" className="w-4/5 h-64 object-cover rounded-2xl shadow-xl mx-auto" />
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">OUR PRODUCT</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-green-200 shadow-xl hover:shadow-2xl transition-all duration-500 relative">
              <h3 className="text-2xl font-bold text-green-600 mb-6 text-center">
                Our Polyurea Flake Floors
              </h3>
              <div className="space-y-4">
                {polyureFeatures.map((feature, index) => <div key={index} className="flex items-start space-x-4 p-3 rounded-lg bg-green-50/50">
                    <div className="flex-shrink-0 mt-1 bg-green-100 p-1 rounded-full">
                      <Check className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">{feature}</p>
                  </div>)}
              </div>
            </div>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="bg-white rounded-2xl border border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-500 max-w-2xl mx-auto">
          <div className="p-8">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-full p-3 flex-shrink-0">
                <span className="text-white text-lg">💡</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Fun Fact</h4>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Over 50% of our projects start by removing a failed epoxy floor. Don't make the same mistake — choose polyurea from the start.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default EpoxyVsPolyureaSection;