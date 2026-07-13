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

async function introspectEnumValues(typeName: string): Promise<string[]> {
  const query = `
    query IntrospectEnum($name: String!) {
      __type(name: $name) {
        enumValues { name }
      }
    }
  `;
  const res = await jobberCall(query, { name: typeName });
  if (!res.ok) {
    console.error(`Jobber enum introspection failed for ${typeName}`, res);
    return [];
  }
  const values = (res.data?.__type?.enumValues ?? [])
    .map((value: { name?: string }) => value.name)
    .filter((name: string | undefined): name is string => Boolean(name));
  console.log(`${typeName} enumValues:`, JSON.stringify(values));
  return values;
}

function hasField(fields: SchemaField[], name: string): boolean {
  return fields.some((field) => field.name === name);
}

function buildDepositCandidates(costModifierFields: SchemaField[], costModifierTypeValues: string[]) {
  const has = (name: string) => hasField(costModifierFields, name);
  const candidates: Array<{ label: string; value: Record<string, unknown> }> = [];
  const fixedTypeValues = costModifierTypeValues.filter((value) => {
    const normalized = value.toLowerCase();
    return ["fixed", "amount", "unit", "flat", "dollar"].some((term) => normalized.includes(term))
      && !["percent", "percentage"].some((term) => normalized.includes(term));
  });
  const percentTypeValues = costModifierTypeValues.filter((value) => value.toLowerCase().includes("percent"));
  const otherTypeValues = costModifierTypeValues.filter((value) =>
    !fixedTypeValues.includes(value) && !percentTypeValues.includes(value)
  );
  const orderedTypeValues = [...fixedTypeValues, ...otherTypeValues];

  // Jobber uses CostModifierAttributes for quote deposits and discounts. The live
  // schema decides the exact field names; these candidates only use fields that
  // introspection confirms, so GraphQL variable validation can execute the edit.
  if (has("rate") && has("type")) {
    for (const type of orderedTypeValues) {
      candidates.push({ label: `rate+type:${type}`, value: { rate: 100, type } });
    }
  }
  if (has("amount") && has("type")) {
    for (const type of orderedTypeValues) {
      candidates.push({ label: `amount+type:${type}`, value: { amount: 100, type } });
    }
  }
  if (has("value") && has("type")) {
    for (const type of orderedTypeValues) {
      candidates.push({ label: `value+type:${type}`, value: { value: 100, type } });
    }
  }

  if (!has("type")) {
    if (has("amount")) candidates.push({ label: "amount", value: { amount: 100 } });
    if (has("value")) candidates.push({ label: "value", value: { value: 100 } });
    if (has("fixedAmount")) candidates.push({ label: "fixedAmount", value: { fixedAmount: 100 } });
    if (has("unitAmount")) candidates.push({ label: "unitAmount", value: { unitAmount: 100 } });
    if (has("rate")) candidates.push({ label: "rate", value: { rate: 100 } });
  }

  if (has("amount") && has("modifierType")) {
    candidates.push({ label: "amount+modifierType:FIXED", value: { amount: 100, modifierType: "FIXED" } });
    candidates.push({ label: "amount+modifierType:AMOUNT", value: { amount: 100, modifierType: "AMOUNT" } });
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

      // 2. Create quote + required $100 deposit using the live Jobber schema.
      const [quoteCreateFields, quoteEditFields, costModifierFields, quoteFields, quoteMutationNames, costModifierTypeValues, quoteTransitionValues, clientViewOptionsFields] = await Promise.all([
        introspectInputFields("QuoteCreateAttributes"),
        introspectInputFields("QuoteEditAttributes"),
        introspectInputFields("CostModifierAttributes"),
        introspectObjectFields("Quote"),
        introspectQuoteMutationNames(),
        introspectEnumValues("CostModifierTypeEnum"),
        introspectEnumValues("QuoteTransitionOnCreate"),
        introspectInputFields("QuoteClientViewOptionsInput"),
      ]);
      const quoteAmountsFields = hasField(quoteFields, "amounts")
        ? await introspectObjectFields("QuoteAmounts")
        : [];

      const quoteScalarSelection = ["id", "quoteNumber", "clientHubUri", "quoteStatus", "previewUrl", "jobberWebUri", "sentAt"]
        .filter((field) => hasField(quoteFields, field));
      const amountSelection = ["subtotal", "total", "depositAmount", "depositAmountUnallocated", "outstanding"]
        .filter((field) => hasField(quoteAmountsFields, field));
      const quoteSelection = [
        ...(quoteScalarSelection.length ? quoteScalarSelection : ["id"]),
        amountSelection.length ? `amounts { ${amountSelection.join(" ")} }` : "",
      ].filter(Boolean).join("\n");

      const depositCandidates = buildDepositCandidates(costModifierFields, costModifierTypeValues);
      if (!depositCandidates.length) {
        console.error("No schema-valid CostModifierAttributes candidates found for Jobber quote deposit");
      }

      const quoteMutation = `
        mutation QuoteCreate($attributes: QuoteCreateAttributes!) {
          quoteCreate(attributes: $attributes) {
            quote {
              ${quoteSelection}
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

      // Build ordered transition-to-send candidates. Jobber's QuoteCreateAttributes
      // exposes `transitionQuoteTo` which — when set to an "awaiting response" /
      // "sent" enum value — triggers the same automated email + SMS delivery as
      // the desktop "Send by email / text" dialog, using the client's contact
      // preferences on file.
      const preferredSendOrder = [
        "AWAITING_RESPONSE",
        "AWAITING_RESPONSE_EMAIL",
        "SEND",
        "SENT",
        "SEND_TO_CLIENT",
        "DELIVER",
      ];
      const orderedTransitionValues = [
        ...preferredSendOrder.filter((v) => quoteTransitionValues.includes(v)),
        ...quoteTransitionValues.filter((v) => !preferredSendOrder.includes(v)),
      ];
      const transitionCandidates: Array<{ label: string; value: string }> = orderedTransitionValues
        .map((v) => ({ label: v, value: v }));

      // If Jobber supports per-quote channel toggles inside clientViewOptions, opt
      // both channels in — no-op when the field isn't present.
      const clientViewOptions: Record<string, unknown> = {};
      const cvoHas = (n: string) => hasField(clientViewOptionsFields, n);
      if (cvoHas("emailEnabled")) clientViewOptions.emailEnabled = true;
      if (cvoHas("smsEnabled")) clientViewOptions.smsEnabled = true;
      if (cvoHas("textMessageEnabled")) clientViewOptions.textMessageEnabled = true;
      if (cvoHas("sendEmail")) clientViewOptions.sendEmail = true;
      if (cvoHas("sendText")) clientViewOptions.sendText = true;
      if (cvoHas("sendSms")) clientViewOptions.sendSms = true;
      const includeClientViewOptions = hasField(quoteCreateFields, "clientViewOptions") && Object.keys(clientViewOptions).length > 0;
      if (includeClientViewOptions) {
        baseAttributes.clientViewOptions = clientViewOptions;
        console.log("Including clientViewOptions on quoteCreate:", clientViewOptions);
      }

      // Attach transitionQuoteTo to trigger Jobber's automated send-on-create.
      const supportsTransition = hasField(quoteCreateFields, "transitionQuoteTo") && transitionCandidates.length > 0;
      const chosenTransition: string | null = supportsTransition ? transitionCandidates[0].value : null;
      if (chosenTransition) {
        baseAttributes.transitionQuoteTo = chosenTransition;
        console.log("Including transitionQuoteTo on quoteCreate:", chosenTransition, {
          availableTransitions: quoteTransitionValues,
        });
      } else {
        console.log("Jobber schema does not expose transitionQuoteTo or has no send values", {
          hasField: hasField(quoteCreateFields, "transitionQuoteTo"),
          quoteTransitionValues,
        });
      }

      let depositError: unknown = null;
      let depositApplied = false;
      let depositStrategy: string | null = null;
      let quoteData: any = null;
      let quoteId: string | undefined;
      let clientHubUri: string | undefined;
      let sendStrategy: string | null = chosenTransition ? `transitionQuoteTo:${chosenTransition}` : null;
      let sendError: unknown = null;
      let sentAt: string | null = null;


      // Helper: strip transitionQuoteTo from attrs (used when Jobber rejects the
      // transition — e.g. missing client email/phone or draft-only account).
      const stripTransition = (attrs: Record<string, unknown>) => {
        const copy = { ...attrs };
        delete copy.transitionQuoteTo;
        return copy;
      };
      const errorMentionsTransition = (errs: any) => {
        try {
          const s = JSON.stringify(errs || "").toLowerCase();
          return s.includes("transition") || s.includes("awaiting") || s.includes("send") || s.includes("email") || s.includes("phone") || s.includes("sms");
        } catch { return false; }
      };

      if (hasField(quoteCreateFields, "deposit") && depositCandidates.length) {
        for (const cand of depositCandidates) {
          let attempt = { ...baseAttributes, deposit: cand.value };
          let quoteRes = await jobberCall(quoteMutation, { attributes: attempt });
          let currentQuoteData = quoteRes.data?.quoteCreate;
          let uErrs = currentQuoteData?.userErrors ?? [];
          let gqlErrs = (quoteRes as any).details;
          const failed = !quoteRes.ok || uErrs.length > 0 || !currentQuoteData?.quote?.id;

          // If failure looks transition-related and we included one, retry without it.
          if (failed && chosenTransition && attempt.transitionQuoteTo && errorMentionsTransition(uErrs.length ? uErrs : gqlErrs)) {
            console.log(`quoteCreate transition [${chosenTransition}] rejected for deposit [${cand.label}]; retrying without transition`);
            attempt = stripTransition(attempt);
            quoteRes = await jobberCall(quoteMutation, { attributes: attempt });
            currentQuoteData = quoteRes.data?.quoteCreate;
            uErrs = currentQuoteData?.userErrors ?? [];
            gqlErrs = (quoteRes as any).details;
            sendStrategy = null;
            sendError = uErrs.length ? uErrs : gqlErrs;
          }

          console.log(`quoteCreate deposit attempt [${cand.label}]:`, JSON.stringify({
            ok: quoteRes.ok,
            userErrors: uErrs,
            graphqlErrors: gqlErrs,
            transitionIncluded: !!attempt.transitionQuoteTo,
            quote: currentQuoteData?.quote,
          }));

          if (quoteRes.ok && uErrs.length === 0 && currentQuoteData?.quote?.id) {
            quoteData = currentQuoteData;
            quoteId = currentQuoteData.quote.id;
            clientHubUri = currentQuoteData.quote.clientHubUri ?? currentQuoteData.quote.previewUrl ?? currentQuoteData.quote.jobberWebUri;
            depositApplied = true;
            depositStrategy = `quoteCreate.deposit.${cand.label}`;
            if (attempt.transitionQuoteTo) {
              sentAt = currentQuoteData.quote.sentAt ?? null;
            }
            console.log("Jobber quoteCreate with deposit succeeded:", {
              clientId,
              propertyId,
              quoteId,
              clientHubUri,
              depositStrategy,
              sendStrategy,
              sentAt,
              quote: currentQuoteData.quote,
            });
            break;
          }

          depositError = uErrs.length ? uErrs : gqlErrs ?? quoteRes;
        }
      }

      if (!quoteId) {
        if (depositError) {
          console.error("quoteCreate deposit attempts failed; creating quote without deposit before quoteEdit fallback:", JSON.stringify(depositError));
        }
        let attempt: Record<string, unknown> = { ...baseAttributes };
        let quoteRes = await jobberCall(quoteMutation, { attributes: attempt });
        quoteData = quoteRes.data?.quoteCreate;
        let uErrs = quoteData?.userErrors ?? [];

        if ((!quoteRes.ok || uErrs.length) && chosenTransition && attempt.transitionQuoteTo && errorMentionsTransition(uErrs.length ? uErrs : (quoteRes as any).details)) {
          console.log("quoteCreate (no deposit) rejected transition; retrying without transitionQuoteTo");
          attempt = stripTransition(attempt);
          quoteRes = await jobberCall(quoteMutation, { attributes: attempt });
          quoteData = quoteRes.data?.quoteCreate;
          uErrs = quoteData?.userErrors ?? [];
          sendStrategy = null;
          sendError = uErrs.length ? uErrs : (quoteRes as any).details;
        }

        if (!quoteRes.ok || uErrs.length) {
          console.error("quoteCreate failed", uErrs.length ? uErrs : quoteRes);
          return json({ error: "quoteCreate failed", details: uErrs.length ? uErrs : quoteRes }, 502);
        }

        quoteId = quoteData?.quote?.id;
        clientHubUri = quoteData?.quote?.clientHubUri ?? quoteData?.quote?.previewUrl ?? quoteData?.quote?.jobberWebUri;
        if (attempt.transitionQuoteTo) sentAt = quoteData?.quote?.sentAt ?? null;
      }

      if (!quoteId) return json({ error: "Missing quoteId from Jobber" }, 502);
      console.log("Jobber quoteCreate succeeded:", { clientId, propertyId, quoteId, clientHubUri, sendStrategy, sentAt });

      // If Jobber did not accept deposit during quoteCreate, fall back to quoteEdit.
      if (!depositApplied && hasField(quoteEditFields, "deposit") && depositCandidates.length) {
        const editMutation = `
          mutation QuoteEdit($quoteId: EncodedId!, $attributes: QuoteEditAttributes!) {
            quoteEdit(quoteId: $quoteId, attributes: $attributes) {
              quote {
                ${quoteSelection}
              }
              userErrors { message path }
            }
          }
        `;

        for (const cand of depositCandidates) {
          const editRes = await jobberCall(editMutation, { quoteId, attributes: { deposit: cand.value } });
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
            depositStrategy = `quoteEdit.deposit.${cand.label}`;
            console.log(`Jobber deposit applied via ${depositStrategy}:`, { quoteId, quote: returnedQuote });
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

      // 3. If we didn't already trigger send via transitionQuoteTo on create,
      // look for any post-create send mutation Jobber exposes for this account
      // and try it. Names vary by API version; we only call ones that exist.
      const sendMutationCandidates = quoteMutationNames.filter((n) => {
        const l = n.toLowerCase();
        if (l.includes("lineitem") || l.includes("note")) return false;
        if (l === "quotecreate" || l === "quoteedit") return false;
        return l.includes("send") || l.includes("deliver") || l.includes("email") || l.includes("text") || l.includes("sms");
      });

      if (!sentAt && sendMutationCandidates.length > 0) {
        console.log("Attempting post-create send via available quote mutations:", sendMutationCandidates);
        for (const mutName of sendMutationCandidates) {
          // Introspect the mutation's args to build a minimal, valid input.
          const argQuery = `
            query IntrospectMutationArgs {
              __schema { mutationType { fields { name args { name type { name kind ofType { name kind ofType { name kind } } } } } } }
            }
          `;
          const argRes = await jobberCall(argQuery, {});
          const allFields = argRes.data?.__schema?.mutationType?.fields ?? [];
          const target = allFields.find((f: any) => f.name === mutName);
          if (!target) continue;
          const args = (target.args ?? []) as Array<{ name: string; type: any }>;
          // Build variables — set quoteId; leave optional args unset.
          const vars: Record<string, unknown> = {};
          const varDefs: string[] = [];
          const argUses: string[] = [];
          for (const a of args) {
            const typeName = unwrapTypeName(a.type);
            const isRequired = a.type?.kind === "NON_NULL";
            if (a.name === "quoteId" || (typeName === "EncodedId" && /quote/i.test(a.name))) {
              vars[a.name] = quoteId;
              varDefs.push(`$${a.name}: EncodedId!`);
              argUses.push(`${a.name}: $${a.name}`);
            } else if (isRequired) {
              // Required and not quoteId — skip this mutation, it needs input we don't have.
              varDefs.length = 0;
              break;
            }
          }
          if (!varDefs.length) continue;
          const sendMutation = `mutation Send(${varDefs.join(", ")}) { ${mutName}(${argUses.join(", ")}) { userErrors { message path } } }`;
          try {
            const sRes = await jobberCall(sendMutation, vars);
            const uErrs = sRes.data?.[mutName]?.userErrors ?? [];
            console.log(`Post-create send [${mutName}]:`, JSON.stringify({ ok: sRes.ok, userErrors: uErrs, gql: (sRes as any).details }));
            if (sRes.ok && uErrs.length === 0) {
              sendStrategy = `post-create:${mutName}`;
              sentAt = new Date().toISOString();
              sendError = null;
              break;
            }
            sendError = uErrs.length ? uErrs : (sRes as any).details ?? sRes;
          } catch (e) {
            console.error(`Post-create send [${mutName}] threw:`, e);
            sendError = (e as Error).message;
          }
        }
      }

      const statusWarning = !sentAt
        ? `Quote was not auto-sent. transitionQuoteTo values available: ${JSON.stringify(quoteTransitionValues)}. Send-like mutations: ${JSON.stringify(sendMutationCandidates)}. Enable an automation in Jobber (Settings → Automations → "When quote is created → send to client") to send by email + text automatically.`
        : null;
      if (statusWarning) console.error(statusWarning, { quoteMutationNames });

      return json({
        ok: true,
        clientId,
        quoteId,
        clientHubUri,
        depositApplied,
        depositStrategy,
        depositError,
        sendStrategy,
        sentAt,
        sendError,
        availableTransitions: quoteTransitionValues,
        sendMutationCandidates,
        statusWarning,
        quoteMutationNames,
      });
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
