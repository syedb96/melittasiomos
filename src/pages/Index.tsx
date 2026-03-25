import { Link } from "react-router-dom";
import { Star, Trophy, Users, GraduationCap, Heart, Clock, MapPin, ArrowDown, Gift, ChevronRight, Award, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp, StaggerContainer, StaggerItem, ScaleIn } from "@/components/animations";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-dance.jpg";
import melittaImg from "@/assets/melitta-portrait.jpg";
import weddingImg from "@/assets/wedding-dance.jpg";
import puraLadiesImg from "@/assets/pura-ladies.jpg";
import socialImg from "@/assets/social-dancing.jpg";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

const trustStats = [
  { icon: GraduationCap, value: "15+", label: "Years Teaching" },
  { icon: Users, value: "500+", label: "Students Taught" },
  { icon: Award, value: "UK", label: "Bachata Champion" },
  { icon: Star, value: "5.0", label: "Google Rating" },
  { icon: Heart, value: "All", label: "Levels Welcome" },
  { icon: Sparkles, value: "No", label: "Partner Needed" },
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
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-accent text-xs tracking-[0.3em] uppercase text-primary mb-6"
        >
          Chiswick · Ealing · West London
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
        >
          London's Home of<br />Salsa & Bachata
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-heading text-base md:text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto font-light"
        >
          Weekly classes · Private lessons · Events · Wedding dance · Pura Ladies performance team
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book a Class</a>
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

    {/* TRUST / CREDIBILITY STRIP */}
    <section className="py-8 bg-charcoal border-y border-primary/10">
      <div className="container-main">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {trustStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <stat.icon size={20} className="text-primary mx-auto mb-1.5" />
              <p className="font-display text-lg font-bold text-primary-foreground">{stat.value}</p>
              <p className="text-[10px] font-accent uppercase tracking-wider text-primary-foreground/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* MEET MELITTA */}
    <section className="section-padding section-warm">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
          <ScaleIn>
            <img src={melittaImg} alt="Melitta Siomos award-winning salsa and bachata instructor London" className="rounded-2xl w-full max-w-md mx-auto" width={800} height={1000} loading="lazy" style={{ boxShadow: 'var(--shadow-elevated)' }} />
          </ScaleIn>
          <FadeInUp delay={0.2}>
            <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-3">Award-Winning Instructor</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Meet Melitta Siomos</h2>
            <div className="h-1 w-16 rounded-full mb-6" style={{ background: 'var(--gradient-gold)' }} />
            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm Melitta Siomos — Bachata UK Champion, international performer, and the founder of Pura Nights, Pura Ladies, and Wedding Dance Made Easy. For over 15 years I've been teaching dancers of all levels across London and beyond, building one of West London's most vibrant Latin dance communities.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Whether you're taking your very first dance step or preparing for a show-stopping wedding first dance, my approach is the same: warm, structured, and results-driven. My students return week after week not just for the dancing — but for the community.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex items-center gap-2"><span className="text-primary">✅</span> No partner needed — solo-friendly classes</li>
              <li className="flex items-center gap-2"><span className="text-primary">✅</span> Complete beginners welcome every week</li>
              <li className="flex items-center gap-2"><span className="text-primary">✅</span> Three levels running simultaneously</li>
              <li className="flex items-center gap-2"><span className="text-primary">✅</span> International performance & competition credentials</li>
            </ul>
            <Link to="/about" className="text-primary font-heading font-semibold text-sm hover:opacity-80 transition-opacity inline-flex items-center gap-1">
              Read Melitta's Full Story <ChevronRight size={14} />
            </Link>
          </FadeInUp>
        </div>
      </div>
    </section>

    {/* OUR BRANDS — 4 Cards */}
    <section className="section-padding section-ivory">
      <div className="container-main">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary text-center mb-3">What We Do</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">Our Brands</h2>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.12}>
          {[
            { img: socialImg, title: "Pura Nights", desc: "Weekly Salsa & Bachata classes and socials every Monday in Chiswick and Tuesday in Ealing.", link: "/pura-nights" },
            { img: puraLadiesImg, title: "Pura Ladies", desc: "Award-winning women's styling dance company — 7 teams across London, Plymouth, Munich & Lisbon.", link: "/pura-ladies" },
            { img: weddingImg, title: "Wedding Dance", desc: "Bespoke first dance choreography and coaching for couples. Elegant, fun, and tailored to you.", link: "/wedding-dance" },
            { img: melittaImg, title: "Private Lessons", desc: "Tailored 1-on-1 coaching for any goal — beginners, technique, performance prep, confidence.", link: "/private-lessons" },
          ].map((card, i) => (
            <StaggerItem key={i}>
              <Link to={card.link} className="relative group block rounded-2xl overflow-hidden h-80 card-hover">
                <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-lg font-bold text-primary-foreground mb-1">{card.title}</h3>
                  <p className="text-primary-foreground/70 text-xs leading-relaxed mb-3">{card.desc}</p>
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
          <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary text-center mb-3">Every Week</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">Weekly Class Schedule</h2>
          <p className="text-primary-foreground/50 text-center text-sm mb-12 font-heading">All levels welcome · No partner needed · Drop-in or book a bundle</p>
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" staggerDelay={0.2}>
          <StaggerItem>
            <div className="bg-charcoal-light rounded-2xl p-8 border border-primary/15 h-full">
              <h3 className="font-display text-2xl font-bold text-primary mb-2">Monday — Chiswick</h3>
              <p className="text-primary-foreground/50 text-sm mb-5 flex items-center gap-1"><MapPin size={14} /> The George IV, 185 Chiswick High Rd, W4 2DR</p>
              <p className="text-primary-foreground/40 text-xs mb-4">Nearest tube: Turnham Green (District Line) · Buses: 190, 237, 267</p>
              <div className="space-y-3 text-sm text-primary-foreground/70">
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" />7:30 PM — Beginners Salsa & Bachata</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" />8:00 PM — Improvers</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" />8:30 PM — Intermediate</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-primary" />9:00–11:00 PM — Social Dancing</div>
              </div>
              <p className="text-primary-foreground/40 text-xs mt-5">💷 £15 (2 classes + social) · £10 (1 class) · £5 (social only)</p>
              <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-[10px] mt-5 py-2 px-5 rounded-lg">Book Monday Class</a>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-charcoal-light rounded-2xl p-8 border border-peach/15 h-full">
              <h3 className="font-display text-2xl font-bold text-peach mb-2">Tuesday — Ealing</h3>
              <p className="text-primary-foreground/50 text-sm mb-5 flex items-center gap-1"><MapPin size={14} /> Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
              <p className="text-primary-foreground/40 text-xs mb-4">Nearest station: West Ealing (Elizabeth Line) · Buses: 83, 207, E1</p>
              <div className="space-y-3 text-sm text-primary-foreground/70">
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" />6:50–7:20 PM — Free Ladies Styling</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" />7:30 PM — Beginners</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" />8:00 PM — Improvers</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" />8:30 PM — Intermediate</div>
                <div className="flex items-center gap-3"><Clock size={14} className="text-peach" />9:00–11:00 PM — Social Dancing</div>
              </div>
              <p className="text-primary-foreground/40 text-xs mt-5">💷 £15 (2 classes + social) · £10 (1 class) · £5 (social only)</p>
              <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="btn-cta text-[10px] mt-5 py-2 px-5 rounded-lg bg-peach text-charcoal font-semibold hover:opacity-90">Book Tuesday Class</a>
            </div>
          </StaggerItem>
        </StaggerContainer>
        <FadeInUp delay={0.3} className="text-center mt-10">
          <Link to="/pura-nights" className="text-primary font-heading text-sm font-semibold hover:opacity-80 transition-opacity inline-flex items-center gap-1">
            See Full Schedule & Details <ChevronRight size={14} />
          </Link>
        </FadeInUp>
      </div>
    </section>

    {/* SALSA & BACHATA EXPLAINER */}
    <section className="section-padding section-warm">
      <div className="container-main">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary text-center mb-3">The Dances</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">What Will You Learn?</h2>
        </FadeInUp>
        <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" staggerDelay={0.2}>
          <StaggerItem>
            <div className="bg-card rounded-2xl p-8 h-full card-hover">
              <h3 className="font-display text-2xl font-bold mb-3">What is Salsa?</h3>
              <div className="h-1 w-12 rounded-full mb-4" style={{ background: 'var(--gradient-gold)' }} />
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">Salsa is the heartbeat of Latin social dancing. Originating from Cuba and Puerto Rico, it evolved through New York's Latin communities into the electric, cross-body On1 style we teach at Pura Nights. With its syncopated rhythms, intricate footwork, and expressive partner connection, Salsa is both an art form and a social superpower.</p>
              <Link to="/blog/what-is-salsa" className="text-primary font-heading text-sm font-semibold inline-flex items-center gap-1">Read the Full Guide <ChevronRight size={12} /></Link>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-card rounded-2xl p-8 h-full card-hover">
              <h3 className="font-display text-2xl font-bold mb-3">What is Bachata?</h3>
              <div className="h-1 w-12 rounded-full mb-4" style={{ background: 'var(--gradient-gold)' }} />
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">Bachata was born in the mountains of the Dominican Republic — raw, emotional, and deeply expressive. Today it has evolved into three distinct styles: Traditional, Moderna, and Bachata Sensual, all taught at Pura Nights. Characterised by its intimate connection, body waves, and musicality, Bachata is one of the fastest-growing social dances in the world.</p>
              <Link to="/blog/what-is-bachata" className="text-primary font-heading text-sm font-semibold inline-flex items-center gap-1">Read the Full Guide <ChevronRight size={12} /></Link>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>

    {/* TESTIMONIALS */}
    <section className="section-padding section-ivory-alt">
      <div className="container-main">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary text-center mb-3">Real Students, Real Stories</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">What Our Students Say</h2>
          <p className="text-muted-foreground text-center text-sm mb-12 font-heading max-w-xl mx-auto">Rated 5.0 on Google · 500+ students taught · Dancers from 20 to 65+</p>
        </FadeInUp>
        <TestimonialsCarousel />
        <FadeInUp delay={0.3} className="text-center mt-8">
          <Link to="/testimonials" className="text-primary font-heading text-sm font-semibold hover:opacity-80 transition-opacity inline-flex items-center gap-1">
            Read All Testimonials <ChevronRight size={14} />
          </Link>
        </FadeInUp>
      </div>
    </section>

    {/* PURA LADIES TEASER */}
    <section className="relative h-96 md:h-[30rem] overflow-hidden">
      <img src={puraLadiesImg} alt="Pura Ladies bachata performance team" className="w-full h-full object-cover" width={1920} height={1080} loading="lazy" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsla(0,0%,8%,0.35), hsla(0,0%,8%,0.75))' }} />
      <div className="absolute inset-0 flex items-center">
        <div className="container-main">
          <FadeInUp>
            <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-4">The Dance Company</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Pura Ladies</h2>
            <p className="text-primary-foreground/70 max-w-xl mb-6 text-sm leading-relaxed">An elite women's styling and performance team. 7 groups across London, Plymouth, Munich & Lisbon. One community, one standard.</p>
            <Link to="/pura-ladies" className="btn-cta-primary text-sm">Discover Pura Ladies</Link>
          </FadeInUp>
        </div>
      </div>
    </section>

    {/* WEDDING TEASER */}
    <section className="section-padding section-warm">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
          <FadeInUp>
            <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-3">Wedding Dance Made Easy</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Your Perfect First Dance</h2>
            <div className="h-1 w-16 rounded-full mb-6" style={{ background: 'var(--gradient-gold)' }} />
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bespoke choreography and coaching from London's award-winning instructor. Whether you want a simple, heartfelt waltz or a show-stopping Latin routine — Melitta makes the whole process relaxed, enjoyable, and completely stress-free.
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              Every couple is different. Your first dance should feel like you. Book a free 15-minute consultation to discuss your song, your vision, and your timeline.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20love%20to%20enquire%20about%20Wedding%20Dance%20coaching" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Book Free Consultation</a>
              <Link to="/wedding-dance" className="btn-cta-dark text-sm">Learn More</Link>
            </div>
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
            <p className="text-charcoal/70 text-sm font-heading">Perfect for birthdays, anniversaries, hen parties, and special occasions.</p>
          </div>
        </div>
        <Link to="/gift-vouchers" className="btn-cta-dark text-sm">Buy a Gift Voucher</Link>
      </div>
    </section>

    {/* COMMUNITY CTA */}
    <section className="section-padding section-dark text-center">
      <div className="container-main">
        <FadeInUp>
          <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-4">Your Dance Family Awaits</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Join the Pura Nights Community</h2>
          <p className="text-primary-foreground/50 mb-8 max-w-xl mx-auto font-heading text-sm">Connect with hundreds of dancers across West London. Follow us, join our WhatsApp group, or send a message.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="btn-cta text-sm text-white" style={{ backgroundColor: '#25D366' }}>💬 Join WhatsApp Group</a>
            <a href="https://www.instagram.com/puranights.salsabachata/" target="_blank" rel="noopener noreferrer" className="btn-cta-ghost text-sm">📱 Follow on Instagram</a>
            <a href="mailto:siomosmelitta@gmail.com" className="btn-cta-ghost text-sm">📧 Send Us an Email</a>
          </div>
        </FadeInUp>
      </div>
    </section>
  </Layout>
);

export default Index;