import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, X, Star, Award, Users, GraduationCap } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { motion } from "framer-motion";
import melittaImg from "@/assets/melitta-portrait.jpg";

/* <!-- WIX PAGE: /meet-the-team -->
   <!-- WIX: Create as dynamic page connected to Team Members CMS collection -->
   <!-- WIX SECTION: Hero — Strip with dark background -->
   <!-- WIX SECTION: Team Grid — Repeater connected to Team Members collection, sorted by sort_order -->
   <!-- WIX SECTION: Bio Modal — Lightbox triggered from team card clicks -->
   <!-- WIX SECTION: Join CTA — Strip with recruitment/audition info -->
   <!-- WIX: Each card links to dynamic member page OR opens lightbox -->
*/

const team = [
  {
    name: "Melitta Siomos", role: "Founder & Lead Instructor",
    specialties: ["Salsa On1", "Bachata Sensual", "Wedding Dance", "Latin Styling"],
    bio: "Award-winning international dance instructor and performer with 15+ years of professional teaching experience. Founder of Pura Nights, Pura Ladies, and Wedding Dance Made Easy. Trained and performed across Europe and internationally. Known for creating an inclusive, pressure-free learning environment where students of all ages and levels thrive. Based in West London.",
    instagram: "https://www.instagram.com/melittasiomos/", handle: "@melittasiomos",
    highlight: true,
  },
  {
    name: "Roger Cracco", role: "Guest Teacher & Choreographer",
    specialties: ["Salsa", "Bachata", "Performance Choreography", "Workshops"],
    bio: "International guest teacher and choreographer, regularly featured at Pura Nights events and Monthly Latin Fridays. Roger brings high-energy workshop content and specialist performance choreography, elevating every event he joins.",
    instagram: "https://www.instagram.com/puranights.salsabachata/", handle: "@puranights",
  },
  {
    name: "Tiffany", role: "Assistant Instructor",
    specialties: ["Beginner Classes", "Ladies Styling", "Group Teaching"],
    bio: "Tiffany has been part of the Pura Nights family for several years, working closely with Melitta to deliver the beginners and ladies styling programme. Her warm, encouraging approach makes first-time students feel immediately at ease.",
    instagram: "https://www.instagram.com/puranights.salsabachata/", handle: "@puranights",
  },
  {
    name: "Eva", role: "Instructor",
    specialties: ["Bachata Sensual", "Latin Styling", "Intermediate Teaching"],
    bio: "Eva's passion for Bachata Sensual shines through in every class she teaches. A skilled social dancer and instructor, she brings technical depth and genuine warmth to the Pura Nights team.",
    instagram: "https://www.instagram.com/puranights.salsabachata/", handle: "@puranights",
  },
  {
    name: "Edi", role: "Instructor",
    specialties: ["Salsa On1", "Intermediate & Advanced Footwork"],
    bio: "Edi is a dedicated Salsa technician known for his precise footwork and ability to break down advanced combinations into learnable progressions. A favourite instructor among improver and intermediate students.",
    instagram: "https://www.instagram.com/puranights.salsabachata/", handle: "@puranights",
  },
  {
    name: "Ezgi", role: "Instructor",
    specialties: ["Bachata Sensual", "Ladies Styling", "Body Movement"],
    bio: "Ezgi brings elegance and expressiveness to every session. Her speciality in Bachata Sensual body movement and ladies styling has made her an integral part of the Pura Nights Tuesday Ealing evening.",
    instagram: "https://www.instagram.com/puranights.salsabachata/", handle: "@puranights",
  },
  {
    name: "Luis", role: "Instructor",
    specialties: ["Salsa On1", "Social Dancing", "Advanced Combinations"],
    bio: "Luis is a natural social dancer who brings joy and energy to every class. His depth of Salsa knowledge — particularly in advanced combination work — makes him a valuable teacher across all levels at Pura Nights.",
    instagram: "https://www.instagram.com/puranights.salsabachata/", handle: "@puranights",
  },
  {
    name: "Kevin", role: "Instructor",
    specialties: ["Salsa", "Footwork", "Social Floor Confidence"],
    bio: "Kevin's teaching philosophy centres on social dance confidence — helping students bridge the gap between class and the social floor. His relaxed, encouraging style makes even the toughest combinations feel approachable.",
    instagram: "https://www.instagram.com/puranights.salsabachata/", handle: "@puranights",
  },
];

const teamSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Meet the Team — Pura Nights Instructors",
  description: "Meet the Pura Nights teaching team. 8 professional Salsa & Bachata instructors led by award-winning founder Melitta Siomos.",
  url: "https://www.puranights.com/meet-the-team",
  mainEntity: {
    "@type": "DanceSchool",
    name: "Pura Nights — Melitta Siomos Dance Academy",
    employee: team.map(t => ({
      "@type": "Person",
      name: t.name,
      jobTitle: t.role,
      knowsAbout: t.specialties,
    })),
  },
};

