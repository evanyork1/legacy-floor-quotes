import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, CheckCircle, Users, Shield, Clock, Award, Headphones, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const Index = () => {
  const navigate = useNavigate();
  const features = [{
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: "Certified Installers",
    description: "Only certified, insured professionals in our network"
  }, {
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    title: "Lifetime Warranty",
    description: "Industry-leading protection with comprehensive coverage"
  }, {
    icon: <Headphones className="h-8 w-8 text-blue-600" />,
    title: "World Class Service",
    description: "No need to take time out of your day to meet in person, we handle everything remotely."
  }];
  const services = [{
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "We Handle All Payments",
    description: "Pay Legacy directly - secure processing, milestone payments, and warranty protection"
  }, {
    icon: <Clock className="h-8 w-8 text-blue-600" />,
    title: "We Coordinate Scheduling",
    description: "Legacy manages all scheduling and communication with your installer"
  }, {
    icon: <Award className="h-8 w-8 text-blue-600" />,
    title: "We Guarantee The Work",
    description: "Legacy stands behind every installation with our warranty backing"
  }];
  const steps = [{
    step: "1",
    title: "Get Your Quote",
    description: "Use our instant quote tool to get pricing in seconds"
  }, {
    step: "2",
    title: "Pay Legacy & Schedule",
    description: "We handle payment processing and coordinate with your installer"
  }, {
    step: "3",
    title: "Enjoy Your Warranty Floor",
    description: "Professional installation with Legacy's warranty protection"
  }];
  const testimonials = [{
    name: "Sarah Johnson",
    location: "Denver, CO",
    rating: 5,
    text: "Working with Legacy was seamless. I paid them directly, they coordinated everything, and my garage floor looks incredible. The warranty gives me total peace of mind."
  }, {
    name: "Mike Chen",
    location: "Austin, TX",
    rating: 5,
    text: "Best part was dealing with one company - Legacy handled the payment, scheduling, and warranty. The polyurea coating has held up perfectly through Texas weather."
  }, {
    name: "Lisa Rodriguez",
    location: "Phoenix, AZ",
    rating: 5,
    text: "From quote to completion, Legacy managed everything. No dealing with multiple contractors. Our outdoor patio coating looks amazing and was done professionally."
  }];
  return <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white py-24 lg:py-40 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-xl space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Get Your Dream Garage Floor in{" "}
                <span className="text-blue-600">One Day</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">Elite Installers. Unmatched Quality. A Reputation Built on Results</p>
              <div className="relative">
                <Button onClick={() => navigate('/quote')} className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Get Instant Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                {/* Arrow and handwritten text */}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 hidden lg:flex items-center">
                  <svg className="w-12 h-8 text-black" viewBox="0 0 48 32" fill="none">
                    <path d="M2 16 L40 16 M34 10 L40 16 L34 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="ml-2 transform rotate-2">
                    <p className="text-lg text-gray-800 font-handwritten whitespace-nowrap" style={{fontFamily: 'Comic Sans MS, cursive', transform: 'rotate(-2deg)'}}>
                      Build your own quote in 90 seconds or less!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="/lovable-uploads/dee22f69-e885-489a-a567-40d7d224064f.png" alt="Premium garage floor coating with luxury vehicles" className="w-full h-auto rounded-lg shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Legacy Industrial Coatings?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The only company you need to deal with for premium warranty floors
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <CardContent className="p-8">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>)}
          </div>

          {/* Large showcase image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img src="/lovable-uploads/6bb7ca29-9153-489d-a82d-ac6756606223.png" alt="Modern garage with professional floor coating" className="w-full h-64 lg:h-96 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">Transform Your Space</h3>
                <p className="text-lg opacity-90 drop-shadow-lg">See the difference professional coating makes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Service Section - Background Style */}
      <section className="py-20 relative">
        <div className="absolute inset-0">
          <img src="/lovable-uploads/d89757aa-68ca-4a3f-b457-ae8701a25ca1.png" alt="Premium garage floor with luxury car" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-blue-900/60"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6 drop-shadow-lg">
              One Company, Complete Service
            </h3>
            <p className="text-xl mb-12 opacity-90 drop-shadow-lg">
              Unlike other platforms that just connect you to contractors, Legacy handles everything
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => <div key={index} className="bg-white/15 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    {service.icon}
                  </div>
                  <h4 className="text-lg font-semibold mb-3 drop-shadow-lg">{service.title}</h4>
                  <p className="opacity-90 leading-relaxed drop-shadow-lg">{service.description}</p>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white" id="how-it-works">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform your space with Legacy
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-16">
              {/* Step 1 */}
              <div className="flex items-center gap-12">
                <div className="flex-1">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                      1
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900">Get Your Quote</h3>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">Use our instant quote tool to get pricing in seconds</p>
                </div>
              </div>

              {/* Step 2 with image */}
              <div className="flex items-center gap-12 flex-row-reverse">
                <div className="flex-1">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                      2
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900">Pay Legacy & Schedule</h3>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">We handle payment processing and coordinate with your installer</p>
                </div>
                <div className="flex-1">
                  <img src="/lovable-uploads/9acbbf4d-30b4-4070-9bb9-5e1e7f9f7d8e.png" alt="Outdoor patio coating installation" className="w-full h-auto rounded-lg shadow-xl" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-12">
                <div className="flex-1">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                      3
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900">Enjoy Your Warranty Floor</h3>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">Professional installation with Legacy's warranty protection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from homeowners who chose Legacy's full-service approach
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>)}
          </div>

          {/* Professional installation image */}
          <div className="text-center">
            <img src="/lovable-uploads/49c586ed-2f38-4bb6-97fc-f42d1593a5c4.png" alt="Professional floor preparation and installation" className="w-full max-w-2xl mx-auto h-auto rounded-lg shadow-xl" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Get Your Dream Garage Floor?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get your free instant quote and experience Legacy's full-service approach
          </p>
          <Button onClick={() => navigate('/quote')} className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Start Your Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;
