## What I triple-checked

### 1. Official Jobber API docs

Jobber confirms the API is GraphQL-only and must be called through `https://api.getjobber.com/api/graphql` with JSON requests and OAuth bearer auth. Our function is doing that correctly.

Jobber also confirms API versions must be selected with `X-JOBBER-GRAPHQL-VERSION`; our function is using `2025-01-20`, which is an active version in their changelog.

### 2. Jobber quote/deposit product behavior

Jobber’s help docs confirm quote deposits are a built-in quote feature:

- Quotes can have a required deposit.
- Required deposits can be fixed dollar amounts or percentages.
- If Jobber Payments is enabled, the client approval flow changes to “Review & Pay Deposit”.
- Deposit collection happens through Client Hub / Jobber Payments.

So adding a required $100 quote deposit is a valid Jobber concept; the problem is API shape, not business behavior.

### 3. Live edge logs from this project

The current failure is now very clear:

- The live schema says `QuoteEditAttributes` contains `deposit: CostModifierAttributes`.
- The live mutation failed because our return selection asked for invalid fields directly on `Quote`:
  - `depositAmount`
  - `requiredDepositAmount`
- GraphQL validates the full mutation before executing it, so the deposit edit never actually ran.

This means the last implementation failed before Jobber could apply the deposit.

### 4. External schema mirror / examples

External schema mirrors show older examples using `depositAmount` / `amounts { depositAmount }`, but your live 2025-01-20 Jobber schema contradicts that for the current `Quote` object. The live schema must win.

The external schema also shows valid quote deposit-related output is likely under nested objects like:

- `quote.amounts { ... }`
- `quote.depositRecords`
- `quote.unallocatedDepositRecords`

Not direct fields on `Quote`.

## Revised conclusion

The fix should not guess `depositAmount`, `requiredDepositAmount`, or direct quote fields anymore.

The correct implementation path is:

1. Introspect live `QuoteCreateAttributes`.
2. Introspect live `QuoteEditAttributes`.
3. Introspect live `CostModifierAttributes`.
4. Build the deposit payload from those exact fields.
5. Return only schema-safe quote fields, or verify through `amounts` / deposit record fields after introspection confirms them.

## Implementation plan

### Step 1: Add live schema introspection for deposit types

Inside `jobber-quote-from-packet`, add read-only introspection for:

- `QuoteCreateAttributes`
- `QuoteEditAttributes`
- `CostModifierAttributes`
- `Quote`
- `QuoteAmounts`, if `Quote.amounts` exists in this API version
- available quote-related mutations that include `quote` in the name

This avoids another guessed payload.

### Step 2: Prefer setting the deposit during `quoteCreate`

If the live `QuoteCreateAttributes` schema has `deposit`, include the required deposit in the original quote creation payload instead of editing afterward.

Likely structure, pending live `CostModifierAttributes` fields:

```ts
attributes: {
  ...baseQuoteAttributes,
  deposit: { /* exact fields from CostModifierAttributes */ }
}
```

This is safer because the quote is created with the deposit already attached.

### Step 3: Keep `quoteEdit` as fallback only

If `QuoteCreateAttributes` does not support `deposit`, then apply the deposit with `quoteEdit` using the same schema-derived `CostModifierAttributes` payload.

The mutation response must not request invalid direct fields. It should start with only:

```graphql
quote { id quoteNumber quoteStatus clientHubUri }
userErrors { message path }
```

Then add deposit verification fields only if live introspection confirms them.

### Step 4: Verify using valid output fields

Do not verify with `quote.depositAmount` or `quote.requiredDepositAmount`.

Instead, verify with whichever fields exist in the live schema, likely one of:

```graphql
quote { amounts { depositAmount } }
```

or

```graphql
quote { depositRecords(first: 5) { nodes { ... } } }
```

or simply trust a successful `quoteCreate` / `quoteEdit` response plus zero `userErrors` if Jobber exposes no pre-payment required-deposit output field.

### Step 5: Fix the send/status step separately

The logs also prove `quoteStatusChange` does not exist in this API version. That does not block the deposit edit, but it does mean the quote is likely staying in Draft.

I’ll introspect quote-related mutations and replace this with the correct mutation if one exists. If Jobber does not expose quote sending / awaiting-response through the public API, I’ll remove the broken mutation and return a clear `statusWarning` instead of pretending it succeeded.

### Step 6: Deployment validation

After implementation:

1. Deploy `jobber-quote-from-packet`.
2. Submit one test packet.
3. Check edge logs for:
   - `QuoteCreateAttributes` fields
   - `CostModifierAttributes` fields
   - exact deposit payload label used
   - zero GraphQL errors
   - zero `userErrors`
4. Confirm the Jobber quote UI shows a $100 required deposit in the right payment section.

## Why this should work

The last fix failed because it guessed fields and placed invalid fields in the GraphQL response selection. This plan avoids guessing by making the live Jobber schema the source of truth, using `deposit: CostModifierAttributes` only after confirming the nested shape, and avoiding invalid quote return fields that prevent the mutation from executing.