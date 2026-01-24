import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// Styling Imports - Order is important for CSS cascading
import './index.css';     // Base Tailwind & Variables
import './App.css';       // Layout-specific overrides
import './styles/globals.css';

/**
 * main.jsx
 * Entry point for the ByteBly Web App
 * Features: React Router context, StrictMode for dev debugging
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);