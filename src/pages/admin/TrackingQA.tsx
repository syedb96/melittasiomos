import { useEffect, useRef, useState } from "react";
import { WA, trackWaClick, waCta } from "@/lib/whatsapp";
import { ALL_EXPERIMENTS } from "@/data/ab-experiments";
import { _resetAbForTests, pickVariant } from "@/lib/ab";

/* <!-- WIX: PROTOTYPE ONLY — Admin-only tracking QA panel for verifying
       WhatsApp + A/B click instrumentation. Do not replicate in Wix. --> */

interface CapturedEvent {
  ts: number;
  source: "gtag" | "dataLayer" | "trackCta";
  name: string;
  payload: Record<string, unknown>;
}

const WA_PRESETS = Object.keys(WA) as (keyof typeof WA)[];

const TrackingQA = () => {
  const [events, setEvents] = useState<CapturedEvent[]>([]);
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const restoreRef = useRef<(() => void) | null>(null);

  // Install in-memory spies on gtag + dataLayer + trackCta so the page
  // shows the exact payload that would be sent in production. Restore
  // originals on unmount.
  useEffect(() => {
    const w = window as unknown as {
      gtag?: (cmd: string, ev: string, params?: Record<string, unknown>) => void;
      dataLayer?: Array<Record<string, unknown>>;
      trackCta?: (name: string, meta?: Record<string, unknown>) => void;
    };

    const origGtag = w.gtag;
    const origDLPush = w.dataLayer?.push?.bind(w.dataLayer);
    const origTrackCta = w.trackCta;

    w.gtag = (cmd: string, ev: string, params?: Record<string, unknown>) => {
      if (cmd === "event") {
        setEvents((prev) => [{ ts: Date.now(), source: "gtag" as const, name: ev, payload: params ?? {} }, ...prev].slice(0, 50));
      }
      origGtag?.(cmd, ev, params);
    };
    if (w.dataLayer) {
      w.dataLayer.push = (...args: Record<string, unknown>[]) => {
        for (const a of args) {
          const name = String(a.event ?? "(unknown)");
          setEvents((prev) => [{ ts: Date.now(), source: "dataLayer" as const, name, payload: a }, ...prev].slice(0, 50));
        }
        return origDLPush ? origDLPush(...args) : args.length;
      };
    } else {
      w.dataLayer = [];
    }
    w.trackCta = (name: string, meta?: Record<string, unknown>) => {
      setEvents((prev) => [{ ts: Date.now(), source: "trackCta" as const, name, payload: meta ?? {} }, ...prev].slice(0, 50));
      origTrackCta?.(name, meta);
    };

    setVisitorId(localStorage.getItem("pn_ab_visitor"));

    restoreRef.current = () => {
      if (origGtag) w.gtag = origGtag; else delete w.gtag;
      if (w.dataLayer && origDLPush) w.dataLayer.push = origDLPush;
      if (origTrackCta) w.trackCta = origTrackCta; else delete w.trackCta;
    };
    return () => restoreRef.current?.();
  }, []);

  const fireWaPreset = (key: keyof typeof WA) => {
    const fn = WA[key] as (...args: unknown[]) => string;
    const href = fn();
    trackWaClick(key, { location: `qa:${key}`, prefill_id: key, href });
  };

  const fireWaCtaHelper = (key: keyof typeof WA) => {
    const { onClick } = waCta(key, `qa:waCta:${key}`);
    onClick();
  };

  return (
    <div className="min-h-screen bg-background section-padding">
      <div className="container-main max-w-6xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Tracking QA</h1>
        <p className="text-sm text-muted-foreground mb-2">
          Verifies every WhatsApp helper click logs <code>whatsapp_&lt;context&gt;_click</code>
          with <code>page_path</code>, <code>location</code>, <code>prefill_id</code>, and meta.
        </p>
        <p className="text-xs text-muted-foreground mb-8">
          A/B visitor ID: <code>{visitorId ?? "(none — assign one by clicking any AB test)"}</code>
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT — WA presets */}
          <section>
            <h2 className="font-display text-xl font-bold mb-4">WhatsApp presets ({WA_PRESETS.length})</h2>
            <div className="rounded-2xl border border-border bg-card divide-y divide-border/60 max-h-[60vh] overflow-auto">
              {WA_PRESETS.map((k) => (
                <div key={k} className="p-3 flex items-center gap-3">
                  <code className="text-xs flex-1 truncate">{k}</code>
                  <button onClick={() => fireWaPreset(k)} className="btn-cta-secondary text-[11px] py-1 px-3">
                    Fire trackWaClick
                  </button>
                  <button onClick={() => fireWaCtaHelper(k)} className="btn-cta-primary text-[11px] py-1 px-3">
                    Fire waCta()
                  </button>
                </div>
              ))}
            </div>

            <h2 className="font-display text-xl font-bold mt-8 mb-4">A/B experiments ({ALL_EXPERIMENTS.length})</h2>
            <div className="rounded-2xl border border-border bg-card divide-y divide-border/60">
              {ALL_EXPERIMENTS.map((exp) => {
                const v = visitorId ? pickVariant(exp, JSON.parse(visitorId).id) : null;
                return (
                  <div key={exp.key} className="p-3">
                    <p className="font-heading font-semibold text-sm">{exp.key}</p>
                    <p className="text-[11px] text-muted-foreground mb-1">{exp.description}</p>
                    <p className="text-[11px]">Assigned: <code>{v?.id ?? "—"}</code> ({v?.label ?? "?"})</p>
                  </div>
                );
              })}
              <div className="p-3 flex gap-2">
                <button
                  onClick={() => {
                    _resetAbForTests();
                    setVisitorId(null);
                    setEvents([]);
                  }}
                  className="btn-cta-secondary text-[11px] py-1 px-3"
                >
                  Reset visitor + clear log
                </button>
              </div>
            </div>
          </section>

          {/* RIGHT — captured events */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold">Captured events ({events.length})</h2>
              <button onClick={() => setEvents([])} className="text-xs text-muted-foreground hover:underline">
                clear
              </button>
            </div>
            <div className="rounded-2xl border border-border bg-card max-h-[80vh] overflow-auto divide-y divide-border/60">
              {events.length === 0 && (
                <p className="p-4 text-sm text-muted-foreground">No events yet. Click any button on the left.</p>
              )}
              {events.map((e, i) => {
                const expected = e.name.startsWith("whatsapp_") && e.name.endsWith("_click");
                const hasRequired =
                  "page_path" in e.payload &&
                  "cta_context" in e.payload;
                const ok = !e.name.startsWith("whatsapp_") || (expected && hasRequired);
                return (
                  <div key={i} className={`p-3 text-xs ${ok ? "" : "bg-destructive/5"}`}>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <code className="font-heading font-semibold">{e.name}</code>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{e.source}</span>
                    </div>
                    <pre className="text-[10px] text-muted-foreground whitespace-pre-wrap break-all">{JSON.stringify(e.payload, null, 2)}</pre>
                    {!ok && (
                      <p className="text-[10px] text-destructive mt-1">
                        ⚠️ Missing page_path or cta_context, or wrong event name format.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TrackingQA;
