import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CTAButton } from "@/components/ui/cta-button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Shield, Clock, Sparkles, Lightbulb, Wind, Building2, Wrench, Phone } from "lucide-react";
import { useState } from "react";
import { CommercialContactModal } from "@/components/commercial/CommercialContactModal";
import heroImage from "@/assets/polished-concrete-showroom.jpg";
import serviceImage from "@/assets/service-bay.jpg";

export default function WarehousePolishing() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const benefits = [
    {
      icon: Shield,
      title: "Heavy-Duty Durability",
      description: "Withstands forklifts, pallet jacks, and constant heavy traffic without cracking or deteriorating."
    },
    {
      icon: Lightbulb,
      title: "Enhanced Lighting Efficiency",
      description: "High-gloss reflective finish reduces lighting costs by up to 30% and improves visibility."
    },
    {
      icon: Sparkles,
      title: "Easy Maintenance",
      description: "Simple cleaning with dust mop and occasional damp mopping—no waxing or coating required."
    },
    {
      icon: Wind,
      title: "Dust-Free Surface",
      description: "Densified concrete eliminates concrete dusting, improving air quality and reducing cleanup time."
    },
    {
      icon: Building2,
      title: "Professional Appearance",
      description: "Polished floors create a clean, modern look that enhances tenant and client perception."
    },
    {
      icon: Clock,
      title: "Long-Term Value",
      description: "Decades of service life with minimal maintenance—one of the most cost-effective flooring options."
    }
  ];

  const whyChoose = [
    {
      title: "10+ Years of Commercial Experience",
      description: "Extensive expertise in industrial and commercial concrete polishing with hundreds of successful warehouse projects."
    },
    {
      title: "Trusted by GCs & Property Managers",
      description: "We partner with general contractors, property managers, and warehouse owners across Texas for reliable results."
    },
    {
      title: "Flexible Scheduling Options",
      description: "Daytime or nighttime crews available to minimize disruption to your operations and meet tight deadlines."
    },
    {
      title: "Competitive Pricing",
      description: "Fair, transparent pricing with detailed estimates and no hidden costs—maximizing your ROI."
    },
    {
      title: "Spotless Job Sites",
      description: "Dust-free equipment and meticulous cleanup ensure your facility stays operational and professional."
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Surface Preparation & Grinding",
      description: "We use industrial diamond grinders to remove surface imperfections and expose the concrete aggregate for optimal bonding."
    },
    {
      number: "02",
      title: "Densifying Treatment",
      description: "A liquid hardener penetrates deep into the concrete, creating a rock-hard, dense surface that resists wear."
    },
    {
      number: "03",
      title: "Progressive Polishing",
      description: "Multiple polishing passes with increasingly fine diamond pads create a glass-like finish with your desired gloss level."
    },
    {
      number: "04",
      title: "Sealing & Protection",
      description: "Optional stain-resistant sealer adds extra protection and makes maintenance even easier for high-traffic areas."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Warehouse Polished Concrete Flooring | Legacy Commercial Floors Texas</title>
        <meta 
          name="description" 
          content="Legacy Commercial Floors provides durable, high-performance polished concrete floors for warehouses across Texas. Flexible scheduling, clean job sites, and unbeatable results." 
        />
        <meta 
          name="keywords" 
          content="warehouse polished concrete, warehouse floor polishing, industrial concrete polishing, Dallas warehouse floors, commercial floor polishing Texas, warehouse flooring contractor, polished concrete Texas" 
        />
        <meta property="og:title" content="Warehouse Polished Concrete Flooring | Legacy Commercial Floors" />
        <meta property="og:description" content="Durable, clean warehouse floors built to last. Professional polished concrete for heavy traffic and industrial use." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/warehousepolishing" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/20" />
            
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Content */}
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-tight">
                    Durable, Clean, and Built to Last
                  </h1>
                  <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                    Warehouse polished concrete floors that stand up to heavy traffic, forklifts, and long hours of operation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <CTAButton
                      onClick={() => setIsContactModalOpen(true)}
                      variant="primary"
                      size="lg"
                      icon={<Phone />}
                      fullWidthMobile={true}
                    >
                      Request a Quote
                    </CTAButton>
                    <CTAButton
                      onClick={() => window.location.href = 'tel:9724233696'}
                      variant="outline"
                      size="lg"
                      icon={<Phone />}
                      fullWidthMobile={true}
                    >
                      Call (972) 423-3696
                    </CTAButton>
                  </div>
                </div>

                {/* Right Image */}
                <div className="relative block">
                  <div className="relative rounded-xl overflow-hidden shadow-xl">
                    <img
                      src={heroImage}
                      alt="Professional warehouse polished concrete flooring"
                      className="w-full h-[250px] sm:h-[350px] lg:h-[400px] object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 ring-1 ring-white/10 rounded-xl pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Legacy Section */}
          <section className="py-12 sm:py-16 lg:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
                  Why Choose Legacy Commercial Floors
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                  The trusted partner for warehouse owners, property managers, and general contractors across Texas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {whyChoose.map((item, index) => (
                  <Card key={index} className="hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <CheckCircle2 className="w-6 h-6 text-primary mr-4 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-secondary/30 to-background">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
                  Benefits of Polished Concrete for Warehouses
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                  The ultimate flooring solution for high-performance industrial and warehouse environments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <Card key={index} className="hover:shadow-xl transition-all">
                      <CardContent className="p-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                          <IconComponent className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-foreground">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-12 sm:py-16 lg:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
                  Our Professional Process
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                  Minimal downtime, dust-free equipment, and exceptional results every time.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
                {processSteps.map((step, index) => (
                  <Card key={index} className="hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-5xl font-bold text-primary/20 flex-shrink-0">
                          {step.number}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-10 sm:mt-12 text-center">
                <Card className="max-w-3xl mx-auto bg-primary/5 border-primary/20">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                      <Wrench className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                      <div className="text-left">
                        <h3 className="text-xl font-bold mb-2 text-foreground">Dust-Free & Minimal Disruption</h3>
                        <p className="text-muted-foreground">
                          Our advanced equipment captures 99% of dust during grinding and polishing, keeping your warehouse operational and your team safe throughout the entire process.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Photo Gallery Section */}
          <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-secondary/30 to-background">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
                  See the Transformation
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                  Real warehouse projects showcasing the durability and beauty of polished concrete.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="relative rounded-xl overflow-hidden shadow-xl group">
                  <img
                    src={heroImage}
                    alt="Large warehouse with newly polished concrete floors"
                    className="w-full h-[300px] sm:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-white text-xl font-bold">200,000 sq ft Warehouse</h3>
                    <p className="text-white/90 text-sm">Dallas, TX - Completed in 3 weeks</p>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden shadow-xl group">
                  <img
                    src={serviceImage}
                    alt="Industrial warehouse polished concrete with high-gloss finish"
                    className="w-full h-[300px] sm:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-white text-xl font-bold">Distribution Center</h3>
                    <p className="text-white/90 text-sm">Fort Worth, TX - High-traffic floor solution</p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8 sm:mt-10">
                <CTAButton
                  onClick={() => window.location.href = '/gallery'}
                  variant="outline"
                  size="lg"
                >
                  View Full Gallery
                </CTAButton>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
            <div className="container mx-auto px-4 sm:px-6">
              <Card className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border-primary/20 shadow-2xl">
                <CardContent className="p-8 sm:p-12 text-center">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
                    Ready to Transform Your Warehouse?
                  </h2>
                  <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
                    Get a free quote and site walkthrough. Let's discuss your project timeline, scope, and how we can deliver exceptional results.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <CTAButton
                      onClick={() => setIsContactModalOpen(true)}
                      variant="primary"
                      size="lg"
                      icon={<Phone />}
                      fullWidthMobile={true}
                    >
                      Schedule a Walkthrough
                    </CTAButton>
                    <CTAButton
                      onClick={() => window.location.href = 'tel:9724233696'}
                      variant="outline"
                      size="lg"
                      icon={<Phone />}
                      fullWidthMobile={true}
                    >
                      Call (972) 423-3696
                    </CTAButton>
                  </div>
                  <p className="text-sm text-muted-foreground mt-6">
                    Serving warehouse facilities across Dallas, Fort Worth, and all of North Texas
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <CommercialContactModal 
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </>
  );
}
