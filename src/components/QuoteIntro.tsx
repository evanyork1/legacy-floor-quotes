
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Camera, Square, Upload, Palette } from "lucide-react";

interface QuoteIntroProps {
  onStartQuote: () => void;
}

const QuoteIntro = ({ onStartQuote }: QuoteIntroProps) => {
  const steps = [
    {
      icon: Square,
      title: "Pick Your Floor Size",
      description: "Choose from standard garage sizes or enter custom dimensions",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: Camera,
      title: "Share Your Space",
      description: "Upload photos to help us understand your project (optional for now)",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      icon: Palette,
      title: "Choose Your Look",
      description: "Select from beautiful floor colors and finishes",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl mx-auto w-full">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
            <Square className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Get Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dream Floor</span> Quote
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your space with our premium flooring solutions. Get an instant quote in just 3 simple steps!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center text-green-600 font-semibold">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              90 seconds to complete
            </div>
            <div className="flex items-center text-blue-600 font-semibold">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              Instant pricing
            </div>
          </div>
        </div>

        {/* Steps Preview */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className={`inline-flex p-4 rounded-full ${step.bgColor} mb-4`}>
                  <step.icon className={`h-8 w-8 ${step.iconColor}`} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
                <div className="mt-4 flex justify-center">
                  <div className={`w-full h-1 bg-gradient-to-r ${step.color} rounded-full`}></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Example Images Preview */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
            See the <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">transformation</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img 
                src="/lovable-uploads/3cf154bb-3983-4192-8d3c-6d8bf7cc2587.png" 
                alt="Beautiful garage floor transformation"
                className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-semibold">Domino Finish</h3>
                <p className="text-sm">Premium garage floor coating</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img 
                src="/lovable-uploads/31083ac1-bd37-402e-93a7-56f5bedbf606.png" 
                alt="Beautiful garage floor transformation"
                className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-semibold">Tidal Wave Finish</h3>
                <p className="text-sm">Stunning blue-toned coating</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 shadow-2xl">
            <CardContent className="p-8 sm:p-12">
              <div className="mb-6">
                <div className="inline-block p-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 mb-4">
                  <ArrowRight className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Ready to transform your space?
                </h2>
                <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
                  Get your personalized quote now and see how affordable your dream floor can be!
                </p>
              </div>
              
              <Button 
                onClick={onStartQuote}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 sm:px-12 text-lg sm:text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Start Your Quote
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-500">
                <span>✓ No commitment required</span>
                <span>✓ Instant results</span>
                <span>✓ Professional consultation</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuoteIntro;
