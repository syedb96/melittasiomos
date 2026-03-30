import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Star } from "lucide-react";

const Footer = () => (
  <footer className="bg-charcoal text-primary-foreground/60">
    <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(43 48% 54%), hsl(20 75% 66%), hsl(43 48% 54%))" }} />

    {/* Brand Statement */}
    <div className="container-main pt-12 pb-8 text-center border-b border-primary-foreground/8">
      <h4 className="font-display text-xl font-bold text-primary-foreground mb-1">Pura Nights — Melitta Siomos Dance Academy</h4>
      <p className="text-primary-foreground/40 text-xs font-heading mb-4">Award-winning Salsa & Bachata classes in West London since 2017</p>
      <div className="flex justify-center gap-3">
        {[
          { href: "https://www.instagram.com/melittasiomos/", label: "@melittasiomos" },
          { href: "https://www.instagram.com/puranights.salsabachata/", label: "@puranights" },
          { href: "https://www.instagram.com/puraladies/", label: "@puraladies" },
          { href: "https://www.instagram.com/wedding_dance_made_easy/", label: "@weddingdance" },
        ].map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-primary-foreground/35 hover:text-primary transition-colors"><Instagram size={16} /></a>
        ))}
        <a href="https://www.facebook.com/puranights/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-primary-foreground/35 hover:text-primary transition-colors"><Facebook size={16} /></a>
        <a href="https://www.youtube.com/@melittasiomos" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-primary-foreground/35 hover:text-primary transition-colors"><Youtube size={16} /></a>
      </div>
    </div>

    {/* 5-Column Grid */}
    <div className="container-main py-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8 text-[13px]">
        {/* Col 1 — Classes */}
        <div>
          <h5 className="font-heading font-semibold text-primary-foreground text-[11px] tracking-wider uppercase mb-3">Classes</h5>
          <ul className="space-y-1.5">
            <li><Link to="/pura-nights" className="hover:text-primary transition-colors">Weekly Classes</Link></li>
            <li><Link to="/events" className="hover:text-primary transition-colors">Monthly Latin Fridays</Link></li>
            <li><Link to="/pura-ladies" className="hover:text-primary transition-colors">Pura Ladies</Link></li>
            <li><Link to="/online-classes" className="hover:text-primary transition-colors">Online Classes</Link></li>
            <li><Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
          </ul>
        </div>

        {/* Col 2 — Booking */}
        <div>
          <h5 className="font-heading font-semibold text-primary-foreground text-[11px] tracking-wider uppercase mb-3">Booking</h5>
          <ul className="space-y-1.5">
            <li><Link to="/prices" className="hover:text-primary transition-colors">Pricing</Link></li>
            <li><a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Book a Class ↗</a></li>
            <li><Link to="/gift-vouchers" className="hover:text-primary transition-colors">Gift Vouchers</Link></li>
            <li><Link to="/testimonials" className="hover:text-primary transition-colors">Testimonials</Link></li>
          </ul>
        </div>

        {/* Col 3 — About & Services */}
        <div>
          <h5 className="font-heading font-semibold text-primary-foreground text-[11px] tracking-wider uppercase mb-3">About & Services</h5>
          <ul className="space-y-1.5">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Melitta</Link></li>
            <li><Link to="/wedding-dance" className="hover:text-primary transition-colors">Wedding Dance</Link></li>
            <li><Link to="/private-lessons" className="hover:text-primary transition-colors">Private Lessons</Link></li>
            <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Col 4 — Find a Class */}
        <div>
          <h5 className="font-heading font-semibold text-primary-foreground text-[11px] tracking-wider uppercase mb-3">Find a Class</h5>
          <ul className="space-y-1.5">
            <li><Link to="/salsa-classes-london" className="hover:text-primary transition-colors">Salsa London</Link></li>
            <li><Link to="/bachata-classes-london" className="hover:text-primary transition-colors">Bachata London</Link></li>
            <li><Link to="/salsa-classes-chiswick" className="hover:text-primary transition-colors">Chiswick</Link></li>
            <li><Link to="/salsa-classes-ealing" className="hover:text-primary transition-colors">Ealing</Link></li>
            <li><Link to="/dance-classes-west-london" className="hover:text-primary transition-colors">West London</Link></li>
            <li><Link to="/locations" className="hover:text-primary transition-colors">All Locations</Link></li>
          </ul>
        </div>

        {/* Col 5 — Contact */}
        <div>
          <h5 className="font-heading font-semibold text-primary-foreground text-[11px] tracking-wider uppercase mb-3">Contact</h5>
          <ul className="space-y-2 text-xs">
            <li><a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors"><Phone size={11} className="text-primary flex-shrink-0" /> +44 7449 482 343</a></li>
            <li><a href="mailto:siomosmelitta@gmail.com" className="flex items-center gap-1.5 hover:text-primary transition-colors"><Mail size={11} className="text-primary flex-shrink-0" /> siomosmelitta@gmail.com</a></li>
            <li className="flex items-start gap-1.5"><MapPin size={11} className="text-primary flex-shrink-0 mt-0.5" /><span>Chiswick: The George IV, W4 2DR</span></li>
            <li className="flex items-start gap-1.5"><MapPin size={11} className="text-peach flex-shrink-0 mt-0.5" /><span>Ealing: Drayton Court Hotel, W13 8PH</span></li>
          </ul>
          <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-heading font-semibold text-charcoal transition-all hover:opacity-90 mt-3" style={{ background: 'var(--gradient-gold)' }}>
            💬 WhatsApp Melitta
          </a>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-primary-foreground/6">
      <div className="container-main flex flex-col md:flex-row items-center justify-between gap-2 py-4 text-[11px] text-primary-foreground/30">
        <p>© {new Date().getFullYear()} Pura Nights · Melitta Siomos Dance Academy</p>
        <div className="flex gap-3">
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
        </div>
        <p>Built with ♥ in West London</p>
      </div>
    </div>
  </footer>
);

export default Footer;
