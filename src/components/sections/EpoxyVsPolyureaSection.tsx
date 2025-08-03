import { X, Check, TrendingDown, TrendingUp, Lightbulb } from "lucide-react";

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
    <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-6 py-2 mb-6">
            <span className="text-blue-400 text-sm font-semibold">COMPARISON GUIDE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
            Epoxy vs. Polyurea
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl">What You Should Know</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Not all garage coatings are the same. Here's why homeowners across DFW are ditching epoxy.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Epoxy Column */}
          <div className="group animate-fade-in">
            <div className="relative">
              {/* Background glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              
              <div className="relative space-y-8">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-25"></div>
                    <img 
                      src="/lovable-uploads/614ed682-963b-4559-b96b-07c42be58d0f.png" 
                      alt="Failed epoxy floor showing chips and peeling" 
                      className="relative w-4/5 h-64 object-cover rounded-2xl shadow-2xl border border-red-500/20"
                    />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-red-50 to-orange-50 backdrop-blur-sm rounded-3xl p-8 border border-red-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center space-x-3 bg-red-100 rounded-full px-6 py-3">
                      <TrendingDown className="w-6 h-6 text-red-600" />
                      <h3 className="text-2xl font-bold text-red-800">
                        Cheap Epoxy Coatings
                      </h3>
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    {epoxyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-4 group/item hover:bg-red-100/50 rounded-lg p-3 transition-colors duration-200">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center group-hover/item:bg-red-200 transition-colors duration-200">
                            <X className="w-4 h-4 text-red-600" />
                          </div>
                        </div>
                        <p className="text-red-800 font-medium text-lg leading-relaxed">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Polyurea Column */}
          <div className="group animate-fade-in">
            <div className="relative">
              {/* Background glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              
              <div className="relative space-y-8">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl blur opacity-25"></div>
                    <img 
                      src="/lovable-uploads/57f768f2-8d88-45f9-9d4e-a4c13cf1ed0b.png" 
                      alt="Beautiful polyurea floor with decorative flakes" 
                      className="relative w-4/5 h-64 object-cover rounded-2xl shadow-2xl border border-green-500/20"
                    />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-blue-50 backdrop-blur-sm rounded-3xl p-8 border border-green-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative">
                  {/* Recommended badge */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg animate-pulse">
                      ⭐ RECOMMENDED
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center mb-6 mt-4">
                    <div className="flex items-center space-x-3 bg-green-100 rounded-full px-6 py-3">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                      <h3 className="text-2xl font-bold text-green-800">
                        Our Polyurea Flake Floors
                      </h3>
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    {polyureFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-4 group/item hover:bg-green-100/50 rounded-lg p-3 transition-colors duration-200">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover/item:bg-green-200 transition-colors duration-200">
                            <Check className="w-4 h-4 text-green-600" />
                          </div>
                        </div>
                        <p className="text-green-800 font-medium text-lg leading-relaxed">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur"></div>
            <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 backdrop-blur-sm border border-blue-200/50 rounded-2xl p-8 shadow-xl">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
                    Industry Insight
                  </h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Over <span className="font-bold text-blue-600">50% of our projects</span> start by removing a failed epoxy floor. 
                    Don't make the same mistake — choose polyurea for lasting results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EpoxyVsPolyureaSection;