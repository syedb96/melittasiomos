import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { trackCta } from "@/lib/analytics";
import { waCustom } from "@/lib/whatsapp";
import { Price } from "@/components/commerce/CommercePrimitives";

/**
 * Reusable bottom-of-article money CTA for blog posts.
 * Pick the right variant by post category. See docs/54-BLOG-CONVERSION-AUDIT.md.
 *
 * Variants and destinations:
 *  - beginner       → /start-here
 *  - classes        → /pura-nights
 *  - chiswick       → /salsa-classes-chiswick
 *  - ealing         → /bachata-classes-ealing
 *  - wedding        → /wedding-dance
 *  - corporate      → /corporate-dance-classes-london
 *  - ladies         → /pura-ladies
 *  - online         → /online-coaching
 *  - events         → /events
 */
type Variant =
  | "beginner"
  | "classes"
  | "chiswick"
  | "ealing"
  | "wedding"
  | "corporate"
  | "ladies"
  | "online"
  | "events";

const DropIn = () => <Price slug="drop-in" fallback="£10" showPrevious={false} />;

const config: Record<Variant, { title: string; sub: ReactNode; to: string; label: string; cta: string }> = {
  beginner:  { title: "Ready to dance?",              sub: "Brand new to Latin dance? Start here — no partner needed.", to: "/start-here",                       label: "Start Here Guide →",        cta: "blog_money_cta_beginner" },
  classes:   { title: "Ready to dance?",              sub: "Drop in to Monday Chiswick or Tuesday Ealing. Beginners welcome every week.", to: "/pura-nights",        label: "See This Week's Classes →", cta: "blog_money_cta_classes" },
  chiswick:  { title: "Dance in Chiswick this week",  sub: <>Monday nights at The George IV. <DropIn /> drop-in. No booking, no partner.</>,       to: "/salsa-classes-chiswick", label: "See Chiswick Classes →", cta: "blog_money_cta_chiswick" },
  ealing:    { title: "Dance in Ealing this week",    sub: <>Tuesday nights at The Drayton Court. <DropIn /> drop-in. No booking, no partner.</>,  to: "/bachata-classes-ealing", label: "See Ealing Classes →",   cta: "blog_money_cta_ealing" },
  wedding:   { title: "Planning your first dance?",   sub: "Free 15-min consultation with Melitta. Tailored to your song, venue and timeline.", to: "/wedding-dance",  label: "Wedding Dance Info →",   cta: "blog_money_cta_wedding" },
  corporate: { title: "Plan a team dance session",    sub: "Corporate workshops, Christmas parties and away days across London.",          to: "/corporate-dance-classes-london", label: "Corporate Enquiry →", cta: "blog_money_cta_corporate" },
  ladies:    { title: "Join Pura Ladies",             sub: "London's ladies styling and performance team. Auditions twice a year.",        to: "/pura-ladies",          label: "Pura Ladies Info →",     cta: "blog_money_cta_ladies" },
  online:    { title: "Learn from anywhere",          sub: "Join the online coaching waitlist for 1-to-1 and small-group Zoom sessions.",  to: "/online-coaching",      label: "Join the Waitlist →",    cta: "blog_money_cta_online" },
  events:    { title: "Don't miss the next social",   sub: "Latin Friday socials, workshops and showcases across West London.",            to: "/events",               label: "See Upcoming Events →",  cta: "blog_money_cta_events" },
};

/* <!-- WIX SECTION: Blog Money CTA — bottom-of-article conversion block --> */
const BlogMoneyCTA = ({ variant = "classes" }: { variant?: Variant }) => {
  const c = config[variant];
  return (
    <aside className="not-prose my-10 bg-charcoal text-primary-foreground rounded-2xl p-8 border-t-4 border-primary text-center">
      <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-2">Next step</p>
      <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">{c.title}</h3>
      <p className="text-primary-foreground/70 font-heading text-sm mb-6 max-w-md mx-auto">{c.sub}</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link to={c.to} onClick={() => trackCta(c.cta, `blog-money-cta:${variant}`)} className="btn-cta-primary text-sm">{c.label}</Link>
        <a
          {...waCustom("Hi Melitta, I'd like to get in touch about Pura Nights.", "BlogMoneyCTA:52")}
          onClick={() => trackCta("whatsapp_click", `blog-money-cta:${variant}`)}
          className="inline-flex items-center text-sm font-heading text-primary hover:underline px-4 py-2"
        >
          Or WhatsApp Melitta →
        </a>
      </div>
    </aside>
  );
};

export default BlogMoneyCTA;
