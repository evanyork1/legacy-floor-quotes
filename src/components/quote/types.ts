
export interface AdditionalSpace {
  type: string;
  sqft: string;
  spaceType: string;
  otherSpaceType: string;
}

export interface FormData {
  garageType: string;
  customSqft: string;
  spaceType: string;
  otherSpaceType: string;
  additionalSpaces: AdditionalSpace[];
  exteriorPhotos: File[];
  damagePhotos: File[];
  colorChoice: string;
  name: string;
  email: string;
  phone: string;
  zipCode: string;
}

export interface ColorOption {
  id: string;
  name: string;
  thumbnail: string;
  preview: string;
}
