
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCw, Save } from "lucide-react";

interface WebhooksTabProps {
  webhookUrl: string;
  leadWebhookUrl: string;
  floorPacketWebhookUrl: string;
  depositWebhookUrl?: string;
  savingWebhook: boolean;
  onWebhookUrlChange: (url: string) => void;
  onLeadWebhookUrlChange: (url: string) => void;
  onFloorPacketWebhookUrlChange: (url: string) => void;
  onDepositWebhookUrlChange?: (url: string) => void;
  onSaveWebhookUrl: () => void;
}

const WebhooksTab: React.FC<WebhooksTabProps> = ({
  webhookUrl,
  leadWebhookUrl,
  floorPacketWebhookUrl,
  depositWebhookUrl = "",
  savingWebhook,
  onWebhookUrlChange,
  onLeadWebhookUrlChange,
  onFloorPacketWebhookUrlChange,
  onDepositWebhookUrlChange,
  onSaveWebhookUrl
}) => {
  return (
    <div className="space-y-6">
      {/* Quote Webhooks */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Quote Email Notifications via Zapier</CardTitle>
          <p className="text-gray-400">Configure webhook to trigger email notifications when quotes are submitted</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-gray-300">Quote Zapier Webhook URL</Label>
            <Input 
              value={webhookUrl}
              onChange={(e) => onWebhookUrlChange(e.target.value)}
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              className="bg-gray-600 border-gray-500 text-white"
            />
            <p className="text-xs text-gray-400 mt-1">
              Paste your Zapier webhook URL here to receive quote notifications
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
                Save Webhook URLs
              </>
            )}
          </Button>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-white font-medium mb-2">Quote Setup Instructions:</h3>
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
            <h3 className="text-white font-medium mb-2">Quote Webhook Data Structure:</h3>
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

      {/* Lead Form Webhooks */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Lead Form Email Notifications via Zapier</CardTitle>
          <p className="text-gray-400">Configure webhook to trigger email notifications when lead forms are submitted</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-gray-300">Lead Form Zapier Webhook URL</Label>
            <Input 
              value={leadWebhookUrl}
              onChange={(e) => onLeadWebhookUrlChange(e.target.value)}
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              className="bg-gray-600 border-gray-500 text-white"
            />
            <p className="text-xs text-gray-400 mt-1">
              Paste your Zapier webhook URL here to receive lead form notifications
            </p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-white font-medium mb-2">Lead Form Setup Instructions:</h3>
            <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
              <li>Go to Zapier and create a new Zap</li>
              <li>Choose "Webhooks by Zapier" as the trigger</li>
              <li>Select "Catch Hook" as the trigger event</li>
              <li>Copy the webhook URL and paste it above</li>
              <li>Set up your action (Gmail, Outlook, etc.) to send formatted emails</li>
              <li>Test by submitting a lead form on your website</li>
            </ol>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-white font-medium mb-2">Lead Webhook Data Structure:</h3>
            <pre className="text-gray-300 text-xs overflow-x-auto">
{`{
  "timestamp": "2024-01-01T12:00:00Z",
  "event_type": "lead_submitted",
  "lead": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "555-123-4567",
    "questions_comments": "I'm interested in...",
    "privacy_policy_agreed": true,
    "source": "website_lead_form"
  }
}`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Floor Packet Webhooks */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Floor Packet Notifications via Zapier</CardTitle>
          <p className="text-gray-400">Get notified when someone submits their info to see their garage report</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-gray-300">Floor Packet Zapier Webhook URL</Label>
            <Input 
              value={floorPacketWebhookUrl}
              onChange={(e) => onFloorPacketWebhookUrlChange(e.target.value)}
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              className="bg-gray-600 border-gray-500 text-white"
            />
            <p className="text-xs text-gray-400 mt-1">
              Paste your Zapier webhook URL here to receive floor packet notifications
            </p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-white font-medium mb-2">Floor Packet Setup Instructions:</h3>
            <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
              <li>Go to Zapier and create a new Zap</li>
              <li>Choose "Webhooks by Zapier" as the trigger</li>
              <li>Select "Catch Hook" as the trigger event</li>
              <li>Copy the webhook URL and paste it above</li>
              <li>Set up your action (Gmail, SMS, Slack, etc.) to notify you</li>
              <li>Test by completing the garage packet form on your website</li>
            </ol>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-white font-medium mb-2">Floor Packet Webhook Data Structure:</h3>
            <pre className="text-gray-300 text-xs overflow-x-auto">
{`{
  "timestamp": "2024-01-01T12:00:00Z",
  "event_type": "floor_packet_submitted",
  "lead": {
    "id": "abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-123-4567",
    "garage_type": "2-car",
    "selected_color": "Domino",
    "estimated_price": 3400,
    "estimated_price_formatted": "$3,400",
    "results_page_url": "https://yoursite.com/garage-packet-result/abc123"
  }
}`}
            </pre>
          </div>
        </CardContent>
      </Card>
      {/* Deposit Webhook */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">$100 Deposit Requested → Jobber Quote</CardTitle>
          <p className="text-gray-400">Fires when a customer clicks "Make a $100 Deposit to Get Started" and submits their address. Send this to the Zap that creates a Jobber quote.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-300">Deposit Zapier Webhook URL</Label>
            <Input
              value={depositWebhookUrl}
              onChange={(e) => onDepositWebhookUrlChange?.(e.target.value)}
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              className="bg-gray-600 border-gray-500 text-white"
            />
            <p className="text-xs text-gray-400 mt-1">
              Payload includes name, email, phone, address, garage_type, selected_color, estimated_price, and results_page_url.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebhooksTab;
