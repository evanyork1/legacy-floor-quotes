import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const JOBBER_API_URL = 'https://api.getjobber.com/api/graphql';

interface JobberRequest {
  action: 'createClient' | 'searchClients' | 'createQuote' | 'createNote' | 'approveQuote';
  data: Record<string, unknown>;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const JOBBER_CLIENT_ID = Deno.env.get('JOBBER_CLIENT_ID');
    const JOBBER_CLIENT_SECRET = Deno.env.get('JOBBER_CLIENT_SECRET');

    if (!JOBBER_CLIENT_ID || !JOBBER_CLIENT_SECRET) {
      throw new Error('Jobber credentials not configured');
    }

    const { action, data } = await req.json() as JobberRequest;
    
    // For now, we'll use a placeholder access token flow
    // In production, you'd implement OAuth 2.0 flow with refresh tokens
    const accessToken = Deno.env.get('JOBBER_ACCESS_TOKEN') || '';

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
        variables = { searchTerm: data.searchTerm || '' };
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
            firstName: data.firstName,
            lastName: data.lastName,
            emails: data.email ? [{ address: data.email, primary: true }] : [],
            phones: data.phone ? [{ number: data.phone, primary: true }] : [],
            billingAddress: data.address ? {
              street1: data.address,
              city: data.city,
              postalCode: data.postalCode,
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
            clientId: data.clientId,
            title: data.title || 'Garage Floor Coating Quote',
            lineItems: [
              {
                name: data.productName || 'Polyurea Garage Floor Coating',
                description: data.description || '',
                unitPrice: data.unitPrice,
                quantity: data.squareFootage,
              },
              ...(data.gripAdditive ? [{
                name: 'Grip Additive',
                description: 'Anti-slip coating additive',
                unitPrice: data.gripPrice || 0.50,
                quantity: data.squareFootage,
              }] : []),
              ...(data.vaporBarrier ? [{
                name: 'Vapor Barrier',
                description: 'Moisture protection layer',
                unitPrice: data.vaporPrice || 1.00,
                quantity: data.squareFootage,
              }] : []),
            ],
            message: data.notes || '',
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
            clientId: data.clientId,
            message: data.message,
            // noteAttachments would be added here for photos
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
          quoteId: data.quoteId,
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
