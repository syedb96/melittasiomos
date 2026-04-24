import { Link } from "react-router-dom";
import { Star, Award, Users, Heart, MapPin, ExternalLink, Quote, Shield, GraduationCap } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem, ScaleIn } from "@/components/animations";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import VideoTestimonials from "@/components/VideoTestimonials";

/* <!-- WIX PAGE: /proof-centre -->
   <!-- WIX SECTION: Hero — Strip with cinematic dark background -->
   <!-- WIX SECTION: Trust Stats — Icon grid strip -->
   <!-- WIX SECTION: Google Reviews — Repeater connected to Testimonials collection filtered by source_type = 'google' -->
   <!-- WIX SECTION: Student Stories — Repeater connected to Testimonials collection, grouped by context_label -->
   <!-- WIX SECTION: Awards & Credentials — Static content strip -->
   <!-- WIX SECTION: Brand Verification — Google Business links strip -->
   <!-- WIX SECTION: Video Testimonials — Wix Video or embed strip -->
   <!-- WIX SECTION: CTA — Book your first class strip -->
*/

const proofSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Proof Centre — Reviews, Awards & Social Proof",
  description: "See why 500+ students trust Melitta Siomos and Pura Nights for Salsa and Bachata in West London. Google reviews, awards, student stories, and verified credentials.",
  url: "https://www.puranights.com/proof-centre",
  mainEntity: {
    "@type": "DanceSchool",
    name: "Pura Nights — Melitta Siomos Dance Academy",
    url: "https://www.puranights.com",
    award: "Bachata UK Champion",
    founder: { "@type": "Person", name: "Melitta Siomos", jobTitle: "Award-Winning Salsa & Bachata Dance Instructor" },
  },
};

const trustStats = [
  { icon: GraduationCap, value: "15+", label: "Years Teaching", detail: "Since 2010" },
  { icon: Users, value: "500+", label: "Students Taught", detail: "And counting" },
  { icon: Award, value: "UK", label: "Bachata Champion", detail: "National title holder" },
  { icon: Star, value: "5.0", label: "Google Rating", detail: "Across all 4 brands" },
  { icon: Heart, value: "7", label: "Pura Ladies Teams", detail: "4 countries worldwide" },
  { icon: Shield, value: "4", label: "Verified Google Profiles", detail: "All 5-star rated" },
];

const studentStories = [
  {
    category: "Beginners",
    quotes: [
      { text: "I walked in knowing nothing and within a month I was dancing socially. Melitta makes every beginner feel welcome.", name: "James T.", context: "Complete beginner, joined 2024" },
      { text: "I was terrified of looking silly. By the second class I realised nobody cares — everyone's there to have fun.", name: "Priya K.", context: "Beginner, Ealing Tuesdays" },
    ],
  },
  {
    category: "Weekly Classes",
    quotes: [
      { text: "Monday nights at The George IV are the highlight of my week. Great music, great people, and Melitta pushes you just the right amount.", name: "Daniel F.", context: "Improver, Chiswick Mondays" },
      { text: "I've been coming for 3 years and still learn something new every single week.", name: "Rachel S.", context: "Advanced, both venues" },
    ],
  },
  {
    category: "Wedding Dance",
    quotes: [
      { text: "Melitta choreographed our wedding dance. Our guests loved our performance and we will never forget that moment.", name: "Sofia & Patrizio", context: "Wedding 2022" },
      { text: "We had 6 sessions and went from 'we can't dance' to getting a standing ovation. Melitta is a miracle worker.", name: "Emma & Tom", context: "Wedding 2023" },
    ],
  },
  {
    category: "Pura Ladies",
    quotes: [
      { text: "Pura Ladies has genuinely changed my confidence. Not just on the dance floor — in everything.", name: "Aisha T.", context: "Pura Ladies London" },
      { text: "I've been a student of Melitta for over 7 years and she is still my favourite instructor.", name: "Lucia R.", context: "Pura Ladies Munich" },
    ],
  },
  {
    category: "Private Lessons",
    quotes: [
      { text: "One private session with Melitta was worth more than a month of group classes. She identified exactly what I needed.", name: "Mark H.", context: "Private coaching, 2024" },
    ],
  },
];

