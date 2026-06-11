import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
import { waCustom } from "@/lib/whatsapp";
  Menu, X, Phone, Mail, Instagram, Facebook, Youtube, ChevronDown, MessageCircle,
  CalendarDays, Sparkles, Crown, Laptop, Tag, Gift, User, Heart, UserCheck,
  BookOpen, Users, Clock, Image as ImageIcon, Star, HelpCircle, FileText, MapPin, ExternalLink,
} from "lucide-react";

// Premium, minimal nav — high-intent only.
// Local SEO pages live in footer + /locations + contextual links, NOT here.
// Title Case for items, short descriptions for clarity. Wix mirrors this 1:1.
const navGroups = [
  { label: "Home", path: "/", dropdown: null },
  {
    label: "Classes & Events",
    path: "/pura-nights",
    dropdown: [
      { label: "Weekly Classes", path: "/pura-nights", icon: CalendarDays, description: "Mondays in Chiswick, Tuesdays in Ealing" },
      { label: "Latin Friday", path: "/latin-friday", icon: Sparkles, description: "Monthly social in Ealing" },
      { label: "All Events", path: "/events", icon: CalendarDays, description: "Upcoming socials & specials" },
      { label: "Pura Ladies", path: "/pura-ladies", icon: Crown, description: "Ladies styling team & auditions" },
      { label: "Online Coaching", path: "/online-salsa-bachata-coaching", icon: Laptop, description: "1-to-1 video coaching, anywhere" },
    ],
  },
  {
    label: "Prices & Booking",
    path: "/prices",
    dropdown: [
      { label: "Class Pricing", path: "/prices", icon: Tag, description: "Drop-ins, bundles & student rates" },
      { label: "Book a Class", path: "https://www.tickettailor.com/events/puranights", external: true, icon: CalendarDays, description: "Reserve your spot via Ticket Tailor" },
      { label: "Gift Vouchers", path: "/gift-vouchers", icon: Gift, description: "The perfect Latin gift" },
    ],
  },
  {
    label: "About & Services",
    path: "/about",
    dropdown: [
      { label: "About Melitta", path: "/about", icon: User, description: "Bachata UK Champion & founder — full bio at melittasiomos.com →" },
      { label: "Melitta's Personal Site", path: "https://melittasiomos.com", icon: ExternalLink, description: "Biography, press, awards & private studio", external: true },
      { label: "Wedding Dance", path: "/wedding-dance", icon: Heart, description: "Bespoke first-dance choreography" },
      { label: "Private Lessons", path: "/private-lessons", icon: UserCheck, description: "1-to-1 or small group, by enquiry" },
      { label: "Contact", path: "/contact", icon: Mail, description: "WhatsApp, email or enquiry form" },
    ],
  },
  {
    label: "Learn",
    path: "/blog",
    dropdown: [
      { label: "Start Here", path: "/start-here", icon: BookOpen, description: "New to Latin dance? Start here" },
      { label: "Your First Class", path: "/your-first-class", icon: BookOpen, description: "What to expect on the night" },
      { label: "Community", path: "/community", icon: Users, description: "Meet our regulars & ambassadors" },
      { label: "Schedule", path: "/schedule", icon: Clock, description: "This week's class times" },
      { label: "Gallery", path: "/gallery", icon: ImageIcon, description: "Photos & video from class & socials" },
      { label: "Testimonials", path: "/testimonials", icon: Star, description: "Real student reviews" },
      { label: "FAQs", path: "/faq", icon: HelpCircle, description: "Common questions, answered" },
      { label: "Blog", path: "/blog", icon: FileText, description: "Guides, tips and London Latin scene" },
      { label: "Find a Class Near You", path: "/locations", icon: MapPin, description: "Local class pages by area" },
      { label: "Press & Sources", path: "/press", icon: FileText, description: "Citation hub, embeddable badge, press kit" },
      { label: "Influencer Program", path: "/influencers", icon: Star, description: "Trackable links & revenue share" },
    ],
  },
  // NOTE: Shop is intentionally hidden until the Shopify store goes live.
  // Re-add a group here and toggle SHOPIFY_STORE_ENABLED in src/lib/external-links.ts.
];

