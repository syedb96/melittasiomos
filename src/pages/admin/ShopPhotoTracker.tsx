import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, X, Camera, Video, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

/* Internal admin tool — tracks which media each SKU is missing before lifting noindex.
   Mirrors the requirements in docs/12-WIX-SHOP-HANDOFF.md §6 (photo replacement tracker).
   State persists to localStorage so multiple admins can tick items off. */

interface Sku {
  slug: string;
  name: string;
  category: string;
}

const SKUS: Sku[] = [
  { slug: "pura-nights-crop-top-champagne", name: "Pura Nights Crop Top — Champagne", category: "Dancewear" },
  { slug: "salsa-practice-tee-charcoal", name: "Salsa Practice Tee — Charcoal", category: "Training Tops" },
  { slug: "bachata-hoodie-cream", name: "Bachata Hoodie — Cream", category: "Hoodies & Layers" },
  { slug: "pura-ladies-warm-up-jacket", name: "Pura Ladies Warm-Up Jacket", category: "Teamwear" },
  { slug: "tote-dance-like-you-mean-it", name: "Tote — 'Dance Like You Mean It'", category: "Accessories" },
  { slug: "stainless-steel-water-bottle", name: "Stainless Steel Water Bottle", category: "Accessories" },
  { slug: "ladies-styling-wrap-top", name: "Ladies Styling Wrap Top", category: "Dancewear" },
  { slug: "founders-tee-limited", name: "Founders Tee — Limited", category: "Training Tops" },
];

interface MediaRequirement {
  key: string;
  label: string;
  spec: string;
  required: boolean;
  icon: typeof Camera;
}

const REQUIREMENTS: MediaRequirement[] = [
  { key: "hero", label: "Hero on model", spec: "4:5 portrait · 1200×1500", required: true, icon: Camera },
  { key: "detail", label: "Detail / fabric", spec: "1:1 · 1200×1200", required: true, icon: Camera },
  { key: "back", label: "Back / side angle", spec: "4:5 · 1200×1500", required: true, icon: Camera },
  { key: "action", label: "In-class action shot", spec: "4:5 · 1200×1500", required: true, icon: Camera },
  { key: "flatlay", label: "Flat lay / hanger", spec: "1:1 · 1200×1200", required: false, icon: Camera },
  { key: "video360", label: "360° clip (best-sellers only)", spec: "10 sec · MP4 ≤2 MB", required: false, icon: Video },
];

const STORAGE_KEY = "puranights:shop-photo-tracker:v1";

type State = Record<string, Record<string, boolean>>; // sku -> req -> uploaded

const loadState = (): State => {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
};

const ShopPhotoTracker = () => {
  const [state, setState] = useState<State>({});

  useEffect(() => { setState(loadState()); }, []);
  useEffect(() => {
    if (Object.keys(state).length === 0) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const toggle = (slug: string, key: string) => {
    setState(prev => ({
      ...prev,
      [slug]: { ...(prev[slug] || {}), [key]: !prev[slug]?.[key] },
    }));
  };

  const requiredKeys = REQUIREMENTS.filter(r => r.required).map(r => r.key);

  const perSku = useMemo(() => SKUS.map(sku => {
    const reqUploaded = requiredKeys.filter(k => state[sku.slug]?.[k]).length;
    const allUploaded = REQUIREMENTS.filter(r => state[sku.slug]?.[r.key]).length;
    return {
      ...sku,
      requiredUploaded: reqUploaded,
      requiredTotal: requiredKeys.length,
      allUploaded,
      allTotal: REQUIREMENTS.length,
      ready: reqUploaded === requiredKeys.length,
    };
  }), [state]);

  const overall = useMemo(() => {
    const total = SKUS.length * requiredKeys.length;
    const done = perSku.reduce((acc, s) => acc + s.requiredUploaded, 0);
    return { total, done, pct: Math.round((done / total) * 100), readyCount: perSku.filter(s => s.ready).length };
  }, [perSku]);

  const allReady = overall.readyCount === SKUS.length;

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Shop Photo Tracker</h1>
          <p className="text-muted-foreground text-sm">Tick each shot as it's uploaded to Wix Stores. When every SKU shows "Launch ready", the <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">noindex</code> flag can be removed from <Link to="/shop" className="text-primary hover:underline">/shop</Link>.</p>
        </div>

        {/* Overall progress */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <CardTitle className="text-lg">Launch readiness</CardTitle>
              <span className={`text-xs font-heading font-semibold px-3 py-1 rounded-full ${allReady ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                {overall.readyCount} / {SKUS.length} SKUs ready
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={overall.pct} className="mb-3" />
            <p className="text-sm text-muted-foreground">{overall.done} of {overall.total} required shots uploaded ({overall.pct}%).</p>
            {allReady && (
              <div className="mt-4 p-4 bg-primary/10 border border-primary/30 rounded-lg text-sm">
                ✅ All required photography is in. Run the launch-day checklist in <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">docs/12-WIX-SHOP-HANDOFF.md §9</code>, then remove <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">noindex</code> from shop pages.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Per-SKU grid */}
        <div className="space-y-4">
          {perSku.map(sku => (
            <Card key={sku.slug} className={sku.ready ? "border-primary/40" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-[10px] font-accent uppercase tracking-[0.25em] text-primary mb-1">{sku.category}</p>
                    <CardTitle className="text-base">{sku.name}</CardTitle>
                    <Link to={`/shop/${sku.slug}`} target="_blank" className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 mt-1">
                      /shop/{sku.slug} <ExternalLink size={11} />
                    </Link>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-heading font-semibold ${sku.ready ? "text-primary" : "text-muted-foreground"}`}>
                      {sku.ready ? "✓ Launch ready" : `${sku.requiredUploaded}/${sku.requiredTotal} required`}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{sku.allUploaded}/{sku.allTotal} total</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {REQUIREMENTS.map(req => {
                    const Icon = req.icon;
                    const done = !!state[sku.slug]?.[req.key];
                    return (
                      <button
                        key={req.key}
                        onClick={() => toggle(sku.slug, req.key)}
                        className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-colors ${
                          done
                            ? "bg-primary/10 border-primary/40"
                            : req.required
                              ? "bg-card border-border hover:border-primary"
                              : "bg-muted/30 border-dashed border-border hover:border-primary"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${done ? "bg-primary border-primary text-primary-foreground" : "border-border bg-background"}`}>
                          {done ? <Check size={12} /> : req.required ? null : <X size={11} className="text-muted-foreground/40" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <Icon size={12} className="text-primary shrink-0" />
                            <p className="font-heading font-semibold text-xs">{req.label}</p>
                            {!req.required && <span className="text-[9px] uppercase tracking-wider text-muted-foreground">opt</span>}
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{req.spec}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-5 bg-muted/40 rounded-lg text-xs text-muted-foreground space-y-1">
          <p><strong className="text-foreground">Brief:</strong> Real Pura Nights dancers · champagne / charcoal / cream palette · natural light preferred · alt text format <code className="bg-secondary px-1 rounded">"{`{Product} — {colour} — worn at {venue}`}"</code>.</p>
          <p><strong className="text-foreground">State persistence:</strong> Stored in browser localStorage (key <code className="bg-secondary px-1 rounded">{STORAGE_KEY}</code>). Wire to Supabase if multi-admin tracking is needed.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ShopPhotoTracker;
