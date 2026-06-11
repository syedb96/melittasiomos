// Lightweight client-side A/B testing.
//
// Design: every visitor gets a stable random id in localStorage. Each
// experiment hashes (visitorId + experimentKey) into a deterministic
// bucket so the same visitor always sees the same variant for the
// same experiment. Variants are weighted (default = even split).
//
// Tracking: the chosen variant is logged via `trackCta(label, location)`
// when `useVariant` mounts (once per session per experiment) and on
// every CTA click via `recordVariantClick(...)`. Read winners from
// Supabase `cta_events` after ≥14 days — see docs/94.
//
// Wix replication: re-implement the same hash + localStorage in Velo
// (public/ab.js). The experiments list (src/data/ab-experiments.ts)
// is the contract — same keys, same variants, same weights.

import { useEffect, useMemo } from "react";
import { trackCta } from "@/lib/analytics";

const VISITOR_KEY = "pn_ab_visitor";
const ASSIGN_SEEN_PREFIX = "pn_ab_seen_";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface Variant<T = unknown> {
  id: string;
  label: string;
  payload: T;
  weight?: number; // default 1
}

export interface Experiment<T = unknown> {
  key: string;
  description: string;
  page: string;
  variants: Variant<T>[];
}

function readVisitorId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    const raw = localStorage.getItem(VISITOR_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { id: string; ts: number };
      if (Date.now() - parsed.ts < TTL_MS) return parsed.id;
    }
  } catch { /* fallthrough */ }
  const id =
    (typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2)) as string;
  try {
    localStorage.setItem(VISITOR_KEY, JSON.stringify({ id, ts: Date.now() }));
  } catch { /* no-op */ }
  return id;
}

// Tiny stable string hash (FNV-1a 32-bit). Stable across runs.
function hash32(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h >>> 0;
}

export function pickVariant<T>(experiment: Experiment<T>, visitorId: string): Variant<T> {
  const totalWeight = experiment.variants.reduce((sum, v) => sum + (v.weight ?? 1), 0);
  const bucket = hash32(`${visitorId}:${experiment.key}`) % totalWeight;
  let acc = 0;
  for (const v of experiment.variants) {
    acc += v.weight ?? 1;
    if (bucket < acc) return v;
  }
  return experiment.variants[experiment.variants.length - 1];
}

/**
 * Hook: returns the variant for this visitor + logs the assignment once
 * per session (so impression vs click ratios are meaningful).
 */
export function useVariant<T>(experiment: Experiment<T>): Variant<T> {
  const visitorId = useMemo(() => readVisitorId(), []);
  const variant = useMemo(() => pickVariant(experiment, visitorId), [experiment, visitorId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seenKey = `${ASSIGN_SEEN_PREFIX}${experiment.key}`;
    if (sessionStorage.getItem(seenKey)) return;
    sessionStorage.setItem(seenKey, variant.id);
    trackCta(
      `ab_impression:${experiment.key}:${variant.id}`,
      experiment.page,
    );
  }, [experiment, variant]);

  return variant;
}

/**
 * Call on CTA click. Logs an `ab_click:<key>:<variant>` event so the
 * winner SQL can match impressions vs clicks 1:1.
 */
export function recordVariantClick(experimentKey: string, variantId: string, location?: string) {
  trackCta(`ab_click:${experimentKey}:${variantId}`, location);
}

/** Test helper — reset assignments (only used by /admin/tracking-qa). */
export function _resetAbForTests() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(VISITOR_KEY);
  for (const k of Object.keys(sessionStorage)) {
    if (k.startsWith(ASSIGN_SEEN_PREFIX)) sessionStorage.removeItem(k);
  }
}
