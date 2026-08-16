import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const redirectParam = new URLSearchParams(window.location.search).get('p')

if (redirectParam) {
  window.history.replaceState({}, '', decodeURIComponent(redirectParam))
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
