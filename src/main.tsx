import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Clarity from '@microsoft/clarity';
import './index.css'
import App from './App.tsx'

Clarity.init("td38lb6t50");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
