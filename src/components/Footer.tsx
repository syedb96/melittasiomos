import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Star, ExternalLink } from "lucide-react";

const Footer = () => (
  <footer className="bg-charcoal text-primary-foreground/70">
    <div className="container-main py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1 — Brand */}
        <div>
          <h4 className="font-display text-xl font-bold text-primary-foreground mb-2">Melitta Siomos</h4>
          <p className="text-primary/60 font-accent text-[10px] tracking-[0.2em] uppercase mb-4">London's Home of Salsa & Bachata</p>
          <p className="text-sm leading-relaxed mb-4">Melitta Siomos is an award-winning Salsa and Bachata instructor in West London, founder of Pura Nights, Pura Ladies, and Wedding Dance Made Easy.</p>
          <div className="flex items-center gap-1 text-primary mb-2">
            {Array(5).fill(0).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
            <span className="text-xs font-accent ml-1">5.0 on Google</span>
          </div>
          <a href="[GBP_MAIN_URL]" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
            Read Our Google Reviews <ExternalLink size={10} />
          </a>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <h4 className="font-heading font-semibold text-primary-foreground text-sm tracking-wider mb-4">QUICK LINKS</h4>
          <ul className="space-y-2 text-sm">
            {[
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
            ].map(l => (
              <li key={l.to}><Link to={l.to} className="hover:text-primary transition-colors">{l.label}</Link></li>
            ))}
          </ul>

          <h4 className="font-heading font-semibold text-primary-foreground text-sm tracking-wider mt-6 mb-3">FIND CLASSES NEAR YOU</h4>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/salsa-classes-london", label: "Salsa Classes London" },
              { to: "/bachata-classes-london", label: "Bachata Classes London" },
              { to: "/salsa-classes-chiswick", label: "Salsa in Chiswick" },
              { to: "/bachata-classes-chiswick", label: "Bachata in Chiswick" },
              { to: "/salsa-classes-ealing", label: "Salsa in Ealing" },
              { to: "/bachata-classes-ealing", label: "Bachata in Ealing" },
              { to: "/salsa-classes-acton", label: "Salsa Near Acton" },
              { to: "/dance-classes-ealing", label: "Dance Classes Ealing" },
              { to: "/dance-classes-chiswick", label: "Dance Classes Chiswick" },
              { to: "/dance-classes-west-london", label: "Dance Classes West London" },
              { to: "/bachata-classes-west-london", label: "Bachata West London" },
              { to: "/latin-dance-classes-london", label: "Latin Dance London" },
              { to: "/wedding-dance-west-london", label: "Wedding Dance West London" },
              { to: "/wedding-dance-lessons-london", label: "Wedding Dance London" },
              { to: "/private-dance-lessons-west-london", label: "Private Lessons West London" },
              { to: "/private-salsa-lessons-london", label: "Private Salsa London" },
              { to: "/ladies-styling-london", label: "Ladies Styling London" },
              { to: "/bachata-performance-team-london", label: "Performance Team London" },
            ].map(l => (
              <li key={l.to}><Link to={l.to} className="hover:text-primary transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Follow + Locations */}
        <div>
          <h4 className="font-heading font-semibold text-primary-foreground text-sm tracking-wider mb-4">FOLLOW US</h4>
          <ul className="space-y-2 text-sm mb-6">
            <li><a href="https://www.instagram.com/melittasiomos/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors"><Instagram size={14} /> @melittasiomos</a></li>
            <li><a href="https://www.instagram.com/puranights.salsabachata/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors"><Instagram size={14} /> @puranights.salsabachata</a></li>
            <li><a href="https://www.instagram.com/puraladies/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors"><Instagram size={14} /> @puraladies</a></li>
            <li><a href="https://www.instagram.com/wedding_dance_made_easy/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors"><Instagram size={14} /> @wedding_dance_made_easy</a></li>
            <li><a href="https://www.facebook.com/puranights/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors"><Facebook size={14} /> Pura Nights</a></li>
            <li><a href="https://www.youtube.com/@melittasiomos" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors"><Youtube size={14} /> @melittasiomos</a></li>
          </ul>

          <h4 className="font-heading font-semibold text-primary-foreground text-sm tracking-wider mb-3">CLASS LOCATIONS</h4>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2">
              <MapPin size={12} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-primary-foreground font-heading font-semibold text-xs">Mon — Chiswick</p>
                <p>The George IV, 185 Chiswick High Rd, W4 2DR</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={12} className="text-peach mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-primary-foreground font-heading font-semibold text-xs">Tue — Ealing</p>
                <p>Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
              </div>
            </div>
          </div>
          <a href="[GBP_MAIN_URL]" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-xs text-primary hover:underline">
            <MapPin size={10} /> Find Us on Google Maps
          </a>
        </div>

        {/* Col 4 — Contact */}
        <div>
          <h4 className="font-heading font-semibold text-primary-foreground text-sm tracking-wider mb-4">CONTACT</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Phone size={14} className="text-primary" /><a href="tel:+447449482343" className="hover:text-primary transition-colors">07449 482 343</a></li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-primary" /><a href="mailto:siomosmelitta@gmail.com" className="hover:text-primary transition-colors">siomosmelitta@gmail.com</a></li>
          </ul>
          <div className="mt-5 space-y-3">
            <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 btn-cta text-[10px] py-2.5 px-5 rounded-lg text-white" style={{ backgroundColor: '#25D366' }}>
              💬 WhatsApp Melitta
            </a>
            <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="block btn-cta-primary text-[10px] py-2.5 px-5 rounded-lg">
              🎟 Book a Class
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-primary-foreground/5 py-4">
      <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/40">
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