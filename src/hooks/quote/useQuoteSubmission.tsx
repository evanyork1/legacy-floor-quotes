
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FormData } from "@/components/quote/types";

export const useQuoteSubmission = (explicitLeadSource?: string) => {
  console.log("🔍 HOUSTON useQuoteSubmission called with explicitLeadSource:", explicitLeadSource);
  console.log("🔍 HOUSTON Current URL:", window.location.href);
  
  // CRITICAL: BLOCK DFW USAGE - Houston hook should never be used on DFW pages
  const currentPath = window.location.pathname;
  if (currentPath.includes('/quotedfw') || currentPath.includes('/dfw')) {
    console.error("🚫 HOUSTON HOOK BLOCKED ON DFW PAGE:", currentPath);
    throw new Error("Houston submission hook should not be used on DFW pages");
  }
  
  // STRONGEST BLOCKING: Check for active DFW submissions
  const activeDFWSubmission = sessionStorage.getItem('ACTIVE_DFW_SUBMISSION');
  const blockHouston = sessionStorage.getItem('BLOCK_HOUSTON_SUBMISSION');
  
  if (activeDFWSubmission || blockHouston === 'true') {
    console.error("🚫 HOUSTON HOOK BLOCKED: DFW submission is active");
    throw new Error("Houston hook blocked - DFW submission in progress");
  }
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData, estimatedPrice: number) => {
    // FINAL CHECK: Ensure no DFW submission is active
    if (sessionStorage.getItem('ACTIVE_DFW_SUBMISSION') || sessionStorage.getItem('BLOCK_HOUSTON_SUBMISSION') === 'true') {
      console.error('🚫 Houston submission blocked - DFW submission is active');
      return;
    }
    
    if (isSubmitting) {
      console.log('🚫 Houston submission already in progress, ignoring duplicate request');
      return;
    }
    
    // Generate unique Houston submission ID
    const uniqueSubmissionId = `HOUSTON_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // HOUSTON-SPECIFIC session storage to prevent cross-contamination
    const existingSubmission = sessionStorage.getItem('lastHoustonQuoteSubmission');
    
    if (existingSubmission && (Date.now() - parseInt(existingSubmission) < 10000)) {
      console.log('🚫 Houston: Preventing duplicate submission within 10 seconds');
      return;
    }
    
    // Set Houston-specific session storage
    sessionStorage.setItem('lastHoustonQuoteSubmission', Date.now().toString());
    sessionStorage.setItem('ACTIVE_HOUSTON_SUBMISSION', uniqueSubmissionId);

    setIsSubmitting(true);
    console.log(`🟢 Starting HOUSTON quote submission process - ID: ${uniqueSubmissionId}`, formData);

    try {
      // Force Houston lead source - no DFW detection
      const leadSource = 'Houston';
      
      console.log("🔍 HOUSTON SUBMISSION - FORCED HOUSTON LEAD SOURCE:");
      console.log("  - window.location.pathname:", window.location.pathname);
      console.log("  - explicitLeadSource:", explicitLeadSource);
      console.log("🎯 FINAL LEAD SOURCE:", leadSource);

      // Prepare quote data for Houston table
      const quoteData = {
        garage_type: formData.garageType,
        custom_sqft: formData.garageType === 'custom' ? parseInt(formData.customSqft) : null,
        space_type: formData.spaceType || null,
        other_space_type: formData.otherSpaceType || null,
        exterior_photos: [],
        damage_photos: [],
        color_choice: formData.colorChoice,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        zip_code: formData.zipCode,
        estimated_price: estimatedPrice,
        lead_source: leadSource, // FORCED to Houston
        status: 'new' as const,
        archived: false,
        submission_id: uniqueSubmissionId
      };

      // Save to Houston quotes table only
      const tableName = 'quotes';
      
      console.log("🔍 HOUSTON PRE-SAVE VERIFICATION:");
      console.log("  - leadSource in quoteData:", quoteData.lead_source);
      console.log("  - target table:", tableName);
      console.log("🎯 CONFIRMED: SAVING TO quotes TABLE (Houston)");

      // Save quote to Houston database
      const { data: savedQuote, error: saveError } = await supabase
        .from(tableName)
        .insert(quoteData)
        .select()
        .single();

      if (saveError) {
        console.error('🔴 Houston database save error:', saveError);
        throw new Error(`Failed to save Houston quote: ${saveError.message}`);
      }

      console.log('✅ Houston quote saved successfully:', savedQuote);

      // CRITICAL FIX: Trigger Houston webhook
      console.log('🟢 Triggering Houston webhook...');
      try {
        const { error: webhookError } = await supabase.functions.invoke('send-quote-webhook', {
          body: savedQuote
        });

        if (webhookError) {
          console.error('🟠 Houston webhook error:', webhookError);
          toast({
            title: "Quote Submitted",
            description: "Your quote was saved but email notification may be delayed.",
          });
        } else {
          console.log('✅ Houston webhook triggered successfully');
          toast({
            title: "Quote Submitted Successfully!",
            description: "We've received your quote and will contact you soon.",
          });
        }
      } catch (webhookError) {
        console.error('🔴 Houston webhook call failed:', webhookError);
        toast({
          title: "Quote Submitted",
          description: "Your quote was saved but email notification may be delayed.",
        });
      }

      // Navigate to Houston success page
      navigate('/houstonreslanding');

    } catch (error) {
      console.error(`🔴 Houston quote submission error for ID ${uniqueSubmissionId}:`, error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Failed to submit quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      sessionStorage.removeItem('lastHoustonQuoteSubmission');
      sessionStorage.removeItem('ACTIVE_HOUSTON_SUBMISSION');
      console.log(`🔓 Houston session locks cleared for submission: ${uniqueSubmissionId}`);
    }
  };

  return {
    handleSubmit,
    isSubmitting
  };
};
