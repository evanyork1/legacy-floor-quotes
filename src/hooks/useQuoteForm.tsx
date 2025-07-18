
import { useQuoteFormData } from "./quote/useQuoteFormData";
import { useQuoteNavigation } from "./quote/useQuoteNavigation";
import { useQuoteFileHandling } from "./quote/useQuoteFileHandling";
import { useQuotePricing } from "./quote/useQuotePricing";
import { useQuoteSubmission } from "./quote/useQuoteSubmission";
import { useLocation } from "react-router-dom";

export const useQuoteForm = (leadSource?: string) => {
  const location = useLocation();
  
  // Simple route-based logic: only block if we're on DFW route
  const isDFWRoute = location.pathname.includes('/quotedfw');
  
  if (isDFWRoute) {
    console.log("🚫 Houston form hook blocked - on DFW route, returning null values");
    return {
      currentStep: 1,
      totalSteps: 5,
      formData: {
        garageType: '',
        customSqft: '',
        spaceType: '',
        otherSpaceType: '',
        additionalSpaces: [],
        exteriorPhotos: [],
        damagePhotos: [],
        colorChoice: '',
        name: '',
        email: '',
        phone: '',
        zipCode: ''
      },
      updateFormData: () => {},
      nextStep: () => {},
      prevStep: () => {},
      handleFileUpload: () => {},
      removePhoto: () => {},
      calculatePrice: () => 0,
      canProceed: () => false,
      handleSubmit: () => {
        console.log("🚫 Houston form submission blocked - on DFW route");
      },
      isSubmitting: false
    };
  }
  
  const { formData, updateFormData } = useQuoteFormData();
  const { calculatePrice } = useQuotePricing(formData);
  
  const { currentStep, totalSteps, nextStep, prevStep, canProceed } = useQuoteNavigation(
    formData,
    calculatePrice
  );

  const { handleFileUpload, removePhoto } = useQuoteFileHandling(formData, updateFormData);
  const { handleSubmit: handleSubmitHouston, isSubmitting: isSubmittingHouston } = useQuoteSubmission(leadSource);
  
  console.log("✅ useQuoteForm - Houston hooks initialized");
  
  const handleSubmit = () => {
    // Simple check - if on DFW route, block
    if (location.pathname.includes('/quotedfw')) {
      console.log("🚫 Houston form submission blocked - on DFW route");
      return;
    }
    
    console.log("✅ Houston form submission proceeding");
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
