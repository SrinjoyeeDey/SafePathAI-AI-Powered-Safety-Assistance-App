import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { LocationProvider } from './context/LocationContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <LocationProvider>
          <App />
        </LocationProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
);