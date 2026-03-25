import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-charcoal text-primary-foreground/80">
    {/* Main Footer */}
    <div className="container-main py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1 */}
        <div>
          <h4 className="font-heading font-bold text-primary-foreground text-sm tracking-wider mb-4">MELITTA SIOMOS DANCE ACADEMY</h4>
          <div className="h-0.5 w-16 bg-primary mb-4" />
          <ul className="space-y-2 text-sm">
            <li><Link to="/pura-nights" className="hover:text-primary transition-colors">Pura Nights – Weekly Classes</Link></li>
            <li><Link to="/bookings" className="hover:text-primary transition-colors">Monthly Latin Fridays</Link></li>
            <li><Link to="/pura-ladies" className="hover:text-primary transition-colors">Pura Ladies</Link></li>
            <li><Link to="/private-lessons" className="hover:text-primary transition-colors">Private 1-2-1 Classes</Link></li>
            <li><Link to="/wedding-dance" className="hover:text-primary transition-colors">Wedding Dance Made Easy</Link></li>
          </ul>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="font-heading font-bold text-primary-foreground text-sm tracking-wider mb-4">QUICK LINKS</h4>
          <div className="h-0.5 w-16 bg-primary mb-4" />
          <ul className="space-y-2 text-sm">
            <li><Link to="/pura-nights" className="hover:text-primary transition-colors">Classes & Events</Link></li>
            <li><Link to="/private-lessons" className="hover:text-primary transition-colors">Private 1 to 1 Classes</Link></li>
            <li><Link to="/wedding-dance" className="hover:text-primary transition-colors">Wedding Dance</Link></li>
            <li><Link to="/gift-vouchers" className="hover:text-primary transition-colors">Gift Vouchers</Link></li>
            <li><Link to="/prices" className="hover:text-primary transition-colors">Pricing Information</Link></li>
            <li><Link to="/bookings" className="hover:text-primary transition-colors">Book A Class or Lesson Now</Link></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="font-heading font-bold text-primary-foreground text-sm tracking-wider mb-4">STAY CONNECTED</h4>
          <div className="h-0.5 w-16 bg-primary mb-4" />
          <ul className="space-y-2 text-sm">
            <li><a href="https://www.instagram.com/melitta.siomos" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">IG: @melitta.siomos</a></li>
            <li><a href="https://www.instagram.com/PuraNights" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">IG: @PuraNights</a></li>
            <li><a href="https://www.instagram.com/PuraLadies" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">IG: @PuraLadies</a></li>
            <li><a href="https://www.facebook.com/melitta.siomos" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Facebook: /melitta.siomos</a></li>
            <li><a href="https://www.facebook.com/PuraNights" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Facebook: /PuraNights</a></li>
            <li><a href="https://www.youtube.com/@MelittaSiomos" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">YouTube: @MelittaSiomos</a></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="font-heading font-bold text-primary-foreground text-sm tracking-wider mb-4">CONTACT</h4>
          <div className="h-0.5 w-16 bg-primary mb-4" />
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Phone size={14} className="text-primary" /><a href="tel:+447449482343" className="hover:text-primary transition-colors">+44 7449 482 343</a></li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-primary" /><a href="mailto:siomosmelitta@gmail.com" className="hover:text-primary transition-colors">siomosmelitta@gmail.com</a></li>
            <li className="flex items-start gap-2"><MapPin size={14} className="text-primary mt-1" /><span>Acton, West London & Online</span></li>
          </ul>
          <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 btn-cta-primary text-xs py-2 px-4">
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-primary-foreground/10 py-4">
      <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/50">
        <p>© 2025 by Melitta Siomos | All Rights Reserved</p>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">T&Cs</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
