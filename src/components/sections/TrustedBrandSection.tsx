
import { Shield, Clock, Users, Award } from "lucide-react";

interface TrustedBrandSectionProps {
  isDFW?: boolean;
}

const TrustedBrandSection = ({ isDFW = false }: TrustedBrandSectionProps) => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            The Most Trusted Brand in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {isDFW ? "Concrete Coatings" : "Garage Floors"}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {isDFW 
              ? "Meet us in person or remotely - your choice. We guarantee the fastest availability in the DFW area."
              : "Professional installation, premium materials, and unmatched customer service across Houston"
            }
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="group relative">
              <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100">
                <div className="absolute -top-6 left-8">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-6 w-6" />
                  </div>
                </div>
                
                <div className="pt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    Lifetime Warranty
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Industry-leading warranty coverage for complete peace of mind
                  </p>
                </div>
                
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="group relative">
              <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100">
                <div className="absolute -top-6 left-8">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
                
                <div className="pt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                    {isDFW ? "Fast Availability" : "Same-Day Quotes"}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {isDFW 
                      ? "We guarantee the fastest availability in DFW"
                      : "Get your personalized estimate within hours, not days"
                    }
                  </p>
                </div>
                
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="group relative">
              <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100">
                <div className="absolute -top-6 left-8">
                  <div className="bg-gradient-to-r from-pink-500 to-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                
                <div className="pt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                    Expert Team
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Certified professionals with years of experience
                  </p>
                </div>
                
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-orange-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="group relative">
              <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100">
                <div className="absolute -top-6 left-8">
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-6 w-6" />
                  </div>
                </div>
                
                <div className="pt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                    Premium Quality
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Only the highest grade materials and finishes
                  </p>
                </div>
                
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrandSection;
