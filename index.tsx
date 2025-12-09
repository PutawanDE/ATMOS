import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./context/LanguageContext";

// Suppress Recharts defaultProps warning in development
// This is a known issue with Recharts 2.x and React 18+ strict mode
const originalConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && /defaultProps/.test(args[0])) {
    return;
  }
  originalConsoleError(...args);
};

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);