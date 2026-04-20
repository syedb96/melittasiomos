import { useState } from "react";
import { Gift, Users, Award, Sparkles, Send, CheckCircle2 } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import GoldDivider from "@/components/GoldDivider";
import AnimatedCounter from "@/components/AnimatedCounter";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

// v8.0 Refer-a-Friend & Pura Ambassador
const referralSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  friend_name: z.string().trim().min(2, "Friend's name required").max(100),
  friend_contact: z.string().trim().min(3, "Friend's email or phone required").max(255),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

const tiers = [
  {
    icon: <Gift size={26} />,
    name: "Bring a Friend",
    target: "Everyone",
    reward: "Friend gets first class FREE · You get £10 off your next bundle",
    desc: "Just submit the form below. We'll send your friend a free trial code and credit your account.",
    accent: "from-primary/10 to-primary/5",
  },
  {
    icon: <Users size={26} />,
    name: "Pura Regular",
    target: "Refer 3 friends",
    reward: "Free monthly Pura Academy Pass · Pura Nights branded tote",
    desc: "Get three friends through their first class and unlock our online academy completely free for 3 months.",
    accent: "from-peach/15 to-peach/5",
  },
  {
    icon: <Award size={26} />,
    name: "Pura Ambassador",
    target: "Refer 5+ friends",
    reward: "FREE Monthly Membership · Front-row Latin Friday tickets · Featured in our community spotlight",
    desc: "Become an official Pura Ambassador. Free unlimited classes, VIP event access, and the inside line on everything we launch.",
    accent: "from-charcoal/10 to-charcoal/5",
  },
];

