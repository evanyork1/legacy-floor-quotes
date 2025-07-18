
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { FormData } from "@/components/quote/types";

export const useQuoteNavigation = (
  formData: FormData,
  calculatePrice: () => number
) => {
  // CRITICAL: IMMEDIATE URL-BASED BLOCKING - Check before any other logic
  const currentPath = window.location.pathname;
  const isDFWPath = currentPath.includes('/quotedfw') || currentPath.includes('/dfw');
  
  if (isDFWPath) {
    console.error("🚫 HOUSTON NAVIGATION HOOK BLOCKED - DFW PATH DETECTED:", currentPath);
    throw new Error("Houston navigation hook cannot be used on DFW paths");
  }

  // ADDITIONAL SESSION STORAGE CHECKS
  const activeDFWSubmission = sessionStorage.getItem('ACTIVE_DFW_SUBMISSION');
  const blockHouston = sessionStorage.getItem('BLOCK_HOUSTON_SUBMISSION');
  const submissionType = sessionStorage.getItem('SUBMISSION_TYPE');
  
  if (activeDFWSubmission || blockHouston === 'true' || submissionType === 'DFW_ONLY') {
    console.error("🚫 HOUSTON NAVIGATION HOOK BLOCKED - DFW SESSION ACTIVE");
    throw new Error("Houston navigation hook blocked - DFW session active");
  }

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const { mutate: submitQuote } = useMutation({
    mutationFn: async (dataToSubmit: FormData) => {
        // TRIPLE CHECK: Ensure no DFW context before submission
        const currentPathCheck = window.location.pathname;
        const isDFWCheck = currentPathCheck.includes('/quotedfw') || currentPathCheck.includes('/dfw');
        const dfwSessionCheck = sessionStorage.getItem('ACTIVE_DFW_SUBMISSION') || 
                               sessionStorage.getItem('BLOCK_HOUSTON_SUBMISSION') === 'true' ||
                               sessionStorage.getItem('SUBMISSION_TYPE') === 'DFW_ONLY';
        
        if (isDFWCheck || dfwSessionCheck) {
          console.error("🚫 Houston navigation submission ABSOLUTELY BLOCKED");
          console.error("  - Path check:", isDFWCheck, currentPathCheck);
          console.error("  - Session check:", dfwSessionCheck);
          throw new Error("Houston submission blocked - DFW context detected");
        }
        
        const exterior_photos: string[] = [];
        const damage_photos: string[] = [];
        
        const price = calculatePrice();
        const uniqueSubmissionId = `HOUSTON_NAV_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        console.log(`💾 CONFIRMED Houston navigation saving - ID: ${uniqueSubmissionId}`);

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
            lead_source: 'Houston',
            submission_id: uniqueSubmissionId
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
            // FINAL CHECK: Absolutely ensure this is not DFW context
            const finalPathCheck = window.location.pathname;
            const finalDFWCheck = finalPathCheck.includes('/quotedfw') || finalPathCheck.includes('/dfw');
            const finalSessionCheck = sessionStorage.getItem('ACTIVE_DFW_SUBMISSION') || 
                                    sessionStorage.getItem('BLOCK_HOUSTON_SUBMISSION') === 'true';
            
            if (finalDFWCheck || finalSessionCheck) {
                console.log("🚫 Houston auto-submission BLOCKED - DFW context detected at final step");
                setCurrentStep(5);
                return;
            }
            
            console.log("✅ Houston auto-submission proceeding - confirmed Houston context");
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
