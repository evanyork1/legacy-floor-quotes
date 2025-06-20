
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FormData } from "@/components/quote/types";

export const useQuoteSubmissionDFW = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploadPhotos = async (photos: File[], folder: string): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    
    for (const photo of photos) {
      const fileExt = photo.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('quote_photos')
        .upload(filePath, photo);

      if (uploadError) {
        console.error('Photo upload error:', uploadError);
        throw new Error(`Failed to upload photo: ${uploadError.message}`);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('quote_photos')
        .getPublicUrl(filePath);

      uploadedUrls.push(publicUrl);
    }

    return uploadedUrls;
  };

  const handleSubmit = async (formData: FormData, estimatedPrice: number) => {
    if (isSubmitting) {
      console.log('Submission already in progress, ignoring duplicate request');
      return;
    }

    setIsSubmitting(true);
    console.log('Starting DFW quote submission process...', formData);

    try {
      // Upload photos first
      let exteriorPhotoUrls: string[] = [];
      let damagePhotoUrls: string[] = [];

      if (formData.exteriorPhotos.length > 0) {
        console.log('Uploading exterior photos...');
        exteriorPhotoUrls = await uploadPhotos(formData.exteriorPhotos, 'exterior');
      }

      if (formData.damagePhotos.length > 0) {
        console.log('Uploading damage photos...');
        damagePhotoUrls = await uploadPhotos(formData.damagePhotos, 'damage');
      }

      // Prepare quote data for DFW table
      const quoteData = {
        garage_type: formData.garageType,
        custom_sqft: formData.garageType === 'custom' ? parseInt(formData.customSqft) : null,
        space_type: formData.spaceType || null,
        other_space_type: formData.otherSpaceType || null,
        exterior_photos: exteriorPhotoUrls.length > 0 ? exteriorPhotoUrls : null,
        damage_photos: damagePhotoUrls.length > 0 ? damagePhotoUrls : null,
        color_choice: formData.colorChoice,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        zip_code: formData.zipCode,
        estimated_price: estimatedPrice,
        status: 'new' as const,
        archived: false,
        lead_source: 'DFW'
      };

      console.log('Saving DFW quote to database...', quoteData);

      // Save quote to DFW database table
      const { data: savedQuote, error: saveError } = await supabase
        .from('quotes_dfw')
        .insert(quoteData)
        .select()
        .single();

      if (saveError) {
        console.error('Database save error:', saveError);
        throw new Error(`Failed to save quote: ${saveError.message}`);
      }

      console.log('DFW Quote saved successfully:', savedQuote);

      // Trigger webhook
      console.log('Triggering webhook...');
      try {
        const { error: webhookError } = await supabase.functions.invoke('send-quote-webhook', {
          body: savedQuote
        });

        if (webhookError) {
          console.error('Webhook error:', webhookError);
          // Don't fail the whole submission if webhook fails, just log it
          toast({
            title: "Quote Submitted",
            description: "Your quote was saved but email notification may be delayed.",
          });
        } else {
          console.log('Webhook triggered successfully');
          toast({
            title: "Quote Submitted Successfully!",
            description: "We've received your quote and will contact you soon.",
          });
        }
      } catch (webhookError) {
        console.error('Webhook call failed:', webhookError);
        // Still show success since quote was saved
        toast({
          title: "Quote Submitted",
          description: "Your quote was saved but email notification may be delayed.",
        });
      }

      // Navigate to success page
      navigate('/dfw');

    } catch (error) {
      console.error('DFW Quote submission error:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Failed to submit quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting
  };
};
