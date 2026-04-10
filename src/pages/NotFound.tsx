import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { motion } from "framer-motion";

const quickLinks = [
  { to: "/", label: "Home", emoji: "🏠" },
  { to: "/pura-nights", label: "Weekly Classes", emoji: "💃" },
  { to: "/prices", label: "Prices", emoji: "💷" },
  { to: "/blog", label: "Blog & Guides", emoji: "📖" },
  { to: "/events", label: "Events", emoji: "🔥" },
  { to: "/contact", label: "Contact", emoji: "📬" },
  { to: "/wedding-dance", label: "Wedding Dance", emoji: "💑" },
  { to: "/start-here", label: "Start Here", emoji: "🌟" },
];

const NotFound = () => (
  <Layout>
    <SeoHead title="Page Not Found | Melitta Siomos Dance Academy" description="The page you're looking for doesn't exist. Browse our salsa and bachata classes, wedding dance lessons, and more in West London." path="/404" />
    <section className="section-padding section-dark text-center min-h-[70vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="font-display text-8xl md:text-9xl font-bold text-primary mb-4"
        >
          404
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3"
        >
          This page doesn't exist — but the music's still playing.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-primary-foreground/60 mb-10 font-heading"
        >
          Let's get you back on the dance floor. Here are some helpful links:
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {quickLinks.map((page) => (
            <Link key={page.to} to={page.to} className="bg-charcoal-light rounded-xl p-4 card-hover flex flex-col items-center gap-1.5 text-center">
              <span className="text-2xl">{page.emoji}</span>
              <span className="font-heading font-semibold text-xs text-primary-foreground">{page.label}</span>
            </Link>
          ))}
        </div>

        <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">
          💬 WhatsApp Melitta
        </a>
      </div>
    </section>
  </Layout>
);

export default NotFound;
