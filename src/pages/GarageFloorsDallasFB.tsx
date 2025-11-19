import { Helmet } from "react-helmet-async";
import { useState } from "react";
import GiveawayHeader from "@/components/GiveawayHeader";
import Footer from "@/components/Footer";
import { Star, CheckCircle2, X, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SimpleLeadModal } from "@/components/landing/SimpleLeadModal";

const GarageFloorsDallasFB = () => {
  const [showModal, setShowModal] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setShowModal(true), 300);
  };

  const testimonials = [
    {
      name: "Bharat Arimilli",
      location: "Plano, TX",
      text: "Excellent experience from start to finish. Got a quote quickly and at a very reasonable price. The office was very communicative throughout and the crew did an amazing job with the final result."
    },
    {
      name: "Scott Cleland",
      location: "Dallas, TX",
      text: "Totally exceeded my expectations. Crew was experienced and professional. They worked with me on how to address existing cracks in my floor, and they worked around some challenging weather."
    },
    {
      name: "Chris C",
      location: "Melissa, TX",
      text: "Great company to work with. Competent, genuinely helpful staff. From the original quote to the completion of the job, the representatives were always thorough and professional."
    },
    {
      name: "Joseph Im",
      location: "McKinney, TX",
      text: "I have nothing but great things to say about Legacy Industrial coating! From the first consultation to the actual Job. The people who work here are fantastic and so easy to work with!"
    },
    {
      name: "David Martinez",
      location: "Frisco, TX",
      text: "Our garage floor looks absolutely stunning! The team was professional, efficient, and the quality of work exceeded all expectations. Highly recommend!"
    },
    {
      name: "Amanda Wilson",
      location: "Allen, TX",
      text: "Best investment we've made for our home. The floor is beautiful, durable, and so easy to maintain. The installation was quick and the crew was incredibly professional."
    }
  ];

  const beforeAfterProjects = [
    {
      title: "From Stained to Stunning",
      description: "This homeowner's garage went from a stained, cracked concrete floor to a beautiful flake system that completely transformed the space.",
      beforeImage: "/lovable-uploads/64f61c96-ce73-4ef1-adb6-6e3d1644de30.png",
      afterImage: "/lovable-uploads/303d5679-dcda-4e82-b1da-4e309d1fb5dd.png"
    },
    {
      title: "Complete Garage Makeover",
      description: "A typical residential garage transformation showing how our flake floor coating system turns an ordinary concrete floor into a showroom-quality surface.",
      beforeImage: "/lovable-uploads/f57a3511-7157-4235-ba23-509e1df21d59.png",
      afterImage: "/lovable-uploads/002da108-5855-41da-aaea-3e1d1a9de98e.png"
    },
    {
      title: "Large Space Transformation",
      description: "Even larger garage spaces benefit tremendously from our coating systems. This transformation shows how our flake floors can completely change the look.",
      beforeImage: "/lovable-uploads/c499e5d5-764f-4feb-b2be-635e5b67ea69.png",
      afterImage: "/lovable-uploads/e98aa310-42f2-46db-ac00-8502f2d71097.png"
    },
    {
      title: "Professional Results",
      description: "Our process consistently delivers beautiful results. From preparation to final topcoat, every step is performed with precision.",
      beforeImage: "/lovable-uploads/1e76caef-6851-4869-9f2e-df3b59bf64ef.png",
      afterImage: "/lovable-uploads/ef50769f-f8f0-4bd8-9f4c-5238689c933b.png"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Professional Garage Floor Coating Dallas | Same Day Estimates</title>
        <meta name="description" content="Transform your Dallas garage with premium polyurea floor coating. Lifetime warranty, one-day installation, and over 3,000 satisfied customers." />
        <meta name="keywords" content="garage floor coating dallas, polyurea floors, garage renovation, floor coating dallas" />
        
        <meta property="og:title" content="Professional Garage Floor Coating Dallas | Same Day Estimates" />
        <meta property="og:description" content="Transform your Dallas garage with premium polyurea floor coating. Lifetime warranty, one-day installation, and over 3,000 satisfied customers." />
        <meta property="og:image" content="/lovable-uploads/b4732a11-b0eb-48f7-9950-d9c8e186ab97.png" />
        <meta property="og:type" content="website" />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/garagefloorsdallasfb" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <GiveawayHeader />
        
        {/* Hero Section with Centered Form */}
        <section className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
                Transform Your Garage Floor{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  in Just One Day
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed max-w-3xl mx-auto">
                Premium Polyurea Coating System with Lifetime Warranty - Professional Installation by Dallas' Top-Rated Team
              </p>
            </div>

            {/* CTA Button */}
            <div className="max-w-2xl mx-auto text-center">
              <Button 
                size="lg" 
                onClick={() => setShowModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-10 py-8 rounded-lg shadow-xl hover:shadow-2xl transition-all font-bold"
              >
                <Phone className="mr-3 h-6 w-6" />
                Get A Same Day Estimate
              </Button>
            </div>
          </div>
        </section>


        {/* Testimonials Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                OVER 15,000 SATISFIED CUSTOMERS
              </h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-lg text-gray-600 font-medium">
                RATED 4.8 ONLINE BASED ON 2,647 REVIEWS
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What Sets Us Apart Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              WHAT SETS US APART
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Legacy Industrial (Us) */}
              <Card className="shadow-xl bg-[#2d3e50] text-white">
                <CardContent className="pt-8 pb-8">
                  <h3 className="text-2xl font-bold mb-6 text-center">Legacy Industrial Coatings</h3>
                  <div className="space-y-3">
                    {[
                      "No Pressure",
                      "Easy Financing & Low Monthly Payments",
                      "Cutting Edge Polyurea Coatings",
                      "Gorgeous Design Options",
                      "Never Fades",
                      "Never Cracks",
                      "1 Day Floors",
                      "Highly Skilled Technicians",
                      "Limited Lifetime Warranty",
                      "#1 Concrete Coating Company in the USA"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Other Companies */}
              <Card className="shadow-xl bg-white border-2 border-gray-200">
                <CardContent className="pt-8 pb-8">
                  <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Other Companies</h3>
                  <div className="space-y-3">
                    {[
                      "High Pressure Sales",
                      "High Payments",
                      "Dated Epoxy Formulas",
                      "Limited Color Selection",
                      "May Yellow or Fade From UV Exposure",
                      "May Crack With Temperature Changes",
                      "Multi-Day Installations",
                      "Inexperienced Technicians",
                      "Short Term Warranties",
                      ""
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-base text-gray-700">{item || "\u00A0"}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-10">
              <Button 
                size="lg" 
                onClick={scrollToTop}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                REQUEST A FREE QUOTE
              </Button>
            </div>
          </div>
        </section>

        {/* Before & After Transformations */}
        <section className="py-16 md:py-20 bg-[#2d3e50]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              REAL GARAGE TRANSFORMATIONS
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {beforeAfterProjects.map((project, index) => (
                <Card key={index} className="shadow-xl overflow-hidden bg-white">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-2 gap-2 p-4">
                      <div className="relative overflow-hidden rounded-lg">
                        <img 
                          src={project.beforeImage} 
                          alt="Before garage floor transformation"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold">
                            BEFORE
                          </span>
                        </div>
                      </div>
                      <div className="relative overflow-hidden rounded-lg">
                        <img 
                          src={project.afterImage} 
                          alt="After garage floor transformation"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-white text-blue-600 px-3 py-1 rounded text-xs font-semibold border border-blue-600">
                            AFTER
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{project.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-20 bg-[#2d3e50] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    Get In Touch Today To Get A Gorgeous Floor You'll Love For Life!
                  </h2>
                  <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                    Join thousands of satisfied customers who have transformed their spaces with our premium polyurea coating system.
                  </p>
                  <Button 
                    size="lg" 
                    onClick={scrollToTop}
                    className="bg-white hover:bg-gray-100 text-[#2d3e50] text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all font-bold"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    REQUEST A FREE QUOTE
                  </Button>
                </div>

                {/* Right Image */}
                <div className="relative">
                  <img 
                    src="/demo-garage.jpg" 
                    alt="Premium garage floor coating"
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        
        <SimpleLeadModal 
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      </div>
    </>
  );
};

export default GarageFloorsDallasFB;
