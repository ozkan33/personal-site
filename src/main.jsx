import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')

// Prevent createRoot warning during HMR
const root = container._reactRoot || createRoot(container)
container._reactRoot = root

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
