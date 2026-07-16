import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LeadFormModal } from "./LeadFormModal";
import { captureUtmsFromLocation, readStoredUtms } from "@/contexts/BookingUrlContext";
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
      captureUtmsFromLocation();
      const utms = readStoredUtms();
      const {
        error
      } = await supabase.from('Lead Form Subissions').insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        questions_comments: formData.questionsComments,
        privacy_policy_agreed: formData.privacyPolicyAgreed,
        utm_source: utms.utm_source ?? null,
        utm_medium: utms.utm_medium ?? null,
        utm_campaign: utms.utm_campaign ?? null,
        landing_page: typeof window !== "undefined" ? window.location.href : null,
        referrer: typeof document !== "undefined" ? (document.referrer || null) : null,
      });
      if (error) {
        throw error;
      }
      toast.success("Thank you! Your information has been submitted.");
      setShowModal(true);

      // Track contact form submission
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag("event", "contact_form");
      }

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
  return <>
      <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
        <CardContent className="p-4 sm:p-5 md:p-6">
          {/* Logo */}
          <div className="flex justify-center mb-4 md:mb-6">
            <img src="/lovable-uploads/a18e3648-17a6-4222-808b-0a78d3ea50b9.png" alt="Legacy Industrial Coatings" className="h-10 sm:h-12 w-auto"  loading="lazy" decoding="async" />
          </div>
          
          <div className="text-center mb-4 md:mb-6">
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Get Your Same Day Estimate</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Fill in the form below to get started!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <Input type="text" placeholder="John" value={formData.firstName} onChange={e => setFormData(prev => ({
              ...prev,
              firstName: e.target.value
            }))} required className="bg-gray-100 border-0 placeholder:text-gray-500 text-sm md:text-base" />
              <Input type="text" placeholder="Smith" value={formData.lastName} onChange={e => setFormData(prev => ({
              ...prev,
              lastName: e.target.value
            }))} required className="bg-gray-100 border-0 placeholder:text-gray-500 text-sm md:text-base" />
            </div>
            
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <Input type="email" placeholder="john@smith.com" value={formData.email} onChange={e => setFormData(prev => ({
              ...prev,
              email: e.target.value
            }))} required className="bg-gray-100 border-0 placeholder:text-gray-500 text-sm md:text-base" />
              <Input type="tel" placeholder="214-555-0184" value={formData.phone} onChange={e => setFormData(prev => ({
              ...prev,
              phone: e.target.value
            }))} required className="bg-gray-100 border-0 placeholder:text-gray-500 text-sm md:text-base" />
            </div>
            
            <Textarea placeholder="we need an epoxy estimate for a 100,000 sq ft manufacturing facility" value={formData.questionsComments} onChange={e => setFormData(prev => ({
            ...prev,
            questionsComments: e.target.value
          }))} className="bg-gray-100 border-0 placeholder:text-gray-500 min-h-[80px] md:min-h-[100px] text-sm md:text-base" />
            
            <div className="flex items-start space-x-2 md:space-x-3 text-sm text-gray-600">
              <Checkbox id="privacy" checked={formData.privacyPolicyAgreed} onCheckedChange={checked => setFormData(prev => ({
              ...prev,
              privacyPolicyAgreed: checked as boolean
            }))} className="mt-1" />
              <label htmlFor="privacy" className="text-[10px] sm:text-xs leading-tight sm:leading-4">
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
            
            <div className="flex justify-center pt-2">
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-64 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 md:px-8 rounded-none text-base md:text-lg font-semibold">
                {isSubmitting ? "Submitting..." : "Request Info"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <LeadFormModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>;
};