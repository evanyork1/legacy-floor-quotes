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
    console.log("🚀 DFW SUBMISSION FUNCTION CALLED");
    console.log("🚀 Current URL:", window.location.href);
    console.log("🚀 Form Data received:", formData);
    console.log("🚀 Estimated Price:", estimatedPrice);
    
    // Prevent duplicate submissions
    if (isSubmitting) {
      console.log('🚫 DFW Submission already in progress, ignoring duplicate request');
      return;
    }
    
    // Add unique session key for DFW submissions
    const dfwSubmissionKey = `dfw_quote_submission_${Date.now()}`;
    const existingDFWSubmission = sessionStorage.getItem('lastDFWQuoteSubmission');
    
    if (existingDFWSubmission && (Date.now() - parseInt(existingDFWSubmission) < 5000)) {
      console.log('🚫 DFW: Preventing duplicate DFW submission within 5 seconds');
      return;
    }
    
    sessionStorage.setItem('lastDFWQuoteSubmission', Date.now().toString());
    sessionStorage.setItem('currentSubmissionType', 'DFW');
    
    console.log("🟢 DFW SUBMISSION STARTED - Using dedicated DFW hook");
    console.log("🟢 Session storage set for DFW submission");
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

      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone) {
        throw new Error("Missing required contact information");
      }

      // Prepare quote data for DFW table
      const quoteData = {
        garage_type: formData.garageType,
        custom_sqft: formData.customSqft ? parseInt(formData.customSqft) : null,
        space_type: formData.spaceType || "",
        other_space_type: formData.otherSpaceType || "",
        exterior_photos: [], // No photos in simplified flow
        damage_photos: [], // No photos in simplified flow
        color_choice: formData.colorChoice,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        zip_code: formData.zipCode,
        estimated_price: estimatedPrice,
        lead_source: leadSource, // HARDCODED "DFW"
        status: "new",
        archived: false,
      };

      console.log("🟢 PREPARED QUOTE DATA FOR QUOTES_DFW TABLE:", quoteData);

      // Save to quotes_dfw table (HARDCODED)
      console.log("🟢 ATTEMPTING TO SAVE TO quotes_dfw TABLE...");
      const { data: savedQuote, error: saveError } = await supabase
        .from("quotes_dfw")
        .insert([quoteData])
        .select()
        .single();

      if (saveError) {
        console.error("🔴 DFW SAVE ERROR DETAILS:", {
          error: saveError,
          message: saveError.message,
          details: saveError.details,
          hint: saveError.hint,
          code: saveError.code
        });
        throw saveError;
      }

      if (!savedQuote) {
        console.error("🔴 NO QUOTE DATA RETURNED FROM INSERT");
        throw new Error("No quote data returned from database insert");
      }

      console.log("✅ DFW QUOTE SAVED SUCCESSFULLY TO quotes_dfw:", savedQuote);
      console.log("✅ Saved quote ID:", savedQuote.id);
      console.log("✅ Saved quote lead_source:", savedQuote.lead_source);

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