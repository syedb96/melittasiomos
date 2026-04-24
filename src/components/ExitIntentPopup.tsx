import { useState, useEffect, useCallback, forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

const ExitIntentPopup = forwardRef<HTMLDivElement>((_, ref) => {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();

  const excluded = ["/privacy-policy", "/terms", "/cookie-policy"];
  const isExcluded = excluded.some(p => pathname.startsWith(p));
  const isWedding = pathname.includes("wedding");

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !sessionStorage.getItem("exitShown")) {
      sessionStorage.setItem("exitShown", "1");
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (isExcluded || sessionStorage.getItem("exitShown")) return;
    // Avoid stacking with the cookie banner — wait until consent is resolved.
    if (!localStorage.getItem("cookie-consent")) return;

    document.addEventListener("mouseleave", handleMouseLeave);

    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("exitShown")) {
        sessionStorage.setItem("exitShown", "1");
        setShow(true);
      }
    }, 45000);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, [isExcluded, handleMouseLeave]);

  if (!show) return null;

  return (
    <div ref={ref} className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setShow(false)}>
      <div className="absolute inset-0 bg-foreground/85" />
      <div className="relative bg-background rounded-2xl max-w-md w-full p-8 border-t-4 border-primary shadow-elevated" onClick={e => e.stopPropagation()}>
        <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" aria-label="Close">
          <X size={20} />
        </button>
        {isWedding ? (
          <>
            <h3 className="font-display text-2xl font-bold mb-2">Planning Your First Dance?</h3>
            <p className="text-muted-foreground text-sm mb-5">Melitta Siomos has helped dozens of couples create unforgettable wedding first dances. Book a free 15-minute consultation.</p>
            <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20love%20to%20enquire%20about%20Wedding%20Dance%20coaching" className="btn-cta-primary w-full text-center block mb-3">Book Free Consultation</a>
          </>
        ) : (
          <>
            <h3 className="font-display text-2xl font-bold mb-2">Wait — Don't Leave Without This</h3>
            <p className="text-peach font-heading text-sm font-semibold mb-1">First class offer for new students</p>
            <p className="text-muted-foreground text-sm mb-5">Join your first Pura Nights class and see why we're rated 5 stars. Drop-in from £10. No booking, no partner needed. Just turn up.</p>
            <Link to="/pura-nights" onClick={() => setShow(false)} className="btn-cta-primary w-full text-center block mb-3">See Class Schedule</Link>
            <a href="https://wa.me/447449482343" className="text-primary text-sm font-heading text-center block hover:underline">Or WhatsApp Melitta directly</a>
          </>
        )}
        <p className="text-xs text-muted-foreground text-center mt-4">✅ No spam. ✅ No commitment. Just dancing.</p>
      </div>
    </div>
  );
});

ExitIntentPopup.displayName = "ExitIntentPopup";

export default ExitIntentPopup;
