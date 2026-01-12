import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const JOBBER_TOKEN_URL = 'https://api.getjobber.com/api/oauth/token';

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');
    const errorDescription = url.searchParams.get('error_description');

    // Handle OAuth errors
    if (error) {
      console.error('OAuth error:', error, errorDescription);
      return new Response(null, {
        status: 302,
        headers: {
          'Location': `https://legacyindustrialcoatings.com/sales-presentation?error=${encodeURIComponent(errorDescription || error)}`,
        },
      });
    }

    // Validate authorization code
    if (!code) {
      console.error('No authorization code received');
      return new Response(null, {
        status: 302,
        headers: {
          'Location': 'https://legacyindustrialcoatings.com/sales-presentation?error=No+authorization+code+received',
        },
      });
    }

    // Get Jobber credentials
    const clientId = Deno.env.get('JOBBER_CLIENT_ID');
    const clientSecret = Deno.env.get('JOBBER_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      console.error('Missing Jobber credentials');
      return new Response(null, {
        status: 302,
        headers: {
          'Location': 'https://legacyindustrialcoatings.com/sales-presentation?error=Server+configuration+error',
        },
      });
    }

    // Exchange authorization code for tokens
    console.log('Exchanging authorization code for tokens...');
    
    const tokenResponse = await fetch(JOBBER_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'https://byvazfrvoanojfayvsaz.supabase.co/functions/v1/jobber-oauth-callback',
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token exchange failed:', tokenResponse.status, errorText);
      return new Response(null, {
        status: 302,
        headers: {
          'Location': `https://legacyindustrialcoatings.com/sales-presentation?error=Token+exchange+failed`,
        },
      });
    }

    const tokenData = await tokenResponse.json();
    console.log('Token exchange successful');

    // Calculate expiration time
    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);

    // Store tokens in Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Delete any existing tokens and insert new ones
    await supabase.from('jobber_tokens').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    const { error: insertError } = await supabase.from('jobber_tokens').insert({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_at: expiresAt.toISOString(),
    });

    if (insertError) {
      console.error('Failed to store tokens:', insertError);
      return new Response(null, {
        status: 302,
        headers: {
          'Location': `https://legacyindustrialcoatings.com/sales-presentation?error=Failed+to+store+credentials`,
        },
      });
    }

    console.log('Tokens stored successfully, redirecting...');

    // Redirect back to the app with success
    return new Response(null, {
      status: 302,
      headers: {
        'Location': 'https://legacyindustrialcoatings.com/sales-presentation?connected=true',
      },
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    return new Response(null, {
      status: 302,
      headers: {
        'Location': `https://legacyindustrialcoatings.com/sales-presentation?error=${encodeURIComponent(error.message)}`,
      },
    });
  }
});
