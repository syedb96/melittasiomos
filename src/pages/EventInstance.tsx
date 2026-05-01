import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import RelatedPages from "@/components/RelatedPages";
import { FadeInUp } from "@/components/animations";
import NotFound from "./NotFound";
import { upcomingEvents, buildEventSchema } from "@/data/events";
/* <!-- WIX PAGE: /events/{slug} -->
   <!-- WIX SECTION: Single-event hero -->
   <!-- WIX SECTION: Event details + tickets -->
   <!-- WIX: Use Wix Events app for production; mirror schema fields below -->
*/

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

const EventInstance = () => {
  const { slug } = useParams<{ slug: string }>();
  const ev = upcomingEvents.find(e => e.slug === slug);
  if (!ev) return <NotFound />;

  const schema = buildEventSchema(ev);
  const title = `${ev.name} | Tickets & Info`;
  const description = `${ev.description} ${formatDate(ev.startDate)} at ${ev.venue.name}, ${ev.venue.postalCode}.`;

  return (
    <Layout>
      <SeoHead
        title={title}
        description={description}
        path={`/events/${ev.slug}`}
        schema={schema}
        ogImage={ev.image}
        noindex={ev.status === "EventCancelled"}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Events", path: "/events" },
          { name: ev.name, path: `/events/${ev.slug}` },
        ]}
      />

      {ev.status !== "EventScheduled" && (
        <div className="bg-primary text-primary-foreground text-center py-3 px-4 font-heading font-semibold text-sm">
          {ev.status === "EventCancelled" && "This event has been cancelled. Refunds will be processed automatically."}
          {ev.status === "EventPostponed" && `Postponed from ${ev.previousStartDate ? new Date(ev.previousStartDate).toLocaleDateString("en-GB", { day: "numeric", month: "long" }) : "the original date"} — new date confirmed above.`}
          {ev.status === "EventRescheduled" && `Rescheduled — please check the new date above.`}
        </div>
      )}

      <section className="section-padding section-dark text-center">
        <div className="container-main max-w-3xl">
          <FadeInUp>
            <p className="text-primary font-heading uppercase tracking-widest text-xs mb-3">Single Event</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">{ev.name}</h1>
            <p className="text-primary-foreground/70 text-lg">{ev.description}</p>
          </FadeInUp>
        </div>
      </section>

      <section className="section-padding bg-charcoal">
        <div className="container-main max-w-3xl">
          <div className="border-2 border-primary/40 rounded-2xl p-8 space-y-4 text-primary-foreground/80">
            <div className="flex items-center gap-3"><Calendar className="text-primary" size={18} /><span>{formatDate(ev.startDate)}</span></div>
            <div className="flex items-center gap-3"><Clock className="text-primary" size={18} /><span>Until {new Date(ev.endDate).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</span></div>
            <div className="flex items-start gap-3"><MapPin className="text-primary mt-1" size={18} /><span>{ev.venue.name}, {ev.venue.streetAddress}, {ev.venue.addressLocality} {ev.venue.postalCode}</span></div>
            <div className="flex items-center gap-3"><Ticket className="text-primary" size={18} /><span>From £{ev.price}</span></div>
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a href={ev.ticketUrl} target="_blank" rel="noopener noreferrer" className="btn-cta-primary">🎟 Get Tickets</a>
              <Link to="/events" className="btn-cta-ghost">All Latin Fridays</Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedPages title="Related" links={[
        { to: "/events", label: "All Events", desc: "Latin Friday calendar" },
        { to: "/pura-nights", label: "Weekly Classes", desc: "Mon Chiswick · Tue Ealing" },
        { to: "/pura-ladies", label: "Pura Ladies", desc: "Performance team" },
        { to: "/locations", label: "Venues", desc: "Directions" },
      ]} />
    </Layout>
  );
};

export default EventInstance;
