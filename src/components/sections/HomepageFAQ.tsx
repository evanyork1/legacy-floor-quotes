import { useLocation } from "react-router-dom";

const HomepageFAQ = () => {
  const location = useLocation();
  const isProsper = location.pathname === '/epoxy-flooring-prosper';
  const isFrisco = location.pathname === '/epoxy-flooring-frisco';

  const baseFaqs = [
    {
      question: "How long does a garage floor coating take to install?",
      answer: "Most residential garage floor coatings are installed in just one day, and your garage is ready for vehicle use within 24–48 hours. Our polyurea flake systems cure rapidly, so you're back to using your space without the long wait associated with traditional epoxy garage floors."
    },
    {
      question: "How much does a garage floor coating cost in Dallas-Fort Worth?",
      answer: "For a typical 3-car garage in DFW using a premium polyurea flake floor system, pricing usually ranges from $3,600–$5,000. Cheaper epoxy garage floor jobs are available for less, but they often fail within a year. Use the instant quote builder above to get your exact price in 60 seconds — no appointment needed."
    },
    {
      question: "Will the coating peel, chip, or discolor?",
      answer: "No. We use industrial-grade polyurea — the same chemistry used in high-traffic epoxy and industrial floor coatings — which resists hot tires, impact, chemicals, and UV rays. It will not chip, peel, or yellow like standard DIY epoxy garage floor kits."
    },
    {
      question: "How do I clean and maintain my new garage floor coating?",
      answer: "Simply sweep and mop with a mild cleaner as needed. Our polyurea garage floor coatings are non-porous and naturally resist stains, dust, oil, and grime — no waxing or resealing required."
    },
    {
      question: "Do you offer a warranty on your garage floor coatings?",
      answer: "Yes. Every residential polyurea garage floor coating we install comes with a limited lifetime warranty against peeling, discoloration, and cracking under normal use. Commercial floor coating projects are backed by manufacturer-specific warranties matched to the system installed."
    },
    {
      question: "Which DFW cities do you service for garage floor coatings?",
      answer: "We install garage floor epoxy and polyurea coatings throughout the Dallas-Fort Worth metroplex, including Dallas, Fort Worth, Plano, Frisco, McKinney, Allen, Richardson, Carrollton, Lewisville, Prosper, Celina, Sherman, Anna, Melissa, Sanger, The Colony, and Flower Mound."
    }
  ];

  const prosperFaqs = [
    {
      question: "Do you service neighborhoods like Windsong Ranch and Star Trail?",
      answer: "Yes — we frequently install garage floor coatings in Prosper's newest residential communities, including Windsong Ranch, Star Trail, and Whitley Place."
    },
    {
      question: "How soon can I get a garage floor estimate in Prosper?",
      answer: "Same-day estimates are available when you call before 2pm. Most Prosper homeowners receive their custom quote within 24 hours."
    }
  ];

  const friscoFaqs = [
    {
      question: "Do you serve Phillips Creek Ranch, Starwood, and other Frisco communities?",
      answer: "Yes, we regularly install garage floor coatings in Frisco's premier neighborhoods, including Phillips Creek Ranch, Starwood, and Newman Village."
    },
    {
      question: "Can I get a same-day garage floor quote in Frisco?",
      answer: "Absolutely. Call us before 2pm for a same-day estimate anywhere in Frisco."
    }
  ];

  const faqs = isProsper ? [...baseFaqs, ...prosperFaqs] : isFrisco ? [...baseFaqs, ...friscoFaqs] : baseFaqs;

  return (
    <section className="py-16 bg-muted/30" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about our garage floor coatings in Dallas-Fort Worth.
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <article key={index} className="border-b border-border pb-6 last:border-0">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageFAQ;
