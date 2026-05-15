import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Phone } from "lucide-react";

interface SimpleLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SimpleLeadModal = ({ isOpen, onClose }: SimpleLeadModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const BOOKING_URL =
    "https://clienthub.getjobber.com/hubs/e7849464-5cd3-44cf-8cf8-c1fd5e2eb2fb/public/requests/2372073/new?utm_source=website";

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
          questions_comments: notes ? `Same day estimate request | Notes: ${notes}` : 'Same day estimate request'
        });

      if (error) throw error;

      // Show success modal instead of closing
      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
    setShowSuccess(false);
    onClose();
  };

  // Show success modal with call/book options
  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-gray-900">
              Thank You for Submitting!
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 text-center">
            <p className="text-gray-600">
              We will reach out within 2 hours! Want to schedule your estimate faster?
            </p>
            
            <div className="space-y-3">
              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              >
                <a href="tel:214-305-6516">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us Now: 214-305-6516
                </a>
              </Button>
              
              <Button
                onClick={() => {
                  window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
                  handleClose();
                }}
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                Schedule Estimate Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Show initial form
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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

          <div>
            <Label htmlFor="notes">Additional Info / Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any details about your garage or project..."
              className="resize-none"
              rows={3}
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
