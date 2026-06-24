
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createRequire } from "module";
import { existsSync } from "fs";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";

const requireCjs = createRequire(import.meta.url);

// Detect a usable Chromium binary. In production builds we want a
// LOUD failure rather than silently shipping an empty SPA shell to
// crawlers. Set SKIP_PRERENDER=1 to intentionally bypass prerendering.
function hasChromium(): boolean {
  try {
    const puppeteer = requireCjs("puppeteer");
    const p = puppeteer.executablePath();
    return typeof p === "string" && p.length > 0 && existsSync(p);
  } catch {
    return false;
  }
}

function shouldPrerender(mode: string): boolean {
  if (mode === "development") return false;
  if (process.env.SKIP_PRERENDER === "1") {
    console.warn("[vite] SKIP_PRERENDER=1 — skipping prerender plugin.");
    return false;
  }
  if (!hasChromium()) {
    throw new Error(
      "[vite] Prerender requires Chromium but none was found.\n" +
        "Run `npx puppeteer browsers install chrome` before `npm run build`,\n" +
        "or set SKIP_PRERENDER=1 to intentionally skip prerendering."
    );
  }
  return true;
}

// Public, indexable marketing routes that should ship as fully-rendered
// HTML for crawlers and AI scrapers. Anything gated/app-like is omitted
// (see public/robots.txt for the matching Disallow list).
const PRERENDER_ROUTES = [
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
  "/flower-mound",
  "/prosper",
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
  "/rentals",
  "/floor-visualizer",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    // Prerender only on production builds, and only when Chromium is
    // actually available. The plugin runs after Vite/Rollup produce dist/,
    // spins up headless Chrome against the built bundle, waits for the
    // `render-event` dispatched from src/main.tsx, and writes a fully
    // populated index.html into dist/<route>/.
    mode !== 'development' && hasChromium() && prerender({
      routes: PRERENDER_ROUTES,
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterDocumentEvent: 'render-event',
        maxConcurrentRoutes: 4,
        timeout: 60000,
        launchOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        iframe: path.resolve(__dirname, 'iframe-quote.html')
      }
    }
  }
}));
