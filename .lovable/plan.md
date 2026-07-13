## Remove Meta Pixel Lead trigger from garage packet form

You already have a button-click conversion set up for Lead in Meta directly, so the code-fired `fbq('track', 'Lead')` is redundant (and could double-count).

### Change

**`src/components/packet/InlineGaragePacket.tsx`** (lines 81–83) — remove the block:

```ts
if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
  (window as any).fbq('track', 'Lead');
}
```

### Not touched
- `index.html` pixel init + `PageView` — leave in place.
- `GiveawayForm.tsx` `CompleteRegistration` event — different event, different form, leave in place.
- No other forms currently fire `Lead` from code.