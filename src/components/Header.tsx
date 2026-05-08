import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu, X, Phone, Mail, Instagram, Facebook, Youtube, ChevronDown, MessageCircle,
  CalendarDays, Sparkles, Crown, Laptop, Tag, Gift, User, Heart, UserCheck,
  BookOpen, Users, Clock, Image as ImageIcon, Star, HelpCircle, FileText, MapPin,
} from "lucide-react";

// Premium, minimal nav — high-intent only.
// Local SEO pages live in footer + /locations + contextual links, NOT here.
const navGroups = [
  { label: "HOME", path: "/", dropdown: null },
  {
    label: "CLASSES & EVENTS",
    path: "/pura-nights",
    dropdown: [
      { label: "Weekly Classes", path: "/pura-nights", icon: CalendarDays },
      { label: "Monthly Latin Fridays", path: "/events", icon: Sparkles },
      { label: "Pura Ladies", path: "/pura-ladies", icon: Crown },
      { label: "Online Coaching", path: "/online-salsa-bachata-coaching", icon: Laptop },
    ],
  },
  {
    label: "PRICES & BOOKING",
    path: "/prices",
    dropdown: [
      { label: "Class Pricing", path: "/prices", icon: Tag },
      { label: "Book a Class", path: "https://www.tickettailor.com/events/puranights", external: true, icon: CalendarDays },
      { label: "Gift Vouchers", path: "/gift-vouchers", icon: Gift },
    ],
  },
  {
    label: "ABOUT & SERVICES",
    path: "/about",
    dropdown: [
      { label: "About Melitta", path: "/about", icon: User },
      { label: "Wedding Dance", path: "/wedding-dance", icon: Heart },
      { label: "Private Lessons", path: "/private-lessons", icon: UserCheck },
      { label: "Contact", path: "/contact", icon: Mail },
    ],
  },
  {
    label: "LEARN",
    path: "/blog",
    dropdown: [
      { label: "Start Here", path: "/start-here", icon: BookOpen },
      { label: "Community", path: "/community", icon: Users },
      { label: "Schedule", path: "/schedule", icon: Clock },
      { label: "Gallery", path: "/gallery", icon: ImageIcon },
      { label: "Testimonials", path: "/testimonials", icon: Star },
      { label: "FAQs", path: "/faq", icon: HelpCircle },
      { label: "Blog", path: "/blog", icon: FileText },
      { label: "Find a Class Near You", path: "/locations", icon: MapPin },
    ],
  },
];

