// Auto-creates a Jobber client + quote (with $100 required deposit) when a
// floor_packet is submitted, and can also update the client's address later
// when the customer submits their full address in the deposit flow.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const JOBBER_API_URL = "https://api.getjobber.com/api/graphql";
const JOBBER_TOKEN_URL = "https://api.getjobber.com/api/oauth/token";
const GRAPHQL_VERSION = "2025-01-20";

function getSupabase() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

async function refreshAccessToken(refreshToken: string) {
  const clientId = Deno.env.get("JOBBER_CLIENT_ID");
  const clientSecret = Deno.env.get("JOBBER_CLIENT_SECRET");
  if (!clientId || !clientSecret) return null;

  const res = await fetch(JOBBER_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  if (!res.ok) {
    console.error("Jobber token refresh failed", res.status, await res.text());
    return null;
  }
  return await res.json() as { access_token: string; refresh_token: string; expires_in: number };
}

async function getValidAccessToken(): Promise<string | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("jobber_tokens")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);
  if (error || !data || data.length === 0) {
    console.log("No Jobber tokens configured");
    return null;
  }
  const record = data[0];
  const expiresAt = new Date(record.expires_at);
  const now = new Date();
  const tenMinFromNow = new Date(now.getTime() + 10 * 60 * 1000);
  if (expiresAt > tenMinFromNow) return record.access_token;

  const refreshed = await refreshAccessToken(record.refresh_token);
  if (!refreshed) {
    await supabase.from("jobber_tokens").delete().eq("id", record.id);
    return null;
  }
  const newExpiresAt = new Date(now.getTime() + (refreshed.expires_in || 3600) * 1000);
  await supabase
    .from("jobber_tokens")
    .update({
      access_token: refreshed.access_token,
      refresh_token: refreshed.refresh_token,
      expires_at: newExpiresAt.toISOString(),
    })
    .eq("id", record.id);
  return refreshed.access_token;
}

async function forceRefreshToken(): Promise<string | null> {
  const supabase = getSupabase();
  const { data } = await supabase
    .from("jobber_tokens")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);
  if (!data || data.length === 0) return null;
  const record = data[0];
  const refreshed = await refreshAccessToken(record.refresh_token);
  if (!refreshed) {
    await supabase.from("jobber_tokens").delete().eq("id", record.id);
    return null;
  }
  const newExpiresAt = new Date(Date.now() + (refreshed.expires_in || 3600) * 1000);
  await supabase
    .from("jobber_tokens")
    .update({
      access_token: refreshed.access_token,
      refresh_token: refreshed.refresh_token,
      expires_at: newExpiresAt.toISOString(),
    })
    .eq("id", record.id);
  return refreshed.access_token;
}

