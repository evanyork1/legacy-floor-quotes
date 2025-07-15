
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface QuoteWebhookData {
  id: string;
  name: string;
  email: string;
  phone: string;
  zip_code: string;
  garage_type: string;
  custom_sqft?: number;
  space_type?: string;
  other_space_type?: string;
  color_choice: string;
  estimated_price: number;
  exterior_photos?: string[];
  damage_photos?: string[];
  created_at: string;
  status: string;
  lead_source: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Quote webhook function called');

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the quote data from the request
    const quoteData: QuoteWebhookData = await req.json();
    console.log('Received quote data:', quoteData);

    // Get the appropriate webhook URL based on lead source
    const { data: webhookSettings, error: settingsError } = await supabase
      .from('webhook_settings')
      .select('zapier_webhook_url, dfw_webhook_url')
      .eq('id', 1)
      .single();

    if (settingsError) {
      console.error('Error fetching webhook settings:', settingsError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch webhook settings' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Choose the appropriate webhook URL based on lead source
    const isFromDFW = quoteData.lead_source === 'DFW';
    const webhookUrl = isFromDFW ? webhookSettings?.dfw_webhook_url : webhookSettings?.zapier_webhook_url;

    if (!webhookUrl) {
      console.log(`No webhook URL configured for ${isFromDFW ? 'DFW' : 'Houston'} leads`);
      return new Response(
        JSON.stringify({ message: `No webhook URL configured for ${isFromDFW ? 'DFW' : 'Houston'} leads` }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format the data for Zapier
    const webhookPayload = {
      timestamp: new Date().toISOString(),
      event_type: 'quote_submitted',
      quote: {
        id: quoteData.id,
        customer_name: quoteData.name,
        customer_email: quoteData.email,
        customer_phone: quoteData.phone,
        customer_zip_code: quoteData.zip_code,
        garage_type: quoteData.garage_type,
        custom_sqft: quoteData.custom_sqft || null,
        space_type: quoteData.space_type || null,
        other_space_type: quoteData.other_space_type || null,
        color_choice: quoteData.color_choice,
        estimated_price: quoteData.estimated_price,
        estimated_price_formatted: `$${quoteData.estimated_price.toLocaleString()}`,
        exterior_photos_count: quoteData.exterior_photos?.length || 0,
        damage_photos_count: quoteData.damage_photos?.length || 0,
        exterior_photos: quoteData.exterior_photos || [],
        damage_photos: quoteData.damage_photos || [],
        submission_date: quoteData.created_at,
        status: quoteData.status,
        garage_description: quoteData.garage_type === 'custom' 
          ? `${quoteData.other_space_type || quoteData.space_type} (${quoteData.custom_sqft} sq ft)`
          : quoteData.garage_type
      }
    };

    console.log('Sending webhook to:', webhookUrl);
    console.log('Webhook payload:', webhookPayload);

    // Send the webhook to Zapier
    const webhookResponse = await fetch(webhookUrl, {
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

    console.log('Webhook sent successfully');
    return new Response(
      JSON.stringify({ message: 'Webhook sent successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in webhook function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
