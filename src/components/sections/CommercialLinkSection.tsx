import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CommercialLinkSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-12 text-center">
              <div className="text-blue-600 mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                <Building className="h-16 w-16" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                Commercial Floor Solutions
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
                Transform your commercial space with our professional flooring systems. From warehouses to retail stores, 
                we have the perfect solution for your business needs.
              </p>
              <Button 
                onClick={() => navigate('/commercial')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                Learn More About Commercial Floor Options
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CommercialLinkSection;