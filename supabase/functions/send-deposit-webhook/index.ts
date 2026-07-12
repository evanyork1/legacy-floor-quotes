const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
    const webhookUrl = Deno.env.get('DEPOSIT_WEBHOOK_URL');
    if (!webhookUrl) {
      console.error('DEPOSIT_WEBHOOK_URL secret is not set');
      return new Response(
        JSON.stringify({ error: 'DEPOSIT_WEBHOOK_URL not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const depositData: DepositWebhookData = await req.json();
    console.log('Deposit webhook received for id:', depositData.id);

    const origin = req.headers.get('origin') || '';
    const resultsPageUrl = origin
      ? `${origin}/garage-packet-result/${depositData.id}`
      : `/garage-packet-result/${depositData.id}`;

    const payload = {
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
      },
    };

    console.log('Posting deposit webhook to Zapier');
    const zapRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const zapText = await zapRes.text();
    console.log('Zapier response', zapRes.status, zapText);

    if (!zapRes.ok) {
      return new Response(
        JSON.stringify({ error: 'Zapier webhook failed', status: zapRes.status, response: zapText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Webhook sent successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('send-deposit-webhook error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
