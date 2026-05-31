import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { Copy, Check, Instagram } from "lucide-react";
import { influencerLink } from "@/lib/external-links";

const PERKS = [
  { title: "Free first class", body: "Drop in to any Chiswick or Ealing class on us — no obligation, no partner needed." },
  { title: "Trackable link & code", body: "Get a personal UTM link and discount code. We track every click and booking back to you." },
  { title: "Revenue share", body: "Earn on every paying student or wedding-dance enquiry that converts through your link." },
  { title: "Co-created content", body: "Behind-the-scenes shoots at the George IV and Drayton Court — usable on your channels and ours." },
];

const HOW = [
  "Apply with your handle, audience and 2–3 reels you're proud of.",
  "We send a Calendly link for a 15-min intro with Melitta.",
  "You get your trackable link, discount code and content brief.",
  "Post, tag @puranights.salsabachata, and we credit you in our weekly story.",
];

const Influencers = () => {
  const [handle, setHandle] = useState("");
  const [copied, setCopied] = useState(false);
  const link = useMemo(() => handle ? influencerLink(handle, "/start-here") : "", [handle]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Influencer & Ambassador Program — Pura Nights",
    description: "Partner with West London's premium Salsa & Bachata academy. Trackable links, revenue share, free first class.",
    url: "https://www.puranights.com/influencers",
  };

  return (
    <>
      <SeoHead
        title="Influencer & Ambassador Program — Pura Nights London"
        description="Collaborate with Pura Nights and Melitta Siomos. Trackable UTM links, revenue share, free first class, co-created reels in West London's premium Latin dance studios."
        path="/influencers"
        schema={schema}
      />
      <Header />
      <main className="bg-cream">
        <section className="bg-charcoal text-primary-foreground">
          <div className="container-main py-20 text-center">
            <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-3">Creators · Ambassadors · Partners</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Dance With Us. Get Tracked &amp; Paid.</h1>
            <p className="max-w-2xl mx-auto text-primary-foreground/70 font-heading">
              We work with London-based creators, dance teachers, wedding planners and lifestyle voices to bring more
              beginners into Salsa &amp; Bachata. Trackable links, revenue share, and content you actually want to post.
            </p>
          </div>
        </section>

        <section className="container-main py-16 grid md:grid-cols-2 gap-4">
          {PERKS.map(p => (
            <div key={p.title} className="border border-charcoal/10 rounded-xl p-6 bg-white">
              <h3 className="font-display text-xl font-bold text-charcoal mb-2">{p.title}</h3>
              <p className="text-charcoal/70 font-heading text-sm">{p.body}</p>
            </div>
          ))}
        </section>

        {/* Link generator */}
        <section className="container-main py-12 border-t border-charcoal/10">
          <h2 className="font-display text-2xl font-bold text-charcoal mb-3">Generate your tracking link</h2>
          <p className="text-charcoal/70 font-heading text-sm mb-6 max-w-2xl">
            Type your Instagram handle to preview your UTM-tagged link. Once you're accepted into the program we'll
            confirm it in your dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="flex items-center gap-2 border border-charcoal/20 rounded-lg px-3 bg-white flex-1">
              <Instagram size={14} className="text-primary" />
              <input
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="yourhandle"
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

        <section className="container-main py-12 border-t border-charcoal/10">
          <h2 className="font-display text-2xl font-bold text-charcoal mb-6">How it works</h2>
          <ol className="space-y-3 max-w-2xl">
            {HOW.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-primary text-charcoal font-heading font-bold text-sm flex items-center justify-center">{i + 1}</span>
                <span className="font-heading text-sm text-charcoal/80 pt-1">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="container-main py-16 border-t border-charcoal/10 text-center">
          <h2 className="font-display text-2xl font-bold text-charcoal mb-4">Apply to the program</h2>
          <p className="text-charcoal/70 font-heading text-sm mb-6 max-w-xl mx-auto">
            Send your handle and a sentence about your audience. We reply within 48 hours.
          </p>
          <a
            href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20apply%20to%20the%20Pura%20Nights%20influencer%20program.%20My%20handle%20is%20%40"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-cta-primary text-sm py-3 px-6 rounded-lg"
          >
            💬 Apply via WhatsApp
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Influencers;
