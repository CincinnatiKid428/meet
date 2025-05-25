// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js';

//import * as atatus from 'atatus-spa'; /*Atatus trial expires 5/25/2025*/
//atatus.config('909884598afd47f1a9001c30d43dc226').install();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
serviceWorkerRegistration.register();