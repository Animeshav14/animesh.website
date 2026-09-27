import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/stix-two-text/latin-400.css'
import '@fontsource/stix-two-text/latin-400-italic.css'
import '@fontsource/stix-two-text/latin-500.css'
import '@fontsource/stix-two-text/latin-600.css'
import '@fontsource/stix-two-math/latin-400.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