const ProofCentre = () => (
  <Layout>
    <SeoHead
      title="Proof Centre — Reviews, Awards & Trust | Pura Nights"
      description="See why 500+ students trust Melitta Siomos for Salsa & Bachata in West London. 5-star Google reviews, UK Bachata Champion, verified credentials, and real student stories."
      path="/proof-centre"
      schema={proofSchema}
      noindex
    />

    {/* HERO */}
    <section className="section-padding section-dark text-center">
      <div className="container-main">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Verified · Trusted · Award-Winning</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            Why 500+ Students Trust Pura Nights
          </h1>
          <p className="text-primary-foreground/60 max-w-2xl mx-auto font-heading text-sm leading-relaxed">
            Real reviews. Real awards. Real stories from real students. This is the proof behind the promise — 
            everything you need to know before your first class.
          </p>
        </FadeInUp>
      </div>
    </section>

    {/* TRUST STATS */}
    <section className="py-12 bg-card border-b border-border">
      <div className="container-main">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6" staggerDelay={0.08}>
          {trustStats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="text-center">
                <stat.icon size={28} className="mx-auto text-primary mb-2" />
                <p className="font-display text-2xl font-bold">{stat.value}</p>
                <p className="font-heading text-xs font-semibold text-foreground">{stat.label}</p>
                <p className="text-muted-foreground text-[10px] font-heading mt-0.5">{stat.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* GOOGLE REVIEWS HIGHLIGHT */}
    <section className="section-padding section-warm">
      <div className="container-main">
        <FadeInUp>
          <div className="text-center mb-10">
            <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-2">Google Reviews</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">5.0 Stars Across All 4 Brands</h2>
            <p className="text-muted-foreground text-sm font-heading">Verified reviews on Google Business — we never pay for reviews or ratings.</p>
          </div>
        </FadeInUp>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto" staggerDelay={0.1}>
          {[
            { name: "Pura Nights", sub: "Weekly Classes", url: "https://maps.google.com/?q=Pura+Nights+Salsa+Bachata+London" },
            { name: "Wedding Dance Made Easy", sub: "First Dance Coaching", url: "https://maps.google.com/?q=Wedding+Dance+Made+Easy+Melitta+Siomos+London" },
            { name: "Pura Ladies", sub: "Performance Company", url: "https://maps.google.com/?q=Pura+Ladies+Dance+Company+London" },
            { name: "Melitta Siomos", sub: "Dance Academy", url: "https://maps.google.com/?q=Melitta+Siomos+Dance+Academy+London" },
          ].map((brand) => (
            <StaggerItem key={brand.name}>
              <a href={brand.url} target="_blank" rel="noopener noreferrer" className="bg-card rounded-2xl p-5 card-hover text-center block h-full group border border-border">
                <div className="flex justify-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, j) => <Star key={j} size={12} className="fill-primary text-primary" />)}
                </div>
                <h3 className="font-heading font-bold text-sm mb-0.5 group-hover:text-primary transition-colors">{brand.name}</h3>
                <p className="text-muted-foreground text-[10px] font-heading mb-2">{brand.sub}</p>
                <span className="text-primary text-[10px] font-heading font-semibold inline-flex items-center gap-0.5">Read on Google <ExternalLink size={8} /></span>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* AWARDS & CREDENTIALS */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-4xl text-center">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-2">Awards & Credentials</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-8">Award-Winning Instruction</h2>
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {[
            { icon: Award, title: "UK Bachata Champion", desc: "National title holder — competing at the highest level" },
            { icon: GraduationCap, title: "15+ Years Teaching", desc: "Teaching since 2010 across London, Europe, and internationally" },
            { icon: Users, title: "7 Pura Ladies Teams", desc: "Performance teams in London, Plymouth, Munich, and Lisbon" },
          ].map((cred) => (
            <StaggerItem key={cred.title}>
              <div className="bg-charcoal-light rounded-2xl p-6 border border-primary-foreground/5">
                <cred.icon size={32} className="mx-auto text-primary mb-3" />
                <h3 className="font-heading font-bold text-primary-foreground text-sm mb-2">{cred.title}</h3>
                <p className="text-primary-foreground/50 text-xs font-heading">{cred.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* STUDENT STORIES BY CATEGORY */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-5xl">
        <FadeInUp>
          <div className="text-center mb-10">
            <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-2">Real Student Voices</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Stories From Every Level</h2>
            <p className="text-muted-foreground text-sm font-heading">Grouped by experience — find voices that match your journey.</p>
          </div>
        </FadeInUp>
        <div className="space-y-10">
          {studentStories.map((group) => (
            <FadeInUp key={group.category}>
              <h3 className="font-display text-lg font-bold mb-4 border-b border-border pb-2">{group.category}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {group.quotes.map((q) => (
                  <div key={q.name} className="bg-card rounded-xl p-5 border border-border">
                    <Quote size={18} className="text-primary/30 mb-2" />
                    <p className="text-foreground text-sm leading-relaxed mb-3 italic">"{q.text}"</p>
                    <div>
                      <p className="font-heading font-semibold text-xs">{q.name}</p>
                      <p className="text-muted-foreground text-[10px] font-heading">{q.context}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* TESTIMONIALS CAROUSEL */}
    <section className="section-padding section-dark">
      <div className="container-main">
        <FadeInUp>
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-2">More Reviews</h2>
            <p className="text-primary-foreground/50 text-sm font-heading">Swipe through more student testimonials</p>
          </div>
        </FadeInUp>
        <TestimonialsCarousel />
      </div>
    </section>

    <VideoTestimonials />

    {/* RELATED SERVICES */}
    <section className="px-4 py-12 md:px-8 lg:px-16 lg:py-16 section-warm">
      <div className="container-main max-w-4xl">
        <h2 className="font-display text-xl md:text-2xl font-bold mb-5 text-center">Explore Our Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { to: "/wedding-dance", label: "Wedding Dance", desc: "See why couples trust Melitta for their first dance" },
            { to: "/private-lessons", label: "Private Lessons", desc: "1-to-1 coaching tailored to your goals" },
            { to: "/pura-ladies", label: "Pura Ladies", desc: "7 teams, 4 countries — join the movement" },
            { to: "/meet-the-team", label: "Meet the Team", desc: "8 professional instructors behind the magic" },
            { to: "/pura-nights", label: "Weekly Classes", desc: "Mon Chiswick · Tue Ealing · All levels" },
            { to: "/start-here", label: "New? Start Here", desc: "First-timer guide and reassurance" },
          ].map((link) => (
            <Link key={link.to} to={link.to} className="group bg-card rounded-xl px-4 py-3.5 card-hover flex items-start gap-2.5 border border-border hover:border-primary transition-colors">
              <span className="text-primary mt-0.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform">→</span>
              <div>
                <span className="font-heading font-semibold text-sm leading-snug group-hover:text-primary transition-colors">{link.label}</span>
                <p className="text-muted-foreground text-xs mt-0.5 leading-snug">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-12 text-center" style={{ background: "var(--gradient-gold)" }}>
      <div className="container-main">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-2">Ready to Experience It Yourself?</h2>
        <p className="text-charcoal/70 text-sm font-heading mb-6 max-w-lg mx-auto">All levels welcome. No partner needed. Join 500+ students who already love it.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm">🎟 Book Your First Class</a>
          <Link to="/start-here" className="btn-cta-dark text-sm">New? Start Here</Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default ProofCentre;
