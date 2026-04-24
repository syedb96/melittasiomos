import { useState, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

/**
 * Non-blocking cookie banner.
 * - Slim bottom bar (does NOT overlay the page or stack with sticky CTAs)
 * - Accept / Decline / Preferences (link to /cookie-policy)
 * - Pinned above the mobile sticky CTA so they don't fight for space
 */
const CookieConsent = forwardRef<HTMLDivElement>((_, ref) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const decide = (choice: "accepted" | "declined") => {
    localStorage.setItem("cookie-consent", choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[55] border-t border-border bg-background/95 backdrop-blur-sm shadow-[0_-4px_24px_-12px_hsl(var(--foreground)/0.18)]"
    >
      <div className="container-main py-3">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <p className="text-xs md:text-sm text-foreground/80 flex-1 leading-relaxed">
            We use essential cookies to make this site work and a few analytics cookies to improve it. Read our{" "}
            <Link to="/cookie-policy" className="text-primary hover:underline font-heading font-semibold">
              cookie preferences
            </Link>
            .
          </p>
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={() => decide("declined")}
              className="text-xs font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md"
            >
              Decline
            </button>
            <button
              onClick={() => decide("accepted")}
              className="text-xs font-heading font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-4 py-1.5 rounded-md"
            >
              Accept
            </button>
            <button
              onClick={() => decide("declined")}
              aria-label="Dismiss cookie banner"
              className="text-muted-foreground hover:text-foreground p-1 rounded-md md:ml-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

CookieConsent.displayName = "CookieConsent";

export default CookieConsent;
