import { Link } from "react-router-dom";
import { waCustom } from "@/lib/whatsapp";
import { Price } from "@/components/commerce/CommercePrimitives";

/* <!-- WIX: Replicate as a sticky strip widget visible on blog dynamic pages (desktop only).
   Use Wix Velo position:sticky CSS or anchor element. --> */
const BlogSidebarCTA = () => (
  <aside className="hidden lg:block sticky top-24 not-prose">
    <div className="bg-charcoal text-primary-foreground rounded-2xl p-6 border-t-4 border-primary">
      <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-2">Ready to dance?</p>
      <h3 className="font-display text-lg font-bold mb-2 leading-tight">
        Your first class is just <Price slug="drop-in" fallback="£10" showPrevious={false} />
      </h3>
      <p className="text-primary-foreground/60 text-xs font-heading mb-4">No partner. No experience. Just turn up.</p>
      <Link to="/pura-nights" className="btn-cta-primary w-full text-center block text-xs mb-2">Book a Class →</Link>
      <a {...waCustom("Hi Melitta, I'd like to get in touch about Pura Nights.", "BlogSidebarCTA:12")} className="block text-center text-xs font-heading text-primary hover:underline">Or WhatsApp Melitta</a>
    </div>
  </aside>
);

export default BlogSidebarCTA;
