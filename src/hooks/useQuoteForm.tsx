
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
  
  // SIMPLIFIED PATH DETECTION - Only one hook instantiated
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
  
  // CONDITIONALLY INSTANTIATE ONLY THE NEEDED HOOK
  let handleSubmitFunction: (formData: any, estimatedPrice: number) => void;
  let isSubmitting: boolean;
  
  if (isDFWSubmission) {
    console.log("🎯 INSTANTIATING DFW HOOK ONLY");
    const dfwHook = useQuoteSubmissionDFW();
    handleSubmitFunction = dfwHook.handleSubmit;
    isSubmitting = dfwHook.isSubmitting;
  } else {
    console.log("🎯 INSTANTIATING HOUSTON HOOK ONLY");
    const houstonHook = useQuoteSubmission(leadSource);
    handleSubmitFunction = houstonHook.handleSubmit;
    isSubmitting = houstonHook.isSubmitting;
  }

  console.log("🔍 HOOK INSTANTIATED:", isDFWSubmission ? "DFW" : "HOUSTON");

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
