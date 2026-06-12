import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";

/* <!-- WIX PAGE: /blog/famous-bachata-dancers -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/

const PUBLISHED = "2026-06-12";

const dancers = [
  {
    name: "Daniel y Desirée",
    style: "Bachata Sensual",
    bio: "Daniel Sánchez and Desirée Guidonet are the most influential Bachata Sensual couple in the world. Based in Spain, they have shaped the sensual style with their iconic body waves, musicality, and choreography. Almost every modern Sensual dancer has learned from their YouTube videos.",
    watch: "Search 'Daniel y Desirée Bachatea' on YouTube for over 100M views of their workshop demos.",
  },
  {
    name: "Korke y Judith",
    style: "Bachata Sensual (creators)",
    bio: "Korke Escalona and Judith Cordero invented Bachata Sensual in Cádiz, Spain in 2005. They blended traditional Bachata with body movement, isolations, and contemporary dance — birthing the style that now dominates European festivals.",
    watch: "Their early Bachata Sensual tutorials are the foundation of the modern style.",
  },
  {
    name: "Ataca y La Alemana",
    style: "Bachata Moderna / Urban",
    bio: "Jorge 'Ataca' Burgos and Tanja 'La Alemana' Kensinger were the first Bachata couple to go viral on YouTube in the 2000s. Based in New York, they pioneered Urban Bachata — a New York-style that fused Dominican footwork with hip-hop influence.",
    watch: "Their early 2009 Aventura demos are still mandatory viewing for any Bachata student.",
  },
  {
    name: "Romeo Santos",
    style: "Bachata Music (and dance icon)",
    bio: "While primarily a singer — the front of Aventura and a global Bachata superstar — Romeo Santos's influence on the dance is incalculable. Songs like 'Propuesta Indecente' and 'Eres Mía' are danced in every social around the world.",
    watch: "Any Bachata social will play at least three Romeo tracks per night.",
  },
  {
    name: "Carlos Espinosa y Fernanda Lamadrid",
    style: "Bachata Dominicana",
    bio: "Carlos and Fernanda are global ambassadors for traditional Dominican Bachata — keeping authentic footwork, musicality, and culture alive against the dominance of Sensual. Their workshops at Bachata festivals worldwide draw huge crowds.",
    watch: "Search their Dominican Bachata footwork drills for a masterclass in authenticity.",
  },
  {
    name: "Jorjet Alcocer",
    style: "Bachata Ladies Styling",
    bio: "One of the most respected ladies-styling instructors in Bachata, Jorjet Alcocer's classes on body movement, hip technique, and musicality have shaped a generation of female Bachata dancers.",
    watch: "Her ladies styling intensives are a fixture at every major Bachata congress.",
  },
  {
    name: "Marco y Sara",
    style: "Bachata Sensual",
    bio: "Marco Sara is a rising star in Bachata Sensual — known for clean technique, tight musicality, and accessible teaching. Often touring with Daniel y Desirée's school in Spain.",
    watch: "His workshop demos at Bachatea The World Festival are widely studied.",
  },
  {
    name: "Melitta Siomos (UK)",
    style: "Bachata Sensual / Bachata Moderna",
    bio: "London-based Bachata UK Champion and founder of Pura Nights. Melitta has trained directly with Daniel y Desirée, Korke y Judith, and other world leaders. She brings the world's best Bachata to West London every Monday and Tuesday.",
    watch: "Catch Melitta teaching at Pura Nights in Chiswick (Mondays) and Ealing (Tuesdays).",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Famous Bachata Dancers — The 8 Most Influential Bachata Stars",
      description: "From Daniel y Desirée to Romeo Santos — the most influential Bachata dancers and artists shaping the global scene today.",
      image: "https://www.puranights.com/og-default.jpg",
      datePublished: PUBLISHED,
      dateModified: PUBLISHED,
      inLanguage: "en-GB",
      author: { "@type": "Person", name: "Melitta Siomos" },
      publisher: {
        "@type": "Organization",
        name: "Pura Nights",
        logo: { "@type": "ImageObject", url: "https://www.puranights.com/og-default.jpg" },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.puranights.com/blog/famous-bachata-dancers" },
    },
    {
      "@type": "ItemList",
      itemListElement: dancers.map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: d.name,
      })),
    },
  ],
};

const FamousBachataDancers = () => (
  <Layout>
    <SeoHead
      title="Famous Bachata Dancers — 8 Most Influential Stars | Pura Nights"
      description="The most famous Bachata dancers in the world — Daniel y Desirée, Korke y Judith, Ataca y La Alemana, Romeo Santos and more. The icons shaping global Bachata."
      path="/blog/famous-bachata-dancers"
      dateModified={PUBLISHED}
      schema={schema}
    />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading">
            <Link to="/" className="hover:text-primary">Home</Link> /{" "}
            <Link to="/blog" className="hover:text-primary">Blog</Link> /{" "}
            <span className="text-primary">Culture</span>
          </nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Culture</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Famous Bachata Dancers — The 8 Most Influential Bachata Stars
            </h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4">
              <span>By Melitta Siomos</span><span>·</span><span>Jun 2026</span><span>·</span><span>9 min read</span>
            </div>
            <SocialShareButtons title="Famous Bachata Dancers" path="/blog/famous-bachata-dancers" />
          </FadeInUp>
        </div>
      </section>

      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Who are the most famous Bachata dancers in the world? Bachata has exploded from the bars of the Dominican Republic into a global social dance — and a handful of iconic dancers and musicians have driven that growth. Here are the 8 most influential names in Bachata today, the styles they champion, and where to watch them.
            </p>

            {dancers.map((d) => (
              <div key={d.name} className="mb-8">
                <h2 className="font-display text-2xl font-bold mb-2 mt-10">{d.name}</h2>
                <p className="text-sm text-primary font-heading font-semibold mb-3">{d.style}</p>
                <p className="text-muted-foreground leading-relaxed mb-2">{d.bio}</p>
                <p className="text-sm text-muted-foreground/80 italic">Where to watch: {d.watch}</p>
              </div>
            ))}

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Learn from the lineage in London</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              You don't need to fly to Spain or the Dominican Republic to learn world-class Bachata. At <Link to="/pura-nights" className="text-primary hover:underline">Pura Nights</Link>, Melitta Siomos teaches Bachata Sensual, Moderna and Dominicana techniques learned directly from many of the dancers above — every Monday in Chiswick and every Tuesday in Ealing.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/bachata-classes-london" className="btn-cta-primary text-sm">Bachata Classes London</Link>
              <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="text-primary font-heading font-semibold text-sm">Book a Bachata Class →</a>
            </div>

            <AuthorCard />

            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-display text-lg font-bold mb-4">Related Articles</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog/history-of-bachata" className="text-primary hover:underline font-heading">The History of Bachata →</Link></li>
                <li><Link to="/blog/bachata-sensual-guide" className="text-primary hover:underline font-heading">What is Bachata Sensual? →</Link></li>
                <li><Link to="/blog/ladies-styling-bachata" className="text-primary hover:underline font-heading">Ladies Styling in Bachata →</Link></li>
                <li><Link to="/blog/best-latin-dance-festivals-europe-2026" className="text-primary hover:underline font-heading">Best Latin Dance Festivals in Europe 2026 →</Link></li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </section>
    </article>
  </Layout>
);

export default FamousBachataDancers;
