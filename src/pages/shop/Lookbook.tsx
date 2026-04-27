import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { Link } from "react-router-dom";

/* <!-- WIX PAGE: /lookbook -->
   <!-- WIX: Use Wix Pro Gallery in Masonry layout. Connect to a Lookbook collection. -->
*/

const looks = [
  { title: "The Monday Look", desc: "Champagne crop top + high-waist leggings. For Chiswick beginners-to-improvers.", tag: "Chiswick · Monday" },
  { title: "The Bachata Look", desc: "Wrap top + flow skirt. Designed for body movement and styling drills.", tag: "Sensual · Tuesday" },
  { title: "The Latin Friday Look", desc: "Cream hoodie + branded tee. Pre-party warm-up to dancefloor confidence.", tag: "Drayton Court · Monthly" },
  { title: "Founders Edit", desc: "Limited-run pieces designed by Melitta — only at launch events.", tag: "Limited" },
  { title: "Pura Ladies Performance", desc: "Stage-ready teamwear (members only). Custom fit and finish.", tag: "Members" },
  { title: "Off-Duty Lifestyle", desc: "Tote, water bottle, and 'Dance Like You Mean It' tee.", tag: "Everyday" },
];

const Lookbook = () => (
  <Layout>
    <SeoHead
      title="Lookbook — Pura Nights Dancewear in Action"
      description="See the Pura Nights collection on real dancers — Chiswick Mondays, Ealing Tuesdays, and Latin Friday socials."
      path="/lookbook"
      noindex
    />

    <section className="section-padding section-dark text-center">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-4">Pura Nights · Shop</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">Lookbook</h1>
          <p className="text-primary-foreground/60 text-base md:text-lg font-heading max-w-2xl mx-auto">Pura Nights pieces, photographed on real dancers across Chiswick, Ealing, and Latin Friday nights.</p>
        </FadeInUp>
      </div>
    </section>

    {/* <!-- WIX: Replace with Wix Pro Gallery (Masonry / Grid layout) --> */}
    <section className="section-padding section-ivory">
      <div className="container-main max-w-6xl">
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {looks.map((l, i) => (
            <StaggerItem key={i}>
              <div className="bg-card rounded-2xl overflow-hidden card-hover h-full border border-border">
                {/* Editorial placeholder — replace with real photoshoot images */}
                <div className="relative aspect-[4/5] bg-charcoal overflow-hidden">
                  <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 80% at 50% 0%, hsl(43 48% 54% / 0.2), transparent 60%), linear-gradient(180deg, hsl(0 0% 10%), hsl(0 0% 6%))' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary-foreground/35">Editorial image pending</span>
                  </div>
                  <span className="absolute top-3 left-3 bg-primary/90 text-charcoal text-[9px] font-heading font-bold px-2 py-1 rounded-full">{l.tag}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-base mb-2">{l.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{l.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <div className="text-center mt-12">
          <Link to="/shop" className="text-primary font-heading text-sm font-semibold hover:underline">← Back to Shop</Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Lookbook;
