import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Article {
  to: string;
  title: string;
  category?: string;
  readTime?: string;
}

/* <!-- WIX: Replace with Wix Repeater connected to Blog collection, filtered by tag/category --> */
const RelatedArticles = ({ articles, title = "Related Articles" }: { articles: Article[]; title?: string }) => (
  <section className="not-prose my-12 border-t border-border pt-10">
    <h2 className="font-display text-xl md:text-2xl font-bold mb-5">{title}</h2>
    <div className="grid md:grid-cols-3 gap-4">
      {articles.slice(0, 3).map(a => (
        <Link
          key={a.to}
          to={a.to}
          className="group bg-card rounded-xl p-5 border border-border hover:border-primary transition-colors"
        >
          {a.category && (
            <p className="font-accent text-[9px] tracking-[0.2em] uppercase text-primary mb-2">{a.category}</p>
          )}
          <h3 className="font-heading font-bold text-sm leading-snug mb-2 group-hover:text-primary transition-colors">{a.title}</h3>
          <span className="inline-flex items-center gap-1 text-xs font-heading text-primary">
            {a.readTime && <span className="text-muted-foreground">{a.readTime} · </span>}Read more <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      ))}
    </div>
  </section>
);

export default RelatedArticles;
