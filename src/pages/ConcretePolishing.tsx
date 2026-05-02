import { Helmet } from "react-helmet-async";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building, Sparkles, Droplets, Recycle, CheckCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookingModal } from "@/components/landing/BookingModal";
import { StructuredData } from "@/components/seo/StructuredData";

import polishingShowroom from "@/assets/polishing-gallery-showroom.jpg";
import polishingWarehouse from "@/assets/polishing-gallery-warehouse.jpg";
import polishingOffice from "@/assets/polishing-gallery-office.webp";

const polishingFaqs = [
  {
    question: "What is mechanical concrete polishing?",
    answer: "Mechanical concrete polishing is a multi-step process that uses progressively finer diamond tooling to grind, hone, and burnish a concrete slab. Combined with lithium silicate densification, the result is a permanently hardened, dust-proof, light-reflective surface that improves over time."
  },
  {
    question: "How is polished concrete different from a coated floor?",
    answer: "Polished concrete is the existing slab itself, refined and densified — nothing is layered on top. There is no coating to peel, chip, or delaminate, which is why mechanically polished concrete is the preferred floor for warehouses, retail, and high-traffic facilities across DFW."
  },
  {
    question: "What polish levels do you offer?",
    answer: "We deliver Cream (Level 1), Salt-and-Pepper (Level 2), and Medium-Aggregate (Level 3) finishes, each with low, semi-gloss, or high-gloss sheen ratings. The right combination depends on your slab condition and aesthetic goals."
  },
  {
    question: "Can you polish concrete in occupied buildings?",
    answer: "Yes. Our densification chemistry is low-odor and our HEPA-filtered grinders run virtually dust-free, so we can polish concrete during off-hours in occupied retail, restaurant, and warehouse environments throughout Dallas-Fort Worth."
  },
  {
    question: "What FF/FL flatness can you achieve?",
    answer: "We can grind to specified FF/FL flatness numbers required by warehouse and distribution-center spec sheets, correcting high spots and improving floor flatness as part of the polishing process."
  },
  {
    question: "Which DFW cities do you serve for polished concrete?",
    answer: "We deliver mechanical concrete polishing across Dallas, Fort Worth, Plano, Frisco, McKinney, Allen, Richardson, Carrollton, Lewisville, Prosper, Celina, Sherman, Anna, Melissa, Sanger, The Colony, and Flower Mound."
  }
];


