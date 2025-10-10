import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CTAButton } from "@/components/ui/cta-button";
import { Phone, ArrowRight } from "lucide-react";
import { useState } from "react";
import { CommercialContactModal } from "@/components/commercial/CommercialContactModal";
import heroImage from "@/assets/polished-concrete-showroom.jpg";
import serviceImage from "@/assets/service-bay.jpg";

export default function WarehousePolishing() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative min-h-[85vh] flex items-center overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={heroImage}
                alt="Industrial warehouse with polished concrete flooring"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <div className="max-w-3xl">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                  Industrial-Grade Polished Concrete for Warehouses
                </h1>
                <p className="text-xl sm:text-2xl text-white/90 mb-4 leading-relaxed font-light">
                  Cut your lighting costs by 30%. Eliminate floor maintenance. Handle 10,000+ lbs of rolling load.
                </p>
                <p className="text-lg text-white/80 mb-8 max-w-2xl">
                  We transform warehouse concrete into mirror-finish surfaces that last 20+ years with virtually zero maintenance—while your facility stays operational.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <CTAButton
                    onClick={() => setIsContactModalOpen(true)}
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight />}
                    fullWidthMobile={true}
                  >
                    Get Free Site Assessment
                  </CTAButton>
                  <CTAButton
                    onClick={() => window.location.href = 'tel:9724233696'}
                    variant="outline"
                    size="lg"
                    icon={<Phone />}
                    fullWidthMobile={true}
                    className="border-white text-white hover:bg-white hover:text-background"
                  >
                    (972) 423-3696
                  </CTAButton>
                </div>
              </div>
            </div>
          </section>

          {/* ROI Section */}
          <section className="py-20 lg:py-28 bg-background">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                  The Numbers Speak for Themselves
                </h2>
                <p className="text-xl text-muted-foreground">
                  Polished concrete isn't just durable—it's the most cost-effective warehouse flooring investment you'll make.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
                <div className="text-center">
                  <div className="text-6xl lg:text-7xl font-bold text-primary mb-4">30%</div>
                  <div className="text-xl font-semibold text-foreground mb-2">Lower Energy Costs</div>
                  <p className="text-muted-foreground">Reflective surface reduces lighting requirements significantly</p>
                </div>
                <div className="text-center">
                  <div className="text-6xl lg:text-7xl font-bold text-primary mb-4">20+</div>
                  <div className="text-xl font-semibold text-foreground mb-2">Years Lifespan</div>
                  <p className="text-muted-foreground">Outlasts epoxy, tile, and other industrial flooring by decades</p>
                </div>
                <div className="text-center">
                  <div className="text-6xl lg:text-7xl font-bold text-primary mb-4">$0</div>
                  <div className="text-xl font-semibold text-foreground mb-2">Maintenance Budget</div>
                  <p className="text-muted-foreground">No waxing, no stripping, no recoating—ever</p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Legacy Section */}
          <section className="py-20 lg:py-28 bg-secondary/30">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
                <div>
                  <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
                    Why Property Managers & GCs Choose Legacy
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    We've polished over 2 million square feet of warehouse concrete across Texas. Our crews understand the stakes—missed deadlines cost you money, and poor workmanship costs you even more.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">Weekend & Night Crews Available</h3>
                        <p className="text-muted-foreground">Keep your operation running while we work around your schedule</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">99% Dust-Free Process</h3>
                        <p className="text-muted-foreground">HEPA-filtered equipment keeps your warehouse operational during installation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">Fixed-Price Guarantees</h3>
                        <p className="text-muted-foreground">Transparent pricing with no change orders or hidden fees</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">10+ Years in Commercial</h3>
                        <p className="text-muted-foreground">Trusted by Fortune 500 companies and regional property management firms</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <img
                    src={serviceImage}
                    alt="Warehouse with polished concrete floors"
                    className="w-full h-[500px] object-cover rounded-lg shadow-2xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-20 lg:py-28 bg-background">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
                  From Dull Concrete to Mirror Finish in 3-5 Days
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our streamlined process minimizes downtime while delivering a floor that outperforms epoxy and tile.
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-12">
                <div className="flex gap-6 items-start">
                  <div className="text-4xl font-bold text-primary flex-shrink-0">01</div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">Diamond Grinding & Surface Prep</h3>
                    <p className="text-lg text-muted-foreground">
                      Industrial diamond tooling removes surface contaminants, old coatings, and imperfections. We expose the aggregate and level the surface to create the ideal foundation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="text-4xl font-bold text-primary flex-shrink-0">02</div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">Densification Treatment</h3>
                    <p className="text-lg text-muted-foreground">
                      Lithium-based hardener penetrates deep into the concrete pores, chemically reacting to create a densified, rock-hard surface that can handle extreme loads.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="text-4xl font-bold text-primary flex-shrink-0">03</div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">Multi-Stage Polishing</h3>
                    <p className="text-lg text-muted-foreground">
                      Progressive diamond pad refinement (50 grit to 3000 grit) creates a glass-like, reflective surface with your choice of gloss level—from satin to mirror finish.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="text-4xl font-bold text-primary flex-shrink-0">04</div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">Optional Guard Treatment</h3>
                    <p className="text-lg text-muted-foreground">
                      For high-traffic or chemically exposed areas, we apply a penetrating guard that adds stain resistance while maintaining the natural look and breathability of polished concrete.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Proof Section */}
          <section className="py-20 lg:py-28 bg-secondary/30">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
                    Recent Warehouse Projects
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Over 2 million sq ft polished across Texas in the last 3 years
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="relative overflow-hidden rounded-lg shadow-xl group">
                    <img
                      src={heroImage}
                      alt="Completed warehouse floor polishing project"
                      className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="text-white text-sm font-semibold mb-2 uppercase tracking-wider">Distribution Center</div>
                      <h3 className="text-white text-2xl font-bold mb-2">185,000 sq ft • Dallas, TX</h3>
                      <p className="text-white/90">Completed ahead of schedule with zero operational downtime</p>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-lg shadow-xl group">
                    <img
                      src={serviceImage}
                      alt="High-gloss warehouse floor installation"
                      className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="text-white text-sm font-semibold mb-2 uppercase tracking-wider">Manufacturing Facility</div>
                      <h3 className="text-white text-2xl font-bold mb-2">240,000 sq ft • Fort Worth, TX</h3>
                      <p className="text-white/90">Heavy forklift traffic, chemical exposure—still flawless after 5 years</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-20 lg:py-28 bg-background">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                  Let's Walk Your Warehouse
                </h2>
                <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
                  Free site assessment. Fixed-price quote within 48 hours. No pressure, no games.
                </p>
                <p className="text-lg text-muted-foreground mb-10">
                  We'll evaluate your concrete condition, discuss timeline requirements, and show you exactly what to expect—down to the square foot cost.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <CTAButton
                    onClick={() => setIsContactModalOpen(true)}
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight />}
                    fullWidthMobile={true}
                  >
                    Schedule Free Assessment
                  </CTAButton>
                  <CTAButton
                    onClick={() => window.location.href = 'tel:9724233696'}
                    variant="outline"
                    size="lg"
                    icon={<Phone />}
                    fullWidthMobile={true}
                  >
                    (972) 423-3696
                  </CTAButton>
                </div>
                <p className="text-sm text-muted-foreground mt-8">
                  Serving Dallas, Fort Worth, and all of North Texas • Licensed & Insured • Weekend crews available
                </p>
              </div>
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
