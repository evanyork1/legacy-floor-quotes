## Goal
Fire the Meta Pixel standard event `fbq('track', 'Lead')` when the user clicks the "See My Garage Price" button on step 3 of the inline garage packet form.

## Background
- The garage packet flow is implemented in `src/components/packet/InlineGaragePacket.tsx`.
- Step 3 shows the "See My Garage Price" button, which currently calls `handleSubmit`.
- The Meta Pixel base code is already in `index.html` and initializes pixel `1811071886529220`.
- `fbq('track', 'Lead')` is the correct standard Meta event for this action.

## Plan
1. Update `InlineGaragePacket.tsx`:
   - Before the existing submit logic in `handleSubmit`, call `fbq('track', 'Lead')` if `window.fbq` is defined.
   - Use a safe guard (e.g., `typeof window !== 'undefined' && typeof window.fbq === 'function'`) so a blocked or delayed pixel script does not break the form.

2. (Optional) Add a TypeScript declaration for `window.fbq` to avoid implicit-any errors, if the project is strict about it.

3. Verify the build passes.

## Files changed
- `src/components/packet/InlineGaragePacket.tsx`

## Risk / notes
- Firing on click means the event may fire even if the API call later fails. The user explicitly requested this timing.
- No changes to backend, tracking pixels, or routing.