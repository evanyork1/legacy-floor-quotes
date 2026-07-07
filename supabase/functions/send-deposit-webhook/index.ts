import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DepositWebhookData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  garage_type: string;
  custom_sqft?: number | null;
  selected_color: string;
  estimated_price: number;
  visualization_url?: string | null;
  deposit_requested_at?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Deposit webhook function called');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const depositData: DepositWebhookData = await req.json();
    console.log('Received deposit data:', depositData);

    const { data: webhookSettings, error: settingsError } = await supabase
      .from('webhook_settings')
      .select('deposit_webhook_url')
      .eq('id', 1)
      .single();

    if (settingsError) {
      console.error('Error fetching webhook settings:', settingsError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch webhook settings' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!webhookSettings?.deposit_webhook_url) {
      console.log('No deposit webhook URL configured, skipping webhook call');
      return new Response(
        JSON.stringify({ message: 'No deposit webhook URL configured' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const baseUrl = req.headers.get('origin') || 'https://legacy-floor-quotes.lovable.app';
    const resultsPageUrl = `${baseUrl}/garage-packet-result/${depositData.id}`;

    const webhookPayload = {
      timestamp: new Date().toISOString(),
      event_type: 'deposit_requested',
      lead: {
        id: depositData.id,
        name: depositData.name,
        email: depositData.email,
        phone: depositData.phone,
        address: depositData.address,
        garage_type: depositData.garage_type,
        custom_sqft: depositData.custom_sqft ?? null,
        selected_color: depositData.selected_color,
        estimated_price: depositData.estimated_price,
        estimated_price_formatted: `$${(depositData.estimated_price ?? 0).toLocaleString()}`,
        visualization_url: depositData.visualization_url ?? null,
        deposit_requested_at: depositData.deposit_requested_at ?? new Date().toISOString(),
        results_page_url: resultsPageUrl,
      }
    };

    console.log('Sending deposit webhook to:', webhookSettings.deposit_webhook_url);
    console.log('Deposit webhook payload:', webhookPayload);

    const webhookResponse = await fetch(webhookSettings.deposit_webhook_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error('Deposit webhook failed:', webhookResponse.status, errorText);
      return new Response(
        JSON.stringify({
          error: 'Webhook failed',
          status: webhookResponse.status,
          response: errorText,
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Deposit webhook sent successfully');
    return new Response(
      JSON.stringify({ message: 'Webhook sent successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in deposit webhook function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
