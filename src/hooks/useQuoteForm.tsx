
import { useQuoteFormData } from "./quote/useQuoteFormData";
import { useQuoteNavigation } from "./quote/useQuoteNavigation";
import { useQuoteFileHandling } from "./quote/useQuoteFileHandling";
import { useQuotePricing } from "./quote/useQuotePricing";
import { useQuoteSubmission } from "./quote/useQuoteSubmission";
import { useLocation } from "react-router-dom";

export const useQuoteForm = (leadSource?: string) => {
  const location = useLocation();
  
  // CRITICAL FIX: Block Houston hooks on DFW pages
  const isDFWPage = location.pathname.includes('quotedfw') || location.pathname.includes('/dfw');
  
  console.log("🔍 useQuoteForm - Route check:", {
    pathname: location.pathname,
    isDFWPage,
    explicitLeadSource: leadSource
  });
  
  if (isDFWPage) {
    console.error("🚫 HOUSTON HOOK BLOCKED: useQuoteForm should not be used on DFW pages");
    throw new Error("Houston quote form hook blocked on DFW pages - use DFW-specific components instead");
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
