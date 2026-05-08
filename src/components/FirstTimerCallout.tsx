import { Link } from "react-router-dom";
import { Sparkles, BookOpen, MessageCircle } from "lucide-react";
import { FadeInUp } from "@/components/animations";

interface FirstTimerCalloutProps {
  variant?: "light" | "dark";
}

/* <!-- WIX SECTION: First-Timer Callout — reusable reassurance strip with 2 CTAs --> */
const FirstTimerCallout = ({ variant = "light" }: FirstTimerCalloutProps) => {
  const isDark = variant === "dark";
  return (
    <section className={`section-padding ${isDark ? "section-dark" : "section-warm"}`}>
      <div className="container-main max-w-4xl">
        <FadeInUp>
          <div
            className={`rounded-2xl p-7 md:p-10 border text-center ${
              isDark
                ? "bg-charcoal-light border-primary/20"
                : "bg-card border-border"
            }`}
            style={{ boxShadow: "var(--shadow-elegant, 0 10px 30px -15px hsl(0 0% 0% / 0.15))" }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <Sparkles size={20} className="text-primary" />
            </div>
            <p className={`font-accent text-[10px] tracking-[0.3em] uppercase mb-3 text-primary`}>
              For First-Timers
            </p>
            <h3 className={`font-display text-2xl md:text-3xl font-bold mb-3 ${isDark ? "text-primary-foreground" : "text-foreground"}`}>
              First time at Pura Nights?
            </h3>
            <p className={`text-sm md:text-base font-heading max-w-2xl mx-auto mb-6 ${isDark ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
              Most people arrive nervous and leave smiling. You do not need a partner, experience,
              or special shoes to begin — just turn up and we'll take care of the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/start-here" className="btn-cta-primary text-sm inline-flex items-center justify-center gap-2">
                <BookOpen size={15} /> Read the First-Timer Guide
              </Link>
              <a
                href="https://wa.me/447449482343"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm inline-flex items-center justify-center gap-2 ${isDark ? "btn-cta-ghost" : "btn-cta-dark"}`}
              >
                <MessageCircle size={15} /> Ask a Question on WhatsApp
              </a>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

export default FirstTimerCallout;
