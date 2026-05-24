import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, MessageCircle, Send } from "lucide-react";

/* <!-- WIX SECTION: Voucher Enquiry Form — Wix Forms (CRM tag: gift-vouchers).
     On Wix this becomes a Wix Form posting to the "Gift Vouchers" CRM tag and
     also triggering a Wix Stores / Gift Cards product link if the buyer
     prefers self-checkout. Keep WhatsApp + email links as fallbacks. -->
*/

const PHONE = "447449482343";
const EMAIL = "siomosmelitta@gmail.com";

// Wix Stores Gift Cards URL — set once Wix Stores Gift Cards is live.
// Reads from VITE_WIX_GIFT_CARDS_URL so it's swappable per environment.
const WIX_GIFT_CARDS_URL = (import.meta.env.VITE_WIX_GIFT_CARDS_URL as string | undefined) || "";

const schema = z.object({
  buyer_name: z.string().trim().min(1, "Your name is required").max(120),
  buyer_email: z.string().trim().email("Enter a valid email").max(255),
  recipient_name: z.string().trim().max(120).optional(),
  amount: z.coerce.number().int().min(25).max(2000),
  occasion: z.string().trim().max(80).optional(),
  message: z.string().trim().max(1000).optional(),
  // Honeypot
  website: z.string().max(0).optional(),
});

interface Props {
  defaultAmount?: number;
}

const VoucherEnquiryForm = ({ defaultAmount = 75 }: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const startedAt = useState(() => Date.now())[0];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      buyer_name: String(form.get("buyer_name") || ""),
      buyer_email: String(form.get("buyer_email") || ""),
      recipient_name: String(form.get("recipient_name") || ""),
      amount: Number(form.get("amount") || defaultAmount),
      occasion: String(form.get("occasion") || ""),
      message: String(form.get("message") || ""),
      website: String(form.get("website") || ""),
    };

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || "Please check the form");
      return;
    }

    // Bot traps: honeypot + sub-2-second submission silently succeed.
    if (parsed.data.website || Date.now() - startedAt < 2000) {
      setDone(true);
      return;
    }

    setSubmitting(true);
    try {
      const composedMessage =
        `Gift Voucher Enquiry — £${parsed.data.amount}\n` +
        `Buyer: ${parsed.data.buyer_name} <${parsed.data.buyer_email}>\n` +
        `Recipient: ${parsed.data.recipient_name || "(not specified)"}\n` +
        `Occasion: ${parsed.data.occasion || "(not specified)"}\n\n` +
        `Personal note:\n${parsed.data.message || "(none)"}`;

      const { error } = await supabase.from("enquiries").insert({
        name: parsed.data.buyer_name,
        email: parsed.data.buyer_email,
        subject: "Gift Vouchers",
        message: composedMessage,
        source_page: "/gift-vouchers",
      });
      if (error) throw error;
      setDone(true);
      toast.success("Thanks — Melitta will email your eGift card within 24h.");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please WhatsApp Melitta instead.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="bg-card rounded-2xl p-8 border border-border text-center">
        <div className="w-12 h-12 rounded-full bg-primary/15 text-primary flex items-center justify-center mx-auto mb-4">
          <Send size={20} />
        </div>
        <h3 className="font-display text-2xl font-bold mb-2">Enquiry received</h3>
        <p className="text-muted-foreground font-heading text-sm mb-5 max-w-md mx-auto">
          Melitta will email a payment link and confirm delivery within 24 hours. Vouchers usually go out the same evening.
        </p>
        {WIX_GIFT_CARDS_URL && (
          <a
            href={WIX_GIFT_CARDS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-primary text-sm inline-flex items-center gap-2"
          >
            Or buy instantly via Wix Gift Cards
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-card rounded-2xl p-6 md:p-8 border border-border space-y-4">
      <div>
        <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-2">Premium Voucher Enquiry</p>
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-1">Order an eGift card</h3>
        <p className="text-muted-foreground text-sm font-heading">Sent to your inbox within 24h. Personalised with your message.</p>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] w-px h-px opacity-0"
        aria-hidden="true"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-sm">
          <span className="font-heading font-semibold text-xs uppercase tracking-wider text-muted-foreground">Your name</span>
          <input name="buyer_name" required maxLength={120} className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
        </label>
        <label className="block text-sm">
          <span className="font-heading font-semibold text-xs uppercase tracking-wider text-muted-foreground">Your email</span>
          <input name="buyer_email" type="email" required maxLength={255} className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
        </label>
        <label className="block text-sm">
          <span className="font-heading font-semibold text-xs uppercase tracking-wider text-muted-foreground">Amount (£)</span>
          <input name="amount" type="number" min={25} max={2000} step={5} defaultValue={defaultAmount} required className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
        </label>
        <label className="block text-sm">
          <span className="font-heading font-semibold text-xs uppercase tracking-wider text-muted-foreground">Occasion (optional)</span>
          <input name="occasion" maxLength={80} placeholder="Birthday, anniversary, wedding…" className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
        </label>
      </div>

      <label className="block text-sm">
        <span className="font-heading font-semibold text-xs uppercase tracking-wider text-muted-foreground">Recipient name (optional)</span>
        <input name="recipient_name" maxLength={120} className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
      </label>

      <label className="block text-sm">
        <span className="font-heading font-semibold text-xs uppercase tracking-wider text-muted-foreground">Personal message on the card (optional)</span>
        <textarea name="message" maxLength={1000} rows={3} className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
      </label>

      <div className="flex flex-wrap gap-3 pt-2">
        <button type="submit" disabled={submitting} className="btn-cta-primary text-sm inline-flex items-center gap-2 disabled:opacity-60">
          <Send size={14} /> {submitting ? "Sending…" : "Send voucher enquiry"}
        </button>
        {WIX_GIFT_CARDS_URL && (
          <a href={WIX_GIFT_CARDS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-primary text-sm font-heading font-semibold">
            Buy instantly via Wix Gift Cards
          </a>
        )}
        <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-primary text-sm font-heading">
          <MessageCircle size={14} /> WhatsApp
        </a>
        <a href={`mailto:${EMAIL}?subject=Gift%20Voucher%20Enquiry`} className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-primary text-sm font-heading">
          <Mail size={14} /> Email
        </a>
      </div>

      <p className="text-[11px] text-muted-foreground font-heading">
        We email you a Stripe payment link or bank-transfer details. Your eGift card is delivered the same evening once payment clears.
      </p>
    </form>
  );
};

export default VoucherEnquiryForm;
