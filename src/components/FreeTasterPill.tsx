import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const ALLOWED = ["/", "/pura-nights", "/prices", "/about", "/faq", "/start-here", "/your-first-class"];

const FreeTasterPill = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(false);
    setVisible(false);
    if (!ALLOWED.includes(pathname)) return;
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (!ALLOWED.includes(pathname) || dismissed || !visible) return null;

  return (
    <div className="fixed bottom-20 right-4 z-40 md:hidden flex items-center gap-1">
      <Link
        to="/free-taster"
        onClick={() => trackEvent("cta", "free_taster_pill_click", pathname)}
        className="bg-primary text-charcoal font-heading font-semibold text-sm rounded-full px-5 py-2.5 shadow-lg"
      >
        Free class →
      </Link>
      <button onClick={() => setDismissed(true)} aria-label="Dismiss" className="bg-charcoal text-primary-foreground rounded-full p-1.5 shadow-lg">
        <X size={12} />
      </button>
    </div>
  );
};

export default FreeTasterPill;
