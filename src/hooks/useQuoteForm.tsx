
import { useQuoteFormData } from "./quote/useQuoteFormData";
import { useQuoteNavigation } from "./quote/useQuoteNavigation";
import { useQuoteFileHandling } from "./quote/useQuoteFileHandling";
import { useQuotePricing } from "./quote/useQuotePricing";
import { useQuoteSubmission } from "./quote/useQuoteSubmission";
import { useQuoteSubmissionDFW } from "./quote/useQuoteSubmissionDFW";

export const useQuoteForm = (leadSource?: string) => {
  console.log("🔍 useQuoteForm called with leadSource:", leadSource);
  console.log("🔍 Current window location:", window.location.pathname);
  
  const { formData, updateFormData } = useQuoteFormData();
  const { calculatePrice } = useQuotePricing(formData);
  
  const { currentStep, totalSteps, nextStep, prevStep, canProceed } = useQuoteNavigation(
    formData,
    calculatePrice
  );

  const { handleFileUpload, removePhoto } = useQuoteFileHandling(formData, updateFormData);
  
  // ALWAYS INSTANTIATE BOTH HOOKS (following React Rules of Hooks)
  const { handleSubmit: handleSubmitHouston, isSubmitting: isSubmittingHouston } = useQuoteSubmission(leadSource);
  const { handleSubmit: handleSubmitDFW, isSubmitting: isSubmittingDFW } = useQuoteSubmissionDFW();
  
  // PATH DETECTION for selecting which submission function to use
  const currentPath = window.location.pathname;
  const isDFWFromLeadSource = leadSource === "DFW";
  const isDFWFromPath = currentPath.includes('/quotedfw') || currentPath.includes('/dfw');
  const isDFWSubmission = isDFWFromLeadSource || isDFWFromPath;
  
  console.log("🔍 PATH DETECTION ANALYSIS:");
  console.log("🔍 leadSource:", leadSource);
  console.log("🔍 currentPath:", currentPath);
  console.log("🔍 isDFWFromLeadSource:", isDFWFromLeadSource);
  console.log("🔍 isDFWFromPath:", isDFWFromPath);
  console.log("🔍 FINAL isDFWSubmission:", isDFWSubmission);
  
  // SELECT WHICH FUNCTIONS TO USE (both hooks are always instantiated)
  const handleSubmitFunction = isDFWSubmission ? handleSubmitDFW : handleSubmitHouston;
  const isSubmitting = isDFWSubmission ? isSubmittingDFW : isSubmittingHouston;

  console.log("🔍 SELECTED SUBMISSION:", isDFWSubmission ? "DFW" : "HOUSTON");

  const handleSubmit = () => {
    console.log("🚀 HANDLESUBMIT CALLED - isDFWSubmission:", isDFWSubmission);
    console.log("🚀 About to call:", isDFWSubmission ? "DFW HOOK" : "HOUSTON HOOK");
    
    const estimatedPrice = calculatePrice();
    handleSubmitFunction(formData, estimatedPrice);
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
    isSubmitting
  };
};
