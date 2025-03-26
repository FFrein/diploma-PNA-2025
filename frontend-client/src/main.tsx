import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Context, store } from "./store/context.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Context.Provider value={{ store }}>
      <App />
    </Context.Provider>
  </StrictMode>
);
