import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import type { User, Session } from "@supabase/supabase-js";

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

  const fetchRole = async (userId: string, attempt = 0) => {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle();
    const r = (data?.role as AppRole) ?? null;
    // Retry on first sign-up: handle_new_user trigger may not have inserted
    // the profile row yet when onAuthStateChange fires.
    if (!r && attempt < 5) {
      setTimeout(() => fetchRole(userId, attempt + 1), 600);
      return;
    }
    setRole(r);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) fetchRole(s.user.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) fetchRole(s.user.id);
      else setRole(null);
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
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRole(null);
  };

  const isAdmin = role === "owner" || role === "admin";
  const canEdit = role === "owner" || role === "admin" || role === "editor";

  return (
    <AuthContext.Provider value={{ user, session, role, loading, signInWithGoogle, signInWithApple, signOut, isAdmin, canEdit }}>
      {children}
    </AuthContext.Provider>
  );
};
