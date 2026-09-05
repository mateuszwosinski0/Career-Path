import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApplicationsProvider } from "@/context/ApplicationsContext"
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import App from "./App";
import "@/index.css";
import { LanguageProvider } from "./context/LanguageContext";
import { NotificationsProvider } from "./context/NotificationContext";
import { ToastProvider } from "./context/ToastContext";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
         <ToastProvider>
        <ThemeProvider>
          <LanguageProvider>
          <ApplicationsProvider>
            <NotificationsProvider>
              
            <App />
            
            </NotificationsProvider>
          </ApplicationsProvider>
          </LanguageProvider>
        </ThemeProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);