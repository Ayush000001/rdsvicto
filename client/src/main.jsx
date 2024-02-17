import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ThemeProvider } from "./context/ThemeContext"
import { SidebarProvider } from "./context/SidebarContext"
import { AuthProvider } from "./context/AuthContext";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <SidebarProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SidebarProvider>
  </ThemeProvider>
)
