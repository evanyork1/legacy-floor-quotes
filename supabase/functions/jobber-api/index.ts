import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const JOBBER_API_URL = 'https://api.getjobber.com/api/graphql';
const JOBBER_TOKEN_URL = 'https://api.getjobber.com/api/oauth/token';

interface JobberRequest {
  action: 'createClient' | 'searchClients' | 'createQuote' | 'createNote' | 'approveQuote' | 'checkStatus';
  data?: Record<string, unknown>;
}

interface TokenRecord {
  id: string;
  access_token: string;
  refresh_token: string;
  expires_at: string;
}

// Get Supabase client with service role
function getSupabaseClient() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  return createClient(supabaseUrl, supabaseServiceKey);
}

// Refresh the access token using the refresh token
async function refreshAccessToken(refreshToken: string): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
} | null> {
  const clientId = Deno.env.get('JOBBER_CLIENT_ID');
  const clientSecret = Deno.env.get('JOBBER_CLIENT_SECRET');

  if (!clientId || !clientSecret) {
    console.error('Missing Jobber credentials for refresh');
    return null;
  }

  try {
    const response = await fetch(JOBBER_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Token refresh failed:', response.status, errorText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

// Get valid access token (refresh if needed)
async function getValidAccessToken(): Promise<{ token: string; expiresAt: string } | null> {
  const supabase = getSupabaseClient();

  // Fetch the current token
  const { data: tokens, error } = await supabase
    .from('jobber_tokens')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  if (error || !tokens || tokens.length === 0) {
    console.log('No tokens found in database');
    return null;
  }

  const tokenRecord = tokens[0] as TokenRecord;
  const expiresAt = new Date(tokenRecord.expires_at);
  const now = new Date();
  
  // Check if token expires within next 5 minutes
  const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);
  
  if (expiresAt > fiveMinutesFromNow) {
    // Token is still valid
    return { token: tokenRecord.access_token, expiresAt: tokenRecord.expires_at };
  }

  console.log('Token expired or expiring soon, refreshing...');

  // Refresh the token
  const newTokens = await refreshAccessToken(tokenRecord.refresh_token);
  
  if (!newTokens) {
    // Refresh failed, delete invalid tokens
    await supabase.from('jobber_tokens').delete().eq('id', tokenRecord.id);
    return null;
  }

  // Calculate new expiration
  const newExpiresAt = new Date(now.getTime() + newTokens.expires_in * 1000);

  // Update the database
  const { error: updateError } = await supabase
    .from('jobber_tokens')
    .update({
      access_token: newTokens.access_token,
      refresh_token: newTokens.refresh_token,
      expires_at: newExpiresAt.toISOString(),
    })
    .eq('id', tokenRecord.id);

  if (updateError) {
    console.error('Failed to update tokens:', updateError);
    return null;
  }

  console.log('Token refreshed successfully');
  return { token: newTokens.access_token, expiresAt: newExpiresAt.toISOString() };
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json() as JobberRequest;

    // Handle status check action
    if (action === 'checkStatus') {
      const tokenInfo = await getValidAccessToken();
      
      if (tokenInfo) {
        return new Response(
          JSON.stringify({ connected: true, expiresAt: tokenInfo.expiresAt }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        return new Response(
          JSON.stringify({ connected: false }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Get valid access token for API calls
    const tokenInfo = await getValidAccessToken();
    
    if (!tokenInfo) {
      return new Response(
        JSON.stringify({ error: 'Not connected to Jobber. Please authorize first.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const accessToken = tokenInfo.token;

    let query: string;
    let variables: Record<string, unknown>;

    switch (action) {
      case 'searchClients':
        query = `
          query SearchClients($searchTerm: String!) {
            clients(searchTerm: $searchTerm, first: 10) {
              nodes {
                id
                name
                firstName
                lastName
                emails {
                  address
                  primary
                }
                phones {
                  number
                  primary
                }
                billingAddress {
                  street1
                  city
                  postalCode
                }
              }
            }
          }
        `;
        variables = { searchTerm: data?.searchTerm || '' };
        break;

      case 'createClient':
        query = `
          mutation ClientCreate($input: ClientCreateInput!) {
            clientCreate(input: $input) {
              client {
                id
                name
              }
              userErrors {
                message
                path
              }
            }
          }
        `;
        variables = {
          input: {
            firstName: data?.firstName,
            lastName: data?.lastName,
            emails: data?.email ? [{ address: data.email, primary: true }] : [],
            phones: data?.phone ? [{ number: data.phone, primary: true }] : [],
            billingAddress: data?.address ? {
              street1: data.address,
              city: data?.city,
              postalCode: data?.postalCode,
            } : undefined,
          },
        };
        break;

      case 'createQuote':
        query = `
          mutation QuoteCreate($input: QuoteCreateInput!) {
            quoteCreate(input: $input) {
              quote {
                id
                quoteNumber
                total
                status
              }
              userErrors {
                message
                path
              }
            }
          }
        `;
        variables = {
          input: {
            clientId: data?.clientId,
            title: data?.title || 'Garage Floor Coating Quote',
            lineItems: [
              {
                name: data?.productName || 'Polyurea Garage Floor Coating',
                description: data?.description || '',
                unitPrice: data?.unitPrice,
                quantity: data?.squareFootage,
              },
              ...(data?.gripAdditive ? [{
                name: 'Grip Additive',
                description: 'Anti-slip coating additive',
                unitPrice: data?.gripPrice || 0.50,
                quantity: data?.squareFootage,
              }] : []),
              ...(data?.vaporBarrier ? [{
                name: 'Vapor Barrier',
                description: 'Moisture protection layer',
                unitPrice: data?.vaporPrice || 1.00,
                quantity: data?.squareFootage,
              }] : []),
            ],
            message: data?.notes || '',
          },
        };
        break;

      case 'createNote':
        query = `
          mutation NoteCreate($input: NoteCreateInput!) {
            noteCreate(input: $input) {
              note {
                id
                message
              }
              userErrors {
                message
                path
              }
            }
          }
        `;
        variables = {
          input: {
            clientId: data?.clientId,
            message: data?.message,
          },
        };
        break;

      case 'approveQuote':
        query = `
          mutation QuoteStatusChange($quoteId: EncodedId!, $status: QuoteStatus!) {
            quoteStatusChange(quoteId: $quoteId, status: $status) {
              quote {
                id
                status
              }
              userErrors {
                message
                path
              }
            }
          }
        `;
        variables = {
          quoteId: data?.quoteId,
          status: 'APPROVED',
        };
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    console.log(`Jobber API - Action: ${action}`);

    // Make the GraphQL request to Jobber
    const response = await fetch(JOBBER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-JOBBER-GRAPHQL-VERSION': '2024-12-16',
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error('Jobber API errors:', result.errors);
      throw new Error(result.errors[0]?.message || 'Jobber API error');
    }

    return new Response(JSON.stringify(result.data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Jobber API error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
