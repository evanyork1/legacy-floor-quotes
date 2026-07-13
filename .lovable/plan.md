
## Problem
Jobber logs show `clientCreate` succeeded (client `146133578` was created) but `quoteCreate` failed with:
> `propertyId (Expected value to not be null)`

Even though we ask for `properties { id }` in the `clientCreate` response, Jobber returned it empty — the auto-property isn't available inline on the create response. That's why no quote was made.

## Fix (in `supabase/functions/jobber-quote-from-packet/index.ts`)

1. After `clientCreate` succeeds, if `properties[0].id` is missing, run a follow-up query against the client to fetch its property:
   ```graphql
   query ClientProperties($id: EncodedId!) {
     client(id: $id) { id properties { id } }
   }
   ```
   Use the first property ID returned.

2. If that still returns no property (rare — happens if ZIP-only billingAddress didn't auto-create one), call `propertyCreate` explicitly with the client ID + ZIP so Jobber gives us a property to attach the quote to.

3. Then proceed with `quoteCreate` using that `propertyId` (which is required — the earlier attempt worked without it in the mutation input for some accounts, but this account requires it).

4. Also: the earlier retry log showed `depositAmount` isn't a field on `QuoteCreateAttributes` for this API version. Drop `depositAmount` from the create call entirely and always set it via `quoteEdit` after create (matches the existing fallback path).

5. Keep the rest of the flow the same: persist IDs to `floor_packets`, `quoteEdit` for the $100 deposit, then `quoteStatusChange` → `AWAITING_RESPONSE` to send the quote.

## Non-goals
- No schema changes.
- No frontend changes.
- The Jobber client that was just created (`146133578`) will remain orphaned in Jobber — you can delete it manually, or submit another test lead once this is deployed and it'll work end-to-end.

## Verify
Submit a new test lead → check Jobber for a new client **and** a quote in "Awaiting Response" with $100 deposit. If it still fails, edge function logs will show the exact GraphQL error at the property-fetch step.
