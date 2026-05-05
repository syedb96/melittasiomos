import { Navigate } from "react-router-dom";
import SeoHead from "@/components/SeoHead";

/* <!-- WIX PAGE: /salsa-classes-acton-local (legacy 301 redirect) -->
   <!-- WIX: Settings → SEO → URL Redirect Manager:
        From: /salsa-classes-acton-local  →  To: /salsa-classes-acton  (Type: 301 Permanent)
   -->
   <!-- HOSTING NOTE: Lovable static hosting cannot do server 301s.
        Client-side <Navigate replace> + canonical to /salsa-classes-acton + noindex.
        Sitemap excludes /salsa-classes-acton-local. Decided in docs/27 to dedupe Acton intent
        on the canonical /salsa-classes-acton page. -->
*/
const SalsaClassesActonLocal = () => (
  <>
    <SeoHead
      title="Salsa Classes Near Acton | Pura Nights"
      description="Salsa classes near Acton — see our canonical Acton page for venue, schedule and pricing."
      path="/salsa-classes-acton"
      noindex
    />
    <Navigate to="/salsa-classes-acton" replace />
  </>
);

export default SalsaClassesActonLocal;
