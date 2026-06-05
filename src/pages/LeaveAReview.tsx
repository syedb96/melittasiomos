import { useState } from "react";
import { Star, Instagram, Copy, Check, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";

/* <!-- WIX PAGE: /leave-a-review -->
   <!-- WIX: NOINDEX — internal review-funnel tool, not a search page. -->
   <!-- WIX: Replace GOOGLE_REVIEW_URL with the GBP short URL from g.page/r/... -->
*/

// TODO: Replace with the real GBP short URL from Google Business Profile dashboard.
const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJ_pura_nights_placeholder";
const SITE_URL = "https://www.puranights.com";

const prompts = [
  "Friendly weekly salsa and bachata classes in [Chiswick / Ealing] — Melitta is an excellent teacher, all levels welcome, no partner needed.",
  "Discovered Pura Nights through a friend and now it's the highlight of my week. The community is really welcoming and the instruction is top quality.",
  "Best Latin dance nights in West London. Melitta is a Bachata UK Champion and it shows in the quality of teaching.",
];

const LeaveAReview = () => {
  const [copied, setCopied] = useState<number | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  const copy = async (text: string, idx: number | "link") => {
    try {
      await navigator.clipboard.writeText(text);
      if (idx === "link") {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 1800);
      } else {
        setCopied(idx);
        setTimeout(() => setCopied(null), 1800);
      }
    } catch {}
  };

  return (
    <Layout>
      <SeoHead
        title="Leave a Google Review | Pura Nights"
        description="Share your Pura Nights experience on Google — internal review tool."
        path="/leave-a-review"
        noindex
      />

      <section className="section-padding section-warm">
        <div className="container-main max-w-4xl">
          <FadeInUp>
            <div className="text-center mb-12">
              <span className="inline-flex gap-0.5 mb-4">{[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-primary text-primary" />)}</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Enjoyed Pura Nights? Share it on Google.</h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">Reviews help new dancers find us — and they mean the world to Melitta and the team.</p>
            </div>
          </FadeInUp>

          {/* 3 option cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-14">
            <FadeInUp>
              <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="block bg-card rounded-2xl p-7 border-2 border-primary card-hover h-full" style={{ background: "linear-gradient(180deg, hsl(43 48% 54% / 0.08), transparent)" }}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground mb-4"><Star size={20} className="fill-current" /></div>
                <h3 className="font-display text-lg font-bold mb-2">Leave a Google review</h3>
                <p className="text-muted-foreground text-sm mb-4">Takes 60 seconds. Really appreciated.</p>
                <span className="inline-flex items-center gap-1 text-primary font-heading text-sm font-semibold">Open Google Reviews <ExternalLink size={12} /></span>
              </a>
            </FadeInUp>
            <FadeInUp delay={0.08}>
              <a href="https://instagram.com/puranights.salsabachata" target="_blank" rel="noopener noreferrer" className="block bg-card rounded-2xl p-7 border border-border card-hover h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4"><Instagram size={20} /></div>
                <h3 className="font-display text-lg font-bold mb-2">Follow on Instagram</h3>
                <p className="text-muted-foreground text-sm mb-4">@puranights.salsabachata</p>
                <span className="inline-flex items-center gap-1 text-primary font-heading text-sm font-semibold">Open Instagram <ExternalLink size={12} /></span>
              </a>
            </FadeInUp>
            <FadeInUp delay={0.16}>
              <button onClick={() => copy(SITE_URL, "link")} className="text-left bg-card rounded-2xl p-7 border border-border card-hover h-full w-full">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">{linkCopied ? <Check size={20} /> : <Copy size={20} />}</div>
                <h3 className="font-display text-lg font-bold mb-2">Tell a friend</h3>
                <p className="text-muted-foreground text-sm mb-4">Share this link with someone who might love it.</p>
                <span className="inline-flex items-center gap-1 text-primary font-heading text-sm font-semibold">{linkCopied ? "Link copied!" : "Copy link to share"}</span>
              </button>
            </FadeInUp>
          </div>

          {/* Prompts */}
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold text-center mb-6">What should I write?</h2>
            <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
              {prompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => copy(p, i)}
                  className="inline-flex items-center gap-2 text-left bg-background border border-border hover:border-primary/40 rounded-full px-5 py-3 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors max-w-full"
                >
                  {copied === i ? <Check size={14} className="text-primary shrink-0" /> : <Copy size={14} className="text-primary shrink-0" />}
                  <span className="line-clamp-2">{p}</span>
                </button>
              ))}
            </div>
            <p className="text-center text-muted-foreground text-xs mt-6 max-w-lg mx-auto">
              Use these as inspiration — Google values genuine, specific reviews. Edit to match your experience.
            </p>
          </FadeInUp>
        </div>
      </section>
    </Layout>
  );
};

export default LeaveAReview;
