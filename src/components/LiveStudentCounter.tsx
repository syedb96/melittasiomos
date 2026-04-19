import { useEffect, useRef, useState } from "react";
import { Users } from "lucide-react";

/* <!-- WIX: Replicate with Wix Counter widget set to 500, animated on viewport entry --> */
const LiveStudentCounter = ({ target = 500, label = "dancers in West London" }: { target?: number; label?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          setCount(Math.floor(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(node);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2">
      <Users size={14} className="text-primary" />
      <span className="font-heading text-xs font-semibold text-primary-foreground">
        Join <span className="text-primary font-bold tabular-nums">{count}+</span> {label}
      </span>
    </div>
  );
};

export default LiveStudentCounter;
