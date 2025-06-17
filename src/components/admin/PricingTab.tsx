
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Save } from "lucide-react";
import { PricingTier } from "@/types/admin";

interface PricingTabProps {
  pricingTiers: PricingTier[];
  onUpdatePricingTier: (id: string, field: keyof PricingTier, value: number) => void;
}

const PricingTab: React.FC<PricingTabProps> = ({
  pricingTiers,
  onUpdatePricingTier
}) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Pricing Tiers</CardTitle>
        <p className="text-gray-400">Set your base pricing per square foot</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {pricingTiers.map((tier) => (
          <div key={tier.id} className="grid grid-cols-4 gap-4 p-4 bg-gray-700 rounded-lg">
            <div>
              <Label className="text-gray-300">Min Sq Ft</Label>
              <Input 
                type="number"
                value={tier.min_sqft}
                onChange={(e) => onUpdatePricingTier(tier.id, 'min_sqft', parseInt(e.target.value))}
                className="bg-gray-600 border-gray-500 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Max Sq Ft</Label>
              <Input 
                type="number"
                value={tier.max_sqft}
                onChange={(e) => onUpdatePricingTier(tier.id, 'max_sqft', parseInt(e.target.value))}
                className="bg-gray-600 border-gray-500 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Price per Sq Ft</Label>
              <Input 
                type="number"
                step="0.50"
                value={tier.price_per_sqft}
                onChange={(e) => onUpdatePricingTier(tier.id, 'price_per_sqft', parseFloat(e.target.value))}
                className="bg-gray-600 border-gray-500 text-white"
              />
            </div>
            <div className="flex items-end">
              <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save Pricing Changes
        </Button>
      </CardContent>
    </Card>
  );
};

export default PricingTab;
