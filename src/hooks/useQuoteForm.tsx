
import { useQuoteFormData } from "./quote/useQuoteFormData";
import { useQuoteNavigation } from "./quote/useQuoteNavigation";
import { useQuoteFileHandling } from "./quote/useQuoteFileHandling";
import { useQuotePricing } from "./quote/useQuotePricing";
import { useQuoteSubmission } from "./quote/useQuoteSubmission";

export const useQuoteForm = () => {
  const { formData, updateFormData } = useQuoteFormData();
  const { calculatePrice } = useQuotePricing(formData);
  
  const { currentStep, totalSteps, nextStep, prevStep, canProceed } = useQuoteNavigation(
    formData,
    calculatePrice
  );

  const { handleFileUpload, removePhoto } = useQuoteFileHandling(formData, updateFormData);
  const { handleSubmit: submitQuote, isSubmitting } = useQuoteSubmission();

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
