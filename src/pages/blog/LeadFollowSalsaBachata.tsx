import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/lead-follow-salsa-bachata -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const LeadFollowSalsaBachata = () => (
  <Layout>
    <SeoHead title="Lead and Follow in Salsa & Bachata: Beginner's Guide" description="Understand lead and follow in partner dancing. Learn about the frame, connection, common mistakes, and how to improve as a lead or follow in Salsa and Bachata." path="/blog/lead-follow-salsa-bachata" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Lead and Follow in Salsa & Bachata: A Beginner's Guide to Partnership", author: { "@type": "Person", name: "Melitta Siomos" }, datePublished: "2026-02-15" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Technique</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Technique</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Lead and Follow in Salsa & Bachata: A Beginner's Guide</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Feb 2026</span><span>·</span><span>7 min read</span></div>
            <SocialShareButtons title="Lead and Follow Guide" path="/blog/lead-follow-salsa-bachata" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold mt-10 mb-4">What Lead and Follow Actually Means</h2>
            <p className="text-muted-foreground mb-4">In partner dancing, "lead and follow" is the communication system that allows two people to dance together without pre-arranged choreography. The lead initiates movements — turns, direction changes, patterns — through physical signals transmitted via the frame (the hand and arm connection between partners). The follow receives these signals and responds in real time.</p>
            <p className="text-muted-foreground mb-4">It's important to understand that leading doesn't mean controlling, and following doesn't mean being passive. The best social dancers describe it as a conversation — the lead suggests, the follow interprets, and both partners contribute to the dance. This is what makes social dancing endlessly interesting: every dance with every partner is different.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Frame: How Partners Connect</h2>
            <p className="text-muted-foreground mb-4">The "frame" is the physical connection between partners — typically through the hands and arms in open position, or through the torso in close hold (common in Bachata). A good frame is firm enough to communicate clearly but relaxed enough to allow natural movement. Think of it like holding a bird — tight enough that it can't fly away, gentle enough that you don't crush it.</p>
            <p className="text-muted-foreground mb-4">In Salsa, most communication happens through the hands and forearms. In Bachata Sensual, the frame extends to include the upper body and torso, which allows for body waves and closer connection. At <Link to="/pura-nights" className="text-primary hover:underline">Pura Nights</Link>, we teach frame technique from day one because it's the foundation everything else is built on.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Common Beginner Mistakes</h2>
            <p className="text-muted-foreground mb-4"><strong>Leads:</strong> Using too much force (muscling your partner through moves instead of guiding), telegraphing moves too late (leaving no time for the follow to respond), and trying to do too many complicated patterns before mastering the basics. The best leads at any level are those who are clear, musical, and responsive to their partner's ability.</p>
            <p className="text-muted-foreground mb-4"><strong>Follows:</strong> Anticipating moves (guessing what's coming next instead of waiting for the lead), having a "noodle arm" (no frame tension, making it impossible for the lead to communicate), and back-leading (doing moves that weren't led). Great following requires active listening through the frame — it's a skill that takes practice to develop.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How to Improve Your Lead</h2>
            <p className="text-muted-foreground mb-4">Dance with as many different partners as possible — each follow gives you different feedback through their frame. Simplify your vocabulary and focus on timing and musicality rather than cramming in complex patterns. Watch experienced social dancers and notice how smoothly they transition between moves. And most importantly, listen to the music — the best leads dance to the song, not just through a routine.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How to Improve Your Follow</h2>
            <p className="text-muted-foreground mb-4">Focus on maintaining a consistent, responsive frame. Practice your basic step until it's automatic — this frees your mind to focus on interpreting the lead's signals. Dance with many different leads to experience different styles and strengths. And develop your <Link to="/blog/ladies-styling-bachata" className="text-primary hover:underline">styling</Link> so you can add your own expression to the dance without disrupting the connection.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Why Partner Rotation Accelerates Learning</h2>
            <p className="text-muted-foreground mb-4">At Pura Nights, we rotate partners every few minutes during class. This might feel awkward at first, but it's the single most effective way to improve. Each partner teaches you something different — a firmer frame, a lighter touch, a different timing preference. Dancers who rotate regularly improve 3-5 times faster than those who stick with one partner.</p>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 my-8">
              <h3 className="font-heading font-bold mb-2">Practice Makes Perfect</h3>
              <p className="text-muted-foreground text-sm mb-4">Join us Monday or Tuesday to develop your lead and follow skills with partner rotation.</p>
              <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">🎟 Book a Class</a>
            </div>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              {[
                { q: "Can women lead and men follow?", a: "Absolutely. While traditionally men lead and women follow, many dancers learn both roles. It deepens your understanding of the dance." },
                { q: "How long does it take to become a good lead/follow?", a: "Basic competence comes within 4-8 weeks of regular classes. Developing a refined, musical connection is an ongoing journey." },
                { q: "I'm nervous about partner rotation — do I have to?", a: "We strongly encourage it because the learning benefits are huge, but you're never forced. Most people find they enjoy it after the first few rotations." },
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-xl p-5">
                  <h3 className="font-heading font-bold text-sm mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <SocialShareButtons title="Lead and Follow Guide" path="/blog/lead-follow-salsa-bachata" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[
      { to: "/blog/improve-social-dancing", label: "Improve Your Social Dancing" },
      { to: "/blog/first-salsa-class-london", label: "Your First Salsa Class" },
      { to: "/pura-nights", label: "Weekly Classes" },
    ]} />
  </Layout>
);

export default LeadFollowSalsaBachata;
