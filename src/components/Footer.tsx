import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Star, ExternalLink } from "lucide-react";

const Footer = () => (
  <footer className="bg-charcoal text-primary-foreground/60">
    {/* Gold accent bar */}
    <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(43 48% 54%), hsl(20 75% 66%), hsl(43 48% 54%))" }} />

    {/* Brand Statement */}
    <div className="container-main pt-14 pb-10 text-center border-b border-primary-foreground/6">
      <h4 className="font-display text-2xl font-bold text-primary-foreground mb-1">Melitta Siomos Dance Academy</h4>
      <p className="text-primary-foreground/40 text-xs font-heading mb-2">Award-winning Salsa & Bachata instruction in West London since 2017</p>
      <p className="text-primary-foreground/30 text-[11px] font-heading max-w-md mx-auto mb-5">Weekly classes · Private coaching · Wedding dance · Performance teams · Monthly Latin socials</p>
      
      {/* Google Review Badge */}
      <div className="flex justify-center mb-5">
        <a href="https://maps.google.com/?q=Pura+Nights+Salsa+Bachata+London" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary-foreground/5 rounded-full px-4 py-2 hover:bg-primary-foreground/10 transition-colors">
          <span className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-primary text-primary" />)}</span>
          <span className="text-primary-foreground text-xs font-heading font-semibold">5.0</span>
          <span className="text-primary-foreground/40 text-[10px] font-heading">on Google</span>
        </a>
      </div>

      <div className="flex justify-center gap-4">
        {[
          { href: "https://www.instagram.com/melittasiomos/", label: "@melittasiomos" },
          { href: "https://www.instagram.com/puranights.salsabachata/", label: "@puranights" },
          { href: "https://www.instagram.com/puraladies/", label: "@puraladies" },
          { href: "https://www.instagram.com/wedding_dance_made_easy/", label: "@weddingdance" },
        ].map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-primary-foreground/30 hover:text-primary transition-colors"><Instagram size={16} /></a>
        ))}
        <a href="https://www.facebook.com/puranights/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-primary-foreground/30 hover:text-primary transition-colors"><Facebook size={16} /></a>
        <a href="https://www.youtube.com/@melittasiomos" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-primary-foreground/30 hover:text-primary transition-colors"><Youtube size={16} /></a>
      </div>
    </div>

    {/* 5-Column Grid */}
    <div className="container-main py-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-8 text-[13px]">
        {/* Col 1 — Classes & Events */}
        <div>
          <h5 className="font-heading font-semibold text-primary-foreground text-[11px] tracking-wider uppercase mb-3">Classes & Events</h5>
          <ul className="space-y-1.5">
            <li><Link to="/pura-nights" className="hover:text-primary transition-colors">Weekly Classes</Link></li>
            <li><Link to="/events" className="hover:text-primary transition-colors">Monthly Latin Fridays</Link></li>
            <li><Link to="/pura-ladies" className="hover:text-primary transition-colors">Pura Ladies</Link></li>
            <li><Link to="/online-salsa-bachata-coaching" className="hover:text-primary transition-colors">Online Coaching</Link></li>
            <li><Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
            <li><Link to="/schedule" className="hover:text-primary transition-colors">Full Schedule</Link></li>
          </ul>
        </div>

        {/* Col 2 — Prices & Booking */}
        <div>
          <h5 className="font-heading font-semibold text-primary-foreground text-[11px] tracking-wider uppercase mb-3">Prices & Booking</h5>
          <ul className="space-y-1.5">
            <li><Link to="/prices" className="hover:text-primary transition-colors">Class Pricing</Link></li>
            <li><a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Book a Class ↗</a></li>
            <li><Link to="/gift-vouchers" className="hover:text-primary transition-colors">Gift Vouchers</Link></li>
            <li><Link to="/testimonials" className="hover:text-primary transition-colors">Student Reviews</Link></li>
            <li><Link to="/bookings" className="hover:text-primary transition-colors">All Booking Options</Link></li>
          </ul>
        </div>

        {/* Col 3 — About & Services */}
        <div>
          <h5 className="font-heading font-semibold text-primary-foreground text-[11px] tracking-wider uppercase mb-3">About & Services</h5>
          <ul className="space-y-1.5">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Melitta</Link></li>
            <li><Link to="/wedding-dance" className="hover:text-primary transition-colors">Wedding Dance</Link></li>
            <li><Link to="/private-lessons" className="hover:text-primary transition-colors">Private Lessons</Link></li>
            <li><Link to="/start-here" className="hover:text-primary transition-colors">Start Here</Link></li>
            <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            <li><Link to="/blog" className="hover:text-primary transition-colors">Blog & Guides</Link></li>
            <li><Link to="/proof-centre" className="hover:text-primary transition-colors">Proof Centre</Link></li>
            <li><Link to="/all-pages-master" className="hover:text-primary transition-colors">All Pages</Link></li>
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
            <li><Link to="/dance-classes-south-west-london" className="hover:text-primary transition-colors">South West London</Link></li>
            <li><Link to="/salsa-classes-richmond" className="hover:text-primary transition-colors">Richmond</Link></li>
            <li><Link to="/salsa-classes-hammersmith" className="hover:text-primary transition-colors">Hammersmith</Link></li>
            <li><Link to="/dance-classes-hounslow" className="hover:text-primary transition-colors">Hounslow</Link></li>
            <li><Link to="/venue/the-george-iv-chiswick" className="hover:text-primary transition-colors">The George IV Venue</Link></li>
            <li><Link to="/venue/the-drayton-court-ealing" className="hover:text-primary transition-colors">Drayton Court Venue</Link></li>
            <li><Link to="/locations" className="hover:text-primary transition-colors">All Locations</Link></li>
          </ul>
        </div>

        {/* Col 5 — Contact */}
        <div>
          <h5 className="font-heading font-semibold text-primary-foreground text-[11px] tracking-wider uppercase mb-3">Contact</h5>
          <ul className="space-y-2.5 text-xs">
            <li><a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors"><Phone size={12} className="text-primary flex-shrink-0" /> +44 7449 482 343</a></li>
            <li><a href="mailto:siomosmelitta@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors"><Mail size={12} className="text-primary flex-shrink-0" /> siomosmelitta@gmail.com</a></li>
            <li className="flex items-start gap-2"><MapPin size={12} className="text-primary flex-shrink-0 mt-0.5" /><span>Mon: The George IV, W4 2DR</span></li>
            <li className="flex items-start gap-2"><MapPin size={12} className="text-peach flex-shrink-0 mt-0.5" /><span>Tue: Drayton Court Hotel, W13 8PH</span></li>
          </ul>
          <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-heading font-semibold text-charcoal transition-all hover:opacity-90 mt-4" style={{ background: 'var(--gradient-gold)' }}>
            💬 WhatsApp Melitta
          </a>
        </div>
      </div>
    </div>

    {/* Google Business Profiles */}
    <div className="border-t border-primary-foreground/6">
      <div className="container-main py-8">
        <h5 className="font-heading font-semibold text-primary-foreground/40 text-[10px] tracking-wider uppercase text-center mb-5">Find Us on Google</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { name: "Pura Nights", desc: "Weekly Classes", url: "https://maps.google.com/?q=Pura+Nights+Salsa+Bachata+London" },
            { name: "Wedding Dance Made Easy", desc: "First Dance Coaching", url: "https://maps.google.com/?q=Wedding+Dance+Made+Easy+Melitta+Siomos+London" },
            { name: "Pura Ladies", desc: "Performance Company", url: "https://maps.google.com/?q=Pura+Ladies+Dance+Company+London" },
            { name: "Melitta Siomos", desc: "Dance Academy", url: "https://maps.google.com/?q=Melitta+Siomos+Dance+Academy+London" },
          ].map(p => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="bg-primary-foreground/3 rounded-xl p-3 text-center hover:bg-primary-foreground/6 transition-colors group">
              <p className="text-primary-foreground/70 text-xs font-heading font-semibold group-hover:text-primary transition-colors">{p.name}</p>
              <p className="text-primary-foreground/30 text-[10px] font-heading">{p.desc}</p>
              <span className="text-primary/60 text-[10px] font-heading inline-flex items-center gap-0.5 mt-1">View on Google <ExternalLink size={8} /></span>
            </a>
          ))}
        </div>
      </div>
    </div>

    {/* Newsletter hint */}
    <div className="border-t border-primary-foreground/6">
      <div className="container-main py-6 text-center">
        <p className="text-primary-foreground/30 text-xs font-heading">📩 Follow us on Instagram for class updates, event announcements, and community highlights</p>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-primary-foreground/6">
      <div className="container-main flex flex-col md:flex-row items-center justify-between gap-2 py-4 text-[11px] text-primary-foreground/25">
        <p>© {new Date().getFullYear()} Melitta Siomos Dance Academy · Pura Nights</p>
        <div className="flex gap-3">
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>
        <p>Built with ♥ in West London</p>
      </div>
    </div>
  </footer>
);

export default Footer;
