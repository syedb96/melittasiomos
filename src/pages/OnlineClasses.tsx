import { Navigate } from "react-router-dom";
import SeoHead from "@/components/SeoHead";

/* <!-- WIX PAGE: /online-classes (legacy 301 redirect) -->
   <!-- WIX: Configure host-level 301 redirect — Wix → Settings → SEO → URL Redirect Manager:
        From: /online-classes  →  To: /online-salsa-bachata-coaching  (Type: 301 Permanent)
   -->
   <!-- HOSTING NOTE: Lovable's static hosting does not support server-side 301s.
        We use a client-side <Navigate replace> + <link rel="canonical"> to the canonical URL,
        plus noindex,follow so the legacy URL is dropped from search and link equity flows
        through to /online-salsa-bachata-coaching. The sitemap excludes /online-classes. -->
*/
const OnlineClasses = () => (
  <>
    <SeoHead
      title="Online Salsa & Bachata Coaching — Pura Nights | Melitta Siomos"
      description="Online Salsa and Bachata coaching with Melitta Siomos. Personalised 1-to-1 video sessions. (Redirecting to canonical page.)"
      path="/online-salsa-bachata-coaching"
      noindex
    />
    <Navigate to="/online-salsa-bachata-coaching" replace />
  </>
);

export default OnlineClasses;
