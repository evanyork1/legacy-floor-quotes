import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeadWebhookData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  questions_comments?: string;
  privacy_policy_agreed: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Lead webhook function called");

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get lead data from request
    const leadData: LeadWebhookData = await req.json();
    console.log("Received lead data:", leadData);

    // Fetch the lead webhook URL from settings
    const { data: webhookSettings, error: fetchError } = await supabase
      .from('webhook_settings')
      .select('lead_webhook_url')
      .eq('id', 1)
      .single();

    if (fetchError) {
      console.error("Error fetching webhook settings:", fetchError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch webhook settings" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!webhookSettings?.lead_webhook_url) {
      console.log("No lead webhook URL configured");
      return new Response(
        JSON.stringify({ message: "No lead webhook URL configured" }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Prepare webhook payload
    const webhookPayload = {
      timestamp: new Date().toISOString(),
      event_type: "lead_submitted",
      lead: {
        first_name: leadData.first_name,
        last_name: leadData.last_name,
        email: leadData.email,
        phone: leadData.phone,
        questions_comments: leadData.questions_comments || "",
        privacy_policy_agreed: leadData.privacy_policy_agreed,
        source: "website_lead_form"
      }
    };

    console.log("Sending webhook to:", webhookSettings.lead_webhook_url);
    console.log("Webhook payload:", webhookPayload);

    // Send webhook to Zapier
    const webhookResponse = await fetch(webhookSettings.lead_webhook_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      console.error("Webhook failed with status:", webhookResponse.status);
      const responseText = await webhookResponse.text();
      console.error("Webhook error response:", responseText);
      
      return new Response(
        JSON.stringify({ 
          error: "Webhook delivery failed", 
          status: webhookResponse.status,
          response: responseText 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log("Webhook sent successfully");
    return new Response(
      JSON.stringify({ message: "Lead webhook sent successfully" }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error("Error in lead webhook function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});