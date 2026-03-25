import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface RelatedLink {
  to: string;
  label: string;
  desc?: string;
}

interface RelatedPagesProps {
  title?: string;
  links: RelatedLink[];
  variant?: "warm" | "dark" | "card";
}

const RelatedPages = ({ title = "Explore More", links, variant = "warm" }: RelatedPagesProps) => {
  const bgClass = variant === "dark" ? "section-dark" : variant === "card" ? "bg-card" : "section-warm";

  return (
    <section className={`section-padding ${bgClass}`}>
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-2xl font-bold mb-6 text-center">{title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="group bg-card rounded-xl p-5 card-hover flex items-start gap-3 border border-border hover:border-primary transition-colors"
            >
              <ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
              <div>
                <span className="font-heading font-semibold text-sm group-hover:text-primary transition-colors">{link.label}</span>
                {link.desc && <p className="text-muted-foreground text-xs mt-1">{link.desc}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPages;
