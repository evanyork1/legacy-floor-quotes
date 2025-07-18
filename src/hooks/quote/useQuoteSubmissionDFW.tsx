
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FormData } from "@/components/quote/types";

export const useQuoteSubmissionDFW = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData, estimatedPrice: number) => {
    // EMERGENCY SUBMISSION DEBUG - Phase 1: Debug Form Submission Flow
    const uniqueSubmissionId = `DFW_EMERGENCY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log(`🚨 EMERGENCY DFW SUBMISSION START - ID: ${uniqueSubmissionId}`);
    console.log('🚨 CURRENT URL:', window.location.href);
    console.log('🚨 CURRENT PATH:', window.location.pathname);
    console.log('🚨 FORM DATA RECEIVED:', JSON.stringify(formData, null, 2));
    console.log('🚨 ESTIMATED PRICE:', estimatedPrice);
    console.log('🚨 IS SUBMITTING STATE:', isSubmitting);
    
    // Block double submissions
    if (isSubmitting) {
      console.log('🚫 SUBMISSION BLOCKED - Already in progress');
      toast.error("Submission already in progress, please wait...");
      return;
    }
    
    setIsSubmitting(true);
    console.log('🔒 SUBMISSION STATE LOCKED');
    
    try {
      // PHASE 1: Validate required fields with detailed logging
      console.log('📋 VALIDATING REQUIRED FIELDS...');
      
      const validationErrors = [];
      if (!formData.name?.trim()) validationErrors.push("Name is required");
      if (!formData.email?.trim()) validationErrors.push("Email is required");
      if (!formData.phone?.trim()) validationErrors.push("Phone is required");
      if (!formData.garageType) validationErrors.push("Garage type is required");
      if (!formData.colorChoice) validationErrors.push("Color choice is required");
      if (!formData.zipCode?.trim()) validationErrors.push("ZIP code is required");

      if (validationErrors.length > 0) {
        console.error('❌ VALIDATION FAILED:', validationErrors);
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }
      
      console.log('✅ VALIDATION PASSED');

      // PHASE 2: Simplify Submission Logic - Focus on Database Save
      console.log('💾 PREPARING DATABASE RECORD...');
      
      const quoteData = {
        garage_type: formData.garageType,
        custom_sqft: formData.customSqft ? parseInt(formData.customSqft) : null,
        space_type: formData.spaceType || null,
        other_space_type: formData.otherSpaceType || null,
        exterior_photos: [], // Simplified - no photo processing
        damage_photos: [], // Simplified - no photo processing
        color_choice: formData.colorChoice,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        zip_code: formData.zipCode.trim(),
        estimated_price: estimatedPrice,
        lead_source: "DFW", // HARDCODED FOR DFW
        status: "new",
        archived: false
      };

      console.log('💾 QUOTE DATA PREPARED:', JSON.stringify(quoteData, null, 2));
      console.log('💾 TARGET TABLE: quotes_dfw');
      console.log('💾 LEAD SOURCE CONFIRMED:', quoteData.lead_source);

      // PHASE 3: Direct Database Insert with Better Error Handling
      console.log('🗄️ INSERTING INTO DATABASE...');
      
      const { data: savedQuote, error: saveError } = await supabase
        .from("quotes_dfw")
        .insert([quoteData])
        .select()
        .single();

      if (saveError) {
        console.error("❌ DATABASE SAVE ERROR:", saveError);
        console.error("❌ ERROR CODE:", saveError.code);
        console.error("❌ ERROR MESSAGE:", saveError.message);
        console.error("❌ ERROR DETAILS:", saveError.details);
        console.error("❌ ERROR HINT:", saveError.hint);
        throw new Error(`Database save failed: ${saveError.message}`);
      }

      if (!savedQuote) {
        console.error("❌ NO DATA RETURNED FROM INSERT");
        throw new Error("No data returned from database insert");
      }

      console.log("✅ DATABASE SAVE SUCCESS:", savedQuote);
      console.log("✅ SAVED QUOTE ID:", savedQuote.id);
      console.log("✅ VERIFIED LEAD SOURCE:", savedQuote.lead_source);
      console.log("✅ VERIFIED TABLE: quotes_dfw");

      // PHASE 4: Skip Webhook for Now - Focus on Core Functionality
      console.log("⏭️ SKIPPING WEBHOOK FOR EMERGENCY SUBMISSION");

      // Success notification
      toast.success("Quote submitted successfully! We'll be in touch soon.");
      
      console.log(`🎉 EMERGENCY DFW SUBMISSION COMPLETE - ID: ${uniqueSubmissionId}`);
      console.log('🎯 FINAL VERIFICATION:');
      console.log('  - Successfully saved to: quotes_dfw table');
      console.log('  - Quote ID:', savedQuote.id);
      console.log('  - Lead source:', savedQuote.lead_source);
      console.log('  - Customer name:', savedQuote.name);
      console.log('  - Customer email:', savedQuote.email);
      
      // Navigate to success page
      navigate('/dfwreslanding');

    } catch (error) {
      console.error(`❌ EMERGENCY DFW SUBMISSION ERROR:`, error);
      console.error(`❌ ERROR TYPE:`, typeof error);
      console.error(`❌ ERROR STACK:`, error instanceof Error ? error.stack : 'No stack trace');
      
      const errorMessage = error instanceof Error ? error.message : "Failed to submit quote. Please try again.";
      console.error(`❌ USER ERROR MESSAGE:`, errorMessage);
      
      toast.error(`Submission failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
      console.log(`🔓 SUBMISSION STATE UNLOCKED: ${uniqueSubmissionId}`);
    }
  };

  return {
    handleSubmit,
    isSubmitting
  };
};
