import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Phone, Mail } from "lucide-react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    questionsComments: "",
    privacyPolicyAgreed: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacyPolicyAgreed) {
      toast.error("Please agree to the privacy policy to continue.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('Lead Form Subissions').insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        questions_comments: formData.questionsComments,
        privacy_policy_agreed: formData.privacyPolicyAgreed
      });

      if (error) {
        throw error;
      }

      // Send webhook notification
      try {
        await supabase.functions.invoke('send-lead-webhook', {
          body: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            questions_comments: formData.questionsComments,
            privacy_policy_agreed: formData.privacyPolicyAgreed
          }
        });
      } catch (webhookError) {
        console.error('Webhook error (non-blocking):', webhookError);
      }

      toast.success("Thank you! Your message has been sent. We'll get back to you soon.");
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        questionsComments: "",
        privacyPolicyAgreed: false
      });
    } catch (error) {
      console.error('Error submitting message:', error);
      toast.error("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Send Us a Message
        </h3>
        <p className="text-gray-600 mb-6">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
        
        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
            <a href="tel:214-305-6516" className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
              (214) 305-6516
            </a>
          </div>
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
            <a href="mailto:support@legacyindustrialcoatings.com" className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
              support@legacyindustrialcoatings.com
            </a>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="First Name*"
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            required
            className="bg-gray-50 border-gray-200 focus:border-blue-600 focus:ring-blue-600"
          />
          <Input
            type="text"
            placeholder="Last Name*"
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            required
            className="bg-gray-50 border-gray-200 focus:border-blue-600 focus:ring-blue-600"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="email"
            placeholder="Email Address*"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
            className="bg-gray-50 border-gray-200 focus:border-blue-600 focus:ring-blue-600"
          />
          <Input
            type="tel"
            placeholder="Phone Number*"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            required
            className="bg-gray-50 border-gray-200 focus:border-blue-600 focus:ring-blue-600"
          />
        </div>
        
        <Textarea
          placeholder="Your Message or Questions*"
          value={formData.questionsComments}
          onChange={(e) => setFormData(prev => ({ ...prev, questionsComments: e.target.value }))}
          required
          className="bg-gray-50 border-gray-200 focus:border-blue-600 focus:ring-blue-600 min-h-[120px]"
        />
        
        <div className="flex items-start space-x-3 text-sm text-gray-600">
          <Checkbox
            id="privacy-contact"
            checked={formData.privacyPolicyAgreed}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ ...prev, privacyPolicyAgreed: checked as boolean }))
            }
            className="mt-1"
          />
          <label htmlFor="privacy-contact" className="text-sm leading-5">
            By submitting this form, you agree to Legacy Industrial Coating's{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>{" "}
            and consent to receive phone calls and SMS messages from Legacy Industrial Coatings.
          </label>
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
};