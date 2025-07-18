
import { useState, useEffect } from "react";
import type { FormData } from "@/components/quote/types";

export const useQuoteNavigation = (
  formData: FormData,
  calculatePrice: () => number,
  onSubmitAtStep4?: () => void
) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5; // Reduced from 7 to skip photo upload steps (3&4)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      // If moving from step 4 to step 5, trigger submission first
      if (currentStep === 4 && onSubmitAtStep4) {
        onSubmitAtStep4();
      }
      
      if (currentStep === 1 && formData.garageType !== "custom") {
        setCurrentStep(3); // Skip step 2 if garageType is not custom, go to color choice
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
      case 3: return formData.colorChoice !== "";
      case 4: {
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
      case 5: return true;
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
