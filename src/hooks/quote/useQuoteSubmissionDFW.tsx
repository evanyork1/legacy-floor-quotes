import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FormData } from "@/components/quote/types";

export const useQuoteSubmissionDFW = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (formData: FormData, estimatedPrice: number) => {
    // Prevent duplicate submissions
    if (isSubmitting) {
      console.log('🚫 DFW Submission already in progress, ignoring duplicate request');
      return;
    }
    
    // Add a small delay to prevent double submissions - UNIFIED KEY FOR ALL HOOKS
    const existingSubmission = sessionStorage.getItem('lastQuoteSubmission');
    if (existingSubmission && (Date.now() - parseInt(existingSubmission) < 5000)) {
      console.log('🚫 DFW: Preventing duplicate submission within 5 seconds');
      return;
    }
    
    sessionStorage.setItem('lastQuoteSubmission', Date.now().toString());
    
    console.log("🟢 DFW SUBMISSION STARTED - Using dedicated DFW hook");
    setIsSubmitting(true);
    
    try {
      // HARDCODED DFW SETTINGS - NO DETECTION LOGIC
      const leadSource = "DFW";
      const tableName = "quotes_dfw";
      
      console.log("🟢 HARDCODED DFW SETTINGS:");
      console.log("🟢 Lead Source:", leadSource);
      console.log("🟢 Table Name:", tableName);
      console.log("🟢 Form Data:", formData);
      console.log("🟢 Estimated Price:", estimatedPrice);

      // Prepare quote data for DFW table
      const quoteData = {
        garage_type: formData.garageType,
        custom_sqft: formData.customSqft ? parseInt(formData.customSqft) : null,
        space_type: formData.spaceType || null,
        other_space_type: formData.otherSpaceType || null,
        color_choice: formData.colorChoice,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        zip_code: formData.zipCode,
        estimated_price: estimatedPrice,
        lead_source: leadSource, // HARDCODED "DFW"
        archived: false, // EXPLICITLY SET TO FALSE TO PREVENT AUTO-ARCHIVING
      };

      console.log("🟢 SAVING TO QUOTES_DFW TABLE:", quoteData);

      // Save to quotes_dfw table (HARDCODED)
      const { data: savedQuote, error: saveError } = await supabase
        .from("quotes_dfw")
        .insert([quoteData])
        .select()
        .single();

      if (saveError) {
        console.error("🔴 DFW SAVE ERROR:", saveError);
        throw saveError;
      }

      console.log("🟢 DFW QUOTE SAVED SUCCESSFULLY:", savedQuote);

      // Get webhook settings for DFW
      const { data: webhookSettings, error: webhookError } = await supabase
        .from("webhook_settings")
        .select("dfw_webhook_url")
        .single();

      if (webhookError) {
        console.error("🟠 Webhook settings error:", webhookError);
      }

      // Trigger DFW webhook if configured
      if (webhookSettings?.dfw_webhook_url && savedQuote) {
        console.log("🟢 TRIGGERING DFW WEBHOOK:", webhookSettings.dfw_webhook_url);
        
        try {
          const { error: webhookFunctionError } = await supabase.functions.invoke(
            "send-quote-webhook",
            {
              body: savedQuote // Send quote data directly, not wrapped in another object
            }
          );

          if (webhookFunctionError) {
            console.error("🟠 DFW Webhook function error:", webhookFunctionError);
          } else {
            console.log("🟢 DFW WEBHOOK SENT SUCCESSFULLY");
          }
        } catch (webhookError) {
          console.error("🟠 DFW Webhook error:", webhookError);
        }
      }

      toast.success("Quote submitted successfully! We'll be in touch soon.");
      
      // Navigate to success page - always go to DFW landing for DFW quotes
      navigate('/dfwreslanding');

    } catch (error) {
      console.error("🔴 DFW SUBMISSION ERROR:", error);
      toast.error("Failed to submit quote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting
  };
};