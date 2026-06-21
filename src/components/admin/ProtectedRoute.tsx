/* <!-- WIX: PROTOTYPE ONLY — Lovable role-based route guard. In Wix, use Members Area roles. --> */
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  children: ReactNode;
  requireAdmin?: boolean;
}

const Centred = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex items-center justify-center bg-background px-4">
    <div className="text-center max-w-md">{children}</div>
  </div>
);

const Spinner = () => (
  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
);

const ProtectedRoute = ({ children, requireAdmin = false }: Props) => {
  const { user, status, role, profileError, retryProfile, signOut } = useAuth();

  // 1) Session not resolved yet, or profile request still in flight → spinner
  if (status === "loadingSession" || status === "loadingProfile") {
    return (
      <Centred>
        <Spinner />
        <p className="text-muted-foreground text-sm font-heading">
          {status === "loadingSession" ? "Loading session…" : "Verifying admin profile…"}
        </p>
      </Centred>
    );
  }

  // 2) No session → bounce to login
  if (status === "unauthenticated" || !user) {
    return <Navigate to="/login" replace />;
  }

  // 3) Profile fetch / provisioning hit a hard error → distinguish from "denied"
  if (status === "provisioningError") {
    return (
      <Centred>
        <h1 className="font-display text-2xl font-bold mb-3">We couldn't verify your admin profile</h1>
        <p className="text-muted-foreground text-sm mb-2">
          You're signed in as <span className="font-medium text-foreground">{user.email}</span>, but we hit a problem confirming your access.
        </p>
        {profileError && (
          <p className="text-xs text-muted-foreground/70 mb-6 font-mono">{profileError}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={retryProfile} className="btn-cta-primary text-sm">Try again</button>
          <button onClick={signOut} className="border border-border text-foreground px-6 py-2 rounded-lg text-sm hover:bg-muted">Sign out</button>
          <a href="/" className="border border-border text-foreground px-6 py-2 rounded-lg text-sm hover:bg-muted">Return to website</a>
        </div>
      </Centred>
    );
  }

  // 4) Definitively not privileged
  const allowed = requireAdmin
    ? (status === "authorised" && (role === "owner" || role === "admin"))
    : status === "authorised";

  if (!allowed) {
    return (
      <Centred>
        <h1 className="font-display text-2xl font-bold mb-3">Access Not Granted</h1>
        <p className="text-muted-foreground text-sm mb-2">
          You're signed in as <span className="font-medium text-foreground">{user.email}</span>.
        </p>
        <p className="text-muted-foreground text-sm mb-6">
          {requireAdmin
            ? "This area is reserved for site administrators."
            : "Your account does not have content editing permissions yet."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={retryProfile} className="btn-cta-primary text-sm">Try account check again</button>
          <button onClick={signOut} className="border border-border text-foreground px-6 py-2 rounded-lg text-sm hover:bg-muted">Sign out</button>
          <a href="/" className="border border-border text-foreground px-6 py-2 rounded-lg text-sm hover:bg-muted">Return to website</a>
        </div>
      </Centred>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
