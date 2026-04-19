import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import BlogPostFooter from "@/components/BlogPostFooter";

const tips = [
  { n: 1, title: "Start Earlier Than You Think", text: "Aim for 8–12 weeks before your wedding. Starting early reduces pressure and lets you enjoy the process." },
  { n: 2, title: "Choose Your Song First", text: "The song dictates style, timing, and mood. Melitta builds choreography around your music." },
  { n: 3, title: "Decide on Your Style Early", text: "Simple and heartfelt, or show-stopping? Being clear saves time and ensures the choreography feels like you." },
  { n: 4, title: "Practice in Your Actual Shoes", text: "At least two sessions in your wedding shoes. A heel you've never danced in is a risk." },
  { n: 5, title: "Film Every Practice Session", text: "Watching footage back is the fastest way to spot what needs work. Melitta reviews between sessions too." },
  { n: 6, title: "Have a Simplified Backup Version", text: "A 30% simpler version for wedding-day nerves or a small floor. The best performers always have a Plan B." },
  { n: 7, title: "Don't Try to Be Perfect — Be Connected", text: "The magical moments are smiles, eye contact, laughter — not technical perfection." },
  { n: 8, title: "Practice the Walk-in and Position", text: "Know where you stand, which direction you face, who leads. These 30 seconds set the tone." },
  { n: 9, title: "Breathe on the Day", text: "Take one slow breath together before the music starts. Your body remembers what your nervous brain forgets." },
  { n: 10, title: "Trust the Process", text: "Every couple says the same: they couldn't believe how quickly it came together with regular sessions." },
];

/* <!-- WIX PAGE: /blog/wedding-first-dance-tips -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const WeddingFirstDanceTips = () => (
  <Layout>
    <SeoHead title="10 Tips for the Perfect Wedding First Dance | Melitta Siomos London" description="Expert advice from Melitta Siomos on preparing a show-stopping wedding first dance." path="/blog/wedding-first-dance-tips" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "10 Tips for the Perfect Wedding First Dance", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-03-15" }} />
    <ReadingProgressBar />
    <article className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <nav className="text-sm text-muted-foreground mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> → <Link to="/blog" className="hover:text-primary">Blog</Link> → <span className="text-foreground">Wedding Dance</span></nav>
          <span className="inline-block bg-primary/10 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Wedding Dance</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4">10 Tips for the Perfect Wedding First Dance</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-heading mb-8"><span>By Melitta Siomos</span><span>·</span><span>Mar 2025</span><span>·</span><span>5 min read</span></div>
          <SocialShareButtons title="Wedding First Dance Tips" path="/blog/wedding-first-dance-tips" />
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <div className="prose prose-lg max-w-none mt-10 font-body text-foreground [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:mb-5 [&_p]:leading-relaxed">
            <p>Your first dance will be watched by every person at your wedding. Here are the 10 things Melitta tells every couple.</p>
            {tips.map(t => (<div key={t.n}><h2>{t.n}. {t.title}</h2><p>{t.text}</p></div>))}
            <h2>What Our Couples Say</h2>
            <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground my-8">"We were total beginners and terrified. Melitta made the lessons one of our favourite parts of wedding planning." — <strong>Eva & Miguel, 2023</strong></blockquote>
            <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground my-8">"Our guests loved our performance and we will never forget that moment!" — <strong>Sofia & Patrizio, 2022</strong></blockquote>
            <div className="not-prose my-12 bg-primary rounded-2xl p-8 text-center">
              <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">Ready to Plan Your First Dance?</h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
                <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20love%20to%20enquire%20about%20Wedding%20Dance%20coaching" className="btn-cta-dark inline-block">WhatsApp Melitta 💬</a>
                <a href="mailto:siomosmelitta@gmail.com" className="btn-cta-outline inline-block">Email Melitta ✉️</a>
              </div>
            </div>
          </div>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <AuthorCard />
          <BlogPostFooter related={[
            { to: "/blog/choose-wedding-first-dance-song", title: "How to Choose Your Song", category: "Wedding Dance", readTime: "5 min" },
            { to: "/blog/how-many-wedding-dance-lessons", title: "How Many Lessons?", category: "Wedding Dance", readTime: "5 min" },
            { to: "/blog/last-minute-wedding-dance", title: "Last-Minute Tips", category: "Wedding Dance", readTime: "5 min" },
          ]} />
          <div className="mt-4 text-center"><Link to="/proof-centre" className="text-primary font-heading text-sm font-semibold hover:underline">See What Real Couples Say →</Link></div>
        </FadeInUp>
      </div>
    </article>
  </Layout>
);
export default WeddingFirstDanceTips;
