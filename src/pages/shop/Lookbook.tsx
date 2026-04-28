import { useState } from "react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { LOOKBOOK_CATEGORIES, LOOKBOOK_ITEMS, buildImageGallerySchema } from "./lookbookData";

/* <!-- WIX PAGE: /lookbook -->
   <!-- WIX: Use Wix Pro Gallery in Masonry layout. Connect to a Lookbook collection. -->
   <!-- WIX: Each "look" maps to a Pro Gallery item with title + description + tag + category -->
   <!-- WIX: Filter pills below map to Pro Gallery category filter -->
   <!-- WIX: Category cards link to /lookbook/{category-slug} dynamic pages -->
*/

type Venue = "all" | "chiswick" | "ealing" | "latin-friday" | "performance" | "lifestyle";

const venueFilters: { slug: Venue; label: string }[] = [
  { slug: "all", label: "All Looks" },
  { slug: "chiswick", label: "Chiswick · Mondays" },
  { slug: "ealing", label: "Ealing · Tuesdays" },
  { slug: "latin-friday", label: "Latin Friday" },
  { slug: "performance", label: "Performance" },
  { slug: "lifestyle", label: "Lifestyle" },
];

const WHATSAPP_LOOKBOOK = "https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%20saw%20the%20Pura%20Nights%20lookbook%20and%20have%20a%20question";

const Lookbook = () => {
  const [active, setActive] = useState<Venue>("all");
  const visible = active === "all" ? LOOKBOOK_ITEMS : LOOKBOOK_ITEMS.filter(l => l.venueTag === active);

  const lookbookSchema = buildImageGallerySchema(
    "Pura Nights Lookbook",
    "https://www.puranights.com/lookbook",
    LOOKBOOK_ITEMS,
  );

  return (
    <Layout>
      <SeoHead
        title="Pura Nights Lookbook — Salsa & Bachata Dancewear in Action | London"
        description="See Pura Nights dancewear on real dancers across Chiswick Mondays, Ealing Tuesdays and Latin Friday socials in West London. Browse by dancewear, training tops, hoodies, accessories and teamwear."
        path="/lookbook"
        schema={lookbookSchema}
        noindex
      />

      <section className="section-padding section-dark text-center">
        <div className="container-main max-w-3xl">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-4">Pura Nights · Shop</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">Pura Nights Lookbook</h1>
            <p className="text-primary-foreground/60 text-base md:text-lg font-heading max-w-2xl mx-auto">Pura Nights pieces, photographed on real dancers across Chiswick, Ealing, and Latin Friday nights in West London.</p>
          </FadeInUp>
        </div>
      </section>

      {/* Category index — links to dedicated /lookbook/:category pages */}
      {/* <!-- WIX: Replace with Wix Repeater bound to Lookbook Categories CMS collection --> */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-6xl">
          <FadeInUp>
            <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary text-center mb-3">Browse by category</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">Shop the Edit</h2>
          </FadeInUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4" staggerDelay={0.06}>
            {LOOKBOOK_CATEGORIES.map(c => (
              <StaggerItem key={c.slug}>
                <Link
                  to={`/lookbook/${c.slug}`}
                  className="block bg-card rounded-2xl p-5 card-hover h-full border border-border hover:border-primary transition-colors"
                >
                  <h3 className="font-heading font-bold text-sm mb-2">{c.title.split(" — ")[0]}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-3">{c.intro}</p>
                  <span className="text-primary text-xs font-heading font-semibold">View edit →</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Venue filter pills */}
      <section className="bg-ivory pt-12">
        <div className="container-main max-w-6xl">
          <div className="flex flex-wrap justify-center gap-2">
            {venueFilters.map(f => (
              <button
                key={f.slug}
                onClick={() => setActive(f.slug)}
                aria-pressed={active === f.slug}
                className={`px-4 py-2 rounded-full text-xs font-heading font-semibold border transition-colors ${
                  active === f.slug
                    ? "bg-charcoal text-primary-foreground border-charcoal"
                    : "bg-card text-foreground border-border hover:border-primary"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* <!-- WIX: Replace with Wix Pro Gallery (Masonry / Grid layout) bound to filter --> */}
      <section className="section-padding section-ivory">
        <div className="container-main max-w-6xl">
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.06}>
            {visible.map((l, i) => (
              <StaggerItem key={i}>
                <figure className="bg-card rounded-2xl overflow-hidden card-hover h-full border border-border">
                  {/* <!-- WIX: Replace with Wix Pro Gallery image. Alt = title --> */}
                  <div className="relative aspect-[4/5] bg-charcoal overflow-hidden">
                    <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 80% at 50% 0%, hsl(43 48% 54% / 0.2), transparent 60%), linear-gradient(180deg, hsl(0 0% 10%), hsl(0 0% 6%))' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary-foreground/35">Editorial image pending</span>
                    </div>
                    <span className="absolute top-3 left-3 bg-primary/90 text-charcoal text-[9px] font-heading font-bold px-2 py-1 rounded-full">{l.tag}</span>
                  </div>
                  <figcaption className="p-6">
                    <h3 className="font-heading font-bold text-base mb-2">{l.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">{l.desc}</p>
                    <p className="text-[11px] font-accent uppercase tracking-wider text-primary/80 mb-3">{l.caption}</p>
                    <Link to={`/lookbook/${l.category}`} className="text-primary text-xs font-heading font-semibold hover:underline">
                      View {l.category.replace("-", " & ")} edit →
                    </Link>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center mt-14 bg-primary/5 border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="font-display text-xl md:text-2xl font-bold mb-2">Want a piece you saw?</h3>
            <p className="text-muted-foreground text-sm mb-5">Pre-order, sizing, or custom team kit — message Melitta directly.</p>
            <a
              href={WHATSAPP_LOOKBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-charcoal font-heading font-bold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors text-sm"
            >
              <MessageCircle size={18} /> WhatsApp Melitta
            </a>
          </div>

          <div className="text-center mt-10">
            <Link to="/shop" className="text-primary font-heading text-sm font-semibold hover:underline">← Back to Shop</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Lookbook;
