
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export const EnhancedCleaningSection = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
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
            <div className="aspect-video rounded-lg overflow-hidden shadow-md">
              <img
                src="/lovable-uploads/df272a69-af15-46b5-84cc-c40d68deaa8c.png"
                alt="Before and after professional cleaning transformation"
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
          <p className="text-lg font-semibold text-blue-800 mb-2">Professional Quarterly Cleaning</p>
          <p className="text-gray-700 font-medium">Included FREE with your installation</p>
          <p className="text-sm text-gray-600 mt-2">4 cleanings per year, completely hassle-free</p>
        </div>
      </div>
    </div>
  );
};
