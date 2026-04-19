import { useEffect, useRef, useState } from "react";

const stats = [
  { numeric: 5.0, suffix: "", prefix: "⭐ ", label: "Google Rating", decimals: 1 },
  { numeric: 500, suffix: "+", prefix: "🎓 ", label: "Students Taught" },
  { numeric: 1, suffix: "", prefix: "🏆 ", label: "Bachata UK Champion", staticText: "UK" },
  { numeric: 7, suffix: "", prefix: "💃 ", label: "Pura Ladies Teams" },
  { numeric: 15, suffix: "+", prefix: "📅 ", label: "Years Teaching" },
];

const Counter = ({ target, decimals = 0, prefix = "", suffix = "", staticText }: { target: number; decimals?: number; prefix?: string; suffix?: string; staticText?: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !triggered.current) {
          triggered.current = true;
          const start = performance.now();
          const dur = 1400;
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(target * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setVal(target);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [target]);

  const display = staticText ?? val.toFixed(decimals);
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
};

/* <!-- WIX SECTION: Social Proof Bar — 5 columns, dark background, gold numbers, animated counters --> */
const SocialProofBar = () => (
  <section className="bg-charcoal border-y border-primary/15 py-8" aria-label="Trust indicators">
    <div className="container-main">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-6 text-center">
        {stats.map((s, i) => (
          <div key={i} className={`px-4 ${i < stats.length - 1 ? "md:border-r md:border-primary/15" : ""}`}>
            <p className="font-display text-xl md:text-2xl font-bold text-primary mb-1">
              <Counter target={s.numeric} decimals={s.decimals ?? 0} prefix={s.prefix} suffix={s.suffix} staticText={s.staticText} />
            </p>
            <p className="text-[10px] md:text-xs font-accent uppercase tracking-wider text-primary-foreground/60">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProofBar;
