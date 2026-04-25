import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import type { ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./App";
import "./index.css";
import { queryClient } from "./queryClient";
import { store } from "./store";

const rootElement: HTMLElement | null = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element with id "root" was not found.');
}

const app: ReactElement = (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);

createRoot(rootElement).render(app);
