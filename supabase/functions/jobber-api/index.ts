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
    console.log('Attempting to refresh Jobber access token...');
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

    const tokens = await response.json();
    console.log('Token refresh successful');
    return tokens;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

// Force refresh and update tokens in database
async function forceRefreshTokens(): Promise<{ token: string; expiresAt: string } | null> {
  const supabase = getSupabaseClient();

  // Fetch the current token
  const { data: tokens, error } = await supabase
    .from('jobber_tokens')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  if (error || !tokens || tokens.length === 0) {
    console.log('No tokens found in database for refresh');
    return null;
  }

  const tokenRecord = tokens[0] as TokenRecord;
  
  console.log('Force refreshing token...');
  const newTokens = await refreshAccessToken(tokenRecord.refresh_token);
  
  if (!newTokens || !newTokens.access_token) {
    // Refresh failed, delete invalid tokens
    console.error('Force refresh failed, deleting invalid tokens');
    await supabase.from('jobber_tokens').delete().eq('id', tokenRecord.id);
    return null;
  }

  const now = new Date();
  // Default to 1 hour if expires_in is missing
  const expiresInSeconds = newTokens.expires_in || 3600;
  const newExpiresAt = new Date(now.getTime() + expiresInSeconds * 1000);

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
    console.error('Failed to update tokens after force refresh:', updateError);
    return null;
  }

  console.log('Force refresh successful, new token expires at:', newExpiresAt.toISOString());
  return { token: newTokens.access_token, expiresAt: newExpiresAt.toISOString() };
}

// Get valid access token (check expiration)
async function getValidAccessToken(): Promise<{ token: string; expiresAt: string; refreshToken: string } | null> {
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
  
  console.log('Token expires at:', expiresAt.toISOString(), 'Now:', now.toISOString());
  
  // Check if token expires within next 10 minutes
  const tenMinutesFromNow = new Date(now.getTime() + 10 * 60 * 1000);
  
  if (expiresAt > tenMinutesFromNow) {
    // Token appears valid based on timestamp
    console.log('Token appears valid based on timestamp');
    return { 
      token: tokenRecord.access_token, 
      expiresAt: tokenRecord.expires_at,
      refreshToken: tokenRecord.refresh_token 
    };
  }
  
  // Token expired or expiring soon, proactively refresh
  console.log('Token expired or expiring soon, refreshing proactively...');
  const newTokens = await refreshAccessToken(tokenRecord.refresh_token);
  
  if (!newTokens) {
    await supabase.from('jobber_tokens').delete().eq('id', tokenRecord.id);
    return null;
  }

  const newExpiresAt = new Date(now.getTime() + newTokens.expires_in * 1000);

  await supabase
    .from('jobber_tokens')
    .update({
      access_token: newTokens.access_token,
      refresh_token: newTokens.refresh_token,
      expires_at: newExpiresAt.toISOString(),
    })
    .eq('id', tokenRecord.id);

  console.log('Proactive token refresh successful');
  return { 
    token: newTokens.access_token, 
    expiresAt: newExpiresAt.toISOString(),
    refreshToken: newTokens.refresh_token 
  };
}

// Make GraphQL request with automatic retry on 401
async function callJobberGraphQL(
  query: string, 
  variables: Record<string, unknown>,
  accessToken: string
): Promise<{ data?: any; error?: string; status: number; needsRefresh?: boolean }> {
  console.log('Making Jobber GraphQL request...');
  
  const response = await fetch(JOBBER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'X-JOBBER-GRAPHQL-VERSION': '2025-01-20',
    },
    body: JSON.stringify({ query, variables }),
  });

  console.log('Jobber API response status:', response.status);
  
  const result = await response.json();
  console.log('Jobber API result preview:', JSON.stringify(result).substring(0, 300));

  // Check for 401 or token expired message
  if (response.status === 401 || result?.message?.toLowerCase().includes('expired')) {
    console.log('Token expired or 401 received - needs refresh');
    return { status: 401, needsRefresh: true, error: 'Token expired' };
  }

  if (result.errors) {
    console.error('Jobber GraphQL errors:', result.errors);
    return { status: 400, error: result.errors[0]?.message || 'GraphQL error' };
  }

  return { status: 200, data: result.data };
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
    let tokenInfo = await getValidAccessToken();
    
    if (!tokenInfo) {
      console.log('No valid token found, returning auth error');
      return new Response(
        JSON.stringify({ error: 'Not connected to Jobber. Please authorize first.', connected: false }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Using token that expires at:', tokenInfo.expiresAt);

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
                properties {
                  id
                  address {
                    street1
                    city
                    postalCode
                  }
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

      case 'createQuote': {
        const lineItems = data?.lineItems as Array<{
          name: string;
          description?: string;
          unitPrice: number;
          quantity: number;
        }> || [];
        
        if (!data?.lineItems && data?.productName) {
          lineItems.push({
            name: data.productName as string || 'Floor Coating',
            description: data.description as string || '',
            unitPrice: data.unitPrice as number,
            quantity: data.squareFootage as number,
          });
        }
        
      // Build attributes for quote creation
        // Note: saveToProductsAndServices is required for each line item
        const quoteAttributes: Record<string, unknown> = {
          clientId: data?.clientId,
          title: data?.title || 'Floor Coating Quote',
          lineItems: lineItems.map(item => ({
            name: item.name,
            description: item.description || '',
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            saveToProductsAndServices: false, // Required field - don't save as product template
          })),
          message: data?.notes || '',
        };

        // If propertyId is provided, include it
        if (data?.propertyId) {
          quoteAttributes.propertyId = data.propertyId;
        }
        
        console.log('Quote attributes being sent:', JSON.stringify(quoteAttributes));
        
        query = `
          mutation QuoteCreate($attributes: QuoteCreateAttributes!) {
            quoteCreate(attributes: $attributes) {
              quote {
                id
                quoteNumber
                quoteStatus
                clientHubUri
                amounts {
                  total
                  depositAmount
                }
              }
              userErrors {
                message
                path
              }
            }
          }
        `;
        variables = { attributes: quoteAttributes };
        break;
      }

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
                quoteStatus
                clientHubUri
              }
              userErrors {
                message
                path
              }
            }
          }
        `;
        // Use AWAITING_RESPONSE to send the quote to the customer for approval/payment
        // Then customer can approve and pay through Client Hub
        variables = {
          quoteId: data?.quoteId,
          status: data?.targetStatus || 'AWAITING_RESPONSE',
        };
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    console.log(`Jobber API - Action: ${action}, Variables:`, JSON.stringify(variables));

    // Make the GraphQL request
    let result = await callJobberGraphQL(query, variables, tokenInfo.token);

    // If we get a 401, force refresh the token and retry once
    if (result.needsRefresh) {
      console.log('Got 401, forcing token refresh and retrying...');
      const newTokenInfo = await forceRefreshTokens();
      
      if (!newTokenInfo) {
        return new Response(
          JSON.stringify({ error: 'Jobber session expired. Please reconnect to Jobber.', connected: false }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Retry with new token
      console.log('Retrying with refreshed token...');
      result = await callJobberGraphQL(query, variables, newTokenInfo.token);
      
      if (result.needsRefresh || result.error) {
        return new Response(
          JSON.stringify({ error: result.error || 'Jobber API error after refresh', connected: false }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    if (result.error) {
      throw new Error(result.error);
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
