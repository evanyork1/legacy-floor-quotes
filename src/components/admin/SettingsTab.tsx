
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

const SettingsTab: React.FC = () => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">System Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-gray-300">Business Name</Label>
          <Input 
            defaultValue="Premier Garage Floors"
            className="bg-gray-600 border-gray-500 text-white"
          />
        </div>
        <div>
          <Label className="text-gray-300">Contact Phone</Label>
          <Input 
            defaultValue="(555) 123-4567"
            className="bg-gray-600 border-gray-500 text-white"
          />
        </div>
        <div>
          <Label className="text-gray-300">Service Areas (ZIP codes, comma-separated)</Label>
          <Input 
            defaultValue="75201, 75202, 75203, 75204"
            className="bg-gray-600 border-gray-500 text-white"
          />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