const mobileLinks = [
  { label: "Home", path: "/" },
  { divider: true },
  { label: "Weekly Classes", path: "/pura-nights" },
  { label: "Latin Friday", path: "/latin-friday" },
  { label: "All Events", path: "/events" },
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
  { label: "Your First Class", path: "/your-first-class" },
  { label: "Community", path: "/community" },
  { label: "Schedule", path: "/schedule" },
  { label: "Gallery", path: "/gallery" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "FAQs", path: "/faq" },
  { label: "Blog", path: "/blog" },
  { label: "Find a Class Near You", path: "/locations" },
  { label: "Press & Sources", path: "/press" },
  { label: "Influencer Program", path: "/influencers" },
  { label: "Contact", path: "/contact" },
  // Shop intentionally hidden until Shopify store is live.
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
                    <div className="absolute top-full left-0 mt-0 bg-charcoal-light border border-primary/15 rounded-xl shadow-2xl min-w-[300px] py-2 z-50">
                      {group.dropdown.map((sub) => {
                        const Icon = (sub as any).icon;
                        const description = (sub as any).description as string | undefined;
                        const inner = (
                          <>
                            {Icon && <Icon size={14} className="text-primary/70 mt-0.5 shrink-0" />}
                            <span className="flex flex-col leading-tight">
                              <span className="text-[12px]">{sub.label}{(sub as any).external ? " ↗" : ""}</span>
                              {description && (
                                <span className="text-[10px] font-normal text-primary-foreground/45 mt-0.5">
                                  {description}
                                </span>
                              )}
                            </span>
                          </>
                        );
                        return (sub as any).external ? (
                          <a key={sub.path} href={sub.path} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 px-5 py-2.5 font-heading text-primary-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors border-l-2 border-transparent hover:border-primary">
                            {inner}
                          </a>
                        ) : (
                          <Link key={sub.path} to={sub.path} className={`flex items-start gap-3 px-5 py-2.5 font-heading transition-colors border-l-2 ${
                            location.pathname === sub.path
                              ? "text-primary bg-primary/10 border-primary"
                              : "text-primary-foreground/70 hover:text-primary hover:bg-primary/10 border-transparent hover:border-primary"
                          }`}>
                            {inner}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (group as any).external ? (
                <a key={idx} href={group.path} target="_blank" rel="noopener noreferrer"
                   className="px-3 py-2 text-[11px] font-heading font-semibold tracking-wider transition-colors text-primary-foreground/70 hover:text-primary">
                  {group.label} ↗
                </a>
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
            <a {...waCustom("Hi Melitta, I'd like to ask a quick question about Pura Nights classes.", "Header:215")} className="ml-3 flex items-center gap-1.5 px-4 py-2 text-[10px] font-heading font-semibold border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">
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
              ) : (item as any).external ? (
                <a key={idx} href={item.path!} target="_blank" rel="noopener noreferrer"
                   className="block text-center py-2 text-sm font-heading text-primary-foreground/70 hover:text-primary w-full">
                  {item.label}
                </a>
              ) : (
                <Link key={idx} to={item.path!} className={`block text-center py-2 text-sm font-heading transition-colors w-full ${
                  location.pathname === item.path ? "text-primary font-bold" : "text-primary-foreground/70 hover:text-primary"
                }`}>
                  {item.label}
                </Link>
              )
            )}
            <div className="flex flex-col gap-3 mt-4 w-64">
              <a {...waCustom("Hi Melitta, I'd like to ask a quick question about Pura Nights classes.", "Header:250")} className="btn-cta-primary text-sm text-center w-full">
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
