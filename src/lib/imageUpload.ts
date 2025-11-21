import { supabase } from '@/integrations/supabase/client';

/**
 * Convert base64 data URL to Blob
 */
export const dataURLtoBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

/**
 * Upload image to Supabase storage and return public URL
 */
export const uploadImageToStorage = async (
  dataURL: string,
  filename: string
): Promise<string | null> => {
  try {
    const blob = dataURLtoBlob(dataURL);
    const file = new File([blob], filename, { type: 'image/jpeg' });

    const { error: uploadError } = await supabase.storage
      .from('quote_photos')
      .upload(filename, file, {
        upsert: false,
        cacheControl: '3600'
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('quote_photos')
      .getPublicUrl(filename);

    return publicUrl;
  } catch (error) {
    console.error('Image upload error:', error);
    return null;
  }
};

/**
 * Generate unique filename with timestamp
 */
export const generateUniqueFilename = (prefix: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}.jpg`;
};
