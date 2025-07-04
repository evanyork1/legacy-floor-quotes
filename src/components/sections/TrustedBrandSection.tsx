
import { Star, Users, Sparkles, Zap, Heart, Award } from "lucide-react";
import { useLocation } from "react-router-dom";

const TrustedBrandSection = () => {
  const location = useLocation();
  const isDFW = location.pathname === '/dfw';
  
  const services = isDFW ? [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "3,000+ Floors Installed",
      description: "Cracks, chips, or stains — we've seen it all and know how to make it look great again."
    },
    {
      icon: <Star className="h-8 w-8 text-blue-600" />,
      title: "170+ Five Star Reviews",
      description: "From small garages to large commercial warehouses, we've done it all — and our customers love talking about it."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-blue-600" />,
      title: "Over 5 Million Square Feet Installed",
      description: "The products we use are top quality and built to stand the test of time — No cheap stuff, no shortcuts."
    }
  ] : [
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "Fast Availability",
      description: "Book and install within 7 days guaranteed - no waiting months for your dream floor"
    },
    {
      icon: <Heart className="h-8 w-8 text-blue-600" />,
      title: "We Are Easy to Work With",
      description: "The Amazon of garage flooring - seamless experience from quote to completion"
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "We Guarantee The Work",
      description: "Legacy stands behind every installation with our warranty backing"
    }
  ];

  const sectionTitle = isDFW 
    ? "The Most Trusted Brand in Concrete Coatings"
    : "The Most Trusted Brand in Garage Floors";

  return (
    <section className="bg-gradient-to-br from-white to-slate-50 py-[31px]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            {sectionTitle}
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left side - Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-20"></div>
            <img src="/lovable-uploads/af830f43-30bb-4aaa-a7bd-e2e462b37c66.png" alt="Premium garage floor with luxury car" className="relative w-full h-auto rounded-xl shadow-2xl" />
          </div>
          
          {/* Right side - Service points */}
          <div className="space-y-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 border border-gray-100">
                <div className="flex items-start space-x-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrandSection;
