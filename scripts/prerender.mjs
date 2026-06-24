#!/usr/bin/env node
/**
 * Build-time prerenderer. Starts Vite preview against the freshly built
 * `dist/` in-process, drives Puppeteer through every marketing route, and
 * writes the fully rendered HTML to `dist/<route>/index.html` so crawlers
 * receive real content instead of an empty SPA shell.
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import puppeteer from "puppeteer";
import { preview as vitePreview } from "vite";

const ROUTES = [
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
];

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
  const url = BASE + route;
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  // Wait until React has hydrated and Helmet has injected meta tags.
  await page.waitForFunction(
    () => {
      const root = document.getElementById("root");
      const hasContent = !!root && root.children.length > 0;
      const canonical = document.querySelector('link[rel="canonical"]');
      return hasContent && !!canonical;
    },
    { timeout: 30000 }
  );
  // Small settle for any final async paints.
  await new Promise((r) => setTimeout(r, 500));
  const html = await page.evaluate(() => "<!DOCTYPE html>" + document.documentElement.outerHTML);
  await page.close();
  return html;
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
    console.log(`[prerender] rendering ${ROUTES.length} routes`);
    for (const route of ROUTES) {
      try {
        const html = await renderRoute(browser, route);
        writeRouteHtml(route, html);
      } catch (err) {
        console.error(`[prerender] FAILED ${route}:`, err.message);
        throw err;
      }
    }
    console.log(`[prerender] done — ${ROUTES.length} routes written`);
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
