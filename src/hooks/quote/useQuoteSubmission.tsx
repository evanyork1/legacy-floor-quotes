
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FormData } from "@/components/quote/types";

export const useQuoteSubmission = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploadPhotos = async (photos: File[], folder: string): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    
    console.log(`Starting upload of ${photos.length} photos to ${folder} folder`);
    
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      try {
        const fileExt = photo.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        console.log(`Uploading photo ${i + 1}/${photos.length}: ${fileName}`);

        const { error: uploadError } = await supabase.storage
          .from('quote_photos')
          .upload(filePath, photo);

        if (uploadError) {
          console.error(`Photo upload error for ${fileName}:`, uploadError);
          throw new Error(`Failed to upload photo ${fileName}: ${uploadError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('quote_photos')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
        console.log(`Successfully uploaded photo ${i + 1}/${photos.length}`);
      } catch (error) {
        console.error(`Error uploading photo ${i + 1}:`, error);
        // Continue with other photos instead of failing completely
        continue;
      }
    }

    console.log(`Upload complete: ${uploadedUrls.length}/${photos.length} photos uploaded successfully`);
    return uploadedUrls;
  };

  const calculateEstimatedPrice = (formData: FormData): number => {
    // Get pricing based on garage type
    if (formData.garageType === '2-car') {
      return 3400;
    } else if (formData.garageType === '3-car') {
      return 5200;
    } else if (formData.garageType === '4-car') {
      return 7200;
    } else if (formData.garageType === 'custom' && formData.customSqft) {
      const sqft = parseInt(formData.customSqft);
      return sqft * 8; // $8 per sq ft default
    }
    return 0;
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    console.log('Starting quote submission process...', formData);

    try {
      // Upload photos with graceful failure handling
      let exteriorPhotoUrls: string[] = [];
      let damagePhotoUrls: string[] = [];
      let photoUploadWarnings: string[] = [];

      if (formData.exteriorPhotos && formData.exteriorPhotos.length > 0) {
        console.log('Uploading exterior photos...');
        try {
          exteriorPhotoUrls = await uploadPhotos(formData.exteriorPhotos, 'exterior');
          if (exteriorPhotoUrls.length < formData.exteriorPhotos.length) {
            photoUploadWarnings.push(`Only ${exteriorPhotoUrls.length}/${formData.exteriorPhotos.length} exterior photos uploaded successfully`);
          }
        } catch (error) {
          console.error('Exterior photo upload failed completely:', error);
          photoUploadWarnings.push('Exterior photo upload failed');
        }
      }

      if (formData.damagePhotos && formData.damagePhotos.length > 0) {
        console.log('Uploading damage photos...');
        try {
          damagePhotoUrls = await uploadPhotos(formData.damagePhotos, 'damage');
          if (damagePhotoUrls.length < formData.damagePhotos.length) {
            photoUploadWarnings.push(`Only ${damagePhotoUrls.length}/${formData.damagePhotos.length} damage photos uploaded successfully`);
          }
        } catch (error) {
          console.error('Damage photo upload failed completely:', error);
          photoUploadWarnings.push('Damage photo upload failed');
        }
      }

      // Calculate estimated price
      const estimatedPrice = calculateEstimatedPrice(formData);
      console.log('Calculated estimated price:', estimatedPrice);

      // Prepare quote data
      const quoteData = {
        garage_type: formData.garageType,
        custom_sqft: formData.garageType === 'custom' && formData.customSqft ? parseInt(formData.customSqft) : null,
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
        archived: false
      };

      console.log('Saving quote to database...', quoteData);

      // Save quote to database
      const { data: savedQuote, error: saveError } = await supabase
        .from('quotes')
        .insert(quoteData)
        .select()
        .single();

      if (saveError) {
        console.error('Database save error:', saveError);
        throw new Error(`Failed to save quote: ${saveError.message}`);
      }

      console.log('Quote saved successfully:', savedQuote);

      // Trigger webhook with better error handling
      console.log('Triggering webhook...');
      try {
        const { error: webhookError } = await supabase.functions.invoke('send-quote-webhook', {
          body: savedQuote
        });

        if (webhookError) {
          console.error('Webhook error:', webhookError);
        } else {
          console.log('Webhook triggered successfully');
        }
      } catch (webhookError) {
        console.error('Webhook call failed:', webhookError);
      }

      // Show success message with any warnings
      let successMessage = "We've received your quote and will contact you soon.";
      if (photoUploadWarnings.length > 0) {
        successMessage += ` Note: ${photoUploadWarnings.join(', ')}.`;
      }

      toast({
        title: "Quote Submitted Successfully!",
        description: successMessage,
      });

      // Navigate to success page
      navigate('/');

    } catch (error) {
      console.error('Quote submission error:', error);
      
      // Provide more specific error messages
      let errorMessage = "Failed to submit quote. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes('upload')) {
          errorMessage = "Failed to upload photos. Please try with smaller images or fewer photos.";
        } else if (error.message.includes('save')) {
          errorMessage = "Failed to save quote to database. Please check your internet connection and try again.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Submission Failed",
        description: errorMessage,
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
