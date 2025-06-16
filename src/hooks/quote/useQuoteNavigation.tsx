
import { useState, useEffect } from "react";
import type { FormData } from "@/components/quote/types";

export const useQuoteNavigation = (
  formData: FormData,
  onSubmitQuote: (data: FormData) => void
) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < totalSteps) {
        if (currentStep === 6) {
            // Submit to database when moving from step 6 to step 7
            onSubmitQuote(formData);
        } else if (currentStep === 1 && formData.garageType !== "custom") {
            setCurrentStep(3); // Skip step 2 if garageType is not custom
        } else {
            setCurrentStep(currentStep + 1);
        }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
        if (currentStep === 3 && formData.garageType !== "custom") {
            setCurrentStep(1); // Skip back to step 1 if garageType is not custom
        } else {
            setCurrentStep(currentStep - 1);
        }
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.garageType !== "";
      case 2: return formData.customSqft !== "" && formData.spaceType !== "";
      case 3: return true;
      case 4: return true;
      case 5: return formData.colorChoice !== "";
      case 6: {
        // Check that all fields are filled
        const allFieldsFilled = formData.name !== "" && formData.email !== "" && formData.phone !== "" && formData.zipCode !== "";
        
        if (!allFieldsFilled) return false;
        
        // Validate phone (10 digits)
        const phoneDigits = formData.phone.replace(/\D/g, '');
        const phoneValid = phoneDigits.length === 10;
        
        // Validate email (contains @)
        const emailValid = formData.email.includes('@');
        
        // Validate zip code (5 digits)
        const zipDigits = formData.zipCode.replace(/\D/g, '');
        const zipValid = zipDigits.length === 5;
        
        return phoneValid && emailValid && zipValid;
      }
      case 7: return true;
      default: return false;
    }
  };

  return {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    canProceed,
    setCurrentStep
  };
};