const Refer = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", friend_name: "", friend_contact: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = referralSchema.safeParse(form);
    if (!parsed.success) {
      toast({ title: "Please check the form", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("enquiries").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      subject: "Referral — Bring a Friend",
      message: `REFERRAL\n\nFriend's name: ${parsed.data.friend_name}\nFriend's contact: ${parsed.data.friend_contact}\n\nReferrer message: ${parsed.data.message || "(none)"}`,
      source_page: "/refer",
    });
    setLoading(false);
    if (error) {
      toast({ title: "Something went wrong", description: "Please try again or WhatsApp Melitta directly.", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "Referral sent! 🎉", description: "Melitta will be in touch within 24 hours." });
  };

  return (
    <Layout>
      <SeoHead
        title="Refer a Friend & Earn Rewards | Pura Nights London"
        description="Bring a friend to Pura Nights — they get their first class free, you earn £10 off. Become a Pura Ambassador and unlock free unlimited classes."
        path="/refer"
      />

      {/* HERO */}
      <section className="relative bg-charcoal text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 20% 50%, hsl(43 48% 54% / 0.6), transparent 60%), radial-gradient(circle at 80% 50%, hsl(20 75% 66% / 0.5), transparent 60%)" }} />
        <div className="container-main relative section-padding text-center max-w-3xl">
          <FadeInUp>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-[11px] font-heading font-semibold tracking-wider uppercase mb-5">
              <Sparkles size={11} className="inline mr-1" /> Pura Rewards Program
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-5 leading-tight">
              Share the Floor. <span className="italic" style={{ background: "var(--gradient-gold)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Earn the Rewards.</span>
            </h1>
            <p className="text-primary-foreground/75 text-lg mb-8">
              Salsa & Bachata are infinitely better with friends. Bring yours along and we'll thank you both — properly.
            </p>
          </FadeInUp>
        </div>

        <div className="relative border-t border-primary-foreground/10">
          <div className="container-main grid grid-cols-3 gap-4 py-8 text-center">
            {[
              { n: 500, suffix: "+", label: "Active Students" },
              { n: 87, suffix: "%", label: "Came via Friends" },
              { n: 12, suffix: "", label: "Pura Ambassadors" },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-display text-3xl md:text-4xl font-bold text-primary">
                  <AnimatedCounter end={s.n} suffix={s.suffix} />
                </p>
                <p className="text-primary-foreground/50 text-[11px] font-heading uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Three Ways to Be Rewarded</h2>
            <GoldDivider />
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">The more you share, the more you unlock. Simple as that.</p>
          </div>
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {tiers.map((t, i) => (
              <StaggerItem key={i}>
                <div className={`relative rounded-2xl p-7 h-full bg-gradient-to-br ${t.accent} border border-border/60 card-hover`}>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-card text-primary mb-5 shadow-sm">{t.icon}</div>
                  <p className="text-[10px] font-heading font-bold tracking-wider uppercase text-primary mb-1">{t.target}</p>
                  <h3 className="font-display text-2xl font-bold mb-3">{t.name}</h3>
                  <p className="text-foreground/85 text-sm font-heading font-semibold mb-3 leading-relaxed">{t.reward}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding bg-card">
        <div className="container-main max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">How It Works</h2>
            <GoldDivider />
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: "1", title: "Refer", desc: "Submit the form below with your friend's details." },
              { n: "2", title: "Free Class", desc: "We send them a personal welcome + free first class code." },
              { n: "3", title: "They Show Up", desc: "Once they attend, your reward is unlocked." },
              { n: "4", title: "You Earn", desc: "£10 off, free pass, or Ambassador status — depending on your tier." },
            ].map((s, i) => (
              <FadeInUp key={i} delay={i * 0.06}>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center font-display text-2xl font-bold text-primary-foreground" style={{ background: "var(--gradient-gold)" }}>
                    {s.n}
                  </div>
                  <h3 className="font-heading font-bold text-base mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="section-padding section-warm">
        <div className="container-main max-w-2xl">
          <div className="bg-card rounded-2xl p-8 md:p-10 border border-border/60 shadow-lg">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 size={56} className="text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold mb-2">Referral Sent!</h3>
                <p className="text-muted-foreground">Thank you. Melitta will personally reach out to your friend within 24 hours and credit your account once they attend.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="font-display text-3xl font-bold mb-2">Refer Your Friend</h2>
                  <p className="text-muted-foreground text-sm">Takes 30 seconds. We'll do the rest.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-semibold mb-1.5 text-foreground">Your Name *</label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-heading font-semibold mb-1.5 text-foreground">Your Email *</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-semibold mb-1.5 text-foreground">Your Phone (optional)</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  </div>
                  <div className="pt-3 border-t border-border/60">
                    <p className="text-xs font-heading font-semibold uppercase tracking-wider text-primary mb-3">Your Friend's Details</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-heading font-semibold mb-1.5 text-foreground">Friend's Name *</label>
                        <input type="text" required value={form.friend_name} onChange={(e) => setForm({ ...form, friend_name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                      </div>
                      <div>
                        <label className="block text-xs font-heading font-semibold mb-1.5 text-foreground">Friend's Email or Phone *</label>
                        <input type="text" required value={form.friend_contact} onChange={(e) => setForm({ ...form, friend_contact: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-semibold mb-1.5 text-foreground">Personal Note (optional)</label>
                    <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Anything we should mention to your friend?" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="btn-cta-primary w-full justify-center inline-flex items-center gap-2 disabled:opacity-60">
                    <Send size={16} /> {loading ? "Sending..." : "Send Referral"}
                  </button>
                  <p className="text-center text-muted-foreground text-[11px] font-heading">By submitting, you agree we may contact your friend with their free class invite.</p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* AMBASSADOR CTA */}
      <section className="section-padding bg-charcoal text-primary-foreground text-center">
        <div className="container-main max-w-2xl">
          <Award size={42} className="text-primary mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Already Sent 5+ Friends?</h2>
          <p className="text-primary-foreground/75 mb-8">WhatsApp Melitta directly to claim your Pura Ambassador status — free unlimited monthly membership and the inside lane on every event we run.</p>
          <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20claim%20my%20Pura%20Ambassador%20status." target="_blank" rel="noopener noreferrer" className="btn-cta bg-primary text-primary-foreground hover:opacity-90">
            💬 Claim Ambassador Status
          </a>
        </div>
      </section>

      <RelatedPages
        title="Keep Exploring"
        links={[
          { to: "/pura-nights", label: "Weekly Classes", desc: "Where the magic happens" },
          { to: "/online-academy", label: "Pura Academy", desc: "Online courses on demand" },
          { to: "/gift-vouchers", label: "Gift Vouchers", desc: "Give the gift of dance" },
          { to: "/community", label: "Community", desc: "Meet our people" },
          { to: "/contact", label: "Contact", desc: "Questions? Ask Melitta" },
        ]}
      />
    </Layout>
  );
};

export default Refer;
