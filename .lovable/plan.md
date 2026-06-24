## The error

Netlify deploy is failing with:

> Plugins must be installed either in the Netlify App or in "package.json".
> Please run "npm install -D netlify-plugin-cache"

The `netlify.toml` references the `netlify-plugin-cache` plugin (used to cache the Puppeteer Chromium download between builds), but the plugin isn't listed in `package.json`, so Netlify refuses to start the build.

## Fix

Add `netlify-plugin-cache` to `package.json` devDependencies. One line, no other changes:

```json
"netlify-plugin-cache": "^1.0.3"
```

That's the only file change. Once committed, Netlify will install it during the build, the plugin will register, and the deploy will proceed to the actual `npm run build` step.

## What is NOT changing

- `netlify.toml` — already correct, leave as-is.
- `scripts/verify-prerender.mjs` — already correct.
- No code, route, or content changes.
