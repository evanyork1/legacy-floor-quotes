#!/usr/bin/env node
/**
 * Post-build verifier. Confirms that the prerender plugin actually
 * baked real HTML into dist/<route>/index.html for critical marketing
 * routes. If any of these files is missing or still looks like the
 * empty SPA shell, exit non-zero so Netlify aborts the deploy instead
 * of shipping a blank page to crawlers.
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const DIST = resolve(process.cwd(), "dist");

// route file -> a phrase that must appear in the rendered HTML body
const CHECKS = [
  ["index.html", "epoxy"],
  ["commercial/index.html", "commercial"],
  ["garagefloors/index.html", "garage"],
  ["industrial-epoxy/index.html", "epoxy"],
  ["about/index.html", "about"],
  ["contact/index.html", "contact"],
];

const failures = [];

for (const [file, needle] of CHECKS) {
  const full = resolve(DIST, file);
  if (!existsSync(full)) {
    failures.push(`MISSING  ${file}`);
    continue;
  }
  const html = readFileSync(full, "utf8");
  // Strip the <head> so we're checking actual rendered body content,
  // not just meta tags injected by Helmet.
  const body = html.split("</head>")[1] ?? html;
  if (!body.toLowerCase().includes(needle.toLowerCase())) {
    failures.push(`EMPTY    ${file} (expected "${needle}" in body)`);
  }
}

if (failures.length > 0) {
  console.error("\n[verify-prerender] FAILED — prerender did not produce real HTML:");
  for (const f of failures) console.error("  " + f);
  console.error(
    "\nThe build will be aborted so a blank SPA shell is not deployed.\n" +
      "Check that Chromium installed correctly and that the prerender plugin ran.\n"
  );
  process.exit(1);
}

console.log(`[verify-prerender] OK — ${CHECKS.length} routes contain real rendered HTML.`);
