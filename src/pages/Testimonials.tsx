import { useState } from "react";
import { Star } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import testimonials, { type Testimonial } from "@/data/testimonials";

const categories = [
  { key: "all", label: "All" },
  { key: "group", label: "Group Classes" },
  { key: "wedding", label: "Wedding Dance" },
  { key: "private", label: "Private Lessons" },
  { key: "pura-ladies", label: "Pura Ladies" },
  { key: "online", label: "Online" },
];

const TestimonialCard = ({ t }: { t: Testimonial }) => {
  const initials = t.name.split(" ").map(w => w[0]).join("").slice(0, 2);
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card break-inside-avoid mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-sm">{initials}</div>
        <div className="min-w-0">
          <p className="font-heading font-semibold text-sm">{t.name}</p>
          <p className="text-muted-foreground text-xs truncate">{t.label}</p>
        </div>
        {t.platform === "google" && <span className="ml-auto text-xs bg-secondary px-2 py-0.5 rounded font-heading shrink-0">Google ⭐</span>}
      </div>
      <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-primary text-primary" />)}</div>
      <p className="text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
    </div>
  );
};

const Testimonials = () => {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? testimonials : testimonials.filter(t => t.category === filter);

  return (
    <Layout>
      <SeoHead title="Student Testimonials | 5-Star Reviews | Melitta Siomos Dance Academy" description="Read real reviews from Pura Nights students, wedding dance couples, and Pura Ladies members. 5-star Google rated Salsa & Bachata classes in London." path="/testimonials" />

      <section className="section-padding section-dark text-center">
        <FadeInUp>
          <div className="flex justify-center gap-0.5 mb-4">{[...Array(5)].map((_, i) => <Star key={i} size={24} className="fill-primary text-primary" />)}</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">What Our Students Say</h1>
          <p className="text-peach font-heading">5.0 Google Rating · 47+ Reviews</p>
        </FadeInUp>
      </section>

      <section className="section-padding section-warm">
        <div className="container-main max-w-5xl">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map(c => (
              <button key={c.key} onClick={() => setFilter(c.key)} className={`px-4 py-2 rounded-full text-sm font-heading font-semibold transition-colors ${filter === c.key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                {c.label}
              </button>
            ))}
          </div>

          <StaggerContainer className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {filtered.map((t, i) => (
              <StaggerItem key={i}><TestimonialCard t={t} /></StaggerItem>
            ))}
          </StaggerContainer>

          <FadeInUp className="mt-16 text-center">
            <div className="bg-primary rounded-2xl p-8">
              <h2 className="font-display text-2xl font-bold text-primary-foreground mb-3">Love Your Experience?</h2>
              <p className="text-primary-foreground/80 mb-5 font-heading text-sm">Help other dancers discover Pura Nights by leaving a review</p>
              <a href="https://g.page/r/puranights/review" target="_blank" rel="noopener noreferrer" className="btn-cta-dark inline-block">Leave a Google Review ⭐</a>
            </div>
          </FadeInUp>
        </div>
      </section>
      <RelatedPages title="Explore" links={[
        { to: "/pura-nights", label: "Weekly Classes", desc: "Join Salsa & Bachata" },
        { to: "/private-lessons", label: "Private Lessons", desc: "1-to-1 coaching" },
        { to: "/wedding-dance", label: "Wedding Dance", desc: "First dance coaching" },
        { to: "/pura-ladies", label: "Pura Ladies", desc: "Performance team" },
        { to: "/start-here", label: "Start Here", desc: "New to dancing?" },
        { to: "/contact", label: "Contact Melitta", desc: "Get in touch" },
      ]} />
    </Layout>
  );
};

export default Testimonials;
