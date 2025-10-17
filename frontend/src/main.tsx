import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

//setup
import "./dayjs.ts";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <HeroUIProvider className="h-full">
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ToastProvider />
  </HeroUIProvider>
);
