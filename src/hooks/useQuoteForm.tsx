
import { useQuoteFormData } from "./quote/useQuoteFormData";
import { useQuoteNavigation } from "./quote/useQuoteNavigation";
import { useQuoteFileHandling } from "./quote/useQuoteFileHandling";
import { useQuotePricing } from "./quote/useQuotePricing";
import { useQuoteSubmission } from "./quote/useQuoteSubmission";

export const useQuoteForm = () => {
  const { formData, updateFormData } = useQuoteFormData();
  const { calculatePrice } = useQuotePricing(formData);
  
  const { submitQuote, isSubmitting, handleSubmit } = useQuoteSubmission(
    calculatePrice,
    () => setCurrentStep(7) // Proceed to step 7 after successful submission
  );

  const { currentStep, totalSteps, nextStep, prevStep, canProceed, setCurrentStep } = useQuoteNavigation(
    formData,
    submitQuote
  );

  const { handleFileUpload, removePhoto } = useQuoteFileHandling(formData, updateFormData);

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
