import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Phone, Star, MapPin, ArrowRight, ChevronRight } from "lucide-react";
import { SimpleLeadModal } from "@/components/landing/SimpleLeadModal";
import Footer from "@/components/Footer";
import { FloorVisualizer } from "@/components/visualizer/FloorVisualizer";

// Import new luxury images
import heroImage from "@/assets/google-hero-green-porsche.jpg";
import legacyLogo from "@/assets/legacy-logo.png";
import luxuryGarage1 from "@/assets/luxury-garage-1.jpg";
import luxuryGarage2 from "@/assets/luxury-garage-2.jpg";
import luxuryGarage3 from "@/assets/luxury-garage-3.webp";
import flakeCloseup from "@/assets/flake-closeup.jpg";

const GoogleGaragePage = () => {
  const [showLeadModal, setShowLeadModal] = useState(false);
  
  const testimonials = [{
    name: "Matthew S.",
    location: "Prosper, TX",
    text: "Incredible how much better these floors make your garage look and feel. My wife said it made the garage feel like an extension of the house now.",
    rating: 5
  }, {
    name: "Bharat A.",
    location: "Frisco, TX",
    text: "Excellent experience from start to finish. The crew did an amazing job with the final result.",
    rating: 5
  }, {
    name: "Scott C.",
    location: "McKinney, TX",
    text: "Totally exceeded my expectations. Crew was experienced and professional. Finished floor is amazing.",
    rating: 5
  }, {
    name: "Chris C.",
    location: "Plano, TX",
    text: "Great company to work with. Competent, genuinely helpful staff. Would highly recommend!",
    rating: 5
  }];

  const processSteps = [
    {
      step: "01",
      title: "GRIND",
      description: "Diamond grind to open concrete pores",
      image: "/lovable-uploads/64f61c96-ce73-4ef1-adb6-6e3d1644de30.png"
    },
    {
      step: "02", 
      title: "REPAIR",
      description: "Fill cracks and imperfections",
      image: flakeCloseup
    },
    {
      step: "03",
      title: "BASE COAT",
      description: "Apply industrial-grade polyurea",
      image: luxuryGarage2
    },
    {
      step: "04",
      title: "BROADCAST",
      description: "Full flake coverage for texture",
      image: "/lovable-uploads/303d5679-dcda-4e82-b1da-4e309d1fb5dd.png"
    },
    {
      step: "05",
      title: "TOPCOAT",
      description: "UV-stable clear coat protection",
      image: luxuryGarage1
    }
  ];

  return <>
    <Helmet>
      <title>Garage Floor In One Day | Dallas-Fort Worth | Legacy Industrial</title>
      <meta name="description" content="Transform your garage floor in just one day. Professional polyurea coating with lifetime warranty. Book your free estimate today." />
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>

    <div className="min-h-screen bg-white">
      {/* Black Header with Logo */}
      <header className="bg-black py-3 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <img src={legacyLogo} alt="Legacy Industrial Coatings" className="h-8 sm:h-10" loading="eager" decoding="async" fetchpriority="high" />
          <a href="tel:214-444-6269" className="flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors">
            <Phone className="h-4 w-4" />
            <span className="text-sm sm:text-base">(214) 444-6269</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-10" />
        <img src={heroImage} alt="Luxury garage with coated floor" className="w-full h-[70vh] sm:h-[65vh] object-cover"  loading="lazy" decoding="async" />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              {/* Google Reviews Badge */}
              <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-sm mb-4">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-gray-800">190+ Reviews</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 leading-none">
                <span className="block whitespace-nowrap">Your Dream Garage</span>
                <span className="block text-blue-400 mt-1">In One Day</span>
              </h1>
              <p className="text-gray-300 mb-6 max-w-md text-sm sm:text-base mt-4">
                Shockingly beautiful. Lifetime warranty. Installed in only one day.
              </p>
              
              {/* Primary CTA - White outline style */}
              <button 
                onClick={() => setShowLeadModal(true)} 
                className="group bg-transparent border-2 border-white text-white text-sm sm:text-base font-semibold px-6 py-3 hover:bg-white hover:text-black transition-all duration-200 flex items-center gap-2"
              >
                Get A Free Estimate
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-gray-400 text-xs mt-3">
                Join over 3,000 homeowners in DFW
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto text-center">
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">3,000+</p>
              <p className="text-gray-400 text-xs sm:text-sm">Garages Installed</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">2M+</p>
              <p className="text-gray-400 text-xs sm:text-sm">Square Feet Coated</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">DFW</p>
              <p className="text-gray-400 text-xs sm:text-sm">Proudly Serving</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section - Light gray bg, flat cards */}
      <section className="py-8 sm:py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />)}
                  </div>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed mb-2 line-clamp-3">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-gray-900 text-xs">{testimonial.name}</p>
                <p className="text-gray-500 text-[10px]">{testimonial.location}</p>
              </div>
            ))}
          </div>

          {/* CTAs under reviews */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 max-w-md sm:max-w-none mx-auto">
            <a
              href="tel:214-305-6516"
              className="group bg-blue-600 text-white text-sm font-semibold px-6 py-3 hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Phone className="h-4 w-4" />
              214-305-6516
            </a>
            <button
              onClick={() => setShowLeadModal(true)}
              className="group border-2 border-blue-600 text-blue-600 text-sm font-semibold px-6 py-3 hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
            >
              Book An Estimate
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
      <section className="py-10 sm:py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose <span className="text-blue-600">Legacy</span>?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-4 border-l-4 border-blue-600 bg-gray-50">
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-gray-900">3,000+</p>
                <p className="text-gray-600 text-sm">Garages installed across North Texas</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 border-l-4 border-blue-600 bg-gray-50">
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-gray-900">Millions</p>
                <p className="text-gray-600 text-sm">Square feet of flooring installed</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 border-l-4 border-blue-600 bg-gray-50">
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-gray-900">#1</p>
                <p className="text-gray-600 text-sm">Voted #1 Concrete Coatings Company in Plano 2025</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 border-l-4 border-blue-600 bg-gray-50">
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-gray-900">Easiest</p>
                <p className="text-gray-600 text-sm">We're the easiest company to work with—no babysitting required</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button 
              onClick={() => setShowLeadModal(true)} 
              className="group border-2 border-blue-600 text-blue-600 text-sm font-semibold px-6 py-2.5 hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center gap-2"
            >
              Get A Free Quote
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Process Section - Gritty, Real */}
      <section className="py-8 sm:py-10 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
            Our <span className="text-blue-400">Process</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {processSteps.map((item, index) => (
              <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-stretch mb-2`}>
                <div className="w-1/2 relative">
                  <img src={item.image} alt={item.title} className="w-full h-32 sm:h-40 object-cover"  loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className={`w-1/2 bg-gray-800 flex items-center ${index % 2 === 0 ? 'pl-4 sm:pl-6' : 'pr-4 sm:pr-6 justify-end text-right'}`}>
                  <div>
                    <span className="text-blue-400 text-xs font-mono">{item.step}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-gray-400 text-xs">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button 
              onClick={() => setShowLeadModal(true)} 
              className="group bg-blue-600 text-white text-sm font-semibold px-6 py-2.5 hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
            >
              Get A Free Estimate
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-8 sm:py-10 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <video 
              className="w-full aspect-video"
              controls
              poster={heroImage}
            >
              <source src="/videos/legacy-process.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Floor Visualizer Section */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
            See Your <span className="text-blue-600">Floor</span> Before We Install
          </h2>
          <p className="text-gray-600 text-sm text-center mb-6 max-w-xl mx-auto">
            Upload a photo of your garage and preview different colors instantly
          </p>
          <FloorVisualizer />
        </div>
      </section>

      {/* Why Legacy Section */}
      <section className="py-8 sm:py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
              Why <span className="text-blue-600">Legacy</span>?
            </h2>
            
            <div className="bg-white border-l-4 border-blue-600 p-4 sm:p-6">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                We've all been there. You hire someone to work on your home, and suddenly you're babysitting them—answering questions, pointing out mistakes, worrying if they'll show up tomorrow.
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                <strong className="text-gray-900">That's not the Legacy experience.</strong>
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                When you hire us, you're buying peace of mind. Our crews are trained professionals who treat your home with respect. We show up on time, communicate clearly, and deliver results that exceed expectations.
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                You're not just getting a floor coating. You're getting the premium experience you deserve—where you never have to worry about a thing.
              </p>
            </div>

            <div className="flex justify-center mt-6">
              <button 
                onClick={() => setShowLeadModal(true)} 
                className="group border-2 border-blue-600 text-blue-600 text-sm font-semibold px-6 py-2.5 hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center gap-2"
              >
                Experience The Difference
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-8 sm:py-10 bg-gradient-to-r from-blue-700 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Ready to Transform Your Garage?
          </h2>
          <p className="text-blue-100 text-sm mb-4 max-w-md mx-auto">
            Get a free, no-obligation estimate. Same-day appointments available.
          </p>
          <button 
            onClick={() => setShowLeadModal(true)} 
            className="group bg-white text-blue-700 text-base sm:text-lg font-bold px-8 py-3 hover:bg-gray-100 transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            Get A Free Estimate Now
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <Footer />
    </div>

    <SimpleLeadModal isOpen={showLeadModal} onClose={() => setShowLeadModal(false)} />
  </>;
};

export default GoogleGaragePage;
