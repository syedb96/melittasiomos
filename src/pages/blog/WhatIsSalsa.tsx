import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";

const WhatIsSalsa = () => (
  <Layout>
    <SeoHead
      title="What is Salsa Dance? Crossbody Style (On1) Complete Guide | London"
      description="Discover the history, technique, and styles of Salsa dance. Learn On1 Crossbody Salsa in London at Pura Nights. Classes for all levels — no partner needed."
      path="/blog/what-is-salsa"
      schema={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "What is Salsa Dance? The Complete Guide to On1 Crossbody Salsa",
        author: { "@type": "Person", name: "Melitta Siomos" },
        publisher: { "@type": "Organization", name: "Pura Nights" },
        datePublished: "2025-01-15",
      }}
    />

    <article className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <nav className="text-xs text-muted-foreground mb-8 font-heading">
            <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">What is Salsa?</span>
          </nav>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">What is Salsa Dance? The Complete Guide to On1 Crossbody Salsa</h1>
          <p className="text-muted-foreground text-sm mb-8 font-heading">By Melitta Siomos · 15 January 2025 · 8 min read</p>
          <div className="h-1 w-20 bg-primary rounded-full mb-10" />
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="prose prose-lg max-w-none text-foreground">
            <p className="text-muted-foreground leading-relaxed mb-6">Salsa is one of the most popular and exhilarating social dances in the world. Whether you've seen it performed on stage, at a wedding, or on the streets of Havana, there's something universally magnetic about its rhythm, energy, and connection. But what exactly is Salsa? Where did it come from? And how can you start learning it in London?</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Origins of Salsa Dance</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Salsa originated in Cuba and Puerto Rico in the early 20th century, born from a fusion of Son Cubano, Mambo, Cha-cha-chá, and African rhythmic traditions. The music blended African percussion instruments — congas, bongos, and timbales — with Spanish guitar and European melodic structures, creating something entirely new and electrifying.</p>
            <p className="text-muted-foreground leading-relaxed mb-4">By the 1940s and 50s, Cuban musicians had taken their sound to New York City, where it collided with jazz, swing, and the energy of the Latin diaspora. The Palladium Ballroom in Manhattan became the epicentre of this fusion, and what emerged was a dance form that would captivate the world.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">The term "salsa" itself — meaning "sauce" in Spanish — was popularised by Fania Records in the 1970s as an umbrella term for the various Latin music and dance styles coming out of New York. It stuck, and the rest is history.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Salsa Styles Explained</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Salsa isn't one monolithic style — it's a family of dance expressions, each with its own character. Here are the main ones you'll encounter:</p>

            <h3 className="font-heading font-bold text-lg mt-6 mb-2">On1 — Los Angeles / Crossbody Style</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">Partners break forward on beat 1 along a linear slot. This is the style we teach at Pura Nights — it's clean, theatrical, highly versatile, and the most widely danced style at socials worldwide. On1 emphasises sharp turns, dramatic styling, and a strong frame between partners.</p>

            <h3 className="font-heading font-bold text-lg mt-6 mb-2">On2 — New York Style</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">Breaking on beat 2 creates a smoother, more musical feel. Popularised by Eddie Torres, On2 is deeply connected to the conga rhythms and is the preferred style in competitive circles and New York's legendary social scene.</p>

            <h3 className="font-heading font-bold text-lg mt-6 mb-2">Cuban Salsa (Casino)</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">A circular style danced without a slot. Partners orbit around each other with Afro-Cuban body movement and complex arm patterns. It's deeply rooted in traditional Cuban culture and often danced in "rueda" formations.</p>

            <h3 className="font-heading font-bold text-lg mt-6 mb-2">Colombian Salsa (Caleña)</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">Originating from Cali, Colombia — the "Salsa Capital of the World" — this style features incredibly rapid footwork, compact movement, and minimal upper body motion. It's breathtaking to watch and requires remarkable foot speed.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Music: Understanding the Beat</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Salsa music is built around the clave — a 2-3 or 3-2 rhythmic pattern that drives everything. The clave is the heartbeat of the music, and learning to hear it is one of the most transformative moments in any salsa dancer's journey.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">You'll hear congas providing the rhythmic foundation, timbales adding punch and accents, piano providing the melodic structure (the "montuno"), bass locking in the groove, and brass sections delivering the energy. Learning to dance to the music — not just around it — is what separates good social dancers from great ones. At Pura Nights, musicality is a core part of our teaching from day one.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">What You'll Learn in Your First Salsa Classes</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">At Pura Nights, our beginners class covers:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-6">
              <li>Basic step timing on the beat — finding your rhythm</li>
              <li>The salsa slot (crossbody lead pattern) — the foundation of On1</li>
              <li>Turns: right turn, left turn, cross-body with turn</li>
              <li>Partnerwork fundamentals: frame, lead, follow, connection</li>
              <li>Shines (solo footwork) — expressing yourself independently</li>
              <li>Social floor etiquette and how partner rotation works</li>
            </ul>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Is Salsa Hard to Learn?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Not with the right teacher. Salsa has a learning curve — like any skill — but the fundamentals can be grasped in a single class. The basic step, timing, and your first turns are all achievable in your very first session.</p>
            <p className="text-muted-foreground leading-relaxed mb-4">The key is consistency. Regular attendance at weekly classes builds muscle memory fast. Most students at Pura Nights report feeling comfortable on the social floor within 8–12 weeks. With a 5 or 10-class bundle, your progression accelerates significantly because each session builds on the last.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">Melitta's teaching philosophy is rooted in making dance accessible: clear breakdowns, patient repetition, and a judgement-free environment where mistakes are celebrated as learning.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Where to Learn Salsa in London</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">London is one of the best cities in the world for social Latin dancing, with a thriving community of dancers, events, and schools. Pura Nights offers weekly Salsa classes at two West London venues:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-6">
              <li><strong>Mondays:</strong> The George IV, 185 Chiswick High Rd, W4 2DR</li>
              <li><strong>Tuesdays:</strong> Drayton Court Hotel, 2 The Avenue, Ealing, W13 8PH</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-6">Both nights feature three levels (Beginners, Improvers, Intermediate) followed by social dancing until 11 PM. Drop-in from £10, no booking required, and no partner needed.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              {[
                { q: "Do I need a partner to learn salsa?", a: "No. At Pura Nights we rotate partners throughout each class, so solo students are very much welcome and will dance with everyone." },
                { q: "How long does it take to learn salsa?", a: "Most students feel comfortable on the social floor within 8–12 weeks. With a bundle of classes you'll progress significantly faster." },
                { q: "What shoes do I need?", a: "Trainers are perfectly fine for beginners. As you progress, Latin dance shoes (suede-soled) make a big difference to your pivots and spins." },
              ].map((faq) => (
                <details key={faq.q} className="border-b border-border py-4">
                  <summary className="font-heading font-semibold cursor-pointer hover:text-primary">{faq.q}</summary>
                  <p className="text-muted-foreground text-sm mt-2">{faq.a}</p>
                </details>
              ))}
            </div>

            <div className="bg-card rounded-2xl p-8 card-hover text-center mt-10">
              <h2 className="font-display text-2xl font-bold mb-3">Ready to Start?</h2>
              <p className="text-muted-foreground mb-6">Join a beginners class in Chiswick or Ealing this week.</p>
              <Link to="/pura-nights" className="btn-cta-primary text-sm">Book Your First Class</Link>
            </div>
          </div>
        </FadeInUp>
      </div>
    </article>
  </Layout>
);

export default WhatIsSalsa;
