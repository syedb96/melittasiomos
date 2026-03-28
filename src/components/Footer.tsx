import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Star } from "lucide-react";

const siteLinks = [
  { to: "/about", label: "About Melitta" },
  { to: "/pura-nights", label: "Weekly Classes" },
  { to: "/pura-ladies", label: "Pura Ladies" },
  { to: "/events", label: "Events" },
  { to: "/prices", label: "Prices" },
  { to: "/private-lessons", label: "Private Lessons" },
  { to: "/wedding-dance", label: "Wedding Dance" },
  { to: "/gift-vouchers", label: "Gift Vouchers" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const localPages = [
  { to: "/salsa-classes-london", label: "Salsa London" },
  { to: "/bachata-classes-london", label: "Bachata London" },
  { to: "/salsa-classes-chiswick", label: "Salsa Chiswick" },
  { to: "/bachata-classes-ealing", label: "Bachata Ealing" },
  { to: "/dance-classes-west-london", label: "West London" },
  { to: "/salsa-classes-south-west-london", label: "Salsa SW London" },
  { to: "/bachata-classes-south-west-london", label: "Bachata SW London" },
  { to: "/latin-dance-classes-london", label: "Latin Dance London" },
  { to: "/wedding-dance-lessons-london", label: "Wedding Dance London" },
  { to: "/ladies-styling-london", label: "Ladies Styling" },
];

const socials = [
  { href: "https://www.instagram.com/melittasiomos/", icon: Instagram, label: "@melittasiomos" },
  { href: "https://www.instagram.com/puranights.salsabachata/", icon: Instagram, label: "@puranights" },
  { href: "https://www.instagram.com/puraladies/", icon: Instagram, label: "@puraladies" },
  { href: "https://www.facebook.com/puranights/", icon: Facebook, label: "Pura Nights" },
  { href: "https://www.youtube.com/@melittasiomos", icon: Youtube, label: "@melittasiomos" },
];

const Footer = () => (
  <footer className="bg-charcoal text-primary-foreground/60">
    <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, hsl(43 48% 54%), hsl(20 75% 66%), hsl(43 48% 54%))" }} />

    <div className="container-main pt-14 pb-10">
      {/* Top — Brand + CTAs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-8 border-b border-primary-foreground/8">
        <div>
          <h4 className="font-display text-xl font-bold text-primary-foreground mb-0.5">Melitta Siomos</h4>
          <p className="font-accent text-[9px] tracking-[0.25em] uppercase text-primary/40">London's Home of Salsa & Bachata</p>
        </div>
        <div className="flex items-center gap-2.5">
          <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-heading font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "#25D366" }}>
            💬 WhatsApp
          </a>
          <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer"
            className="btn-cta-primary text-xs py-2 px-4 rounded-lg">
            🎟 Book a Class
          </a>
        </div>
      </div>

      {/* Main grid — clean 4-column layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 text-[13px]">
        {/* Col 1 — Brand */}
        <div className="col-span-2 md:col-span-1">
          <p className="text-sm leading-relaxed mb-4 text-primary-foreground/50">Award-winning Salsa & Bachata instructor. Founder of Pura Nights, Pura Ladies & Wedding Dance Made Easy.</p>
          <div className="flex items-center gap-0.5 text-primary mb-3">
            {Array(5).fill(0).map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
            <span className="text-[10px] font-accent ml-1 text-primary-foreground/40">5.0 Google</span>
          </div>
          <div className="flex items-center gap-2.5 mt-3">
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="text-primary-foreground/35 hover:text-primary transition-colors">
                <s.icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Site Links */}
        <div>
          <h5 className="font-heading font-semibold text-primary-foreground text-[11px] tracking-wider uppercase mb-3">Explore</h5>
          <ul className="space-y-1">
            {siteLinks.map(l => (
              <li key={l.to}><Link to={l.to} className="hover:text-primary transition-colors leading-snug">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Local SEO Pages */}
        <div>
          <h5 className="font-heading font-semibold text-primary-foreground text-[11px] tracking-wider uppercase mb-3">Find Classes</h5>
          <ul className="space-y-1">
            {localPages.map(l => (
              <li key={l.to}><Link to={l.to} className="hover:text-primary transition-colors leading-snug">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Locations + Contact */}
        <div>
          <h5 className="font-heading font-semibold text-primary-foreground text-[11px] tracking-wider uppercase mb-3">Class Locations</h5>
          <div className="space-y-3 text-xs mb-5">
            <div className="flex items-start gap-1.5">
              <MapPin size={11} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-primary-foreground font-heading font-semibold text-[11px]">Mon — Chiswick</p>
                <p className="leading-snug text-primary-foreground/40">The George IV, W4 2DR</p>
              </div>
            </div>
            <div className="flex items-start gap-1.5">
              <MapPin size={11} className="text-peach mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-primary-foreground font-heading font-semibold text-[11px]">Tue — Ealing</p>
                <p className="leading-snug text-primary-foreground/40">Drayton Court Hotel, W13 8PH</p>
              </div>
            </div>
          </div>
          <h5 className="font-heading font-semibold text-primary-foreground text-[11px] tracking-wider uppercase mb-2">Contact</h5>
          <ul className="space-y-1.5 text-xs">
            <li><a href="tel:+447449482343" className="flex items-center gap-1.5 hover:text-primary transition-colors"><Phone size={11} className="text-primary flex-shrink-0" /> 07449 482 343</a></li>
            <li><a href="mailto:siomosmelitta@gmail.com" className="flex items-center gap-1.5 hover:text-primary transition-colors"><Mail size={11} className="text-primary flex-shrink-0" /> siomosmelitta@gmail.com</a></li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-primary-foreground/6">
      <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-1.5 py-4 text-[11px] text-primary-foreground/30">
        <p>© {new Date().getFullYear()} Melitta Siomos · Pura Nights · All Rights Reserved</p>
        <div className="flex gap-3">
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
