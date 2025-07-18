
import { useState, useEffect } from "react";
import type { FormData } from "@/components/quote/types";

export const useQuoteNavigation = (
  formData: FormData,
  calculatePrice: () => number
) => {
  const [currentStep, setCurrentStep] = useState(1);
  // PHOTO_UPLOAD_BACKUP: Original was totalSteps = 7
  const totalSteps = 5; // Reduced from 7 to skip photo upload steps (3&4)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < totalSteps) {
        if (currentStep === 1 && formData.garageType !== "custom") {
            setCurrentStep(3); // Skip step 2 if garageType is not custom, go to color choice (was step 5, now step 3)
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
      // PHOTO_UPLOAD_BACKUP: Steps 3&4 were photo uploads, now removed
      // case 3: return true; // Exterior photos
      // case 4: return true; // Damage photos
      case 3: return formData.colorChoice !== ""; // Was step 5, now step 3
      case 4: { // Was step 6, now step 4
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
      case 5: return true; // Was step 7, now step 5
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
