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

                {/* Contact Form - Full Width */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Your Free Quote</h2>
                  <LeadForm />
                </div>

                {/* Contact Information */}
                <div className="text-center mb-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                      <a 
                        href="tel:214-305-6516" 
                        className="text-base font-bold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        (214) 305-6516
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                      <a 
                        href="mailto:support@legacyindustrialcoatings.com" 
                        className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        support@legacyindustrialcoatings.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Location</h3>
                  <p className="text-gray-600">6010 W Spring Creek Parkway, Plano, TX 75024</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-80 relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3343.7160152289116!2d-96.83307428842483!3d33.0639425691567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c174291843217%3A0x32e0e382c9cbc631!2sLegacy%20Industrial%20Epoxy%20Floor%20Coating!5e0!3m2!1sen!2sus!4v1754138480849!5m2!1sen!2sus"
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