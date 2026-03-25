import { useState, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";

const CookieConsent = forwardRef<HTMLDivElement>((_, ref) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-fade-in-up">
      <div className="container-main">
        <div className="bg-charcoal text-primary-foreground rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-lg max-w-4xl mx-auto">
          <p className="text-sm flex-1">
            We use cookies to improve your experience. By continuing to browse, you agree to our{" "}
            <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>
          <div className="flex gap-3 flex-shrink-0">
            <button onClick={decline} className="text-xs font-heading font-semibold text-primary-foreground/60 hover:text-primary-foreground transition-colors px-4 py-2">
              Decline
            </button>
            <button onClick={accept} className="btn-cta-primary text-xs py-2 px-6">
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

CookieConsent.displayName = "CookieConsent";

export default CookieConsent;
