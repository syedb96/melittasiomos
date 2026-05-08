import { Link } from "react-router-dom";
import { UserPlus, CalendarDays, MessageCircle, Heart, Sparkles, Users } from "lucide-react";
import { FadeInUp } from "@/components/animations";

/* <!-- WIX SECTION: New Here Conversion Strip — ivory background, 3 reassurance badges, 3 CTAs --> */
const NewHereStrip = () => (
  <section className="section-padding section-ivory border-b border-border">
    <div className="container-main max-w-5xl text-center">
      <FadeInUp>
        <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-3">First Time Here?</p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          New to Salsa or Bachata? Start Here.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg font-heading max-w-2xl mx-auto mb-8">
          No partner needed. No experience needed. Beginners are welcome every week at Pura Nights.
        </p>
      </FadeInUp>

      <FadeInUp delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-10">
          {[
            { icon: Heart, label: "Come alone" },
            { icon: Sparkles, label: "Start from zero" },
            { icon: Users, label: "Friendly weekly community" },
          ].map((b, i) => (
            <div key={i} className="flex items-center justify-center gap-2 bg-card border border-border rounded-full px-4 py-2.5">
              <b.icon size={14} className="text-primary" />
              <span className="text-xs font-heading font-semibold text-foreground">{b.label}</span>
            </div>
          ))}
        </div>
      </FadeInUp>

      <FadeInUp delay={0.2}>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/start-here" className="btn-cta-primary text-sm inline-flex items-center justify-center gap-2">
            <UserPlus size={16} /> I'm a Complete Beginner
          </Link>
          <Link to="/schedule" className="btn-cta-dark text-sm inline-flex items-center justify-center gap-2">
            <CalendarDays size={16} /> See This Week's Classes
          </Link>
          <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="btn-cta-ghost text-sm inline-flex items-center justify-center gap-2">
            <MessageCircle size={16} /> Message Melitta
          </a>
        </div>
      </FadeInUp>
    </div>
  </section>
);

export default NewHereStrip;
