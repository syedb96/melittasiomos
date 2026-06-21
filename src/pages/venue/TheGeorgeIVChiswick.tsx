import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import VenueGeoCard from "@/components/VenueGeoCard";
import LocalTransportBlock from "@/components/LocalTransportBlock";
import NearMeGrid from "@/components/NearMeGrid";
import { CHISWICK_NEAR } from "@/data/near-me-areas";
import ProofBlock from "@/components/ProofBlock";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { MapPin, Train, Car, Phone, Music, Users, Wine, Shirt } from "lucide-react";
import { Link } from "react-router-dom";
import { waCustom } from "@/lib/whatsapp";
import { Price, BookingLink, VenueDetails } from "@/components/commerce/CommercePrimitives";

const venueFaqs = [
  { q: "Do I need to book in advance?", a: "No — just turn up! We welcome walk-ins every Monday. If it's your first time, arrive a few minutes early." },
  { q: "Can I come on my own?", a: "Absolutely. Most people come alone. We rotate partners during class so you'll meet everyone." },
  { q: "What should I wear?", a: "Comfortable clothes you can move in. Clean shoes with a smooth sole — avoid trainers with heavy grip." },
  { q: "Is there parking?", a: "Yes — on-street parking is free after 6:30pm on surrounding roads. The venue is also a 5-minute walk from Turnham Green Tube." },
  { q: "Can I stay for just one class?", a: "Yes. You can do one class + social for £10, or stay for both classes + social for £15." },
  { q: "What if I've never danced before?", a: "The 7:30pm Beginners class assumes zero experience. We'll teach you from step one." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "FAQPage"],
  name: "Pura Nights at The George IV",
  description: "Weekly salsa and bachata classes every Monday at The George IV pub in Chiswick, West London.",
  address: { "@type": "PostalAddress", streetAddress: "185 Chiswick High Rd", addressLocality: "Chiswick", addressRegion: "London", postalCode: "W4 2DR", addressCountry: "GB" },
  geo: { "@type": "GeoCoordinates", latitude: "51.4926", longitude: "-0.2583" },
  url: "https://www.puranights.com/venue/the-george-iv-chiswick",
  telephone: "+447449482343",
  mainEntity: venueFaqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const TheGeorgeIVChiswick = () => (
  <Layout>
    <SeoHead
      title="The George IV Chiswick — Monday Salsa & Bachata Classes"
      description="Join Pura Nights every Monday at The George IV, 185 Chiswick High Rd. Beginners & improvers salsa and bachata classes plus social dancing. 5 mins from Turnham Green Tube."
      path="/venue/the-george-iv-chiswick"
      schema={schema}
    />

    {/* WIX SECTION: Hero */}
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-background to-muted overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/salsa-chiswick-hero.jpg')] bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
        <FadeInUp>
          <span className="inline-block bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Every Monday
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            The George IV, Chiswick
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Your Monday night home for salsa and bachata in West London. A beautiful pub with a dedicated dance space, welcoming atmosphere, and drinks at the bar afterwards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookingLink slug="tickettailor-puranights" fallbackHref="https://www.tickettailor.com/events/puranights" className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Book Monday Class
            </BookingLink>
            <a href="https://maps.google.com/?q=The+George+IV+185+Chiswick+High+Rd+London+W4+2DR" target="_blank" rel="noopener noreferrer" className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors">
              Get Directions
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* WIX SECTION: Venue Details */}
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <StaggerContainer className="grid md:grid-cols-2 gap-12">
          <StaggerItem>
            <FadeInUp>
              <h2 className="text-3xl font-bold text-foreground mb-6">About the Venue</h2>
              <p className="text-muted-foreground mb-4">
                The George IV is a beautifully restored Victorian pub on Chiswick High Road, just a five-minute walk from Turnham Green Tube station. The upstairs function room provides a spacious, well-lit dance floor that's perfect for learning and social dancing.
              </p>
              <p className="text-muted-foreground mb-4">
                After class, head downstairs to the main bar for a drink with fellow dancers — it's one of the best parts of the evening and a big reason our Monday community is so tight-knit.
              </p>
              <p className="text-muted-foreground">
                The pub has a warm, welcoming atmosphere that makes first-timers feel at ease immediately. Whether you've never danced before or you're an experienced social dancer, Monday nights at the George IV are unmissable.
              </p>
            </FadeInUp>
          </StaggerItem>

          <StaggerItem>
            <FadeInUp delay={0.15}>
              <VenueDetails
                slug="the-george-iv-chiswick"
                fallback={{
                  address: "185 Chiswick High Rd, London W4 2DR",
                  transport: "Turnham Green (District Line) — 5 min walk",
                  parking: "Free on-street parking after 6:30pm on surrounding roads",
                  accessibility: "Step-free from the street. Dance floor on ground level. Accessible toilet available.",
                }}
                waSource="TheGeorgeIVChiswick:VenueDetails"
              />
            </FadeInUp>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>

    {/* WIX SECTION: Monday Schedule */}
    <section className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <FadeInUp>
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">Monday Night Schedule</h2>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {[
                { time: "7:30 – 8:30pm", name: "Beginners Salsa & Bachata", icon: Users, desc: "No experience needed. We teach the fundamentals step by step." },
                { time: "8:30 – 9:30pm", name: "Improvers Salsa & Bachata", icon: Music, desc: "For those with 6+ months experience. More combinations and technique." },
                { time: "9:30 – 11:00pm", name: "Social Dancing", icon: Wine, desc: "Open floor — practice what you've learned, dance with everyone, have fun." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6">
                  <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-primary font-medium">{item.time}</p>
                    <p className="text-lg font-semibold text-foreground">{item.name}</p>
                    <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* WIX SECTION: Pricing */}
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <FadeInUp>
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">Monday Pricing</h2>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-3 gap-6">
          {[
            { slug: "combined-class-social", fallback: "£15", label: "2 Classes + Social", note: "Best value for the full evening" },
            { slug: "drop-in-class", fallback: "£10", label: "1 Class + Social", note: "Choose Beginners or Improvers" },
            { slug: "social-only", fallback: "£5", label: "Social Only", note: "Join from 9:30pm" },
          ].map((tier, i) => (
            <StaggerItem key={i}>
              <div className="bg-card rounded-xl border border-border p-6 text-center hover:border-primary/50 transition-colors">
                <p className="text-3xl font-bold text-primary mb-2">
                  <Price slug={tier.slug} fallback={tier.fallback} showPrevious={false} />
                </p>
                <p className="font-semibold text-foreground mb-1">{tier.label}</p>
                <p className="text-sm text-muted-foreground">{tier.note}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeInUp delay={0.2}>
          <div className="mt-8 bg-muted/50 rounded-xl p-6 text-center">
            <p className="text-foreground font-medium mb-1">Save with bundles</p>
            <p className="text-muted-foreground text-sm">
              5-class bundle: <Price slug="chiswick-bundle-5" fallback="£55" showPrevious={false} /> · 10-class bundle: <Price slug="chiswick-bundle-10" fallback="£99" showPrevious={false} /> · Monthly unlimited: <Price slug="chiswick-membership" fallback="£120" showPrevious={false} />
            </p>
            <Link to="/prices" className="text-primary hover:underline text-sm mt-2 inline-block">View full pricing →</Link>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* WIX SECTION: First Time Guide */}
    <section className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <FadeInUp>
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">Your First Monday at The George IV</h2>
        </FadeInUp>
        <StaggerContainer className="space-y-6">
          {[
            { step: "1", title: "Arrive 5-10 minutes early", desc: "Head upstairs to the function room on the first floor. Look for the Pura Nights signs." },
            { step: "2", title: "Sign in and pay", desc: "Cash or card accepted. No need to pre-book — just turn up." },
            { step: "3", title: "Beginners class starts at 7:30pm", desc: "We'll welcome you, explain the format, and start with the basics. No partner needed." },
            { step: "4", title: "Rotate and meet new people", desc: "We rotate partners throughout the class so you'll dance with everyone and learn faster." },
            { step: "5", title: "Social dancing from 9:30pm", desc: "The floor opens up. Practice what you've learned, or just watch and enjoy the atmosphere." },
            { step: "6", title: "Drinks at the bar", desc: "Head downstairs for a drink with the group. It's the best part of the evening." },
          ].map((item, i) => (
            <StaggerItem key={i}>
              <div className="flex items-start gap-4">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* WIX SECTION: What to Wear */}
    <section className="py-12 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <FadeInUp>
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 flex flex-col md:flex-row items-start gap-5">
            <div className="bg-primary/10 p-3 rounded-lg shrink-0">
              <Shirt className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">What to wear</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Comfortable, breathable clothes you can move and turn in. Clean shoes with a smooth sole work best —
                avoid heavy-grip trainers, they make turns hard. Bring a small water bottle. The room can warm up,
                so layers are useful.
              </p>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* WIX SECTION: FAQ */}
    <section className="py-16 bg-background">
      <div className="max-w-3xl mx-auto px-4">
        <FadeInUp>
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">Frequently Asked Questions</h2>
        </FadeInUp>
        <div className="space-y-4">
          {venueFaqs.map((faq, i) => (
            <FadeInUp key={i} delay={i * 0.05}>
              <details className="group bg-card rounded-xl border border-border p-5">
                <summary className="font-semibold text-foreground cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-muted-foreground group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <p className="text-muted-foreground mt-3 text-sm">{faq.a}</p>
              </details>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* WIX SECTION: CTA */}
    <section className="py-16 bg-gradient-to-br from-primary/10 to-muted">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <FadeInUp>
          <h2 className="text-3xl font-bold text-foreground mb-4">See You on Monday</h2>
          <p className="text-muted-foreground mb-8">
            No booking needed. No partner needed. Just come as you are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookingLink slug="tickettailor-puranights" fallbackHref="https://www.tickettailor.com/events/puranights" className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Book Now
            </BookingLink>
            <a {...waCustom("Hi Melitta, I'm interested in the Monday Chiswick class at The George IV. Is it suitable for a complete beginner coming alone?", "TheGeorgeIVChiswick:278")} className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors">
              WhatsApp Melitta
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>

    <ProofBlock
      categories={["beginner", "community", "group"]}
      eyebrow="Monday Nights"
      title="What Chiswick regulars say"
      limit={3}
    />

    <VenueGeoCard
      name="The George IV, Chiswick"
      streetAddress="185 Chiswick High Rd"
      locality="London"
      postcode="W4 2DR"
      lat={51.4926}
      lng={-0.2583}
      telephone="+447449482343"
      directionsUrl="https://maps.google.com/?q=The+George+IV+185+Chiswick+High+Rd+London+W4+2DR"
    />

    <LocalTransportBlock
      venueName="The George IV"
      postcode="W4 2DR"
      rows={[
        { mode: "tube", label: "Turnham Green (District)", detail: "3-min walk down Chiswick High Rd.", time: "3 min" },
        { mode: "tube", label: "Gunnersbury (District / Overground)", detail: "8-min walk via Wellesley Rd.", time: "8 min" },
        { mode: "bus", label: "27, E3, 272, 391", detail: "Stop directly outside the pub. Night bus N9.", time: "Door" },
        { mode: "car", label: "Drive & park", detail: "Free meter parking after 6:30 PM around the venue.", time: "After 6:30" },
        { mode: "cycle", label: "Santander Bikes", detail: "Dock at Turnham Green Terrace. CS9 cycle route runs past.", time: "Door" },
        { mode: "access", label: "Step-free access", detail: "Ground-floor entrance and accessible WC.", time: "—" },
      ]}
      parkingNote="Free on-street meter parking after 6:30 PM along Chiswick High Rd and side streets."
      accessibilityNote="Step-free from the street. Dance floor on ground level. Accessible toilet available."
    />

    <NearMeGrid areas={CHISWICK_NEAR} />

    <RelatedPages links={[
      { label: "Salsa Classes Chiswick", to: "/salsa-classes-chiswick" },
      { label: "Dance Classes Chiswick", to: "/dance-classes-chiswick" },
      { label: "Tuesday at The Drayton Court", to: "/venue/the-drayton-court-ealing" },
      { label: "Full Schedule", to: "/schedule" },
      { label: "Prices & Bundles", to: "/prices" },
      { label: "Start Here", to: "/start-here" },
    ]} />
  </Layout>
);

export default TheGeorgeIVChiswick;
