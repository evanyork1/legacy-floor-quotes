
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, Plus } from "lucide-react";
import { Subdomain } from "@/types/admin";

interface SubdomainsTabProps {
  subdomains: Subdomain[];
  onAddSubdomain: (name: string, multiplier: string) => void;
}

const SubdomainsTab: React.FC<SubdomainsTabProps> = ({
  subdomains,
  onAddSubdomain
}) => {
  const [newSubdomain, setNewSubdomain] = useState("");
  const [newMultiplier, setNewMultiplier] = useState("1.0");

  const handleAddSubdomain = () => {
    if (newSubdomain.trim()) {
      onAddSubdomain(newSubdomain, newMultiplier);
      setNewSubdomain("");
      setNewMultiplier("1.0");
    }
  };

  return (
    <div className="grid gap-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Create New Subdomain</CardTitle>
          <p className="text-gray-400">Generate location-specific landing pages with custom pricing</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-gray-300">Subdomain Name</Label>
              <Input 
                value={newSubdomain}
                onChange={(e) => setNewSubdomain(e.target.value)}
                placeholder="dallas"
                className="bg-gray-600 border-gray-500 text-white"
              />
              <p className="text-xs text-gray-400 mt-1">
                Will create: {newSubdomain.toLowerCase().replace(/[^a-z0-9]/g, '')}.yoursite.com
              </p>
            </div>
            <div>
              <Label className="text-gray-300">Pricing Multiplier</Label>
              <Input 
                type="number"
                step="0.1"
                value={newMultiplier}
                onChange={(e) => setNewMultiplier(e.target.value)}
                className="bg-gray-600 border-gray-500 text-white"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddSubdomain} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Subdomain
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Active Subdomains ({subdomains.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subdomains.map((subdomain) => (
              <div key={subdomain.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">{subdomain.name}.yoursite.com</h3>
                  <p className="text-gray-400 text-sm">
                    Pricing: {subdomain.pricing_multiplier}x base rate
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubdomainsTab;