const MeetTheTeam = () => {
  const [openBio, setOpenBio] = useState<number | null>(null);

  return (
    <Layout>
      <SeoHead
        title="Meet the Team — Pura Nights Salsa & Bachata Instructors London"
        description="Meet the 8 professional instructors behind Pura Nights. Led by award-winning founder Melitta Siomos — Salsa, Bachata, Ladies Styling, and Wedding Dance specialists."
        path="/meet-the-team"
        schema={teamSchema}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Meet the Team", path: "/meet-the-team" },
        ]}
      />

      {/* Hero */}
      <section className="section-padding section-dark text-center">
        <div className="container-main">
          <FadeInUp>
            <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-4">8 Professional Instructors</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Meet the Pura Nights Teaching Team
            </h1>
            <p className="text-primary-foreground/60 max-w-2xl mx-auto font-heading text-sm leading-relaxed">
              Every instructor at Pura Nights is handpicked by Melitta for their technical skill, teaching ability, and genuine warmth. 
              This is the team that makes Pura Nights feel like family.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-card border-b border-border">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
            {[
              { icon: Users, value: "8", label: "Instructors" },
              { icon: GraduationCap, value: "15+", label: "Years Teaching" },
              { icon: Award, value: "UK", label: "Champion" },
              { icon: Star, value: "5.0", label: "Google Rating" },
            ].map((s) => (
              <div key={s.label}>
                <s.icon size={24} className="mx-auto text-primary mb-1.5" />
                <p className="font-display text-xl font-bold">{s.value}</p>
                <p className="text-muted-foreground text-xs font-heading">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-5xl">
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.08}>
            {team.map((member, i) => (
              <StaggerItem key={member.name}>
                <button
                  onClick={() => setOpenBio(i)}
                  className={`w-full text-left bg-card rounded-2xl overflow-hidden card-hover border transition-colors ${member.highlight ? 'border-primary shadow-lg' : 'border-border'}`}
                >
                  {/* <!-- WIX: Replace with dynamic image from Team Members collection --> */}
                  <div className="aspect-[3/4] bg-charcoal-light flex items-center justify-center relative">
                    {i === 0 && melittaImg ? (
                      <img src={melittaImg} alt={member.name} className="w-full h-full object-cover" loading={i === 0 ? "eager" : "lazy"} />
                    ) : (
                      <p className="text-primary-foreground/20 text-xs font-heading">[{member.name} photo]</p>
                    )}
                    {member.highlight && (
                      <span className="absolute top-3 right-3 bg-primary text-charcoal text-[9px] font-heading font-bold px-2 py-0.5 rounded-full">FOUNDER</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-sm">{member.name}</h3>
                    <p className="text-muted-foreground text-xs font-heading mb-2">{member.role}</p>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.slice(0, 2).map(s => (
                        <span key={s} className="text-[9px] font-heading bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{s}</span>
                      ))}
                      {member.specialties.length > 2 && (
                        <span className="text-[9px] font-heading text-muted-foreground">+{member.specialties.length - 2}</span>
                      )}
                    </div>
                  </div>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Bio Modal */}
      {openBio !== null && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setOpenBio(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-2xl max-w-lg w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setOpenBio(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X size={20} /></button>
            <h3 className="font-display text-2xl font-bold mb-1">{team[openBio].name}</h3>
            <p className="text-primary font-heading text-sm font-semibold mb-3">{team[openBio].role}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {team[openBio].specialties.map(s => (
                <span key={s} className="text-[10px] font-heading bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s}</span>
              ))}
            </div>
            <p className="text-foreground text-sm leading-relaxed mb-4">{team[openBio].bio}</p>
            <a href={team[openBio].instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary text-sm font-heading font-semibold hover:underline">
              <Instagram size={14} /> {team[openBio].handle}
            </a>
          </motion.div>
        </motion.div>
      )}

      {/* Join the Team */}
      <section className="section-padding section-dark text-center">
        <div className="container-main max-w-3xl">
          <FadeInUp>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">Want to Teach with Us?</h2>
            <p className="text-primary-foreground/60 text-sm font-heading leading-relaxed mb-6">
              Pura Nights is always looking for passionate, skilled instructors. If you love teaching, care about community, 
              and want to be part of something special — get in touch with Melitta.
            </p>
            <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27m%20interested%20in%20teaching%20opportunities%20at%20Pura%20Nights" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">Contact Melitta →</a>
          </FadeInUp>
        </div>
      </section>

      <RelatedPages title="Learn More" links={[
        { to: "/about", label: "About Melitta", desc: "Founder story & credentials" },
        { to: "/proof-centre", label: "Proof Centre", desc: "Reviews, awards & social proof" },
        { to: "/pura-nights", label: "Weekly Classes", desc: "Mon Chiswick · Tue Ealing" },
        { to: "/pura-ladies", label: "Pura Ladies", desc: "Performance team auditions" },
        { to: "/schedule", label: "Class Schedule", desc: "Full weekly timetable" },
        { to: "/testimonials", label: "Student Reviews", desc: "What our students say" },
      ]} />
    </Layout>
  );
};

export default MeetTheTeam;
