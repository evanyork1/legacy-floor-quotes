
import { Button } from "@/components/ui/button";
import { Building, Plane, Factory, School, Users, Heart } from "lucide-react";

const DFWCommercialSection = () => {
  const services = [
    {
      icon: Building,
      title: "Warehouses",
      description: "Industrial-grade flooring for high-traffic commercial spaces"
    },
    {
      icon: Plane,
      title: "Airplane Hangars", 
      description: "Specialized coatings for aviation facilities and aircraft storage"
    },
    {
      icon: Factory,
      title: "Manufacturing Plants",
      description: "Chemical-resistant flooring for industrial manufacturing"
    },
    {
      icon: School,
      title: "Schools",
      description: "Durable, safe flooring solutions for educational facilities"
    },
    {
      icon: Users,
      title: "Wedding Venues",
      description: "Beautiful polished concrete for special event spaces"
    },
    {
      icon: Heart,
      title: "Dog Kennels",
      description: "Hygienic, easy-to-clean surfaces for animal care facilities"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Commercial & Industrial Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            From warehouses to wedding venues, we provide comprehensive concrete coating solutions for any commercial space in the DFW area.
          </p>
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            onClick={() => window.open('tel:214-305-6516', '_self')}
          >
            Call for Commercial Quote: (214) 305-6516
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Industrial Epoxy & Polished Concrete Specialists
          </h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Our commercial-grade installations come with professional warranties and are designed to withstand the demands of high-traffic environments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4"
              onClick={() => window.open('tel:214-305-6516', '_self')}
            >
              Schedule Site Visit
            </Button>
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4"
              onClick={() => window.open('tel:214-305-6516', '_self')}
            >
              Get Commercial Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DFWCommercialSection;
