import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/salsa-bachata-etiquette-guide -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header --> 
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card -->
   <!-- WIX SECTION: Related Posts --> */
const SalsaBachataEtiquetteGuide = () => (
  <Layout>
    <SeoHead
      title={`Salsa & Bachata Floor Etiquette — 12 Unwritten Rules Every Dancer Should Know | Pura Nights`}
      description={`From asking for a dance to declining politely — the unwritten etiquette of London's salsa and bachata socials, explained clearly so you walk in confident.`}
      path="/blog/salsa-bachata-etiquette-guide"
      schema={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `Salsa & Bachata Floor Etiquette — 12 Unwritten Rules Every Dancer Should Know`,
          description: `From asking for a dance to declining politely — the unwritten etiquette of London's salsa and bachata socials, explained clearly so you walk in confident.`,
          author: { "@type": "Person", name: "Melitta Siomos" },
          publisher: { "@type": "Organization", name: "Pura Nights", logo: { "@type": "ImageObject", url: "https://www.puranights.com/og-image.jpg" } },
          datePublished: "2026-05-15",
          dateModified: "2026-05-15",
          mainEntityOfPage: "https://www.puranights.com/blog/salsa-bachata-etiquette-guide",
          inLanguage: "en-GB",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [{"@type": "Question", "name": "Is it rude to say no to a dance?", "acceptedAnswer": {"@type": "Answer", "text": "No. A polite 'not this one, thank you' is always acceptable and never requires explanation."}}, {"@type": "Question", "name": "What if I don't know my partner's level?", "acceptedAnswer": {"@type": "Answer", "text": "Lead the basic step for 30 seconds. Their response tells you everything. Adjust upward only when invited."}}, {"@type": "Question", "name": "How do I stop a dance if it feels wrong?", "acceptedAnswer": {"@type": "Answer", "text": "Step back, lower your hands, say 'thank you' clearly. Walk to a friend or the bar. Tell the host or door staff if it crossed a line."}}],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.puranights.com/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.puranights.com/blog" },
            { "@type": "ListItem", position: 3, name: `Salsa & Bachata Floor Etiquette — 12 Unwritten Rules Every Dancer Should Know`, item: "https://www.puranights.com/blog/salsa-bachata-etiquette-guide" },
          ],
        },
      ]}
    />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading">
            <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Technique</span>
          </nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Technique</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Salsa & Bachata Floor Etiquette — 12 Unwritten Rules Every Dancer Should Know</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4">
              <span>By Melitta Siomos</span><span>·</span><span>May 2026</span><span>·</span><span>9 min read</span>
            </div>
            <SocialShareButtons title={`Salsa & Bachata Floor Etiquette — 12 Unwritten Rules Every Dancer Should Know`} path="/blog/salsa-bachata-etiquette-guide" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">Latin social dancing has a code. Nobody hands you a rulebook on the way in, but breaking the rules is the fastest way to get a quiet reputation. The good news is the etiquette is mostly common sense dressed up in dance vocabulary. Here are the 12 unwritten rules that govern every salsa and bachata social in London — learn them once, dance well forever.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">1. How to Ask for a Dance</h2>
            <p className="text-muted-foreground mb-4">Eye contact, smile, hand offered, name optional. 'Would you like to dance?' is enough. Never grab a wrist. Never assume. A no is a complete sentence and never personal.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">2. How to Decline Without Drama</h2>
            <p className="text-muted-foreground mb-4">'Not this one, thank you' or 'I'm sitting this one out' is enough. You don't owe a reason. The asker should smile, nod, move on. Both sides keep their dignity.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">3. Hygiene Is Non-Negotiable</h2>
            <p className="text-muted-foreground mb-4">Fresh shirt, deodorant, mints, small towel. If you sweat heavily, bring a spare top and change halfway through the night. Your dance partners will silently bless you.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">4. Lead What They Can Follow</h2>
            <p className="text-muted-foreground mb-4">If your partner is a clear beginner, lead basic steps with clean signals. The flashiest lead is the one who makes the follow look great, not the one who shows off footwork.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">5. Follows Have a Voice</h2>
            <p className="text-muted-foreground mb-4">Following isn't passive. If a move hurts, stop. If a lead is rough, end the dance politely. Your safety always overrides social pressure.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">6. The Floor Has Lanes</h2>
            <p className="text-muted-foreground mb-4">On busy nights, dance in your slot. Don't travel across the floor or steal space. Spatial awareness is a skill — the best dancers can salsa in a phone box.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">7. Finish the Song You Start</h2>
            <p className="text-muted-foreground mb-4">Unless something is wrong, dance the full track. Walking off mid-song is the etiquette equivalent of leaving a dinner party between courses.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">8. Say Thank You and Mean It</h2>
            <p className="text-muted-foreground mb-4">Eye contact, smile, 'thank you'. That's the close of every dance. It's a small ritual that keeps the floor warm.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">9. Phones Off the Floor</h2>
            <p className="text-muted-foreground mb-4">Recording without permission is rude. Filming a stranger's dance is worse. Ask, or put the phone away.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">10. Don't Coach in Socials</h2>
            <p className="text-muted-foreground mb-4">A social is not a class. Even if you saw something, don't teach. The exception: your partner explicitly asks.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">11. Drink, But Stay In Control</h2>
            <p className="text-muted-foreground mb-4">A glass of wine helps. Three doesn't. Sloppy leads and unfocused follows ruin everyone else's night.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">12. Look After New People</h2>
            <p className="text-muted-foreground mb-4">If you see someone standing alone at the edge for two songs, ask them to dance. The scene is built on this single act of generosity.</p>

            <BlogCTA variant="classes" />

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">Is it rude to say no to a dance?</h3><p className="text-muted-foreground text-sm">No. A polite 'not this one, thank you' is always acceptable and never requires explanation.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">What if I don't know my partner's level?</h3><p className="text-muted-foreground text-sm">Lead the basic step for 30 seconds. Their response tells you everything. Adjust upward only when invited.</p></div>
              <div className="bg-card rounded-xl p-5"><h3 className="font-heading font-bold text-sm mb-2">How do I stop a dance if it feels wrong?</h3><p className="text-muted-foreground text-sm">Step back, lower your hands, say 'thank you' clearly. Walk to a friend or the bar. Tell the host or door staff if it crossed a line.</p></div>
            </div>

            <SocialShareButtons title={`Salsa & Bachata Floor Etiquette — 12 Unwritten Rules Every Dancer Should Know`} path="/blog/salsa-bachata-etiquette-guide" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[{ to: "/blog/improve-social-dancing", label: "Improve Your Social Dancing" }, { to: "/blog/lead-follow-salsa-bachata", label: "Lead and Follow Basics" }, { to: "/pura-nights", label: "Find a Class & Social" }]} />
  </Layout>
);

export default SalsaBachataEtiquetteGuide;
