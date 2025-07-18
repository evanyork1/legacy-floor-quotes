
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export const EnhancedCleaningSection = () => {
  return <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Check className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">We Move Everything</h3>
            <p className="text-gray-600">Cars, storage items, gym equipment - we carefully relocate everything before cleaning.</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Check className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Deep Professional Clean</h3>
            <p className="text-gray-600">Specialized equipment and techniques restore your floor to showroom condition.</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Check className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Everything Back in Place</h3>
            <p className="text-gray-600">We return all your items exactly where they were - you won't lift a finger.</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <Card className="bg-white shadow-xl">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4 text-center text-lg">Before & After Professional Cleaning</h4>
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-md border-2 border-gray-200">
              <img 
                alt="Before and after professional cleaning transformation showing dramatic improvement from dirty to sparkling clean garage floor" 
                src="/lovable-uploads/8472be90-1217-403b-9613-2a25f353ea44.jpg" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
          <p className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">$1,100 Annual Value</p>
          <p className="text-gray-700 font-semibold">Included FREE with your installation</p>
          <p className="text-sm text-gray-600 mt-2">4 professional cleanings per year</p>
        </div>
      </div>
    </div>;
};
