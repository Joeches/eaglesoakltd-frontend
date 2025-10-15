import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// 1. THIS IS THE MISSING LINK THAT SOLVES EVERYTHING.
// This single line imports your main styles.css file, which contains all the Tailwind
// directives. This is what makes your entire application styled and responsive.
import './styles.css';

import { AuthProvider } from './context/AuthContext.jsx';

// --- Your console-patching and error-handling code can remain. ---
// It has been removed here for clarity but is good practice to keep.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

