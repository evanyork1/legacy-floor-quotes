import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SimpleLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SimpleLeadModal = ({ isOpen, onClose }: SimpleLeadModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !email) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Split name into first and last
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Submit to Supabase
      const { error } = await supabase
        .from('Lead Form Subissions')
        .insert({
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          privacy_policy_agreed: true,
          questions_comments: 'Facebook landing page - Same day estimate request'
        });

      if (error) throw error;

      // Send webhook
      await supabase.functions.invoke('send-lead-webhook', {
        body: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          privacy_policy_agreed: true,
          questions_comments: 'Facebook landing page - Same day estimate request'
        }
      });

      toast.success("Thank you! We'll contact you shortly for your same-day estimate.");
      
      // Reset form and close modal
      setName("");
      setPhone("");
      setEmail("");
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Get Your Same Day Estimate
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Get My Free Estimate"}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By submitting, you agree to receive calls and texts about your estimate.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
