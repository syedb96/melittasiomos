import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="bg-charcoal text-primary-foreground/70">
    <div className="container-main py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1 — Brand */}
        <div>
          <h4 className="font-display text-xl font-bold text-primary-foreground mb-2">Melitta Siomos</h4>
          <p className="text-primary/60 font-accent text-[10px] tracking-[0.2em] uppercase mb-4">London's Home of Salsa & Bachata</p>
          <p className="text-sm leading-relaxed">Award-winning dance instructor, founder of Pura Nights, Pura Ladies & Wedding Dance Made Easy. Weekly classes across West London.</p>
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
              { to: "/blog", label: "Blog" },
              { to: "/faq", label: "FAQ" },
              { to: "/contact", label: "Contact" },
            ].map(l => (
              <li key={l.to}><Link to={l.to} className="hover:text-primary transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Social */}
        <div>
          <h4 className="font-heading font-semibold text-primary-foreground text-sm tracking-wider mb-4">FOLLOW US</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="https://www.instagram.com/melittasiomos/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors"><Instagram size={14} /> @melittasiomos</a></li>
            <li><a href="https://www.instagram.com/puranights.salsabachata/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors"><Instagram size={14} /> @puranights.salsabachata</a></li>
            <li><a href="https://www.instagram.com/puraladies/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors"><Instagram size={14} /> @puraladies</a></li>
            <li><a href="https://www.instagram.com/wedding_dance_made_easy/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors"><Instagram size={14} /> @wedding_dance_made_easy</a></li>
            <li><a href="https://www.facebook.com/puranights/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors"><Facebook size={14} /> Pura Nights</a></li>
            <li><a href="https://www.youtube.com/@melittasiomos" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors"><Youtube size={14} /> @melittasiomos</a></li>
          </ul>
        </div>

        {/* Col 4 — Contact */}
        <div>
          <h4 className="font-heading font-semibold text-primary-foreground text-sm tracking-wider mb-4">CONTACT</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Phone size={14} className="text-primary" /><a href="tel:+447449482343" className="hover:text-primary transition-colors">07449 482 343</a></li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-primary" /><a href="mailto:siomosmelitta@gmail.com" className="hover:text-primary transition-colors">siomosmelitta@gmail.com</a></li>
            <li className="flex items-start gap-2"><MapPin size={14} className="text-primary mt-0.5" /><span>West London & Online</span></li>
          </ul>
          <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 btn-cta-primary text-[10px] py-2 px-5 rounded-lg">
            💬 WhatsApp Us
          </a>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-primary-foreground/5 py-4">
      <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/40">
        <p>© 2026 Melitta Siomos | Pura Nights | All Rights Reserved</p>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
