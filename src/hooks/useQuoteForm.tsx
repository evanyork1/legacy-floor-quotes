
import { useQuoteFormData } from "./quote/useQuoteFormData";
import { useQuoteNavigation } from "./quote/useQuoteNavigation";
import { useQuoteFileHandling } from "./quote/useQuoteFileHandling";
import { useQuotePricing } from "./quote/useQuotePricing";
import { useQuoteSubmission } from "./quote/useQuoteSubmission";
import { useLocation } from "react-router-dom";

export const useQuoteForm = (leadSource?: string) => {
  const location = useLocation();
  
  // STRONGEST POSSIBLE BLOCKING - Multiple checks
  const currentPath = window.location.pathname;
  const isDFWPath = currentPath.includes('quotedfw') || currentPath.includes('/dfw');
  const activeDFWSubmission = sessionStorage.getItem('ACTIVE_DFW_SUBMISSION');
  const blockHouston = sessionStorage.getItem('BLOCK_HOUSTON_SUBMISSION');
  const submissionType = sessionStorage.getItem('SUBMISSION_TYPE');
  const dfwComponentActive = sessionStorage.getItem('DFW_COMPONENT_ACTIVE');
  
  console.log("🔍 useQuoteForm - COMPREHENSIVE BLOCKING CHECK:", {
    currentPath,
    isDFWPath,
    activeDFWSubmission,
    blockHouston,
    submissionType,
    dfwComponentActive,
    shouldBlock: isDFWPath || activeDFWSubmission || blockHouston === 'true' || submissionType === 'DFW_ONLY' || dfwComponentActive
  });
  
  if (isDFWPath || activeDFWSubmission || blockHouston === 'true' || submissionType === 'DFW_ONLY' || dfwComponentActive) {
    console.error("🚫 HOUSTON FORM HOOK ABSOLUTELY BLOCKED");
    console.error("  - Path check:", isDFWPath, currentPath);
    console.error("  - Session checks:", { activeDFWSubmission, blockHouston, submissionType, dfwComponentActive });
    throw new Error("Houston quote form hook blocked - DFW context detected");
  }
  
  const { formData, updateFormData } = useQuoteFormData();
  const { calculatePrice } = useQuotePricing(formData);
  
  const { currentStep, totalSteps, nextStep, prevStep, canProceed } = useQuoteNavigation(
    formData,
    calculatePrice
  );

  const { handleFileUpload, removePhoto } = useQuoteFileHandling(formData, updateFormData);
  const { handleSubmit: handleSubmitHouston, isSubmitting: isSubmittingHouston } = useQuoteSubmission(leadSource);
  
  console.log("✅ useQuoteForm - Houston hooks initialized for confirmed Houston context");
  
  const handleSubmit = () => {
    // ABSOLUTE FINAL CHECK
    const finalCheck = window.location.pathname.includes('/quotedfw') || 
                      window.location.pathname.includes('/dfw') ||
                      sessionStorage.getItem('ACTIVE_DFW_SUBMISSION') || 
                      sessionStorage.getItem('BLOCK_HOUSTON_SUBMISSION') === 'true' ||
                      sessionStorage.getItem('DFW_COMPONENT_ACTIVE');
    
    if (finalCheck) {
      console.error("🚫 Houston form submission BLOCKED at final step");
      return;
    }
    
    console.log("✅ Houston form submission confirmed - proceeding");
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
