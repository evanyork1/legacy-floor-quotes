
import { useQuoteFormData } from "./quote/useQuoteFormData";
import { useQuoteNavigation } from "./quote/useQuoteNavigation";
import { useQuoteFileHandling } from "./quote/useQuoteFileHandling";
import { useQuotePricing } from "./quote/useQuotePricing";
import { useQuoteSubmission } from "./quote/useQuoteSubmission";

export const useQuoteForm = (leadSource?: string) => {
  console.log("🔍 useQuoteForm called with leadSource:", leadSource);
  
  const { formData, updateFormData } = useQuoteFormData();
  const { calculatePrice } = useQuotePricing(formData);
  
  const { currentStep, totalSteps, nextStep, prevStep, canProceed } = useQuoteNavigation(
    formData,
    calculatePrice
  );

  const { handleFileUpload, removePhoto } = useQuoteFileHandling(formData, updateFormData);
  
  console.log("🔍 Passing leadSource to useQuoteSubmission:", leadSource);
  const { handleSubmit: submitQuote, isSubmitting } = useQuoteSubmission(leadSource);

  const handleSubmit = () => {
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
