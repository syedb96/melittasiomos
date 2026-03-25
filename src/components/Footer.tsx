import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Star, ExternalLink } from "lucide-react";

const quickLinks = [
  { to: "/about", label: "About Melitta" },
  { to: "/pura-nights", label: "Weekly Classes" },
  { to: "/private-lessons", label: "Private Lessons" },
  { to: "/wedding-dance", label: "Wedding Dance" },
  { to: "/pura-ladies", label: "Pura Ladies" },
  { to: "/prices", label: "Prices & Bundles" },
  { to: "/gift-vouchers", label: "Gift Vouchers" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
  { to: "/start-here", label: "Start Here" },
  { to: "/locations", label: "Locations" },
];

const localPages = [
  { to: "/salsa-classes-london", label: "Salsa Classes London" },
  { to: "/bachata-classes-london", label: "Bachata Classes London" },
  { to: "/salsa-classes-chiswick", label: "Salsa in Chiswick" },
  { to: "/bachata-classes-chiswick", label: "Bachata in Chiswick" },
  { to: "/salsa-classes-ealing", label: "Salsa in Ealing" },
  { to: "/bachata-classes-ealing", label: "Bachata in Ealing" },
  { to: "/salsa-classes-acton", label: "Salsa Near Acton" },
  { to: "/dance-classes-ealing", label: "Dance Classes Ealing" },
  { to: "/dance-classes-chiswick", label: "Dance Classes Chiswick" },
  { to: "/dance-classes-west-london", label: "West London Classes" },
  { to: "/bachata-classes-west-london", label: "Bachata West London" },
  { to: "/latin-dance-classes-london", label: "Latin Dance London" },
  { to: "/wedding-dance-west-london", label: "Wedding Dance W. London" },
  { to: "/wedding-dance-lessons-london", label: "Wedding Dance London" },
  { to: "/private-dance-lessons-west-london", label: "Private Lessons W. London" },
  { to: "/private-salsa-lessons-london", label: "Private Salsa London" },
  { to: "/ladies-styling-london", label: "Ladies Styling London" },
  { to: "/bachata-performance-team-london", label: "Performance Team" },
];

const socials = [
  { href: "https://www.instagram.com/melittasiomos/", icon: Instagram, label: "@melittasiomos" },
  { href: "https://www.instagram.com/puranights.salsabachata/", icon: Instagram, label: "@puranights" },
  { href: "https://www.instagram.com/puraladies/", icon: Instagram, label: "@puraladies" },
  { href: "https://www.instagram.com/wedding_dance_made_easy/", icon: Instagram, label: "@weddingdancemadeeasy" },
  { href: "https://www.facebook.com/puranights/", icon: Facebook, label: "Pura Nights" },
  { href: "https://www.youtube.com/@melittasiomos", icon: Youtube, label: "@melittasiomos" },
];

const Footer = () => (
  <footer className="bg-charcoal text-primary-foreground/60">
    {/* Gold accent line */}
    <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(43 48% 54%), hsl(20 75% 66%), hsl(43 48% 54%))" }} />

    <div className="container-main pt-16 pb-12">
      {/* Top row — Brand + Contact CTAs */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12 pb-10 border-b border-primary-foreground/8">
        <div>
          <h4 className="font-display text-2xl font-bold text-primary-foreground mb-1">Melitta Siomos</h4>
          <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary/50">London's Home of Salsa & Bachata</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://wa.me/447449482343"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-heading font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "#25D366" }}
          >
            💬 WhatsApp Melitta
          </a>
          <a
            href="https://linktr.ee/pura.nights"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-primary text-xs py-2.5 px-5 rounded-lg"
          >
            🎟 Book a Class
          </a>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
        {/* Col 1 — About */}
        <div className="col-span-2 md:col-span-1">
          <p className="text-sm leading-relaxed mb-5">Award-winning Salsa & Bachata instructor in West London. Founder of Pura Nights, Pura Ladies, and Wedding Dance Made Easy.</p>
          <div className="flex items-center gap-1 text-primary mb-2">
            {Array(5).fill(0).map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
            <span className="text-[11px] font-accent ml-1.5 text-primary-foreground/50">5.0 on Google</span>
          </div>
          <div className="flex items-center gap-3 mt-4">
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-primary-foreground/40 hover:text-primary transition-colors">
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <h5 className="font-heading font-semibold text-primary-foreground text-xs tracking-wider uppercase mb-4">Quick Links</h5>
          <ul className="space-y-1.5">
            {quickLinks.map(l => (
              <li key={l.to}>
                <Link to={l.to} className="text-[13px] hover:text-primary transition-colors leading-relaxed">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Find Classes (top half) */}
        <div>
          <h5 className="font-heading font-semibold text-primary-foreground text-xs tracking-wider uppercase mb-4">Find Classes</h5>
          <ul className="space-y-1.5">
            {localPages.slice(0, 9).map(l => (
              <li key={l.to}>
                <Link to={l.to} className="text-[13px] hover:text-primary transition-colors leading-relaxed">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Find Classes (bottom half) */}
        <div>
          <h5 className="font-heading font-semibold text-primary-foreground text-xs tracking-wider uppercase mb-4">More Areas</h5>
          <ul className="space-y-1.5">
            {localPages.slice(9).map(l => (
              <li key={l.to}>
                <Link to={l.to} className="text-[13px] hover:text-primary transition-colors leading-relaxed">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 5 — Locations & Contact */}
        <div>
          <h5 className="font-heading font-semibold text-primary-foreground text-xs tracking-wider uppercase mb-4">Class Locations</h5>
          <div className="space-y-4 text-xs mb-6">
            <div className="flex items-start gap-2">
              <MapPin size={12} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-primary-foreground font-heading font-semibold text-xs">Mon — Chiswick</p>
                <p className="leading-relaxed">The George IV, 185 Chiswick High Rd, W4 2DR</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={12} className="text-peach mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-primary-foreground font-heading font-semibold text-xs">Tue — Ealing</p>
                <p className="leading-relaxed">Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
              </div>
            </div>
          </div>

          <h5 className="font-heading font-semibold text-primary-foreground text-xs tracking-wider uppercase mb-3">Contact</h5>
          <ul className="space-y-2 text-[13px]">
            <li>
              <a href="tel:+447449482343" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone size={12} className="text-primary flex-shrink-0" /> 07449 482 343
              </a>
            </li>
            <li>
              <a href="mailto:siomosmelitta@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail size={12} className="text-primary flex-shrink-0" /> siomosmelitta@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-primary-foreground/8">
      <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-2 py-5 text-xs text-primary-foreground/35">
        <p>© {new Date().getFullYear()} Melitta Siomos | Pura Nights | All Rights Reserved</p>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;