const ConcretePolishing = () => {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const applications = [{
    icon: <Building className="h-8 w-8 text-blue-600" />,
    title: "Warehouses",
    description: "Dustproof surfaces that boost lighting and cut maintenance costs."
  }, {
    icon: <Building className="h-8 w-8 text-blue-600" />,
    title: "Retail Stores",
    description: "High-gloss finish that enhances customer experience and reduces upkeep."
  }, {
    icon: <Sparkles className="h-8 w-8 text-blue-600" />,
    title: "Restaurants & Hospitality",
    description: "Stain-resistant, easy-to-clean surface ideal for food service."
  }, {
    icon: <Recycle className="h-8 w-8 text-blue-600" />,
    title: "Manufacturing",
    description: "Chemical-resistant floors built for heavy industrial use."
  }];
  const benefits = [{
    title: "Cost-Effective",
    description: "Transform existing concrete into beautiful, high-performance flooring without the need for additional materials or coatings."
  }, {
    title: "Sustainable Solution",
    description: "Eco-friendly process that utilizes existing concrete, reducing waste and environmental impact while improving performance."
  }, {
    title: "Enhanced Durability",
    description: "Densified concrete surface becomes harder, more abrasion-resistant, and less susceptible to damage and wear."
  }, {
    title: "Improved Safety",
    description: "Slip-resistant finish options available, along with better light reflectivity that enhances workplace safety and visibility."
  }];
  const polishLevels = [{
    level: "Level 1 - Cream Polish",
    description: "Light grinding and polishing for a smooth, low-sheen finish ideal for industrial applications.",
    applications: ["Warehouses", "Manufacturing facilities", "Back-of-house areas"]
  }, {
    level: "Level 2 - Salt & Pepper",
    description: "Medium grind exposing fine aggregate for moderate sheen and enhanced durability.",
    applications: ["Retail spaces", "Restaurants", "Office buildings"]
  }, {
    level: "Level 3 - Medium Aggregate",
    description: "Deeper grind exposing larger aggregate with high-gloss finish for maximum visual impact.",
    applications: ["Showrooms", "Hotels", "High-end retail spaces"]
  }];
  const features = ["Dust-free surface", "Chemical and stain resistant", "Non-slip texture options", "Enhanced light reflectivity", "Low maintenance requirements", "Long-lasting durability", "Environmentally friendly", "Cost-effective solution"];
  return <>
      <Helmet>
        <title>Concrete Polishing Dallas-Fort Worth | Legacy Industrial Coatings</title>
        <meta name="description" content="Professional concrete polishing for commercial and industrial spaces across DFW. Durable, low-maintenance polished floors." />
        <meta name="keywords" content="polished concrete Dallas, polished concrete Fort Worth, mechanical concrete polishing, concrete densification, polished concrete warehouse, retail polished concrete DFW, FF FL flatness, salt and pepper polish" />

        <meta property="og:title" content="Concrete Polishing Dallas-Fort Worth | Legacy Industrial Coatings" />
        <meta property="og:description" content="Professional concrete polishing for commercial and industrial spaces across DFW. Durable, low-maintenance polished floors." />
        <meta property="og:image" content="/lovable-uploads/14a68967-8843-4c6d-b339-dd48a8e278ae.png" />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/concrete-polishing" />
      </Helmet>

      <StructuredData
        services={[
          { name: "Mechanical Polished Concrete", description: "Diamond-ground and densified polished concrete floors for DFW commercial, retail, and warehouse facilities.", url: "/concrete-polishing" },
        ]}
        faqs={polishingFaqs}
      />

      <div className="min-h-screen bg-white">
        <HeaderGeneric />
        <main>
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-slate-100">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Professional <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Concrete Polishing</span> Services
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform existing concrete into durable, high-performance polished floors for warehouses, retail, restaurants, and more.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => navigate('/contact')} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Call Us Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" onClick={() => setShowBookingModal(true)} className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full transition-all duration-300">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book An Estimate
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-20"></div>
                <img src="/lovable-uploads/14a68967-8843-4c6d-b339-dd48a8e278ae.png" alt="Beautiful polished concrete floor" className="relative w-full h-96 object-cover rounded-2xl shadow-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Why Work With Legacy Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Work With <span className="text-blue-600">Legacy?</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Professional crews, industrial equipment, and a commitment to excellence on every project.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
                      <p className="text-gray-600">Day or night — we work around your operations to avoid disruptions.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Detail-Oriented Crews</h3>
                      <p className="text-gray-600">Clean, efficient teams that take pride in every job.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Competitive Pricing</h3>
                      <p className="text-gray-600">Fair pricing without cutting corners on quality or service.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Industrial-Grade Equipment</h3>
                      <p className="text-gray-600">Experienced technicians with professional tools deliver flawless results.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Visible Difference</h3>
                      <p className="text-gray-600">You'll see the difference in shine, safety, and speed of execution.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img src="/lovable-uploads/fee5b01c-b997-4a5e-994f-83f57fe35fbd.png" alt="Polished concrete floor in modern commercial space with reflective finish" className="w-full h-80 object-cover rounded-xl shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Perfect for Commercial Spaces
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Polished concrete is ideal for a wide range of commercial and industrial applications.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {applications.map((application, index) => <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/50">
                  <CardContent className="p-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {application.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{application.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{application.description}</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Featured Projects Gallery */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Results That <span className="text-blue-600">Speak for Themselves</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From showrooms to warehouses, we deliver flawless finishes that last.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img src={polishingShowroom} alt="High-end automotive showroom with polished concrete floors showcasing luxury vehicles" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-6 font-semibold">Luxury Automotive Showroom</p>
                </div>
              </div>
              
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img src={polishingWarehouse} alt="Industrial warehouse polished concrete with yellow safety markings" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-6 font-semibold">Industrial Warehouse</p>
                </div>
              </div>
              
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img src={polishingOffice} alt="Modern dealership office space with polished concrete flooring" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-6 font-semibold">Modern Dealership Office</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Gallery Section */}
        <section className="py-20 bg-white">
          
        </section>

        {/* Polish Levels Section */}
        

        {/* Benefits Section */}
        

        {/* Process Section */}
        

        {/* SEO Content — Polishing-only (no epoxy keywords) */}
        <section className="py-20 bg-white" aria-labelledby="polish-content-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="polish-content-heading" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-center">
              Mechanical Polished Concrete in Dallas-Fort Worth
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-5 leading-relaxed">
              <p>
                Legacy Industrial Coatings is a specialist in <strong>mechanical concrete polishing</strong> for the Dallas-Fort Worth metroplex. Our crews refine raw concrete slabs into permanently hardened, light-reflective floors using progressively finer diamond tooling — the same process specified by national retailers, distribution centers, and Class-A office developers across North Texas.
              </p>
              <p>
                Polished concrete is not a coating. It is the existing slab itself, transformed through grinding, honing, lithium-silicate <strong>densification</strong>, and burnishing. Because nothing is layered on top, there is nothing to peel, chip, or delaminate — making mechanically polished concrete the longest-lasting industrial floor available.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">The Polishing Process</h3>
              <p>
                Every job begins with diamond grinding to remove surface contamination and open the slab. We then apply a lithium-silicate densifier that chemically reacts with free calcium hydroxide to harden the concrete from the inside out. Successive passes with finer diamond resin pads bring out the chosen aggregate exposure — cream, salt-and-pepper, or medium-aggregate — followed by a final burnishing pass that locks in clarity and sheen.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">FF/FL Flatness for Warehouses</h3>
              <p>
                For DFW logistics, distribution, and manufacturing clients, we can grind to specified <strong>FF/FL flatness</strong> numbers, correcting high spots and joints to meet warehouse spec sheets. The result is a tighter, flatter slab that improves rack stability, reduces forklift wear, and extends the life of high-traffic aisles.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Where We Polish</h3>
              <p>
                Our polished concrete crews work throughout <strong>Dallas, Fort Worth, Plano, Frisco, McKinney, Allen, Richardson, Carrollton, Lewisville, Prosper, Celina, Sherman, Anna, Melissa, Sanger, The Colony, and Flower Mound</strong>. Typical projects include warehouses, distribution centers, retail stores, restaurants, breweries, showrooms, and Class-A commercial offices that need a durable, dust-free, low-maintenance floor.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Why DFW Facilities Choose Polished Concrete</h3>
              <p>
                A properly polished concrete slab reduces lifetime maintenance costs, improves indoor lighting through higher reflectivity, eliminates concrete dusting, and contributes to LEED credits through reused materials and low-VOC processes. Combined with our densification chemistry, the slab becomes harder, more abrasion-resistant, and significantly easier to clean than raw or sealed concrete.
              </p>
            </div>
          </div>
        </section>

        {/* Always-visible FAQ for AEO */}
        <section className="py-20 bg-slate-50" aria-labelledby="polish-faq-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <h2 id="polish-faq-heading" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Polished Concrete FAQ
              </h2>
              <p className="text-lg text-gray-600">
                Common questions about our DFW polished concrete services.
              </p>
            </div>
            <div className="space-y-8">
              {polishingFaqs.map((faq, i) => (
                <article key={i} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Transform Your Concrete Today
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get a free consultation and discover how polished concrete enhances your space while cutting maintenance costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/contact')} variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Call Us Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" onClick={() => setShowBookingModal(true)} className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full transition-all duration-300 bg-white/10">
                <Calendar className="mr-2 h-5 w-5" />
                Book An Estimate
              </Button>
            </div>
          </div>
        </section>

        </main>

        <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />

        <Footer />
      </div>
    </>;
};
export default ConcretePolishing;