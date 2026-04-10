import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: Props) => {
  const { user, role, loading, isAdmin, canEdit } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm font-heading">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <h1 className="font-display text-2xl font-bold mb-3">Access Not Granted</h1>
          <p className="text-muted-foreground text-sm mb-6">Your account does not have admin access. Contact puranights@gmail.com if you believe this is an error.</p>
          <a href="/" className="btn-cta-primary text-sm">Return to Website</a>
        </div>
      </div>
    );
  }

  if (!canEdit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <h1 className="font-display text-2xl font-bold mb-3">Access Not Granted</h1>
          <p className="text-muted-foreground text-sm mb-6">Your account doesn't have content editing permissions yet.</p>
          <a href="/" className="btn-cta-primary text-sm">Return to Website</a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
