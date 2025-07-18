
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import IframeApp from './IframeApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IframeApp />
  </StrictMode>,
)
