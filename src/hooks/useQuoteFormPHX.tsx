import { useQuoteFormData } from "./quote/useQuoteFormData";
import { useQuoteNavigation } from "./quote/useQuoteNavigation";
import { useQuotePricing } from "./quote/useQuotePricing";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useQuoteFormPHX = () => {
  const { formData, updateFormData } = useQuoteFormData();
  const { calculatePrice } = useQuotePricing(formData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { mutate: submitQuote } = useMutation({
    mutationFn: async (dataToSubmit: typeof formData) => {
      console.log('Starting PHX quote submission...', dataToSubmit);
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
        status: 'new',
        lead_source: 'PHX',
        archived: false
      };

      console.log('PHX quote payload:', quotePayload);

      const { data: insertedQuote, error } = await supabase
        .from('dfwquotes')
        .insert(quotePayload)
        .select()
        .single();

      if (error) {
        console.error('PHX quote submission error:', error);
        throw error;
      }

      console.log('PHX quote saved successfully:', insertedQuote);
      
      // Call PHX webhook directly after successful submission
      try {
        const webhookUrl = 'https://hooks.zapier.com/hooks/catch/18144828/22zccye/';
        const webhookPayload = {
          id: insertedQuote.id,
          name: insertedQuote.name,
          email: insertedQuote.email,
          phone: insertedQuote.phone,
          zip_code: insertedQuote.zip_code,
          garage_type: insertedQuote.garage_type,
          custom_sqft: insertedQuote.custom_sqft,
          space_type: insertedQuote.space_type,
          other_space_type: insertedQuote.other_space_type,
          color_choice: insertedQuote.color_choice,
          estimated_price: insertedQuote.estimated_price,
          lead_source: insertedQuote.lead_source,
          created_at: insertedQuote.created_at
        };

        console.log('Calling PHX webhook:', webhookUrl, webhookPayload);
        
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
          body: JSON.stringify(webhookPayload),
        });
        
        console.log('PHX webhook called successfully');
      } catch (webhookError) {
        console.error('Webhook call failed but quote was saved:', webhookError);
        // Don't throw error - quote was saved successfully
      }

      return insertedQuote;
    },
    onSuccess: () => {
      console.log('PHX quote submission completed successfully');
      toast({
        title: "Quote Submitted!",
        description: "We'll call you within 60 minutes to confirm.",
      });
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error('Error submitting PHX quote:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your quote. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const handleSubmit = () => {
    console.log('PHX quote handleSubmit called');
    setIsSubmitting(true);
    submitQuote(formData);
  };

  const {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    canProceed
  } = useQuoteNavigation(
    formData,
    calculatePrice,
    handleSubmit
  );

  return {
    currentStep,
    totalSteps,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    calculatePrice,
    canProceed,
    handleSubmit,
    isSubmitting
  };
};
