
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, CheckCircle, Users, Shield, Clock, Award, Headphones, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Vetted Installers",
      description: "Only certified, insured professionals in our network"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Warranty Floors - 15-Year to Lifetime",
      description: "Industry-leading protection with comprehensive coverage"
    },
    {
      icon: <Headphones className="h-8 w-8 text-blue-600" />,
      title: "Full Service Management",
      description: "We handle everything - payments, scheduling, and communication"
    }
  ];

  const services = [
    {
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
      title: "We Handle All Payments",
      description: "Pay Legacy directly - secure processing, milestone payments, and warranty protection"
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "We Coordinate Scheduling",
      description: "Legacy manages all scheduling and communication with your installer"
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "We Guarantee The Work",
      description: "Legacy stands behind every installation with our warranty backing"
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
      title: "Pay Legacy & Schedule",
      description: "We handle payment processing and coordinate with your installer"
    },
    {
      step: "3",
      title: "Enjoy Your Warranty Floor",
      description: "Professional installation with Legacy's warranty protection"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Denver, CO",
      rating: 5,
      text: "Working with Legacy was seamless. I paid them directly, they coordinated everything, and my garage floor looks incredible. The warranty gives me total peace of mind."
    },
    {
      name: "Mike Chen",
      location: "Austin, TX",
      rating: 5,
      text: "Best part was dealing with one company - Legacy handled the payment, scheduling, and warranty. The polyurea coating has held up perfectly through Texas weather."
    },
    {
      name: "Lisa Rodriguez",
      location: "Phoenix, AZ",
      rating: 5,
      text: "From quote to completion, Legacy managed everything. No dealing with multiple contractors. Our outdoor patio coating looks amazing and was done professionally."
    }
  ];

  const galleryImages = [
    {
      src: "/lovable-uploads/dee22f69-e885-489a-a567-40d7d224064f.png",
      alt: "High-end garage floor coating with luxury vehicles"
    },
    {
      src: "/lovable-uploads/6bb7ca29-9153-489d-a82d-ac6756606223.png",
      alt: "Modern garage with professional floor coating"
    },
    {
      src: "/lovable-uploads/d89757aa-68ca-4a3f-b457-ae8701a25ca1.png",
      alt: "Premium garage floor with luxury car"
    },
    {
      src: "/lovable-uploads/9acbbf4d-30b4-4070-9bb9-5e1e7f9f7d8e.png",
      alt: "Outdoor patio coating installation"
    },
    {
      src: "/lovable-uploads/49c586ed-2f38-4bb6-97fc-f42d1593a5c4.png",
      alt: "Professional floor preparation and installation"
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
              The only company you need for premium{" "}
              <span className="text-blue-600">warranty floors</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              We handle everything - payments, scheduling, installation coordination, and warranty service.
            </p>
            <Button 
              onClick={() => navigate('/quote')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Instant Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-indigo-50/20 pointer-events-none"></div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Premium Warranty Floors by Legacy
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See the quality and craftsmanship that comes with our warranty protection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {galleryImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Legacy Section */}
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
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Full Service Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                One Company, Complete Service
              </h3>
              <p className="text-lg text-gray-600">
                Unlike other platforms that just connect you to contractors, Legacy handles everything
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    {service.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{service.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              ))}
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
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
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
              Real experiences from homeowners who chose Legacy's full-service approach
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Get Your Warranty Floor?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get your free instant quote and experience Legacy's full-service approach
          </p>
          <Button 
            onClick={() => navigate('/quote')}
            className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
