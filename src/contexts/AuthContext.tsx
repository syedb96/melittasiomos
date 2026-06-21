import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import type { User, Session } from "@supabase/supabase-js";
import { logAudit } from "@/lib/audit";

type AppRole = "owner" | "admin" | "editor" | "viewer" | null;

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: AppRole;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  canEdit: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AppRole>(null);
  const [loading, setLoading] = useState(true);
  const loggedSignInFor = useRef<string | null>(null);

  const fetchRole = async (userId: string, attempt = 0) => {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle();
    const r = (data?.role as AppRole) ?? null;
    if (!r && attempt < 5) {
      setTimeout(() => fetchRole(userId, attempt + 1), 600);
      return;
    }
    setRole(r);
  };

  const recordSignIn = (u: User) => {
    if (loggedSignInFor.current === u.id) return;
    loggedSignInFor.current = u.id;
    logAudit({
      action: "sign_in",
      entity_type: "auth",
      entity_id: u.id,
      entity_label: u.email ?? undefined,
      metadata: {
        provider: (u.app_metadata as { provider?: string } | undefined)?.provider ?? "email",
      },
    });
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        fetchRole(s.user.id);
        recordSignIn(s.user);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        fetchRole(s.user.id);
        if (event === "SIGNED_IN") recordSignIn(s.user);
      } else {
        setRole(null);
        loggedSignInFor.current = null;
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/admin`,
    });
  };

  const signInWithApple = async () => {
    await lovable.auth.signInWithOAuth("apple", {
      redirect_uri: `${window.location.origin}/admin`,
    });
  };

  const signOut = async () => {
    // Best-effort audit log BEFORE we tear down the session — RLS needs auth.uid().
    if (user) {
      await logAudit({
        action: "sign_out",
        entity_type: "auth",
        entity_id: user.id,
        entity_label: user.email ?? undefined,
      });
    }
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRole(null);
    loggedSignInFor.current = null;
  };

  const isAdmin = role === "owner" || role === "admin";
  const canEdit = role === "owner" || role === "admin" || role === "editor";

  return (
    <AuthContext.Provider
      value={{ user, session, role, loading, signInWithGoogle, signInWithApple, signOut, isAdmin, canEdit }}
    >
      {children}
    </AuthContext.Provider>
  );
};

