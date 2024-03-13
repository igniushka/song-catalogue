import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './component/App.tsx'
import './index.css'
import { AuthorisationProvider } from './context/Authentication.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthorisationProvider>
      <App />
    </AuthorisationProvider>
  </React.StrictMode>,
)
