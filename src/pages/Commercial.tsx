import { Helmet } from "react-helmet-async";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import StructuredData from "@/components/seo/StructuredData";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { captureUtmsFromLocation } from "@/contexts/BookingUrlContext";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { BookingModal } from "@/components/landing/BookingModal";
import { LeadForm } from "@/components/landing/LeadForm";
import { Building, Factory, Car, Plane, Dog, Church, Store, School, Utensils, ArrowRight, Phone, Calendar } from "lucide-react";

const COMMERCIAL_FAQS = [
  {
    question: "How does your bid process work for GCs and facility managers?",
    answer:
      "We walk the site within 3–5 business days of your RFP or ITB request, then return a full commercial-ready bid inside 7–10 business days — scope of work, system spec, mockup options, phasing plan, and schedule aligned to your critical path. Rush turnarounds are available when the RFP window is tight. We work directly with national and regional GCs on tenant improvement, ground-up, and re-coat projects across DFW.",
  },
  {
    question: "Are you OSHA-compliant and fully insured for commercial work?",
    answer:
      "Yes. We carry full general liability and workers' comp, submit OSHA-compliant safety plans with every bid, and our crews are trained on containment, ventilation, silica exposure, and fall protection. Certificates of insurance are provided directly to the GC or property manager on request, and we participate in owner/GC-controlled insurance programs (OCIP/CCIP) when required.",
  },
  {
    question: "Can you install nights or weekends to keep operations running?",
    answer:
      "Almost all of our commercial work is phased around occupied buildings — nights, weekends, and holiday shutdowns. We stage materials off-site, run low-odor systems where required, and coordinate directly with facility managers on containment, egress, and hand-off. Multi-phase pours in retail, warehouse, food-service, and medical environments are our normal mode of work.",
  },
  {
    question: "What's the warranty on commercial vs residential coatings?",
    answer:
      "Residential polyurea flake garages carry our lifetime warranty against peeling, chipping, and UV yellowing. Commercial and industrial systems are warrantied against manufacturing defect and delamination for the design life of the specified system — typically 5 to 15 years depending on the assembly (high-build epoxy, urethane cement, polished concrete). Full written warranty terms and manufacturer backing are included with every commercial bid.",
  },
];
const Commercial = () => {
  const navigate = useNavigate();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  useEffect(() => { captureUtmsFromLocation(); }, []);
  const services = [{
    title: "Concrete Polishing",
    description: "Transform your concrete floors with our professional polishing services. Achieve a high-gloss, durable finish that's perfect for retail spaces, showrooms, and high-traffic commercial areas."
  }, {
    title: "Industrial Epoxy",
    description: "Heavy-duty epoxy systems designed for manufacturing, warehouses, and industrial facilities. Chemical resistant, extremely durable, and built to withstand the toughest conditions."
  }, {
    title: "Flake Floors",
    description: "Decorative and durable flake flooring systems perfect for commercial spaces. Provides excellent slip resistance, hides imperfections, and offers endless design possibilities for retail stores, restaurants, and showrooms."
  }];
  const applications = [{
    name: "Airplane Hangars",
    icon: <Plane className="h-6 w-6" />
  }, {
    name: "Warehouses",
    icon: <Factory className="h-6 w-6" />
  }, {
    name: "Manufacturing Plants",
    icon: <Factory className="h-6 w-6" />
  }, {
    name: "Car Dealerships",
    icon: <Car className="h-6 w-6" />
  }, {
    name: "Dog Kennels",
    icon: <Dog className="h-6 w-6" />
  }, {
    name: "Commercial Kitchens",
    icon: <Utensils className="h-6 w-6" />
  }, {
    name: "Wedding Venues",
    icon: <Church className="h-6 w-6" />
  }, {
    name: "Retail Stores",
    icon: <Store className="h-6 w-6" />
  }, {
    name: "Schools & Universities",
    icon: <School className="h-6 w-6" />
  }, {
    name: "Distribution Centers",
    icon: <Building className="h-6 w-6" />
  }, {
    name: "Food Processing",
    icon: <Utensils className="h-6 w-6" />
  }, {
    name: "And More",
    icon: <Building className="h-6 w-6" />
  }];
  const commercialImages = [{
    src: "/lovable-uploads/171b7f71-4aa3-4b54-8c96-5f7143dddebf.png",
    alt: "Commercial restaurant with polished concrete floors"
  }, {
    src: "/lovable-uploads/4a97932b-03f2-42ab-9e2f-2a90852befc0.png",
    alt: "Commercial restroom with epoxy flooring"
  }, {
    src: "/lovable-uploads/b5e6bdc4-80f9-44ea-a580-29d22662f7d4.png",
    alt: "Industrial floor coating detail"
  }, {
    src: "/lovable-uploads/85530262-ab7f-4339-af86-ed63ee721679.png",
    alt: "Commercial warehouse flooring"
  }, {
    src: "/lovable-uploads/57f768f2-8d88-45f9-9d4e-a4c13cf1ed0b.png",
    alt: "Industrial epoxy floor installation"
  }, {
    src: "/lovable-uploads/701db69b-4439-4779-9115-583d175298af.png",
    alt: "Helicopter hangar with polished concrete floors"
  }, {
    src: "/lovable-uploads/d1b328fa-3e30-4126-8266-ae64a33edd79.png",
    alt: "Medical facility with epoxy flooring"
  }, {
    src: "/lovable-uploads/36244d7f-fc1a-4402-928c-de98a796b0d7.png",
    alt: "Garage with polished concrete flooring"
  }, {
    src: "/lovable-uploads/79ce02fc-d147-4c75-b50f-753c518a0483.png",
    alt: "Aircraft maintenance hangar flooring"
  }];
  return <>
      <Helmet>
        <title>Commercial Epoxy Flooring DFW | Legacy Industrial Coatings</title>
        <meta name="description" content="Large-scale commercial epoxy flooring in Dallas-Fort Worth. Warehouses, dealerships, industrial facilities. Heavy-duty floor systems built to last." />
        <meta name="keywords" content="commercial flooring Dallas, industrial epoxy DFW, concrete polishing Dallas, warehouse flooring, retail store flooring, restaurant flooring" />
        
        {/* Geo-location meta tags */}
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Dallas" />
        <meta name="geo.position" content="32.7767;-96.7970" />
        <meta name="ICBM" content="32.7767, -96.7970" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Commercial Epoxy Flooring DFW | Legacy Industrial Coatings" />
        <meta property="og:description" content="Large-scale commercial epoxy flooring in Dallas-Fort Worth. Warehouses, dealerships, industrial facilities. Heavy-duty floor systems built to last." />
        <meta property="og:image" content="/lovable-uploads/171b7f71-4aa3-4b54-8c96-5f7143dddebf.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/commercial" />
        <meta property="og:url" content="https://legacyindustrialcoatings.com/commercial" />
      </Helmet>

      <StructuredData
        includeLocalBusiness={false}
        includeOrganization={false}
        services={[
          { name: "Concrete Polishing", description: "Mechanically polished concrete for commercial showrooms, retail, restaurants, and industrial facilities across Dallas-Fort Worth.", url: "/concrete-polishing" },
          { name: "Industrial Epoxy", description: "Heavy-duty epoxy and urethane cement systems for warehouses, manufacturing plants, and industrial facilities in DFW.", url: "/industrial-epoxy" },
          { name: "Flake Floors", description: "Decorative flake broadcast flooring for commercial retail, showrooms, kennels, and food-service back-of-house.", url: "/flake-floors" },
        ]}
        faqs={COMMERCIAL_FAQS.map((f) => ({ question: f.question, answer: f.answer }))}
      />

      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Commercial", url: "/commercial" }]} />

      <div className="min-h-screen bg-white">
        <HeaderGeneric />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Professional <span className="text-blue-900">Commercial Flooring</span> Solutions
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform your commercial space with our professional flooring systems. 
                  We specialize in industrial epoxy, concrete polishing, and decorative floors perfect for 
                  warehouses, retail stores, restaurants, and commercial facilities across Dallas-Fort Worth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-blue-900 hover:bg-blue-950 text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                    <a href="tel:214-305-6516">
                      <Phone className="mr-2 h-5 w-5" />
                      Call Us Now
                    </a>
                  </Button>
                  <Button variant="outline" onClick={() => setIsBookingModalOpen(true)} className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-3 rounded-full transition-all duration-300">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book An Estimate
                  </Button>
                </div>

              </div>
              <div className="relative">
                <img src="/lovable-uploads/171b7f71-4aa3-4b54-8c96-5f7143dddebf.png" alt="Professional commercial flooring installation" className="relative w-full h-96 object-cover rounded-xl shadow-xl" loading="eager" decoding="async" fetchpriority="high" />
              </div>
            </div>
          </div>
        </section>

        {/* Commercial Floor Solutions */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
                Our Commercial Solutions
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Durable, professional flooring systems designed for commercial and industrial environments
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {services.map((service, index) => <Card key={index} className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-900 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <Button variant="outline" onClick={() => navigate(service.title === "Concrete Polishing" ? "/concrete-polishing" : service.title === "Industrial Epoxy" ? "/industrial-epoxy" : "/flake-floors")} className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>)}
              </div>
              
              <div className="relative">
                <div className="relative bg-white rounded-xl overflow-hidden shadow-xl aspect-[3/2]">
                  <img src="/lovable-uploads/171b7f71-4aa3-4b54-8c96-5f7143dddebf.png" alt="Commercial flooring installation" className="w-full h-full object-cover"  loading="eager" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial Spaces */}
        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
                Commercial Spaces We Install
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Professional flooring solutions for businesses across Dallas-Fort Worth
              </p>
            </div>

            {/* Applications Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
              {applications.map((app, index) => <div key={index} className="bg-white rounded-xl p-6 text-center border border-slate-200 hover:border-blue-900/30 transition-all duration-300 group shadow-sm hover:shadow-md">
                  <div className="text-blue-900 mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {app.icon}
                  </div>
                  <p className="text-gray-800 text-sm font-medium">{app.name}</p>
                </div>)}
            </div>

            {/* Commercial Images Gallery */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {commercialImages.map((image, index) => <div key={index} className="relative">
                  <div className="relative bg-white rounded-xl aspect-[3/2] overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"  loading="eager" decoding="async" />
                  </div>
                </div>)}
            </div>

            {/* Mid-page CTA */}
            <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-blue-900 hover:bg-blue-950 text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                <a href="tel:214-305-6516">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us Now
                </a>
              </Button>
              <Button variant="outline" onClick={() => setIsBookingModalOpen(true)} className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-3 rounded-full transition-all duration-300">
                <Calendar className="mr-2 h-5 w-5" />
                Book An Estimate
              </Button>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-blue-950 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to Transform Your Commercial Space?
              </h2>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                Talk to our team today. Call us now for an immediate quote, or book a free on-site estimate at a time that works for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-950 hover:bg-slate-100 px-8 py-3 rounded-full shadow-md transition-all duration-300">
                  <a href="tel:214-305-6516">
                    <Phone className="mr-2 h-5 w-5" />
                    Call 214-305-6516
                  </a>
                </Button>
                <Button size="lg" variant="outline" onClick={() => setIsBookingModalOpen(true)} className="border-white text-white hover:bg-white hover:text-blue-950 px-8 py-3 rounded-full transition-all duration-300 bg-transparent">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book An Estimate
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial Quote Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                  Get Your Commercial Quote
                </h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  Tell us about your project and our team will follow up with pricing and next steps.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 sm:p-6">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                  Commercial Flooring FAQs
                </h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  What GCs, facility managers, and property owners ask us most about commercial and industrial floor coatings.
                </p>
              </div>
              <div className="space-y-4">
                {COMMERCIAL_FAQS.map((faq) => (
                  <Card key={faq.question} className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-md">
                    <CardHeader className="p-5 sm:p-6">
                      <CardTitle className="text-base sm:text-lg text-gray-900">
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 sm:p-6 pt-0 text-sm sm:text-base text-gray-700 leading-relaxed">
                      {faq.answer}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
        
        <BookingModal 
          isOpen={isBookingModalOpen} 
          onClose={() => setIsBookingModalOpen(false)} 
        />
      </div>
    </>;
};
export default Commercial;