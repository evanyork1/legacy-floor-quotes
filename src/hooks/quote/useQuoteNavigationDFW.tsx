
import { useState, useEffect } from "react";
import type { FormData } from "@/components/quote/types";

export const useQuoteNavigationDFW = (formData: FormData) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const nextStep = () => {
    console.log("🎯 DFW Navigation - Next step from:", currentStep);
    if (currentStep < totalSteps) {
      if (currentStep === 1 && formData.garageType !== "custom") {
        console.log("🎯 DFW Navigation - Skipping step 2 (not custom)");
        setCurrentStep(3); // Skip step 2 if garageType is not custom
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    console.log("🎯 DFW Navigation - Previous step from:", currentStep);
    if (currentStep > 1) {
      if (currentStep === 3 && formData.garageType !== "custom") {
        console.log("🎯 DFW Navigation - Skipping back to step 1 (not custom)");
        setCurrentStep(1); // Skip back to step 1 if garageType is not custom
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const canProceed = () => {
    console.log("🎯 DFW Navigation - Checking canProceed for step:", currentStep, "with formData:", formData);
    
    switch (currentStep) {
      case 1: 
        const step1Valid = formData.garageType !== "";
        console.log("🎯 DFW Navigation - Step 1 valid:", step1Valid, "garageType:", formData.garageType);
        return step1Valid;
        
      case 2: 
        const step2Valid = formData.customSqft !== "" && formData.spaceType !== "";
        console.log("🎯 DFW Navigation - Step 2 valid:", step2Valid, "customSqft:", formData.customSqft, "spaceType:", formData.spaceType);
        return step2Valid;
        
      case 3: 
        const step3Valid = formData.colorChoice !== "";
        console.log("🎯 DFW Navigation - Step 3 valid:", step3Valid, "colorChoice:", formData.colorChoice);
        return step3Valid;
        
      case 4: {
        const allFieldsFilled = formData.name !== "" && formData.email !== "" && formData.phone !== "" && formData.zipCode !== "";
        
        if (!allFieldsFilled) {
          console.log("🎯 DFW Navigation - Step 4 missing fields:", {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            zipCode: formData.zipCode
          });
          return false;
        }
        
        const phoneDigits = formData.phone.replace(/\D/g, '');
        const phoneValid = phoneDigits.length === 10;
        
        const emailValid = formData.email.includes('@');
        
        const zipDigits = formData.zipCode.replace(/\D/g, '');
        const zipValid = zipDigits.length === 5;
        
        const step4Valid = phoneValid && emailValid && zipValid;
        console.log("🎯 DFW Navigation - Step 4 validation:", {
          phoneValid,
          emailValid,
          zipValid,
          overall: step4Valid
        });
        return step4Valid;
      }
      case 5: 
        console.log("🎯 DFW Navigation - Step 5 always valid");
        return true;
        
      default: 
        console.log("🎯 DFW Navigation - Unknown step:", currentStep);
        return false;
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
