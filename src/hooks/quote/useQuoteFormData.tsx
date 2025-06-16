
import { useState } from "react";
import type { FormData } from "@/components/quote/types";

export const useQuoteFormData = () => {
  const [formData, setFormData] = useState<FormData>({
    garageType: "",
    customSqft: "",
    spaceType: "",
    otherSpaceType: "",
    additionalSpaces: [],
    exteriorPhotos: [],
    damagePhotos: [],
    colorChoice: "",
    name: "",
    email: "",
    phone: "",
    zipCode: ""
  });

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    updateFormData
  };
};
