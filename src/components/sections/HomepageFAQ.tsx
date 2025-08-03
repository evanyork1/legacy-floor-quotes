import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BookingModal } from "@/components/landing/BookingModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HomepageFAQ = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const navigate = useNavigate();
  const faqs = [
    {
      question: "How long does a garage floor coating take to install?",
      answer: "Most residential garage floors are installed in just one day, and ready for vehicle use within 24–48 hours."
    },
    {
      question: "How much does a garage floor coating cost?",
      answer: "For a 3-car garage using a premium polyurea flake system, pricing typically ranges from $3,600–$5,000. While cheaper epoxy jobs may be available for less, they often fail within a year."
    },
    {
      question: "Will the coating peel, chip, or discolor?",
      answer: "No. We use industrial-grade polyurea that resists hot tires, impact, and UV rays. It won't chip, peel, or yellow like standard epoxy systems."
    },
    {
      question: "How do I clean and maintain the floor after it's installed?",
      answer: "Simply sweep and mop with a mild cleaner as needed. Our coatings are non-porous and resist stains, dust, and grime."
    },
    {
      question: "Do you offer a warranty?",
      answer: "Yes. Our polyurea coatings come with a limited lifetime warranty against peeling, discoloration, and cracking under normal use."
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Get answers to the most common questions about our garage floor coatings
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')} 
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                Get A Quote
                <ArrowRight className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              
              <Button
                onClick={() => setShowBookingModal(true)}
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <Calendar className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Book An Estimate
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <BookingModal 
        isOpen={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
      />
    </section>
  );
};

export default HomepageFAQ;