import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createClient } from "@/lib/supabase/client";
import type { User, AuthError } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

export type UserProfile = Database["public"]["Tables"]["usuario"]["Row"];

interface AuthState {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isLoadingProfile: boolean;
  isAdmin: boolean;
  mustChangePassword: boolean;

  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null; user: UserProfile | null }>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => Promise<void>;
  refreshUserProfile: () => Promise<{ profile: UserProfile | null }>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      userProfile: null,
      isLoading: true,
      isAuthenticated: false,
      isLoadingProfile: false,
      isAdmin: false,
      mustChangePassword: false,

      setUser: (user: User | null) => {
        if (!user) {
          set({
            user: null,
            userProfile: null,
            isAuthenticated: false,
            isAdmin: false,
            mustChangePassword: false,
            isLoading: false,
          });
        } else {
          set({ user });
        }
      },

      setUserProfile: (profile: UserProfile | null) => {
        set({
          userProfile: profile,
          isAdmin: profile?.role === "admin",
          mustChangePassword: profile?.must_change_password === true,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      signIn: async (email: string, password: string) => {
        const supabase = createClient();
        set({ isLoading: true });

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            set({ isLoading: false });
            return { error, user: null };
          }

          if (data.user) {
            // Use getUser() to securely validate the authenticated user
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            
            if (userError || !user) {
              console.error("❌ User validation failed after signIn:", userError);
              set({ isLoading: false });
              return { error: userError, user: null };
            }

            set({
              user: user,
              isLoading: true,
            });

            const userProfile = await get().refreshUserProfile();

            set((state) => ({
              ...state,
              isAuthenticated: true,
              isLoading: false,
            }));

            if (userProfile.profile && userProfile.profile.verified === true) {
              return { error: null, user: userProfile.profile };
            } else {
              set({ isAuthenticated: false, isLoading: false });
              await supabase.auth.signOut();
              return { error: null, user: null };
            }
          }

          return { error: null, user: null };
        } catch (error) {
          set({ isLoading: false });
          return { error: error as AuthError, user: null };
        }
      },

      signOut: async () => {
        const supabase = createClient();
        set({ isLoading: true });

        try {
          // Verify the client has proper configuration
          const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
          const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
          
          if (!url || !key) {
            console.error("❌ Missing Supabase configuration");
            throw new Error("Supabase configuration missing");
          }

          // Always attempt signOut with scope=local to avoid global logout issues
          const { error } = await supabase.auth.signOut({ scope: 'local' });
          
          if (error) {
            console.warn("⚠️ Error during signOut (but continuing cleanup):", error.message);
          } else {
            console.log("✅ Sesión cerrada correctamente");
          }
        } catch (error: any) {
          // Handle specific auth errors gracefully
          if (error?.name === "AuthSessionMissingError" || 
              error?.message?.includes("session missing") ||
              error?.message?.includes("session_not_found") ||
              error?.message?.includes("No API key found")) {
            console.log("ℹ️ Session issue detected, proceeding with cleanup:", error?.message);
          } else {
            console.warn("⚠️ Unexpected error during signOut:", error);
          }
        }

        // Always clear state regardless of signOut success/failure
        set({
          user: null,
          userProfile: null,
          isAuthenticated: false,
          isAdmin: false,
          mustChangePassword: false,
          isLoading: false,
        });

        // Clear localStorage to ensure no stale data
        try {
          localStorage.removeItem("auth-storage");
          
          // Clear Supabase auth tokens
          const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
          if (supabaseUrl) {
            const domain = supabaseUrl.split("://")[1];
            localStorage.removeItem(`sb-${domain}-auth-token`);
          }
          
          // Clear any other potential Supabase storage keys
          Object.keys(localStorage).forEach(key => {
            if (key.startsWith("sb-") && key.includes("auth")) {
              localStorage.removeItem(key);
            }
          });
        } catch (error) {
          console.warn("⚠️ Could not clear localStorage:", error);
        }

        // Only redirect if not being called from response interceptor
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/api/')) {
          window.location.href = "/login";
        }
      },
      refreshUserProfile: async () => {
        const { user, isLoadingProfile } = get();
        if (!user || isLoadingProfile) return { profile: null };

        set({ isLoadingProfile: true });
        const supabase = createClient();

        try {
          const { data: profile, error } = await supabase
            .from("usuario")
            .select("*")
            .eq("auth_id", user.id)
            .single();

          if (error) {
            console.error("Error fetching user profile:", error);
            return { profile: null };
          }

          get().setUserProfile(profile);
          set((state) => ({ ...state, isLoadingProfile: false }));
          return { profile };
        } catch (error) {
          console.error("Error refreshing user profile:", error);
          return { profile: null };
        }
      },

      initialize: async () => {
        const supabase = createClient();
        set({ isLoading: true });

        try {
          // Clear any stale persisted state first
          const persistedState = get();
          if (persistedState.user && !persistedState.isAuthenticated) {
            console.log("🧹 Clearing stale auth state");
            get().setUser(null);
          }

          const {
            data: { session },
            error: sessionError,
          } = await supabase.auth.getSession();

          if (sessionError) {
            console.error("❌ Session error:", sessionError);
            get().setUser(null);
            return;
          }

          if (session) {
            // Always use getUser() to securely validate the session
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            
            if (userError || !user) {
              console.warn("⚠️ Session validation failed, clearing session:", userError?.message);
              await supabase.auth.signOut();
              get().setUser(null);
              return;
            }

            set({ user: user, isLoading: true });
            const profileResult = await get().refreshUserProfile();

            if (profileResult.profile?.verified === true) {
              set((state) => ({
                ...state,
                isAuthenticated: true,
                isLoading: false,
              }));
            } else {
              console.warn("⚠️ User profile not verified, signing out");
              await supabase.auth.signOut();
              get().setUser(null);
            }
          } else {
            get().setUser(null);
          }

          supabase.auth.onAuthStateChange(async (event, session) => {
            console.log("🔄 Auth state change:", event);
            
            if (event === "SIGNED_OUT" || (event === "TOKEN_REFRESHED" && !session)) {
              console.log("User signed out, clearing state");
              get().setUser(null);
            } else if (event === "SIGNED_IN" && session) {
              // Use getUser() to securely validate the user on sign in
              const { data: { user }, error: userError } = await supabase.auth.getUser();
              
              if (userError || !user) {
                console.warn("⚠️ User validation failed on SIGNED_IN:", userError?.message);
                get().setUser(null);
                return;
              }
              
              set({ user: user });
              await get().refreshUserProfile();
            } else if (event === "TOKEN_REFRESHED" && session) {
              // Use getUser() to securely validate the user on token refresh
              const { data: { user }, error: userError } = await supabase.auth.getUser();
              
              if (userError || !user) {
                console.warn("⚠️ User validation failed on TOKEN_REFRESHED:", userError?.message);
                get().setUser(null);
                return;
              }
              
              set({ user: user });
            }
          });
        } catch (error) {
          console.error("Error initializing auth:", error);
          get().setUser(null);
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        userProfile: state.userProfile,
        isAdmin: state.isAdmin,
        mustChangePassword: state.mustChangePassword,
      }),
      // Add version for state migration if needed
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version < 1) {
          // Clear old auth state to force re-authentication
          return {
            userProfile: null,
            isAdmin: false,
            mustChangePassword: false,
          };
        }
        return persistedState;
      },
    }
  )
);