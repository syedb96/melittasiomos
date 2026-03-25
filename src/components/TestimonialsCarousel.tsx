import { useState, useEffect, useCallback } from "react";
import { Star } from "lucide-react";
import testimonials, { type Testimonial } from "@/data/testimonials";
import { FadeInUp } from "./animations";

const TestimonialCard = ({ t }: { t: Testimonial }) => {
  const [expanded, setExpanded] = useState(false);
  const initials = t.name.split(" ").map(w => w[0]).join("").slice(0, 2);

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card flex flex-col min-w-[320px] max-w-[400px] shrink-0">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-sm">
          {initials}
        </div>
        <div>
          <p className="font-heading font-semibold text-sm">{t.name}</p>
          <p className="text-muted-foreground text-xs">{t.label}</p>
        </div>
        {t.platform === "google" && (
          <span className="ml-auto text-xs bg-secondary px-2 py-0.5 rounded font-heading">Google ⭐</span>
        )}
      </div>
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-primary text-primary" />)}
      </div>
      <p className={`text-sm leading-relaxed text-muted-foreground ${!expanded ? "line-clamp-3" : ""}`}>
        "{t.quote}"
      </p>
      {t.quote.length > 150 && (
        <button onClick={() => setExpanded(!expanded)} className="text-primary text-xs font-heading font-semibold mt-2 self-start hover:underline">
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
};

const TestimonialsCarousel = ({ title = "What Our Students Say" }: { title?: string }) => {
  const [paused, setPaused] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setOffset(prev => prev + 1), 40);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="section-padding section-warm overflow-hidden">
      <FadeInUp>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-2">{title}</h2>
        <div className="h-1 w-16 bg-primary mx-auto rounded-full mb-10" />
      </FadeInUp>
      <div
        className="flex gap-6 cursor-grab"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ transform: `translateX(-${offset % (testimonials.length * 420)}px)`, transition: "transform 0.04s linear" }}
      >
        {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
