import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initWebVitals } from "./lib/web-vitals";

createRoot(document.getElementById("root")!).render(<App />);

// Core Web Vitals — reports LCP/CLS/INP/FCP/TTFB on monitored routes.
initWebVitals();
