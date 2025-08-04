import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const ServiceAreas = () => {
  const serviceAreas = [
    "Plano", "Frisco", "Dallas", "Celina", "Little Elm", "McKinney", 
    "Allen", "Prosper", "The Colony", "Aubrey", "Lewisville", "Carrollton", 
    "Richardson", "Garland", "Anna", "Melissa", "Fairview", "Parker", 
    "Princeton", "Sachse", "Wylie", "Murphy", "Farmers Branch", "North Dallas", 
    "Addison", "Hebron", "Highland Village", "Flower Mound", "Coppell",
    "Van Alstyne", "Sherman", "Denison", "Gunter", "Howe", "Blue Ridge"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">
              Service Areas
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Legacy Industrial Coatings proudly serves the Dallas-Fort Worth metroplex 
              with premium garage floor coatings and commercial flooring solutions.
            </p>
          </div>

          {/* Service Areas Grid */}
          <Card className="mb-8 sm:mb-12">
            <CardHeader className="text-center p-4 sm:p-6">
              <CardTitle className="flex items-center justify-center gap-2 text-xl sm:text-2xl">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                Cities We Serve
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {serviceAreas.map((area, index) => (
                  <div
                    key={index}
                    className="p-3 sm:p-4 bg-muted/50 rounded-lg text-center hover:bg-muted/80 transition-colors"
                  >
                    <span className="text-foreground font-medium text-sm sm:text-base">{area}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Services Overview */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Residential Services</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
                  <li>• Garage Floor Coatings</li>
                  <li>• Polyurea Floor Systems</li>
                  <li>• Decorative Concrete Finishes</li>
                  <li>• Patio & Driveway Coatings</li>
                  <li>• Basement Floor Solutions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Commercial Services</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
                  <li>• Industrial Epoxy Flooring</li>
                  <li>• Warehouse Floor Coatings</li>
                  <li>• Retail Space Flooring</li>
                  <li>• Manufacturing Floor Systems</li>
                  <li>• Healthcare & Food Grade Floors</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Contact us today for a free estimate in your area
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="/quote"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
              >
                Get Free Quote
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 border border-input text-sm sm:text-base font-medium rounded-md text-foreground bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceAreas;