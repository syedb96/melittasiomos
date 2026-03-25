import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";

const tips = [
  { n: 1, title: "Start Earlier Than You Think", text: "Most couples underestimate how much time they need. We recommend starting at least 6–8 weeks before your wedding — ideally 10–12 weeks if you want a polished routine. This gives you enough time to learn, practise, and feel genuinely confident without cramming." },
  { n: 2, title: "Choose Your Song First", text: "The choreography follows the music, not the other way around. Pick a song that means something to both of you. Consider the tempo, length, and mood. Melitta can help you edit the track if it's too long or needs a dramatic ending." },
  { n: 3, title: "Don't Try to Be Perfect — Aim for Natural", text: "Your guests don't expect Strictly Come Dancing. They want to see you happy, connected, and having fun. A simple, heartfelt dance performed with confidence will always outshine a complicated routine danced with anxiety." },
  { n: 4, title: "Wear Your Wedding Shoes in Practice", text: "This is crucial. Practise in your actual wedding shoes for at least 2–3 sessions before the big day. You need to know how they feel, how they grip (or don't), and whether you can turn in them. Brides: if you're wearing heels, you need to practise in heels." },
  { n: 5, title: "Decide on Style Early", text: "Do you want a simple, elegant sway? A romantic waltz? A surprise Latin routine? A fun mash-up? Decide early so every session builds towards the same vision. Melitta will guide you based on your abilities and preferences." },
  { n: 6, title: "Practice in Your Actual Venue", text: "If possible, do at least one practice session in the space where you'll perform. The floor surface, the space available, the lighting — all of these affect how your dance feels. If you can't access the venue, recreate the approximate space at home." },
  { n: 7, title: "Film Your Practice Sessions", text: "Video is the most powerful learning tool. Melitta records key sections and sends them to you between lessons. Watching yourself dance shows you things you can't feel — posture, timing, facial expressions. It accelerates progress dramatically." },
  { n: 8, title: "Breathe — The Big Day Always Goes Better Than Rehearsal", text: "Every single couple Melitta has worked with has said the same thing: 'It went so much better than we expected.' The adrenaline, the cheering guests, the love in the room — it all lifts you up. Trust the preparation and enjoy the moment." },
  { n: 9, title: "Have a Simplified Backup Version", text: "Wedding-day nerves are real. Melitta always prepares a simplified version of your routine — the key moments, the big moves, the finale — so even if you forget a section, you can fall back on the highlights and still look amazing." },
  { n: 10, title: "Trust Your Instructor — And Enjoy the Process", text: "Learning your wedding dance should be fun. It's a shared experience that brings you closer together as a couple. Don't stress about perfection. Trust Melitta's expertise, show up with enthusiasm, and let the magic happen." },
];

const WeddingFirstDanceTips = () => (
  <Layout>
    <SeoHead title="10 Tips for a Perfect Wedding First Dance | Melitta Siomos London" description="Expert tips from award-winning instructor Melitta Siomos on how to prepare a stunning wedding first dance. Tailored lessons available in London." path="/blog/wedding-first-dance-tips" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "10 Tips for the Perfect Wedding First Dance", author: { "@type": "Person", name: "Melitta Siomos" }, datePublished: "2025-02-15" }} />

    <article className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <nav className="text-xs text-muted-foreground mb-8 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Wedding First Dance Tips</span></nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">10 Tips for the Perfect Wedding First Dance</h1>
          <p className="text-muted-foreground text-sm mb-8 font-heading">By Melitta Siomos · 15 February 2025 · 6 min read</p>
          <div className="h-1 w-20 bg-primary rounded-full mb-10" />
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="prose prose-lg max-w-none text-foreground">
            <p className="text-muted-foreground leading-relaxed mb-6">Your wedding first dance is one of the most photographed, filmed, and remembered moments of your entire celebration. As someone who has helped dozens of couples prepare their first dance — from two-left-feet beginners to couples wanting a show-stopping performance — here are my 10 essential tips for making it perfect.</p>

            {tips.map((tip) => (
              <div key={tip.n} className="mb-8">
                <h2 className="font-display text-xl font-bold mb-2">
                  <span className="text-primary">{tip.n}.</span> {tip.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{tip.text}</p>
              </div>
            ))}

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Bonus: The Most Popular Wedding Dance Styles</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">Based on the couples I've worked with, here are the most requested styles:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-6">
              <li><strong>Romantic slow dance:</strong> Simple, elegant, minimal choreography. Great for nervous couples.</li>
              <li><strong>Classic waltz:</strong> Timeless, graceful, works beautifully with traditional venues.</li>
              <li><strong>Latin surprise (Salsa/Bachata):</strong> Start slow, then surprise your guests with a Latin routine. Crowd favourite!</li>
              <li><strong>Fun mash-up:</strong> Multiple songs, genre switches, gets the whole room laughing and cheering.</li>
              <li><strong>Full show-stopper:</strong> Theatrical, polished, with lifts and dramatic moments. For couples who want to dazzle.</li>
            </ul>

            <div className="bg-card rounded-2xl p-8 card-hover text-center mt-10">
              <h2 className="font-display text-2xl font-bold mb-3">Ready to Start Planning Your Dance?</h2>
              <p className="text-muted-foreground mb-6">Book a free consultation with Melitta and let's create something unforgettable.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20love%20to%20enquire%20about%20Wedding%20Dance%20coaching" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">💬 WhatsApp Melitta</a>
                <Link to="/wedding-dance" className="btn-cta-dark text-sm">View Wedding Packages</Link>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </article>
  </Layout>
);

export default WeddingFirstDanceTips;
