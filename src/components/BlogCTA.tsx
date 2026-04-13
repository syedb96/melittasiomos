import { Link } from "react-router-dom";

interface BlogCTAProps {
  variant?: "classes" | "wedding" | "private" | "proof" | "start";
}

const ctas = {
  classes: { title: "Ready to Try a Class?", desc: "No booking needed — just turn up. Beginners welcome every week.", to: "/pura-nights", label: "See Class Schedule →" },
  wedding: { title: "Planning Your First Dance?", desc: "Melitta has helped 50+ couples create unforgettable wedding dances.", to: "/wedding-dance", label: "Wedding Dance Info →" },
  private: { title: "Want Faster Progress?", desc: "1-to-1 private lessons tailored to your goals. Free consultation.", to: "/private-lessons", label: "Private Lessons →" },
  proof: { title: "Still Not Sure?", desc: "See 500+ student reviews, awards, and verified Google ratings.", to: "/proof-centre", label: "See All Reviews →" },
  start: { title: "New to Latin Dance?", desc: "Everything you need to know before your first class.", to: "/start-here", label: "Start Here Guide →" },
};

const BlogCTA = ({ variant = "classes" }: BlogCTAProps) => {
  const c = ctas[variant];
  return (
    <div className="not-prose my-10 bg-primary rounded-2xl p-8 text-center">
      <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">{c.title}</h3>
      <p className="text-primary-foreground/80 font-heading text-sm mb-5">{c.desc}</p>
      <Link to={c.to} className="btn-cta-dark inline-block text-sm">{c.label}</Link>
    </div>
  );
};

export default BlogCTA;
