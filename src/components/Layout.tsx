import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import CookieConsent from "./CookieConsent";
import TrustTicker from "./TrustTicker";
import TonightBanner from "./TonightBanner";
import StickyMobileCTA from "./StickyMobileCTA";
import ExitIntentPopup from "./ExitIntentPopup";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <TonightBanner />
    <TrustTicker />
    <main className="flex-1">{children}</main>
    <Footer />
    <WhatsAppButton />
    <StickyMobileCTA />
    <ExitIntentPopup />
    <CookieConsent />
  </div>
);

export default Layout;
