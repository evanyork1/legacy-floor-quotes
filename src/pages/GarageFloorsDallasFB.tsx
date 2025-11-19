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
        
        {/* Hero Section with CTA Button */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 md:py-28 lg:py-36 overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGgxMnYxMkgzNnptMjQgMGgxMnYxMkgzNnptMCAwaDEydjEySDE2em0wIDI0aDEydjEySDE2eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyIC0xMikiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Transform Your Garage Floor{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  in Just One Day
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-3xl mx-auto">
                Premium Polyurea Coating System with Lifetime Warranty - Professional Installation by Dallas' Top-Rated Team
              </p>

              <Button 
                size="lg" 
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xl px-12 py-8 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all font-bold transform hover:scale-105"
              >
                <Phone className="mr-3 h-6 w-6" />
                Get A Same Day Estimate
              </Button>
            </div>
          </div>
        </section>


        {/* Testimonials Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4 bg-yellow-50 px-6 py-3 rounded-full border border-yellow-200">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                OVER 3,000+ SATISFIED CUSTOMERS
              </h2>
              <p className="text-xl text-gray-600 font-semibold">
                RATED 5.0 BASED ON 180+ GOOGLE REVIEWS
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-500 hover:scale-105">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-blue-600">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What Sets Us Apart Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-12">
              WHAT SETS US APART
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Legacy Industrial (Us) */}
              <Card className="shadow-2xl bg-gradient-to-br from-slate-900 to-blue-900 text-white border-none overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full -mr-16 -mt-16 opacity-20"></div>
                <CardContent className="pt-8 pb-8 relative z-10">
                  <h3 className="text-2xl font-bold mb-6 text-center">Legacy Industrial Coatings</h3>
                  <div className="space-y-4">
                    {[
                      "Cutting Edge Polyurea Technology - 4X Stronger Than Epoxy",
                      "Same Day Estimates & Fast 1-Day Installation",
                      "Limited Lifetime Warranty That Actually Protects You",
                      "Never Fades, Never Cracks, Never Disappoints",
                      "Highly Skilled Technicians With 1000+ Installations"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                        <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-base leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Other Companies */}
              <Card className="shadow-2xl bg-white border-2 border-red-200">
                <CardContent className="pt-8 pb-8">
                  <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Other Companies</h3>
                  <div className="space-y-4">
                    {[
                      "Outdated Epoxy That Yellows & Fades",
                      "Long Wait Times For Quotes & Installation",
                      "Short 1-5 Year Warranties With Fine Print",
                      "Floors That Crack With Temperature Changes",
                      "Inexperienced Crews & Inconsistent Results"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 bg-red-50 p-3 rounded-lg">
                        <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-base text-gray-700 leading-relaxed">{item}</span>
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
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
              >
                REQUEST A FREE QUOTE
              </Button>
            </div>
          </div>
        </section>

        {/* Before & After Transformations */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                REAL GARAGE TRANSFORMATIONS
              </span>
            </h2>
            <p className="text-center text-gray-300 mb-12 text-lg">See the dramatic difference our coating system makes</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {beforeAfterProjects.map((project, index) => (
                <Card key={index} className="shadow-2xl overflow-hidden bg-white hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-2 gap-2 p-4 bg-gradient-to-br from-gray-50 to-gray-100">
                      <div className="relative overflow-hidden rounded-xl group">
                        <img 
                          src={project.beforeImage} 
                          alt="Before garage floor transformation"
                          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            BEFORE
                          </span>
                        </div>
                      </div>
                      <div className="relative overflow-hidden rounded-xl group">
                        <img 
                          src={project.afterImage} 
                          alt="After garage floor transformation"
                          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            AFTER
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-white">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">{project.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{project.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGgxMnYxMkgzNnptMjQgMGgxMnYxMkgzNnptMCAwaDEydjEySDE2em0wIDI0aDEydjEySDE2eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyIC0xMikiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    Get In Touch Today To Get A{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      Gorgeous Floor
                    </span>{" "}
                    You'll Love For Life!
                  </h2>
                  <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                    Join thousands of satisfied customers who have transformed their spaces with our premium polyurea coating system.
                  </p>
                  <Button 
                    size="lg" 
                    onClick={scrollToTop}
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white text-lg px-10 py-6 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all font-bold transform hover:scale-105"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    REQUEST A FREE QUOTE
                  </Button>
                </div>

                {/* Right Image */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-2xl transform rotate-3"></div>
                  <img 
                    src="/demo-garage-cabin-fever.jpg" 
                    alt="Premium garage floor coating with luxury vehicles"
                    className="relative w-full h-full object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
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
