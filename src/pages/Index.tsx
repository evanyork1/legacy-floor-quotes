import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, CheckCircle, Users, Shield, Clock, Award, Headphones, CreditCard, Zap, Heart } from "lucide-react";
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
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: "Fast Availability",
    description: "Book and install within 7 days guaranteed - no waiting months for your dream floor"
  }, {
    icon: <Heart className="h-8 w-8 text-blue-600" />,
    title: "We Are Easy to Work With",
    description: "The Amazon of garage flooring - seamless experience from quote to completion"
  }, {
    icon: <Award className="h-8 w-8 text-blue-600" />,
    title: "We Guarantee The Work",
    description: "Legacy stands behind every installation with our warranty backing"
  }];
  const steps = [{
    step: "1",
    title: "Create Your Own Quote",
    description: "Use our intelligent quote builder to get accurate pricing instantly",
    gradient: "from-blue-500 to-purple-600"
  }, {
    step: "2",
    title: "Schedule Your Installation Day",
    description: "Pick your perfect date and we coordinate everything with your certified installer",
    gradient: "from-purple-500 to-pink-600"
  }, {
    step: "3",
    title: "Enjoy Your New Floor",
    description: "Relax while we transform your space with professional installation and lifetime warranty",
    gradient: "from-pink-500 to-orange-600"
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
  }, {
    name: "David Martinez",
    location: "Dallas, TX",
    rating: 5,
    text: "The 7-day guarantee was incredible - from booking to finished floor in under a week! The quality exceeded my expectations and the process was effortless."
  }];
  return <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-white py-24 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-xl space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Get Your Dream Garage Floor in{" "}
                <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">One Day</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">Elite Installers. Unmatched Quality. A Reputation Built on Results</p>
              <div className="relative">
                <Button onClick={() => navigate('/quote')} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg px-10 py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                  Get Instant Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                {/* Hand-drawn arrow and text */}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-6 hidden lg:flex items-start">
                  {/* Hand-drawn style arrow */}
                  
                  <div className="ml-2 transform rotate-1">
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 animate-pulse"></div>
              <img src="/lovable-uploads/dee22f69-e885-489a-a567-40d7d224064f.png" alt="Premium garage floor coating with luxury vehicles" className="relative w-full h-auto rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              Why Choose Legacy Industrial Coatings?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The only company you need to deal with for premium warranty floors
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/50">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Simple Image Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <img 
            src="/lovable-uploads/171f7c9e-88ae-49c9-b252-9f5d62d0221d.png" 
            alt="Premium speckled garage floor coating with luxury car" 
            className="w-full max-w-6xl mx-auto h-auto rounded-xl shadow-2xl"
          />
        </div>
      </section>

      {/* Enhanced Full Service Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/lovable-uploads/d89757aa-68ca-4a3f-b457-ae8701a25ca1.png" alt="Premium garage floor with luxury car" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-purple-900/60 to-blue-900/70"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h3 className="text-4xl lg:text-5xl font-bold mb-6 drop-shadow-lg bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              One Company, Complete Service
            </h3>
            <p className="text-xl lg:text-2xl mb-12 opacity-90 drop-shadow-lg">
              Work with the most trusted brand in garage floors.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 group hover:scale-105">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-4 drop-shadow-lg">{service.title}</h4>
                  <p className="opacity-90 leading-relaxed drop-shadow-lg">{service.description}</p>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden" id="how-it-works">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Three simple steps to transform your space with Legacy's premium service
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {steps.map((step, index) => <div key={index} className="group relative">
                  {/* Connecting line for desktop */}
                  {index < steps.length - 1 && <div className="hidden lg:block absolute top-20 left-full w-12 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 transform translate-x-4 z-10"></div>}
                  
                  <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100">
                    <div className="absolute -top-6 left-8">
                      <div className={`bg-gradient-to-r ${step.gradient} text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {step.step}
                      </div>
                    </div>
                    
                    <div className="pt-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </div>
                    
                    {/* Decorative gradient overlay */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  </div>
                </div>)}
            </div>
            
            {/* Central connecting element for mobile */}
            <div className="lg:hidden flex justify-center mt-8">
              <div className="w-1 h-16 bg-gradient-to-b from-blue-300 to-purple-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from homeowners who chose Legacy's full-service approach
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
            {testimonials.map((testimonial, index) => <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/30">
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
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20"></div>
              <img src="/lovable-uploads/49c586ed-2f38-4bb6-97fc-f42d1593a5c4.png" alt="Professional floor preparation and installation" className="relative w-full max-w-2xl mx-auto h-auto rounded-xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Get Your Dream Garage Floor?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get your free instant quote and experience Legacy's full-service approach
          </p>
          <Button onClick={() => navigate('/quote')} className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-10 py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            Start Your Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>;
};

export default Index;
