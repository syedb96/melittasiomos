import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import AnswerBox from "@/components/AnswerBox";
import ClassMatchBlock from "@/components/ClassMatchBlock";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { useVariant, recordVariantClick } from "@/lib/ab";
import { LOYALTY_SUBMIT } from "@/data/ab-experiments";
import { toast } from "@/hooks/use-toast";

const WA_LOYALTY =
  "https://wa.me/447449482343?text=" +
  encodeURIComponent(
    "Hi Melitta, I'd love to join the Pura Nights loyalty card. Could you confirm which weekly drop-in and Latin Friday sessions count toward the 9th-free reward?"
  );

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Pura Nights Loyalty Card",
  url: "https://www.puranights.com/loyalty",
  description:
    "Join the Pura Nights loyalty card — attend 8 eligible sessions and get your 9th eligible session free.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the 9th session really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — once you've attended 8 eligible Pura Nights sessions, your 9th eligible session is free of charge.",
      },
    },
    {
      "@type": "Question",
      name: "Which sessions count toward the 9th-free reward?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Weekly drop-in classes in Chiswick (Mondays) and Ealing (Tuesdays) count, and Latin Friday tickets count too. Class bundles and monthly unlimited passes are excluded — they already include a built-in discount.",
      },
    },
    {
      "@type": "Question",
      name: "How do I track my visits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Visits are tracked manually by the Pura Nights team at the door. Message Melitta on WhatsApp any time to confirm your current count.",
      },
    },
    {
      "@type": "Question",
      name: "Do bundle classes count toward loyalty?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — class bundles and monthly unlimited passes are already discounted, so they don't count toward the 8+1 loyalty reward. Drop-in classes (£15) and Latin Friday tickets do count.",
      },
    },
    {
      "@type": "Question",
      name: "Can I join if I'm completely new?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Join from your very first drop-in class — there's no minimum experience required.",
      },
    },
    {
      "@type": "Question",
      name: "Does loyalty apply to private lessons, weddings or corporate bookings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Private lessons, wedding choreography and corporate bookings are bespoke services and are not part of the loyalty count. The programme rewards regular drop-in attendance and Latin Friday visits.",
      },
    },
  ],
};

const formSchema = z.object({
  first_name: z.string().trim().min(1, "First name required").max(60),
  last_name: z.string().trim().min(1, "Last name required").max(60),
  email: z.string().trim().email("Valid email required").max(255),
  mobile: z.string().trim().min(5, "Mobile required").max(30),
  venue: z.enum(["chiswick", "ealing", "either"]),
  interest: z.enum(["salsa", "bachata", "both", "social", "pura-ladies", "private"]),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm consent" }) }),
});

/* <!-- WIX SECTION: Loyalty — hero, how-it-works, what-counts, join-form, WhatsApp CTA, FAQ.
       Wix collection: LoyaltyLeads. Form fields below mirror the Velo schema. --> */
