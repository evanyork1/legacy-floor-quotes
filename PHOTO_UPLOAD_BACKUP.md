# Photo Upload Feature Backup

This document contains all the original code for the photo upload functionality that was removed from the quote form to streamline the process. Use this to restore the functionality when needed.

## Overview

The photo upload feature consisted of two steps:
- **Step 3**: Exterior Photos Upload
- **Step 4**: Damage Photos Upload

The feature was temporarily removed to reduce the quote process from 7 steps to 5 steps.

## Files Modified

### 1. `src/hooks/quote/useQuoteNavigation.tsx`

**Original totalSteps:**
```typescript
const totalSteps = 7;
```

**Original nextStep logic (lines 98-109):**
```typescript
const nextStep = () => {
  if (currentStep < totalSteps) {
      if (currentStep === 6) {
          // Submit to database when moving from step 6 to step 7
          submitQuote(formData);
      } else if (currentStep === 1 && formData.garageType !== "custom") {
          setCurrentStep(3); // Skip step 2 if garageType is not custom
      } else {
          setCurrentStep(currentStep + 1);
      }
  }
};
```

**Original prevStep logic (lines 111-119):**
```typescript
const prevStep = () => {
  if (currentStep > 1) {
      if (currentStep === 3 && formData.garageType !== "custom") {
          setCurrentStep(1); // Skip back to step 1 if garageType is not custom
      } else {
          setCurrentStep(currentStep - 1);
      }
  }
};
```

**Original canProceed validation (lines 125-126):**
```typescript
case 3: return true;
case 4: return true;
```

### 2. `src/components/quote/QuoteStepRenderer.tsx`

**Original step cases (lines 34-37):**
```typescript
case 3:
  return <Step3ExteriorPhotos formData={formData} handleFileUpload={handleFileUpload} removePhoto={removePhoto} />;
case 4:
  return <Step4DamagePhotos formData={formData} handleFileUpload={handleFileUpload} removePhoto={removePhoto} />;
```

### 3. `src/hooks/quote/useQuoteSubmission.tsx`

**Original photo upload logic (lines 51-63):**
```typescript
// Upload photos first
let exteriorPhotoUrls: string[] = [];
let damagePhotoUrls: string[] = [];

if (formData.exteriorPhotos.length > 0) {
    console.log('Uploading exterior photos...');
    exteriorPhotoUrls = await uploadPhotos(formData.exteriorPhotos, 'exterior');
}

if (formData.damagePhotos.length > 0) {
    console.log('Uploading damage photos...');
    damagePhotoUrls = await uploadPhotos(formData.damagePhotos, 'damage');
}
```

**Original uploadPhotos function (lines 14-39):**
```typescript
const uploadPhotos = async (photos: File[], folder: string): Promise<string[]> => {
  const uploadedUrls: string[] = [];
  
  for (const photo of photos) {
    const fileExt = photo.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('quote_photos')
      .upload(filePath, photo);

    if (uploadError) {
      console.error('Photo upload error:', uploadError);
      throw new Error(`Failed to upload photo: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('quote_photos')
      .getPublicUrl(filePath);

    uploadedUrls.push(publicUrl);
  }

  return uploadedUrls;
};
```

## Restoration Instructions

### To restore photo uploads:

1. **Update `src/hooks/quote/useQuoteNavigation.tsx`:**
   - Change `totalSteps = 5` back to `totalSteps = 7`
   - Restore original nextStep and prevStep logic
   - Restore canProceed cases 3 and 4

2. **Update `src/components/quote/QuoteStepRenderer.tsx`:**
   - Uncomment cases 3 and 4
   - Adjust remaining case numbers back to original

3. **Update `src/hooks/quote/useQuoteSubmission.tsx`:**
   - Uncomment the uploadPhotos function
   - Restore photo upload logic in handleSubmit

4. **Verify imports:**
   - Ensure Step3ExteriorPhotos and Step4DamagePhotos are imported in QuoteStepRenderer

## Benefits of Current Implementation

- **Faster process:** Reduced from 7 steps to 5 steps
- **Less friction:** Removes potential barrier for users
- **Preserved logic:** All functionality intact for easy restoration
- **No data loss:** Database still accepts photo arrays (they're just empty/null)

## Impact on Database

The database schema remains unchanged. The `exterior_photos` and `damage_photos` columns still exist and accept arrays, they just receive empty arrays or null values when photos aren't uploaded.