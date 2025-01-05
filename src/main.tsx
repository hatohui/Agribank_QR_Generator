import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Pages/App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

window.ipcRenderer.on("main-process-message", (_event: any, message: any) => {
  console.log(message);
});
