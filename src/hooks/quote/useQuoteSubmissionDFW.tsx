
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FormData } from "@/components/quote/types";

export const useQuoteSubmissionDFW = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
      if (!formData.name?.trim()) {
        throw new Error("Name is required");
      }
      if (!formData.email?.trim()) {
        throw new Error("Email is required");
      }
      if (!formData.phone?.trim()) {
        throw new Error("Phone is required");
      }
      if (!formData.garageType) {
        throw new Error("Garage type is required");
      }
      if (!formData.colorChoice) {
        throw new Error("Color choice is required");
      }
      if (!formData.zipCode?.trim()) {
        throw new Error("ZIP code is required");
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
        exterior_photos: [], // Convert File[] to string[] (empty since photos disabled)
        damage_photos: [], // Convert File[] to string[] (empty since photos disabled)
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

      // Remove array wrapper - insert expects single object, not array
      const { data: savedQuote, error: saveError } = await supabase
        .from("quotes_dfw")
        .insert(quoteData)
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
