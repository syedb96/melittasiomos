import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

interface Props {
  headline: string;
  sub: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  variant?: "gold" | "dark" | "ivory";
}

const variantStyles = {
  gold: { wrap: "bg-primary text-charcoal", sub: "text-charcoal/80", primary: "bg-charcoal text-primary-foreground hover:opacity-90", secondary: "text-charcoal underline hover:no-underline" },
  dark: { wrap: "bg-charcoal text-primary-foreground", sub: "text-primary-foreground/70", primary: "bg-primary text-charcoal hover:opacity-90", secondary: "text-primary underline hover:no-underline" },
  ivory: { wrap: "bg-ivory text-charcoal border-y border-primary/20", sub: "text-muted-foreground", primary: "bg-charcoal text-primary-foreground hover:opacity-90", secondary: "text-primary underline hover:no-underline" },
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

const SmartCTABanner = ({ headline, sub, primaryLabel, primaryHref, secondaryLabel, secondaryHref, variant = "dark" }: Props) => {
  const s = variantStyles[variant];
  const onClick = () => trackEvent("cta", "smart_banner_click", primaryLabel);
  return (
    <section className={`${s.wrap} py-12 md:py-16`}>
      <div className="container-main max-w-4xl text-center">
        <h2 className="font-display text-2xl md:text-4xl font-bold mb-3">{headline}</h2>
        <p className={`${s.sub} font-heading text-sm md:text-base mb-6 max-w-2xl mx-auto`}>{sub}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          {isExternal(primaryHref) ? (
            <a href={primaryHref} target="_blank" rel="noopener noreferrer" onClick={onClick} className={`${s.primary} rounded-full px-7 py-3 font-heading font-semibold text-sm`}>{primaryLabel}</a>
          ) : (
            <Link to={primaryHref} onClick={onClick} className={`${s.primary} rounded-full px-7 py-3 font-heading font-semibold text-sm`}>{primaryLabel}</Link>
          )}
          {isExternal(secondaryHref) ? (
            <a href={secondaryHref} target="_blank" rel="noopener noreferrer" className={`${s.secondary} font-heading text-sm`}>{secondaryLabel}</a>
          ) : (
            <Link to={secondaryHref} className={`${s.secondary} font-heading text-sm`}>{secondaryLabel}</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default SmartCTABanner;
