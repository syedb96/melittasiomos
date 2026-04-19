import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

/* <!-- WIX PAGE: /cookie-policy -->
   <!-- WIX: Use Wix Cookie Policy generator or paste custom policy text -->
*/
const CookiePolicy = () => (
  <Layout>
    <SeoHead title="Cookie Policy | Melitta Siomos Dance Academy" description="How Pura Nights and Melitta Siomos Dance Academy use cookies, and how you can manage or disable them." path="/cookie-policy" />
    <section className="section-padding">
      <div className="container-main max-w-3xl">
        <h1 className="font-display text-4xl font-bold mb-8">Cookie Policy</h1>
        <div className="prose max-w-none text-muted-foreground space-y-6 text-sm">
          <p><strong>Last updated:</strong> April 2026</p>
          <p>This Cookie Policy explains how Melitta Siomos Dance Academy ("we", "us", "our") uses cookies and similar technologies on puranights.com.</p>

          <h2 className="font-display text-xl font-bold text-foreground">What Are Cookies?</h2>
          <p>Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences and understand how visitors interact with content.</p>

          <h2 className="font-display text-xl font-bold text-foreground">Cookies We Use</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Essential cookies</strong> — required for the site to function (page navigation, secure areas, cookie consent state). These cannot be disabled.</li>
            <li><strong>Analytics cookies (Google Analytics)</strong> — anonymously measure traffic, page views, and how visitors find our site so we can improve it.</li>
            <li><strong>Third-party cookies</strong> — set by embedded services such as Ticket Tailor (bookings), YouTube (video embeds), Instagram (gallery embeds), and Mailchimp (newsletter sign-ups). These are governed by the respective providers' policies.</li>
          </ul>

          <h2 className="font-display text-xl font-bold text-foreground">Managing Cookies</h2>
          <p>You can accept or decline non-essential cookies via the cookie banner shown on your first visit. You can also disable cookies entirely in your browser settings — guides for Chrome, Safari, Firefox and Edge are available in each browser's help centre. Disabling essential cookies may affect site functionality.</p>

          <h2 className="font-display text-xl font-bold text-foreground">Opt Out of Google Analytics</h2>
          <p>To opt out of Google Analytics across all sites, install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-out Browser Add-on</a>.</p>

          <h2 className="font-display text-xl font-bold text-foreground">Contact</h2>
          <p>For cookie-related queries, email <a href="mailto:siomosmelitta@gmail.com" className="text-primary hover:underline">siomosmelitta@gmail.com</a>.</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default CookiePolicy;
