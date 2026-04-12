import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import RelatedPages from "@/components/RelatedPages";

/* <!-- WIX PAGE: /blog/salsa-classes-near-turnham-green -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const SalsaClassesNearTurnhamGreen = () => (
  <Layout>
    <SeoHead title="Salsa Classes Near Turnham Green | Pura Nights Chiswick" description="Find salsa classes near Turnham Green station. Weekly classes every Monday at The George IV, just 5 minutes walk from Turnham Green tube. All levels welcome." path="/blog/salsa-classes-near-turnham-green" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Salsa Classes Near Turnham Green — Everything You Need to Know", author: { "@type": "Person", name: "Melitta Siomos" }, datePublished: "2026-01-20" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Local</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Local</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Salsa Classes Near Turnham Green — Everything You Need to Know</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Jan 2026</span><span>·</span><span>6 min read</span></div>
            <SocialShareButtons title="Salsa Classes Near Turnham Green" path="/blog/salsa-classes-near-turnham-green" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Where to Find Salsa Near Turnham Green</h2>
            <p className="text-muted-foreground mb-4">If you live near Turnham Green or commute through the area on the District Line, you're just a five-minute walk from one of London's best weekly salsa nights. <Link to="/pura-nights" className="text-primary hover:underline">Pura Nights</Link> runs every Monday at The George IV pub, 185 Chiswick High Road — a short stroll from Turnham Green station and equally accessible from Gunnersbury.</p>
            <p className="text-muted-foreground mb-4">The Turnham Green area is perfectly positioned for dancers coming from Hammersmith, Acton, Kew, and Brentford. With the District Line running directly to the station, you can be door-to-door from Central London in under 30 minutes. Several bus routes (190, 237, 267) also stop nearby.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The George IV — Your Monday Night Venue</h2>
            <p className="text-muted-foreground mb-4">The George IV is a spacious, welcoming pub with a dedicated dance area that comfortably hosts 60+ dancers. The venue has a bar, seating areas for resting between dances, and a warm atmosphere that makes newcomers feel at home immediately. It's the kind of place where you walk in alone and leave with friends.</p>
            <p className="text-muted-foreground mb-4">Address: 185 Chiswick High Road, London W4 2DR. The pub is on the main high street, impossible to miss. On-street parking is available after 6:30 PM when most restrictions lift.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Getting There From Turnham Green</h2>
            <p className="text-muted-foreground mb-4">From Turnham Green station (District Line), exit onto Turnham Green Terrace and walk south towards Chiswick High Road. Turn right and The George IV is about 300 metres along on your left. Total walking time: approximately 5 minutes. Alternatively, Gunnersbury station (District Line and Overground) is a 7-minute walk. If you're cycling, there are bike racks on the high street.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Monday Class Schedule & Levels</h2>
            <p className="text-muted-foreground mb-4">Doors open at 7:15 PM. <Link to="/salsa-classes-chiswick" className="text-primary hover:underline">Salsa classes</Link> run from 7:30 to 8:15 PM, followed by Bachata from 8:15 to 9:00 PM. Both classes are split into Beginner, Improver, and Intermediate levels — you'll be guided to the right group when you arrive. Social dancing runs from 9:00 to 11:00 PM with a 50/50 mix of Salsa and Bachata tracks.</p>
            <p className="text-muted-foreground mb-4">Classes are taught by Bachata UK Champion Melitta Siomos and her team of trained assistant instructors. The teaching style is structured, progressive, and fun — each week builds on the previous one, so regular attendance is rewarded with steady improvement.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Who These Classes Are For</h2>
            <p className="text-muted-foreground mb-4">Pura Nights classes attract a wonderfully diverse crowd — ages 20 to 60+, all backgrounds, all body types. You don't need a partner (we rotate during class), you don't need dance experience, and you don't need to be fit. Many of our most dedicated dancers started with absolutely zero experience and are now performing at international festivals with <Link to="/pura-ladies" className="text-primary hover:underline">Pura Ladies</Link>.</p>
            <p className="text-muted-foreground mb-4">The only thing you need to bring is an open mind and comfortable shoes. Pricing starts from just £5 per person — one of the most affordable class-and-social packages in London.</p>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 my-8">
              <h3 className="font-heading font-bold mb-2">Just 5 Minutes From Turnham Green</h3>
              <p className="text-muted-foreground text-sm mb-4">Join us this Monday at The George IV. No partner needed.</p>
              <Link to="/salsa-classes-chiswick" className="btn-cta-primary text-sm">View Chiswick Classes →</Link>
            </div>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              {[
                { q: "How far is The George IV from Turnham Green station?", a: "About a 5-minute walk south along Chiswick High Road." },
                { q: "Can I park near the venue?", a: "Yes — on-street parking is available on Chiswick High Road and surrounding streets. Most restrictions lift after 6:30 PM." },
                { q: "Do I need to book in advance?", a: "Pre-booking online guarantees your spot, but walk-ins are welcome and you can pay at the door." },
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-xl p-5">
                  <h3 className="font-heading font-bold text-sm mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <SocialShareButtons title="Salsa Classes Near Turnham Green" path="/blog/salsa-classes-near-turnham-green" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[
      { to: "/salsa-classes-chiswick", label: "Salsa Classes Chiswick" },
      { to: "/dance-classes-chiswick", label: "Dance Classes Chiswick" },
      { to: "/blog/salsa-classes-near-chiswick", label: "Salsa Near Chiswick Guide" },
    ]} />
  </Layout>
);

export default SalsaClassesNearTurnhamGreen;
