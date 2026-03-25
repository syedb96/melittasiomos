import { useState } from "react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";
import RelatedPages from "@/components/RelatedPages";
import { Trophy, Star, Users, MapPin, GraduationCap, Globe, X } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem, AnimatedCounter, ScaleIn } from "@/components/animations";
import { motion } from "framer-motion";
import melittaImg from "@/assets/melitta-portrait.jpg";
import heroImg from "@/assets/hero-dance.jpg";

const team = [
  { name: "Melitta Siomos", role: "Founder & Lead Instructor", specialties: ["Salsa On1", "Bachata Sensual", "Latin Styling", "Wedding Dance"], bio: "International award-winning Salsa & Bachata instructor with 15+ years of experience. Founder of Pura Nights, Pura Ladies, and Wedding Dance Made Easy. Bachata UK Champion and coach to hundreds of dancers across London and Europe." },
  { name: "Roger Cracco", role: "Guest Teacher & Choreographer", specialties: ["Salsa", "Bachata", "Performance Coaching"], bio: "Renowned choreographer and guest teacher at Pura Nights. Roger brings a wealth of competition and performance experience, helping students develop advanced technique and artistry." },
  { name: "Tiffany", role: "Assistant Instructor", specialties: ["Beginner Classes", "Ladies Styling"], bio: "A Pura Ladies team member turned instructor, Tiffany is passionate about welcoming new students and making everyone feel comfortable from their very first class." },
  { name: "Eva", role: "Instructor", specialties: ["Bachata", "Latin Styling"], bio: "Eva specialises in Bachata and Latin styling, bringing grace and expressiveness to every session. She helps students unlock their personal movement style." },
  { name: "Edi", role: "Instructor", specialties: ["Salsa", "Intermediate Training"], bio: "Edi's energy and precision make him a favourite among improver and intermediate students. His focus on clean technique and musicality helps dancers level up quickly." },
  { name: "Ezgi", role: "Instructor", specialties: ["Bachata Sensual", "Ladies Styling"], bio: "Ezgi's passion for Bachata Sensual and body movement brings a unique dimension to Pura Nights. She leads popular styling warm-ups at the Ealing venue." },
  { name: "Luis", role: "Instructor", specialties: ["Salsa On1", "Advanced Footwork"], bio: "Luis brings rhythm, flair, and technical depth to every class. His footwork and shines sessions are among the most popular at Pura Nights socials." },
  { name: "Kevin", role: "Instructor", specialties: ["Salsa", "Social Dancing"], bio: "Kevin's calm teaching style and focus on lead technique makes him an excellent instructor for students looking to improve their social dancing confidence." },
];

