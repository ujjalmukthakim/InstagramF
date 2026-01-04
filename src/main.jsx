import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { AuthProvider } from "./context/AuthContext"
import "./index.css" // Tailwind CSS import

// Find the root element in your HTML
const rootElement = document.getElementById("root")

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)
