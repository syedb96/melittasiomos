import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";

/* <!-- WIX SECTION: Review Velocity Ticker — In Wix, replicate as a Strip
     containing a Wix Repeater bound to "Testimonials" filtered to the last
     30 days. Use Wix Velo timer to rotate visible item every 4 seconds. -->
*/

export interface VelocitySnippet {
  name: string;
  excerpt: string;
  source: "Google" | "Student";
}

interface Props {
  recentCount?: number;     // e.g. 14
  windowLabel?: string;     // e.g. "last 30 days"
  ratingAvg?: number;       // e.g. 5.0
  snippets: VelocitySnippet[];
  intervalMs?: number;
}

const ReviewVelocityTicker = ({
  recentCount = 14,
  windowLabel = "last 30 days",
  ratingAvg = 5.0,
  snippets,
  intervalMs = 4500,
}: Props) => {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (snippets.length <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % snippets.length), intervalMs);
    return () => clearInterval(t);
  }, [snippets.length, intervalMs]);

  const current = snippets[i];

  return (
    <section
      className="bg-charcoal text-primary-foreground py-6"
      aria-label="Recent reviews ticker"
    >
      <div className="container-main max-w-5xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          {/* Velocity badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="rounded-full bg-primary/15 p-2">
              <TrendingUp size={18} className="text-primary" />
            </div>
            <div>
              <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary-foreground/60">
                Review Velocity
              </p>
              <p className="font-display text-lg font-bold leading-tight">
                {recentCount} new reviews · {windowLabel}
              </p>
              <div className="flex items-center gap-1 mt-0.5" aria-label={`${ratingAvg} out of 5`}>
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={12} className="fill-primary text-primary" />
                ))}
                <span className="text-[11px] font-heading text-primary-foreground/70 ml-1">
                  {ratingAvg.toFixed(1)} avg
                </span>
              </div>
            </div>
          </div>

          {/* Rotating snippet */}
          <div className="flex-1 min-h-[64px] relative w-full">
            <AnimatePresence mode="wait">
              {current && (
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="text-sm md:text-base font-heading italic text-primary-foreground/90 leading-snug"
                >
                  "{current.excerpt}"
                  <footer className="not-italic mt-1 text-[11px] tracking-wide text-primary-foreground/60">
                    — {current.name} · {current.source}
                  </footer>
                </motion.blockquote>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewVelocityTicker;
