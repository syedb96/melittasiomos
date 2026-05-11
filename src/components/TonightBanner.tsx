import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";

/* <!-- WIX SECTION: Tonight's Class Status Banner -->
   <!-- WIX: Replicate via Wix Velo (Corvid) custom code element. The logic below is
        a tiny day-of-week + time-of-day check — easily reproduced in JS in Wix.
        Schedule (London time):
          Monday    19:30  →  The George IV, Chiswick (W4 2DR)
          Tuesday   18:50  →  Drayton Court Hotel, Ealing (W13 8PH)
        Outside class hours, show the next upcoming class.
   -->
*/

type Status = {
  live: boolean;
  label: string;
  venue: string;
  postcode: string;
  link: string;
  time: string;
};

function computeStatus(now: Date): Status {
  // Convert to Europe/London regardless of viewer TZ
  const london = new Date(now.toLocaleString("en-GB", { timeZone: "Europe/London" }));
  const day = london.getDay(); // 0=Sun..6=Sat
  const minutes = london.getHours() * 60 + london.getMinutes();

  const MON_START = 19 * 60 + 0;
  const MON_END = 21 * 60 + 30;
  const TUE_START = 18 * 60 + 30;
  const TUE_END = 21 * 60 + 30;

  if (day === 1 && minutes >= MON_START && minutes <= MON_END) {
    return { live: true, label: "Tonight — Chiswick", venue: "The George IV", postcode: "W4 2DR", link: "/venue/the-george-iv-chiswick", time: "19:30" };
  }
  if (day === 2 && minutes >= TUE_START && minutes <= TUE_END) {
    return { live: true, label: "Tonight — Ealing", venue: "Drayton Court Hotel", postcode: "W13 8PH", link: "/venue/the-drayton-court-ealing", time: "18:50" };
  }

  // Otherwise: show the next class
  if (day === 1 && minutes < MON_START) {
    return { live: false, label: "Tonight in Chiswick", venue: "The George IV", postcode: "W4 2DR", link: "/venue/the-george-iv-chiswick", time: "Mon 19:30" };
  }
  if (day === 2 && minutes < TUE_START) {
    return { live: false, label: "Tonight in Ealing", venue: "Drayton Court Hotel", postcode: "W13 8PH", link: "/venue/the-drayton-court-ealing", time: "Tue 18:50" };
  }
  // Default: next Monday in Chiswick
  if (day <= 1) {
    return { live: false, label: "Next class — Chiswick", venue: "The George IV", postcode: "W4 2DR", link: "/venue/the-george-iv-chiswick", time: "Mon 19:30" };
  }
  if (day === 2) {
    // Tuesday after class: next is Mon
    return { live: false, label: "Next class — Chiswick", venue: "The George IV", postcode: "W4 2DR", link: "/venue/the-george-iv-chiswick", time: "Mon 19:30" };
  }
  // Wed–Sat: next is Monday
  return { live: false, label: "Next class — Chiswick", venue: "The George IV", postcode: "W4 2DR", link: "/venue/the-george-iv-chiswick", time: "Mon 19:30" };
}

const TonightBanner = () => {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(computeStatus(new Date()));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) return null;

  return (
    <Link
      to={status.link}
      className={`block w-full text-[12px] md:text-[13px] font-accent tracking-wide transition-colors ${
        status.live
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "bg-charcoal text-primary-foreground/90 hover:text-primary-foreground border-b border-primary/20"
      }`}
      aria-label={`${status.label} at ${status.venue}, ${status.postcode}`}
    >
      <div className="container-main flex items-center justify-center gap-2 md:gap-3 py-2 px-4 text-center flex-wrap">
        {status.live && (
          <span className="inline-flex items-center gap-1.5 font-semibold uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
            </span>
            Live now
          </span>
        )}
        <span className="font-semibold">{status.label}</span>
        <span className="opacity-60 hidden sm:inline">·</span>
        <span className="inline-flex items-center gap-1"><MapPin size={12} /> {status.venue}, {status.postcode}</span>
        <span className="opacity-60 hidden sm:inline">·</span>
        <span className="inline-flex items-center gap-1"><Clock size={12} /> {status.time}</span>
        <span className="underline underline-offset-4 decoration-primary/60 ml-1">Get directions →</span>
      </div>
    </Link>
  );
};

export default TonightBanner;
