## Confirmed diagnosis

The screenshot is showing a booking created with the old raw value: `utm_source=24046259518`.

I reproduced both deployed versions:

- `legacyindustrialcoatings.com` currently opens Jobber with `utm_source=google-ads&utm_medium=cpc` — the normalization fix is active there.
- `legacy-floor-quotes.lovable.app` still opens Jobber with `utm_source=24046259518&utm_medium=cpc` — that published version is stale and does not contain the fix.

Existing Jobber records will not be renamed retroactively, so the screenshot alone does not confirm which deployed version created that request.

## Implementation plan

1. **Use the exact requested Jobber label**
   - Normalize Google paid traffic to `utm_source=Google Ads` and `utm_medium=cpc` so Jobber receives and displays `Google Ads - cpc`, rather than `google-ads - cpc` or the campaign number.
   - Preserve the numeric ID under `utm_campaign` and preserve `gclid`, `gbraid`, or `wbraid` for attribution.

2. **Normalize attribution at the shared storage boundary**
   - Apply normalization whenever stored attribution is read, not only while constructing selected booking URLs.
   - This also repairs old numeric attribution already saved in a visitor’s browser before any Jobber link is opened.

3. **Keep every Jobber entry path consistent**
   - Update both the React booking-link builder and the Jivosite “Book an Estimate” interception path to produce the same exact parameters.
   - Confirm homepage, Garage Floors sticky CTA, modals, and other direct Jobber booking buttons cannot bypass normalization.

4. **Verify before release**
   - Test a simulated Google Ads visit using `utm_source=24046259518&utm_medium=cpc&gclid=...`.
   - Confirm the actual popup URL contains `utm_source=Google+Ads`, `utm_medium=cpc`, `utm_campaign=24046259518`, and the click ID.
   - Also verify organic traffic remains `google - organic` and non-Google sources are unchanged.

5. **Deployment check**
   - After the code change, verify the production/custom-domain click URL again. The Lovable published URL is currently stale, so it must not be used as proof until its deployed version is updated.