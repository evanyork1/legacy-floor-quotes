
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Upload, Check } from "lucide-react";
import { FloorVisualizer } from "@/components/landing/FloorVisualizer";
import { LandingQuoteForm } from "@/components/landing/LandingQuoteForm";

const LandingVisual = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-800/5"></div>
        <div className="container mx-auto px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              Trusted by thousands for premium garage flooring
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8">
              Professional installation in Dallas-Fort Worth
            </p>
            <div className="relative inline-block">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-20"></div>
              <img 
                src="/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png" 
                alt="Premium garage floor coating" 
                className="relative w-full max-w-3xl h-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floor Visualizer Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See Your Floor Transformed
            </h2>
            <p className="text-xl text-gray-600">
              Upload a photo of your space and visualize it with our premium coatings
            </p>
          </div>
          <FloorVisualizer />
        </div>
      </section>

      {/* Why Legacy Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Yes, We're More Expensive. Here's Why...
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium quality comes at a premium price, but the value is unmatched
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Install within 3 days</h3>
                <p className="text-gray-600">No 3-week wait. We move fast.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">We Do the Heavy Lifting</h3>
                <p className="text-gray-600">Boxes, cabinets, gym gear — we move it all.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Thick, Seamless Finish</h3>
                <p className="text-gray-600">8 mil thick top coat vs competitors' 4 mil.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">1 Year Free Cleanings</h3>
                <p className="text-gray-600">A $1,100 bonus, included.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cleaning Service Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Quarterly Cleaning Service
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We come to your home every quarter, move your belongings, and professionally clean your floor to like-new condition. 
              No hassle for you - we handle everything.
            </p>
          </div>
          
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
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <h4 className="font-semibold mb-2">Before & After Cleaning Photos</h4>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Cleaning transformation photos will be displayed here</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">$1,100 Annual Value</p>
                <p className="text-gray-600">Included FREE with your installation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Your Instant Quote
            </h2>
            <p className="text-xl text-gray-600">
              Complete your quote in 90 seconds
            </p>
          </div>
          <LandingQuoteForm />
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1M+</div>
                <div className="text-gray-600">Square Feet Installed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">3,000+</div>
                <div className="text-gray-600">Floors Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">15</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed italic">
                  "Excellent experience from start to finish. Got a quote quickly and at a very reasonable price. The office was very communicative throughout and the crew did an amazing job with the final result."
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Bharat Arimilli</p>
                  <p className="text-sm text-gray-500">Plano, TX</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed italic">
                  "Totally exceeded my expectations. Crew was experienced and professional. They worked with me on how to address existing cracks in my floor, and they worked around some challenging weather."
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Scott Cleland</p>
                  <p className="text-sm text-gray-500">Dallas, TX</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed italic">
                  "Great company to work with. Competent, genuinely helpful staff. From the original quote to the completion of the job, the representatives were always thorough and professional."
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Chris C</p>
                  <p className="text-sm text-gray-500">Melissa, TX</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed italic">
                  "I have nothing but great things to say about Legacy Industrial coating! From the first consultation to the actual Job. Would definitely recommend to anyone looking to get their garage floor coated."
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Joseph Im</p>
                  <p className="text-sm text-gray-500">McKinney, TX</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingVisual;
