import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

const Terms = () => (
  <Layout>
    <SeoHead title="Terms & Conditions | Melitta Siomos Dance Academy" description="Terms and conditions for Melitta Siomos Dance Academy, Pura Nights classes, private lessons, and related services." path="/terms" />
    <section className="section-padding">
      <div className="container-main max-w-3xl">
        <h1 className="font-display text-4xl font-bold mb-8">Terms & Conditions</h1>
        <div className="prose max-w-none text-muted-foreground space-y-6 text-sm">
          <p><strong>Last updated:</strong> January 2025</p>

          <h2 className="font-display text-xl font-bold text-foreground">Class Bookings</h2>
          <p>Classes can be booked via Ticket Tailor or paid in cash at the door. Pre-booked tickets are non-refundable but may be transferred to another date within 30 days, subject to availability.</p>

          <h2 className="font-display text-xl font-bold text-foreground">Subscriptions & Packages</h2>
          <p>Monthly subscriptions (Bronze, Silver, Gold) are valid for one calendar month from date of purchase. Gold Unlimited can be cancelled with 7 days' written notice. Class credits do not roll over between months.</p>

          <h2 className="font-display text-xl font-bold text-foreground">Private Lessons</h2>
          <p>Private lesson cancellations require 48 hours' notice. Cancellations with less than 48 hours' notice may be charged in full. Packages are non-refundable but can be rescheduled.</p>

          <h2 className="font-display text-xl font-bold text-foreground">Wedding Dance Packages</h2>
          <p>Wedding dance packages are subject to a 50% deposit upon booking. The remaining balance is due before the final session. Cancellations after deposit are non-refundable.</p>

          <h2 className="font-display text-xl font-bold text-foreground">Gift Vouchers</h2>
          <p>Gift vouchers are valid for 12 months from purchase. They are non-refundable and cannot be exchanged for cash.</p>

          <h2 className="font-display text-xl font-bold text-foreground">Photography & Video</h2>
          <p>By attending our classes and events, you consent to photography and video recording which may be used for promotional purposes on our website and social media channels.</p>

          <h2 className="font-display text-xl font-bold text-foreground">Liability</h2>
          <p>Melitta Siomos Dance Academy is not liable for any injury sustained during classes or events. Participants dance at their own risk and should inform the instructor of any medical conditions.</p>

          <h2 className="font-display text-xl font-bold text-foreground">Contact</h2>
          <p>For queries about these terms, contact <a href="mailto:siomosmelitta@gmail.com" className="text-primary hover:underline">siomosmelitta@gmail.com</a>.</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default Terms;