async function jobberGraphQL(query: string, variables: Record<string, unknown>, token: string) {
  const res = await fetch(JOBBER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-JOBBER-GRAPHQL-VERSION": GRAPHQL_VERSION,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  return { status: res.status, body: json };
}

async function jobberCall(query: string, variables: Record<string, unknown>) {
  let token = await getValidAccessToken();
  if (!token) return { ok: false, error: "no_token" as const };
  let result = await jobberGraphQL(query, variables, token);
  if (result.status === 401 || (result.body?.message ?? "").toString().toLowerCase().includes("expired")) {
    token = await forceRefreshToken();
    if (!token) return { ok: false, error: "refresh_failed" as const };
    result = await jobberGraphQL(query, variables, token);
  }
  if (result.body?.errors) {
    console.error("Jobber GraphQL errors:", JSON.stringify(result.body.errors));
    return { ok: false, error: "graphql", details: result.body.errors };
  }
  return { ok: true, data: result.body.data };
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = (fullName || "").trim();
  if (!trimmed) return { firstName: "", lastName: "" };
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

function labelForGarage(garageType: string, customSqft?: number | null): string {
  if (garageType === "custom" && customSqft) return `${customSqft} sq ft`;
  if (garageType === "2-car") return "2-Car Garage";
  if (garageType === "3-car") return "3-Car Garage";
  if (garageType === "4-car") return "4-Car Garage";
  return garageType || "Garage";
}

function firstPropertyId(source: any): string | undefined {
  return source?.clientProperties?.nodes?.[0]?.id
    ?? source?.clientProperties?.[0]?.id
    ?? source?.properties?.nodes?.[0]?.id
    ?? source?.properties?.[0]?.id
    ?? source?.property?.id;
}

function buildJobberAddress(zip?: string): Record<string, unknown> {
  const address: Record<string, unknown> = { street1: "Address TBD" };
  if (zip) address.postalCode = zip;
  return address;
}

type SchemaField = {
  name: string;
  type?: {
    name?: string | null;
    kind?: string | null;
    ofType?: SchemaField["type"] | null;
  } | null;
};

function unwrapTypeName(type: SchemaField["type"]): string {
  let current = type;
  while (current?.ofType) current = current.ofType;
  return current?.name ?? current?.kind ?? "unknown";
}

function summarizeFields(fields: SchemaField[]) {
  return fields.map((f) => ({ name: f.name, type: unwrapTypeName(f.type) }));
}

async function introspectInputFields(typeName: string): Promise<SchemaField[]> {
  const query = `
    query IntrospectInput($name: String!) {
      __type(name: $name) {
        inputFields { name type { name kind ofType { name kind ofType { name kind } } } }
      }
    }
  `;
  const res = await jobberCall(query, { name: typeName });
  if (!res.ok) {
    console.error(`Jobber introspection failed for ${typeName}`, res);
    return [];
  }
  const fields: SchemaField[] = res.data?.__type?.inputFields ?? [];
  console.log(`${typeName} inputFields:`, JSON.stringify(summarizeFields(fields)));
  return fields;
}

async function introspectObjectFields(typeName: string): Promise<SchemaField[]> {
  const query = `
    query IntrospectObject($name: String!) {
      __type(name: $name) {
        fields { name type { name kind ofType { name kind ofType { name kind } } } }
      }
    }
  `;
  const res = await jobberCall(query, { name: typeName });
  if (!res.ok) {
    console.error(`Jobber object introspection failed for ${typeName}`, res);
    return [];
  }
  const fields: SchemaField[] = res.data?.__type?.fields ?? [];
  console.log(`${typeName} fields:`, JSON.stringify(summarizeFields(fields)));
  return fields;
}

async function introspectQuoteMutationNames(): Promise<string[]> {
  const query = `
    query IntrospectMutations {
      __schema { mutationType { fields { name } } }
    }
  `;
  const res = await jobberCall(query, {});
  if (!res.ok) {
    console.error("Jobber mutation introspection failed", res);
    return [];
  }
  const names = (res.data?.__schema?.mutationType?.fields ?? [])
    .map((field: { name?: string }) => field.name)
    .filter((name: string | undefined): name is string => Boolean(name))
    .filter((name: string) => name.toLowerCase().includes("quote"));
  console.log("Jobber quote mutation names:", JSON.stringify(names));
  return names;
}

function hasField(fields: SchemaField[], name: string): boolean {
  return fields.some((field) => field.name === name);
}

function buildDepositCandidates(costModifierFields: SchemaField[]) {
  const has = (name: string) => hasField(costModifierFields, name);
  const candidates: Array<{ label: string; value: Record<string, unknown> }> = [];

  // Jobber uses CostModifierAttributes for quote deposits and discounts. The live
  // schema decides the exact field names; these candidates only use fields that
  // introspection confirms, so GraphQL variable validation can execute the edit.
  if (has("amount")) candidates.push({ label: "amount", value: { amount: 100 } });
  if (has("value")) candidates.push({ label: "value", value: { value: 100 } });
  if (has("fixedAmount")) candidates.push({ label: "fixedAmount", value: { fixedAmount: 100 } });
  if (has("unitAmount")) candidates.push({ label: "unitAmount", value: { unitAmount: 100 } });
  if (has("rate")) candidates.push({ label: "rate", value: { rate: 100 } });

  if (has("amount") && has("type")) {
    candidates.push({ label: "amount+type:FIXED", value: { amount: 100, type: "FIXED" } });
    candidates.push({ label: "amount+type:AMOUNT", value: { amount: 100, type: "AMOUNT" } });
  }
  if (has("amount") && has("modifierType")) {
    candidates.push({ label: "amount+modifierType:FIXED", value: { amount: 100, modifierType: "FIXED" } });
    candidates.push({ label: "amount+modifierType:AMOUNT", value: { amount: 100, modifierType: "AMOUNT" } });
  }
  if (has("value") && has("type")) {
    candidates.push({ label: "value+type:FIXED", value: { value: 100, type: "FIXED" } });
    candidates.push({ label: "value+type:AMOUNT", value: { value: 100, type: "AMOUNT" } });
  }

  return candidates;
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return json({ error: "Invalid body" }, 400);

    const action = String(body.action || "create");
    const supabase = getSupabase();

    if (action === "create") {
      const packetId = String(body.packet_id || "").trim();
      const name = String(body.name || "").trim();
      const email = String(body.email || "").trim();
      const phone = String(body.phone || "").trim();
      const zip = String(body.zip || "").trim();
      const garage_type = String(body.garage_type || "").trim();
      const custom_sqft = body.custom_sqft != null ? Number(body.custom_sqft) : null;
      const selected_color = String(body.selected_color || "").trim();
      const estimated_price = Number(body.estimated_price || 0);

      if (!packetId || !name || !email || !phone) {
        return json({ error: "Missing required fields" }, 400);
      }

      const { firstName, lastName } = splitName(name);
      const sizeLabel = labelForGarage(garage_type, custom_sqft);

      // 1. Create client
      const clientMutation = `
        mutation ClientCreate($input: ClientCreateInput!) {
          clientCreate(input: $input) {
            client {
              id
              clientProperties(first: 1) { nodes { id } }
            }
            userErrors { message path }
          }
        }
      `;
      const clientInput: Record<string, unknown> = {
        firstName: firstName || name,
        lastName: lastName || undefined,
        emails: email ? [{ address: email, primary: true }] : [],
        phones: phone ? [{ number: phone, primary: true }] : [],
      };
      if (zip) {
        clientInput.billingAddress = { postalCode: zip };
      }

      const clientRes = await jobberCall(clientMutation, { input: clientInput });
      if (!clientRes.ok) {
        console.error("clientCreate failed", clientRes);
        return json({ error: "clientCreate failed", details: clientRes }, 502);
      }
      const clientData = clientRes.data?.clientCreate;
      if (clientData?.userErrors?.length) {
        console.error("clientCreate userErrors", clientData.userErrors);
        return json({ error: "clientCreate userErrors", details: clientData.userErrors }, 502);
      }
      const clientId: string | undefined = clientData?.client?.id;
      let propertyId: string | undefined = firstPropertyId(clientData?.client);
      if (!clientId) return json({ error: "Missing clientId from Jobber" }, 502);
      console.log("Jobber clientCreate succeeded:", { clientId, propertyId });

      // If clientCreate didn't return a property inline, fetch it
      if (!propertyId) {
        const clientQuery = `
          query ClientProperties($id: EncodedId!) {
            client(id: $id) {
              id
              clientProperties(first: 1) { nodes { id } }
            }
          }
        `;
        const cRes = await jobberCall(clientQuery, { id: clientId });
        if (cRes.ok) {
          propertyId = firstPropertyId(cRes.data?.client);
        } else {
          console.error("clientProperties fetch failed", cRes);
        }
        console.log("Fetched propertyId after clientCreate:", { propertyId });
      }

      // If still no property, create one explicitly
      if (!propertyId) {
        const propCreateMutation = `
          mutation PropertyCreate($clientId: EncodedId!, $input: PropertyCreateInput!) {
            propertyCreate(clientId: $clientId, input: $input) {
              properties { id }
              userErrors { message path }
            }
          }
        `;
        const propertyInput = { properties: [{ address: buildJobberAddress(zip) }] };
        const pRes = await jobberCall(propCreateMutation, {
          clientId,
          input: propertyInput,
        });

        propertyId = firstPropertyId(pRes.data?.propertyCreate);

        if (!propertyId) {
          console.error("propertyCreate failed", pRes);
          return json({ error: "Could not obtain propertyId", details: pRes }, 502);
        }
        console.log("Jobber propertyCreate succeeded:", { clientId, propertyId });
      }

      // Persist client + property IDs immediately
      await supabase
        .from("floor_packets")
        .update({
          jobber_client_id: clientId,
          jobber_property_id: propertyId ?? null,
        })
        .eq("id", packetId);

      // 2. Create quote (deposit added via quoteEdit after create)
      const quoteMutation = `
        mutation QuoteCreate($attributes: QuoteCreateAttributes!) {
          quoteCreate(attributes: $attributes) {
            quote {
              id
              quoteNumber
              clientHubUri
            }
            userErrors { message path }
          }
        }
      `;
      const baseAttributes: Record<string, unknown> = {
        clientId,
        propertyId,
        title: `Garage Floor Coating — ${selected_color || "Color TBD"} — ${sizeLabel}`,
        message: `Instant quote submitted from website.\nColor: ${selected_color}\nSize: ${sizeLabel}\nEstimated: $${estimated_price.toLocaleString()}`,
        lineItems: [
          {
            name: "Polyurea Garage Floor Coating",
            description: `${sizeLabel} — Color: ${selected_color}`,
            unitPrice: estimated_price,
            quantity: 1,
            saveToProductsAndServices: false,
          },
        ],
      };

      const quoteRes = await jobberCall(quoteMutation, { attributes: baseAttributes });
      const quoteData = quoteRes.data?.quoteCreate;
      const depositNeedsEdit = true;

      if (!quoteRes.ok || quoteData?.userErrors?.length) {
        console.error("quoteCreate failed", quoteData?.userErrors ?? quoteRes);
        return json({ error: "quoteCreate failed", details: quoteData?.userErrors ?? quoteRes }, 502);
      }

      const quoteId: string | undefined = quoteData?.quote?.id;
      const clientHubUri: string | undefined = quoteData?.quote?.clientHubUri;
      if (!quoteId) return json({ error: "Missing quoteId from Jobber" }, 502);
      console.log("Jobber quoteCreate succeeded:", { clientId, propertyId, quoteId, clientHubUri });

      // Deposit: introspect QuoteEditAttributes once and try candidate field shapes
      let depositError: unknown = null;
      let depositApplied = false;
      if (depositNeedsEdit) {
        // Introspect input type to see what field(s) exist for deposit
        const introspectQuery = `
          query { __type(name: "QuoteEditAttributes") { inputFields { name type { name kind ofType { name kind } } } } }
        `;
        const introspectRes = await jobberCall(introspectQuery, {});
        const inputFields: Array<{ name: string; type: any }> =
          introspectRes.data?.__type?.inputFields ?? [];
        console.log(
          "QuoteEditAttributes inputFields:",
          JSON.stringify(inputFields.map((f) => ({ name: f.name, type: f.type?.name ?? f.type?.ofType?.name ?? f.type?.kind }))),
        );

        const editMutation = `
          mutation QuoteEdit($quoteId: EncodedId!, $attributes: QuoteEditAttributes!) {
            quoteEdit(quoteId: $quoteId, attributes: $attributes) {
              quote { id depositAmount requiredDepositAmount }
              userErrors { message path }
            }
          }
        `;

        // Candidate attribute payloads, ordered by likelihood based on Jobber schema
        const candidates: Array<{ label: string; attrs: Record<string, unknown> }> = [];
        const has = (n: string) => inputFields.some((f) => f.name === n);
        if (has("requiredDepositAmount")) candidates.push({ label: "requiredDepositAmount", attrs: { requiredDepositAmount: 100 } });
        if (has("depositAmount")) candidates.push({ label: "depositAmount", attrs: { depositAmount: 100 } });
        if (has("requiredDeposit")) candidates.push({ label: "requiredDeposit.amount", attrs: { requiredDeposit: { amount: 100 } } });
        if (has("deposit")) candidates.push({ label: "deposit.amount", attrs: { deposit: { amount: 100, required: true } } });
        // Fallback: always try requiredDepositAmount even if introspection came back empty
        if (candidates.length === 0) {
          candidates.push({ label: "fallback:requiredDepositAmount", attrs: { requiredDepositAmount: 100 } });
          candidates.push({ label: "fallback:depositAmount", attrs: { depositAmount: 100 } });
        }

        for (const cand of candidates) {
          const editRes = await jobberCall(editMutation, { quoteId, attributes: cand.attrs });
          const uErrs = editRes.data?.quoteEdit?.userErrors ?? [];
          const gqlErrs = (editRes as any).details;
          const returnedQuote = editRes.data?.quoteEdit?.quote;
          console.log(`quoteEdit deposit attempt [${cand.label}]:`, JSON.stringify({
            ok: editRes.ok,
            userErrors: uErrs,
            graphqlErrors: gqlErrs,
            quote: returnedQuote,
          }));
          if (editRes.ok && uErrs.length === 0) {
            depositApplied = true;
            console.log(`Jobber deposit applied via ${cand.label}:`, { quoteId, quote: returnedQuote });
            break;
          } else {
            depositError = uErrs.length ? uErrs : gqlErrs ?? editRes;
          }
        }

        if (!depositApplied) {
          console.error("All quoteEdit deposit attempts failed:", JSON.stringify(depositError));
        }
      }

      // Persist quote ID + URL
      await supabase
        .from("floor_packets")
        .update({
          jobber_quote_id: quoteId,
          jobber_quote_url: clientHubUri ?? null,
        })
        .eq("id", packetId);

      // 3. Send quote (AWAITING_RESPONSE)
      const statusMutation = `
        mutation QuoteStatusChange($quoteId: EncodedId!, $status: QuoteStatus!) {
          quoteStatusChange(quoteId: $quoteId, status: $status) {
            quote { id quoteStatus clientHubUri }
            userErrors { message path }
          }
        }
      `;
      const statusRes = await jobberCall(statusMutation, {
        quoteId,
        status: "AWAITING_RESPONSE",
      });
      if (!statusRes.ok || statusRes.data?.quoteStatusChange?.userErrors?.length) {
        console.error("quoteStatusChange failed", statusRes);
      } else {
        console.log("Jobber quoteStatusChange succeeded:", {
          quoteId,
          status: statusRes.data?.quoteStatusChange?.quote?.quoteStatus,
        });
      }

      return json({ ok: true, clientId, quoteId, clientHubUri, depositApplied, depositError });
    }

    if (action === "updateAddress") {
      const packetId = String(body.packet_id || "").trim();
      const street = String(body.street || body.address || "").trim();
      const city = String(body.city || "").trim();
      const province = String(body.province || body.state || "TX").trim();
      const zip = String(body.zip || body.postalCode || "").trim();

      if (!packetId || !street) return json({ error: "Missing packet_id or street" }, 400);

      const { data: packet, error: pErr } = await supabase
        .from("floor_packets")
        .select("jobber_client_id, jobber_property_id")
        .eq("id", packetId)
        .maybeSingle();
      if (pErr || !packet) return json({ error: "Not found" }, 404);
      if (!packet.jobber_client_id) {
        return json({ ok: true, skipped: "no_jobber_client" });
      }

      const addressInput: Record<string, unknown> = { street1: street };
      if (city) addressInput.city = city;
      if (province) addressInput.province = province;
      if (zip) addressInput.postalCode = zip;

      const clientEditMutation = `
        mutation ClientEdit($clientId: EncodedId!, $input: ClientEditInput!) {
          clientEdit(clientId: $clientId, input: $input) {
            client { id }
            userErrors { message path }
          }
        }
      `;
      const clientEditRes = await jobberCall(clientEditMutation, {
        clientId: packet.jobber_client_id,
        input: { billingAddress: addressInput },
      });
      if (!clientEditRes.ok || clientEditRes.data?.clientEdit?.userErrors?.length) {
        console.error("clientEdit failed", clientEditRes);
      }

      if (packet.jobber_property_id) {
        const propertyEditMutation = `
          mutation PropertyEdit($propertyId: EncodedId!, $attributes: PropertyEditAttributes!) {
            propertyEdit(propertyId: $propertyId, attributes: $attributes) {
              property { id }
              userErrors { message path }
            }
          }
        `;
        const propRes = await jobberCall(propertyEditMutation, {
          propertyId: packet.jobber_property_id,
          attributes: { address: addressInput },
        });
        if (!propRes.ok || propRes.data?.propertyEdit?.userErrors?.length) {
          console.error("propertyEdit failed", propRes);
        }
      }

      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    console.error("jobber-quote-from-packet error", e);
    return json({ error: "Server error", details: (e as Error).message }, 500);
  }
});
