import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

/* <!-- WIX: Replace with Wix Forms or Mailchimp embed connected to the Pura Nights audience --> */
const NewsletterSignup = ({ compact = false }: { compact?: boolean }) => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — real Mailchimp endpoint goes here
    if (email.includes("@")) setDone(true);
  };

  return (
    <div className={`not-prose ${compact ? "my-6" : "my-10"} bg-charcoal text-primary-foreground rounded-2xl p-6 md:p-8`}>
      {done ? (
        <div className="text-center">
          <CheckCircle2 size={28} className="text-primary mx-auto mb-2" />
          <p className="font-display text-lg font-bold">You're in!</p>
          <p className="text-primary-foreground/60 text-xs font-heading mt-1">Look out for weekly Latin dance tips in your inbox.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-2">
            <Mail size={16} className="text-primary" />
            <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-primary">Newsletter</p>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-bold mb-2">Get Weekly Latin Dance Tips</h3>
          <p className="text-primary-foreground/60 text-sm font-heading mb-4">Join 1,000+ subscribers. Class updates, technique tips, and Latin Friday dates. No spam, ever.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-charcoal-light border border-primary-foreground/15 rounded-lg px-4 py-2.5 text-sm font-heading text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-primary"
            />
            <button type="submit" className="btn-cta-primary text-sm whitespace-nowrap">Subscribe →</button>
          </form>
        </>
      )}
    </div>
  );
};

export default NewsletterSignup;
