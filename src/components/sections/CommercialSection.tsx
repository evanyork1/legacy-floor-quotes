
import { Button } from "@/components/ui/button";
import { Phone, Building, Factory, Car, Home } from "lucide-react";

const CommercialSection = () => {
  const services = [
    {
      title: "Concrete Polishing",
      description: "High-gloss, durable polished concrete for industrial and commercial spaces"
    },
    {
      title: "Industrial Epoxy",
      description: "Heavy-duty epoxy coatings designed for high-traffic commercial environments"
    },
    {
      title: "Commercial Flake Floors",
      description: "Decorative and functional flake systems for professional commercial spaces"
    }
  ];

  const applications = [
    { name: "Airplane Hangars", icon: <Building className="h-6 w-6" /> },
    { name: "Warehouses", icon: <Factory className="h-6 w-6" /> },
    { name: "Manufacturing Plants", icon: <Factory className="h-6 w-6" /> },
    { name: "Car Dealerships", icon: <Car className="h-6 w-6" /> },
    { name: "Dog Kennels", icon: <Home className="h-6 w-6" /> },
    { name: "Commercial Kitchens", icon: <Home className="h-6 w-6" /> },
    { name: "Wedding Venues", icon: <Building className="h-6 w-6" /> },
    { name: "And More", icon: <Building className="h-6 w-6" /> }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent">
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

          {/* Right side - Placeholder Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-white/90 rounded-xl aspect-[4/3] flex items-center justify-center border-2 border-gray-200/50 shadow-xl">
              <div className="text-center">
                <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg font-medium">Commercial Floor Photo</p>
                <p className="text-gray-500 text-sm">Upload your photos here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Where We Install
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
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-15"></div>
              <div className="relative bg-white/90 rounded-xl aspect-[3/2] flex items-center justify-center border border-gray-200/50 shadow-lg">
                <div className="text-center">
                  <Factory className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">Commercial Project {i}</p>
                  <p className="text-gray-500 text-xs">Photo placeholder</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <a href="tel:214-305-6516">
              <Phone className="mr-3 h-6 w-6" />
              Call Now for Commercial Quote
            </a>
          </Button>
          <p className="text-gray-600 mt-4 text-lg">(214) 305-6516</p>
        </div>
      </div>
    </section>
  );
};

export default CommercialSection;
