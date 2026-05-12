import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore
import '@fontsource/lexend';
// @ts-ignore
import '@fontsource/geist-sans';
// @ts-ignore
import '@fontsource/geist-mono';
import './styles/globals.css'
import './features/tiptap-editor/styles/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
