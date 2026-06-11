import { useState, useEffect, useMemo } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import testimonials, { type Testimonial } from "@/data/testimonials";
import { FadeInUp } from "./animations";

/* <!-- WIX SECTION: Student Stories — Repeater connected to Testimonials CMS.
     Wix replication: bind .review-card to the Testimonials collection,
     keep `Google ⭐` badge only when source = "google". Emit @graph
     (Organization + Review[] + ItemList) via Custom Code on this page. -->
*/

const CATEGORY_LABELS: Record<Testimonial["category"], string> = {
  beginner: "Beginner",
  group: "Social Dancing",
  wedding: "Wedding Dance",
  private: "Private Lessons",
  "pura-ladies": "Pura Ladies",
  online: "Online",
  community: "Community",
};

// Direct-link each testimonial to the matching service page so proof
// routes straight to the correct conversion path.
const CATEGORY_LINKS: Record<Testimonial["category"], string> = {
  beginner: "/start-here",
  group: "/pura-nights",
  wedding: "/wedding-dance",
  private: "/private-lessons",
  "pura-ladies": "/pura-ladies",
  online: "/online-salsa-bachata-coaching",
  community: "/pura-nights",
};

const TestimonialCard = ({ t }: { t: Testimonial }) => {
  const [expanded, setExpanded] = useState(false);
  const initials = t.name.split(" ").map(w => w[0]).join("").slice(0, 2);
  const href = CATEGORY_LINKS[t.category];
  const ariaLabel = `${CATEGORY_LABELS[t.category]} story from ${t.name} — read more about this service`;

  return (
    <div className="review-card bg-card rounded-2xl p-6 shadow-card flex flex-col min-w-[320px] max-w-[400px] shrink-0">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-sm">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="font-heading font-semibold text-sm">{t.name}</p>
          <p className="text-muted-foreground text-xs truncate">{t.label}</p>
        </div>
        <span className="ml-auto text-[10px] bg-secondary px-2 py-0.5 rounded font-heading shrink-0 uppercase tracking-wider">
          {t.platform === "google" ? "Google ⭐" : "Student Story"}
        </span>
      </div>
      <Link
        to={href}
        aria-label={ariaLabel}
        className="font-accent text-[10px] tracking-[0.2em] uppercase text-primary mb-2 hover:underline self-start"
        data-event={`testimonial_category_click_${t.category}`}
      >
        {CATEGORY_LABELS[t.category]} →
      </Link>
      <div className="flex gap-0.5 mb-3" aria-label="5 star rating">
        {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-primary text-primary" />)}
      </div>
      <p className={`text-sm leading-relaxed text-muted-foreground ${!expanded ? "line-clamp-3" : ""}`}>
        "{t.quote}"
      </p>
      <div className="mt-3 flex items-center justify-between gap-3">
        {t.quote.length > 150 ? (
          <button onClick={() => setExpanded(!expanded)} className="text-primary text-xs font-heading font-semibold hover:underline">
            {expanded ? "Show less" : "Read more"}
          </button>
        ) : <span />}
        <Link
          to={href}
          className="text-xs font-heading font-semibold text-primary hover:underline"
          data-event={`testimonial_cta_click_${t.category}`}
        >
          See {CATEGORY_LABELS[t.category]} →
        </Link>
      </div>
    </div>
  );
};

interface Props {
  title?: string;
  eyebrow?: string;
  emitSchema?: boolean;
}

const SCHEMA_ID = "schema-testimonials-carousel";

const TestimonialsCarousel = ({
  title = "Why West London dancers keep coming back",
  eyebrow = "Student Stories",
  emitSchema = true,
}: Props) => {
  const [paused, setPaused] = useState(false);
  const [offset, setOffset] = useState(0);

  // Inject a clean Review/ItemList @graph for AI/Google extraction.
  // Person uses display name only (no surnames invented). itemReviewed is the
  // dance school. Only "google" platform reviews are tagged with publisher.
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: "Pura Nights Student Stories",
        itemListElement: testimonials.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Review",
            reviewBody: t.quote,
            reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            author: { "@type": "Person", name: t.name },
            itemReviewed: {
              "@type": "DanceSchool",
              name: "Pura Nights — Melitta Siomos Dance Academy",
              url: "https://www.puranights.com",
            },
            ...(t.platform === "google"
              ? { publisher: { "@type": "Organization", name: "Google" } }
              : {}),
          },
        })),
      },
    ],
  }), []);

  useEffect(() => {
    if (!emitSchema) return;
    let el = document.getElementById(SCHEMA_ID) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = SCHEMA_ID;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => { el?.remove(); };
  }, [schema, emitSchema]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setOffset(prev => prev + 1), 40);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="section-padding section-warm overflow-hidden">
      <FadeInUp className="text-center mb-8">
        <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-3">{eyebrow}</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">{title}</h2>
        <div className="h-1 w-16 bg-primary mx-auto rounded-full" />
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
      <div className="container-main mt-10 text-center flex flex-wrap gap-3 justify-center">
        <Link to="/testimonials" className="btn-cta-primary text-sm">Read more student stories</Link>
        <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-outline text-sm">Book your first class</a>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
