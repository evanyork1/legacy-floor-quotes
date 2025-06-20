
import { MousePointer, Calendar, Wrench } from "lucide-react";

const DFWHowItWorksSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get your DFW epoxy floor project started in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MousePointer className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              1. Get a Custom Quote
            </h3>
            <p className="text-gray-600">
              Quote your own space, or meet with a team member for personalized service and expert recommendations.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              2. Schedule Installation
            </h3>
            <p className="text-gray-600">
              Choose a convenient time for your installation. We work around your schedule across the DFW metroplex.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wrench className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              3. Professional Install
            </h3>
            <p className="text-gray-600">
              Our certified team completes your installation with precision and care, guaranteed for life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DFWHowItWorksSection;
