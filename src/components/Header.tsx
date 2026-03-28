import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, Instagram, Facebook, Youtube, ChevronDown } from "lucide-react";

const navGroups = [
  { label: "HOME", path: "/", dropdown: null },
  {
    label: "CLASSES & EVENTS",
    path: "/pura-nights",
    dropdown: [
      { label: "Weekly Classes", path: "/pura-nights" },
      { label: "Monthly Latin Fridays", path: "/events" },
      { label: "Pura Ladies", path: "/pura-ladies" },
      { label: "Online Classes", path: "/online-classes" },
    ],
  },
  {
    label: "PRICES & BOOKING",
    path: "/prices",
    dropdown: [
      { label: "Pricing", path: "/prices" },
      { label: "Book a Class", path: "https://linktr.ee/pura.nights", external: true },
      { label: "Gift Vouchers", path: "/gift-vouchers" },
    ],
  },
  {
    label: "ABOUT & SERVICES",
    path: "/about",
    dropdown: [
      { label: "About Melitta", path: "/about" },
      { label: "Wedding Dance", path: "/wedding-dance" },
      { label: "Private Lessons", path: "/private-lessons" },
      { label: "Testimonials", path: "/testimonials" },
    ],
  },
  {
    label: "LEARN",
    path: "/blog",
    dropdown: [
      { label: "Blog", path: "/blog" },
      { label: "FAQs", path: "/faq" },
      { label: "Find a Class", path: "/locations" },
      { label: "Start Here", path: "/start-here" },
      { label: "Gallery", path: "/gallery" },
      { label: "Contact", path: "/contact" },
    ],
  },
];

const allDropdownPaths = navGroups.flatMap(g => g.dropdown?.map(d => d.path) ?? [g.path]);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdownIdx, setOpenDropdownIdx] = useState<number | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdownIdx(null);
  }, [location]);

  const openDropdown = (idx: number) => {
    clearTimeout(hoverTimeout.current);
    setOpenDropdownIdx(idx);
  };
  const closeDropdown = () => {
    hoverTimeout.current = setTimeout(() => setOpenDropdownIdx(null), 200);
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
            {navGroups.map((group, idx) =>
              group.dropdown ? (
                <div
                  key={idx}
                  className="relative"
                  onMouseEnter={() => openDropdown(idx)}
                  onMouseLeave={closeDropdown}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-[11px] font-heading font-semibold tracking-wider transition-colors ${
                      group.dropdown.some(d => d.path === location.pathname)
                        ? "text-primary"
                        : "text-primary-foreground/70 hover:text-primary"
                    }`}
                  >
                    {group.label} <ChevronDown size={11} className={`transition-transform ${openDropdownIdx === idx ? "rotate-180" : ""}`} />
                  </button>
                  {openDropdownIdx === idx && (
                    <div className="absolute top-full left-0 mt-0 bg-charcoal-light border border-primary-foreground/5 rounded-xl shadow-xl min-w-[220px] py-2 z-50">
                      {group.dropdown.map((sub) =>
                        (sub as any).external ? (
                          <a
                            key={sub.path}
                            href={sub.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-5 py-2.5 text-[11px] font-heading text-primary-foreground/60 hover:text-primary hover:bg-primary/5 transition-colors"
                          >
                            {sub.label} ↗
                          </a>
                        ) : (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className={`block px-5 py-2.5 text-[11px] font-heading transition-colors ${
                              location.pathname === sub.path ? "text-primary bg-primary/5" : "text-primary-foreground/60 hover:text-primary hover:bg-primary/5"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={idx}
                  to={group.path}
                  className={`px-3 py-2 text-[11px] font-heading font-semibold tracking-wider transition-colors ${
                    location.pathname === group.path
                      ? "text-primary"
                      : "text-primary-foreground/70 hover:text-primary"
                  }`}
                >
                  {group.label}
                </Link>
              )
            )}
            <a
              href="https://linktr.ee/pura.nights"
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

        {/* Mobile Menu — flat list with section headers */}
        {isMobileOpen && (
          <div className="xl:hidden bg-charcoal fixed inset-0 top-[88px] z-50 flex flex-col items-center justify-start pt-8 gap-1 overflow-y-auto pb-24 animate-fade-in-up">
            {navGroups.map((group, idx) => (
              <div key={idx} className="w-full max-w-xs">
                {group.dropdown ? (
                  <>
                    <p className="text-primary font-heading font-bold text-xs tracking-wider uppercase text-center mt-4 mb-2">{group.label}</p>
                    {group.dropdown.map((sub) =>
                      (sub as any).external ? (
                        <a
                          key={sub.path}
                          href={sub.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-center py-2 text-sm font-heading text-primary-foreground/70 hover:text-primary transition-colors"
                        >
                          {sub.label} ↗
                        </a>
                      ) : (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className={`block text-center py-2 text-sm font-heading transition-colors ${
                            location.pathname === sub.path ? "text-primary" : "text-primary-foreground/70 hover:text-primary"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      )
                    )}
                    <div className="h-px bg-primary-foreground/10 my-2 mx-8" />
                  </>
                ) : (
                  <Link
                    to={group.path}
                    className={`block text-center py-2.5 text-lg font-heading font-bold tracking-wider ${
                      location.pathname === group.path ? "text-primary" : "text-primary-foreground/80"
                    }`}
                  >
                    {group.label}
                  </Link>
                )}
              </div>
            ))}
            <a href="https://linktr.ee/pura.nights" target="_blank" rel="noopener noreferrer" className="mt-4 btn-cta-primary text-sm">
              BOOK NOW
            </a>
            <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="mt-2 btn-cta text-sm text-white py-2.5 px-6 rounded-lg" style={{ backgroundColor: "#25D366" }}>
              💬 WhatsApp Melitta
            </a>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;