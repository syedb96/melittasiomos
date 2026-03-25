import { Link } from "react-router-dom";
import { Star, Trophy, Users, GraduationCap, Heart, Clock, MapPin, ArrowDown } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import TrustTicker from "@/components/TrustTicker";
import heroImage from "@/assets/hero-dance.jpg";
import melittaImg from "@/assets/melitta-portrait.jpg";
import weddingImg from "@/assets/wedding-dance.jpg";
import puraLadiesImg from "@/assets/pura-ladies.jpg";
import socialImg from "@/assets/social-dancing.jpg";

const reviews = [
  { name: "Sofia & Patrizio", year: "Wedding 2022", text: "Melitta choreographed our wedding dance. We wanted to surprise our friends and family. We chose a Salsa & Bachata dance because it's romantic but also fun. Our guests loved the performance and we will never forget that moment!" },
  { name: "Eva & Miguel", year: "Wedding 2023", text: "We were total beginners and honestly terrified about our first dance. Melitta broke everything down, gave us so much confidence and made the lessons one of our favourite parts of wedding planning." },
  { name: "Hannah & James", year: "Wedding", text: "Melitta understood exactly what we wanted — classy, not cheesy. The choreography felt like us and she was so patient from start to finish." },
];

const Index = () => (
  <Layout>
    <SeoHead
      title="Salsa & Bachata Classes London | Pura Nights by Melitta Siomos"
      description="Join London's award-winning Salsa & Bachata dance school. Weekly classes in Chiswick & Ealing, private lessons, wedding dance & performance teams. All levels welcome. Book today!"
      path="/"
    />

    {/* HERO */}
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <img src={heroImage} alt="Pura Nights salsa and bachata social dancing in London" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsla(16,62%,52%,0.75), hsla(0,0%,8%,0.7))' }} />
      <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in-up">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-4">
          London's #1 Salsa & Bachata Dance School
        </h1>
        <p className="font-heading text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          Weekly Classes in Chiswick & Ealing · All Levels Welcome · No Partner Needed
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://www.tickettailor.com" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-base">
            🎟 Book a Class Now
          </a>
          <Link to="/pura-nights" className="btn-cta-outline text-base">
            ▶ Explore Pura Nights
          </Link>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle text-primary-foreground/60">
        <ArrowDown size={28} />
      </div>
    </section>

    <TrustTicker />

    {/* WHAT WE OFFER */}
    <section className="section-padding section-warm">
      <div className="container-main">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">What We Offer</h2>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-12" />
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Users size={32} />, title: "Weekly Group Classes", desc: "Salsa & Bachata every Monday (Chiswick) & Tuesday (Ealing). All levels from complete beginner to advanced. From just £5.50.", link: "/pura-nights", cta: "See Class Timetable →" },
            { icon: <GraduationCap size={32} />, title: "Private 1-to-1 Lessons", desc: "Personalised coaching at your pace. Tailored plans, HD drill videos, flexible scheduling across West London.", link: "/private-lessons", cta: "Enquire About Private Lessons →" },
            { icon: <Heart size={32} />, title: "Wedding Dance", desc: "Make your first dance unforgettable. Elegant, fun choreography designed around you and your song.", link: "/wedding-dance", cta: "Learn More →" },
          ].map((card, i) => (
            <Link key={i} to={card.link} className="bg-card rounded-lg p-8 card-hover text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {card.icon}
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{card.desc}</p>
              <span className="text-primary font-heading font-semibold text-sm">{card.cta}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section className="section-padding bg-card">
      <div className="container-main text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">How It Works</h2>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-12" />
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { step: "1", title: "Book Your First Class", desc: "No partner needed — just turn up! Book online or pay cash at the door." },
            { step: "2", title: "Learn & Level Up", desc: "Learn from Melitta and her expert team with beginner to advanced tracks." },
            { step: "3", title: "Join the Community", desc: "Dance socials, events, festivals & more — your new dance family awaits." },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-heading font-bold mb-4">{s.step}</div>
              <h3 className="font-heading font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* WEEKLY SCHEDULE */}
    <section className="section-padding section-dark">
      <div className="container-main">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">Weekly Class Schedule</h2>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-12" />
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Monday */}
          <div className="bg-charcoal-light rounded-lg p-8 border border-primary/20">
            <h3 className="font-display text-2xl font-bold text-primary mb-2">Monday — Chiswick</h3>
            <p className="text-primary-foreground/60 text-sm mb-4 flex items-center gap-1"><MapPin size={14} /> The George IV Pub, 85 Chiswick High Rd, W4 2DR</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3"><Clock size={14} className="text-primary" /><span>🚪 Doors open: 7:15 PM</span></div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-primary" /><span>7:30–8:15 PM → Salsa Class (all levels)</span></div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-primary" /><span>8:15–9:00 PM → Bachata Class (all levels)</span></div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-primary" /><span>9:00–11:00 PM → Dance Social (50:50)</span></div>
            </div>
            <p className="text-primary-foreground/50 text-xs mt-4">💷 From £5.50 | Cash at door accepted</p>
            <a href="https://www.tickettailor.com" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-xs mt-4 py-2 px-6">Book Monday Class</a>
          </div>
          {/* Tuesday */}
          <div className="bg-charcoal-light rounded-lg p-8 border border-secondary/20">
            <h3 className="font-display text-2xl font-bold text-secondary mb-2">Tuesday — Ealing</h3>
            <p className="text-primary-foreground/60 text-sm mb-4 flex items-center gap-1"><MapPin size={14} /> Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3"><Clock size={14} className="text-secondary" /><span>🚪 Doors open: 7:15 PM</span></div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-secondary" /><span>7:30–8:15 PM → Salsa Class (all levels)</span></div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-secondary" /><span>8:15–9:00 PM → Bachata Class (all levels)</span></div>
              <div className="flex items-center gap-3"><Clock size={14} className="text-secondary" /><span>9:00–11:00 PM → Dance Social (50:50)</span></div>
            </div>
            <p className="text-primary-foreground/50 text-xs mt-4">💷 From £5.50 | Cash at door accepted</p>
            <a href="https://www.tickettailor.com" target="_blank" rel="noopener noreferrer" className="btn-cta bg-secondary text-secondary-foreground text-xs mt-4 py-2 px-6 hover:opacity-90">Book Tuesday Class</a>
          </div>
        </div>
      </div>
    </section>

    {/* MEET MELITTA */}
    <section className="section-padding section-warm">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <img src={melittaImg} alt="Melitta Siomos professional Latin dance instructor London" className="rounded-lg w-full max-w-md mx-auto" width={800} height={1000} loading="lazy" style={{ boxShadow: 'var(--shadow-elevated)' }} />
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Meet Your Instructor — Melitta Siomos</h2>
            <div className="h-1 w-20 bg-primary rounded-full mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              Since 2010, Melitta has built a reputation as one of London's most inspiring Latin-dance instructors. A Bachata UK Champion with professional musical-theatre training, she blends technique with pure joy — creating classes that feel electric, welcoming and utterly addictive. Whether you're taking your first step or preparing for the stage, Melitta meets you exactly where you are.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Trophy size={16} />, label: "Bachata UK Champion" },
                { icon: <Star size={16} />, label: "5-Star Google Rated" },
                { icon: <Users size={16} />, label: "500+ Students Taught" },
                { icon: <MapPin size={16} />, label: "International Experience" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 bg-card rounded-md px-3 py-2 text-xs font-heading font-semibold">
                  <span className="text-primary">{b.icon}</span>{b.label}
                </div>
              ))}
            </div>
            <Link to="/about" className="text-primary font-heading font-semibold text-sm hover:text-accent transition-colors">Learn More About Melitta →</Link>
          </div>
        </div>
      </div>
    </section>

    {/* GALLERY STRIP */}
    <section className="relative h-64 md:h-80 overflow-hidden">
      <img src={socialImg} alt="Pura Nights dance social in West London" className="w-full h-full object-cover" width={1920} height={800} loading="lazy" />
      <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center">
        <div className="text-center">
          <p className="text-primary-foreground font-heading text-lg font-semibold mb-4">Join hundreds of dancers every week across West London</p>
          <a href="https://www.instagram.com/PuraNights" target="_blank" rel="noopener noreferrer" className="btn-cta-outline text-sm py-2 px-6">Follow @PuraNights</a>
        </div>
      </div>
    </section>

    {/* PRICING SNAPSHOT */}
    <section className="section-padding bg-card">
      <div className="container-main text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Simple, Flexible Pricing</h2>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-12" />
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { tier: "🥉", name: "Bronze Monthly", price: "£45", desc: "4 classes/month", features: ["Perfect for occasional dancers", "Valid one month"] },
            { tier: "🥈", name: "Silver Monthly", price: "£75", desc: "8 classes/month", features: ["Unlimited standard + dedicated", "Both venues included"], popular: true },
            { tier: "🥇", name: "Gold Unlimited", price: "£110", desc: "Unlimited classes", features: ["Priority booking & early access", "Cancel anytime (7-day notice)"] },
          ].map((p, i) => (
            <div key={i} className={`rounded-lg p-8 card-hover relative ${p.popular ? "bg-primary text-primary-foreground ring-2 ring-secondary" : "bg-card border border-border"}`}>
              {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-heading font-bold px-4 py-1 rounded-full">Most Popular</span>}
              <div className="text-3xl mb-2">{p.tier}</div>
              <h3 className="font-heading font-bold text-lg mb-1">{p.name}</h3>
              <p className="text-3xl font-display font-bold mb-1">{p.price}<span className="text-sm font-normal">/mo</span></p>
              <p className={`text-sm mb-4 ${p.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p.desc}</p>
              <ul className={`text-sm space-y-2 mb-6 ${p.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {p.features.map((f, j) => <li key={j}>✅ {f}</li>)}
              </ul>
              <Link to="/prices" className={p.popular ? "btn-cta bg-secondary text-secondary-foreground text-xs py-2 px-6 hover:opacity-90" : "btn-cta-primary text-xs py-2 px-6"}>
                View Details
              </Link>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground text-sm mt-8">Or pay as you go from just £5.50 per class</p>
      </div>
    </section>

    {/* PURA LADIES TEASER */}
    <section className="relative h-96 md:h-[28rem] overflow-hidden">
      <img src={puraLadiesImg} alt="Pura Ladies bachata performance team on stage" className="w-full h-full object-cover" width={1920} height={1080} loading="lazy" />
      <div className="absolute inset-0 bg-charcoal/60 flex items-center">
        <div className="container-main">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Pura Ladies — Performance Teams Across the Globe</h2>
          <p className="text-primary-foreground/80 max-w-xl mb-6">Our all-ladies Bachata performance team has taken the world by storm — with squads in London, Plymouth, Munich and Lisbon. Join us and perform at festivals, shows and events worldwide.</p>
          <Link to="/pura-ladies" className="btn-cta-primary text-sm">Learn More About Pura Ladies →</Link>
        </div>
      </div>
    </section>

    {/* WEDDING TEASER */}
    <section className="section-padding section-warm">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Your First Dance, Made Unforgettable</h2>
            <div className="h-1 w-20 bg-primary rounded-full mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              Nervous? Never danced? No problem. Melitta has helped hundreds of couples go from "I can't dance" to "wow" in just a few sessions. Salsa, Bachata, classic slow — you choose the style.
            </p>
            <Link to="/wedding-dance" className="btn-cta-primary text-sm">Book a Free Wedding Dance Consultation →</Link>
          </div>
          <img src={weddingImg} alt="Couple performing their first wedding dance choreographed by Melitta Siomos" className="rounded-lg w-full" width={1920} height={1080} loading="lazy" style={{ boxShadow: 'var(--shadow-elevated)' }} />
        </div>
      </div>
    </section>

    {/* REVIEWS */}
    <section className="section-padding bg-card">
      <div className="container-main text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">What Our Students Say</h2>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-12" />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reviews.map((r, i) => (
            <div key={i} className="bg-background rounded-lg p-6 card-hover text-left">
              <div className="flex gap-1 mb-3 text-secondary">{Array(5).fill(0).map((_, j) => <Star key={j} size={16} fill="currentColor" />)}</div>
              <p className="text-muted-foreground text-sm italic mb-4">"{r.text}"</p>
              <p className="font-heading font-bold text-sm">{r.name}</p>
              <p className="text-muted-foreground text-xs">{r.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* COMMUNITY CTA */}
    <section className="section-padding bg-primary">
      <div className="container-main text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Join the Pura Nights Community</h2>
        <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">Your dance family awaits. Connect with hundreds of dancers across London.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="btn-cta bg-charcoal text-primary-foreground text-sm hover:bg-charcoal-light">💬 Join Free WhatsApp Group</a>
          <a href="https://www.instagram.com/PuraNights" target="_blank" rel="noopener noreferrer" className="btn-cta-outline text-sm">📱 Follow on Instagram</a>
          <a href="mailto:siomosmelitta@gmail.com" className="btn-cta-outline text-sm">📧 Send Us an Email</a>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
