import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Signal to the prerenderer (Puppeteer) that the app is mounted and Helmet
// has flushed, so the snapshot HTML it writes contains full page content.
// Harmless in normal browsers — the event has no other listeners.
if (typeof window !== 'undefined') {
  // Wait a tick so React commits and Helmet writes its tags into <head>.
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.dispatchEvent(new Event('render-event'));
    }, 0);
  });
}
