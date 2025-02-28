// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'
import { AuthProvider } from "./context/AuthContext"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