const mobileLinks = [
  { label: "Home", path: "/" },
  { divider: true },
  { label: "Weekly Classes", path: "/pura-nights" },
  { label: "Monthly Latin Fridays", path: "/events" },
  { label: "Pura Ladies", path: "/pura-ladies" },
  { label: "Online Coaching", path: "/online-salsa-bachata-coaching" },
  { divider: true },
  { label: "Pricing", path: "/prices" },
  { label: "Gift Vouchers", path: "/gift-vouchers" },
  { divider: true },
  { label: "About Melitta", path: "/about" },
  { label: "Wedding Dance", path: "/wedding-dance" },
  { label: "Private Lessons", path: "/private-lessons" },
  { divider: true },
  { label: "Start Here", path: "/start-here" },
  { label: "Community", path: "/community" },
  { label: "Schedule", path: "/schedule" },
  { label: "Gallery", path: "/gallery" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "FAQs", path: "/faq" },
  { label: "Blog", path: "/blog" },
  { label: "Find a Class Near You", path: "/locations" },
  { label: "Contact", path: "/contact" },
];

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
            <a href="https://www.instagram.com/puranights.salsabachata" target="_blank" rel="noopener noreferrer" aria-label="Instagram Pura Nights" className="hover:text-primary transition-colors"><Instagram size={13} /></a>
            <a href="https://www.facebook.com/puranightslondon" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary transition-colors"><Facebook size={13} /></a>
            <a href="https://www.youtube.com/@melittasiomos" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-primary transition-colors"><Youtube size={13} /></a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#151515]/95 shadow-lg backdrop-blur-sm" : "bg-charcoal"}`}>
        <div className="container-main flex items-center justify-between py-3">
          <Link to="/" className="flex flex-col leading-tight group">
            <span className="text-primary-foreground font-display text-xl font-bold tracking-tight group-hover:text-primary transition-colors">Melitta Siomos</span>
            <span className="text-primary/70 font-accent text-[9px] tracking-[0.2em] uppercase">Pura Nights · Pura Ladies · Wedding Dance</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navGroups.map((group, idx) =>
              group.dropdown ? (
                <div key={idx} className="relative" onMouseEnter={() => openDropdown(idx)} onMouseLeave={closeDropdown}>
                  <button className={`flex items-center gap-1 px-3 py-2 text-[11px] font-heading font-semibold tracking-wider transition-colors relative ${
                    group.dropdown.some(d => d.path === location.pathname) ? "text-primary" : "text-primary-foreground/70 hover:text-primary"
                  }`}>
                    {group.label} <ChevronDown size={11} className={`transition-transform ${openDropdownIdx === idx ? "rotate-180" : ""}`} />
                    {group.dropdown.some(d => d.path === location.pathname) && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
                    )}
                  </button>
                  {openDropdownIdx === idx && (
                    <div className="absolute top-full left-0 mt-0 bg-charcoal-light border border-primary/15 rounded-xl shadow-2xl min-w-[260px] py-2 z-50">
                      {group.dropdown.map((sub) => {
                        const Icon = (sub as any).icon;
                        return (sub as any).external ? (
                          <a key={sub.path} href={sub.path} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-2.5 text-[12px] font-heading text-primary-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors border-l-2 border-transparent hover:border-primary">
                            {Icon && <Icon size={14} className="text-primary/70" />}
                            <span>{sub.label} ↗</span>
                          </a>
                        ) : (
                          <Link key={sub.path} to={sub.path} className={`flex items-center gap-3 px-5 py-2.5 text-[12px] font-heading transition-colors border-l-2 ${
                            location.pathname === sub.path
                              ? "text-primary bg-primary/10 border-primary"
                              : "text-primary-foreground/70 hover:text-primary hover:bg-primary/10 border-transparent hover:border-primary"
                          }`}>
                            {Icon && <Icon size={14} className="text-primary/70" />}
                            <span>{sub.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={idx} to={group.path} className={`px-3 py-2 text-[11px] font-heading font-semibold tracking-wider transition-colors relative ${
                  location.pathname === group.path ? "text-primary" : "text-primary-foreground/70 hover:text-primary"
                }`}>
                  {group.label}
                  {location.pathname === group.path && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />}
                </Link>
              )
            )}
            {/* WhatsApp ghost button */}
            <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="ml-3 flex items-center gap-1.5 px-4 py-2 text-[10px] font-heading font-semibold border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">
              <MessageCircle size={12} /> WhatsApp
            </a>
            {/* Book Now solid */}
            <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="ml-2 btn-cta-primary text-[10px] py-2.5 px-5 rounded-lg">
              BOOK NOW →
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="xl:hidden text-primary-foreground p-2" aria-label="Toggle menu">
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu — flat list */}
        {isMobileOpen && (
          <div className="xl:hidden bg-charcoal fixed inset-0 top-[88px] z-50 flex flex-col items-center justify-start pt-6 gap-0.5 overflow-y-auto pb-24 animate-fade-in-up">
            {mobileLinks.map((item, idx) =>
              (item as any).divider ? (
                <div key={idx} className="h-px bg-primary-foreground/10 my-2 w-48" />
              ) : (
                <Link key={idx} to={item.path!} className={`block text-center py-2 text-sm font-heading transition-colors w-full ${
                  location.pathname === item.path ? "text-primary font-bold" : "text-primary-foreground/70 hover:text-primary"
                }`}>
                  {item.label}
                </Link>
              )
            )}
            <div className="flex flex-col gap-3 mt-4 w-64">
              <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm text-center w-full">
                💬 WhatsApp Melitta
              </a>
              <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="btn-cta-dark text-sm text-center w-full">
                Book a Class →
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
