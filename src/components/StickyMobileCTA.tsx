import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem("stickyDismissed") === "1");
  const { pathname } = useLocation();

  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (dismissed || !visible) return null;

  const isWedding = pathname.includes("wedding");
  const isBlog = pathname.startsWith("/blog/");

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("stickyDismissed", "1");
  };

  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 md:hidden px-3">
      <div className="bg-primary text-primary-foreground rounded-xl px-4 py-3 flex items-center justify-between shadow-lg gap-2">
        <span className="text-sm font-heading font-semibold truncate">
          {isWedding ? "💑 Wedding dance enquiry" : isBlog ? "💃 Try a class this week" : "🔥 Next class: Monday Chiswick"}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          {isWedding ? (
            <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20love%20to%20enquire%20about%20Wedding%20Dance%20coaching" className="bg-background text-foreground text-xs font-heading font-bold px-3 py-1.5 rounded-lg whitespace-nowrap">WhatsApp →</a>
          ) : (
            <Link to={isBlog ? "/pura-nights" : "/prices"} className="bg-background text-foreground text-xs font-heading font-bold px-3 py-1.5 rounded-lg whitespace-nowrap">
              {isBlog ? "View Classes →" : "Book Now →"}
            </Link>
          )}
          <button onClick={dismiss} className="text-primary-foreground/70 hover:text-primary-foreground" aria-label="Dismiss">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
