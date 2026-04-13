import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";

/* <!-- WIX PAGE: /blog/salsa-vs-bachata -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const SalsaVsBachata = () => (
  <Layout>
    <SeoHead title="Salsa vs Bachata — Which Should You Learn First? | Pura Nights London" description="Can't decide between Salsa and Bachata? Honest comparison from Melitta Siomos. At Pura Nights, you learn both." path="/blog/salsa-vs-bachata" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Salsa vs Bachata — Which Should You Learn First?", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-03-05" }} />
    <ReadingProgressBar />
    <article className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <nav className="text-sm text-muted-foreground mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> → <Link to="/blog" className="hover:text-primary">Blog</Link> → <span className="text-foreground">Beginners</span></nav>
          <span className="inline-block bg-primary/10 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Beginners</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4">Salsa vs Bachata — Which Should You Learn First?</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-heading mb-8"><span>By Melitta Siomos</span><span>·</span><span>Mar 2025</span><span>·</span><span>5 min read</span></div>
          <SocialShareButtons title="Salsa vs Bachata" path="/blog/salsa-vs-bachata" />
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <div className="prose prose-lg max-w-none mt-10 font-body text-foreground [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:mb-5 [&_p]:leading-relaxed">
            <p>This is the most common question we hear from new students at Pura Nights. You've watched people dance and you want to try — but should you start with Salsa or Bachata? The honest answer: both. Here's why.</p>
            <h2>How the Music Feels Different</h2>
            <p>Salsa music is energetic, complex, and brass-driven at 150–200 BPM. Bachata is slower, more melodic, and guitar-driven at 110–130 BPM — more immediately accessible emotionally.</p>
            <h2>Which is Easier for Complete Beginners?</h2>
            <p><strong>Bachata's gentler curve:</strong> side-to-side basic (more natural), slower tempo, organic body movement, closer partner guidance.</p>
            <p><strong>Salsa's rewards:</strong> once you hear the clave it's addictive, more intellectually satisfying footwork, spectacular social floor payoff.</p>
            <p><strong>Verdict:</strong> Feel something quickly → Bachata. Long-term technical challenge → Salsa. At Pura Nights you don't choose — both are taught every evening.</p>
            <h2>The Social Scene</h2>
            <p>Most Latin nights mix both Salsa and Bachata sets. Knowing both means you never sit out. Dedicated Bachata nights have exploded in London; dedicated Salsa nights remain popular in central London.</p>
            <h2>Can You Learn Both Simultaneously?</h2>
            <p>Yes — at Pura Nights you already do. Skills cross over beautifully: Salsa builds footwork speed; Bachata develops body awareness and connection.</p>
            <h2>Comparison Table</h2>
            <div className="not-prose overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse"><thead><tr className="bg-secondary"><th className="p-3 text-left font-heading">Factor</th><th className="p-3 text-left font-heading">Salsa On1</th><th className="p-3 text-left font-heading">Bachata</th></tr></thead><tbody>
                {[["Difficulty","Medium","Easy-Medium"],["Tempo","150-200 BPM","110-130 BPM"],["Basic step","Forward/back","Side to side"],["Partner distance","Open-closed","Close embrace"],["Comfort timeline","8-12 weeks","6-8 weeks"],["Best for","Music complexity","Expression"]].map(([f,s,b],i)=><tr key={i} className="border-b border-border"><td className="p-3 font-heading font-semibold">{f}</td><td className="p-3">{s}</td><td className="p-3">{b}</td></tr>)}
              </tbody></table>
            </div>
            <div className="not-prose my-12 bg-primary rounded-2xl p-8 text-center">
              <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">At Pura Nights You Learn Both — Every Week</h3>
              <p className="text-primary-foreground/80 font-heading text-sm mb-5">Mondays Chiswick · Tuesdays Ealing · No partner needed</p>
              <Link to="/pura-nights" className="btn-cta-dark inline-block">See Class Schedule</Link>
            </div>
          </div>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <AuthorCard />
          <div className="mt-10"><h3 className="font-display text-xl font-bold mb-4">Related Posts</h3><div className="grid sm:grid-cols-3 gap-4">{[{slug:"what-is-salsa",title:"What is Salsa?",cat:"Salsa"},{slug:"what-is-bachata",title:"What is Bachata?",cat:"Bachata"},{slug:"beginners-guide-salsa-london",title:"Beginner's Guide",cat:"Beginners"}].map(p=><Link key={p.slug} to={`/blog/${p.slug}`} className="bg-card rounded-xl p-4 card-hover"><span className="text-primary text-xs font-heading font-bold">{p.cat}</span><p className="font-heading font-semibold text-sm mt-1">{p.title}</p></Link>)}</div></div>
          <div className="mt-4 text-center"><Link to="/proof-centre" className="text-primary font-heading text-sm font-semibold hover:underline">See 500+ Student Reviews →</Link></div>
        </FadeInUp>
      </div>
    </article>
  </Layout>
);
export default SalsaVsBachata;
