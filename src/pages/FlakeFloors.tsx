import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Clock, Palette, Wrench, CheckCircle, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FlakeFloors = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Lifetime Warranty",
      description: "Our polyurea flake floors come with an industry-leading lifetime warranty, ensuring your investment is protected for years to come."
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Fast Installation",
      description: "Most residential garage floors can be completed in just one day, minimizing disruption to your daily routine."
    },
    {
      icon: <Palette className="h-8 w-8 text-blue-600" />,
      title: "Customizable Design",
      description: "Choose from a wide variety of flake colors and patterns to create a unique floor that matches your style and preferences."
    },
    {
      icon: <Wrench className="h-8 w-8 text-blue-600" />,
      title: "Low Maintenance",
      description: "Once installed, flake floors require minimal maintenance - just simple cleaning with standard household products."
    }
  ];

  const features = [
    "Chemical and stain resistant",
    "Slip-resistant texture",
    "UV stable colors that won't fade",
    "Impact and abrasion resistant",
    "Easy to clean and maintain",
    "Available in multiple color combinations"
  ];

  return (
    <>
      <Helmet>
        <title>Polyurea Flake Floors - Premium Garage Floor Coatings | Legacy Industrial Coatings</title>
        <meta name="description" content="Transform your garage with our premium polyurea flake floors. Lifetime warranty, one-day installation, and endless customization options. The most durable garage floor coating available." />
        <meta name="keywords" content="polyurea flake floors, garage floor coating, flake flooring, decorative concrete, garage renovation, floor coating Dallas, epoxy alternative" />
        
        <meta property="og:title" content="Polyurea Flake Floors - Premium Garage Floor Coatings | Legacy Industrial Coatings" />
        <meta property="og:description" content="Transform your garage with our premium polyurea flake floors. Lifetime warranty, one-day installation, and endless customization options." />
        <meta property="og:image" content="/lovable-uploads/8865d0d1-af13-4849-b194-a2611de34a0b.png" />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/flake-floors" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-slate-100">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Premium <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Polyurea Flake Floors</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Our signature polyurea flake floor system combines superior durability with stunning aesthetics. 
                  With a lifetime warranty and endless customization options, it's the perfect solution for your garage or workspace.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => navigate('/contact')}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Get Free Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open('tel:+14698704668', '_self')}
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full transition-all duration-300"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-20"></div>
                <img 
                  src="/lovable-uploads/8865d0d1-af13-4849-b194-a2611de34a0b.png" 
                  alt="Beautiful polyurea flake floor installation" 
                  className="relative w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What Are Flake Floors Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                What Are <span className="text-blue-600">Polyurea Flake Floors?</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Polyurea flake floors are our premium flooring solution that combines a high-performance polyurea base coat 
                with decorative vinyl flakes, topped with a crystal-clear protective topcoat. This system creates a durable, 
                beautiful, and long-lasting floor that outperforms traditional epoxy coatings in every way.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Superior Performance Features</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/lovable-uploads/e6d46c38-cab4-4c0e-b5f7-a13f414dc01b.png" 
                  alt="Close-up of polyurea flake floor texture" 
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Flake Floors?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the advantages that make polyurea flake floors the preferred choice for discerning homeowners.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/50">
                  <CardContent className="p-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Our Flake Floor Installation Process
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professional installation ensures your flake floor will look amazing and perform for decades.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Surface Preparation",
                  description: "We thoroughly clean and prepare your concrete surface, addressing any cracks or imperfections to ensure optimal adhesion."
                },
                {
                  step: "02", 
                  title: "Polyurea Base Application",
                  description: "Our high-performance polyurea base coat is applied, providing superior durability and chemical resistance compared to epoxy."
                },
                {
                  step: "03",
                  title: "Flake Broadcast & Topcoat",
                  description: "Decorative flakes are broadcast into the base coat, then sealed with a crystal-clear protective topcoat for lasting beauty."
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get a free quote for your custom polyurea flake floor installation. Our experts will help you choose the perfect design for your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('tel:+14698704668', '_self')}
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full transition-all duration-300"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default FlakeFloors;