import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - Legacy Industrial Coatings</title>
        <meta 
          name="description" 
          content="Legacy Industrial Coatings Terms & Conditions. Read our terms for deposits, cancellations, installation, and warranties."
        />
        <link rel="canonical" href="https://legacyindustrialcoatings.com/terms" />
        <meta property="og:url" content="https://legacyindustrialcoatings.com/terms" />
      </Helmet>
      
      <div className="min-h-screen bg-background py-8 sm:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-primary">Terms & Conditions</h1>
              </div>

              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  <strong>Legacy Industrial Coatings - Terms & Conditions</strong> 
                </p>
                
                <p>
                  <strong>1. DEPOSIT POLICY</strong> If a job is not completed within 30 days of deposit, 50% becomes non-refundable.
                </p>
                
                <p>
                  <strong>2. CARD ON FILE</strong> Customer agrees to save a card on file. Remaining balance will be charged upon job completion after final confirmation.
                </p>
                
                <p>
                  <strong>3. CANCELLATIONS</strong> Jobs cancelled less than 7 days before installation will incur a 20% fee. Financed job deposits are non-refundable.
                </p>
                
                <p>
                  <strong>4. SURFACE SLIP WARNING</strong> Epoxy/polyurea coatings can be slippery when wet. Slip-resistant additives available at additional cost. Legacy is not responsible for slips or falls.
                </p>
                
                <p>
                  <strong>5. CRACKS & SUBSTRATE</strong> Cracks may return due to settling or stress. Crack repairs and substrate failures are not covered under warranty.
                </p>
                
                <p>
                  <strong>6. EXPANSION JOINTS</strong> Filling expansion joints is not recommended and may show post installation.
                </p>
                
                <p>
                  <strong>7. DUST NOTICE</strong> Industrial vacuums are used but some dust may escape. Customer must protect or remove valuable items before install.
                </p>
                
                <p>
                  <strong>8. WARRANTY</strong> See warranty on our website. By proceeding, you agree to those terms.
                </p>
                
                <p>
                  <strong>9. FLOOR IMPERFECTIONS</strong> Our coating may not cover or fix existing imperfections. No guarantee of surface perfection.
                </p>
                
                <p>
                  <strong>10. DAY OF INSTALL</strong> Customer must clear all belongings. $500 fee applies if crew must wait/return. Property access must be available.
                </p>
                
                <p>
                  <strong>11. WEATHER</strong> We may reschedule due to weather conditions without penalty.
                </p>
                
                <p>
                  <strong>12. RETURN TO USE</strong> 12 hrs: Light traffic. 24 hrs: Full use. Customer is liable for damage if used earlier.
                </p>
                
                <p>
                  <strong>13. SMS TERMS OF SERVICE</strong> By opting into SMS from a web form or other medium, you are agreeing to receive SMS messages from Legacy Industrial Coatings. This includes SMS messages for conversations (external). Message frequency varies. Message and data rates may apply. See privacy policy at https://preview--legacy-floor-quotes.lovable.app/privacy. Message HELP for help. Reply STOP to any message to opt out.
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

export default TermsAndConditions;