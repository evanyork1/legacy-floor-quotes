# Auto-send Jobber quote by email and SMS

Jobber's desktop "Send by email" and "Send by text" toggles are not tied to `quoteCreate` — they run as a separate send action after the quote exists. To make it happen automatically from our edge function, we need to invoke Jobber's send mutations right after `quoteCreate` succeeds, using the same schema-introspection safety pattern already in the function.

## Approach

1. **Introspect send mutations** in `jobber-quote-from-packet/index.ts` using the existing `introspectQuoteMutationNames` helper, looking for any of:
   - `quoteSendEmail` / `quoteEmailSend` / `quoteSend`
   - `quoteSendText` / `quoteSmsSend` / `quoteTextMessageSend`
   
   Also introspect their input types (`QuoteSendEmailInput`, etc.) to learn required fields (typically `quoteId`, optional `message`, `subject`, `to`, `attachQuote`).

2. **After a successful `quoteCreate`** (and after deposit is applied), call the discovered mutations in order:
   - Email send → uses client's primary email from the packet
   - Text send → uses client's primary phone from the packet
   
   Each call is wrapped in try/catch; a send failure does not fail the whole request — it's reported back in the response payload.

3. **Response additions**: `emailSent`, `emailError`, `smsSent`, `smsError`, plus the resolved mutation names for debugging (same pattern as `depositApplied`/`depositError`).

4. **Fallback if Jobber's API version doesn't expose send mutations**: log a clear warning and return `emailSent: false, reason: "mutation_not_available"`. In that case the only automatic path is Jobber's built-in **Automations** (Settings → Automations → "When quote is created → send to client"), which the user would enable once in the Jobber UI. I'll surface that guidance in the response so the frontend can show it.

## Technical details

- File touched: `supabase/functions/jobber-quote-from-packet/index.ts` only.
- Reuse `introspectInputFields` and `gqlFetch` already in the file.
- Send calls happen after deposit logic, before the final response.
- No DB schema changes; no frontend changes required.
- Deploy the edge function after edit.

## Open question

Do you want **both** email and SMS sent every time, or should it depend on which contact fields (email / phone) are present on the packet? Default I'll implement: send email if the client has an email, send SMS if the client has a mobile phone — mirroring what the Jobber desktop dialog does.
