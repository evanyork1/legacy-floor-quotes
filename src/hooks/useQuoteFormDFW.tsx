
import { useQuoteFormData } from "./quote/useQuoteFormData";
import { useQuoteNavigation } from "./quote/useQuoteNavigation";
import { useQuoteFileHandling } from "./quote/useQuoteFileHandling";
import { useQuotePricing } from "./quote/useQuotePricing";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FormData } from "@/components/quote/types";

export const useQuoteFormDFW = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { formData, updateFormData } = useQuoteFormData();
  const { calculatePrice } = useQuotePricing(formData);
  
  const { currentStep, totalSteps, nextStep, prevStep, canProceed } = useQuoteNavigation(
    formData,
    calculatePrice
  );

  const { handleFileUpload, removePhoto } = useQuoteFileHandling(formData, updateFormData);

  const handleSubmit = async () => {
    if (isSubmitting) {
      console.log('DFW submission already in progress, ignoring duplicate request');
      return;
    }

    setIsSubmitting(true);
    console.log('Starting DFW quote submission process...', formData);

    try {
      const estimatedPrice = calculatePrice();
      
      // Prepare quote data specifically for DFW - hardcoded to ensure correct routing
      const dfwQuoteData = {
        garage_type: formData.garageType,
        custom_sqft: formData.garageType === 'custom' ? parseInt(formData.customSqft) : null,
        space_type: formData.spaceType || null,
        other_space_type: formData.otherSpaceType || null,
        exterior_photos: [], // Photos disabled for now
        damage_photos: [], // Photos disabled for now
        color_choice: formData.colorChoice,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        zip_code: formData.zipCode,
        estimated_price: estimatedPrice,
        lead_source: 'DFW', // Hardcoded for DFW
        status: 'new' as const,
        archived: false
      };

      console.log('Saving DFW quote to quotes_dfw table...', dfwQuoteData);

      // Save quote to DFW-specific table
      const { data: savedQuote, error: saveError } = await supabase
        .from('quotes_dfw')
        .insert(dfwQuoteData)
        .select()
        .single();

      if (saveError) {
        console.error('DFW database save error:', saveError);
        throw new Error(`Failed to save DFW quote: ${saveError.message}`);
      }

      console.log('DFW quote saved successfully:', savedQuote);

      // Trigger webhook for DFW quote
      console.log('Triggering DFW webhook...');
      try {
        const { error: webhookError } = await supabase.functions.invoke('send-quote-webhook', {
          body: savedQuote
        });

        if (webhookError) {
          console.error('DFW webhook error:', webhookError);
          toast({
            title: "Quote Submitted",
            description: "Your DFW quote was saved but email notification may be delayed.",
          });
        } else {
          console.log('DFW webhook triggered successfully');
          toast({
            title: "Quote Submitted Successfully!",
            description: "We've received your DFW quote and will contact you soon.",
          });
        }
      } catch (webhookError) {
        console.error('DFW webhook call failed:', webhookError);
        toast({
          title: "Quote Submitted",
          description: "Your DFW quote was saved but email notification may be delayed.",
        });
      }

      // Navigate to DFW success page
      navigate('/dfw');

    } catch (error) {
      console.error('DFW quote submission error:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Failed to submit DFW quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    totalSteps,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    handleFileUpload,
    removePhoto,
    calculatePrice,
    canProceed,
    handleSubmit,
    isSubmitting
  };
};
