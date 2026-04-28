import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { FadeInUp } from "@/components/animations";
import { Link } from "react-router-dom";

/* <!-- WIX PAGE: /size-guide -->
   <!-- WIX: Use Wix Stores Size Chart widget OR custom Table for each category -->
*/

const womensTops = [
  { size: "XS (UK 6)", bust: "78–82 cm", waist: "60–64 cm", hip: "85–89 cm" },
  { size: "S (UK 8)", bust: "82–86 cm", waist: "64–68 cm", hip: "89–93 cm" },
  { size: "M (UK 10)", bust: "86–90 cm", waist: "68–72 cm", hip: "93–97 cm" },
  { size: "L (UK 12)", bust: "90–96 cm", waist: "72–78 cm", hip: "97–103 cm" },
  { size: "XL (UK 14)", bust: "96–102 cm", waist: "78–84 cm", hip: "103–109 cm" },
];

const unisexTees = [
  { size: "XS", chest: "84–89 cm", length: "66 cm" },
  { size: "S", chest: "89–94 cm", length: "69 cm" },
  { size: "M", chest: "94–99 cm", length: "71 cm" },
  { size: "L", chest: "99–106 cm", length: "73 cm" },
  { size: "XL", chest: "106–114 cm", length: "75 cm" },
  { size: "XXL", chest: "114–122 cm", length: "77 cm" },
];

const sizeGuideFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What size am I in Pura Nights dancewear?", acceptedAnswer: { "@type": "Answer", text: "Pura Nights women's dancewear runs UK 6 (XS) to UK 14 (XL). Match your bust, waist and hip in cm to the chart on this page. If you're between sizes, size down for fitted dancewear." } },
    { "@type": "Question", name: "What size am I in Pura Nights tees and hoodies?", acceptedAnswer: { "@type": "Answer", text: "Unisex tees and hoodies run XS–XXL. Match your chest measurement in cm to the chart. If you're between sizes, size up for a relaxed fit." } },
    { "@type": "Question", name: "How do I measure myself for dancewear?", acceptedAnswer: { "@type": "Answer", text: "Measure bust around the fullest part, waist at the narrowest, and hip around the widest part. Keep the tape level and not too tight. All Pura Nights measurements are in centimetres." } },
    { "@type": "Question", name: "Can I exchange a size after ordering?", acceptedAnswer: { "@type": "Answer", text: "Yes — free in-person size exchanges at any Monday or Tuesday class in Chiswick or Ealing. Postal returns within 14 days are also accepted on unworn items." } },
  ],
};

const SizeGuide = () => (
  <Layout>
    <SeoHead
      title="Pura Nights Size Guide — Dancewear, Tees & Hoodies (cm) | London"
      description="Size charts in cm for Pura Nights dancewear, training tees, hoodies and teamwear. Women's, unisex, and Pura Ladies fits — designed in West London."
      path="/size-guide"
      schema={sizeGuideFaqSchema}
      noindex
    />

    <section className="section-padding section-dark text-center">
      <div className="container-main max-w-3xl">
        <FadeInUp>
          <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-4">Pura Nights · Shop</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Pura Nights Size Guide</h1>
          <p className="text-primary-foreground/60 text-base font-heading">All measurements in centimetres. Between sizes? Size up for hoodies and tees, size down for fitted dancewear.</p>
        </FadeInUp>
      </div>
    </section>

    <section className="section-padding section-ivory">
      <div className="container-main max-w-4xl space-y-12">

        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Women's Dancewear & Tops</h2>
          <p className="text-muted-foreground text-sm mb-5 font-heading">Crop tops, wrap tops, leggings and skirts.</p>
          {/* <!-- WIX: Replace with Wix Table or Stores size chart --> */}
          <div className="overflow-x-auto bg-card rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background/50">
                  {["Size", "Bust", "Waist", "Hip"].map(h => <th key={h} className="text-left py-3 px-4 font-heading font-semibold text-xs uppercase tracking-wider text-muted-foreground">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {womensTops.map(r => (
                  <tr key={r.size} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 font-heading font-semibold">{r.size}</td>
                    <td className="py-3 px-4 text-muted-foreground">{r.bust}</td>
                    <td className="py-3 px-4 text-muted-foreground">{r.waist}</td>
                    <td className="py-3 px-4 text-muted-foreground">{r.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Unisex Tees & Hoodies</h2>
          <p className="text-muted-foreground text-sm mb-5 font-heading">Training tees, hoodies and warm-up layers.</p>
          <div className="overflow-x-auto bg-card rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background/50">
                  {["Size", "Chest", "Body Length"].map(h => <th key={h} className="text-left py-3 px-4 font-heading font-semibold text-xs uppercase tracking-wider text-muted-foreground">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {unisexTees.map(r => (
                  <tr key={r.size} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 font-heading font-semibold">{r.size}</td>
                    <td className="py-3 px-4 text-muted-foreground">{r.chest}</td>
                    <td className="py-3 px-4 text-muted-foreground">{r.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
          <h3 className="font-heading font-bold text-base mb-2">Not sure which size to pick?</h3>
          <p className="text-muted-foreground text-sm mb-3">WhatsApp Melitta with your usual UK size and we'll recommend the best fit.</p>
          <a href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%20need%20help%20choosing%20a%20size" target="_blank" rel="noopener noreferrer" className="text-primary font-heading text-sm font-semibold hover:underline">💬 WhatsApp for sizing help →</a>
        </div>

        <div className="text-center">
          <Link to="/shop" className="text-primary font-heading text-sm font-semibold hover:underline">← Back to Shop</Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default SizeGuide;
