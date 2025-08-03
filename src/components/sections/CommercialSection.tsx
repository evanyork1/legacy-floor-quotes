import { Button } from "@/components/ui/button";
import { Phone, Building, Factory, Car, Home, Plane, Dog, Church } from "lucide-react";

const CommercialSection = () => {
  const services = [{
    title: "Concrete Polishing",
    description: "High-gloss, durable polished concrete for industrial and commercial spaces"
  }, {
    title: "Industrial Epoxy", 
    description: "Heavy-duty epoxy coatings designed for high-traffic commercial environments"
  }, {
    title: "Commercial Flake Floors",
    description: "Decorative and functional flake systems for professional commercial spaces"
  }];

  const applications = [{
    name: "Airplane Hangars",
    icon: <Plane className="h-6 w-6" />
  }, {
    name: "Warehouses",
    icon: <Factory className="h-6 w-6" />
  }, {
    name: "Manufacturing Plants", 
    icon: <Factory className="h-6 w-6" />
  }, {
    name: "Car Dealerships",
    icon: <Car className="h-6 w-6" />
  }, {
    name: "Dog Kennels",
    icon: <Dog className="h-6 w-6" />
  }, {
    name: "Commercial Kitchens",
    icon: <Home className="h-6 w-6" />
  }, {
    name: "Wedding Venues",
    icon: <Church className="h-6 w-6" />
  }, {
    name: "And More",
    icon: <Building className="h-6 w-6" />
  }];

  return (
    <section id="commercial" className="py-24 bg-gradient-to-br from-slate-100 via-white to-blue-50/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/3 to-blue-800/3"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-blue-800 bg-clip-text text-transparent">
            Commercial Floor Solutions
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Professional-grade flooring solutions for businesses that demand the best
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left side - Services */}
          <div className="space-y-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 hover:bg-white/90 transition-all duration-500 group shadow-lg hover:shadow-xl">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right side - Helicopter Photo */}
          <div className="relative">
            <div className="rounded-xl aspect-[4/3] overflow-hidden">
              <img src="/lovable-uploads/a75e1253-9da2-40ae-82e0-a78d8e1a4967.png" alt="Helicopter in hangar with polished concrete floor" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Applications Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Commercial Spaces We Install
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {applications.map((app, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200/50 hover:bg-white/90 transition-all duration-300 group shadow-lg hover:shadow-xl">
                <div className="text-blue-600 mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {app.icon}
                </div>
                <p className="text-gray-800 text-sm font-medium">{app.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Images Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl blur opacity-15"></div>
            <div className="relative bg-white/90 rounded-xl aspect-[3/2] overflow-hidden border border-gray-200/50 shadow-lg">
              <img src="/lovable-uploads/171b7f71-4aa3-4b54-8c96-5f7143dddebf.png" alt="Commercial restaurant with polished concrete floors" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl blur opacity-15"></div>
            <div className="relative bg-white/90 rounded-xl aspect-[3/2] overflow-hidden border border-gray-200/50 shadow-lg">
              <img src="/lovable-uploads/4a97932b-03f2-42ab-9e2f-2a90852befc0.png" alt="Commercial restroom with epoxy flooring" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl blur opacity-15"></div>
            <div className="relative bg-white/90 rounded-xl aspect-[3/2] overflow-hidden border border-gray-200/50 shadow-lg">
              <img src="/lovable-uploads/b5e6bdc4-80f9-44ea-a580-29d22662f7d4.png" alt="Industrial floor coating detail" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Call to Action - Optimized for mobile */}
        <div className="text-center">
          <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white text-base sm:text-xl px-6 sm:px-12 py-3 sm:py-6 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <a href="tel:214-305-6516">
              <Phone className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
              Call Now for Commercial Quote
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommercialSection;
