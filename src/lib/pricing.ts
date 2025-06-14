export interface GarageConfig {
  id: string;
  name: string;
  sqft: number;
  price_per_sqft: number;
}

export interface PricingTier {
  id: string;
  min_sqft: number;
  max_sqft: number;
  price_per_sqft: number;
}

export interface PricingConfig {
  garageConfigs: GarageConfig[];
  pricingTiers: PricingTier[];
}

// Default configuration that matches current Quote page
const defaultPricingConfig: PricingConfig = {
  garageConfigs: [
    { id: '1-car', name: '1-Car Garage', sqft: 425, price_per_sqft: 8 },
    { id: '2-car', name: '2-Car Garage', sqft: 650, price_per_sqft: 7 },
    { id: '3-car', name: '3-Car Garage', sqft: 900, price_per_sqft: 6 }
  ],
  pricingTiers: [
    { id: "1", min_sqft: 0, max_sqft: 500, price_per_sqft: 8 },
    { id: "2", min_sqft: 501, max_sqft: 800, price_per_sqft: 7 },
    { id: "3", min_sqft: 801, max_sqft: 1200, price_per_sqft: 6 },
    { id: "4", min_sqft: 1201, max_sqft: 9999, price_per_sqft: 5 }
  ]
};

export const getPricingConfig = (): PricingConfig => {
  const stored = localStorage.getItem('pricingConfig');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing pricing config:', e);
    }
  }
  return defaultPricingConfig;
};

export const setPricingConfig = (config: PricingConfig): void => {
  localStorage.setItem('pricingConfig', JSON.stringify(config));
};

export const calculatePrice = (sqft: number, config: PricingConfig): number => {
  // First check if it matches a specific garage config
  const garageConfig = config.garageConfigs.find(g => g.sqft === sqft);
  if (garageConfig) {
    return garageConfig.sqft * garageConfig.price_per_sqft;
  }
  
  // Otherwise use pricing tiers
  const tier = config.pricingTiers.find(t => sqft >= t.min_sqft && sqft <= t.max_sqft);
  if (tier) {
    return sqft * tier.price_per_sqft;
  }
  
  // Fallback to highest tier
  const highestTier = config.pricingTiers[config.pricingTiers.length - 1];
  return sqft * highestTier.price_per_sqft;
};
