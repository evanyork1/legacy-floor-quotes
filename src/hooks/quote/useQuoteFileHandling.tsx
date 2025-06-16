
import type { FormData } from "@/components/quote/types";

export const useQuoteFileHandling = (
  formData: FormData,
  updateFormData: (field: keyof FormData, value: any) => void
) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'exterior' | 'damage') => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const field = type === 'exterior' ? 'exteriorPhotos' : 'damagePhotos';
      updateFormData(field, [...formData[field], ...files]);
    }
  };

  const removePhoto = (index: number, type: 'exterior' | 'damage') => {
    const field = type === 'exterior' ? 'exteriorPhotos' : 'damagePhotos';
    const newPhotos = formData[field].filter((_, i) => i !== index);
    updateFormData(field, newPhotos);
  };

  return {
    handleFileUpload,
    removePhoto
  };
};
