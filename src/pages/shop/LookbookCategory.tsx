import { useParams, Link, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { MessageCircle } from "lucide-react";
import {
import { waCustom } from "@/lib/whatsapp";
  LOOKBOOK_CATEGORIES,
  findCategory,
  itemsByCategory,
  buildImageGallerySchema,
  LookbookCategorySlug,
} from "./lookbookData";

/* <!-- WIX PAGE: /lookbook/{category} (dynamic) -->
   <!-- WIX: Connect to Lookbook CMS collection filtered by Category reference field. -->
   <!-- WIX: Use a Dynamic Page with URL pattern /lookbook/{category-slug} -->
*/

const WHATSAPP = (cat: string) =>
  waCustom(`Hi Melitta, I'm interested in the Pura Nights ${cat} edit`, "LookbookCategory:1").href;

const LookbookCategory = () => {
  const { category } = useParams<{ category: string }>();
  const cat = category ? findCategory(category) : undefined;

  if (!cat) return <Navigate to="/lookbook" replace />;

  const items = itemsByCategory(cat.slug as LookbookCategorySlug);
  const pageUrl = `https://www.puranights.com/lookbook/${cat.slug}`;
  const schema = buildImageGallerySchema(cat.title, pageUrl, items);

  return (
    <Layout>
      <SeoHead
        title={cat.metaTitle}
        description={cat.metaDescription}
        path={`/lookbook/${cat.slug}`}
        schema={schema}
        noindex
      />

      <section className="section-padding section-dark text-center">
        <div className="container-main max-w-3xl">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-4">
              <Link to="/lookbook" className="hover:text-primary-foreground/80 transition-colors">Lookbook</Link>
              <span className="mx-2 opacity-50">/</span>
              {cat.slug}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">{cat.title}</h1>
            <p className="text-primary-foreground/60 text-base md:text-lg font-heading max-w-2xl mx-auto">{cat.intro}</p>
          </FadeInUp>
        </div>
      </section>

      <section className="section-padding section-ivory">
        <div className="container-main max-w-6xl">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No looks in this edit yet — check back soon.</p>
              <Link to="/lookbook" className="text-primary font-heading text-sm font-semibold hover:underline">← Back to Lookbook</Link>
            </div>
          ) : (
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.06}>
              {items.map((l, i) => (
                <StaggerItem key={i}>
                  <figure className="bg-card rounded-2xl overflow-hidden card-hover h-full border border-border">
                    <div className="relative aspect-[4/5] bg-charcoal overflow-hidden">
                      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 80% at 50% 0%, hsl(43 48% 54% / 0.2), transparent 60%), linear-gradient(180deg, hsl(0 0% 10%), hsl(0 0% 6%))' }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary-foreground/35">Editorial image pending</span>
                      </div>
                      <span className="absolute top-3 left-3 bg-primary/90 text-charcoal text-[9px] font-heading font-bold px-2 py-1 rounded-full">{l.tag}</span>
                    </div>
                    <figcaption className="p-6">
                      <h2 className="font-heading font-bold text-base mb-2">{l.title}</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-2">{l.desc}</p>
                      <p className="text-[11px] font-accent uppercase tracking-wider text-primary/80">{l.caption}</p>
                    </figcaption>
                  </figure>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          {/* WhatsApp CTA */}
          <div className="text-center mt-14 bg-primary/5 border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="font-display text-xl md:text-2xl font-bold mb-2">Want this edit?</h3>
            <p className="text-muted-foreground text-sm mb-5">Sizing, restocks, or custom orders — message Melitta directly.</p>
            <a
              href={WHATSAPP(cat.title.split(" — ")[0])}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-charcoal font-heading font-bold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors text-sm"
            >
              <MessageCircle size={18} /> WhatsApp about this edit
            </a>
          </div>

          {/* Cross-links to other categories */}
          <div className="mt-14">
            <p className="text-center text-[11px] font-accent uppercase tracking-[0.3em] text-muted-foreground mb-5">Other edits</p>
            <div className="flex flex-wrap justify-center gap-2">
              {LOOKBOOK_CATEGORIES.filter(c => c.slug !== cat.slug).map(c => (
                <Link
                  key={c.slug}
                  to={`/lookbook/${c.slug}`}
                  className="px-4 py-2 rounded-full text-xs font-heading font-semibold border bg-card border-border hover:border-primary transition-colors"
                >
                  {c.title.split(" — ")[0]}
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/lookbook" className="text-primary font-heading text-sm font-semibold hover:underline">← All Lookbook</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LookbookCategory;
