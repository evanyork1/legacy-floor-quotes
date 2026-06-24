#!/usr/bin/env node
/**
 * Post-build verifier. Confirms that the prerender plugin actually
 * baked real HTML into dist/<route>/index.html for critical marketing
 * routes AND that every prerendered route ships a unique <title>.
 *
 * Either kind of failure exits non-zero so Netlify aborts the deploy
 * instead of shipping bad SEO to crawlers.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join, relative } from "node:path";

const DIST = resolve(process.cwd(), "dist");

// route file -> phrases that must all appear in the rendered HTML body.
// These are tied to copy that actually ships on each page; if the prerender
// silently produces an empty React shell, none of these strings will be there
// and the build aborts.
const CHECKS = [
  ["index.html", ["warranty", "polyurea"]],
  ["commercial/index.html", ["warehouse", "polished concrete"]],
  ["commercialfloors/index.html", ["industrial", "polishing"]],
  ["garagefloors/index.html", ["polyurea", "garage"]],
  ["industrial-epoxy/index.html", ["industrial", "epoxy"]],
  ["about/index.html", ["legacy"]],
  ["contact/index.html", ["contact"]],
];

// Minimum body size (post-<head>) for any prerendered route. A near-empty
// React shell weighs ~1 KB; real marketing pages are 20–80 KB. 5 KB is a
// generous floor that still catches blank/half-rendered snapshots.
const MIN_BODY_BYTES = 5 * 1024;

const failures = [];

// 1) Content + size checks for critical routes ----------------------
for (const [file, needles] of CHECKS) {
  const full = resolve(DIST, file);
  if (!existsSync(full)) {
    failures.push(`MISSING  ${file}`);
    continue;
  }
  const html = readFileSync(full, "utf8");
  const body = html.split("</head>")[1] ?? html;
  const bodyBytes = Buffer.byteLength(body, "utf8");
  if (bodyBytes < MIN_BODY_BYTES) {
    failures.push(
      `TOO SMALL ${file} (body ${bodyBytes} bytes < ${MIN_BODY_BYTES} floor — prerender likely shipped an empty shell)`
    );
    continue;
  }
  const lower = body.toLowerCase();
  for (const needle of needles) {
    if (!lower.includes(needle.toLowerCase())) {
      failures.push(`EMPTY    ${file} (expected "${needle}" in body)`);
    }
  }
}

// 2) Duplicate-title check across every prerendered HTML file --------
function walk(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

const titleToFiles = new Map();
for (const file of walk(DIST)) {
  const html = readFileSync(file, "utf8");
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  if (!m) continue;
  const title = m[1].trim();
  if (!title) continue;
  // Skip pages explicitly marked noindex — duplicates there don't hurt SEO.
  const head = html.split("</head>")[0] ?? html;
  if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(head)) {
    continue;
  }
  const rel = relative(DIST, file);
  if (!titleToFiles.has(title)) titleToFiles.set(title, []);
  titleToFiles.get(title).push(rel);
}

for (const [title, files] of titleToFiles) {
  if (files.length > 1) {
    failures.push(
      `DUPLICATE TITLE  "${title}" appears in ${files.length} indexable routes: ${files.join(", ")}`
    );
  }
}

// ---------------------------------------------------------------------
if (failures.length > 0) {
  console.error("\n[verify-prerender] FAILED:");
  for (const f of failures) console.error("  " + f);
  console.error(
    "\nBuild aborted. Fix the issues above (missing prerender output or " +
      "duplicate <title> tags) before redeploying.\n"
  );
  process.exit(1);
}

console.log(
  `[verify-prerender] OK — ${CHECKS.length} content checks passed, ` +
    `${titleToFiles.size} unique indexable titles.`
);
