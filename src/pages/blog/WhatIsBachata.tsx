import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";

const WhatIsBachata = () => (
  <Layout>
    <SeoHead
      title="What is Bachata Dance? History, Styles & How to Learn | London"
      description="Explore Bachata dance — from its Dominican Republic origins to Bachata Sensual. Learn all styles at Pura Nights in London. All levels welcome."
      path="/blog/what-is-bachata"
      schema={{ "@context": "https://schema.org", "@type": "Article", headline: "What is Bachata Dance? From Dominican Roots to Bachata Sensual", author: { "@type": "Person", name: "Melitta Siomos" }, datePublished: "2025-01-20" }}
    />

    <article className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <nav className="text-xs text-muted-foreground mb-8 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">What is Bachata?</span></nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">What is Bachata Dance? From Dominican Roots to Bachata Sensual</h1>
          <p className="text-muted-foreground text-sm mb-8 font-heading">By Melitta Siomos · 20 January 2025 · 8 min read</p>
          <div className="h-1 w-20 bg-primary rounded-full mb-10" />
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="prose prose-lg max-w-none text-foreground">
            <p className="text-muted-foreground leading-relaxed mb-6">Bachata is one of the most romantic, expressive, and rapidly growing social dances in the world. From its humble origins in the rural barrios of the Dominican Republic to the dance floors of London, Berlin, and Sydney, Bachata has evolved into a global phenomenon that captivates dancers of every level. But where did it come from, how has it changed, and what makes it so special?</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Bachata's Origins in the Dominican Republic</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Bachata was born in the rural areas and shanty towns of the Dominican Republic in the 1960s. Initially dismissed by the elite as "música de amargue" (music of bitterness), it was raw, emotional, and deeply personal — characterised by acoustic guitar, bongo, and heartfelt vocals about love, heartbreak, and longing.</p>
            <p className="text-muted-foreground leading-relaxed mb-4">The music was considered lower-class and was banned from radio stations for decades. Artists like José Manuel Calderón, Leonardo Paniagua, and later Luis Vargas and Antony Santos kept the genre alive in rural communities and urban barrios, performing at informal gatherings and street parties.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">Everything changed in the 1990s when Juan Luis Guerra's album "Bachata Rosa" brought the genre international recognition and mainstream acceptance. Suddenly, Bachata was no longer marginalised — it was celebrated, and its evolution as a dance form accelerated dramatically.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Evolution of Bachata Styles</h2>

            <h3 className="font-heading font-bold text-lg mt-6 mb-2">Traditional Bachata (Dominican)</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">The original form — tight, close embrace, small steps, deeply rooted in the Dominican street dance tradition. Characterised by hip movements, subtle footwork, and a raw, unpolished authenticity. The connection between partners is intimate and the movements are compact.</p>

            <h3 className="font-heading font-bold text-lg mt-6 mb-2">Bachata Moderna</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">Developed primarily in Europe (Spain and Italy), Moderna blends traditional Dominican footwork with influences from salsa, tango, and contemporary dance. Partners dance in a more open frame, execute cleaner lines, and incorporate cross-body leads and turn patterns borrowed from salsa. This is the bridge between traditional and sensual styles.</p>

            <h3 className="font-heading font-bold text-lg mt-6 mb-2">Bachata Sensual</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">Created by Korke & Judith in Cádiz, Spain, Bachata Sensual is characterised by fluid body waves, dramatic dips, sensual connection, and a slower, more cinematic musicality. It's the most expressive and body-aware of all Bachata styles, requiring strong body isolation, trust between partners, and musical interpretation. At its best, Bachata Sensual feels like a conversation between two bodies and the music.</p>

            <h3 className="font-heading font-bold text-lg mt-6 mb-2">Urban Bachata</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">A contemporary fusion incorporating hip-hop, R&B, and urban music influences. It brings a harder, edgier flavour to Bachata dancing with more groove-based movements and less traditional structure.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">At Pura Nights, we teach all core styles with particular emphasis on <strong>Moderna</strong> and <strong>Bachata Sensual</strong> — the two styles most requested at London socials.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">What Makes Bachata Unique</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">Bachata stands apart from other Latin dances for several reasons:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-6">
              <li>The side-step basic with a distinctive hip tap on beat 4</li>
              <li>Close partner connection and body awareness from the first lesson</li>
              <li>Emotional expression through movement — Bachata tells a story</li>
              <li>The sensual "wave" — a body roll shared between partners that creates flow</li>
              <li>Turn patterns at beats 5–8 that allow creative expression</li>
              <li>Musical interpretation — dancing to the lyrics, the guitar, and the emotion</li>
            </ul>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Bachata vs Salsa: Key Differences</h2>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-left border border-border rounded-xl overflow-hidden">
                <thead className="bg-primary/10"><tr><th className="p-3 font-heading"></th><th className="p-3 font-heading">Bachata</th><th className="p-3 font-heading">Salsa</th></tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border"><td className="p-3 font-semibold">Basic step</td><td className="p-3">Side-to-side</td><td className="p-3">Forward-back slot</td></tr>
                  <tr className="border-t border-border"><td className="p-3 font-semibold">Connection</td><td className="p-3">Close embrace</td><td className="p-3">Open/closed frame</td></tr>
                  <tr className="border-t border-border"><td className="p-3 font-semibold">Tempo</td><td className="p-3">Generally slower</td><td className="p-3">Generally faster</td></tr>
                  <tr className="border-t border-border"><td className="p-3 font-semibold">Origin</td><td className="p-3">Dominican Republic</td><td className="p-3">Cuba / Puerto Rico / NY</td></tr>
                  <tr className="border-t border-border"><td className="p-3 font-semibold">Mood</td><td className="p-3">Romantic, sensual</td><td className="p-3">Energetic, social</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How to Learn Bachata as a Beginner</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Bachata is widely considered easier to pick up than Salsa for most beginners. The basic step is intuitive, the tempo is forgiving, and the music is incredibly accessible. Many students find themselves falling in love with the dance within their very first class.</p>
            <p className="text-muted-foreground leading-relaxed mb-2">At Pura Nights, our beginners Bachata class covers:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-6">
              <li>The 4-beat basic step with tap — your rhythmic foundation</li>
              <li>Weight transfer and body movement — the key to looking natural</li>
              <li>First turns and travelling patterns</li>
              <li>Basic partner connection and lead/follow communication</li>
              <li>Introduction to body waves and musicality</li>
            </ul>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Where to Learn Bachata in London</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">London has one of the most vibrant Bachata scenes in Europe, and Pura Nights is at its heart. Led by award-winning instructor Melitta Siomos, our weekly classes offer three levels of Bachata instruction at two West London venues:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-6">
              <li><strong>Mondays:</strong> The George IV, 185 Chiswick High Rd, W4 2DR</li>
              <li><strong>Tuesdays:</strong> Drayton Court Hotel, 2 The Avenue, Ealing, W13 8PH</li>
            </ul>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">FAQs</h2>
            <div className="space-y-4 mb-8">
              {[
                { q: "Do I need to be flexible or fit to learn bachata?", a: "Not at all. Bachata is accessible to all body types and fitness levels. The movement develops naturally over time." },
                { q: "Is bachata sensual appropriate for beginners?", a: "We introduce sensual elements gradually. The focus is always on connection, communication, and comfort — not performance." },
              ].map((f) => (
                <details key={f.q} className="border-b border-border py-4">
                  <summary className="font-heading font-semibold cursor-pointer hover:text-primary">{f.q}</summary>
                  <p className="text-muted-foreground text-sm mt-2">{f.a}</p>
                </details>
              ))}
            </div>

            <div className="bg-card rounded-2xl p-8 card-hover text-center mt-10">
              <h2 className="font-display text-2xl font-bold mb-3">Join a Bachata Class in London</h2>
              <p className="text-muted-foreground mb-6">All levels welcome. No partner needed.</p>
              <Link to="/pura-nights" className="btn-cta-primary text-sm">Book Your First Class</Link>
            </div>
          </div>
        </FadeInUp>
      </div>
    </article>
  </Layout>
);

export default WhatIsBachata;
