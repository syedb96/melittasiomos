import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import BlogCTA from "@/components/BlogCTA";
import BlogPostFooter from "@/components/BlogPostFooter";

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Survive (and Enjoy) Your First Salsa Class in London",
  description: "Step-by-step guide to attending your first beginner salsa class in London with zero experience.",
  totalTime: "PT2H30M",
  step: [
    { "@type": "HowToStep", name: "Wear comfortable clothes", text: "Wear something you can move in. Bring clean indoor shoes with a smooth sole." },
    { "@type": "HowToStep", name: "Arrive 10 minutes early", text: "Get to the venue 10 minutes before class starts so you can settle in." },
    { "@type": "HowToStep", name: "Pay £10 on the door", text: "Your first beginners class is £10. No advance booking needed." },
    { "@type": "HowToStep", name: "Join the 30-minute beginners class", text: "Learn the basic step, timing, and your first partner moves. Partners rotate." },
    { "@type": "HowToStep", name: "Stay for social dancing", text: "From 9–11 PM the floor opens for relaxed social dancing." },
  ],
};

const FirstSalsaClass = () => (
  <Layout>
    <SeoHead
      title="Your First Salsa Class in London: What to Expect | Pura Nights"
      description="Nervous about your first salsa class? Here's exactly what happens at a beginner salsa class in London — from walking in to dancing your first steps."
      path="/blog/first-salsa-class-london"
      schema={howToSchema}
    />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Beginners</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Beginners</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Your First Salsa Class in London: What to Expect</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Jun 2025</span><span>·</span><span>7 min read</span></div>
            <SocialShareButtons title="Your First Salsa Class in London" path="/blog/first-salsa-class-london" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <FadeInUp>
            <p className="text-muted-foreground leading-relaxed mb-6">Walking into your first salsa class can feel daunting — especially if you've never danced before. But here's the truth: every single person in that room was once exactly where you are now. At Pura Nights, we welcome complete beginners every single week, and our classes are designed to make that first step as easy and enjoyable as possible.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Before You Arrive</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">You don't need to prepare anything special. Wear comfortable clothes you can move in — jeans or leggings, a top you feel good in, and clean indoor shoes with a smooth sole. Trainers work fine for your first class. Avoid shoes with rubber soles that grip the floor, as you'll need to pivot and turn.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">Arrive about 10 minutes early so you can settle in, say hello, and get comfortable with the space. At our Monday Chiswick venue (The George IV), we have a bar area where you can grab a drink before class starts. Tuesday at the Drayton Court in Ealing has the same relaxed atmosphere.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">What Happens in the Beginners Class</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">The beginners class runs for 30 minutes and covers the absolute fundamentals: the basic step, timing (dancing to the beat), and your first simple partner moves. Melitta breaks everything down slowly and clearly, demonstrating each move from multiple angles.</p>
            <p className="text-muted-foreground leading-relaxed mb-4">You'll rotate partners throughout the class — this is standard practice in social dance. It helps you learn to lead or follow with different people, and it means you absolutely don't need to bring a partner. Most of our students come solo.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">The atmosphere is warm, encouraging, and never competitive. Everyone is there to learn and have fun. Laughter is normal. Making mistakes is expected. That's how you improve.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">After the Class: Social Dancing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">From 9:00 to 11:00 PM, the floor opens up for social dancing — a mix of Salsa, Bachata, and Merengue. This is where you practise what you've learned in a relaxed, no-pressure environment. You don't have to dance if you're not ready — watching and absorbing the music is part of the experience too.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">Many of our experienced students actively seek out beginners to dance with during the social. It's part of the Pura Nights culture — we lift each other up.</p>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Common First-Class Worries (Answered Honestly)</h2>
            <div className="space-y-4 mb-8">
              {[
                { q: "\"I have no rhythm\"", a: "Rhythm is learned, not inherited. Salsa music has a clear beat, and within a few weeks you'll feel it naturally." },
                { q: "\"I'll look silly\"", a: "Everyone feels this way at first. Within 15 minutes, you'll be too focused on learning to worry about how you look." },
                { q: "\"I'm too old\"", a: "Our students range from 20 to 65+. Latin dance is for everyone." },
                { q: "\"I don't know anyone\"", a: "Neither did anyone else on their first night. The partner rotation and social floor mean you'll meet people quickly." },
              ].map((item, i) => (
                <div key={i} className="bg-card rounded-lg p-4">
                  <p className="font-heading font-semibold text-sm mb-1">{item.q}</p>
                  <p className="text-muted-foreground text-sm">{item.a}</p>
                </div>
              ))}
            </div>

            <h2 className="font-display text-2xl font-bold mb-4 mt-10">Ready to Try?</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">Your first class costs just £10 (single class) or £15 (two classes plus social). No advance booking required for your first visit — just turn up. But if you'd like to reserve your spot, you can book through our Linktree.</p>
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book Your First Class</a>
              <Link to="/start-here" className="text-primary font-heading font-semibold text-sm">Read the Full Start Here Guide →</Link>
            </div>

            <AuthorCard />

            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-display text-lg font-bold mb-4">Related Articles</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog/what-is-salsa" className="text-primary hover:underline font-heading">What is Salsa Dance? →</Link></li>
                <li><Link to="/blog/what-to-wear-salsa-bachata" className="text-primary hover:underline font-heading">What to Wear to Salsa & Bachata Class →</Link></li>
                <li><Link to="/blog/salsa-no-partner" className="text-primary hover:underline font-heading">Can You Learn Salsa Without a Partner? →</Link></li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm pt-0">
        <BlogPostFooter related={[
          { to: "/blog/what-is-salsa", title: "What is Salsa Dance?", category: "Beginners", readTime: "6 min" },
          { to: "/blog/what-to-wear-salsa-bachata", title: "What to Wear to Salsa & Bachata", category: "Beginners", readTime: "5 min" },
          { to: "/blog/salsa-no-partner", title: "Can You Learn Salsa Without a Partner?", category: "Beginners", readTime: "5 min" },
        ]} />
      </section>
    </article>
  </Layout>
);

export default FirstSalsaClass;
