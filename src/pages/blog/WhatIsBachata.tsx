import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/* <!-- WIX PAGE: /blog/what-is-bachata -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const WhatIsBachata = () => (
  <Layout>
    <SeoHead title="What is Bachata Dance? From Dominican Roots to Sensual Style | Pura Nights London" description="Discover Bachata — from its emotional Dominican Republic origins to Bachata Sensual. Learn all styles with Melitta Siomos at Pura Nights in West London." path="/blog/what-is-bachata" schema={{ "@context": "https://schema.org", "@type": ["Article", "FAQPage"], headline: "What is Bachata Dance? From Dominican Roots to Bachata Sensual", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-02-10" }} />
    <ReadingProgressBar />
    <article className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <nav className="text-sm text-muted-foreground mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> → <Link to="/blog" className="hover:text-primary">Blog</Link> → <span className="text-foreground">Bachata</span></nav>
          <span className="inline-block bg-primary/10 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Bachata</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4">What is Bachata Dance? From Dominican Roots to Bachata Sensual</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-heading mb-8"><span>By Melitta Siomos</span><span>·</span><span>Feb 2025</span><span>·</span><span>7 min read</span></div>
          <SocialShareButtons title="What is Bachata Dance?" path="/blog/what-is-bachata" />
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <div className="prose prose-lg max-w-none mt-10 font-body text-foreground [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:mb-5 [&_p]:leading-relaxed [&_ul]:mb-5 [&_li]:mb-2">
            <p>Bachata is, at its core, a love song in movement. It was born in the mountains and backstreets of the Dominican Republic — raw, heartfelt, and deeply emotional. Today it has evolved into one of the fastest-growing social dances in the world, and at Pura Nights' classes in Chiswick and Ealing, you can learn every style from Traditional to Bachata Sensual.</p>
            <h2>The History of Bachata — Born in the Dominican Republic</h2>
            <p>Bachata emerged in the Dominican Republic during the 1960s, originally called "amargue" (meaning bitter or bittersweet), a name that reflected the heartbreak and longing that characterised its lyrics. It was music of the poor and working class — played on acoustic guitar with bongo, maracas, and bass — and for years it was actively dismissed by the Dominican establishment as lower-class or vulgar.</p>
            <p>By the 1980s, artists like Juan Luis Guerra (who won a Grammy for his 1990 album "Bachata Rosa") began bringing Bachata to mainstream audiences. The 1990s saw the genre and dance spread internationally, particularly to Spanish-speaking communities in New York, Miami, and Europe.</p>
            <h2>The Three Core Styles of Bachata</h2>
            <p><strong>TRADITIONAL BACHATA</strong><br/>The original form, danced in close embrace with small, intimate steps. Subtle hip movement, gentle body rock, deep partner connection. Still popular at Dominican social nights.</p>
            <p><strong>BACHATA MODERNA (European Style)</strong><br/>Developed primarily in Spain during the 2000s, blending traditional footwork with influences from Salsa, Argentine Tango, and contemporary dance. More open partner work, cleaner lines, more theatrical styling. The most widely taught style in London.</p>
            <p><strong>BACHATA SENSUAL</strong><br/>Created by Spanish dancers Korke & Judith in Cádiz. Characterised by fluid body waves, dramatic dips, deeply connective embrace, and slower, cinematic musicality. The most expressive of all Bachata styles.</p>
            <p><strong>URBAN BACHATA</strong><br/>Contemporary fusion with hip-hop, R&B, and urban music influences. Popular with younger audiences at urban dance events.</p>
            <p>At Pura Nights, all core styles are taught, with emphasis on <strong>Moderna</strong> and <strong>Sensual</strong>.</p>
            <h2>The Bachata Basic Step</h2>
            <p>Side step LEFT (beat 1), together (beat 2), side step LEFT (beat 3), hip tap RIGHT (beat 4). Then reverse. The tap on beat 4 is the signature of Bachata — that punctuation that gives the dance its characteristic rhythm.</p>
            <p>From this foundation: forward/back steps, turns, body waves, dips, and linked turn combinations across 4 or 8 beats.</p>
            <h2>Bachata vs Salsa — Key Differences</h2>
            <div className="not-prose overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse"><thead><tr className="bg-secondary"><th className="p-3 text-left font-heading">Factor</th><th className="p-3 text-left font-heading">Bachata</th><th className="p-3 text-left font-heading">Salsa On1</th></tr></thead><tbody>
                {[["Basic step","Side to side","Forward/back slot"],["Connection","Close embrace","Open/closed frame"],["Tempo","110–130 BPM","150–200 BPM"],["Mood","Romantic, sensual","Energetic, playful"],["Easier?","Generally yes","Steeper curve"],["Origin","Dominican Republic","Cuba / Puerto Rico / NY"]].map(([f,b,s],i)=><tr key={i} className="border-b border-border"><td className="p-3 font-heading font-semibold">{f}</td><td className="p-3">{b}</td><td className="p-3">{s}</td></tr>)}
              </tbody></table>
            </div>
            <div className="not-prose my-12 bg-primary rounded-2xl p-8 text-center">
              <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">Ready to Try Bachata?</h3>
              <p className="text-primary-foreground/80 font-heading text-sm mb-5">Mondays in Chiswick · Tuesdays in Ealing · No partner needed</p>
              <Link to="/pura-nights" className="btn-cta-dark inline-block">View Class Schedule</Link>
            </div>
            <h2>FAQ — Bachata Classes in London</h2>
          </div>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <Accordion type="multiple" className="mb-10">
            {[{q:"Do I need to be flexible or fit to learn bachata?",a:"Not at all. Bachata is accessible to all body types, ages, and fitness levels."},{q:"Is Bachata Sensual appropriate for beginners?",a:"We introduce sensual elements gradually. The focus is always on communication, comfort, and connection."},{q:"How long does it take to learn bachata?",a:"Most people feel comfortable socially within 6–8 weeks. The basic step can be learned in one class."},{q:"What's the difference between Sensual and regular Bachata?",a:"Bachata Sensual features more body waves, closer connection, and slower musicality."}].map((faq,i)=><AccordionItem key={i} value={`faq-${i}`}><AccordionTrigger className="font-heading font-semibold text-left">{faq.q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent></AccordionItem>)}
          </Accordion>
          <AuthorCard />
          <div className="mt-10"><h3 className="font-display text-xl font-bold mb-4">Related Posts</h3><div className="grid sm:grid-cols-3 gap-4">{[{slug:"what-is-salsa",title:"What is Salsa Dance?",cat:"Salsa"},{slug:"salsa-vs-bachata",title:"Salsa vs Bachata",cat:"Beginners"},{slug:"beginners-guide-salsa-london",title:"Beginner's Guide",cat:"Beginners"}].map(p=><Link key={p.slug} to={`/blog/${p.slug}`} className="bg-card rounded-xl p-4 card-hover"><span className="text-primary text-xs font-heading font-bold">{p.cat}</span><p className="font-heading font-semibold text-sm mt-1">{p.title}</p></Link>)}</div></div>
        </FadeInUp>
      </div>
    </article>
  </Layout>
);
export default WhatIsBachata;
