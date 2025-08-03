import { Building, Factory, Car, Home, Plane, Dog, Church, Store, School, Utensils } from "lucide-react";

const CommercialSpacesSection = () => {
  const applications = [
    {
      name: "Airplane Hangars",
      icon: <Plane className="h-6 w-6" />
    },
    {
      name: "Warehouses",
      icon: <Factory className="h-6 w-6" />
    },
    {
      name: "Manufacturing Plants", 
      icon: <Factory className="h-6 w-6" />
    },
    {
      name: "Car Dealerships",
      icon: <Car className="h-6 w-6" />
    },
    {
      name: "Dog Kennels",
      icon: <Dog className="h-6 w-6" />
    },
    {
      name: "Commercial Kitchens",
      icon: <Utensils className="h-6 w-6" />
    },
    {
      name: "Wedding Venues",
      icon: <Church className="h-6 w-6" />
    },
    {
      name: "Retail Stores",
      icon: <Store className="h-6 w-6" />
    },
    {
      name: "Schools & Universities",
      icon: <School className="h-6 w-6" />
    },
    {
      name: "Distribution Centers",
      icon: <Building className="h-6 w-6" />
    },
    {
      name: "Food Processing",
      icon: <Utensils className="h-6 w-6" />
    },
    {
      name: "And More",
      icon: <Building className="h-6 w-6" />
    }
  ];

  return (
    <section id="commercial-spaces" className="py-20 bg-gradient-to-br from-slate-100 via-white to-blue-50/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/3 to-blue-800/3"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-blue-800 bg-clip-text text-transparent">
            Commercial Spaces We Install
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Professional flooring solutions for businesses across Dallas-Fort Worth
          </p>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {applications.map((app, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200/50 hover:bg-white/90 transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-1">
              <div className="text-blue-600 mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {app.icon}
              </div>
              <p className="text-gray-800 text-sm font-medium">{app.name}</p>
            </div>
          ))}
        </div>

        {/* Commercial Images Grid */}
        <div className="grid md:grid-cols-3 gap-8">
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
      </div>
    </section>
  );
};

export default CommercialSpacesSection;