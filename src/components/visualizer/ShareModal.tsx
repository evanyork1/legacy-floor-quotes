import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Download, Send } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  transformedImage: string;
}

const formSchema = z.object({
  fullName: z.string().min(2, "Name required"),
  phone: z.string().regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Please enter a valid phone number"),
  email: z.string().email("Valid email required")
});

type FormValues = z.infer<typeof formSchema>;

export const ShareModal = ({ isOpen, onClose, onDownload, transformedImage }: ShareModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  const handleDownloadClick = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const nameParts = values.fullName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || firstName;

      // Insert to Lead Form Subissions table
      await supabase
        .from('Lead Form Subissions')
        .insert({
          first_name: firstName,
          last_name: lastName,
          email: values.email,
          phone: values.phone,
          questions_comments: 'Floor Visualizer - Download',
          privacy_policy_agreed: true
        });

      // Track analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'visualizer_download', {
          event_category: 'Floor Visualizer',
          event_label: 'Download'
        });
      }

      onDownload();
      toast.success('Downloading your visualization!');
      reset();
      onClose();
    } catch (error) {
      console.error('Error saving lead:', error);
      toast.error('Failed to process. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendClick = async (values: FormValues) => {
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
          questions_comments: 'Floor Visualizer - Send',
          privacy_policy_agreed: true
        });

      if (insertError) throw insertError;

      // Track analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'visualizer_send', {
          event_category: 'Floor Visualizer',
          event_label: 'Send'
        });
      }

      toast.success('Your visualization will be sent to your email!');
      reset();
      onClose();
    } catch (error) {
      console.error('Error sending visualization:', error);
      toast.error('Failed to send. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-gray-900">
            Share Your Visualization
          </DialogTitle>
        </DialogHeader>
        
        <form className="space-y-4">
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
              placeholder="(555) 123-4567"
              {...register("phone")}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
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

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              onClick={handleSubmit(handleDownloadClick)}
              disabled={isSubmitting}
              className="flex-1"
              variant="outline"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Download className="h-4 w-4 mr-2" />}
              Download
            </Button>
            <Button
              type="button"
              onClick={handleSubmit(handleSendClick)}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
              Send
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
