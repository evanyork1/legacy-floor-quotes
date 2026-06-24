import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Signal to the prerenderer (Puppeteer) that the page is fully rendered.
// We wait for: React's first commit + fonts loaded + the DOM to be quiet for
// 800ms (no further mutations). That gives lazy sections, Helmet head writes,
// Supabase fetches in landing components, and animation libs time to populate
// the DOM before Puppeteer snapshots it. Harmless in normal browsers.
if (typeof window !== 'undefined') {
  const signalReady = async () => {
    // Let React commit at least once.
    await new Promise<void>((r) => requestAnimationFrame(() => r()));
    await new Promise<void>((r) => requestAnimationFrame(() => r()));

    // Wait for webfonts so above-the-fold text is in the snapshot.
    try {
      // @ts-expect-error – FontFaceSet types vary by lib.dom version
      if (document.fonts?.ready) await document.fonts.ready;
    } catch {
      /* noop */
    }

    // Wait for the DOM to be quiet for 800ms. Cap at 8s so we never hang
    // the prerender (vite.config gives Puppeteer a 90s timeout overall).
    await new Promise<void>((resolve) => {
      const QUIET_MS = 800;
      const MAX_WAIT_MS = 8000;
      let quietTimer = setTimeout(resolve, QUIET_MS);
      const hardStop = setTimeout(() => {
        clearTimeout(quietTimer);
        observer.disconnect();
        resolve();
      }, MAX_WAIT_MS);
      const observer = new MutationObserver(() => {
        clearTimeout(quietTimer);
        quietTimer = setTimeout(() => {
          clearTimeout(hardStop);
          observer.disconnect();
          resolve();
        }, QUIET_MS);
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    });

    document.dispatchEvent(new Event('render-event'));
  };
  queueMicrotask(signalReady);
}
