/* <!-- WIX: PROTOTYPE ONLY — This settings page is a Lovable prototype for displaying account info.
   In Wix, site settings are managed via the Wix Dashboard. Do NOT replicate this page. --> */
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";

const SettingsAdmin = () => {
  const { user, role } = useAuth();

  return (
    <AdminLayout>
      <h1 className="font-display text-3xl font-bold mb-2">Settings</h1>
      <p className="text-muted-foreground text-sm font-heading mb-8">Account information and site configuration</p>

      <div className="max-w-2xl space-y-6">
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="font-heading font-semibold mb-4">Your Account</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span>{user?.email}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span>{user?.user_metadata?.full_name || "Not set"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Role</span><span className="text-primary font-heading font-semibold uppercase text-xs">{role}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Provider</span><span>{user?.app_metadata?.provider || "—"}</span></div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="font-heading font-semibold mb-4">Quick Links</h3>
          <div className="space-y-2 text-sm">
            <a href="/" className="block text-primary hover:underline font-heading">← Back to Public Website</a>
            <a href="https://www.tickettailor.com/events/puranights" target="_blank" rel="noopener noreferrer" className="block text-primary hover:underline font-heading">Linktree Booking Hub ↗</a>
            <a href="https://www.instagram.com/puranights.salsabachata/" target="_blank" rel="noopener noreferrer" className="block text-primary hover:underline font-heading">Instagram @puranights ↗</a>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="font-heading font-semibold mb-2">Contact Details (Reference)</h3>
          <p className="text-muted-foreground text-xs mb-3">These are displayed across the public website:</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>📞 07449 482 343</p>
            <p>📧 siomosmelitta@gmail.com</p>
            <p>📍 Mon: The George IV, W4 2DR</p>
            <p>📍 Tue: Drayton Court Hotel, W13 8PH</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsAdmin;
