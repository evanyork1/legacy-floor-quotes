
import { useQuoteFormData } from "./quote/useQuoteFormData";
import { useQuoteNavigation } from "./quote/useQuoteNavigation";
import { useQuoteFileHandling } from "./quote/useQuoteFileHandling";
import { useQuotePricing } from "./quote/useQuotePricing";
import { useQuoteSubmission } from "./quote/useQuoteSubmission";
import { useQuoteSubmissionDFW } from "./quote/useQuoteSubmissionDFW";

export const useQuoteForm = (leadSource?: string) => {
  console.log("🔍 useQuoteForm called with leadSource:", leadSource);
  console.log("🔍 Current window location:", window.location.pathname);
  
  // PATH DETECTION - BLOCK USAGE ON DFW ROUTES
  const currentPath = window.location.pathname;
  const isDFWRoute = currentPath.includes('/quotedfw') || currentPath.includes('/dfw');
  
  if (isDFWRoute) {
    console.log("🚫 useQuoteForm BLOCKED on DFW route:", currentPath);
    throw new Error("useQuoteForm should not be used on DFW routes. Use DFW-specific components instead.");
  }
  
  console.log("✅ useQuoteForm proceeding on Houston route:", currentPath);
  
  const { formData, updateFormData } = useQuoteFormData();
  const { calculatePrice } = useQuotePricing(formData);
  
  const { currentStep, totalSteps, nextStep, prevStep, canProceed } = useQuoteNavigation(
    formData,
    calculatePrice
  );

  const { handleFileUpload, removePhoto } = useQuoteFileHandling(formData, updateFormData);
  
  // ONLY HOUSTON HOOK - DFW routes are blocked above
  const { handleSubmit: handleSubmitHouston, isSubmitting: isSubmittingHouston } = useQuoteSubmission(leadSource);
  
  // HOUSTON ONLY LOGIC (DFW routes are blocked)
  const handleSubmit = () => {
    console.log("🚀 HOUSTON HANDLESUBMIT CALLED");
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
