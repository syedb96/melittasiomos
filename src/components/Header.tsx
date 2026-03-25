import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, Instagram, Facebook, Youtube, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "ABOUT MELITTA", path: "/about" },
  {
    label: "CLASSES",
    path: "/pura-nights",
    dropdown: [
      { label: "Pura Nights Weekly Classes", path: "/pura-nights" },
      { label: "Private 1-on-1 Lessons", path: "/private-lessons" },
      { label: "Online Classes", path: "/online-classes" },
    ],
  },
  { label: "PURA LADIES", path: "/pura-ladies" },
  { label: "WEDDING DANCE", path: "/wedding-dance" },
  { label: "PRICES", path: "/prices" },
  { label: "GIFT VOUCHERS", path: "/gift-vouchers" },
  { label: "BLOG", path: "/blog" },
  { label: "CONTACT", path: "/contact" },
];

const dropdownPaths = ["/pura-nights", "/private-lessons", "/online-classes", "/bookings"];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const openDropdown = () => {
    clearTimeout(hoverTimeout.current);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    hoverTimeout.current = setTimeout(() => setDropdownOpen(false), 200);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-charcoal text-primary-foreground/70 text-xs py-2 px-4 font-heading">
        <div className="container-main flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="tel:+447449482343" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Phone size={11} /> 07449 482 343
            </a>
            <a href="mailto:siomosmelitta@gmail.com" className="hidden sm:flex items-center gap-1.5 hover:text-primary transition-colors">
              <Mail size={11} /> siomosmelitta@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/melittasiomos/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors"><Instagram size={13} /></a>
            <a href="https://www.facebook.com/puranights/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary transition-colors"><Facebook size={13} /></a>
            <a href="https://www.youtube.com/@melittasiomos" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-primary transition-colors"><Youtube size={13} /></a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-charcoal/98 shadow-lg backdrop-blur-sm" : "bg-charcoal"}`}>
        <div className="container-main flex items-center justify-between py-3">
          <Link to="/" className="flex flex-col leading-tight group">
            <span className="text-primary-foreground font-display text-xl font-bold tracking-tight group-hover:text-primary transition-colors">Melitta Siomos</span>
            <span className="text-primary/70 font-accent text-[9px] tracking-[0.2em] uppercase">Pura Nights · Pura Ladies · Wedding Dance</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navLinks.map(link =>
              link.dropdown ? (
                <div
                  key={link.path}
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-[11px] font-heading font-semibold tracking-wider transition-colors ${
                      dropdownPaths.includes(location.pathname)
                        ? "text-primary"
                        : "text-primary-foreground/70 hover:text-primary"
                    }`}
                  >
                    {link.label} <ChevronDown size={11} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-0 bg-charcoal-light border border-primary-foreground/5 rounded-xl shadow-xl min-w-[220px] py-2 z-50">
                      {link.dropdown.map(sub => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className={`block px-5 py-2.5 text-[11px] font-heading transition-colors ${
                            location.pathname === sub.path ? "text-primary bg-primary/5" : "text-primary-foreground/60 hover:text-primary hover:bg-primary/5"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-[11px] font-heading font-semibold tracking-wider transition-colors ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-primary-foreground/70 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href="https://www.tickettailor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 btn-cta-primary text-[10px] py-2.5 px-5 rounded-lg"
            >
              BOOK NOW
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="xl:hidden text-primary-foreground p-2" aria-label="Toggle menu">
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="xl:hidden bg-charcoal fixed inset-0 top-[88px] z-50 flex flex-col items-center justify-start pt-10 gap-3 overflow-y-auto pb-20 animate-fade-in-up">
            {navLinks.map(link =>
              link.dropdown ? (
                <div key={link.path} className="flex flex-col items-center gap-2">
                  <span className="text-sm font-heading font-bold tracking-wider text-primary uppercase">{link.label}</span>
                  {link.dropdown.map(sub => (
                    <Link key={sub.path} to={sub.path} className="text-sm font-heading text-primary-foreground/60 hover:text-primary transition-colors">
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg font-heading font-bold tracking-wider ${
                    location.pathname === link.path ? "text-primary" : "text-primary-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <a href="https://www.tickettailor.com" target="_blank" rel="noopener noreferrer" className="mt-4 btn-cta-primary text-sm">
              BOOK NOW
            </a>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
