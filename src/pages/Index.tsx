import { Link } from "react-router-dom";
import { Star, Trophy, Users, GraduationCap, Heart, Clock, MapPin, ArrowDown, Gift, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import TrustTicker from "@/components/TrustTicker";
import { FadeInUp, StaggerContainer, StaggerItem, ScaleIn } from "@/components/animations";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-dance.jpg";
import melittaImg from "@/assets/melitta-portrait.jpg";
import weddingImg from "@/assets/wedding-dance.jpg";
import puraLadiesImg from "@/assets/pura-ladies.jpg";
import socialImg from "@/assets/social-dancing.jpg";

const testimonials = [
  { name: "Sarah M.", role: "Pura Nights Student", text: "I came in knowing absolutely nothing about dance. Three weeks later I was on the dance floor at a social and having the time of my life. Melitta's teaching style is so warm and clear." },
  { name: "James R.", role: "Pura Nights Student", text: "The Ealing classes are incredible value and the atmosphere is unlike anything else in London. Nobody judges you, everyone wants you to succeed." },
  { name: "Emma & Daniel", role: "Wedding Dance", text: "Our wedding first dance was a dream. Melitta made us feel so comfortable and our guests couldn't believe we pulled it off!" },
  { name: "Carlos L.", role: "Intermediate Student", text: "I've been dancing salsa for years and still learned so much in Melitta's intermediate class. The musicality focus alone is worth it." },
  { name: "Aisha T.", role: "Pura Ladies Member", text: "Pura Ladies has genuinely changed my confidence. Not just on the dance floor — in everything." },
  { name: "Marcus W.", role: "Chiswick Classes", text: "Booked a 5-class bundle and by class 3 I was completely hooked. Best £55 I've ever spent in London." },
];

const Index = () => (
  <Layout>
    <SeoHead
      title="Salsa & Bachata Classes London | Pura Nights by Melitta Siomos"
      description="Join London's award-winning Salsa & Bachata dance school. Weekly classes in Chiswick & Ealing, private lessons, wedding dance & performance teams. All levels welcome. Book today!"
      path="/"
    />

    {/* HERO */}
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <img src={heroImage} alt="Pura Nights salsa and bachata social dancing in London" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsla(0,0%,10%,0.45), hsla(0,0%,10%,0.75))' }} />
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
        >
          London's Home of Salsa & Bachata
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-heading text-base md:text-lg text-peach mb-10 max-w-2xl mx-auto font-light"
        >
          Weekly classes in Chiswick & Ealing · Private Lessons · Events · Wedding Dance
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/prices" className="btn-cta-primary text-sm">Book a Class</Link>
          <Link to="/pura-nights" className="btn-cta-ghost text-sm">Explore Classes</Link>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle text-primary/60"
      >
        <ArrowDown size={28} />
      </motion.div>
    </section>

    <TrustTicker />

    {/* BRAND INTRO */}
    <section className="section-padding section-warm">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <ScaleIn>
            <img src={melittaImg} alt="Melitta Siomos award-winning salsa and bachata instructor London" className="rounded-2xl w-full max-w-md mx-auto" width={800} height={1000} loading="lazy" style={{ boxShadow: 'var(--shadow-elevated)' }} />
          </ScaleIn>
          <FadeInUp delay={0.2}>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Who is Melitta?</h2>
            <div className="h-1 w-16 rounded-full mb-6" style={{ background: 'var(--gradient-gold)' }} />
            <p className="text-muted-foreground leading-relaxed mb-6">
              I'm Melitta Siomos — international award-winning Salsa & Bachata instructor, performer, and the founder of Pura Nights. I've spent 15+ years building one of London's most vibrant Latin dance communities, from packed weekly classes in Chiswick and Ealing to international performances across Europe.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex items-center gap-2"><span className="text-primary">✅</span> No partner needed — solo-friendly classes</li>
              <li className="flex items-center gap-2"><span className="text-primary">✅</span> Complete beginners welcome</li>
              <li className="flex items-center gap-2"><span className="text-primary">✅</span> 3 levels every week</li>
              <li className="flex items-center gap-2"><span className="text-primary">✅</span> Dance community you'll want to return to</li>
            </ul>
            <Link to="/about" className="text-primary font-heading font-semibold text-sm hover:opacity-80 transition-opacity inline-flex items-center gap-1">
              Meet Melitta <ChevronRight size={14} />
            </Link>
          </FadeInUp>
        </div>
      </div>
    </section>

    {/* OUR BRANDS — 4 Cards */}
    <section className="section-padding bg-card">
      <div className="container-main">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">Our Brands</h2>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.12}>
          {[
            { img: socialImg, title: "Pura Nights", desc: "Weekly Salsa & Bachata classes + socials in Chiswick & Ealing", link: "/pura-nights" },
            { img: puraLadiesImg, title: "Pura Ladies", desc: "Award-winning women's styling dance company — 7 teams, 4 countries", link: "/pura-ladies" },
            { img: weddingImg, title: "Wedding Dance Made Easy", desc: "Bespoke couples choreography for your perfect first dance", link: "/wedding-dance" },
            { img: melittaImg, title: "Private 1-on-1 Lessons", desc: "Tailored personal coaching at your own pace", link: "/private-lessons" },
          ].map((card, i) => (
            <StaggerItem key={i}>
              <Link to={card.link} className="relative group block rounded-2xl overflow-hidden h-72 card-hover">
                <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-lg font-bold text-primary-foreground mb-1">{card.title}</h3>
                  <p className="text-primary-foreground/70 text-xs mb-3">{card.desc}</p>
                  <span className="text-primary font-heading text-xs font-semibold inline-flex items-center gap-1">Explore <ChevronRight size={12} /></span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* WEEKLY SCHEDULE */}
    <section className="section-padding section-dark">
      <div className="container-main">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">Weekly Class Schedule</h2>
          <p className="text-primary-foreground/50 text-center text-sm mb-12 font-heading">No booking required for weekly classes — just turn up</p>
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" staggerDelay={0.2}>
          <StaggerItem>
            <div className="bg-charcoal-light rounded-2xl p-8 border border-primary/10">
              <h3 className="font-display text-2xl font-bold text-primary mb-2">Monday — Chiswick</h3>
              <p className="text-primary-foreground/50 text-sm mb-5 flex items-center gap-1"><MapPin size={14} /> The George IV, 185 Chiswick High Rd, W4 2DR</p>
              <div className="space-y-3 text-sm text-primary-foreground/70">
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" />7:30 PM — Beginners Salsa & Bachata</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" />8:00 PM — Improvers</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" />8:30 PM — Intermediate</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" />9:00–11:00 PM — Social Dancing</div>
              </div>
              <p className="text-primary-foreground/40 text-xs mt-5">💷 £15 (2 classes + social) · £10 (1 class) · £5 (social only)</p>
              <Link to="/prices" className="btn-cta-primary text-[10px] mt-5 py-2 px-5 rounded-lg">Book a Bundle</Link>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-charcoal-light rounded-2xl p-8 border border-peach/10">
              <h3 className="font-display text-2xl font-bold text-peach mb-2">Tuesday — Ealing</h3>
              <p className="text-primary-foreground/50 text-sm mb-5 flex items-center gap-1"><MapPin size={14} /> Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
              <div className="space-y-3 text-sm text-primary-foreground/70">
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" />6:50–7:20 PM — Free Ladies Styling</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" />7:30 PM — Beginners</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" />8:00 PM — Improvers</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" />8:30 PM — Intermediate</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" />9:00–11:00 PM — Social Dancing</div>
              </div>
              <p className="text-primary-foreground/40 text-xs mt-5">💷 £15 (2 classes + social) · £10 (1 class) · £5 (social only)</p>
              <Link to="/prices" className="btn-cta text-[10px] mt-5 py-2 px-5 rounded-lg bg-peach text-charcoal font-semibold hover:opacity-90">Book a Bundle</Link>
            </div>
          </StaggerItem>
        </StaggerContainer>
        <FadeInUp delay={0.3} className="text-center mt-8">
          <Link to="/pura-nights" className="text-primary font-heading text-sm font-semibold hover:opacity-80 transition-opacity inline-flex items-center gap-1">
            See Full Schedule & Book <ChevronRight size={14} />
          </Link>
        </FadeInUp>
      </div>
    </section>

    {/* SALSA & BACHATA EXPLAINER */}
    <section className="section-padding section-warm">
      <div className="container-main">
        <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" staggerDelay={0.2}>
          <StaggerItem>
            <div className="bg-card rounded-2xl p-8 h-full card-hover">
              <h2 className="font-display text-2xl font-bold mb-3">What is Salsa?</h2>
              <div className="h-1 w-12 rounded-full mb-4" style={{ background: 'var(--gradient-gold)' }} />
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">Salsa is the heartbeat of Latin social dancing. Originating from Cuba and Puerto Rico, it evolved through New York's Latin communities into the electric, cross-body On1 style we teach at Pura Nights. With its syncopated rhythms, intricate footwork, and expressive partner connection, Salsa is both an art form and a social superpower.</p>
              <Link to="/blog" className="text-primary font-heading text-sm font-semibold inline-flex items-center gap-1">Read More <ChevronRight size={12} /></Link>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-card rounded-2xl p-8 h-full card-hover">
              <h2 className="font-display text-2xl font-bold mb-3">What is Bachata?</h2>
              <div className="h-1 w-12 rounded-full mb-4" style={{ background: 'var(--gradient-gold)' }} />
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">Bachata was born in the mountains of the Dominican Republic — raw, emotional, and deeply expressive. Today it has evolved into three distinct styles: Traditional, Moderna, and Bachata Sensual, all taught at Pura Nights. Characterised by its intimate connection, body waves, and musicality, Bachata is one of the fastest-growing social dances in the world.</p>
              <Link to="/blog" className="text-primary font-heading text-sm font-semibold inline-flex items-center gap-1">Read More <ChevronRight size={12} /></Link>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>

    {/* TESTIMONIALS */}
    <section className="section-padding bg-card">
      <div className="container-main">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">What Our Students Say</h2>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto" staggerDelay={0.1}>
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <div className="bg-background rounded-2xl p-6 card-hover h-full">
                <div className="flex gap-1 mb-3 text-primary">{Array(5).fill(0).map((_, j) => <Star key={j} size={14} fill="currentColor" />)}</div>
                <p className="text-muted-foreground text-sm italic mb-4 leading-relaxed">"{t.text}"</p>
                <p className="font-heading font-semibold text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* PURA LADIES TEASER */}
    <section className="relative h-96 md:h-[28rem] overflow-hidden">
      <img src={puraLadiesImg} alt="Pura Ladies bachata performance team" className="w-full h-full object-cover" width={1920} height={1080} loading="lazy" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsla(0,0%,10%,0.4), hsla(0,0%,10%,0.7))' }} />
      <div className="absolute inset-0 flex items-center">
        <div className="container-main">
          <FadeInUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Pura Ladies — The Dance Company</h2>
            <p className="text-primary-foreground/70 max-w-xl mb-6">An elite women's styling and performance team. 7 groups. 4 countries. One community.</p>
            <Link to="/pura-ladies" className="btn-cta-primary text-sm">Discover Pura Ladies</Link>
          </FadeInUp>
        </div>
      </div>
    </section>

    {/* WEDDING TEASER */}
    <section className="section-padding section-warm">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <FadeInUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Your Perfect Wedding First Dance</h2>
            <div className="h-1 w-16 rounded-full mb-6" style={{ background: 'var(--gradient-gold)' }} />
            <p className="text-muted-foreground leading-relaxed mb-6">
              Bespoke choreography and coaching from London's award-winning instructor. Whether you want a simple, heartfelt waltz or a show-stopping Latin routine — Melitta makes the whole process relaxed, enjoyable, and stress-free.
            </p>
            <Link to="/wedding-dance" className="btn-cta-primary text-sm">Book a Free Consultation</Link>
          </FadeInUp>
          <ScaleIn delay={0.2}>
            <img src={weddingImg} alt="Couple first dance choreographed by Melitta Siomos" className="rounded-2xl w-full" width={1920} height={1080} loading="lazy" style={{ boxShadow: 'var(--shadow-elevated)' }} />
          </ScaleIn>
        </div>
      </div>
    </section>

    {/* GIFT VOUCHERS STRIP */}
    <section className="py-12" style={{ background: 'var(--gradient-gold)' }}>
      <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Gift size={32} className="text-charcoal" />
          <div>
            <h3 className="font-display text-xl font-bold text-charcoal">Give the Gift of Dance 🎁</h3>
            <p className="text-charcoal/70 text-sm font-heading">Perfect for birthdays, anniversaries, and special occasions.</p>
          </div>
        </div>
        <Link to="/gift-vouchers" className="btn-cta-dark text-sm">Buy a Gift Voucher</Link>
      </div>
    </section>

    {/* COMMUNITY CTA */}
    <section className="section-padding section-dark text-center">
      <div className="container-main">
        <FadeInUp>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Join the Pura Nights Community</h2>
          <p className="text-primary-foreground/50 mb-8 max-w-xl mx-auto font-heading text-sm">Your dance family awaits. Connect with hundreds of dancers across London.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="btn-cta text-sm" style={{ backgroundColor: '#25D366', color: '#fff' }}>💬 Join WhatsApp Group</a>
            <a href="https://www.instagram.com/puranights.salsabachata/" target="_blank" rel="noopener noreferrer" className="btn-cta-ghost text-sm">📱 Follow on Instagram</a>
            <a href="mailto:siomosmelitta@gmail.com" className="btn-cta-ghost text-sm">📧 Send Us an Email</a>
          </div>
        </FadeInUp>
      </div>
    </section>
  </Layout>
);

export default Index;
