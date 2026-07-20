import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const CommercialLinkSection = () => {
  const navigate = useNavigate();
  return <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <img src="/lovable-uploads/fa247baa-ccf6-438b-b7b1-47d07ae07d74.png" alt="Commercial floor solution" className="w-3/4 h-56 object-cover rounded-lg shadow-lg mb-6 mx-auto"  loading="eager" decoding="async" />
              </div>
              <div className="text-blue-600 mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                <Building className="h-16 w-16" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-blue-900">
                Commercial Floor Solutions
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
                Transform your commercial space with our professional flooring systems. From warehouses to retail stores, 
                we have the perfect solution for your business needs.
              </p>
              <Button onClick={() => navigate('/commercial')} className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <span className="hidden sm:inline text-lg">Learn More</span>
                <span className="sm:hidden text-base">Learn More</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default CommercialLinkSection;