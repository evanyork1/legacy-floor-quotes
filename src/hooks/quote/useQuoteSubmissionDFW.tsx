
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
    
    // Prevent duplicate submissions with DFW-specific session key
    if (isSubmitting) {
      console.log('🚫 DFW Submission already in progress, ignoring duplicate request');
      return;
    }
    
    // DFW-SPECIFIC session storage to prevent cross-contamination
    const dfwSubmissionKey = `dfw_quote_submission_${Date.now()}`;
    const existingDFWSubmission = sessionStorage.getItem('lastDFWQuoteSubmission');
    
    if (existingDFWSubmission && (Date.now() - parseInt(existingDFWSubmission) < 10000)) {
      console.log('🚫 DFW: Preventing duplicate DFW submission within 10 seconds');
      toast.error("Please wait before submitting again.");
      return;
    }
    
    // Clear any Houston session storage that might interfere
    sessionStorage.removeItem('lastQuoteSubmission');
    sessionStorage.removeItem('lastSubmissionType');
    
    // Set DFW-specific session storage
    sessionStorage.setItem('lastDFWQuoteSubmission', Date.now().toString());
    sessionStorage.setItem('currentSubmissionType', 'DFW_ONLY');
    
    console.log("🟢 DFW SUBMISSION STARTED - Using dedicated DFW hook");
    console.log("🟢 Session storage set for DFW submission");
    setIsSubmitting(true);
    
    try {
      // Validate required fields first
      if (!formData.name || !formData.email || !formData.phone) {
        throw new Error("Missing required contact information");
      }

      if (!formData.garageType) {
        throw new Error("Garage type is required");
      }

      if (!formData.colorChoice) {
        throw new Error("Color choice is required");
      }

      if (!formData.zipCode) {
        throw new Error("Zip code is required");
      }

      // HARDCODED DFW SETTINGS - NO DETECTION LOGIC
      const leadSource = "DFW";
      const tableName = "quotes_dfw";
      
      console.log("🟢 HARDCODED DFW SETTINGS:");
      console.log("🟢 Lead Source:", leadSource);
      console.log("🟢 Table Name:", tableName);
      console.log("🟢 Form Data:", formData);
      console.log("🟢 Estimated Price:", estimatedPrice);

      // Prepare quote data for DFW table with proper null handling
      const quoteData = {
        garage_type: formData.garageType,
        custom_sqft: formData.customSqft ? parseInt(formData.customSqft) : null,
        space_type: formData.spaceType || null,
        other_space_type: formData.otherSpaceType || null,
        exterior_photos: [], // Simplified flow - no photos
        damage_photos: [], // Simplified flow - no photos
        color_choice: formData.colorChoice,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        zip_code: formData.zipCode.trim(),
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
        throw new Error(`Failed to save DFW quote: ${saveError.message}`);
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
              body: savedQuote // Send quote data directly
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
      
      // Navigate to DFW success page
      console.log("🟢 DFW SUBMISSION COMPLETE - Navigating to DFW landing page");
      navigate('/dfwreslanding');

    } catch (error) {
      console.error("🔴 DFW SUBMISSION ERROR:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to submit quote. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
      // Clear session lock after completion
      sessionStorage.removeItem('lastDFWQuoteSubmission');
    }
  };

  return {
    handleSubmit,
    isSubmitting
  };
};
