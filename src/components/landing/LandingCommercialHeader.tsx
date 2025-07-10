import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LandingCommercialHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="text-xl font-bold text-gray-900">
            Legacy Industrial Coatings
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Phone Number Display */}
          <div className="hidden md:flex items-center space-x-2 text-gray-700">
            <Phone className="h-4 w-4" />
            <span className="font-semibold">214-305-6516</span>
          </div>
          
          {/* Call Now Button */}
          <Button 
            asChild 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a href="tel:214-305-6516" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};