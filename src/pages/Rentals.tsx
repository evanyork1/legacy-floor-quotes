import { Helmet } from "react-helmet-async";
import HeaderGeneric from "@/components/HeaderGeneric";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Truck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import promasterVan from "@/assets/promaster-van.jpg";
import fordTrailer from "@/assets/ford-f250-trailer.jpg";
import vacuumRental from "@/assets/vacuum-rental.jpg";
import lavinaGrinder from "@/assets/lavina-grinder.jpg";

const Rentals = () => {
  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion('tel:2143056516');
    }
  };

  return (
    <>
      <Helmet>
        <title>Equipment Rental - Legacy Industrial Coatings</title>
        <meta 
          name="description" 
          content="Rent professional floor grinding equipment, vehicles, vacuums, and tools. Lavina grinders, ProMaster van, F250 with trailer available in Dallas-Fort Worth." 
        />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <HeaderGeneric />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16 sm:py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  Equipment Rental Services
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                  Professional-grade equipment for concrete coating contractors
                </p>
                <Button 
                  asChild 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handlePhoneClick}
                >
                  <a href="tel:2143056516" className="inline-flex items-center">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (214) 305-6516
                  </a>
                </Button>
              </div>
            </div>
          </section>

          {/* Floor Grinders Section */}
          <section className="py-16 sm:py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                    Professional Grinding Equipment
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Lavina Grinders, Vacuums, and more
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 max-w-4xl mx-auto">
                  <div className="rounded-lg overflow-hidden shadow-lg bg-white">
                    <img 
                      src={lavinaGrinder} 
                      alt="Lavina 30G Elite Floor Grinder" 
                      className="w-full h-auto object-contain"
                    loading="eager" decoding="async" fetchPriority="high" />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg bg-white">
                    <img 
                      src={vacuumRental} 
                      alt="Industrial Vacuum for Dust Collection" 
                      className="w-full h-auto object-contain"
                     loading="lazy" decoding="async" />
                  </div>
                </div>

                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Grinder Rental Pricing</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Scroll horizontally to view all pricing options</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto -mx-2 sm:mx-0">
                      <div className="inline-block min-w-full align-middle">
                        <table className="w-full min-w-[500px]">
                          <thead>
                            <tr className="border-b-2 border-primary">
                              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-sm sm:text-base">Model</th>
                              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-sm sm:text-base">Day</th>
                              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-sm sm:text-base">Week</th>
                              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-sm sm:text-base">4 Weeks</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-border bg-primary/5">
                              <td className="py-2 sm:py-3 px-2 sm:px-4">
                                <div className="font-semibold text-sm sm:text-base">Lavina 25GE</div>
                                <div className="text-xs sm:text-sm text-muted-foreground">L25GE-R</div>
                              </td>
                              <td className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-primary text-sm sm:text-base">$500</td>
                              <td className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-primary text-sm sm:text-base">$1,500</td>
                              <td className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-primary text-sm sm:text-base">$2,570</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="py-2 sm:py-3 px-2 sm:px-4">
                                <div className="font-semibold text-sm sm:text-base">Lavina 30GE</div>
                                <div className="text-xs sm:text-sm text-muted-foreground">L30GE-R</div>
                              </td>
                              <td className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-primary text-sm sm:text-base">$600</td>
                              <td className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-primary text-sm sm:text-base">$1,800</td>
                              <td className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-primary text-sm sm:text-base">$3,084</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Why Rent Equipment Section */}
          <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
                  Why Rent Equipment?
                </h2>
                <p className="text-lg text-muted-foreground mb-12 text-center">
                  Contractors choose to rent equipment rather than buy it for several reasons:
                </p>

                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl">Cost Savings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        By renting, contractors don't need to make the significant initial investment, freeing up money for other priorities that may take precedent at the time. Additionally, they can avoid maintenance expenses.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl">Logistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        For many, owning a large amount of machines or tools may not be possible due to storage limitations. Renting allows access to professional equipment without the space requirements.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl">Infrequent Use</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        Due to the type of work a contractor does, it might not make sense for them to own a range of equipment and/or tools. For example, for a contractor who rarely does polishing jobs, storing a polisher isn't the best use of space.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl">Testing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        For a contractor who is considering adding a new service to their repertoire, they may want to test out the equipment first before making such a huge purchase.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Vehicle Rentals Section */}
          <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <Truck className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                    Vehicle Rentals
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Transport equipment and materials with our professional vehicles
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl">Ram ProMaster 2500</CardTitle>
                      <CardDescription className="text-sm">High-roof cargo van for equipment transport</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={promasterVan} 
                          alt="Ram ProMaster 2500 Cargo Van" 
                          className="w-full h-48 sm:h-64 object-cover"
                         loading="lazy" decoding="async" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                        $400<span className="text-base sm:text-lg text-muted-foreground">/day</span>
                      </div>
                      <ul className="space-y-1 sm:space-y-2 text-muted-foreground text-sm sm:text-base">
                        <li>• High-roof design for tall equipment</li>
                        <li>• 159" wheelbase for maximum cargo space</li>
                        <li>• Perfect for transporting grinders and tools</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl">Ford F-250 + Trailer</CardTitle>
                      <CardDescription className="text-sm">Heavy-duty truck with enclosed trailer</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={fordTrailer} 
                          alt="Ford F-250 with Enclosed Trailer" 
                          className="w-full h-48 sm:h-64 object-cover"
                         loading="lazy" decoding="async" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                        $500<span className="text-base sm:text-lg text-muted-foreground">/day</span>
                      </div>
                      <ul className="space-y-1 sm:space-y-2 text-muted-foreground text-sm sm:text-base">
                        <li>• Heavy-duty towing capacity</li>
                        <li>• Large enclosed trailer included</li>
                        <li>• Ideal for multiple equipment transport</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Equipment Section */}
          <section className="py-16 sm:py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <Wrench className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                    Additional Equipment
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Complete your project with our full range of tools and equipment
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Tools & Equipment Available</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-3 gap-6">
                      <div className="text-center p-6 rounded-lg bg-muted/50">
                        <h3 className="font-bold text-lg mb-2">Industrial Vacuums</h3>
                        <p className="text-muted-foreground text-sm">
                          High-powered dust collection systems for grinding operations
                        </p>
                      </div>
                      <div className="text-center p-6 rounded-lg bg-muted/50">
                        <h3 className="font-bold text-lg mb-2">Generators</h3>
                        <p className="text-muted-foreground text-sm">
                          Portable power solutions for on-site work
                        </p>
                      </div>
                      <div className="text-center p-6 rounded-lg bg-muted/50">
                        <h3 className="font-bold text-lg mb-2">Hand Grinders</h3>
                        <p className="text-muted-foreground text-sm">
                          Small tools for detail work and edge grinding
                        </p>
                      </div>
                    </div>
                    <div className="mt-8 p-6 bg-primary/5 rounded-lg text-center">
                      <p className="text-lg mb-4">
                        Call us for pricing and availability on all equipment
                      </p>
                      <Button 
                        asChild 
                        size="lg"
                        onClick={handlePhoneClick}
                      >
                        <a href="tel:2143056516" className="inline-flex items-center">
                          <Phone className="mr-2 h-5 w-5" />
                          (214) 305-6516
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Rent Equipment?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Contact us today to check availability and reserve your rental
              </p>
              <Button 
                asChild 
                size="lg"
                variant="secondary"
                onClick={handlePhoneClick}
              >
                <a href="tel:2143056516" className="inline-flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (214) 305-6516
                </a>
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Rentals;
