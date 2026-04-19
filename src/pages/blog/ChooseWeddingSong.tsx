import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import BlogPostFooter from "@/components/BlogPostFooter";
/* <!-- WIX PAGE: /blog/choose-wedding-song -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const ChooseWeddingSong = () => (
  <Layout>
    <SeoHead title="How to Choose Your Wedding First Dance Song | Expert Guide | Melitta Siomos" description="Struggling to pick your first dance song? Award-winning dance instructor Melitta Siomos shares her top tips for choosing the perfect wedding song." path="/blog/choose-wedding-first-dance-song" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "How to Choose Your Wedding First Dance Song", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-08-01" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Wedding Dance</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Wedding Dance</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">How to Choose Your Wedding First Dance Song</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Aug 2025</span><span>·</span><span>6 min read</span></div>
            <SocialShareButtons title="How to Choose Your Wedding First Dance Song" path="/blog/choose-wedding-first-dance-song" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">Choosing your first dance song is one of the most personal decisions you'll make for your wedding. It sets the tone for one of the most memorable moments of the day. Here's my advice after choreographing hundreds of wedding dances.</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Start With Your Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">The best first dance songs have personal meaning. Think about songs from your first date, your proposal, your road trips together. A song that makes you both smile will always create a better dance than a "technically perfect" choice.</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Consider the Tempo</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Not all songs are easy to dance to. Very slow ballads can feel long on the dance floor, while very fast songs can be exhausting. Mid-tempo songs (100–120 BPM) tend to work best — they give you enough energy to move confidently without rushing.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">If you've fallen in love with a song that's tricky to dance to, a skilled instructor can work with almost anything. I've choreographed beautiful dances to songs that couples initially thought were "undanceable."</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Length Matters</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">The ideal first dance is 2–3 minutes. Anything longer and your guests' attention may wander. Most songs can be edited to a perfect length — your DJ or instructor can help with this.</p>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Popular Genres That Work Well</h2>
            <ul className="list-disc pl-6 text-muted-foreground text-sm space-y-2 mb-6">
              <li><strong>Classic ballads</strong> — Ed Sheeran, Etta James, Frank Sinatra</li>
              <li><strong>Modern pop</strong> — John Legend, Adele, Calum Scott</li>
              <li><strong>Latin</strong> — Bachata or Salsa for couples who want something unique and fun</li>
              <li><strong>Contemporary</strong> — Hozier, Ben Howard, Billie Eilish</li>
              <li><strong>Surprise mashups</strong> — start slow, switch to an upbeat track halfway through</li>
            </ul>
            <h2 className="font-display text-2xl font-bold mb-4 mt-10">My Top Tip</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">Don't overthink it. Choose the song that makes you both feel something. The choreography and the coaching will take care of the rest. Your guests won't remember whether you danced a perfect waltz — they'll remember the genuine emotion on your faces.</p>
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20we%20need%20help%20choosing%20our%20wedding%20dance%20song" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">💬 Ask Melitta for Song Advice</a>
              <Link to="/wedding-dance" className="text-primary font-heading font-semibold text-sm">Wedding Dance Info →</Link>
            </div>
            <AuthorCard />
          </FadeInUp>
          <BlogPostFooter related={[
            { to: "/blog/wedding-first-dance-tips", title: "10 Tips for the Perfect First Dance", category: "Wedding", readTime: "5 min" },
            { to: "/blog/salsa-vs-waltz-wedding", title: "Salsa vs Waltz for Your Wedding", category: "Wedding", readTime: "5 min" },
            { to: "/blog/how-many-wedding-dance-lessons", title: "How Many Lessons Do We Need?", category: "Wedding", readTime: "5 min" },
          ]} />
        </div>
      </section>
    </article>
  </Layout>
);
export default ChooseWeddingSong;
