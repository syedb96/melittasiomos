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

/* <!-- WIX PAGE: Custom 404 -->
   <!-- WIX: Set as custom 404 page in Wix Settings > Custom Error Page -->
   <!-- WIX SECTION: Hero, Quick Links Grid, CSS Dancing Figure animation -->
*/
const NotFound = () => (
  <Layout>
    <SeoHead title="Page Not Found | Melitta Siomos Dance Academy" description="That page doesn't exist — but your first salsa class does. Browse our salsa and bachata classes, wedding dance lessons, and more in West London." path="/404" />
    <section className="section-padding section-dark text-center min-h-[75vh] flex items-center justify-center relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="font-display text-7xl md:text-9xl font-bold text-primary mb-3"
        >
          404
        </motion.h1>

        {/* Animated CSS dancing figure */}
        <div className="mb-6 flex justify-center" aria-hidden="true">
          <div className="dancing-figure">
            <span className="head" />
            <span className="body" />
            <span className="arm-l" />
            <span className="arm-r" />
            <span className="leg-l" />
            <span className="leg-r" />
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3"
        >
          Lost on the dance floor?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-primary-foreground/60 mb-8 font-heading"
        >
          That page doesn't exist — but your first salsa class does. Pick a path back below.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link to="/" className="btn-cta-primary text-sm">← Go Back Home</Link>
          <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-outline text-sm">🎟 Book a Class</a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {quickLinks.map((page) => (
            <Link key={page.to} to={page.to} className="bg-charcoal-light rounded-xl p-4 card-hover flex flex-col items-center gap-1.5 text-center">
              <span className="text-2xl">{page.emoji}</span>
              <span className="font-heading font-semibold text-xs text-primary-foreground">{page.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .dancing-figure {
          position: relative;
          width: 60px;
          height: 100px;
          animation: dance-sway 1.4s ease-in-out infinite;
        }
        .dancing-figure span { position: absolute; background: hsl(var(--primary)); display: block; }
        .dancing-figure .head {
          width: 18px; height: 18px; border-radius: 50%;
          top: 0; left: 50%; transform: translateX(-50%);
        }
        .dancing-figure .body {
          width: 4px; height: 38px; border-radius: 2px;
          top: 18px; left: 50%; transform: translateX(-50%);
        }
        .dancing-figure .arm-l, .dancing-figure .arm-r {
          width: 4px; height: 28px; border-radius: 2px;
          top: 22px; transform-origin: top center;
        }
        .dancing-figure .arm-l { left: calc(50% - 2px); animation: arm-l 1.4s ease-in-out infinite; }
        .dancing-figure .arm-r { left: calc(50% - 2px); animation: arm-r 1.4s ease-in-out infinite; }
        .dancing-figure .leg-l, .dancing-figure .leg-r {
          width: 4px; height: 36px; border-radius: 2px;
          top: 56px; transform-origin: top center;
        }
        .dancing-figure .leg-l { left: calc(50% - 2px); animation: leg-l 1.4s ease-in-out infinite; }
        .dancing-figure .leg-r { left: calc(50% - 2px); animation: leg-r 1.4s ease-in-out infinite; }
        @keyframes dance-sway {
          0%, 100% { transform: rotate(-6deg) translateY(0); }
          50% { transform: rotate(6deg) translateY(-4px); }
        }
        @keyframes arm-l {
          0%, 100% { transform: rotate(-30deg); }
          50% { transform: rotate(-110deg); }
        }
        @keyframes arm-r {
          0%, 100% { transform: rotate(110deg); }
          50% { transform: rotate(30deg); }
        }
        @keyframes leg-l {
          0%, 100% { transform: rotate(-12deg); }
          50% { transform: rotate(12deg); }
        }
        @keyframes leg-r {
          0%, 100% { transform: rotate(12deg); }
          50% { transform: rotate(-12deg); }
        }
      `}</style>
    </section>
  </Layout>
);

export default NotFound;
