import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import { ComponentsProvider } from './contexts/AlertsSonner.context.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ComponentsProvider>
        <App />
      </ComponentsProvider>
    </BrowserRouter>
  </StrictMode>,
)
