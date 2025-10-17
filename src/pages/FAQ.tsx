import { useState } from "react";
import { Helmet } from "react-helmet-async";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BookingModal } from "@/components/landing/BookingModal";

const FAQ = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const navigate = useNavigate();

  const residentialFAQs = [
    {
      question: "What is the difference between polyurea and epoxy garage floor coatings?",
      answer: "Polyurea is more flexible, cures faster, and resists UV damage better than epoxy. It lasts longer and is less likely to peel or chip."
    },
    {
      question: "How long will my garage floor coating last?",
      answer: "Our polyurea floors typically last 15–20 years or more with minimal maintenance."
    },
    {
      question: "Can you coat over cracked or damaged concrete?",
      answer: "Yes. We repair cracks and prep the concrete with diamond grinding before applying any coating."
    },
    {
      question: "What causes other floors to fail or peel?",
      answer: "Poor surface prep, moisture intrusion, and cheap materials are the most common reasons. We address all three before coating."
    },
    {
      question: "How soon can I walk or park on my coated garage floor?",
      answer: "Light foot traffic is usually okay within 6–8 hours. You can typically park within 24 hours, depending on temperature and humidity."
    },
    {
      question: "Will the floor be slippery?",
      answer: "Our flake floors include a textured finish that improves slip resistance, even when wet."
    },
    {
      question: "Can I customize the look of my garage floor?",
      answer: "Yes. We offer a range of flake colors and sizes to suit your style and your home's design."
    },
    {
      question: "Do you offer garage floor coatings for new construction?",
      answer: "Absolutely. Many customers schedule us before move-in to protect and upgrade their brand-new garage from day one."
    },
    {
      question: "How do I clean the floor after installation?",
      answer: "Sweep regularly and mop with water or a gentle cleaner. Avoid harsh chemicals or degreasers."
    },
    {
      question: "Do you remove old coatings or failed epoxy jobs?",
      answer: "Yes. In fact, about 50% of our projects involve removing cheap, failed epoxy coatings before redoing the job correctly."
    }
  ];

  const commercialFAQs = [
    {
      question: "Do you install coatings for commercial or industrial facilities?",
      answer: "Yes. We install high-performance polyurea, polyaspartic, and polished concrete systems in warehouses, showrooms, kitchens, and more."
    },
    {
      question: "What's the best flooring solution for high-traffic commercial areas?",
      answer: "That depends on the use case. Polyurea is excellent for durability and ease of cleaning; polished concrete is ideal for large open areas with forklift traffic."
    },
    {
      question: "How long does it take to install commercial coatings?",
      answer: "Most small to medium commercial projects take 2–4 days depending on square footage and prep needs."
    },
    {
      question: "Can you install coatings overnight or on weekends to reduce downtime?",
      answer: "Yes. We offer flexible scheduling to minimize business disruption, including after-hours and weekend work."
    },
    {
      question: "What safety certifications or slip resistance standards do you meet?",
      answer: "Our commercial coatings can meet OSHA and ADA slip-resistance standards, and we can add grit or texture where needed."
    },
    {
      question: "Do you offer polished concrete for retail or office spaces?",
      answer: "Yes. Polished concrete is a popular low-maintenance choice for commercial interiors and we offer multiple finish levels."
    },
    {
      question: "Are there antimicrobial or chemical-resistant options for kitchens or labs?",
      answer: "Yes. We offer specialty coatings that are resistant to bacteria, acids, oils, and other industrial chemicals."
    },
    {
      question: "Can your coatings be used in automotive shops or dealerships?",
      answer: "Absolutely. We install showroom-grade polyurea and polished concrete that holds up under lifts, oil, and hot tires."
    },
    {
      question: "What maintenance is required for commercial floors?",
      answer: "Just routine sweeping and occasional mopping. We also offer maintenance plans for high-traffic environments."
    },
    {
      question: "Do you provide free estimates for commercial projects?",
      answer: "Yes. We'll assess your space, understand your needs, and deliver a custom plan with options that fit your budget."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions - Garage Floor Coatings | Legacy Industrial Coatings</title>
        <meta name="description" content="Get answers to common questions about our polyurea garage floor coatings, installation process, pricing, and maintenance. Expert advice from Legacy Industrial Coatings." />
        <meta name="keywords" content="garage floor coating FAQ, polyurea coating questions, floor coating maintenance, garage floor installation" />
        
        <meta property="og:title" content="FAQ - Garage Floor Coating Questions | Legacy Industrial Coatings" />
        <meta property="og:description" content="Get answers to common questions about our polyurea garage floor coatings, installation process, pricing, and maintenance." />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/faq" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <HeaderGeneric />
        
        {/* Hero Section */}
        <section className="pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 bg-gradient-to-br from-blue-50 to-slate-100">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Questions</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4">
               Find answers to the most common questions about our garage floor coatings, installation process, and maintenance. 
               Can't find what you're looking for? Contact us directly for personalized assistance.
            </p>
          </div>
        </section>

        {/* Residential FAQ Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Residential Garage Floors
                </h2>
                <p className="text-base sm:text-lg text-gray-600 px-4">
                  Common questions about residential garage floor coatings
                </p>
              </div>
              
              <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                {residentialFAQs.map((faq, index) => (
                  <AccordionItem key={`residential-${index}`} value={`residential-${index}`} className="border border-gray-200 rounded-lg px-4 sm:px-6">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 text-sm sm:text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Commercial FAQ Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Commercial & Industrial Floors
                </h2>
                <p className="text-base sm:text-lg text-gray-600 px-4">
                  Questions about commercial and industrial flooring solutions
                </p>
              </div>
              
              <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                {commercialFAQs.map((faq, index) => (
                  <AccordionItem key={`commercial-${index}`} value={`commercial-${index}`} className="border border-gray-200 rounded-lg px-4 sm:px-6 bg-white">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 text-sm sm:text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto px-4">
              Our flooring experts are here to help. Get personalized answers and a free quote for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                Get A Quote
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button 
                onClick={() => setShowBookingModal(true)}
                variant="outline"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base"
              >
                <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Book An Estimate
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      
      <BookingModal 
        isOpen={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
      />
    </>
  );
};

export default FAQ;