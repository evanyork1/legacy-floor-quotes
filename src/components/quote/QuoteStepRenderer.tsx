
import type { FormData } from "./types";
import { Step1GarageSize } from "./Step1GarageSize";
import { Step2CustomSpace } from "./Step2CustomSpace";
import { Step3ExteriorPhotos } from "./Step3ExteriorPhotos";
import { Step4DamagePhotos } from "./Step4DamagePhotos";
import { Step5ColorChoice } from "./Step5ColorChoice";
import { Step6ContactInfo } from "./Step6ContactInfo";
import { Step7QuoteSummary } from "./Step7QuoteSummary";
import { colorOptions } from "@/constants/colorOptions";

interface QuoteStepRendererProps {
  currentStep: number;
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'exterior' | 'damage') => void;
  removePhoto: (index: number, type: 'exterior' | 'damage') => void;
  estimatedPrice: number;
}

export const QuoteStepRenderer = ({
  currentStep,
  formData,
  updateFormData,
  handleFileUpload,
  removePhoto,
  estimatedPrice
}: QuoteStepRendererProps) => {
  switch (currentStep) {
    case 1:
      return <Step1GarageSize formData={formData} updateFormData={updateFormData} />;
    case 2:
      return <Step2CustomSpace formData={formData} updateFormData={updateFormData} />;
    // PHOTO_UPLOAD_BACKUP: Cases 3&4 removed to skip photo uploads
    // case 3:
    //   return <Step3ExteriorPhotos formData={formData} handleFileUpload={handleFileUpload} removePhoto={removePhoto} />;
    // case 4:
    //   return <Step4DamagePhotos formData={formData} handleFileUpload={handleFileUpload} removePhoto={removePhoto} />;
    case 3: // Was step 5, now step 3
      return <Step5ColorChoice formData={formData} updateFormData={updateFormData} colorOptions={colorOptions} />;
    case 4: // Was step 6, now step 4
      return <Step6ContactInfo formData={formData} updateFormData={updateFormData} />;
    case 5: // Was step 7, now step 5
      return <Step7QuoteSummary formData={formData} estimatedPrice={estimatedPrice} />;
    default:
      return null;
  }
};
