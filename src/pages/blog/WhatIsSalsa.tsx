import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/* <!-- WIX PAGE: /blog/what-is-salsa -->
   <!-- WIX: Use dynamic page template connected to Blog Posts collection -->
   <!-- WIX SECTION: Article Header — title, category, author, date -->
   <!-- WIX SECTION: Article Body — Rich Text with CTA after 3rd H2 -->
   <!-- WIX SECTION: Author Card — connected to Team Members collection -->
   <!-- WIX SECTION: Related Posts — Repeater filtered by category -->
*/
const WhatIsSalsa = () => (
  <Layout>
    <SeoHead
      title="What is Salsa Dance? The Complete Guide to On1 Crossbody Style | Pura Nights London"
      description="Discover the history, music, and technique of Salsa dance. Learn On1 Crossbody Salsa in London at Pura Nights with award-winning instructor Melitta Siomos."
      path="/blog/what-is-salsa"
      schema={{
        "@context": "https://schema.org",
        "@type": ["Article", "FAQPage"],
        headline: "What is Salsa Dance? The Complete Guide to On1 Crossbody Style",
        description: "Discover the history, music, and technique of Salsa dance.",
        author: { "@type": "Person", name: "Melitta Siomos", url: "https://www.puranights.com/about" },
        publisher: { "@type": "Organization", name: "Pura Nights" },
        datePublished: "2025-01-15",
        dateModified: "2025-06-01",
        mainEntity: [
          { "@type": "Question", name: "Do I need a partner to learn salsa?", acceptedAnswer: { "@type": "Answer", text: "No. At Pura Nights we rotate partners throughout the class." } },
          { "@type": "Question", name: "How long does it take to learn salsa?", acceptedAnswer: { "@type": "Answer", text: "Most people feel confident on the social floor within 8–12 weeks." } },
          { "@type": "Question", name: "What shoes should I wear to salsa class?", acceptedAnswer: { "@type": "Answer", text: "Trainers with a flat sole are perfect for beginners. Latin dance shoes with suede sole are ideal as you progress." } },
        ],
      }}
    />
    <ReadingProgressBar />

    <article className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <nav className="text-sm text-muted-foreground mb-6 font-heading">
            <Link to="/" className="hover:text-primary">Home</Link> → <Link to="/blog" className="hover:text-primary">Blog</Link> → <span className="text-foreground">Salsa</span>
          </nav>

          <span className="inline-block bg-primary/10 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Salsa</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4">What is Salsa Dance? The Complete Guide to On1 Crossbody Style</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-heading mb-8">
            <span>By Melitta Siomos</span><span>·</span><span>Jan 2025</span><span>·</span><span>8 min read</span>
          </div>
          <SocialShareButtons title="What is Salsa Dance?" path="/blog/what-is-salsa" />
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="prose prose-lg max-w-none mt-10 font-body text-foreground [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:mb-5 [&_p]:leading-relaxed [&_ul]:mb-5 [&_li]:mb-2">

            <p>Salsa is one of the most exhilarating, joyful, and social dances in the world — and London's Pura Nights is where thousands of people discover it for the first time. Whether you've seen it at a party and wanted to join in, or you're simply curious about what happens at a Latin night, this guide covers everything you need to know: the history, the music, the styles, and exactly how to get started.</p>

            <p>The good news? You don't need a partner, prior experience, or any natural rhythm (that comes with practice). At Pura Nights, complete beginners are welcomed every single week at our Chiswick and Ealing classes — and most people are dancing confidently within their first few sessions.</p>

            <h2>The Origins of Salsa Dance</h2>

            <p>Salsa did not emerge from a single country or a single moment — it grew organically from the collision of African rhythms, Spanish colonial music, and the Latin diaspora of the 20th century. Its deepest roots lie in Cuba, where Son Cubano fused African percussion (brought by enslaved people) with Spanish guitar and vocals during the 19th century. This evolved through Danzón, Guaracha, Mambo, and Cha-cha-chá across the early 20th century.</p>

            <p>The pivotal transformation came in New York City during the 1960s and 70s. Puerto Rican and Cuban communities living in the Bronx, East Harlem, and Brooklyn brought their music and dance with them — and the creative collision with jazz, funk, and the energy of the city created something entirely new. The Fania Records label, founded in 1964, became the heartbeat of this movement, signing artists like Celia Cruz, Héctor Lavoe, and Willie Colón who collectively defined what we now call Salsa.</p>

            <p>By the 1980s and 90s, Salsa had spread globally — from Miami and Los Angeles to Colombia, Venezuela, Puerto Rico, and eventually Europe. London's Latin dance scene exploded in the early 2000s, and today cities like London, Paris, and Amsterdam are among the most vibrant Salsa communities on the planet.</p>

            <h2>The Different Styles of Salsa</h2>

            <p>Salsa is not one monolithic dance — it has evolved distinct regional styles, each with their own character, timing, and cultural context:</p>

            <p><strong>ON1 — LOS ANGELES STYLE (CROSSBODY)</strong><br/>The most widely danced style at social events worldwide. Danced "on the 1" — meaning partners break forward on beat 1 of the music. Characterised by a linear slot (the couple dances on a line rather than in a circle), theatrical styling, high energy turns, and clean lines. This is the primary style taught at Pura Nights.</p>

            <p><strong>ON2 — NEW YORK STYLE (MAMBO)</strong><br/>More deeply connected to the jazz and mambo traditions, On2 breaks on beat 2. Often considered more musical and sophisticated. Requires a stronger understanding of the clave. Popular in competitive and performance Salsa circles.</p>

            <p><strong>CUBAN SALSA (CASINO)</strong><br/>Danced in a circular pattern rather than a slot, with both partners rotating around each other. Deeply rooted in Afro-Cuban tradition, with more playful, rounded movements. Very popular in Cuba, Spain, and parts of Latin America.</p>

            <p><strong>COLOMBIAN SALSA (CALI STYLE)</strong><br/>Rapid, intricate footwork with minimal upper body movement. Partners stay close, footwork is the star. Danced at speed, spectacular to watch, challenging to learn.</p>

            <p><strong>RUEDA DE CASINO</strong><br/>A group format of Cuban Salsa — a circle of couples who all rotate partners and perform the same moves simultaneously, called out by a "caller" (cantante). Spectacular at social events.</p>

            <p>At Pura Nights, we focus on <strong>ON1 CROSSBODY SALSA</strong> — the most versatile style that allows you to dance at any social in the world.</p>

            <BlogCTA variant="classes" />

            <h2>Understanding Salsa Music — The Clave</h2>

            <p>The single most important concept in Salsa is the CLAVE — a two-bar rhythmic pattern that underlies everything in Salsa music. The word "clave" means "key" in Spanish, and that is exactly what it is: the key that unlocks how the music is structured.</p>

            <p>The clave comes in two forms:</p>
            <ul>
              <li><strong>3-2 Clave:</strong> Three hits in bar one, two hits in bar two</li>
              <li><strong>2-3 Clave:</strong> Two hits in bar one, three hits in bar two</li>
            </ul>

            <p>When you start dancing On1 at Pura Nights, one of the first things Melitta teaches is how to hear the clave and find the "1" — the first beat of the bar. Once you can feel it, everything else locks into place: your footwork, your turns, your connection with a partner.</p>

            <p>Salsa music is built from layers: bass establishes the harmonic foundation, congas play the tumbao pattern, timbales drive transitions, piano plays the montuno, brass punctuates and responds to the voice, and the vocals deliver the emotional heart — often in call-and-response with the coro.</p>

            <h2>What You'll Learn in Your First Salsa Classes</h2>

            <p><strong>Week 1–2 (BEGINNERS):</strong></p>
            <ul>
              <li>The basic step: forward-back weight transfer timed to the beat</li>
              <li>Finding the "1" — hearing the Salsa timing in the music</li>
              <li>The salsa frame: how partners connect without gripping</li>
              <li>First crossbody lead: the foundational partner move in On1</li>
              <li>Right turn (leader) and right turn (follower)</li>
            </ul>

            <p><strong>Week 3–4:</strong></p>
            <ul>
              <li>Left turn and cross-body with inside turn</li>
              <li>Basic footwork on the spot (shines)</li>
              <li>Multiple turn combinations</li>
              <li>First taste of styling: arm styling for followers, footwork for leaders</li>
            </ul>

            <p><strong>Week 5–8 (IMPROVERS):</strong></p>
            <ul>
              <li>Enchufla — a turn pattern from the wrap position</li>
              <li>Opposition turns (180-degree direction change)</li>
              <li>Styling sequences (footwork, body movement, shoulder rolls)</li>
              <li>Musicality: listening to the song's structure (verse, chorus, break)</li>
            </ul>

            <h2>Is Salsa Hard to Learn?</h2>

            <p>Honest answer: Salsa has a learning curve, but it is absolutely learnable by anyone with patience and regular practice. The biggest barrier is not coordination — it is learning to listen to the music differently than you normally do.</p>

            <p>Most people feel comfortable on the social dance floor within 8–12 weeks of consistent weekly classes. The key word is "consistent" — missing classes regularly will significantly slow your progress. With a 5 or 10-class bundle at Pura Nights, you can lock in your learning pace and track your improvement week by week.</p>

            <p>The social after the class is as important as the class itself. This is where the learning becomes embodied — you apply everything in a real dance floor context with different partners, different heights, different styles. Most students say the social is where it finally "clicked."</p>

            <h2>Why Learn Salsa at Pura Nights?</h2>

            <p>Melitta Siomos has spent 15+ years teaching Salsa and Bachata professionally, performing internationally, and building one of West London's most beloved Latin dance communities. The Pura Nights difference:</p>

            <ul>
              <li>✅ Award-winning instructor — internationally recognised</li>
              <li>✅ No partner needed — we rotate partners in every class</li>
              <li>✅ Three levels every week — Beginners, Improvers, Intermediate</li>
              <li>✅ Community — students return week after week for the people they meet</li>
              <li>✅ Two venues — Mondays in Chiswick, Tuesdays in Ealing</li>
              <li>✅ Monthly Latin Fridays — proper social events to practise</li>
            </ul>

            {/* In-article CTA */}
            <div className="not-prose my-12 bg-primary rounded-2xl p-8 text-center">
              <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">Ready to Try a Class?</h3>
              <p className="text-primary-foreground/80 font-heading text-sm mb-5">Join Pura Nights in Chiswick or Ealing — no partner needed</p>
              <Link to="/prices" className="btn-cta-dark inline-block">Book Your First Class</Link>
            </div>

            <h2>FAQ — Salsa Classes in London</h2>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <Accordion type="multiple" className="mb-10">
            {[
              { q: "Do I need a partner to learn salsa?", a: "No. At Pura Nights we rotate partners throughout the class. Many of our most dedicated students come solo and dance with everyone. It actually makes you a better dancer faster." },
              { q: "How long does it take to learn salsa?", a: "Most people feel confident on the social floor within 8–12 weeks. With a 10-class bundle you'll progress significantly faster as your attendance becomes consistent." },
              { q: "What shoes should I wear to salsa class?", a: "Trainers with a flat sole are perfect for beginners. As you progress, Latin dance shoes with a suede sole make pivoting and turning dramatically easier." },
              { q: "What level should I join as a beginner?", a: "Beginners class starts from zero every week. No prior experience is assumed." },
              { q: "Where are Pura Nights salsa classes held?", a: "Mondays at The George IV, 185 Chiswick High Rd, London W4 2DR. Tuesdays at The Drayton Court Hotel, 2 The Avenue, Ealing, London W13 8PH." },
              { q: "How much do salsa classes cost?", a: "Drop-in from £10. 5-class bundles from £42. Full pricing at our prices page." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="font-heading font-semibold text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mb-10">
            <Link to="/pura-nights" className="btn-cta-primary inline-block">Ready to start? Join a Beginners Class →</Link>
          </div>

          <AuthorCard />

          <div className="mt-10">
            <h3 className="font-display text-xl font-bold mb-4">Related Posts</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { slug: "what-is-bachata", title: "What is Bachata Dance?", cat: "Bachata" },
                { slug: "salsa-vs-bachata", title: "Salsa vs Bachata — Which First?", cat: "Beginners" },
                { slug: "beginners-guide-salsa-london", title: "Beginner's Guide to Salsa in London", cat: "Beginners" },
              ].map(p => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="bg-card rounded-xl p-4 card-hover">
                  <span className="text-primary text-xs font-heading font-bold">{p.cat}</span>
                  <p className="font-heading font-semibold text-sm mt-1">{p.title}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 bg-primary rounded-2xl p-6 text-center">
            <p className="text-primary-foreground font-heading font-semibold mb-3">Loved this? Share it on WhatsApp</p>
            <a href={`https://wa.me/?text=${encodeURIComponent("What is Salsa Dance? https://www.puranights.com/blog/what-is-salsa")}`} target="_blank" rel="noopener noreferrer" className="btn-cta-dark inline-block">Share on WhatsApp 💬</a>
          </div>
        </FadeInUp>
      </div>
    </article>
  </Layout>
);

export default WhatIsSalsa;
