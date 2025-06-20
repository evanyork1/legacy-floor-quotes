
import { Shield, Clock, Users, Award } from "lucide-react";

const DFWTrustedBrandSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Most Trusted Brand in <span className="text-blue-600">Concrete Coatings</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet us in person or remotely - your choice. We guarantee the fastest availability in the DFW area.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Lifetime Warranty</h3>
            <p className="text-gray-600">
              Guaranteed protection for the life of your floor
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Availability</h3>
            <p className="text-gray-600">
              We guarantee the fastest availability in DFW
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Team</h3>
            <p className="text-gray-600">
              Certified professionals with years of experience
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality</h3>
            <p className="text-gray-600">
              Only the highest grade materials and finishes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DFWTrustedBrandSection;
