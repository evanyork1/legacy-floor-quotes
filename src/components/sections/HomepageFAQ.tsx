import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocation } from "react-router-dom";

const HomepageFAQ = () => {
  const location = useLocation();
  const isProsper = location.pathname === '/epoxy-flooring-prosper';
  
  const baseFaqs = [
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

  const prosperFaqs = [
    {
      question: "Do you service neighborhoods like Windsong Ranch and Star Trail?",
      answer: "Yes — we frequently install floors in Prosper's newest residential communities."
    },
    {
      question: "How soon can I get an estimate in Prosper?",
      answer: "Same-day estimates available when you call before 2pm!"
    }
  ];

  const faqs = isProsper ? [...baseFaqs, ...prosperFaqs] : baseFaqs;

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
        </div>
      </div>
    </section>
  );
};

export default HomepageFAQ;