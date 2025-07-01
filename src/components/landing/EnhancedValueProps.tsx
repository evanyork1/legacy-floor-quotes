
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Box, Layers, Sparkles, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export const EnhancedValueProps = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowArrow(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const valueProps = [
    {
      icon: Clock,
      title: "Install within 3 days",
      description: "No 3-week wait. We move fast.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Box,
      title: "We Do the Heavy Lifting",
      description: "Boxes, cabinets, gym gear — we move it all.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: Layers,
      title: "Thick, Seamless Finish",
      description: "8 mil thick top coat vs competitors' 4 mil.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: Sparkles,
      title: "1 Year Free Cleanings",
      description: "A $1,100 bonus, included.",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      isHighlighted: true
    }
  ];

  return (
    <div className="relative">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {valueProps.map((prop, index) => (
          <div key={index} className="relative">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className={`${prop.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <prop.icon className={`h-8 w-8 ${prop.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-4">{prop.title}</h3>
                <p className="text-gray-600">{prop.description}</p>
              </CardContent>
            </Card>
            
            {/* Animated arrow pointing to cleaning section */}
            {prop.isHighlighted && showArrow && (
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 z-10">
                <div className="flex flex-col items-center animate-bounce">
                  <ArrowDown className="h-8 w-8 text-orange-500" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
