
import { useQuoteFormData } from "./quote/useQuoteFormData";
import { useQuoteNavigation } from "./quote/useQuoteNavigation";
import { useQuoteFileHandling } from "./quote/useQuoteFileHandling";
import { useQuotePricing } from "./quote/useQuotePricing";
import { useQuoteSubmission } from "./quote/useQuoteSubmission";
import { useQuoteSubmissionDFW } from "./quote/useQuoteSubmissionDFW";

export const useQuoteForm = (leadSource?: string) => {
  console.log("🔍 useQuoteForm called with leadSource:", leadSource);
  
  const { formData, updateFormData } = useQuoteFormData();
  const { calculatePrice } = useQuotePricing(formData);
  
  const { currentStep, totalSteps, nextStep, prevStep, canProceed } = useQuoteNavigation(
    formData,
    calculatePrice
  );

  const { handleFileUpload, removePhoto } = useQuoteFileHandling(formData, updateFormData);
  
  // Use dedicated DFW hook for DFW submissions
  const isDFWSubmission = leadSource === "DFW";
  const { handleSubmit: submitQuoteRegular, isSubmitting: isSubmittingRegular } = useQuoteSubmission(leadSource);
  const { handleSubmit: submitQuoteDFW, isSubmitting: isSubmittingDFW } = useQuoteSubmissionDFW();
  
  const submitQuote = isDFWSubmission ? submitQuoteDFW : submitQuoteRegular;
  const isSubmitting = isDFWSubmission ? isSubmittingDFW : isSubmittingRegular;

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
