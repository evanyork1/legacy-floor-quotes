import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const container = document.getElementById("root")!;

// react-snap pre-renders our public marketing routes to real HTML files
// during the build. When the page is loaded with that prerendered markup
// present, hydrate it instead of replacing it (avoids a flash and keeps
// the crawlable HTML stable for SEO). Otherwise do a normal client render.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
