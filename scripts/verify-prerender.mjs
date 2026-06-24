#!/usr/bin/env node
/**
 * Post-build verifier for react-snap output. Ensures every public route
 * shipped real prerendered HTML, that the right canonical/og:url base
 * domain is used, and that no two indexable routes share a <title>.
 *
 * Any failure exits non-zero so Netlify aborts the deploy.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join, relative } from "node:path";

const DIST = resolve(process.cwd(), "dist");
const REQUIRED_BASE = "https://legacyindustrialcoatings.com";

// Route file -> phrases that must appear in the rendered body.
const KEYWORD_CHECKS = [
  ["index.html", ["polyurea", "warranty"]],
  ["commercial/index.html", ["warehouse", "polished concrete"]],
  ["commercialfloors/index.html", ["industrial"]],
  ["garagefloors/index.html", ["polyurea", "garage"]],
  ["industrial-epoxy/index.html", ["industrial", "epoxy"]],
  ["about/index.html", ["legacy"]],
  ["contact/index.html", ["contact"]],
];

// Every route react-snap was configured to prerender must exist in dist.
const REQUIRED_FILES = [
  "index.html",
  "gallery/index.html",
  "service-areas/index.html",
  "warranty/index.html",
  "terms/index.html",
  "privacy/index.html",
  "contact/index.html",
  "flake-floors/index.html",
  "residential-patio/index.html",
  "garagefloors/index.html",
  "industrial-epoxy/index.html",
  "commercial/index.html",
  "commercialfloors/index.html",
  "about-commercial/index.html",
  "concrete-polishing/index.html",
  "concrete-sealing/index.html",
  "faq/index.html",
  "blog/index.html",
  "financing/index.html",
  "about/index.html",
  "case-studies/index.html",
  "commercial-case-studies/index.html",
  "residential-case-studies/index.html",
  "floor-visualizer/index.html",
];

// Min body bytes (post-</head>). An empty React shell is ~1 KB; real
// marketing pages are 20-80 KB. 5 KB cleanly catches blank snapshots.
const MIN_BODY_BYTES = 5 * 1024;

const EMPTY_ROOT = /<div\s+id=["']root["']\s*>\s*<\/div>/i;

const failures = [];

// 1) Every prerendered route must exist and contain real content -------
for (const file of REQUIRED_FILES) {
  const full = resolve(DIST, file);
  if (!existsSync(full)) {
    failures.push(`MISSING        ${file} (react-snap did not write this route)`);
    continue;
  }
  const html = readFileSync(full, "utf8");
  if (EMPTY_ROOT.test(html)) {
    failures.push(`EMPTY ROOT     ${file} (<div id="root"></div> with no children — prerender produced an empty shell)`);
    continue;
  }
  const body = html.split(/<\/head>/i)[1] ?? html;
  const bodyBytes = Buffer.byteLength(body, "utf8");
  if (bodyBytes < MIN_BODY_BYTES) {
    failures.push(
      `TOO SMALL      ${file} (body ${bodyBytes} bytes < ${MIN_BODY_BYTES} floor)`
    );
  }
}

// 2) Route-specific keyword checks --------------------------------------
for (const [file, needles] of KEYWORD_CHECKS) {
  const full = resolve(DIST, file);
  if (!existsSync(full)) continue; // already reported above
  const html = readFileSync(full, "utf8");
  const lower = html.toLowerCase();
  for (const needle of needles) {
    if (!lower.includes(needle.toLowerCase())) {
      failures.push(`KEYWORD MISSING ${file} (expected "${needle}")`);
    }
  }
}

// 3) Canonical + og:url must use the production domain -----------------
function extractCanonical(html) {
  const tags = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi) || [];
  for (const tag of tags) {
    const m = tag.match(/href=["']([^"']+)["']/i);
    if (m) return m[1].trim();
  }
  return null;
}

function extractOgUrl(html) {
  const tags = html.match(/<meta\b[^>]*property=["']og:url["'][^>]*>/gi) || [];
  for (const tag of tags) {
    const m = tag.match(/content=["']([^"']+)["']/i);
    if (m) return m[1].trim();
  }
  return null;
}

for (const file of REQUIRED_FILES) {
  const full = resolve(DIST, file);
  if (!existsSync(full)) continue;
  const html = readFileSync(full, "utf8");
  const canonical = extractCanonical(html);
  const ogUrl = extractOgUrl(html);
  if (!canonical || !canonical.startsWith(REQUIRED_BASE)) {
    failures.push(`BAD CANONICAL   ${file} (canonical="${canonical ?? "<missing>"}" must start with ${REQUIRED_BASE})`);
  }
  if (!ogUrl || !ogUrl.startsWith(REQUIRED_BASE)) {
    failures.push(`BAD OG:URL      ${file} (og:url="${ogUrl ?? "<missing>"}" must start with ${REQUIRED_BASE})`);
  }
}


// 4) Duplicate <title> check across every prerendered HTML -------------
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
  const head = html.split(/<\/head>/i)[0] ?? html;
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
      `DUPLICATE TITLE "${title}" appears in ${files.length} indexable routes: ${files.join(", ")}`
    );
  }
}

// ---------------------------------------------------------------------
if (failures.length > 0) {
  console.error("\n[verify-prerender] FAILED:");
  for (const f of failures) console.error("  " + f);
  console.error(
    `\nBuild aborted. Fix the issues above (missing prerender output, ` +
      `empty shells, wrong canonical/og:url domain, or duplicate titles) ` +
      `before redeploying.\n`
  );
  process.exit(1);
}

console.log(
  `[verify-prerender] OK — ${REQUIRED_FILES.length} routes verified, ` +
    `${titleToFiles.size} unique indexable titles, canonical/og:url locked to ${REQUIRED_BASE}.`
);