const Loyalty = () => {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const submitVariant = useVariant(LOYALTY_SUBMIT);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      first_name: String(fd.get("first_name") || ""),
      last_name: String(fd.get("last_name") || ""),
      email: String(fd.get("email") || ""),
      mobile: String(fd.get("mobile") || ""),
      venue: String(fd.get("venue") || "either"),
      interest: String(fd.get("interest") || "both"),
      consent: fd.get("consent") === "on",
    };
    const parsed = formSchema.safeParse(raw);
    if (!parsed.success) {
      toast({ title: "Check your details", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    trackEvent("loyalty", "loyalty_form_submit", parsed.data.venue);
    try {
      await supabase.from("enquiries").insert({
        name: `${parsed.data.first_name} ${parsed.data.last_name}`,
        email: parsed.data.email,
        phone: parsed.data.mobile,
        subject: "loyalty",
        message: `Loyalty signup · Venue: ${parsed.data.venue} · Interest: ${parsed.data.interest}`,
        status: "new",
      });
      setDone(true);
      toast({ title: "You're on the list", description: "Welcome to the Pura Nights loyalty card." });
    } catch {
      toast({ title: "Couldn't submit", description: "Please WhatsApp Melitta instead.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <SeoHead
        title="Loyalty Card — 9th Session Free | Pura Nights"
        description="Join the Pura Nights loyalty card. Attend 8 eligible Salsa & Bachata classes in Chiswick or Ealing and your 9th eligible session is free."
        path="/loyalty"
        schema={schema}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="section-padding bg-charcoal text-primary-foreground">
        <div className="container-main max-w-3xl text-center">
          <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary mb-3">
            Pura Nights Loyalty Card
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Dance more. Get rewarded.
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/70 font-heading max-w-2xl mx-auto">
            Join the Pura Nights loyalty card — attend 8 eligible sessions and get your 9th
            eligible session free.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">How it works</h2>
          <ol className="grid md:grid-cols-4 gap-4">
            {[
              ["1", "Join the list", "Sign up below — takes 30 seconds."],
              ["2", "Attend classes", "Come to eligible weekly Pura Nights sessions."],
              ["3", "We track visits", "The team logs your attendance at the door."],
              ["4", "9th is free", "After 8 eligible sessions, your 9th is on us."],
            ].map(([n, t, d]) => (
              <li key={n} className="rounded-2xl border border-border/60 bg-card p-5">
                <p className="font-display text-3xl text-primary font-bold mb-2">{n}</p>
                <p className="font-heading font-bold mb-1">{t}</p>
                <p className="text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What counts */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-5">What counts toward your 9th free session</h2>
          <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
            <li>✅ Drop-in weekly classes in Chiswick (Mondays) and Ealing (Tuesdays) — £15 each.</li>
            <li>✅ Latin Friday tickets — every monthly Latin Friday counts as one eligible session.</li>
            <li>❌ Class bundles and monthly unlimited passes — already discounted, so not eligible.</li>
            <li>❌ Private lessons, wedding choreography and corporate bookings — bespoke services, not included.</li>
            <li>The team logs your attendance manually at the door — message Melitta any time to check your count.</li>
          </ul>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding">
        <div className="container-main max-w-2xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Join the loyalty list</h2>
          <p className="text-sm text-muted-foreground mb-6">We'll add you to the card and confirm by email.</p>
          {done ? (
            <div className="rounded-2xl bg-card border border-border/60 p-6 text-center">
              <p className="font-display text-xl font-bold mb-2">You're on the list ✨</p>
              <p className="text-sm text-muted-foreground">
                See you in class. Any questions?{" "}
                <a href={WA_LOYALTY} target="_blank" rel="noopener noreferrer" className="text-primary underline" onClick={() => trackEvent("loyalty", "loyalty_whatsapp_click")}>
                  WhatsApp Melitta
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ly-first" className="text-sm font-heading font-semibold block mb-1">First name *</label>
                  <input id="ly-first" name="first_name" required maxLength={60} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                </div>
                <div>
                  <label htmlFor="ly-last" className="text-sm font-heading font-semibold block mb-1">Last name *</label>
                  <input id="ly-last" name="last_name" required maxLength={60} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label htmlFor="ly-email" className="text-sm font-heading font-semibold block mb-1">Email *</label>
                <input id="ly-email" type="email" name="email" required maxLength={255} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
              </div>
              <div>
                <label htmlFor="ly-mobile" className="text-sm font-heading font-semibold block mb-1">Mobile *</label>
                <input id="ly-mobile" name="mobile" required maxLength={30} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ly-venue" className="text-sm font-heading font-semibold block mb-1">Preferred venue</label>
                  <select id="ly-venue" name="venue" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" defaultValue="either">
                    <option value="chiswick">Chiswick (Mondays)</option>
                    <option value="ealing">Ealing (Tuesdays)</option>
                    <option value="either">Either</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="ly-interest" className="text-sm font-heading font-semibold block mb-1">Main interest</label>
                  <select id="ly-interest" name="interest" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" defaultValue="both">
                    <option value="salsa">Salsa</option>
                    <option value="bachata">Bachata</option>
                    <option value="both">Both</option>
                    <option value="social">Social dancing</option>
                    <option value="pura-ladies">Pura Ladies</option>
                    <option value="private">Private lessons</option>
                  </select>
                </div>
              </div>
              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input type="checkbox" name="consent" required className="mt-1" />
                <span>I agree to receive loyalty-card updates from Pura Nights by email.</span>
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="btn-cta-primary text-sm w-full sm:w-auto"
                data-ab-variant={submitVariant.id}
                data-ab-experiment={LOYALTY_SUBMIT.key}
                onClick={() => {
                  recordVariantClick(LOYALTY_SUBMIT.key, submitVariant.id, "/loyalty form");
                  trackEvent("loyalty", "loyalty_join_click");
                }}
              >
                {submitting ? "Joining…" : submitVariant.payload.label}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <a
              href={WA_LOYALTY}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("loyalty", "loyalty_whatsapp_click")}
              className="inline-flex items-center gap-2 text-primary font-heading font-semibold hover:underline"
            >
              💬 Chat to Melitta about loyalty on WhatsApp →
            </a>
          </div>
        </div>
      </section>

      <ClassMatchBlock tone="ivory" />

      {/* FAQ */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Loyalty FAQs</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((q) => (
              <AnswerBox
                key={q.name}
                question={q.name}
                answer={q.acceptedAnswer.text}
                tone="ivory"
              />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link to="/prices" className="btn-cta-secondary text-sm">See pricing →</Link>
            <Link to="/pura-nights" className="btn-cta-secondary text-sm">Weekly classes →</Link>
            <Link to="/start-here" className="btn-cta-primary text-sm">Start here →</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Loyalty;
