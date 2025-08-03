import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LeadFormModal } from "./LeadFormModal";

export const LeadForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    questionsComments: "",
    privacyPolicyAgreed: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

      toast.success("Thank you! Your information has been submitted.");
      setShowModal(true);
      
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
      console.error('Error submitting lead:', error);
      toast.error("There was an error submitting your information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
        <CardContent className="p-6">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/a18e3648-17a6-4222-808b-0a78d3ea50b9.png" 
              alt="Legacy Industrial Coatings" 
              className="h-12 w-auto"
            />
          </div>
          
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              GET A SAME DAY QUOTE
            </h3>
            <p className="text-gray-600">
              Fill in the form below to get started!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="text"
                placeholder="First*"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                required
                className="bg-gray-100 border-0 placeholder:text-gray-500"
              />
              <Input
                type="text"
                placeholder="Last*"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                required
                className="bg-gray-100 border-0 placeholder:text-gray-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="email"
                placeholder="Email*"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="bg-gray-100 border-0 placeholder:text-gray-500"
              />
              <Input
                type="tel"
                placeholder="Phone*"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
                className="bg-gray-100 border-0 placeholder:text-gray-500"
              />
            </div>
            
            <Textarea
              placeholder="Questions / Comments*"
              value={formData.questionsComments}
              onChange={(e) => setFormData(prev => ({ ...prev, questionsComments: e.target.value }))}
              className="bg-gray-100 border-0 placeholder:text-gray-500 min-h-[100px]"
            />
            
            <div className="flex items-start space-x-3 text-sm text-gray-600">
              <Checkbox
                id="privacy"
                checked={formData.privacyPolicyAgreed}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, privacyPolicyAgreed: checked as boolean }))
                }
                className="mt-1"
              />
              <label htmlFor="privacy" className="text-xs leading-4">
                By submitting this form, you agree to Legacy Industrial Coating's{" "}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>{" "}
                and consent to receive phone calls and SMS messages from Legacy Industrial Coatings to 
                provide updates on your order and inquiries. Message frequency varies based on your 
                activity. You may opt-out by texting "STOP". Reply HELP for information. Message and 
                data rates may apply.
              </label>
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-none text-lg font-semibold"
            >
              {isSubmitting ? "Submitting..." : "SUBMIT"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <LeadFormModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
};