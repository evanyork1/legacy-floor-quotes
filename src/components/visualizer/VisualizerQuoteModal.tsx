import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface VisualizerQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const formSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  garageSize: z.string().min(1, "Please select a garage size")
});

type FormValues = z.infer<typeof formSchema>;

export const VisualizerQuoteModal = ({ isOpen, onClose, onSuccess }: VisualizerQuoteModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  const garageSize = watch("garageSize");

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const nameParts = values.fullName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || firstName;

      // Insert to Lead Form Subissions table
      const { error: insertError } = await supabase
        .from('Lead Form Subissions')
        .insert({
          first_name: firstName,
          last_name: lastName,
          email: values.email,
          phone: values.phone,
          questions_comments: `Floor Visualizer Lead - ${values.garageSize}`,
          privacy_policy_agreed: true
        });

      if (insertError) throw insertError;

      // Call webhook
      await supabase.functions.invoke('send-lead-webhook', {
        body: {
          first_name: firstName,
          last_name: lastName,
          email: values.email,
          phone: values.phone,
          questions_comments: `Floor Visualizer Lead - ${values.garageSize}`,
          privacy_policy_agreed: true
        }
      });

      // Track analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'Floor Visualizer',
          event_label: 'Quote Request'
        });
      }

      toast.success('Quote request submitted!');
      onSuccess();
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-gray-900">
            Get Your Quote
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Fill out the form below and we'll get back to you with a custom quote
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              {...register("fullName")}
              disabled={isSubmitting}
            />
            {errors.fullName && (
              <p className="text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(214) 305-6516"
              {...register("phone")}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="garageSize">Garage Size</Label>
            <Select
              value={garageSize}
              onValueChange={(value) => setValue("garageSize", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select garage size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2-Car Garage">2-Car Garage</SelectItem>
                <SelectItem value="3-Car Garage">3-Car Garage</SelectItem>
                <SelectItem value="4-Car Garage">4-Car Garage</SelectItem>
                <SelectItem value="Other Space">Other Space</SelectItem>
              </SelectContent>
            </Select>
            {errors.garageSize && (
              <p className="text-sm text-red-600">{errors.garageSize.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Quote Request'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};