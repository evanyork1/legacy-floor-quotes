## Problem

Quote is now being created in Jobber successfully, but the $100 required deposit is not being applied. The current `quoteEdit` call sends `attributes: { depositAmount: 100 }`, which is almost certainly not the correct field name on Jobber's `QuoteEditAttributes` type — Jobber's schema uses a nested `requiredDeposit` object (with `amount`), not a flat `depositAmount`. We currently swallow the `userErrors` from that step with only a `console.error`, so the packet flow completes "successfully" while the deposit silently fails.

## Plan

1. **Introspect Jobber's schema for the correct deposit shape** (in the edge function, one-time diagnostic log) to confirm which of these is correct for this API version (`2025-01-20`):
   - `quoteEdit(attributes: { requiredDeposit: { amount: 100 } })`
   - `quoteEdit(attributes: { deposit: { amount: 100, required: true } })`
   - a dedicated mutation like `quoteRequireDeposit(quoteId, amount)`

2. **Fix the deposit call in `supabase/functions/jobber-quote-from-packet/index.ts`:**
   - Replace `attributes: { depositAmount: 100 }` with the correct nested shape (expected: `requiredDeposit: { amount: 100 }`).
   - Update the `QuoteEdit` GraphQL selection to also return `requiredDeposit { amount }` so we can verify.
   - If `quoteEdit` doesn't support setting a required deposit, fall back to the dedicated deposit mutation.

3. **Make the deposit step observable and non-silent:**
   - Log the full `userErrors` array and the returned `requiredDeposit` value.
   - If the deposit step fails, still return `ok: true` for the quote but include `depositError` in the JSON response so the frontend / logs surface it.

4. **Verification:**
   - Submit a test packet.
   - Confirm in Jobber that the created quote now shows a $100 required deposit.
   - Confirm `quoteStatusChange -> AWAITING_RESPONSE` still succeeds after the deposit is set.

## Non-goals

- No changes to client/property creation (that path is now working).
- No frontend changes.
- No DB schema changes.
