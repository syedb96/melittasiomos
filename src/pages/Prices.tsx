// CTA audit v7.1 - verified
import { useState } from "react";
import Layout from "@/components/Layout";
import FirstTimerCallout from "@/components/FirstTimerCallout";
import SeoHead from "@/components/SeoHead";
import AnswerBox from "@/components/AnswerBox";
import { Link } from "react-router-dom";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { CheckCircle, Star } from "lucide-react";
import BundleCalculator from "@/components/BundleCalculator";

/* <!-- WIX PAGE: /prices -->
   <!-- WIX SECTION: Drop-in Pricing — use Card grid -->
   <!-- WIX SECTION: Class Bundles — use 2-column Card grid -->
   <!-- WIX SECTION: Latin Friday — use styled Strip -->
   <!-- WIX SECTION: Competitor Comparison — use Table element -->
   <!-- WIX SECTION: Private + Wedding Enquiry — use 2-column Cards -->
   <!-- WIX SECTION: Gift Vouchers — use CTA Strip -->
   <!-- WIX SECTION: Pricing FAQs — use Wix FAQ app or Accordions -->
*/
const Prices = () => {
  const [selected, setSelected] = useState<"try" | "commit" | "weekly" | null>(null);
  return (
  <Layout>
    <SeoHead title="Salsa & Bachata Class Prices London | Pura Nights" description="View all Salsa & Bachata class prices at Pura Nights. Drop-in from £5, monthly bundles, and Latin Friday tickets. Chiswick & Ealing venues." path="/prices" />

    <section className="section-padding section-warm">
      <div className="container-main text-center">
        <FadeInUp>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Flexible Pricing for Every Dancer</h1>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto mb-2">Drop in when you can. Or commit to a bundle and save up to 30%.</p>
          <p className="text-[11px] font-accent tracking-wide text-primary mb-3">Instant Ticket Tailor confirmation · No subscription · Cancel anytime</p>
          <p className="text-muted-foreground/80 text-xs italic max-w-xl mx-auto mb-8">
            We teach <Link to="/learn/salsa-vs-bachata" className="text-primary hover:underline">On2 Crossbody Salsa</Link> and Dominican / Modern Bachata — the internationally recognised social dance styles. Not Cuban Salsa or Rueda.
          </p>
        </FadeInUp>

        {/* Trust bar — 5.0 across all 4 brands */}
        <FadeInUp delay={0.05}>
          <div className="bg-card rounded-2xl p-6 mb-12 max-w-4xl mx-auto border border-primary/15">
            <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary mb-4">Rated 5.0 Stars Across All 4 Brands</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "Pura Nights" },
                { name: "Wedding Dance Made Easy" },
                { name: "Pura Ladies" },
                { name: "Melitta Siomos" },
              ].map((b) => (
                <div key={b.name} className="bg-background rounded-xl p-3">
                  <div className="flex justify-center gap-0.5 text-primary mb-1">
                    {Array(5).fill(0).map((_, j) => <Star key={j} size={11} fill="currentColor" />)}
                  </div>
                  <p className="font-heading font-semibold text-xs">{b.name}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-xs mt-3 italic">Verified Google reviews — we never ask for reviews in class.</p>
          </div>
        </FadeInUp>

        {/* Package selector */}
        <FadeInUp delay={0.08}>
          <div className="max-w-3xl mx-auto mb-12 bg-card rounded-2xl p-6 border border-border">
            <h2 className="font-heading font-bold text-lg mb-4">Which Package Is Right For You?</h2>
            <div className="grid sm:grid-cols-3 gap-3 text-left">
              {[
                { key: "try" as const, label: "I want to try it first", target: "Drop-In (£10–£15)" },
                { key: "commit" as const, label: "I'm committing to learning", target: "5 or 10-class bundle" },
                { key: "weekly" as const, label: "I want to dance every week", target: "Monthly Membership" },
              ].map((opt) => (
                <label key={opt.key} className={`flex flex-col gap-1 p-4 rounded-xl border-2 cursor-pointer transition-all ${selected === opt.key ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                  <input type="radio" name="package-selector" className="sr-only" checked={selected === opt.key} onChange={() => setSelected(opt.key)} />
                  <span className="font-heading font-semibold text-sm">{opt.label}</span>
                  <span className="text-primary text-xs">→ {opt.target}</span>
                </label>
              ))}
            </div>
          </div>
        </FadeInUp>

        {/* Drop-in Pricing */}
        <FadeInUp delay={0.1}>
          <h2 className="font-display text-2xl font-bold mb-8">Drop-In Pricing (Both Venues)</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
            {[
              { price: "£15", label: "2 classes + social", note: "Best value" },
              { price: "£10", label: "1 class + social", note: "Popular choice" },
              { price: "£5", label: "Social only", note: "Party only, no class" },
            ].map((p, i) => (
              <div key={i} className={`bg-card rounded-2xl p-6 card-hover ${i === 0 ? "ring-2 ring-primary" : ""}`}>
                <p className="font-display text-3xl font-bold text-foreground mb-1">{p.price}</p>
                <p className="font-heading font-semibold text-sm mb-1">{p.label}</p>
                <p className="text-muted-foreground text-xs">{p.note}</p>
              </div>
            ))}
          </div>
        </FadeInUp>

        {/* Bundle Calculator */}
        <FadeInUp delay={0.15}>
          <div className="mb-16">
            <BundleCalculator />
          </div>
        </FadeInUp>

        {/* Bundles */}
        <FadeInUp delay={0.2}>
          <h2 className="font-display text-2xl font-bold mb-8">Class Bundles — Save More</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <div className={`bg-card rounded-2xl p-8 card-hover text-left transition-all ${selected === "commit" || selected === "weekly" ? "ring-2 ring-primary shadow-[0_0_30px_hsl(var(--primary)/0.4)]" : ""}`}>
              <h3 className="font-heading font-bold text-lg mb-1 text-primary">Chiswick (Monday)</h3>
              <p className="text-muted-foreground text-xs mb-4">The George IV, 185 Chiswick High Rd, W4 2DR</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-border"><span>5-Class Bundle</span><span className="font-display font-bold">£55</span></div>
                <div className="flex justify-between items-center py-2 border-b border-border"><span>10-Class Bundle</span><span className="font-display font-bold">£99</span></div>
                <div className="pt-2">
                  <div className="flex justify-between items-center"><span className="font-heading font-semibold">Monthly Membership — Dance Every Week</span><span className="font-display font-bold">£120</span></div>
                  <p className="text-muted-foreground text-xs italic mt-1 mb-2">The most popular option — serious dancers and social regulars choose this.</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>✓ Unlimited classes at both Chiswick and Ealing</li>
                    <li>✓ Priority access to Latin Friday early bird tickets</li>
                    <li>✓ Join a community of 500+ dancers</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={`bg-card rounded-2xl p-8 card-hover text-left transition-all ${selected === "commit" || selected === "weekly" ? "ring-2 ring-primary shadow-[0_0_30px_hsl(var(--primary)/0.4)]" : ""}`}>
              <h3 className="font-heading font-bold text-lg mb-1 text-secondary">Ealing (Tuesday)</h3>
              <p className="text-muted-foreground text-xs mb-2">Drayton Court Hotel, 2 The Avenue, W13 8PH</p>
              <p className="text-xs text-primary mb-4">+ FREE Ladies Styling warm-up every Tuesday</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-border"><span>5-Class Bundle</span><span className="font-display font-bold">£42</span></div>
                <div className="flex justify-between items-center py-2 border-b border-border"><span>10-Class Bundle</span><span className="font-display font-bold">£78</span></div>
                <div className="pt-2">
                  <div className="flex justify-between items-center"><span className="font-heading font-semibold">Monthly Membership — Dance Every Week</span><span className="font-display font-bold">£85</span></div>
                  <p className="text-muted-foreground text-xs italic mt-1">The most popular option — serious dancers and social regulars choose this.</p>
                </div>
              </div>
            </div>

          </div>
        </FadeInUp>

        {/* Latin Friday */}
        <FadeInUp delay={0.3}>
          <h2 className="font-display text-2xl font-bold mb-8">🔥 Monthly Latin Friday</h2>
          <div className="bg-charcoal rounded-2xl p-8 max-w-3xl mx-auto mb-16 text-left">
            <p className="text-primary-foreground/60 text-sm mb-4">2nd Friday of every month · Drayton Court Hotel, Ealing</p>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              {[
                { tier: "Early Bird", color: "text-primary", price: "£15", party: "£10" },
                { tier: "Standard", color: "text-peach", price: "£17", party: "£12" },
                { tier: "On the Door", color: "text-secondary", price: "£20", party: "£15" },
              ].map(t => (
                <div key={t.tier} className="bg-charcoal-light rounded-xl p-4 text-center">
                  <p className={`${t.color} font-heading font-semibold text-xs uppercase tracking-wider mb-2`}>{t.tier}</p>
                  <p className="text-primary-foreground font-display font-bold text-xl">{t.price}</p>
                  <p className="text-primary-foreground/50 text-xs">class + party</p>
                  <p className="text-primary-foreground/40 text-xs mt-1">{t.party} party only</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>

        {/* Competitor Comparison */}
        <FadeInUp delay={0.35}>
          <h2 className="font-display text-2xl font-bold mb-8">How We Compare</h2>
          <div className="overflow-x-auto mb-16">
            <table className="w-full max-w-3xl mx-auto text-sm text-left">
              <thead>
                <tr className="border-b-2 border-primary/20">
                  <th className="py-3 pr-4 font-heading font-semibold"></th>
                  <th className="py-3 px-3 font-heading font-semibold text-primary">Pura Nights</th>
                  <th className="py-3 px-3 font-heading font-semibold text-muted-foreground">Salsateca</th>
                  <th className="py-3 px-3 font-heading font-semibold text-muted-foreground">Incognito Dance</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ["Drop-in price", "£10–£15", "£14–£18", "£12–£16"],
                  ["5-class bundle", "From £42", "~£55", "~£50"],
                  ["Monthly unlimited", "From £85", "~£130", "~£110"],
                  ["Free styling warm-up", "✅ (Tuesdays)", "❌", "❌"],
                  ["3 levels per night", "✅", "✅", "Partial"],
                  ["Monthly social event", "✅", "Occasional", "Occasional"],
                  ["Community feel", "✅ Award-winning", "✅", "✅"],
                ].map(([label, ...vals], i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3 pr-4 font-heading font-semibold text-foreground text-xs">{label}</td>
                    {vals.map((v, j) => (
                      <td key={j} className={`py-3 px-3 text-xs ${j === 0 ? "text-foreground font-semibold" : ""}`}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeInUp>

        {/* Private + Wedding Enquiry */}
        <FadeInUp delay={0.4}>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 text-left">
              <h3 className="font-heading font-bold mb-2">Private Lessons — Bespoke Pricing</h3>
              <p className="text-muted-foreground text-sm mb-4">Contact Melitta to discuss your goals.</p>
              <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20enquire%20about%20private%20lessons" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-xs py-2 px-6">💬 Enquire via WhatsApp</a>
            </div>
            <div className="bg-peach/10 border border-peach/20 rounded-2xl p-6 text-left">
              <h3 className="font-heading font-bold mb-2">Wedding Dance — Free Consultation</h3>
              <p className="text-muted-foreground text-sm mb-4">Melitta will design a package around your song, timeline, and vision.</p>
              <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20we%27d%20love%20to%20book%20a%20wedding%20dance%20consultation" target="_blank" rel="noopener noreferrer" className="btn-cta text-xs py-2 px-6 bg-peach text-charcoal font-semibold hover:opacity-90 rounded-xl">Book Free Consultation</a>
            </div>
          </div>
        </FadeInUp>

        {/* Gift Vouchers */}
        <FadeInUp delay={0.45}>
          <div className="bg-card rounded-2xl p-8 max-w-2xl mx-auto card-hover mb-12">
            <h2 className="font-display text-2xl font-bold mb-2">🎁 Gift Vouchers</h2>
            <p className="text-muted-foreground mb-4">Give the gift of dance! Choose from £25, £50, £75, £100, £150, or £200.</p>
            <Link to="/gift-vouchers" className="btn-cta-primary text-xs py-2 px-6">Buy a Gift Voucher</Link>
          </div>
        </FadeInUp>

        {/* Pricing FAQ */}
        <FadeInUp delay={0.5}>
          <div className="max-w-2xl mx-auto text-left">
            <h2 className="font-display text-2xl font-bold mb-6 text-center">Pricing FAQs</h2>
            {[
              { q: "Do bundles expire?", a: "5-class bundles: 8 weeks. 10-class bundles: 16 weeks. Monthly: rolling." },
              { q: "Can I use a bundle at both venues?", a: "Chiswick and Ealing bundles are venue-specific. Ask Melitta about cross-venue options." },
              { q: "How do I pay?", a: "Cash on the night, or card (SumUp card reader available at both venues)." },
              { q: "Do you offer student or concession discounts?", a: "Contact Melitta directly to discuss." },
            ].map((faq, i) => (
              <details key={i} className="border-b border-border py-4 group">
                <summary className="font-heading font-semibold cursor-pointer hover:text-primary transition-colors">{faq.q}</summary>
                <p className="text-muted-foreground text-sm mt-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* WIX SECTION: AnswerBox — AI / GEO answer block */}
    <section className="section-base py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <AnswerBox
          question={`How much do Salsa & Bachata classes cost in West London (2026)?`}
          answer={`Weekly Pura Nights classes are £15 on the door and £12 pre-booked online. Multi-class bundles bring the per-class rate below £10. Private lessons and wedding-dance packages are enquiry-only and tailored. Latin Friday socials start at £10 early bird.`}
          bullets={[
              "Drop-in: £15 door · £12 online",
              "Bundles: under £10 per class",
              "Private & wedding: enquiry-only",
              "Latin Friday social: from £10"
          ]}
          cta={{ label: "See the weekly schedule", to: "/schedule" }}
        />
      </div>
    </section>


    <RelatedPages title="Related Pages" links={[
      { to: "/pura-nights", label: "Weekly Classes", desc: "Full schedule & venue info" },
      { to: "/private-lessons", label: "Private Lessons", desc: "Enquire about 1-to-1 coaching" },
      { to: "/wedding-dance", label: "Wedding Dance", desc: "First dance packages" },
      { to: "/gift-vouchers", label: "Gift Vouchers", desc: "Give the gift of dance" },
      { to: "/start-here", label: "Start Here", desc: "New to Salsa & Bachata?" },
    ]} />
    <FirstTimerCallout />
  </Layout>
  );
};

export default Prices;
