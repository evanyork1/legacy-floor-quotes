
import { LandingHeader } from "@/components/landing/LandingHeader";
import { ScrollArrows } from "@/components/landing/ScrollArrows";
import { EnhancedFloorVisualizer } from "@/components/landing/EnhancedFloorVisualizer";
import { EnhancedValueProps } from "@/components/landing/EnhancedValueProps";
import { EnhancedCleaningSection } from "@/components/landing/EnhancedCleaningSection";
import { LandingQuoteForm } from "@/components/landing/LandingQuoteForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const LandingVisual = () => {
  const sections = ['hero', 'visualizer', 'value-props', 'cleaning', 'quote-section', 'reviews'];
  
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <ScrollArrows sections={sections} />

      {/* Hero Section with Before/After Photos */}
      <section id="hero" className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-800/5"></div>
        <div className="container mx-auto px-6 lg:px-8 relative">
          <div className="text-center max-w-6xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              Trusted by thousands for premium garage flooring
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12">
              Professional installation in Dallas-Fort Worth
            </p>
            
            {/* Hero Before/After Images Side by Side */}
            <div className="max-w-5xl mx-auto mb-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-20"></div>
                <div className="relative grid md:grid-cols-2 gap-4 rounded-xl overflow-hidden shadow-2xl">
                  <div className="aspect-video">
                    <img src="/lovable-uploads/89206199-5b6d-4fd5-9d4c-a086f9a934f8.png" alt="Garage floor before transformation - plain concrete with luxury cars" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-video">
                    <img src="/lovable-uploads/eac4aaf6-c97d-43ed-88b0-8939f4711f55.png" alt="Garage floor after transformation - beautiful epoxy coating with luxury cars" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floor Visualizer Section */}
      <section id="visualizer" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See Your Floor with Our Coating
            </h2>
            <p className="text-xl text-gray-600">
              Follow these simple steps to visualize your transformation and get your quote
            </p>
          </div>
          <EnhancedFloorVisualizer />
        </div>
      </section>

      {/* Why Legacy Section */}
      <section id="value-props" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Yes, We're More Expensive. Here's Why...
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We remove everything that is a hassle so you don't have to.</p>
          </div>
          <EnhancedValueProps />
        </div>
      </section>

      {/* Cleaning Service Section */}
      <section id="cleaning" className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Free Year of Professional Cleanings
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We come to your home every quarter, move your belongings, and professionally clean your floor to like-new condition. 
              No hassle for you - we handle everything.
            </p>
          </div>
          <EnhancedCleaningSection />
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-section" className="py-16 bg-gray-50">
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
      <section id="reviews" className="py-16 bg-white">
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
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
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
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
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
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
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
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
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
