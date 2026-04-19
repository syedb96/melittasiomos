import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import BlogPostFooter from "@/components/BlogPostFooter";

/* <!-- WIX PAGE: /blog/beginners-guide-london -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const BeginnersGuideLondon = () => (
  <Layout>
    <SeoHead title="Beginner's Guide to Salsa Classes in London | Pura Nights" description="Everything you need to know before your first salsa class in London — what to wear, how it works, pricing. From Melitta Siomos." path="/blog/beginners-guide-salsa-london" schema={{ "@context": "https://schema.org", "@type": ["Article", "FAQPage"], headline: "The Complete Beginner's Guide to Salsa Classes in London", author: { "@type": "Person", name: "Melitta Siomos" }, publisher: { "@type": "Organization", name: "Pura Nights" }, datePublished: "2025-04-01" }} />
    <ReadingProgressBar />
    <article className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <nav className="text-sm text-muted-foreground mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> → <Link to="/blog" className="hover:text-primary">Blog</Link> → <span className="text-foreground">Beginners</span></nav>
          <span className="inline-block bg-primary/10 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Beginners</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4">The Complete Beginner's Guide to Salsa Classes in London</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-heading mb-8"><span>By Melitta Siomos</span><span>·</span><span>Apr 2025</span><span>·</span><span>6 min read</span></div>
          <SocialShareButtons title="Beginner's Guide to Salsa in London" path="/blog/beginners-guide-salsa-london" />
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <div className="prose prose-lg max-w-none mt-10 font-body text-foreground [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:mb-5 [&_p]:leading-relaxed [&_ul]:mb-5 [&_li]:mb-2">
            <p>Walking into your first dance class as an adult is one of the bravest and most exciting things you can do. This guide walks you through exactly what to expect at Pura Nights.</p>
            <h2>Why London is Amazing for Salsa</h2>
            <p>London has one of the most vibrant Latin dance scenes on the planet. West London — Chiswick, Ealing, Acton — has a thriving community centred around Pura Nights.</p>
            <h2>What to Wear and Bring</h2>
            <p><strong>Shoes:</strong> Flat-soled trainers work for beginners. Avoid thick running shoes. <strong>Clothes:</strong> Comfortable, breathable. <strong>Water:</strong> Bring a bottle. <strong>Attitude:</strong> Leave perfection at the door.</p>
            <h2>What Happens in a Beginners Class</h2>
            <p><strong>0–10 min:</strong> Warm-up, finding the rhythm. <strong>10–25 min:</strong> The basic step, solo then with partner. <strong>25–40 min:</strong> First partner move (crossbody lead), rotating partners. <strong>40–50 min:</strong> Combination linking everything together. <strong>50–55 min:</strong> Demo at social speed.</p>
            <h2>Partner Rotation — Why It Works</h2>
            <p>You dance with 8–15 different people per class. You adapt to different styles, make friends naturally, and improve faster than dancing with just one person. The nerves disappear within the first rotation.</p>
            <h2>The Social — Should You Stay?</h2>
            <p><strong>Yes.</strong> The social is where everything clicks. The DJ plays, the floor opens, and you practise with real partners. You don't need to be good — you need to be willing to try.</p>
            <h2>Pricing</h2>
            <ul><li><strong>Drop-in:</strong> £10–15</li><li><strong>5-class bundle:</strong> from £42</li><li><strong>10-class bundle:</strong> from £78</li><li><strong>Monthly unlimited:</strong> from £85</li></ul>
            <div className="not-prose my-12 bg-primary rounded-2xl p-8 text-center">
              <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">Ready to Try a Class?</h3>
              <p className="text-primary-foreground/80 font-heading text-sm mb-5">No booking required — just turn up</p>
              <Link to="/pura-nights" className="btn-cta-dark inline-block">See Class Schedule</Link>
            </div>
            <h2>FAQ — Beginners</h2>
          </div>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <Accordion type="multiple" className="mb-10">
            {[{q:"What if I have no rhythm?",a:"Rhythm is a skill, not a gift. Melitta teaches it explicitly."},{q:"I'm shy. Will I feel awkward?",a:"Within 15 minutes the self-consciousness fades. Movement and music are natural social lubricants."},{q:"Is dance for all body types?",a:"Dance is for every body. Students aged 18–65+, all fitness levels."},{q:"How do I find the venue?",a:"Mondays: The George IV, 185 Chiswick High Rd, W4 2DR. Tuesdays: Drayton Court Hotel, 2 The Avenue, Ealing, W13 8PH."}].map((faq,i)=><AccordionItem key={i} value={`faq-${i}`}><AccordionTrigger className="font-heading font-semibold text-left">{faq.q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent></AccordionItem>)}
          </Accordion>
          <AuthorCard />
          <BlogPostFooter related={[
            { to: "/blog/what-is-salsa", title: "What is Salsa?", category: "Salsa", readTime: "8 min" },
            { to: "/blog/first-salsa-class-london", title: "Your First Salsa Class", category: "Beginners", readTime: "6 min" },
            { to: "/blog/salsa-vs-bachata", title: "Salsa vs Bachata", category: "Beginners", readTime: "5 min" },
          ]} />
        </FadeInUp>
      </div>
    </article>
  </Layout>
);
export default BeginnersGuideLondon;
