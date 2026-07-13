## What is going on

The latest Jobber logs show the lead/client is being created, but the flow dies before quote creation:

```text
Fetched propertyId after clientCreate: undefined
propertyCreate failed:
- Field 'propertyCreate' is missing required arguments: clientId
- Field 'property' doesn't exist on type 'PropertyCreatePayload' (Did you mean `properties`?)
```

So the missing piece is not the quote itself yet. The function cannot get/create a Jobber property, and this Jobber account requires `propertyId` before a quote can be created.

## Root cause

The current fallback mutation is shaped like this conceptually:

```graphql
propertyCreate(input: { clientId, address }) {
  property { id }
}
```

But Jobber is telling us that for this API/version:

```graphql
propertyCreate(clientId: ..., attributes: ...) {
  properties { id }
}
```

Meaning:
- `clientId` must be a top-level mutation argument, not inside `input`.
- The payload returns `properties`, not `property`.
- The client lookup is also likely querying the wrong field name: Jobber docs show `clientProperties` as the connection/list for a client's properties, while the code is trying `properties`.

There is a second issue in the frontend path:
- `InlineGaragePacket` sends `zip` to Jobber.
- `GaragePacketModal` creates the packet but does not call Jobber at all.
- `floor_packets` has an `address` column but no `zip` column, so relying only on packet DB data would not provide ZIP unless we pass it or parse it from address later.

## Implementation plan

1. Update `supabase/functions/jobber-quote-from-packet/index.ts` property resolution:
   - Query `clientProperties` first using the created `clientId`.
   - Support both possible response shapes defensively: `clientProperties.nodes[0].id`, `properties[0].id`, and similar fallbacks.

2. Fix explicit property creation:
   - Change `propertyCreate` to pass `clientId` as a top-level argument.
   - Pass address data as the mutation's property/attributes argument using the field shape Jobber expects.
   - Read the returned ID from `properties[0].id` first, with safe fallbacks.

3. Make the quote step more resilient:
   - Only call `quoteCreate` after `propertyId` is confirmed.
   - Keep `propertyId`, `saveToProductsAndServices: false`, then `quoteEdit` for the $100 deposit, then `quoteStatusChange` to `AWAITING_RESPONSE`.
   - Add clear logs for: client ID, property ID source, quote ID, deposit edit result, and status change result.

4. Fix the incomplete frontend path:
   - Add the same Jobber fire-and-forget call to `GaragePacketModal` that `InlineGaragePacket` already has, so both packet submission UIs can create Jobber clients/quotes.
   - Do not block the customer if Jobber fails.

5. Verify after implementation:
   - Deploy/test the edge function.
   - Submit or invoke a controlled test lead.
   - Check `floor_packets` for `jobber_client_id`, `jobber_property_id`, and `jobber_quote_id`.
   - Check edge logs to confirm the flow reaches `quoteCreate` instead of stopping at `propertyCreate`.

## Non-goals

- No database schema changes.
- No new admin site requirement.
- No changes to Jobber OAuth/secrets unless logs show auth failure, which they currently do not.