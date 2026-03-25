import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";

const PuraLadiesStory = () => (
  <Layout>
    <SeoHead title="Pura Ladies Dance Company — Our Story | Founded by Melitta Siomos" description="How Pura Ladies grew from one London group to 7 teams across 4 countries. The story of community, confidence, and expression through dance." path="/blog/pura-ladies-story" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "The Story of Pura Ladies: Building a Global Women's Dance Community", author: { "@type": "Person", name: "Melitta Siomos" }, datePublished: "2025-03-01" }} />

    <article className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <nav className="text-xs text-muted-foreground mb-8 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">The Pura Ladies Story</span></nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">The Story of Pura Ladies: Building a Global Women's Dance Community</h1>
          <p className="text-muted-foreground text-sm mb-8 font-heading">By Melitta Siomos · 1 March 2025 · 7 min read</p>
          <div className="h-1 w-20 bg-primary rounded-full mb-10" />
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="prose prose-lg max-w-none text-foreground">
            <p className="text-muted-foreground leading-relaxed mb-6">Pura Ladies didn't begin with a business plan. It began with a feeling — the feeling that women's styling in Latin dance deserved its own stage, its own voice, and its own community. What started as a single group of passionate dancers in a London studio has grown into an international dance company spanning four countries and seven teams. This is our story.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Vision: Women's Styling Deserves Its Own Spotlight</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">In 2017, I noticed something that kept bothering me about the Latin dance scene: women's styling was always an afterthought. In a world dominated by partnerwork, the solo expression, creativity, and power that women bring to the dance floor was undervalued and under-supported.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">I wanted to create a space where women could come together to develop their own dance identity — their styling, their confidence, their artistry — without needing a partner. A space where the focus was entirely on them. That's how Pura Ladies was born.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The First London Team</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">The first Pura Ladies group was small — just eight women who believed in the vision. We rehearsed weekly in a small studio in West London, choreographing Bachata routines that blended technique with emotion, power with grace.</p>
            <p className="text-muted-foreground leading-relaxed mb-4">Our first performance was at a local social night. I was terrified. The team was terrified. But the moment we stepped onto that floor and the music started, something clicked. The audience went wild. Women in the crowd came up to us afterwards asking how they could join. That night, I knew we had something special.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">What I didn't know was just how far it would go.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Growth: From One Group to Seven Teams</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Within a year, we had more applicants than spots. I created a second London group, then a third. Each team had its own personality but shared the same values: excellence, sisterhood, and joy.</p>
            <p className="text-muted-foreground leading-relaxed mb-4">Then something unexpected happened. A dancer who had moved to Plymouth asked if she could start a Pura Ladies group there. Then Munich. Then Lisbon. Each new chapter was led by women who had been part of the London team and wanted to carry the energy into their own cities.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">Today, Pura Ladies has seven active teams across four countries: London (multiple groups), Plymouth, Munich, and Lisbon. Each team rehearses weekly, performs at events and festivals, and represents everything we stand for.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">What Makes Pura Ladies Different</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">There are other performance teams in the Latin dance world. What sets Pura Ladies apart is our philosophy:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
              <li><strong>It's not about perfection — it's about expression.</strong> We value authenticity over flawless execution. Every dancer brings her own personality to the choreography.</li>
              <li><strong>Community comes first.</strong> The friendships formed in Pura Ladies run deeper than dance. Our members support each other through life changes, career moves, and personal challenges.</li>
              <li><strong>All body types, all ages.</strong> We don't have a "look." We have a feeling. Pura Ladies welcomes women of every shape, size, background, and age.</li>
              <li><strong>Performance is our DNA.</strong> We don't just rehearse — we perform. At festivals, events, and socials across Europe. The stage is where we come alive.</li>
              <li><strong>Original team members are still here.</strong> Some of our founding members from 2017 are still active dancers and leaders. That kind of loyalty says everything.</li>
            </ul>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Stories from the Team</h2>
            <div className="space-y-6 mb-8">
              {[
                { name: "Aisha T.", text: "Pura Ladies has genuinely changed my confidence. Not just on the dance floor — in everything. I carry myself differently. I speak up more. The sisterhood we have is unlike anything I've experienced." },
                { name: "Maria K.", text: "I joined as a shy improver who could barely make eye contact during a social dance. Three years later, I've performed at international festivals and helped launch the Munich team. Melitta sees potential in you that you can't see yourself." },
                { name: "Sophie R.", text: "Being part of Pura Ladies gave me back something I'd lost — a sense of belonging and creative expression. Every Thursday rehearsal is the highlight of my week." },
              ].map((s) => (
                <blockquote key={s.name} className="bg-card rounded-2xl p-6 card-hover border-l-4 border-primary">
                  <p className="text-muted-foreground text-sm italic mb-2">"{s.text}"</p>
                  <cite className="text-primary font-heading text-xs font-semibold not-italic">— {s.name}</cite>
                </blockquote>
              ))}
            </div>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How to Join Pura Ladies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We hold auditions annually, typically in February. Here's what we look for:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-4">
              <li>🎯 Passion for Latin dance — above all else</li>
              <li>🤝 Team spirit and commitment to weekly rehearsals</li>
              <li>💃 Dance experience at improvers level or above</li>
              <li>⏰ Availability for weekly rehearsals and performances</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-6">You don't need to be an advanced dancer. You need heart, commitment, and a willingness to grow. The best preparation is attending regular Pura Nights classes to build your foundation and become part of the community.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Future of Pura Ladies</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">We're not done growing. My vision is to see Pura Ladies teams in every major European city — and eventually beyond. Each new team is a new community, a new sisterhood, a new group of women discovering their power through dance. If that resonates with you, I want to hear from you.</p>

            <div className="bg-card rounded-2xl p-8 card-hover text-center mt-10">
              <h2 className="font-display text-2xl font-bold mb-3">Want to Be Part of the Story?</h2>
              <p className="text-muted-foreground mb-6">Follow @puraladies on Instagram for audition announcements and behind-the-scenes content.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://www.instagram.com/puraladies/" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">📲 Follow @puraladies</a>
                <Link to="/pura-ladies" className="btn-cta-dark text-sm">Learn More About Pura Ladies</Link>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </article>
  </Layout>
);

export default PuraLadiesStory;
