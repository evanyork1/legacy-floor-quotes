export interface OverlayOptions {
  blendMode?: GlobalCompositeOperation;
  opacity?: number;
  brightness?: number;
}

export const applyFloorTexture = async (
  baseImage: HTMLImageElement,
  textureImage: HTMLImageElement,
  options: OverlayOptions = {}
): Promise<string> => {
  const {
    blendMode = 'multiply',
    opacity = 0.7,
    brightness = 1.0
  } = options;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) throw new Error('Could not get canvas context');

  // Set canvas size to match base image
  canvas.width = baseImage.width;
  canvas.height = baseImage.height;

  // Draw the original image
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

  // Apply brightness adjustment to simulate epoxy shine
  if (brightness !== 1.0) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, data[i] * brightness);
      data[i + 1] = Math.min(255, data[i + 1] * brightness);
      data[i + 2] = Math.min(255, data[i + 2] * brightness);
    }
    
    ctx.putImageData(imageData, 0, 0);
  }

  // Set blend mode and opacity for texture overlay
  ctx.globalCompositeOperation = blendMode;
  ctx.globalAlpha = opacity;

  // Draw the texture/color overlay
  ctx.drawImage(textureImage, 0, 0, canvas.width, canvas.height);

  // Reset composition mode
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1.0;

  return canvas.toDataURL('image/jpeg', 0.9);
};

export const loadImageFromUrl = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};

export const loadImageFromFile = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
