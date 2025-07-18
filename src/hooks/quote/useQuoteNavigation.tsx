
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";
import type { FormData } from "@/components/quote/types";

export const useQuoteNavigation = (
  formData: FormData,
  calculatePrice: () => number
) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const { mutate: submitQuote } = useMutation({
    mutationFn: async (dataToSubmit: FormData) => {
        // Validate required fields
        if (!dataToSubmit.name || !dataToSubmit.email || !dataToSubmit.phone || !dataToSubmit.garageType || !dataToSubmit.colorChoice || !dataToSubmit.zipCode) {
          throw new Error("Missing required fields");
        }

        const exterior_photos: string[] = [];
        const damage_photos: string[] = [];
        
        const price = calculatePrice();
        const uniqueSubmissionId = `HOUSTON_NAV_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        console.log(`💾 Houston navigation saving - ID: ${uniqueSubmissionId}`);

        const quotePayload = {
            garage_type: dataToSubmit.garageType,
            custom_sqft: dataToSubmit.customSqft ? parseInt(dataToSubmit.customSqft) : null,
            space_type: dataToSubmit.spaceType,
            other_space_type: dataToSubmit.otherSpaceType,
            color_choice: dataToSubmit.colorChoice,
            name: dataToSubmit.name.trim(),
            email: dataToSubmit.email.trim(),
            phone: dataToSubmit.phone.trim(),
            zip_code: dataToSubmit.zipCode.trim(),
            estimated_price: price,
            exterior_photos,
            damage_photos,
            status: 'new',
            lead_source: 'Houston',
            archived: false
        };

        const { data: insertedQuote, error } = await supabase
            .from('quotes')
            .insert(quotePayload)
            .select()
            .single();

        if (error) {
            console.error(`❌ Houston navigation save error:`, error);
            throw error;
        }

        console.log(`✅ Houston navigation saved successfully to quotes table`);

        // Trigger Houston webhook
        try {
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
            console.log("✅ Houston auto-submission proceeding");
            submitQuote(formData);
        } else if (currentStep === 1 && formData.garageType !== "custom") {
            setCurrentStep(3);
        } else {
            setCurrentStep(currentStep + 1);
        }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
        if (currentStep === 3 && formData.garageType !== "custom") {
            setCurrentStep(1);
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
