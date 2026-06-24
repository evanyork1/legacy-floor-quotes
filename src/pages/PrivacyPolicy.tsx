import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Legacy Industrial Coatings</title>
        <meta 
          name="description" 
          content="Legacy Industrial Coatings Privacy Policy. Learn how we collect, use, and safeguard your information."
        />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/privacy" />
        <meta property="og:url" content="https://legacyindustrialcoatings.com/privacy" />
      </Helmet>
      
      <div className="min-h-screen bg-background py-8 sm:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-primary">Privacy Policy</h1>
              </div>

              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  <strong>Legacy Industrial Coatings - Privacy Policy</strong> This Privacy Policy explains how we collect, use, and safeguard your information.
                </p>
                
                <p>
                  <strong>1. COMMUNICATION</strong> By providing your phone number, you consent to receive text messages about scheduling, job updates, and follow-ups.
                </p>
                
                <p>
                  <strong>2. DATA COLLECTION</strong> We collect names, contact information, addresses, and payment information to provide and manage our services.
                </p>
                
                <p>
                  <strong>3. DATA STORAGE</strong> Your data is securely stored and only accessible to authorized staff. We do not sell your information.
                </p>
                
                <p>
                  <strong>4. PAYMENTS</strong> We store a card on file for post-installation balance. All transactions are encrypted.
                </p>
                
                <p>
                  <strong>5. THIRD PARTIES</strong> We do not share your personal information with outside parties except as necessary to fulfill our service.
                </p>
                
                <p>
                  <strong>6. OPT-OUT</strong> To stop receiving texts, reply STOP at any time. For email, click unsubscribe or contact us.
                </p>
                
                <p>
                  <strong>7. YOUR RIGHTS</strong> You may request access, correction, or deletion of your data by contacting us directly.
                </p>
                
                <p className="text-right italic">
                  Effective August 2025
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;