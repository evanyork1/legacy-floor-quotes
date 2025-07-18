import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { FormData } from "@/components/quote/types";

export const useQuoteNavigation = (
  formData: FormData,
  calculatePrice: () => number
) => {
  const [currentStep, setCurrentStep] = useState(1);
  // PHOTO_UPLOAD_BACKUP: Original was totalSteps = 7
  const totalSteps = 5; // Reduced from 7 to skip photo upload steps (3&4)
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const { mutate: submitQuote } = useMutation({
    mutationFn: async (dataToSubmit: FormData) => {
        // PHOTO_UPLOAD_BACKUP: Photo upload logic commented out for faster quote process
        // const uploadFile = async (file: File) => {
        //     const fileName = `${crypto.randomUUID()}-${file.name}`;
        //     const { error: uploadError } = await supabase.storage.from('quote_photos').upload(fileName, file);
        //     if (uploadError) throw uploadError;
        //     const { data: urlData } = supabase.storage.from('quote_photos').getPublicUrl(fileName);
        //     return urlData.publicUrl;
        // };

        // const exterior_photos = await Promise.all(dataToSubmit.exteriorPhotos.map(uploadFile));
        // const damage_photos = await Promise.all(dataToSubmit.damagePhotos.map(uploadFile));
        const exterior_photos: string[] = [];
        const damage_photos: string[] = [];
        
        const price = calculatePrice();

        const quotePayload = {
            garage_type: dataToSubmit.garageType,
            custom_sqft: dataToSubmit.customSqft ? parseInt(dataToSubmit.customSqft) : null,
            space_type: dataToSubmit.spaceType,
            other_space_type: dataToSubmit.otherSpaceType,
            color_choice: dataToSubmit.colorChoice,
            name: dataToSubmit.name,
            email: dataToSubmit.email,
            phone: dataToSubmit.phone,
            zip_code: dataToSubmit.zipCode,
            estimated_price: price,
            exterior_photos,
            damage_photos,
            status: 'new',
        };

        const { data: insertedQuote, error } = await supabase
            .from('quotes')
            .insert(quotePayload)
            .select()
            .single();

        if (error) {
            throw error;
        }

        // Trigger webhook after successful database insertion
        try {
            console.log('Triggering webhook for quote:', insertedQuote.id);
            const { error: webhookError } = await supabase.functions.invoke('send-quote-webhook', {
                body: insertedQuote
            });

            if (webhookError) {
                console.error('Webhook error:', webhookError);
                // Don't throw here - we still want the quote submission to succeed
                // even if the webhook fails
            } else {
                console.log('Webhook triggered successfully');
            }
        } catch (webhookError) {
            console.error('Error triggering webhook:', webhookError);
            // Continue without failing the quote submission
        }

        return insertedQuote;
    },
    onSuccess: () => {
        toast({
            title: "Quote Submitted!",
            description: "We'll call you within 60 minutes to confirm.",
        });
        setCurrentStep(5); // Was step 7, now step 5
    },
    onError: (error) => {
        console.error('Error submitting quote:', error);
        toast({
            title: "Submission Failed",
            description: "There was an error submitting your quote. Please try again.",
            variant: "destructive",
        });
    },
  });

  const nextStep = () => {
    if (currentStep < totalSteps) {
        if (currentStep === 4) {
            // Submit to database when moving from step 4 to step 5 (was step 6 to 7)
            submitQuote(formData);
        } else if (currentStep === 1 && formData.garageType !== "custom") {
            setCurrentStep(3); // Skip step 2 if garageType is not custom, go to color choice (was step 5, now step 3)
        } else {
            setCurrentStep(currentStep + 1);
        }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
        if (currentStep === 3 && formData.garageType !== "custom") {
            setCurrentStep(1); // Skip back to step 1 if garageType is not custom
        } else {
            setCurrentStep(currentStep - 1);
        }
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.garageType !== "";
      case 2: return formData.customSqft !== "" && formData.spaceType !== "";
      // PHOTO_UPLOAD_BACKUP: Steps 3&4 were photo uploads, now removed
      // case 3: return true; // Exterior photos
      // case 4: return true; // Damage photos
      case 3: return formData.colorChoice !== ""; // Was step 5, now step 3
      case 4: { // Was step 6, now step 4
        // Check that all fields are filled
        const allFieldsFilled = formData.name !== "" && formData.email !== "" && formData.phone !== "" && formData.zipCode !== "";
        
        if (!allFieldsFilled) return false;
        
        // Validate phone (10 digits)
        const phoneDigits = formData.phone.replace(/\D/g, '');
        const phoneValid = phoneDigits.length === 10;
        
        // Validate email (contains @)
        const emailValid = formData.email.includes('@');
        
        // Validate zip code (5 digits)
        const zipDigits = formData.zipCode.replace(/\D/g, '');
        const zipValid = zipDigits.length === 5;
        
        return phoneValid && emailValid && zipValid;
      }
      case 5: return true; // Was step 7, now step 5
      default: return false;
    }
  };

  return {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    canProceed,
    setCurrentStep
  };
};
