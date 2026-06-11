import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import CookieConsent from "./CookieConsent";
import TrustTicker from "./TrustTicker";
import TonightBanner from "./TonightBanner";
import StickyMobileCTA from "./StickyMobileCTA";
import ExitIntentPopup from "./ExitIntentPopup";
import FreeTasterPill from "./FreeTasterPill";
import SmartCTABanner from "./SmartCTABanner";
import { waCustom } from "@/lib/whatsapp";

const WHATSAPP_QUESTION = waCustom("Hi Melitta, I have a question", "Layout:14").href;
const WHATSAPP_PRICING = waCustom("Hi Melitta, I have a question about pricing", "Layout:15").href;

const BANNERS: Record<string, React.ComponentProps<typeof SmartCTABanner>> = {
  "/pura-nights": {
    headline: "Ready to come this week?",
    sub: "Monday in Chiswick. Tuesday in Ealing. Drop in — no booking needed for weekly classes.",
    primaryLabel: "Claim free taster →", primaryHref: "/free-taster",
    secondaryLabel: "See all events →", secondaryHref: "/events", variant: "dark",
  },
  "/prices": {
    headline: "Not sure yet? Try us free first.",
    sub: "Claim a free taster class — no card, no commitment.",
    primaryLabel: "Book free taster →", primaryHref: "/free-taster",
    secondaryLabel: "Ask a question →", secondaryHref: WHATSAPP_PRICING, variant: "gold",
  },
  "/about": {
    headline: "Train with Melitta.",
    sub: "Come to a class, meet the team, see what makes Pura Nights different.",
    primaryLabel: "Claim free taster →", primaryHref: "/free-taster",
    secondaryLabel: "View team →", secondaryHref: "/about#team", variant: "dark",
  },
  "/faq": {
    headline: "Still have questions?",
    sub: "WhatsApp Melitta directly — usually replies same day.",
    primaryLabel: "WhatsApp us →", primaryHref: WHATSAPP_QUESTION,
    secondaryLabel: "Read start here →", secondaryHref: "/start-here", variant: "ivory",
  },
  "/blog": {
    headline: "Like what you're reading?",
    sub: "Come and dance it. First class free.",
    primaryLabel: "Claim free taster →", primaryHref: "/free-taster",
    secondaryLabel: "Browse classes →", secondaryHref: "/pura-nights", variant: "gold",
  },
};

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const banner = BANNERS[pathname];
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <TonightBanner />
      <TrustTicker />
      <main className="flex-1">{children}</main>
      {banner && <SmartCTABanner {...banner} />}
      <Footer />
      <WhatsAppButton />
      <StickyMobileCTA />
      <FreeTasterPill />
      <ExitIntentPopup />
      <CookieConsent />
    </div>
  );
};

export default Layout;
