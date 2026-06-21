import { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import type { User, Session } from "@supabase/supabase-js";
import { logAudit } from "@/lib/audit";

export type AppRole = "owner" | "admin" | "editor" | "viewer" | null;

/**
 * Auth status discriminator — protected routes branch on this rather than
 * inspecting flags individually, so we never show "Access Not Granted" while
 * the profile request is still in flight.
 */
export type AuthStatus =
  | "loadingSession"
  | "unauthenticated"
  | "loadingProfile"
  | "provisioningError"
  | "authorised"     // signed in + privileged role resolved
  | "unauthorised";  // signed in + role resolved but not privileged

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: AppRole;
  status: AuthStatus;
  loading: boolean;            // legacy: true while session OR profile is loading
  profileError: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  retryProfile: () => Promise<void>;
  isOwner: boolean;
  isAdmin: boolean;
  canEdit: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

const PRIVILEGED_ROLES: AppRole[] = ["owner", "admin"];
const EDITOR_ROLES: AppRole[] = ["owner", "admin", "editor"];

const debug = (...args: unknown[]) => {
  if (import.meta.env.DEV) console.debug("[auth]", ...args);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AppRole>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const loggedSignInFor = useRef<string | null>(null);
  const profileRequestSeq = useRef(0);

  /**
   * Resolve the signed-in user's role via:
   *   1. profiles row read
   *   2. if missing → server-side provision_my_profile() RPC (idempotent, uses approved_admin_emails)
   *   3. profiles row re-read
   *
   * Bounded retry (~6s wall clock) handles the brief window where the
   * handle_new_user trigger has not yet committed the row.
   */
  const resolveProfile = useCallback(async (u: User) => {
    const seq = ++profileRequestSeq.current;
    setLoadingProfile(true);
    setProfileError(null);

    const readRole = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("role, email")
        .eq("user_id", u.id)
        .maybeSingle();
      if (error && error.code !== "PGRST116") throw error;
      return (data?.role as AppRole) ?? null;
    };

    try {
      // 1) initial read with short retry loop in case the trigger is still mid-commit
      let resolved: AppRole = null;
      for (let attempt = 0; attempt < 4; attempt++) {
        resolved = await readRole();
        if (resolved) break;
        await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
      }

      // 2) still missing → ask the server to provision based on approved_admin_emails
      if (!resolved) {
        debug("profile missing, calling provision_my_profile()", { uid: u.id, email: u.email });
        const { data: rpcRole, error: rpcErr } = await supabase.rpc("provision_my_profile");
        if (rpcErr) throw rpcErr;
        resolved = (rpcRole as AppRole) ?? null;
        // 3) re-read to confirm RLS-visible row
        if (resolved) {
          const reread = await readRole();
          resolved = reread ?? resolved;
        }
      }

      if (seq !== profileRequestSeq.current) return; // a newer request superseded us
      debug("profile resolved", { uid: u.id, email: u.email, role: resolved });
      setRole(resolved);
    } catch (e) {
      if (seq !== profileRequestSeq.current) return;
      const msg = (e as Error).message ?? "Unknown profile error";
      debug("profile error", msg);
      setProfileError(msg);
      setRole(null);
    } finally {
      if (seq === profileRequestSeq.current) setLoadingProfile(false);
    }
  }, []);

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
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!mounted) return;
      setSession(s);
      setUser(s?.user ?? null);
      setLoadingSession(false);
      if (s?.user) {
        resolveProfile(s.user);
        recordSignIn(s.user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, s) => {
      if (!mounted) return;
      setSession(s);
      setUser(s?.user ?? null);
      setLoadingSession(false);
      if (s?.user) {
        // Fire-and-forget; resolveProfile manages its own loading state.
        resolveProfile(s.user);
        if (event === "SIGNED_IN") recordSignIn(s.user);
      } else {
        setRole(null);
        setProfileError(null);
        loggedSignInFor.current = null;
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [resolveProfile]);

  const signInWithGoogle = async () => {
    await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/admin` });
  };

  const signInWithApple = async () => {
    await lovable.auth.signInWithOAuth("apple", { redirect_uri: `${window.location.origin}/admin` });
  };

  const signOut = async () => {
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
    setProfileError(null);
    loggedSignInFor.current = null;
  };

  const retryProfile = useCallback(async () => {
    if (user) await resolveProfile(user);
  }, [user, resolveProfile]);

  const isOwner = role === "owner";
  const isAdmin = PRIVILEGED_ROLES.includes(role);
  const canEdit = EDITOR_ROLES.includes(role);

  let status: AuthStatus = "loadingSession";
  if (!loadingSession) {
    if (!user) status = "unauthenticated";
    else if (loadingProfile) status = "loadingProfile";
    else if (profileError) status = "provisioningError";
    else if (isAdmin || canEdit) status = "authorised";
    else status = "unauthorised";
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        role,
        status,
        loading: loadingSession || loadingProfile,
        profileError,
        signInWithGoogle,
        signInWithApple,
        signOut,
        retryProfile,
        isOwner,
        isAdmin,
        canEdit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
