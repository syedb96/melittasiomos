import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import AuthorCard from "@/components/AuthorCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import RelatedPages from "@/components/RelatedPages";

const GiftVoucherDanceClass = () => (
  <Layout>
    <SeoHead title="Dance Class Gift Voucher London | Pura Nights" description="Give the gift of dance. Pura Nights gift vouchers make the perfect present — for birthdays, Christmas, Valentine's Day, or any occasion. Available for classes and private lessons." path="/blog/gift-voucher-dance-class-london" schema={{ "@context": "https://schema.org", "@type": "Article", headline: "Why a Dance Class Gift Voucher is the Best Present You Can Give", author: { "@type": "Person", name: "Melitta Siomos" }, datePublished: "2026-03-15" }} />
    <ReadingProgressBar />
    <article>
      <section className="section-padding section-dark">
        <div className="container-main max-w-3xl">
          <nav className="text-xs text-primary-foreground/40 mb-6 font-heading"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span className="text-primary">Lifestyle</span></nav>
          <FadeInUp>
            <span className="inline-block bg-primary/20 text-primary text-xs font-heading font-bold px-3 py-1 rounded-full mb-4">Lifestyle</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Why a Dance Class Gift Voucher is the Best Present You Can Give</h1>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50 font-heading mb-4"><span>By Melitta Siomos</span><span>·</span><span>Mar 2026</span><span>·</span><span>5 min read</span></div>
            <SocialShareButtons title="Dance Class Gift Voucher" path="/blog/gift-voucher-dance-class-london" />
          </FadeInUp>
        </div>
      </section>
      <section className="section-padding section-warm">
        <div className="container-main max-w-3xl prose-custom">
          <AuthorCard />
          <FadeInUp>
            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Problem With Most Gifts</h2>
            <p className="text-muted-foreground mb-4">We've all been there — standing in a shop, scrolling through Amazon, trying to find the perfect gift for someone who already has everything they need. Candles, scarves, mugs with witty slogans — they're fine, but they're forgettable. Research consistently shows that experiential gifts create more happiness than material ones. Experiences become memories, stories, and identity — a candle becomes clutter.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Why Experiences Beat Things</h2>
            <p className="text-muted-foreground mb-4">A dance class gift voucher gives someone something truly valuable: a new skill, a new community, a boost of confidence, and a genuinely fun evening out. Many of our longest-standing students started because someone bought them a voucher. What began as a thoughtful gift became a weekly ritual, new friendships, and a lifelong passion for Latin dance.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Who a Dance Voucher Is Perfect For</h2>
            <p className="text-muted-foreground mb-4">Anyone aged 18 to 80+ who enjoys music, socialising, or trying new things. Dance vouchers are particularly popular for: partners who want to try something together, friends who've mentioned wanting to learn to dance, parents or grandparents who love music, couples preparing for their <Link to="/wedding-dance" className="text-primary hover:underline">wedding first dance</Link>, and anyone going through a life transition who could benefit from a new social outlet.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">How Pura Nights Gift Vouchers Work</h2>
            <p className="text-muted-foreground mb-4">Pura Nights <Link to="/gift-vouchers" className="text-primary hover:underline">gift vouchers</Link> are available for individual classes, class bundles (4, 8, or 12 sessions), and private lessons. They can be purchased online, delivered digitally or as a physical card, and are valid for 12 months. The recipient simply presents the voucher at any Pura Nights class in Chiswick or Ealing — no advance booking needed for regular classes.</p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Perfect Occasions for a Dance Voucher</h2>
            <p className="text-muted-foreground mb-4">Birthdays, Christmas, Valentine's Day, Mother's Day, Father's Day, anniversaries, retirement gifts, "just because" surprises, engagement presents (especially if they're planning a wedding dance), and Secret Santa with a twist. A dance voucher also makes a brilliant "experience together" gift for couples — a date night that's actually interesting.</p>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 my-8">
              <h3 className="font-heading font-bold mb-2">Give the Gift of Dance</h3>
              <p className="text-muted-foreground text-sm mb-4">Browse our gift voucher options — from single classes to private lesson packages.</p>
              <Link to="/gift-vouchers" className="btn-cta-primary text-sm">🎁 View Gift Vouchers</Link>
            </div>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-8">
              {[
                { q: "How long are gift vouchers valid?", a: "12 months from the date of purchase." },
                { q: "Can I buy a voucher for private lessons?", a: "Yes — private lesson vouchers are available and make an excellent premium gift." },
                { q: "Can the recipient use it at both venues?", a: "Yes — vouchers are valid at both the Chiswick (Monday) and Ealing (Tuesday) venues." },
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-xl p-5">
                  <h3 className="font-heading font-bold text-sm mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <SocialShareButtons title="Dance Class Gift Voucher" path="/blog/gift-voucher-dance-class-london" />
          </FadeInUp>
        </div>
      </section>
    </article>
    <RelatedPages title="Related" links={[
      { to: "/gift-vouchers", label: "Gift Vouchers" },
      { to: "/prices", label: "Prices & Bundles" },
      { to: "/blog/joining-dance-class-alone", label: "Joining a Class Alone" },
    ]} />
  </Layout>
);

export default GiftVoucherDanceClass;
