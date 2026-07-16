import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageBreadcrumbs } from '@/components/seo/PageBreadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Calculator, Clock, CreditCard } from 'lucide-react';
import { BookingModal } from '@/components/landing/BookingModal';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Financing = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { captureUtmsFromLocation, readStoredUtms } = await import("@/contexts/BookingUrlContext");
      captureUtmsFromLocation();
      const utms = readStoredUtms();
      const { error } = await supabase
        .from('Lead Form Subissions')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            questions_comments: formData.message,
            utm_source: utms.utm_source ?? null,
            utm_medium: utms.utm_medium ?? null,
            utm_campaign: utms.utm_campaign ?? null,
            landing_page: typeof window !== "undefined" ? window.location.href : null,
            referrer: typeof document !== "undefined" ? (document.referrer || null) : null,
          } as any
        ]);

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Financing Options - Legacy Industrial Coatings</title>
        <meta name="description" content="Flexible financing options for your epoxy flooring project. 12 or 24 month same as cash with 0% interest financing available." />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/financing" />
        <meta property="og:url" content="https://legacyindustrialcoatings.com/financing" />
      </Helmet>

      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "About", url: "/about" }, { name: "Financing", url: "/financing" }]} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                Flexible Financing Options
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Make your dream flooring project affordable with our convenient financing solutions
              </p>
            </div>

            {/* Wisetack Logo and Financing Info */}
            <div className="max-w-4xl mx-auto">
              <Card className="mb-8 sm:mb-12">
                <CardContent className="p-6 sm:p-8 text-center">
                  <img 
                    src="/lovable-uploads/994be15a-0952-4194-b601-0968880b1dda.png" 
                    alt="Wisetack Financing" 
                    className="h-12 sm:h-16 mx-auto mb-4 sm:mb-6"
                  loading="eager" decoding="async" fetchPriority="high" />
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                    12 or 24 Month Same as Cash
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                    0% Interest Financing Available
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="text-sm sm:text-base text-gray-700">Quick Approval</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <span className="text-sm sm:text-base text-gray-700">No Hidden Fees</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Calculator className="h-5 w-5 text-blue-600" />
                      <span className="text-sm sm:text-base text-gray-700">Easy Payments</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Example Calculation */}
              <Card className="mb-8 sm:mb-12">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 text-center">
                    Financing Example
                  </h3>
                  <div className="bg-blue-50 rounded-lg p-4 sm:p-6 border border-blue-200">
                    <div className="text-center mb-4 sm:mb-6">
                      <h4 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2">
                        Three Car Garage Epoxy Floor
                      </h4>
                      <p className="text-sm sm:text-base text-blue-700">Professional installation included</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      <div className="text-center">
                        <p className="text-sm sm:text-base text-gray-600 mb-2">Total Project Cost</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">$4,200</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm sm:text-base text-gray-600 mb-2">Monthly Payment (24 months)</p>
                        <p className="text-2xl sm:text-3xl font-bold text-blue-600">$175</p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">0% interest</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Contact Form */}
                <Card>
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                      Get More Information
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your project..."
                          rows={4}
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* CTA Section */}
                <div className="space-y-4 sm:space-y-6">
                  <Card>
                    <CardContent className="p-6 sm:p-8 text-center">
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                        Ready to Get Started?
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                        Book your free estimate today and learn more about our financing options
                      </p>
                      <Button 
                        onClick={() => setShowBookingModal(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700 mb-3 sm:mb-4"
                        size="lg"
                      >
                        Book Free Estimate
                      </Button>
                      <Button 
                        asChild
                        variant="outline"
                        className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                        size="lg"
                      >
                        <a href="tel:214-305-6516">
                          <Phone className="mr-2 h-4 w-4" />
                          Call 214-305-6516
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6 sm:p-8">
                      <h4 className="text-lg font-semibold text-blue-900 mb-3 text-center sm:text-left">
                        Why Choose Our Financing?
                      </h4>
                      <ul className="text-blue-700 space-y-2 text-sm sm:text-base">
                        <li>• Quick and easy application process</li>
                        <li>• Competitive rates and flexible terms</li>
                        <li>• No prepayment penalties</li>
                        <li>• Get started on your project today</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <BookingModal 
        isOpen={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
      />
    </>
  );
};

export default Financing;