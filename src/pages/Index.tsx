
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, CheckCircle, Users, Shield, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="h-8 w-8 text-teal-600" />,
      title: "Vetted Installers",
      description: "Only certified, insured professionals in our network"
    },
    {
      icon: <Shield className="h-8 w-8 text-teal-600" />,
      title: "15-Year to Lifetime Warranties",
      description: "Industry-leading protection for your investment"
    },
    {
      icon: <Clock className="h-8 w-8 text-teal-600" />,
      title: "No In-Person Visits",
      description: "Get accurate quotes with just photos and measurements"
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Get Your Quote",
      description: "Use our instant quote tool to get pricing in seconds"
    },
    {
      step: "2",
      title: "Connect with Installer",
      description: "We match you with a certified installer in your area"
    },
    {
      step: "3",
      title: "Enjoy Your Floor",
      description: "Professional installation with warranty protection"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Denver, CO",
      rating: 5,
      text: "The quote was spot-on and my garage floor looks incredible. The installer was professional and the warranty gives me peace of mind."
    },
    {
      name: "Mike Chen",
      location: "Austin, TX",
      rating: 5,
      text: "Best decision for our home. The polyurea coating has held up perfectly through Texas weather. Highly recommend!"
    },
    {
      name: "Lisa Rodriguez",
      location: "Phoenix, AZ",
      rating: 5,
      text: "From quote to completion, everything was seamless. Our outdoor patio coating looks amazing and was done in one day."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Get Your Dream Garage Floor with a{" "}
              <span className="text-teal-600">Free Instant Quote</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              Vetted Installers • 15-Year to Lifetime Warranties • Hassle-Free Process
            </p>
            <Button 
              onClick={() => navigate('/quote')}
              className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Instant Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-50/20 to-blue-50/20 pointer-events-none"></div>
      </section>

      {/* Why Choose Legacy Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Legacy Industrial Coatings?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We connect you with the best installers and provide unmatched warranties for your peace of mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform your space
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
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
              Real experiences from homeowners who transformed their spaces
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Get your free instant quote and connect with certified installers today
          </p>
          <Button 
            onClick={() => navigate('/quote')}
            className="bg-white text-teal-600 hover:bg-gray-50 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Start Your Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
