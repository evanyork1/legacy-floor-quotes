import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Phone, Star, Calendar, Shield, Clock } from "lucide-react";
import { BookingModal } from "@/components/landing/BookingModal";
import { CTAButton } from "@/components/ui/cta-button";
import Footer from "@/components/Footer";

const GoogleGaragePage = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const testimonials = [
    {
      name: "Matthew S.",
      text: "Incredible how much better these floors make your garage look and feel. My wife said it made the garage feel like an extension of the house now.",
      rating: 5,
    },
    {
      name: "Bharat A.",
      text: "Excellent experience from start to finish. The crew did an amazing job with the final result.",
      rating: 5,
    },
    {
      name: "Scott C.",
      text: "Totally exceeded my expectations. Crew was experienced and professional. Finished floor is amazing.",
      rating: 5,
    },
    {
      name: "Chris C.",
      text: "Great company to work with. Competent, genuinely helpful staff. Would highly recommend!",
      rating: 5,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Garage Floor In One Day | Dallas-Fort Worth | Legacy Industrial</title>
        <meta name="description" content="Transform your garage floor in just one day. Professional polyurea coating with lifetime warranty. Book your free estimate today." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Simple Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <img 
              src="/lovable-uploads/b4732a11-b0eb-48f7-9950-d9c8e186ab97.png" 
              alt="Legacy Industrial Coatings" 
              className="h-10 md:h-12"
            />
            <a 
              href="tel:214-444-6269" 
              className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span className="hidden sm:inline">(214) 444-6269</span>
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
          <img 
            src="/lovable-uploads/303d5679-dcda-4e82-b1da-4e309d1fb5dd.png" 
            alt="Beautiful garage floor coating" 
            className="w-full h-[60vh] md:h-[70vh] object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
                  Garage Floor<br />
                  <span className="text-blue-400">In One Day</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-6 md:mb-8 max-w-lg">
                  Premium polyurea coating with lifetime warranty. Professional installation by certified experts.
                </p>
                <CTAButton
                  onClick={() => setShowBookingModal(true)}
                  variant="primary"
                  size="lg"
                  icon={<Calendar />}
                  className="text-lg px-8 py-4"
                >
                  Book Estimate Now
                </CTAButton>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Features */}
        <section className="bg-blue-600 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-white text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>1-Day Install</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Lifetime Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span>180+ 5-Star Reviews</span>
              </div>
            </div>
          </div>
        </section>

        {/* Compact Testimonials Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-10">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100 mb-4">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Google Reviews</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                What Homeowners Are Saying
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Garage?
            </h2>
            <p className="text-blue-100 text-lg mb-6 max-w-xl mx-auto">
              Get a free, no-obligation estimate. Same-day appointments available.
            </p>
            <CTAButton
              onClick={() => setShowBookingModal(true)}
              variant="outline"
              size="lg"
              icon={<Calendar />}
              className="bg-white text-blue-600 hover:bg-gray-100 border-white"
            >
              Book Estimate Now
            </CTAButton>
          </div>
        </section>

        <Footer />
      </div>

      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
    </>
  );
};

export default GoogleGaragePage;
