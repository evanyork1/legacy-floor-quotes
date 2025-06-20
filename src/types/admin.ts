
export interface Quote {
  id: string;
  garage_type: string;
  custom_sqft?: number;
  space_type?: string;
  other_space_type?: string;
  exterior_photos: string[] | null;
  damage_photos: string[] | null;
  color_choice: string;
  name: string;
  email: string;
  phone: string;
  zip_code: string;
  estimated_price: number;
  created_at: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  archived: boolean;
  lead_source?: string;
}

export interface PricingTier {
  id: string;
  min_sqft: number;
  max_sqft: number;
  price_per_sqft: number;
}

export interface Subdomain {
  id: string;
  name: string;
  pricing_multiplier: number;
  custom_pricing: PricingTier[];
  created_at: string;
}
