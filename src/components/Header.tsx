import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "ABOUT US", path: "/about" },
  { label: "LESSONS & EVENTS", path: "/pura-nights" },
  { label: "PRICES", path: "/prices" },
  { label: "BOOKINGS", path: "/bookings" },
  { label: "CONTACT", path: "/contact" },
  { label: "FAQ", path: "/faq" },
  { label: "BLOG", path: "/blog" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground text-xs py-2 px-4 font-heading">
        <div className="container-main flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="tel:+447449482343" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Phone size={12} /> 07449 482 343
            </a>
            <a href="mailto:siomosmelitta@gmail.com" className="hidden sm:flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Mail size={12} /> siomosmelitta@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/melitta.siomos" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={14} /></a>
            <a href="https://www.facebook.com/melitta.siomos" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={14} /></a>
            <a href="https://www.youtube.com/@MelittaSiomos" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={14} /></a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-charcoal shadow-lg" : "bg-charcoal/95"}`}>
        <div className="container-main flex items-center justify-between py-3">
          <Link to="/" className="flex flex-col leading-tight">
            <span className="text-primary-foreground font-display text-lg font-bold">Melitta Siomos</span>
            <span className="text-primary-foreground/70 font-heading text-[10px] tracking-wider">Pura Nights | Pura Ladies | Wedding Dance Made Easy</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-xs font-heading font-semibold tracking-wider transition-colors ${
                  location.pathname === link.path
                    ? "text-primary border-b-2 border-primary"
                    : "text-primary-foreground/80 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://www.tickettailor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 btn-cta-primary text-xs py-2 px-5"
            >
              BOOK NOW
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="lg:hidden text-primary-foreground p-2" aria-label="Toggle menu">
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="lg:hidden bg-primary fixed inset-0 top-[88px] z-50 flex flex-col items-center justify-center gap-6 animate-fade-in-up">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xl font-heading font-bold tracking-wider ${
                  location.pathname === link.path ? "text-secondary" : "text-primary-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a href="https://www.tickettailor.com" target="_blank" rel="noopener noreferrer" className="mt-4 btn-cta bg-charcoal text-primary-foreground text-sm">
              BOOK NOW
            </a>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
