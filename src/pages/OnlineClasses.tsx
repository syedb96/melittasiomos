import { Navigate } from "react-router-dom";

/* <!-- WIX PAGE: /online-classes (legacy 301 redirect) -->
   <!-- WIX: Configure host-level 301 to /online-salsa-bachata-coaching -->
   Client-side fallback for SPA — replaces history entry so Back button works.
*/
const OnlineClasses = () => <Navigate to="/online-salsa-bachata-coaching" replace />;

export default OnlineClasses;
