
import { useQuoteFormData } from "./quote/useQuoteFormData";
import { useQuoteNavigation } from "./quote/useQuoteNavigation";
import { useQuoteFileHandling } from "./quote/useQuoteFileHandling";
import { useQuotePricing } from "./quote/useQuotePricing";
import { useQuoteSubmission } from "./quote/useQuoteSubmission";
import { useLocation } from "react-router-dom";

export const useQuoteForm = (leadSource?: string) => {
  const location = useLocation();
  
  // CRITICAL FIX: Block Houston hooks on DFW pages with stronger checks
  const isDFWPage = location.pathname.includes('quotedfw') || location.pathname.includes('/dfw');
  const activeDFWSubmission = sessionStorage.getItem('ACTIVE_DFW_SUBMISSION');
  const blockHouston = sessionStorage.getItem('BLOCK_HOUSTON_SUBMISSION');
  const submissionType = sessionStorage.getItem('SUBMISSION_TYPE');
  
  console.log("🔍 useQuoteForm - Route check:", {
    pathname: location.pathname,
    isDFWPage,
    explicitLeadSource: leadSource,
    activeDFWSubmission,
    blockHouston,
    submissionType
  });
  
  if (isDFWPage || activeDFWSubmission || blockHouston === 'true' || submissionType === 'DFW_ONLY') {
    console.error("🚫 HOUSTON HOOK BLOCKED: DFW page or active DFW submission detected");
    console.error("  - isDFWPage:", isDFWPage);
    console.error("  - activeDFWSubmission:", activeDFWSubmission);
    console.error("  - blockHouston:", blockHouston);
    console.error("  - submissionType:", submissionType);
    throw new Error("Houston quote form hook blocked - use DFW-specific components instead");
  }
  
  const { formData, updateFormData } = useQuoteFormData();
  const { calculatePrice } = useQuotePricing(formData);
  
  const { currentStep, totalSteps, nextStep, prevStep, canProceed } = useQuoteNavigation(
    formData,
    calculatePrice
  );

  const { handleFileUpload, removePhoto } = useQuoteFileHandling(formData, updateFormData);
  const { handleSubmit: handleSubmitHouston, isSubmitting: isSubmittingHouston } = useQuoteSubmission(leadSource);
  
  console.log("✅ useQuoteForm - Houston hooks initialized for non-DFW page");
  
  const handleSubmit = () => {
    // FINAL SAFETY CHECK
    if (sessionStorage.getItem('ACTIVE_DFW_SUBMISSION') || sessionStorage.getItem('BLOCK_HOUSTON_SUBMISSION') === 'true') {
      console.error("🚫 Houston form submission blocked - DFW submission is active");
      return;
    }
    
    console.log("✅ Houston form submission triggered");
    const estimatedPrice = calculatePrice();
    handleSubmitHouston(formData, estimatedPrice);
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
    isSubmitting: isSubmittingHouston
  };
};
