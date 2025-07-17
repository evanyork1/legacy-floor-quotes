
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
  
  // BULLETPROOF DFW DETECTION with multiple fallbacks
  const currentPath = window.location.pathname;
  const isDFWFromLeadSource = leadSource === "DFW";
  const isDFWFromPath = currentPath.includes('/quotedfw');
  const isDFWSubmission = isDFWFromLeadSource || isDFWFromPath;
  
  console.log("🔍 DFW DETECTION ANALYSIS:");
  console.log("🔍 leadSource:", leadSource);
  console.log("🔍 currentPath:", currentPath);
  console.log("🔍 isDFWFromLeadSource:", isDFWFromLeadSource);
  console.log("🔍 isDFWFromPath:", isDFWFromPath);
  console.log("🔍 FINAL isDFWSubmission:", isDFWSubmission);
  
  const { handleSubmit: submitQuoteRegular, isSubmitting: isSubmittingRegular } = useQuoteSubmission(leadSource);
  const { handleSubmit: submitQuoteDFW, isSubmitting: isSubmittingDFW } = useQuoteSubmissionDFW();
  
  const submitQuote = isDFWSubmission ? submitQuoteDFW : submitQuoteRegular;
  const isSubmitting = isDFWSubmission ? isSubmittingDFW : isSubmittingRegular;

  console.log("🔍 FINAL HOOK SELECTION:");
  console.log("🔍 Using DFW hook:", isDFWSubmission);
  console.log("🔍 submitQuote function:", isDFWSubmission ? "submitQuoteDFW" : "submitQuoteRegular");

  const handleSubmit = () => {
    console.log("🚀 HANDLESUBMIT CALLED - isDFWSubmission:", isDFWSubmission);
    console.log("🚀 About to call:", isDFWSubmission ? "DFW HOOK" : "REGULAR HOOK");
    
    const estimatedPrice = calculatePrice();
    submitQuote(formData, estimatedPrice);
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
