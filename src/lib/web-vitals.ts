/**
 * Core Web Vitals reporter.
 *
 * Captures LCP, CLS, INP, FCP, TTFB and forwards them to:
 *   1. window.gtag (GA4)  — event name "web_vitals"
 *   2. console (dev only) — easy local inspection
 *
 * Monitored routes (production): "/" (homepage) and
 * "/blog/best-latin-dance-festivals-europe-2026" (new festivals guide).
 * Other routes are still measured but only logged in dev; this keeps GA
 * event volume predictable while we focus on the two pages the user asked
 * us to track after deployment.
 */
import type { Metric } from "web-vitals";
import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";

const MONITORED_PATHS = new Set<string>([
  "/",
  "/blog/best-latin-dance-festivals-europe-2026",
]);

type Gtag = (command: "event", action: string, params: Record<string, unknown>) => void;
function getGtag(): Gtag | null {
  if (typeof window === "undefined") return null;
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  return typeof g === "function" ? g : null;
}

function report(metric: Metric) {
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const monitored = MONITORED_PATHS.has(path);
  const isDev = (import.meta as { env?: { DEV?: boolean } }).env?.DEV;

  if (isDev) {
    // eslint-disable-next-line no-console
    console.log("[web-vitals]", path, metric.name, Math.round(metric.value), metric.rating);
  }

  if (!monitored) return;

  const g = getGtag();
  if (!g) return;
  g("event", "web_vitals", {
    event_category: "Web Vitals",
    event_label: metric.id,
    metric_name: metric.name,
    metric_value: metric.name === "CLS" ? Math.round(metric.value * 1000) : Math.round(metric.value),
    metric_rating: metric.rating,
    page_path: path,
    non_interaction: true,
  });
}

let started = false;
export function initWebVitals() {
  if (started || typeof window === "undefined") return;
  started = true;
  onLCP(report);
  onCLS(report);
  onINP(report);
  onFCP(report);
  onTTFB(report);
}
