import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
const Footer = () => {
  return <footer className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img src="/lovable-uploads/de4de16e-71f2-4d7d-822d-5532d41f72cd.png" alt="Legacy Industrial Coatings" className="h-40 w-auto brightness-0 invert-0 " />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The only company you need for premium warranty floors. We handle everything - 
              payments, scheduling, installation coordination, and warranty service.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-gray-300">info@legacycoatings.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-gray-300">1-800-COATING</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-gray-300">Nationwide Service</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/quote" className="text-gray-300 hover:text-blue-400 transition-colors">Get Quote</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="/apply" className="text-gray-300 hover:text-blue-400 transition-colors">Become an Installer</a></li>
              <li><a href="/warranty" className="text-gray-300 hover:text-blue-400 transition-colors">Warranty Info</a></li>
              <li><a href="/portal" className="text-gray-300 hover:text-blue-400 transition-colors">Customer Portal</a></li>
            </ul>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <form className="space-y-4">
                  <Input placeholder="Your Name" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
                  <Input type="email" placeholder="Your Email" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
                  <Textarea placeholder="Your Message" rows={3} className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Legacy Industrial Coatings. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;