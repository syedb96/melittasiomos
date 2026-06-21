import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import VenueGeoCard from "@/components/VenueGeoCard";
import LocalTransportBlock from "@/components/LocalTransportBlock";
import NearMeGrid from "@/components/NearMeGrid";
import { EALING_NEAR } from "@/data/near-me-areas";
import ProofBlock from "@/components/ProofBlock";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { MapPin, Train, Car, Phone, Music, Users, Wine, Sparkles, Shirt } from "lucide-react";
import { Link } from "react-router-dom";
import { waCustom } from "@/lib/whatsapp";
import { Price, BookingLink, VenueDetails } from "@/components/commerce/CommercePrimitives";

const venueFaqs = [
  { q: "Do I need to book?", a: "No — just turn up! Walk-ins welcome every Tuesday." },
  { q: "Is the ladies styling only for women?", a: "Everyone is welcome at the 6:50pm warm-up. It focuses on body movement, arm styling, and confidence — useful for all dancers." },
  { q: "Can I come alone?", a: "Most people do. We rotate partners so you'll dance with everyone." },
  { q: "What should I wear?", a: "Comfortable clothes and clean shoes with a smooth sole. Avoid heavy-grip trainers." },
  { q: "Is there free parking?", a: "Yes — the Drayton Court has its own car park, and on-street parking is also available nearby." },
  { q: "How do I get there by train?", a: "West Ealing Station (Elizabeth Line) is a 10-minute walk. Ealing Broadway is also accessible via Central and District lines." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "FAQPage"],
  name: "Pura Nights at The Drayton Court Hotel",
  description: "Weekly salsa and bachata classes every Tuesday at The Drayton Court Hotel in Ealing, West London. Free ladies styling warm-up at 6:50pm.",
  address: { "@type": "PostalAddress", streetAddress: "2 The Avenue", addressLocality: "West Ealing", addressRegion: "London", postalCode: "W13 8PH", addressCountry: "GB" },
  geo: { "@type": "GeoCoordinates", latitude: "51.5130", longitude: "-0.3190" },
  url: "https://www.puranights.com/venue/the-drayton-court-ealing",
  telephone: "+447449482343",
  mainEntity: venueFaqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const TheDraytonCourtEaling = () => (
  <Layout>
    <SeoHead
      title="The Drayton Court Hotel Ealing — Tuesday Salsa & Bachata"
      description="Join Pura Nights every Tuesday at The Drayton Court Hotel, Ealing. Free ladies styling at 6:50pm, beginners & improvers classes, social dancing. 10 mins from West Ealing Station."
      path="/venue/the-drayton-court-ealing"
      schema={schema}
    />

    {/* WIX SECTION: Hero */}
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-background to-muted overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/bachata-ealing-hero.jpg')] bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
        <FadeInUp>
          <span className="inline-block bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Every Tuesday
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            The Drayton Court Hotel, Ealing
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Your Tuesday night destination for salsa, bachata, and free ladies styling. A grand Edwardian hotel with a stunning ballroom, welcoming bar, and the best Latin dance community in West London.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookingLink slug="tickettailor-puranights" fallbackHref="https://www.tickettailor.com/events/puranights" className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Book Tuesday Class
            </BookingLink>
            <a href="https://maps.google.com/?q=The+Drayton+Court+Hotel+2+The+Avenue+Ealing+London+W13+8PH" target="_blank" rel="noopener noreferrer" className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors">
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
                The Drayton Court Hotel is a magnificent Grade II listed Edwardian building in the heart of West Ealing. Its grand ballroom provides one of the best dance floors in West London — spacious, atmospheric, and purpose-built for movement.
              </p>
              <p className="text-muted-foreground mb-4">
                Tuesday nights at the Drayton Court are special. The evening starts with a free ladies styling warm-up at 6:50pm, followed by structured classes and open social dancing until late. The hotel bar downstairs is the perfect spot for post-class socialising.
              </p>
              <p className="text-muted-foreground">
                The Drayton Court is also home to our monthly Latin Friday events — a full evening of classes, live DJs, and social dancing that draws dancers from across London.
              </p>
            </FadeInUp>
          </StaggerItem>

          <StaggerItem>
            <FadeInUp delay={0.15}>
              <VenueDetails
                slug="the-drayton-court-ealing"
                fallback={{
                  address: "2 The Avenue, West Ealing, London W13 8PH",
                  transport: "West Ealing (Elizabeth Line) — 10 min walk",
                  parking: "Free car park at the venue. On-street parking also available.",
                  accessibility: "Step-free entrance and accessible WC on site.",
                }}
                waSource="TheDraytonCourtEaling:VenueDetails"
              />
            </FadeInUp>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>

    {/* WIX SECTION: Tuesday Schedule */}
    <section className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <FadeInUp>
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">Tuesday Night Schedule</h2>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {[
                { time: "6:50 – 7:20pm", name: "Free Ladies Styling Warm-Up", icon: Sparkles, desc: "Open to all. Body movement, arm styling, and confidence building. Complimentary." },
                { time: "7:20 – 8:20pm", name: "Beginners Salsa & Bachata", icon: Users, desc: "No experience needed. Step-by-step instruction for complete beginners." },
                { time: "8:20 – 9:20pm", name: "Improvers Salsa & Bachata", icon: Music, desc: "For dancers with 6+ months experience. More complex patterns and musicality." },
                { time: "9:20 – 11:00pm", name: "Social Dancing", icon: Wine, desc: "Open floor — salsa, bachata, and good vibes until late." },
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
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">Tuesday Pricing</h2>
        </FadeInUp>
        <StaggerContainer className="grid sm:grid-cols-3 gap-6">
          {[
            { slug: "combined-class-social", fallback: "£15", label: "2 Classes + Social", note: "Best value — includes free styling warm-up" },
            { slug: "drop-in-class", fallback: "£10", label: "1 Class + Social", note: "Choose Beginners or Improvers" },
            { slug: "social-only", fallback: "£5", label: "Social Only", note: "Join from 9:20pm" },
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
              5-class bundle: <Price slug="ealing-bundle-5" fallback="£42" showPrevious={false} /> · 10-class bundle: <Price slug="ealing-bundle-10" fallback="£78" showPrevious={false} /> · Monthly unlimited: <Price slug="ealing-membership" fallback="£85" showPrevious={false} />
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
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">Your First Tuesday at The Drayton Court</h2>
        </FadeInUp>
        <StaggerContainer className="space-y-6">
          {[
            { step: "1", title: "Arrive from 6:45pm", desc: "Head to the ballroom on the first floor. Follow the music — you can't miss it." },
            { step: "2", title: "Free styling warm-up at 6:50pm", desc: "Ladies styling is open to everyone. A gentle warm-up for body movement and confidence." },
            { step: "3", title: "Sign in and pay", desc: "Cash or card accepted. No booking required — just walk in." },
            { step: "4", title: "Beginners class starts at 7:20pm", desc: "We assume zero experience. Every step is broken down clearly." },
            { step: "5", title: "Rotate partners throughout", desc: "No need to bring a partner — we rotate so everyone learns and meets new people." },
            { step: "6", title: "Social dancing from 9:20pm", desc: "The ballroom floor opens up for free dancing. All levels welcome." },
            { step: "7", title: "Post-class drinks", desc: "The Drayton Court has a beautiful bar downstairs. Join the group for a drink." },
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

    {/* WIX SECTION: Latin Fridays Note */}
    <section className="py-16 bg-background">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <FadeInUp>
          <span className="inline-block bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Monthly Event
          </span>
          <h2 className="text-3xl font-bold text-foreground mb-4">Latin Fridays at The Drayton Court</h2>
          <p className="text-muted-foreground mb-6">
            Once a month, the Drayton Court transforms into a full Latin party. Class + social dancing + guest DJs. Early bird tickets from £15.
          </p>
          <Link to="/events" className="text-primary hover:underline font-medium">See upcoming Latin Friday dates →</Link>
        </FadeInUp>
      </div>
    </section>

    {/* WIX SECTION: What to Wear */}
    <section className="py-12 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <FadeInUp>
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 flex flex-col md:flex-row items-start gap-5">
            <div className="bg-primary/10 p-3 rounded-lg shrink-0">
              <Shirt className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">What to wear</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Comfortable clothes you can move in. Clean shoes with a smooth sole make turns easier — avoid
                heavy-grip trainers. Layers are useful: the ballroom can warm up once everyone's dancing. Bring water.
              </p>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>

    {/* WIX SECTION: FAQ */}
    <section className="py-16 bg-muted/30">
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
          <h2 className="text-3xl font-bold text-foreground mb-4">See You on Tuesday</h2>
          <p className="text-muted-foreground mb-8">
            Free styling warm-up from 6:50pm. No booking. No partner. Just you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookingLink slug="tickettailor-puranights" fallbackHref="https://www.tickettailor.com/events/puranights" className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Book Now
            </BookingLink>
            <a {...waCustom("Hi Melitta, I'm interested in the Tuesday Ealing class at the Drayton Court. Is the beginner slot the best place to start?", "TheDraytonCourtEaling:295")} className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors">
              WhatsApp Melitta
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>

    <ProofBlock
      categories={["beginner", "community", "group"]}
      eyebrow="Tuesday Nights"
      title="What Ealing dancers say"
      limit={3}
    />

    <VenueGeoCard
      name="The Drayton Court Hotel, West Ealing"
      streetAddress="2 The Avenue"
      locality="West Ealing"
      postcode="W13 8PH"
      lat={51.5126}
      lng={-0.3232}
      telephone="+447449482343"
      directionsUrl="https://maps.google.com/?q=The+Drayton+Court+Hotel+2+The+Avenue+London+W13+8PH"
    />

    <LocalTransportBlock
      venueName="The Drayton Court Hotel"
      postcode="W13 8PH"
      rows={[
        { mode: "tube", label: "West Ealing (Elizabeth Line / GWR)", detail: "3-min walk via The Avenue. Fastest from Paddington & Canary Wharf.", time: "3 min" },
        { mode: "tube", label: "Ealing Broadway (Central / District)", detail: "10-min walk or 4-min bus 207 / 427.", time: "10 min" },
        { mode: "bus", label: "207, 427, 83, E1", detail: "Stops on Uxbridge Rd & The Avenue. Night bus N207.", time: "Door" },
        { mode: "car", label: "Drive & park", detail: "Free on-street from 6:30 PM. Private hotel car park for guests.", time: "After 6:30" },
        { mode: "cycle", label: "Cycle", detail: "Quiet residential route via Drayton Bridge Rd. Bike racks at venue.", time: "Door" },
        { mode: "access", label: "Step-free access", detail: "Side terrace entrance + lift to function room.", time: "—" },
      ]}
      parkingNote="Free on-street parking from 6:30 PM along The Avenue & nearby roads. Hotel guests use the on-site car park."
      accessibilityNote="Step-free side entrance. Lift to dance floor. Accessible WCs on each floor."
    />

    <NearMeGrid areas={EALING_NEAR} />

    <RelatedPages links={[
      { label: "Bachata Classes Ealing", to: "/bachata-classes-ealing" },
      { label: "Dance Classes Ealing", to: "/dance-classes-ealing" },
      { label: "Monday at The George IV", to: "/venue/the-george-iv-chiswick" },
      { label: "Full Schedule", to: "/schedule" },
      { label: "Prices & Bundles", to: "/prices" },
      { label: "Start Here", to: "/start-here" },
    ]} />
  </Layout>
);

export default TheDraytonCourtEaling;
