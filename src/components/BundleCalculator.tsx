import { useMemo, useState } from "react";
import { Calculator, Sparkles } from "lucide-react";

/* <!-- WIX: Replicate with Wix Velo custom code element OR use Wix Forms with calculation logic --> */
const DROPIN = 10; // £ per class
const BUNDLES: Record<number, number> = { 5: 42, 10: 80, 20: 150 };

const BundleCalculator = () => {
  const [venue, setVenue] = useState<"chiswick" | "ealing" | "both">("both");
  const [classes, setClasses] = useState<number>(5);

  const calc = useMemo(() => {
    const bundlePrice = BUNDLES[classes] ?? classes * DROPIN;
    const dropInTotal = classes * DROPIN;
    const savings = Math.max(0, dropInTotal - bundlePrice);
    const perClass = bundlePrice / classes;
    return { bundlePrice, dropInTotal, savings, perClass };
  }, [classes]);

  return (
    <div className="bg-card border-2 border-primary/30 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto shadow-elevated">
      <div className="flex items-center gap-2 mb-1">
        <Calculator size={18} className="text-primary" />
        <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary">Bundle Calculator</p>
      </div>
      <h3 className="font-display text-xl md:text-2xl font-bold mb-5">Work Out Your Best Price</h3>

      <div className="space-y-5">
        <div>
          <label className="font-heading text-xs font-semibold mb-2 block">Which venue?</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { v: "chiswick", l: "Mon · Chiswick" },
              { v: "ealing", l: "Tue · Ealing" },
              { v: "both", l: "Both" },
            ].map(opt => (
              <button
                key={opt.v}
                onClick={() => setVenue(opt.v as typeof venue)}
                className={`text-xs font-heading font-semibold py-2 rounded-lg border-2 transition-all ${
                  venue === opt.v ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {opt.l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-heading text-xs font-semibold mb-2 block">How many classes?</label>
          <div className="grid grid-cols-3 gap-2">
            {[5, 10, 20].map(n => (
              <button
                key={n}
                onClick={() => setClasses(n)}
                className={`text-sm font-heading font-bold py-3 rounded-lg border-2 transition-all ${
                  classes === n ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {n} classes
              </button>
            ))}
          </div>
        </div>

        <div className="bg-background rounded-xl p-5 border border-border">
          <div className="grid grid-cols-2 gap-3 text-sm mb-3">
            <div>
              <p className="text-muted-foreground text-xs font-heading">Drop-in price</p>
              <p className="font-display text-xl font-bold line-through text-muted-foreground">£{calc.dropInTotal}</p>
            </div>
            <div>
              <p className="text-primary text-xs font-heading font-semibold">Bundle price</p>
              <p className="font-display text-2xl font-bold text-primary">£{calc.bundlePrice}</p>
            </div>
          </div>
          <div className="border-t border-border pt-3 flex items-center justify-between">
            <p className="text-xs font-heading">Per class: <span className="font-bold">£{calc.perClass.toFixed(2)}</span></p>
            {calc.savings > 0 && (
              <p className="inline-flex items-center gap-1 text-xs font-heading font-bold text-primary">
                <Sparkles size={12} /> You save £{calc.savings}
              </p>
            )}
          </div>
        </div>

        <a
          href="https://linktr.ee/pura.nights"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta-primary w-full text-center block text-sm"
        >
          Get Your {classes}-Class Bundle →
        </a>
        <p className="text-[10px] text-muted-foreground text-center font-heading">
          {venue === "both" ? "Bundle valid at both Chiswick & Ealing venues" : `Bundle valid at ${venue === "chiswick" ? "Monday Chiswick" : "Tuesday Ealing"}`}
        </p>
      </div>
    </div>
  );
};

export default BundleCalculator;
