
import { LandingHeader } from "@/components/landing/LandingHeader";
import { ScrollArrows } from "@/components/landing/ScrollArrows";
import { LandingColorShowcase } from "@/components/landing/LandingColorShowcase";
import { EnhancedValueProps } from "@/components/landing/EnhancedValueProps";
import { EnhancedCleaningSection } from "@/components/landing/EnhancedCleaningSection";
import { LandingQuoteForm } from "@/components/landing/LandingQuoteForm";
import { LandingGallery } from "@/components/landing/LandingGallery";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Phone, ArrowRight } from "lucide-react";

const LandingVisual = () => {
  const sections = ['hero', 'color-showcase', 'value-props', 'cleaning', 'reviews', 'gallery', 'quote-section'];
  
  const scrollToQuote = () => {
    const element = document.getElementById('quote-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return <div className="min-h-screen bg-white">
      <LandingHeader />
      <ScrollArrows sections={sections} />

      {/* Hero Section with Before/After Photos */}
      <section id="hero" className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-800/5"></div>
        <div className="container mx-auto px-6 lg:px-8 relative">
          <div className="text-center max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Get Your Dream Garage Floor
              <br />
              This Week
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-12">
              Serving all of Dallas-Fort Worth
            </p>
            
            {/* Hero Before/After Images Side by Side - Made Taller */}
            <div className="max-w-5xl mx-auto mb-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-20"></div>
                <div className="relative grid md:grid-cols-2 gap-4 rounded-xl overflow-hidden shadow-2xl">
                  <div className="aspect-[4/3] relative">
                    <img alt="Garage floor before transformation - plain concrete with luxury cars" className="w-full h-full object-cover" src="/lovable-uploads/f08fd9e5-8f07-4243-9e04-7c3d607a0547.png" />
                    {/* Before Banner */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gray-800/90 text-white px-4 py-2 rounded-full font-semibold text-sm sm:text-base">
                        BEFORE
                      </div>
                    </div>
                  </div>
                  <div className="aspect-[4/3] relative">
                    <img alt="Garage floor after transformation - beautiful epoxy coating with luxury cars" className="w-full h-full object-cover" src="/lovable-uploads/d9a4c532-7ba2-490e-8fc3-35dc938289e0.png" />
                    {/* After Banner */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-blue-600/90 text-white px-4 py-2 rounded-full font-semibold text-sm sm:text-base">
                        AFTER
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Showcase Section */}
      <section id="color-showcase" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              See Our Colors on Real Floors
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Click any color to see how it looks in an actual garage
            </p>
          </div>
          <LandingColorShowcase />
        </div>
      </section>

      {/* Why Legacy Section */}
      <section id="value-props" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              We Offer the Highest Quality and Most Benefits
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">We remove everything that is a hassle so you don't have to.</p>
          </div>
          <EnhancedValueProps />
        </div>
      </section>

      {/* Cleaning Service Section */}
      <section id="cleaning" className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Free Year of Professional Cleanings
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              We come to your home every quarter, move your belongings, and professionally clean your floor to like-new condition. 
              No hassle for you - we handle everything.
            </p>
          </div>
          <EnhancedCleaningSection />
          
          {/* CTA Button after Cleaning Section */}
          <div className="text-center mt-12">
            <Button 
              onClick={scrollToQuote}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Get Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="reviews" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            {/* Five Star Reviews Highlight */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-50 to-orange-50 rounded-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-yellow-200">
                <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-yellow-400 fill-current" />)}
                  </div>
                  <span className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900">170+ Five Star Reviews</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 mb-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">1M+</div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600">Square Feet Installed</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">3,000+</div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600">Floors Completed</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">15</div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600">Years Experience</div>
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
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

      {/* Gallery Section */}
      <section id="gallery" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              See Our Latest Work
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Real transformations from real customers
            </p>
          </div>
          <LandingGallery />
          
          {/* CTA Button after Gallery */}
          <div className="text-center mt-12">
            <Button 
              onClick={scrollToQuote}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Get Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-section" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Get Your Instant Quote
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Complete your quote in 90 seconds
            </p>
          </div>
          <LandingQuoteForm />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a 
                href="tel:214-305-6516" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
              >
                <Phone className="mr-2 h-5 w-5" />
                214-305-6516
              </a>
              <Button 
                onClick={scrollToQuote}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Get Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>;
};

export default LandingVisual;
