import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { getNextUpcomingEvent } from "@/data/events";

/**
 * NextEventCallout — small auto-updating strip that links the current page
 * to the nearest upcoming /events/:slug Latin Friday. Drop into blog posts
 * and class pages to create automated internal links to single-event pages.
 *
 * <!-- WIX SECTION: Next Event Callout — Wix Repeater filter: future date, sort asc, limit 1 -->
 */
const NextEventCallout = ({ context }: { context?: string }) => {
  const ev = getNextUpcomingEvent();
  if (!ev) return null;

  const dateLabel = new Date(ev.startDate).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long",
  });
  const statusBadge =
    ev.status === "EventPostponed" ? "Postponed — new date TBC" :
    ev.status === "EventRescheduled" ? "Rescheduled" :
    ev.soldOut ? "Sold out" : null;

  return (
    <aside className="my-8 border-l-4 border-primary bg-card rounded-r-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1">
        <p className="text-primary font-heading uppercase tracking-widest text-[10px] mb-1">
          {context || "Coming Up Next"}
        </p>
        <p className="font-heading font-bold text-foreground leading-tight">
          {ev.name}
        </p>
        <p className="text-muted-foreground text-sm mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-1"><Calendar size={12} /> {dateLabel}</span>
          <span className="inline-flex items-center gap-1"><MapPin size={12} /> {ev.venue.name}, {ev.venue.postalCode}</span>
          {statusBadge && <span className="text-primary font-semibold">· {statusBadge}</span>}
        </p>
      </div>
      <Link to={`/events/${ev.slug}`} className="btn-cta-primary text-sm whitespace-nowrap inline-flex items-center gap-2">
        View event <ArrowRight size={14} />
      </Link>
    </aside>
  );
};

export default NextEventCallout;
