#!/usr/bin/env node
/**
 * Build-time prerenderer. Starts Vite preview against the freshly built
 * `dist/` in-process, drives Puppeteer through every marketing route, and
 * writes the fully rendered HTML to `dist/<route>/index.html` so crawlers
 * receive real content instead of an empty SPA shell.
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";
import puppeteer from "puppeteer";
import { preview as vitePreview } from "vite";

// Parse city slugs out of src/data/serviceAreaCities.ts without needing a
// TS loader. We only need each entry's `slug: "..."` value.
const cityFileSrc = readFileSync(
  resolve(process.cwd(), "src/data/serviceAreaCities.ts"),
  "utf8",
);
const CITY_SLUGS = Array.from(
  cityFileSrc.matchAll(/^\s*slug:\s*"([a-z0-9-]+)"/gm),
).map((m) => m[1]);

const STATIC_ROUTES = [
  "/",
  "/gallery",
  "/service-areas",
  "/warranty",
  "/terms",
  "/privacy",
  "/contact",
  "/flake-floors",
  "/residential-patio",
  "/garagefloors",
  "/industrial-epoxy",
  "/commercial",
  "/commercialfloors",
  "/about-commercial",
  "/concrete-polishing",
  "/concrete-sealing",
  "/faq",
  "/blog",
  "/financing",
  "/about",
  "/case-studies",
  "/commercial-case-studies",
  "/residential-case-studies",
  "/floor-visualizer",
  "/commercial-floor-maintenance",
];

// Commercial application/solution pages come from src/data/commercialNav.ts.
// Only routes this app actually renders (not the `existing: true` links).
const navFileSrc = readFileSync(
  resolve(process.cwd(), "src/data/commercialNav.ts"),
  "utf8",
);
const COMMERCIAL_ROUTES = Array.from(
  navFileSrc.matchAll(/path:\s*"(\/[a-z0-9-]+)",\s*slug:/g),
).map((m) => m[1]);
STATIC_ROUTES.push(...COMMERCIAL_ROUTES);

const CITY_ROUTES = CITY_SLUGS.map((slug) => `/epoxy-flooring/${slug}`);

// Case studies live in static data. Each canonicalizes to
// /{category}-case-studies/{slug} (see CaseStudyDetail.tsx).
const caseFileSrc = readFileSync(
  resolve(process.cwd(), "src/data/caseStudies.ts"),
  "utf8",
);
const CASE_STUDY_ROUTES = Array.from(
  caseFileSrc.matchAll(
    /slug:\s*"([a-z0-9-]+)",\s*[\r\n]+\s*category:\s*"(commercial|residential)"/g,
  ),
).map(([, slug, category]) => `/${category}-case-studies/${slug}`);

// Blog posts are database-driven, so their canonical URLs are maintained in
// the sitemap. Prerender whatever the sitemap advertises so crawlers never
// receive the homepage fallback for a /blog/* URL. Treated as best-effort:
// a failed blog render warns but does not abort the build (see main()).
const sitemapSrc = readFileSync(
  resolve(process.cwd(), "public/sitemap.xml"),
  "utf8",
);
const BLOG_ROUTES = Array.from(
  sitemapSrc.matchAll(
    /<loc>https:\/\/legacyindustrialcoatings\.com(\/blog\/[a-z0-9-]+)<\/loc>/g,
  ),
).map((m) => m[1]);

// Routes that MUST render (build aborts on failure).
const REQUIRED_ROUTES = [...STATIC_ROUTES, ...CITY_ROUTES, ...CASE_STUDY_ROUTES];
// Best-effort routes (warn on failure, keep going).
const OPTIONAL_ROUTES = [...BLOG_ROUTES];
const ROUTES = [...REQUIRED_ROUTES, ...OPTIONAL_ROUTES];

const DIST = resolve(process.cwd(), "dist");
const PORT = 4321;
const BASE = `http://localhost:${PORT}`;

async function startPreview() {
  const server = await vitePreview({
    root: process.cwd(),
    preview: {
      host: "127.0.0.1",
      port: PORT,
      strictPort: true,
    },
  });
  console.log(`[preview] serving ${DIST} at ${BASE}/`);
  return server;
}

async function closePreview(server) {
  if (!server?.httpServer) return;
  await new Promise((resolveClose, rejectClose) => {
    server.httpServer.close((err) => (err ? rejectClose(err) : resolveClose()));
  });
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`preview server did not become ready at ${url}`);
}

async function renderRoute(browser, route) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const type = request.resourceType();
    if (["image", "media", "font"].includes(type)) {
      request.abort();
    } else {
      request.continue();
    }
  });

  try {
    const url = BASE + route;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    // Wait until React has hydrated, real content is present, and Helmet has
    // injected a canonical link WITH a populated href. Requiring a non-empty
    // href (not just the element) prevents capturing an empty
    // `<link rel="canonical">` before Helmet finishes — the bug that shipped
    // hrefless canonicals to crawlers. Requiring an <h1> with text ensures
    // async (database-driven) content has actually rendered.
    await page.waitForFunction(
      () => {
        const root = document.getElementById("root");
        const hasContent = !!root && root.children.length > 0;
        const canonical = document.querySelector('link[rel="canonical"]');
        const hasCanonical = !!canonical && !!canonical.getAttribute("href");
        const h1 = document.querySelector("h1");
        const hasHeading = !!h1 && h1.textContent.trim().length > 0;
        return hasContent && hasCanonical && hasHeading;
      },
      { timeout: 30000 }
    );
    // Small settle for any final async paints.
    await new Promise((r) => setTimeout(r, 500));
    return await page.evaluate(() => "<!DOCTYPE html>" + document.documentElement.outerHTML);
  } finally {
    await page.close().catch(() => {});
  }
}

function writeRouteHtml(route, html) {
  const rel = route === "/" ? "index.html" : `${route.replace(/^\//, "")}/index.html`;
  const target = join(DIST, rel);
  mkdirSync(resolve(target, ".."), { recursive: true });
  writeFileSync(target, html, "utf8");
  console.log(`  wrote ${rel} (${(html.length / 1024).toFixed(1)} KB)`);
}

async function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    throw new Error("dist/index.html missing — run `vite build` first.");
  }
  const preview = await startPreview();
  let browser;
  try {
    await waitForServer(BASE + "/", 30000);
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
    console.log(
      `[prerender] rendering ${ROUTES.length} routes ` +
        `(${REQUIRED_ROUTES.length} required, ${OPTIONAL_ROUTES.length} best-effort)`,
    );
    const optional = new Set(OPTIONAL_ROUTES);
    let written = 0;
    for (const route of ROUTES) {
      try {
        const html = await renderRoute(browser, route);
        writeRouteHtml(route, html);
        written++;
      } catch (err) {
        if (optional.has(route)) {
          console.warn(`[prerender] SKIPPED (best-effort) ${route}: ${err.message}`);
          continue;
        }
        console.error(`[prerender] FAILED ${route}:`, err.message);
        throw err;
      }
    }
    console.log(`[prerender] done — ${written}/${ROUTES.length} routes written`);
  } finally {
    if (browser) await browser.close().catch(() => {});
    await closePreview(preview).catch((err) => {
      console.warn(`[preview] failed to close cleanly: ${err.message}`);
    });
  }
}

main().catch((err) => {
  console.error("[prerender] fatal:", err);
  process.exit(1);
});
