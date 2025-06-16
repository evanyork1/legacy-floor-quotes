
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { FormData } from "@/components/quote/types";

export const useQuotePricing = (formData: FormData) => {
  const { toast } = useToast();

  const { data: pricingSettings } = useQuery({
    queryKey: ['pricingSettings'],
    queryFn: async () => {
        const { data, error } = await supabase
            .from('pricing_settings')
            .select('*')
            .limit(1)
            .single();
        if (error) {
            console.error("Error fetching pricing", error);
            toast({
                title: "Error",
                description: "Could not load pricing information. Please try again later.",
                variant: "destructive",
            });
            throw new Error(error.message);
        }
        return data;
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  const calculatePrice = () => {
    if (!pricingSettings) return 0;

    let price = 0;
    
    const calculateSpacePrice = (space: { garageType: string; customSqft: string; }) => {
        if (space.garageType === "2-car") return pricingSettings.price_2_car;
        if (space.garageType === "3-car") return pricingSettings.price_3_car;
        if (space.garageType === "4-car") return pricingSettings.price_4_car;
        if (space.garageType === "custom" && space.customSqft) {
          return parseInt(space.customSqft) * pricingSettings.price_per_sqft;
        }
        return 0;
    }

    // Main garage price
    price += calculateSpacePrice({ garageType: formData.garageType, customSqft: formData.customSqft });

    // Additional spaces price
    formData.additionalSpaces.forEach(space => {
        price += calculateSpacePrice(space);
    });
    
    return price;
  };

  return {
    calculatePrice
  };
};
