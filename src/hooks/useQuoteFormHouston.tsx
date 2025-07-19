
import { useQuoteFormData } from "./quote/useQuoteFormData";
import { useQuoteNavigation } from "./quote/useQuoteNavigation";
import { useQuoteFileHandling } from "./quote/useQuoteFileHandling";
import { useQuotePricing } from "./quote/useQuotePricing";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useQuoteFormHouston = () => {
  const { formData, updateFormData } = useQuoteFormData();
  const { calculatePrice } = useQuotePricing(formData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { currentStep, totalSteps, nextStep, prevStep, canProceed } = useQuoteNavigation(
    formData,
    calculatePrice
  );

  const { handleFileUpload, removePhoto } = useQuoteFileHandling(formData, updateFormData);

  const { mutate: submitQuote } = useMutation({
    mutationFn: async (dataToSubmit: typeof formData) => {
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
        exterior_photos: [],
        damage_photos: [],
        status: 'new',
        lead_source: 'Houston',
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
        console.log('Triggering webhook for Houston quote:', insertedQuote.id);
        const { error: webhookError } = await supabase.functions.invoke('send-quote-webhook', {
          body: insertedQuote
        });

        if (webhookError) {
          console.error('Webhook error:', webhookError);
        } else {
          console.log('Webhook triggered successfully');
        }
      } catch (webhookError) {
        console.error('Error triggering webhook:', webhookError);
      }

      return insertedQuote;
    },
    onSuccess: () => {
      toast({
        title: "Quote Submitted!",
        description: "We'll call you within 60 minutes to confirm.",
      });
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error('Error submitting Houston quote:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your quote. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const handleSubmit = () => {
    setIsSubmitting(true);
    submitQuote(formData);
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
