import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserCurrentProvider } from "./context/UserCurrentContext.jsx";
import { EndpointProvider } from "./context/Endpoint.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EndpointProvider>
      <UserCurrentProvider>
        <App />
      </UserCurrentProvider>
    </EndpointProvider>
  </React.StrictMode>,
);
