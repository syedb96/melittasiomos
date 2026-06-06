import { Link } from "react-router-dom";
import AnimatedCounter from "./AnimatedCounter";
import testimonials from "@/data/testimonials";
import { FadeInUp, StaggerContainer, StaggerItem } from "./animations";

const tagFor = (category: string) => {
  switch (category) {
    case "wedding": return "Wedding Dance";
    case "private": return "Private Lessons";
    case "online": return "Online Classes";
    case "pura-ladies": return "Pura Ladies";
    case "beginner": return "Beginners";
    case "community": return "Latin Friday";
    default: return "Weekly Class";
  }
};

const ReviewWall = ({ showHeader = true }: { showHeader?: boolean }) => {
  const featured = testimonials.slice(0, 6);
  return (
    <section className="section-padding bg-charcoal text-primary-foreground">
      <div className="container-main">
        {showHeader && (
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary text-center mb-3">What our students say</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-3 text-primary-foreground">Real people. Real results. Real community.</h2>
            <p className="text-primary-foreground/60 text-center max-w-xl mx-auto mb-10 font-heading">Over 5 years · 500+ students · West London's most welcoming dance community.</p>
          </FadeInUp>
        )}

        {/* Trust counter strip */}
        <FadeInUp delay={0.1}>
          <div className="bg-charcoal-light/50 border border-primary/20 rounded-full px-6 py-6 mb-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { end: 500, suffix: "+", label: "Students taught" },
              { end: 5, suffix: ".0 ★", label: "Google rating" },
              { end: 5, suffix: "+", label: "Years running" },
              { end: 2, suffix: "", label: "Championship medals" },
            ].map((c, i) => (
              <div key={i} className="text-center">
                <AnimatedCounter end={c.end} suffix={c.suffix} className="font-display text-3xl md:text-4xl font-bold text-primary block" />
                <span className="text-primary-foreground/60 text-xs uppercase tracking-wider font-heading">{c.label}</span>
              </div>
            ))}
          </div>
        </FadeInUp>

        {/* Review masonry */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto" staggerDelay={0.06}>
          {featured.map((t, i) => (
            <StaggerItem key={i}>
              <div className="bg-ivory text-charcoal rounded-lg p-6 border border-primary/20 shadow-sm h-full flex flex-col">
                <span className="font-display text-4xl text-primary leading-none mb-2" aria-hidden>"</span>
                <p className="text-sm leading-[1.7] mb-4 flex-1">{t.quote}</p>
                <div>
                  <p className="font-heading font-bold text-sm">{t.name}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="inline-block bg-primary/10 text-primary text-[10px] uppercase tracking-wider font-heading font-semibold px-2 py-0.5 rounded-full">{tagFor(t.category)}</span>
                    <span className="text-primary text-xs">★★★★★</span>
                  </div>
                  <p className="text-muted-foreground text-[10px] mt-1 italic">via {t.platform === "google" ? "Google" : "WhatsApp"}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/testimonials" className="text-primary font-heading font-semibold text-sm hover:opacity-80">See all reviews →</Link>
          <Link to="/leave-a-review" className="text-primary-foreground/70 font-heading text-sm hover:text-primary">Leave yours →</Link>
        </div>
      </div>
    </section>
  );
};

export default ReviewWall;
