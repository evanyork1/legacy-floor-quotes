import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface FloorPacketWebhookData {
  id: string;
  name: string;
  email: string;
  phone: string;
  garage_type: string;
  custom_sqft?: number;
  selected_color: string;
  estimated_price: number;
  visualization_url?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Floor packet webhook function called');

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the floor packet data from the request
    const packetData: FloorPacketWebhookData = await req.json();
    console.log('Received floor packet data:', packetData);

    // Get the webhook URL from settings
    const { data: webhookSettings, error: settingsError } = await supabase
      .from('webhook_settings')
      .select('floor_packet_webhook_url')
      .eq('id', 1)
      .single();

    if (settingsError) {
      console.error('Error fetching webhook settings:', settingsError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch webhook settings' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!webhookSettings?.floor_packet_webhook_url) {
      console.log('No floor packet webhook URL configured, skipping webhook call');
      return new Response(
        JSON.stringify({ message: 'No floor packet webhook URL configured' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build the results page URL
    const baseUrl = req.headers.get('origin') || 'https://yoursite.com';
    const resultsPageUrl = `${baseUrl}/garage-packet-result/${packetData.id}`;

    // Format the data for Zapier
    const webhookPayload = {
      timestamp: new Date().toISOString(),
      event_type: 'floor_packet_submitted',
      lead: {
        id: packetData.id,
        name: packetData.name,
        email: packetData.email,
        phone: packetData.phone,
        garage_type: packetData.garage_type,
        custom_sqft: packetData.custom_sqft || null,
        selected_color: packetData.selected_color,
        estimated_price: packetData.estimated_price,
        estimated_price_formatted: `$${packetData.estimated_price.toLocaleString()}`,
        visualization_url: packetData.visualization_url || null,
        results_page_url: resultsPageUrl,
      }
    };

    console.log('Sending webhook to:', webhookSettings.floor_packet_webhook_url);
    console.log('Webhook payload:', webhookPayload);

    // Send the webhook to Zapier
    const webhookResponse = await fetch(webhookSettings.floor_packet_webhook_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      console.error('Webhook failed with status:', webhookResponse.status);
      const errorText = await webhookResponse.text();
      console.error('Webhook error response:', errorText);
      
      return new Response(
        JSON.stringify({ 
          error: 'Webhook failed', 
          status: webhookResponse.status,
          response: errorText 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Floor packet webhook sent successfully');
    return new Response(
      JSON.stringify({ message: 'Webhook sent successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in floor packet webhook function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});