
import { useQuoteFormData } from "./quote/useQuoteFormData";
import { useQuoteNavigation } from "./quote/useQuoteNavigation";
import { useQuoteFileHandling } from "./quote/useQuoteFileHandling";
import { useQuotePricing } from "./quote/useQuotePricing";
import { useQuoteSubmission } from "./quote/useQuoteSubmission";
import { useLocation } from "react-router-dom";

export const useQuoteForm = (leadSource?: string) => {
  const location = useLocation();
  
  // Check for DFW context - but don't throw errors, just block gracefully
  const currentPath = window.location.pathname;
  const isDFWPath = currentPath.includes('quotedfw') || currentPath.includes('/dfw');
  const activeDFWSubmission = sessionStorage.getItem('ACTIVE_DFW_SUBMISSION');
  const blockHouston = sessionStorage.getItem('BLOCK_HOUSTON_SUBMISSION');
  const submissionType = sessionStorage.getItem('SUBMISSION_TYPE');
  const dfwComponentActive = sessionStorage.getItem('DFW_COMPONENT_ACTIVE');
  
  console.log("🔍 useQuoteForm - DFW context check:", {
    currentPath,
    isDFWPath,
    activeDFWSubmission,
    blockHouston,
    submissionType,
    dfwComponentActive,
    shouldBlock: isDFWPath || activeDFWSubmission || blockHouston === 'true' || submissionType === 'DFW_ONLY' || dfwComponentActive
  });
  
  // If in DFW context, return null values to gracefully disable the form
  const isDFWContext = isDFWPath || activeDFWSubmission || blockHouston === 'true' || submissionType === 'DFW_ONLY' || dfwComponentActive;
  
  if (isDFWContext) {
    console.log("🚫 Houston form hook blocked - DFW context detected, returning null values");
    return {
      currentStep: 1,
      totalSteps: 5,
      formData: {
        garageType: '',
        customSqft: '',
        spaceType: '',
        otherSpaceType: '',
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
        console.log("🚫 Houston form submission blocked - DFW context");
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
  
  console.log("✅ useQuoteForm - Houston hooks initialized for confirmed Houston context");
  
  const handleSubmit = () => {
    // Final check - if DFW context detected, block submission
    const finalCheck = window.location.pathname.includes('/quotedfw') || 
                      window.location.pathname.includes('/dfw') ||
                      sessionStorage.getItem('ACTIVE_DFW_SUBMISSION') || 
                      sessionStorage.getItem('BLOCK_HOUSTON_SUBMISSION') === 'true' ||
                      sessionStorage.getItem('DFW_COMPONENT_ACTIVE');
    
    if (finalCheck) {
      console.log("🚫 Houston form submission blocked at final step - DFW context detected");
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
