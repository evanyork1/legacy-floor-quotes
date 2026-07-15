## Goal
Rip out every direct Google gtag/Ads/Analytics snippet in `index.html` and replace it with the Google Tag Manager container (`GTM-THSCWPZW`) you pasted.

## Changes to `index.html`

**Remove (lines 20–70):**
- `gtag.js` loader for `AW-410786005`
- `gtag.js` loader for `G-Q7NX25CBGD`
- The `gtag('config', ...)` initialization block (Ads, GA4, phone conversion `AW-16455875438`)
- `gtag_report_conversion()` and `gtag_report_conversion_new()` helper functions

**Add in `<head>` (right after the Google Fonts block):**
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-THSCWPZW');</script>
<!-- End Google Tag Manager -->
```

**Add as the first element inside `<body>`:**
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-THSCWPZW"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

## Compatibility shim (important)

Several places in your app still call `gtag(...)` and `gtag_report_conversion(...)` directly:
- `iframe-quote.html`
- `src/components/quote/Step7QuoteSummary.tsx`
- `src/hooks/quote/useQuoteSubmission.tsx`
- `src/components/commercial/CommercialContactModal.tsx`
- `src/components/quote/QuoteOnlyFooterDFW.tsx`, `QuoteOnlyFooterPHX.tsx`
- The inline `GET MORE INFO` click handler at the bottom of `index.html`

If we just delete the gtag stub, those calls throw `ReferenceError` and break the pages. To keep the swap purely in `index.html` (no React changes), I'll add a tiny shim right after the GTM snippet so existing calls forward into GTM's dataLayer instead of erroring:

```html
<script>
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ dataLayer.push(arguments); };
  window.gtag_report_conversion = window.gtag_report_conversion || function(url){
    dataLayer.push({event: 'click_to_call', url: url});
    if (url) window.location = url;
    return false;
  };
  window.gtag_report_conversion_new = window.gtag_report_conversion_new || function(url){
    dataLayer.push({event: 'click_to_call_new', url: url});
    if (url) window.location = url;
    return false;
  };
</script>
```

After this, all existing conversion events (`quote_completion`, `contact_form`, phone clicks, etc.) will land in `dataLayer` and you can wire them up as Tags/Triggers inside GTM without touching code.

## What stays untouched
- Hotjar, Meta Pixel, Jivosite/Jobber booking hijack, SEO/OG tags, favicons — all unchanged.
- No React/TSX files modified.

## Result
- Only GTM (`GTM-THSCWPZW`) loads Google tracking.
- Old Ads (`AW-410786005`, `AW-16455875438`) and GA4 (`G-Q7NX25CBGD`) are no longer hardcoded — you re-add them as tags inside GTM if/when you want them.
- Existing in-app conversion calls keep working via dataLayer.
