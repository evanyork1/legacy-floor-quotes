
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FormData } from "@/components/quote/types";

export const useQuoteSubmission = (explicitLeadSource?: string) => {
  console.log("🔍 useQuoteSubmission called with explicitLeadSource:", explicitLeadSource);
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
      console.log('🚫 Submission already in progress, ignoring duplicate request');
      return;
    }
    
    // Add a small delay to prevent double submissions - UNIFIED KEY FOR ALL HOOKS
    const submissionKey = `${formData.email}-${estimatedPrice}`;
    const existingSubmission = sessionStorage.getItem('lastQuoteSubmission');
    
    if (existingSubmission && (Date.now() - parseInt(existingSubmission) < 5000)) {
      console.log('🚫 Houston: Preventing duplicate submission within 5 seconds');
      return;
    }
    
    sessionStorage.setItem('lastQuoteSubmission', Date.now().toString());

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

      // BULLETPROOF DFW DETECTION - ABSOLUTE FORCE
      console.log("🔍 INCOMING explicitLeadSource:", explicitLeadSource);
      console.log("🔍 typeof explicitLeadSource:", typeof explicitLeadSource);
      console.log("🔍 explicitLeadSource === 'DFW':", explicitLeadSource === 'DFW');
      
      const currentPath = window.location.pathname;
      
      // ABSOLUTE FORCE: If explicitLeadSource is "DFW", force DFW behavior
      const forceDFW = explicitLeadSource === 'DFW';
      const pathContainsDFW = currentPath.includes('quotedfw') || currentPath.includes('dfw');
      const isDFW = forceDFW || pathContainsDFW;
      const leadSource = isDFW ? 'DFW' : 'Houston';
      
      console.log("🔍 BULLETPROOF DFW DETECTION:");
      console.log("  - window.location.pathname:", window.location.pathname);
      console.log("  - location.pathname:", location.pathname);
      console.log("  - includes 'quotedfw':", currentPath.includes('quotedfw'));
      console.log("  - includes 'dfw':", currentPath.includes('dfw'));
      console.log("  - explicitLeadSource:", explicitLeadSource);
      console.log("  - isDFW result:", isDFW);
      console.log("🎯 FINAL LEAD SOURCE:", leadSource);

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

      // Determine table and verify data before save
      const tableName = leadSource === 'DFW' ? 'quotes_dfw' : 'quotes';
      
      console.log("🔍 PRE-SAVE VERIFICATION:");
      console.log("  - leadSource in quoteData:", quoteData.lead_source);
      console.log("  - target table:", tableName);
      console.log("  - full quoteData:", JSON.stringify(quoteData, null, 2));
      
      if (leadSource === 'DFW') {
        console.log("🎯 CONFIRMED: SAVING TO quotes_dfw TABLE");
      } else {
        console.log("🎯 CONFIRMED: SAVING TO quotes TABLE");
      }

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
      navigate(leadSource === 'DFW' ? '/dfwreslanding' : '/houstonreslanding');

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
