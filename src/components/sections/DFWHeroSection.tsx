
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DFWHeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                DFW Epoxy Floor
                <span className="block text-blue-300">Experts</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Dallas - Fort Worth, TX
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Use our intelligent quote builder to get accurate pricing instantly, or one of our experts will evaluate on site. Transform your garage with premium epoxy flooring that lasts a lifetime.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                onClick={() => navigate('/quotedfw')}
              >
                Get Free Quote
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg"
                onClick={() => window.open('tel:214-305-6516', '_self')}
              >
                Call (214) 305-6516
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Lifetime Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Same-Day Quotes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Expert Installation</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="/lovable-uploads/77dbbade-9254-4af6-872f-f75c0f6f9607.png"
                alt="Beautiful epoxy garage floor installation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-xl shadow-xl">
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-sm">DFW Installs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DFWHeroSection;
