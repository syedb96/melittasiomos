import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { Copy, Check, Instagram, TrendingUp } from "lucide-react";
import { influencerLink, INFLUENCER_TIERS } from "@/lib/external-links";

const PERKS = [
  { title: "Free first class", body: "Drop in to any Chiswick or Ealing class on us — no obligation, no partner needed." },
  { title: "Trackable link & code", body: "Get a personal UTM link and discount code. We track every click and booking back to you." },
  { title: "Tiered revenue share", body: "Earn 10%, 15% or 20% per converted student depending on monthly volume — paid monthly via bank transfer." },
  { title: "Co-created content", body: "Behind-the-scenes shoots at the George IV and Drayton Court — usable on your channels and ours." },
];

const HOW = [
  "Apply with your handle, audience and 2–3 reels you're proud of.",
  "We send a Calendly link for a 15-min intro with Melitta.",
  "You get your trackable link, discount code and content brief.",
  "Post, tag @puranights.salsabachata, and we credit you in our weekly story.",
  "Get paid monthly — 10% / 15% / 20% depending on the tier you unlock.",
];

const APPLY_WA = "https://wa.me/447449482343?text=" + encodeURIComponent(
  "Hi Melitta, I'd like to apply to the Pura Nights ambassador program (10% / 15% / 20% tiered revenue share). My Instagram handle is @"
);

