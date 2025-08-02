import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LeadForm } from "@/components/landing/LeadForm";
import { LandingMinimalFooter } from "@/components/landing/LandingMinimalFooter";
import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Legacy Industrial Coatings | DFW Epoxy Flooring</title>
        <meta name="description" content="Contact Legacy Industrial Coatings for your epoxy flooring needs in Dallas-Fort Worth. Get a free quote today!" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="pt-20">
          {/* Contact Section */}
          <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                    Contact{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                      Legacy Industrial Coatings
                    </span>
                  </h1>
                  <p className="text-lg text-gray-600">
                    Ready to transform your floors? Get in touch with our experts today.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Contact Form */}
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Your Free Quote</h2>
                    <LeadForm />
                  </div>

                  {/* Contact Info & Map */}
                  <div className="space-y-8">
                    {/* Contact Information */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                          <a 
                            href="tel:214-305-6516" 
                            className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors"
                          >
                            (214) 305-6516
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                          <a 
                            href="mailto:support@legacyindustrialcoatings.com" 
                            className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors break-all"
                          >
                            support@legacyindustrialcoatings.com
                          </a>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                          <span className="text-lg font-bold text-gray-900">
                            6010 W Spring Creek Parkway, Plano, TX 75024
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Map */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="h-64 relative">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.8264982837387!2d-96.8244!3d33.0198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c3c5b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2s6010%20W%20Spring%20Creek%20Pkwy%2C%20Plano%2C%20TX%2075024!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Legacy Industrial Coatings Location"
                          className="absolute inset-0"
                        ></iframe>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <h4 className="font-semibold text-gray-900">Legacy Industrial Coatings</h4>
                        <p className="text-sm text-gray-600">6010 W Spring Creek Parkway, Plano, TX 75024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <LandingMinimalFooter />
      </div>
    </>
  );
};

export default Contact;