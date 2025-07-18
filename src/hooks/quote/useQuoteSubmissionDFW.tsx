
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
    // CRITICAL: Generate unique submission ID to prevent any cross-contamination
    const uniqueSubmissionId = `DFW_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log(`🎯 DFW SUBMISSION START - ID: ${uniqueSubmissionId}`);
    
    // Prevent duplicate submissions with DFW-specific session key
    if (isSubmitting) {
      console.log('🚫 DFW Submission already in progress, blocking duplicate');
      return;
    }
    
    // STRONGEST BLOCKING: Set multiple session storage keys to block Houston hooks
    sessionStorage.setItem('ACTIVE_DFW_SUBMISSION', uniqueSubmissionId);
    sessionStorage.setItem('BLOCK_HOUSTON_SUBMISSION', 'true');
    sessionStorage.setItem('SUBMISSION_TYPE', 'DFW_ONLY');
    sessionStorage.setItem('lastDFWQuoteSubmission', Date.now().toString());
    
    // Clear any Houston session storage that might interfere
    sessionStorage.removeItem('lastHoustonQuoteSubmission');
    sessionStorage.removeItem('lastQuoteSubmission');
    
    console.log(`🔒 DFW Session locks set for submission: ${uniqueSubmissionId}`);
    
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

      // HARDCODED DFW SETTINGS - NO DYNAMIC DETECTION
      const leadSource = "DFW";
      const tableName = "quotes_dfw";

      console.log(`✅ DFW Validation passed - proceeding to save to ${tableName}`);

      // Prepare quote data for DFW table with proper null handling
      // REMOVED submission_id field as it doesn't exist in quotes_dfw table
      const quoteData = {
        garage_type: formData.garageType,
        custom_sqft: formData.customSqft ? parseInt(formData.customSqft) : null,
        space_type: formData.spaceType || null,
        other_space_type: formData.otherSpaceType || null,
        exterior_photos: [],
        damage_photos: [],
        color_choice: formData.colorChoice,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        zip_code: formData.zipCode.trim(),
        estimated_price: estimatedPrice,
        lead_source: leadSource,
        status: "new",
        archived: false
      };

      console.log(`💾 Saving DFW quote to ${tableName}:`, quoteData);

      // Save ONLY to quotes_dfw table
      const { data: savedQuote, error: saveError } = await supabase
        .from("quotes_dfw")
        .insert([quoteData])
        .select()
        .single();

      if (saveError) {
        console.error("❌ DFW save error:", saveError);
        throw new Error(`Failed to save DFW quote: ${saveError.message}`);
      }

      if (!savedQuote) {
        console.error("❌ No DFW quote data returned from insert");
        throw new Error("No quote data returned from database insert");
      }

      console.log("✅ DFW quote saved successfully:", savedQuote);

      // Trigger DFW webhook only
      try {
        console.log("📡 Triggering DFW webhook");
        
        const { error: webhookFunctionError } = await supabase.functions.invoke(
          "send-quote-webhook",
          {
            body: savedQuote
          }
        );

        if (webhookFunctionError) {
          console.error("⚠️ DFW Webhook function error:", webhookFunctionError);
        } else {
          console.log("✅ DFW webhook sent successfully");
        }
      } catch (webhookError) {
        console.error("⚠️ DFW Webhook error:", webhookError);
      }

      toast.success("Quote submitted successfully! We'll be in touch soon.");
      
      console.log(`🎉 DFW submission complete - ID: ${uniqueSubmissionId}`);
      navigate('/dfwreslanding');

    } catch (error) {
      console.error(`❌ DFW submission error for ID ${uniqueSubmissionId}:`, error);
      const errorMessage = error instanceof Error ? error.message : "Failed to submit quote. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
      // Clear session locks after completion
      sessionStorage.removeItem('ACTIVE_DFW_SUBMISSION');
      sessionStorage.removeItem('BLOCK_HOUSTON_SUBMISSION');
      sessionStorage.removeItem('lastDFWQuoteSubmission');
      console.log(`🔓 DFW Session locks cleared for submission: ${uniqueSubmissionId}`);
    }
  };

  return {
    handleSubmit,
    isSubmitting
  };
};