const About = () => {
  const [openBio, setOpenBio] = useState<number | null>(null);

  return (
  <Layout>
    <SeoHead title="About Melitta Siomos | Award-Winning Dance Instructor | Pura Nights London" description="Meet Melitta Siomos — international award-winning Salsa & Bachata instructor, founder of Pura Nights, Pura Ladies, and Wedding Dance Made Easy. 15+ years of experience across London and Europe." path="/about" />

    {/* Hero */}
    <section className="relative h-72 md:h-[26rem] overflow-hidden">
      <img src={heroImg} alt="Melitta Siomos and Pura Dance community" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center px-4">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3">Meet Melitta Siomos</h1>
          <p className="text-peach font-heading text-base md:text-lg font-light">International award-winning dance instructor, founder, and community builder</p>
        </motion.div>
      </div>
    </section>

    {/* Story */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <ScaleIn className="md:col-span-2">
            <img src={melittaImg} alt="Melitta Siomos" className="rounded-2xl w-full" width={800} height={1000} loading="lazy" style={{ boxShadow: 'var(--shadow-elevated)' }} />
          </ScaleIn>
          <FadeInUp className="md:col-span-3" delay={0.2}>
            <h2 className="font-display text-3xl font-bold mb-3">Melitta's Story</h2>
            <div className="h-1 w-16 rounded-full mb-6" style={{ background: 'var(--gradient-gold)' }} />
            <div className="text-muted-foreground leading-relaxed space-y-4 text-sm">
              <p>Melitta Siomos is one of London's most celebrated Salsa and Bachata instructors, bringing 15+ years of professional experience to every class she teaches. Born with a deep passion for Latin music and movement, Melitta has performed at international events across Europe, competed in prestigious Latin dance competitions, and built Pura Nights from the ground up into one of West London's most beloved dance communities.</p>
              <p>Her teaching philosophy is rooted in inclusivity: no judgment, no pressure, just movement, music, and community. She believes dance is for everyone — regardless of age, background, fitness level, or prior experience — and she has helped hundreds of students discover confidence, fitness, creativity, and lifelong friendships through her weekly classes.</p>
              <p>As the founder of Pura Ladies, Melitta has taken women's styling to an entirely new level, building 7 professional performance teams across London, Plymouth, Munich, and Lisbon. Her work has been recognised at international competition level, and her students go on to perform, compete, and teach across Europe.</p>
              <p>Beyond the dance floor, Melitta is a dedicated teacher who adapts to every student's needs — whether you're booking a private wedding dance lesson, joining a weekly class for the first time, or auditioning to join the Pura Ladies performance team.</p>
            </div>
          </FadeInUp>
        </div>

        {/* Stats */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16" staggerDelay={0.12}>
          {[
            { icon: <Trophy size={24} />, target: 15, suffix: "+", label: "Years Experience" },
            { icon: <Users size={24} />, target: 500, suffix: "+", label: "Students Taught" },
            { icon: <Globe size={24} />, target: 7, suffix: "", label: "Teams Worldwide" },
            { icon: <Star size={24} />, target: 5, suffix: ".0", label: "Google Rating" },
          ].map((s, i) => (
            <StaggerItem key={i}>
              <div className="bg-card rounded-2xl p-6 card-hover text-center">
                <div className="text-primary mb-2 flex justify-center">{s.icon}</div>
                <p className="font-display text-3xl font-bold">
                  <AnimatedCounter target={s.target} suffix={s.suffix} />
                </p>
                <p className="text-muted-foreground text-sm font-heading">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Meet the Team */}
    <section className="section-padding bg-card" id="team">
      <div className="container-main">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-center mb-12">Meet the Team</h2>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" staggerDelay={0.08}>
          {team.map((t, i) => (
            <StaggerItem key={i}>
              <div className="bg-background rounded-2xl p-6 card-hover text-center h-full flex flex-col items-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-display font-bold text-primary border-2 border-primary" style={{ background: 'var(--gradient-warm)' }}>
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h3 className="font-heading font-semibold text-sm">{t.name}</h3>
                <p className="text-primary text-xs font-heading mb-3">{t.role}</p>
                <div className="flex flex-wrap justify-center gap-1 mb-3">
                  {t.specialties.map(s => (
                    <span key={s} className="text-[10px] font-accent bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
                <button onClick={() => setOpenBio(i)} className="text-xs font-heading font-semibold text-primary hover:underline mt-auto">Read Bio →</button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Bio Modal */}
    {openBio !== null && (
      <div className="fixed inset-0 z-50 bg-charcoal/90 flex items-center justify-center p-4" onClick={() => setOpenBio(null)}>
        <div className="bg-card rounded-2xl p-8 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
          <button onClick={() => setOpenBio(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X size={20} /></button>
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-display font-bold text-primary border-2 border-primary" style={{ background: 'var(--gradient-warm)' }}>
            {team[openBio].name.split(" ").map(n => n[0]).join("")}
          </div>
          <h3 className="font-display text-xl font-bold text-center mb-1">{team[openBio].name}</h3>
          <p className="text-primary text-sm font-heading text-center mb-2">{team[openBio].role}</p>
          <div className="flex flex-wrap justify-center gap-1 mb-4">
            {team[openBio].specialties.map(s => (
              <span key={s} className="text-[10px] font-accent bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s}</span>
            ))}
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">{team[openBio].bio}</p>
          <div className="text-center mt-4">
            <a href="https://www.instagram.com/puranights.salsabachata/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">Follow @puranights.salsabachata →</a>
          </div>
        </div>
      </div>
    )}

    {/* Salsa & Bachata */}
    <section className="section-padding section-warm">
      <div className="container-main max-w-4xl">
        <StaggerContainer className="grid md:grid-cols-2 gap-12" staggerDelay={0.2}>
          <StaggerItem>
            <h2 className="font-display text-2xl font-bold mb-3">What Is Salsa Dance?</h2>
            <div className="h-1 w-12 rounded-full mb-4" style={{ background: 'var(--gradient-gold)' }} />
            <p className="text-muted-foreground text-sm leading-relaxed">Salsa is a vibrant partner dance with roots in Cuban Son, Mambo and Afro-Caribbean rhythms. At Pura Nights, we teach Salsa On1 (Crossbody/LA style) — the most versatile and widely danced style at social events worldwide. It's fast, fun, and rhythmically rich — perfect for beginners and advanced dancers alike.</p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="font-display text-2xl font-bold mb-3">What Is Bachata Dance?</h2>
            <div className="h-1 w-12 rounded-full mb-4" style={{ background: 'var(--gradient-gold)' }} />
            <p className="text-muted-foreground text-sm leading-relaxed">Bachata originates from the Dominican Republic and has evolved into three styles: Traditional, Moderna, and Bachata Sensual. With its romantic guitar-driven rhythm and intimate partner connection, Bachata is incredibly accessible for beginners. At Pura Nights, Melitta teaches all core styles with particular emphasis on Moderna and Sensual.</p>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>

    {/* Locations */}
    <section className="section-padding section-dark">
      <div className="container-main max-w-3xl text-center">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold mb-8">Find Us</h2>
        </FadeInUp>
        <StaggerContainer className="space-y-4 text-left" staggerDelay={0.12}>
          {[
            { day: "Monday", venue: "The George IV, 185 Chiswick High Rd, London W4 2DR", note: "Nearest tube: Turnham Green (District Line)" },
            { day: "Tuesday", venue: "Drayton Court Hotel, 2 The Avenue, Ealing W13 8PH", note: "Nearest: West Ealing (Elizabeth Line)" },
            { day: "Private Lessons", venue: "Flexible locations — central & west London", note: "Contact Melitta to discuss" },
          ].map((l, i) => (
            <StaggerItem key={i}>
              <div className="flex items-start gap-3 bg-charcoal-light rounded-2xl p-5">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-heading font-semibold text-primary-foreground text-sm">{l.day}</p>
                  <p className="text-primary-foreground/60 text-sm">{l.venue}</p>
                  <p className="text-primary-foreground/40 text-xs mt-1">{l.note}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeInUp delay={0.3}>
          <Link to="/contact" className="btn-cta-primary text-sm mt-8 inline-block">Get in Touch</Link>
        </FadeInUp>
      </div>
    </section>

    <RelatedPages title="Explore Melitta's World" links={[
      { to: "/pura-nights", label: "Pura Nights Classes", desc: "Weekly Salsa & Bachata" },
      { to: "/pura-ladies", label: "Pura Ladies", desc: "Performance team" },
      { to: "/wedding-dance", label: "Wedding Dance", desc: "First dance coaching" },
      { to: "/private-lessons", label: "Private Lessons", desc: "1-to-1 coaching" },
      { to: "/testimonials", label: "Student Reviews", desc: "What dancers say" },
      { to: "/blog", label: "Pura Stories Blog", desc: "Tips, guides & culture" },
      { to: "/gallery", label: "Gallery", desc: "Photos & videos" },
      { to: "/contact", label: "Contact Melitta", desc: "Get in touch" },
    ]} />
  </Layout>
  );
};

export default About;
