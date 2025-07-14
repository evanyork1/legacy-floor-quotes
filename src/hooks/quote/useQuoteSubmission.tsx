
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FormData } from "@/components/quote/types";

export const useQuoteSubmission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // PHOTO_UPLOAD_BACKUP: Photo upload function commented out for faster quote process
  // const uploadPhotos = async (photos: File[], folder: string): Promise<string[]> => {
  //   const uploadedUrls: string[] = [];
  //   
  //   for (const photo of photos) {
  //     const fileExt = photo.name.split('.').pop();
  //     const fileName = `${crypto.randomUUID()}.${fileExt}`;
  //     const filePath = `${folder}/${fileName}`;

  //     const { error: uploadError } = await supabase.storage
  //       .from('quote_photos')
  //       .upload(filePath, photo);

  //     if (uploadError) {
  //       console.error('Photo upload error:', uploadError);
  //       throw new Error(`Failed to upload photo: ${uploadError.message}`);
  //     }

  //     const { data: { publicUrl } } = supabase.storage
  //       .from('quote_photos')
  //       .getPublicUrl(filePath);

  //     uploadedUrls.push(publicUrl);
  //   }

  //   return uploadedUrls;
  // };

  const handleSubmit = async (formData: FormData, estimatedPrice: number) => {
    if (isSubmitting) {
      console.log('Submission already in progress, ignoring duplicate request');
      return;
    }

    setIsSubmitting(true);
    console.log('Starting quote submission process...', formData);

    try {
      // PHOTO_UPLOAD_BACKUP: Photo upload logic commented out for faster quote process
      // Upload photos first
      let exteriorPhotoUrls: string[] = [];
      let damagePhotoUrls: string[] = [];

      // if (formData.exteriorPhotos.length > 0) {
      //   console.log('Uploading exterior photos...');
      //   exteriorPhotoUrls = await uploadPhotos(formData.exteriorPhotos, 'exterior');
      // }

      // if (formData.damagePhotos.length > 0) {
      //   console.log('Uploading damage photos...');
      //   damagePhotoUrls = await uploadPhotos(formData.damagePhotos, 'damage');
      // }

      // Determine lead source - if on landing visual page, use DFW
      const leadSource = (location.pathname === '/quotedfw' || location.pathname === '/landingvisual') ? 'DFW' : 'Houston';

      // Prepare quote data using the provided estimated price
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
        lead_source: leadSource,
        status: 'new' as const,
        archived: false
      };

      console.log('Saving quote to database...', quoteData);

      // Determine which table to save to based on lead source
      const tableName = leadSource === 'DFW' ? 'quotes_dfw' : 'quotes';

      // Save quote to database
      const { data: savedQuote, error: saveError } = await supabase
        .from(tableName)
        .insert(quoteData)
        .select()
        .single();

      if (saveError) {
        console.error('Database save error:', saveError);
        throw new Error(`Failed to save quote: ${saveError.message}`);
      }

      console.log('Quote saved successfully:', savedQuote);

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

      // Navigate to success page based on lead source
      navigate(leadSource === 'DFW' ? '/dfw' : '/houston');

    } catch (error) {
      console.error('Quote submission error:', error);
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
