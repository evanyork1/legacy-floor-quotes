import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
//
// Prerendering for SEO is handled by react-snap as a postbuild step
// (see package.json -> "postbuild" and the "reactSnap" config block).
// react-snap walks the built app with headless Chrome and writes real
// rendered HTML into dist/<route>/index.html for every public route.
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
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

