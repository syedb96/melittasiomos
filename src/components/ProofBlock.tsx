import { Quote, Star } from "lucide-react";
import { Link } from "react-router-dom";
import testimonials, { type TestimonialCategory } from "@/data/testimonials";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

interface ProofBlockProps {
  /** Categories to surface (in order). Filters from the central testimonials data. */
  categories: TestimonialCategory[];
  /** Optional eyebrow label */
  eyebrow?: string;
  /** Section heading */
  title?: string;
  /** Subhead */
  subtitle?: string;
  /** Max quotes to render (default 3). */
  limit?: number;
  /** Visual variant — light surface or dark surface. */
  variant?: "light" | "dark";
  /** Show the "See all" link at the bottom. */
  showFooter?: boolean;
}

/**
 * Reusable categorized testimonial block.
 * Surface the right proof on the right page (Beginners, Wedding, Private, Pura Ladies, Community, Online).
 */
const ProofBlock = ({
  categories,
  eyebrow = "Real Student Voices",
  title = "What students say",
  subtitle,
  limit = 3,
  variant = "light",
  showFooter = true,
}: ProofBlockProps) => {
  const filtered = testimonials
    .filter((t) => categories.includes(t.category))
    .slice(0, limit);

  if (filtered.length === 0) return null;

  const isDark = variant === "dark";

  return (
    <section className={`section-padding ${isDark ? "section-dark" : "section-warm"}`}>
      <div className="container-main max-w-5xl">
        <FadeInUp>
          <div className="text-center mb-10">
            <p className={`font-accent text-[10px] tracking-[0.3em] uppercase mb-3 ${isDark ? "text-primary" : "text-primary"}`}>
              {eyebrow}
            </p>
            <h2 className={`font-display text-2xl md:text-3xl font-bold mb-2 ${isDark ? "text-primary-foreground" : "text-foreground"}`}>
              {title}
            </h2>
            {subtitle && (
              <p className={`text-sm font-heading ${isDark ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                {subtitle}
              </p>
            )}
          </div>
        </FadeInUp>

        <StaggerContainer className="grid md:grid-cols-3 gap-5" staggerDelay={0.08}>
          {filtered.map((t) => (
            <StaggerItem key={`${t.name}-${t.quote.slice(0, 12)}`}>
              <div
                className={`rounded-2xl p-6 h-full border ${
                  isDark
                    ? "bg-charcoal-light border-primary-foreground/10"
                    : "bg-card border-border"
                }`}
              >
                <Quote size={18} className="text-primary/40 mb-2" />
                <p
                  className={`text-sm leading-relaxed mb-4 italic ${
                    isDark ? "text-primary-foreground/80" : "text-foreground"
                  }`}
                >
                  "{t.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`font-heading font-semibold text-xs ${
                        isDark ? "text-primary-foreground" : "text-foreground"
                      }`}
                    >
                      {t.name}
                    </p>
                    <p
                      className={`text-[11px] font-heading ${
                        isDark ? "text-primary-foreground/50" : "text-muted-foreground"
                      }`}
                    >
                      {t.label}
                    </p>
                  </div>
                  {t.platform === "google" && (
                    <div className="flex items-center gap-0.5 shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className="fill-primary text-primary" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {showFooter && (
          <FadeInUp className="text-center mt-8">
            <Link
              to="/proof-centre"
              className={`text-xs font-heading font-semibold hover:underline ${
                isDark ? "text-primary" : "text-primary"
              }`}
            >
              Read all reviews & proof →
            </Link>
          </FadeInUp>
        )}
      </div>
    </section>
  );
};

export default ProofBlock;
