import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/hen-party-dance-ideas -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const HenPartyDanceIdeas = () => (
  <Layout>
    <SeoHead title="Hen Party Dance Ideas West London | Salsa & Bachata" description="Looking for hen party ideas in West London? Book a private Salsa or Bachata dance class for your group. Fun, memorable, and suitable for all abilities." path="/blog/hen-party-dance-ideas-london" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Hen Party Dance Ideas in West London — Unforgettable & Actually Fun", author: { "@type": "Person", name: "Melitta Siomos" }, datePublished: "2026-03-05" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Events</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Events</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Hen Party Dance Ideas in West London — Unforgettable & Actually Fun</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Mar 2026</span><span>·</span><span>6 min read</span></div>
            <SocialShareButtons title="Hen Party Dance Ideas" path="/blog/hen-party-dance-ideas-london" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Why a Dance Class Makes the Perfect Hen Party</h2>
            <p className="text-muted-foreground mb-4">Forget the generic spa day or overpriced cocktail making class. A Latin dance hen party is active, social, hilarious, and genuinely fun for everyone — regardless of dance experience. There's something magical about a group of friends learning Salsa or Bachata together: the laughter when someone goes the wrong way, the pride when you nail a move, and the photos and videos that become instant classics.</p>
            <p className="text-muted-foreground mb-4">A dance class hen party is also inclusive in a way that many hen party activities aren't. There's no drinking required, no extreme physical demands, and no awkward competitiveness. Everyone starts at zero, everyone improves together, and everyone has a story to tell afterwards.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">What Pura Nights Offers for Groups</h2>
            <p className="text-muted-foreground mb-4">Melitta Siomos offers private group sessions for hen parties at her studio in Acton, West London. A typical hen party session runs 60-90 minutes and includes a warm-up, a fun Salsa or Bachata routine taught step by step, and a mini performance at the end that you can film and share. Sessions can be customised to the bride-to-be's favourite music, and Melitta's infectious energy makes even the most reluctant dancers feel comfortable.</p>
            <p className="text-muted-foreground mb-4">Group sizes of 6-20 work best. For larger groups, additional instructors can be arranged. Sessions include music, instruction, and plenty of photo opportunities. Some hen parties combine the dance class with drinks at a nearby venue for a full afternoon or evening out.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Salsa vs Bachata for Hen Parties</h2>
            <p className="text-muted-foreground mb-4"><strong>Salsa</strong> is energetic, fast, and gets everyone moving quickly. It's great for groups who want high energy and lots of laughter. <strong>Bachata</strong> is smoother, more sensual, and tends to feel more accessible for complete beginners. Many hen parties choose a mix of both — 30 minutes of each — for the best of both worlds.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">What to Expect</h2>
            <p className="text-muted-foreground mb-4">Arrive in comfortable clothes and shoes you can move in (no stilettos!). Melitta will start with a fun warm-up to loosen everyone up, then break down a simple but impressive-looking routine piece by piece. By the end of the session, your group will be dancing in sync and feeling like they belong on Strictly. The session is filmed so you can relive the magic — and embarrass the bride at the wedding reception.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Booking Information</h2>
            <p className="text-muted-foreground mb-4">Hen party bookings are available throughout the week, subject to availability. Pricing depends on group size and session length. For a quote, <Link to="/contact" className="text-primary hover:underline">contact Melitta directly</Link> via WhatsApp or email with your preferred date, group size, and any special requests (themed music, particular songs, etc.).</p>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 my-8">
              <h3 className="font-heading font-bold mb-2">Book a Hen Party Dance Class</h3>
              <p className="text-muted-foreground text-sm mb-4">Contact Melitta to arrange your perfect hen party experience.</p>
              <Link to="/contact" className="btn-cta-primary text-sm">📧 Get in Touch</Link>
            </div>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              {[
                { q: "How many people can attend?", a: "Groups of 6-20 work best. Larger groups can be accommodated with additional instructors." },
                { q: "Do we need any dance experience?", a: "None at all! The session is designed for complete beginners and guaranteed to be fun." },
                { q: "Can we choose the music?", a: "Absolutely — let Melitta know the bride's favourite songs and she'll incorporate them into the routine." },
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-xl p-5">
                  <h3 className="font-heading font-bold text-sm mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <SocialShareButtons title="Hen Party Dance Ideas" path="/blog/hen-party-dance-ideas-london" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[
      { to: "/contact", label: "Contact & Enquiries" },
      { to: "/private-lessons", label: "Private Group Sessions" },
      { to: "/blog/corporate-team-building-dance-london", label: "Corporate Dance Events" },
    ]} />
  </Layout>
);

export default HenPartyDanceIdeas;
