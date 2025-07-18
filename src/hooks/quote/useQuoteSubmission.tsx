
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FormData } from "@/components/quote/types";

export const useQuoteSubmission = (explicitLeadSource?: string) => {
  console.log("🔍 HOUSTON useQuoteSubmission called with explicitLeadSource:", explicitLeadSource);
  console.log("🔍 HOUSTON Current URL:", window.location.href);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData, estimatedPrice: number) => {
    // Check for DFW context - if detected, block gracefully
    const currentPath = window.location.pathname;
    const isDFWPath = currentPath.includes('/quotedfw') || currentPath.includes('/dfw');
    const activeDFWSubmission = sessionStorage.getItem('ACTIVE_DFW_SUBMISSION');
    const blockHouston = sessionStorage.getItem('BLOCK_HOUSTON_SUBMISSION');
    
    if (isDFWPath || activeDFWSubmission || blockHouston === 'true') {
      console.log('🚫 Houston submission blocked - DFW context detected');
      toast({
        title: "Form Not Available",
        description: "Please use the DFW quote form for Dallas-Fort Worth submissions.",
        variant: "destructive",
      });
      return;
    }
    
    if (isSubmitting) {
      console.log('🚫 Houston submission already in progress, ignoring duplicate request');
      return;
    }
    
    // Generate unique Houston submission ID
    const uniqueSubmissionId = `HOUSTON_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Check for recent submissions
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
      // Force Houston lead source
      const leadSource = 'Houston';
      
      console.log("🔍 HOUSTON SUBMISSION - Lead source:", leadSource);

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
        lead_source: leadSource,
        status: 'new' as const,
        archived: false,
        submission_id: uniqueSubmissionId
      };

      console.log("🔍 HOUSTON saving to quotes table:", quoteData);

      // Save quote to Houston database
      const { data: savedQuote, error: saveError } = await supabase
        .from('quotes')
        .insert(quoteData)
        .select()
        .single();

      if (saveError) {
        console.error('🔴 Houston database save error:', saveError);
        throw new Error(`Failed to save Houston quote: ${saveError.message}`);
      }

      console.log('✅ Houston quote saved successfully:', savedQuote);

      // Trigger Houston webhook
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
