
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
    const uniqueSubmissionId = `DFW_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log(`🎯 DFW SUBMISSION START - ID: ${uniqueSubmissionId}`);
    console.log('🎯 DFW SUBMISSION - URL:', window.location.href);
    console.log('🎯 DFW SUBMISSION - Form data:', formData);
    console.log('🎯 DFW SUBMISSION - Price:', estimatedPrice);
    
    if (isSubmitting) {
      console.log('🚫 DFW Submission already in progress');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone || !formData.garageType || !formData.colorChoice || !formData.zipCode) {
        throw new Error("Missing required fields");
      }

      // CONFIRMED DFW SUBMISSION - HARDCODED
      const leadSource = "DFW";
      const tableName = "quotes_dfw";

      console.log(`💾 CONFIRMED DFW SUBMISSION - Saving to ${tableName} with lead_source: ${leadSource}`);

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

      console.log(`💾 Saving to quotes_dfw:`, quoteData);

      const { data: savedQuote, error: saveError } = await supabase
        .from("quotes_dfw")
        .insert([quoteData])
        .select()
        .single();

      if (saveError) {
        console.error("❌ DFW save error:", saveError);
        throw new Error(`Failed to save DFW quote: ${saveError.message}`);
      }

      console.log("✅ DFW quote saved to quotes_dfw table:", savedQuote);
      console.log("✅ VERIFIED: lead_source =", savedQuote.lead_source);

      // Trigger DFW webhook
      try {
        console.log("📡 Triggering DFW webhook...");
        
        const { error: webhookError } = await supabase.functions.invoke(
          "send-quote-webhook",
          { body: savedQuote }
        );

        if (webhookError) {
          console.error("⚠️ DFW Webhook error:", webhookError);
        } else {
          console.log("✅ DFW webhook sent successfully");
        }
      } catch (webhookError) {
        console.error("⚠️ DFW Webhook failed:", webhookError);
      }

      toast.success("Quote submitted successfully! We'll be in touch soon.");
      
      console.log(`🎉 DFW SUBMISSION COMPLETE - ID: ${uniqueSubmissionId}`);
      console.log('🎯 FINAL VERIFICATION:');
      console.log('  - Saved to: quotes_dfw table');
      console.log('  - Quote ID:', savedQuote.id);
      console.log('  - Lead source:', savedQuote.lead_source);
      
      navigate('/dfwreslanding');

    } catch (error) {
      console.error(`❌ DFW submission error:`, error);
      const errorMessage = error instanceof Error ? error.message : "Failed to submit quote. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
      console.log(`🔓 DFW Session cleared: ${uniqueSubmissionId}`);
    }
  };

  return {
    handleSubmit,
    isSubmitting
  };
};
