
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCw, Save } from "lucide-react";

interface WebhooksTabProps {
  webhookUrl: string;
  dfwWebhookUrl: string;
  savingWebhook: boolean;
  onWebhookUrlChange: (url: string) => void;
  onDfwWebhookUrlChange: (url: string) => void;
  onSaveWebhookUrl: () => void;
}

const WebhooksTab: React.FC<WebhooksTabProps> = ({
  webhookUrl,
  dfwWebhookUrl,
  savingWebhook,
  onWebhookUrlChange,
  onDfwWebhookUrlChange,
  onSaveWebhookUrl
}) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Email Notifications via Zapier</CardTitle>
        <p className="text-gray-400">Configure webhook to trigger email notifications when quotes are submitted</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-gray-300">Houston Quotes Webhook URL</Label>
          <Input 
            value={webhookUrl}
            onChange={(e) => onWebhookUrlChange(e.target.value)}
            placeholder="https://hooks.zapier.com/hooks/catch/..."
            className="bg-gray-600 border-gray-500 text-white"
          />
          <p className="text-xs text-gray-400 mt-1">
            Webhook URL for Houston quote notifications
          </p>
        </div>
        
        <div>
          <Label className="text-gray-300">DFW Quotes Webhook URL</Label>
          <Input 
            value={dfwWebhookUrl}
            onChange={(e) => onDfwWebhookUrlChange(e.target.value)}
            placeholder="https://hooks.zapier.com/hooks/catch/..."
            className="bg-gray-600 border-gray-500 text-white"
          />
          <p className="text-xs text-gray-400 mt-1">
            Webhook URL for DFW quote notifications
          </p>
        </div>
        
        <Button 
          onClick={onSaveWebhookUrl} 
          disabled={savingWebhook}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {savingWebhook ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Webhook URL
            </>
          )}
        </Button>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-white font-medium mb-2">Setup Instructions:</h3>
          <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
            <li>Go to Zapier and create a new Zap</li>
            <li>Choose "Webhooks by Zapier" as the trigger</li>
            <li>Select "Catch Hook" as the trigger event</li>
            <li>Copy the webhook URL and paste it above</li>
            <li>Set up your action (Gmail, Outlook, etc.) to send formatted emails</li>
            <li>Test by submitting a quote on your website</li>
          </ol>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-white font-medium mb-2">Webhook Data Structure:</h3>
          <pre className="text-gray-300 text-xs overflow-x-auto">
{`{
  "timestamp": "2024-01-01T12:00:00Z",
  "event_type": "quote_submitted",
  "quote": {
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "customer_phone": "555-123-4567",
    "customer_zip_code": "12345",
    "garage_type": "2-car",
    "estimated_price": 3400,
    "estimated_price_formatted": "$3,400",
    "color_choice": "Gray",
    "exterior_photos_count": 3,
    "damage_photos_count": 1
  }
}`}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebhooksTab;