const Influencers = () => {
  const [handle, setHandle] = useState("");
  const [copied, setCopied] = useState(false);
  const link = useMemo(() => handle ? influencerLink(handle, "/start-here") : "", [handle]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Influencer & Ambassador Program — Pura Nights",
    description: "Tiered revenue share (10% / 15% / 20%) for London creators. Trackable links, free first class, co-created reels in West London's premium Latin dance studios.",
    url: "https://www.puranights.com/influencers",
  };

  return (
    <>
      <SeoHead
        title="Influencer & Ambassador Program — 10% / 15% / 20% Revenue Share"
        description="Tiered 10% / 15% / 20% revenue share for London creators. Trackable UTM links, free first class, co-created reels in West London's premium Salsa & Bachata academy."
        path="/influencers"
        schema={schema}
      />
      <Header />
      <main className="bg-cream">
        {/* Hero */}
        <section className="relative bg-charcoal text-primary-foreground overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{ background: "radial-gradient(800px 400px at 30% 30%, hsl(var(--primary)/0.4), transparent 65%)" }}
          />
          <div className="container-main py-20 md:py-24 text-center relative">
            <p className="font-accent text-[10px] tracking-[0.32em] uppercase text-primary mb-3">Creators · Ambassadors · Partners</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Dance With Us. <span className="text-primary">Get Tracked &amp; Paid.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-primary-foreground/75 font-heading text-base md:text-lg">
              Earn <strong className="text-primary">10%, 15% or 20%</strong> on every paying student you send to West London's
              premium Salsa &amp; Bachata academy. Trackable links, monthly payouts, content you'll actually want to post.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <a href="#apply" className="btn-cta-primary text-sm">Apply to the program →</a>
              <a href="#tiers" className="btn-cta-ghost text-sm">See revenue tiers</a>
            </div>
          </div>
        </section>

        {/* Tier table — the headline promise */}
        <section id="tiers" className="container-main py-20 border-b border-charcoal/10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-2">Revenue Share Tiers</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-3">
              The more you convert, the more you earn
            </h2>
            <p className="text-charcoal/65 font-heading text-sm">
              Tiers reset monthly based on paying students attributed to your trackable link. Wedding-dance and corporate
              enquiries that convert are paid out at your current tier rate.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {INFLUENCER_TIERS.map((tier, i) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-7 border transition-all ${
                  i === 1
                    ? "bg-charcoal text-primary-foreground border-primary shadow-2xl md:-translate-y-3"
                    : "bg-white text-charcoal border-charcoal/10 hover:border-primary/40"
                }`}
              >
                {i === 1 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-charcoal text-[10px] font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Most ambassadors
                  </span>
                )}
                <p className={`font-accent text-[10px] tracking-[0.3em] uppercase mb-3 ${i === 1 ? "text-primary" : "text-primary/80"}`}>
                  {tier.name}
                </p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-display text-5xl font-bold">{tier.share}</span>
                  <span className={`text-sm font-heading ${i === 1 ? "text-primary-foreground/60" : "text-charcoal/55"}`}>per booking</span>
                </div>
                <p className={`text-[11px] font-heading uppercase tracking-wider mb-3 ${i === 1 ? "text-primary-foreground/50" : "text-charcoal/50"}`}>
                  {tier.threshold}
                </p>
                <p className={`text-sm font-heading ${i === 1 ? "text-primary-foreground/75" : "text-charcoal/70"}`}>
                  {tier.note}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-charcoal/55 font-heading mt-8 max-w-2xl mx-auto">
            <TrendingUp size={12} className="inline mr-1 text-primary" />
            Paid monthly via UK bank transfer. Minimum payout threshold £25. Full T&amp;Cs sent on acceptance.
          </p>
        </section>

        {/* Perks */}
        <section className="container-main py-16 grid md:grid-cols-2 gap-4">
          {PERKS.map(p => (
            <div key={p.title} className="border border-charcoal/10 rounded-xl p-6 bg-white hover:border-primary/40 hover:shadow-sm transition-all">
              <h3 className="font-display text-xl font-bold text-charcoal mb-2">{p.title}</h3>
              <p className="text-charcoal/70 font-heading text-sm">{p.body}</p>
            </div>
          ))}
        </section>

        {/* Link generator */}
        <section className="container-main py-12 border-t border-charcoal/10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3">Preview your tracking link</h2>
          <p className="text-charcoal/70 font-heading text-sm mb-6 max-w-2xl">
            Type your Instagram handle to preview your UTM-tagged link. Once accepted you'll get the live link in your
            ambassador dashboard, plus a custom discount code for your audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="flex items-center gap-2 border border-charcoal/20 rounded-lg px-3 bg-white flex-1">
              <Instagram size={14} className="text-primary" />
              <input
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="yourhandle"
                maxLength={50}
                className="flex-1 py-3 bg-transparent outline-none font-heading text-sm"
              />
            </div>
            <button
              disabled={!link}
              onClick={() => { navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
              className="btn-cta-primary text-sm py-3 px-5 rounded-lg disabled:opacity-40"
            >
              {copied ? <><Check size={14} className="inline" /> Copied</> : <><Copy size={14} className="inline" /> Copy link</>}
            </button>
          </div>
          {link && (
            <pre className="mt-4 p-4 bg-charcoal/[0.04] border border-charcoal/15 rounded-lg text-[12px] font-mono text-charcoal/80 overflow-x-auto break-all whitespace-pre-wrap">{link}</pre>
          )}
        </section>

        {/* How */}
        <section className="container-main py-12 border-t border-charcoal/10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6">How it works</h2>
          <ol className="space-y-3 max-w-2xl">
            {HOW.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-primary text-charcoal font-heading font-bold text-sm flex items-center justify-center">{i + 1}</span>
                <span className="font-heading text-sm text-charcoal/80 pt-1">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Apply */}
        <section id="apply" className="container-main py-20 border-t border-charcoal/10 text-center">
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-2">Ready when you are</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">Apply to the program</h2>
          <p className="text-charcoal/70 font-heading text-sm mb-7 max-w-xl mx-auto">
            Send your handle and a sentence about your audience. We reply within 48 hours with your tier, link and brief.
          </p>
          <a
            href={APPLY_WA}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-cta-primary text-sm py-3 px-6 rounded-lg"
          >
            💬 Apply via WhatsApp (10% / 15% / 20%)
          </a>
          <p className="text-[11px] text-charcoal/50 font-heading mt-4">
            Prefer email? <a href="mailto:siomosmelitta@gmail.com?subject=Ambassador%20Program%20Application" className="text-primary font-semibold hover:underline">siomosmelitta@gmail.com</a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Influencers;
