import "./reset.css"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { NavigationProvider } from "./context/navigation"
import { ModalProvider } from "./context/modal-context"
import { ThemeProvider } from "./context/theme-context"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <NavigationProvider>
      <ThemeProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </ThemeProvider>
    </NavigationProvider>
  </React.StrictMode>
)
