
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
  const totalSteps = 5;
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const { mutate: submitQuote } = useMutation({
    mutationFn: async (dataToSubmit: FormData) => {
        // CRITICAL: Check if this is being called from a DFW page
        const isDFWPage = window.location.pathname.includes('/quotedfw') || window.location.pathname.includes('/dfw');
        const activeDFWSubmission = sessionStorage.getItem('ACTIVE_DFW_SUBMISSION');
        
        if (isDFWPage || activeDFWSubmission) {
          console.error("🚫 Houston navigation submission blocked - DFW context detected");
          throw new Error("Houston submission blocked on DFW page");
        }
        
        const exterior_photos: string[] = [];
        const damage_photos: string[] = [];
        
        const price = calculatePrice();
        const uniqueSubmissionId = `HOUSTON_NAV_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

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
            lead_source: 'Houston', // Force Houston
            submission_id: uniqueSubmissionId
        };

        console.log(`💾 Houston navigation saving to quotes table - ID: ${uniqueSubmissionId}`);

        const { data: insertedQuote, error } = await supabase
            .from('quotes')
            .insert(quotePayload)
            .select()
            .single();

        if (error) {
            console.error(`❌ Houston navigation save error for ID ${uniqueSubmissionId}:`, error);
            throw error;
        }

        console.log(`✅ Houston navigation saved successfully - ID: ${uniqueSubmissionId}`);

        // Trigger webhook after successful database insertion
        try {
            console.log('🟢 Triggering Houston navigation webhook...');
            const { error: webhookError } = await supabase.functions.invoke('send-quote-webhook', {
                body: insertedQuote
            });

            if (webhookError) {
                console.error('🟠 Houston navigation webhook error:', webhookError);
            } else {
                console.log('✅ Houston navigation webhook triggered successfully');
            }
        } catch (webhookError) {
            console.error('🔴 Houston navigation webhook call failed:', webhookError);
        }

        return insertedQuote;
    },
    onSuccess: () => {
        toast({
            title: "Quote Submitted!",
            description: "We'll call you within 60 minutes to confirm.",
        });
        setCurrentStep(5);
    },
    onError: (error) => {
        console.error('🔴 Houston navigation submission error:', error);
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
            // Submit to database when moving from step 4 to step 5
            submitQuote(formData);
        } else if (currentStep === 1 && formData.garageType !== "custom") {
            setCurrentStep(3); // Skip step 2 if garageType is not custom
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
      case 3: return formData.colorChoice !== "";
      case 4: {
        const allFieldsFilled = formData.name !== "" && formData.email !== "" && formData.phone !== "" && formData.zipCode !== "";
        
        if (!allFieldsFilled) return false;
        
        const phoneDigits = formData.phone.replace(/\D/g, '');
        const phoneValid = phoneDigits.length === 10;
        
        const emailValid = formData.email.includes('@');
        
        const zipDigits = formData.zipCode.replace(/\D/g, '');
        const zipValid = zipDigits.length === 5;
        
        return phoneValid && emailValid && zipValid;
      }
      case 5: return true;
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
