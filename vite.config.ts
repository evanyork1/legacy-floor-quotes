
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";

// Best-effort detection of a usable Chromium binary. If puppeteer's
// browser isn't installed (e.g. on a host where `npx puppeteer browsers
// install chrome` failed), we skip prerendering rather than break the
// build. The site will still build as a normal SPA in that case.
function hasChromium(): boolean {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const puppeteer = require("puppeteer");
    const p = puppeteer.executablePath();
    // executablePath() returns a string in CJS contexts; truthy means a path was resolved.
    return typeof p === "string" && p.length > 0 && require("fs").existsSync(p);
  } catch {
    return false;
  }
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
