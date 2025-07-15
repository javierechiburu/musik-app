import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createClient } from "@/lib/supabase/client";
import type { User, AuthError } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

export type UserProfile = Database["public"]["Tables"]["usuario"]["Row"];

interface AuthState {
  // Core state
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isLoadingProfile: boolean;

  // Computed properties
  isAdmin: boolean;
  mustChangePassword: boolean;

  // Actions
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      userProfile: null,
      isLoading: true,
      isAuthenticated: false,
      isLoadingProfile: false,
      isAdmin: false,
      mustChangePassword: false,

      // Actions
      setUser: (user: User | null) => {
        // Only clear state when user is null, don't auto-authenticate
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
            return { error };
          }

          if (data.user) {
            // Set user but don't mark as authenticated yet
            set({
              user: data.user,
              isLoading: true, // Keep loading until profile is loaded
            });

            // Load profile and wait for it to complete
            await get().refreshUserProfile();

            // Now mark as authenticated after profile is loaded
            set({
              isAuthenticated: true,
              isLoading: false,
            });
          }

          return { error: null };
        } catch (error) {
          set({ isLoading: false });
          return { error: error as AuthError };
        }
      },

      signOut: async () => {
        const supabase = createClient();

        try {
          await supabase.auth.signOut();
        } catch (error) {
          console.error("Error signing out:", error);
        }

        // Always clear state immediately, don't rely on auth listener
        set({
          user: null,
          userProfile: null,
          isAuthenticated: false,
          isAdmin: false,
          mustChangePassword: false,
          isLoading: false,
        });
      },

      refreshUserProfile: async () => {
        const { user, isLoadingProfile } = get();
        if (!user || isLoadingProfile) return;

        set({ isLoadingProfile: true });
        const supabase = createClient();

        try {
          console.log("Fetching user profile for:", user.id);
          const { data: profile, error } = await supabase
            .from("usuario")
            .select("*")
            .eq("auth_id", user.id)
            .single();

          if (error) {
            console.error("Error fetching user profile:", error);
            return;
          }

          console.log("Profile loaded:", profile);
          get().setUserProfile(profile);
        } catch (error) {
          console.error("Error refreshing user profile:", error);
        } finally {
          set({ isLoadingProfile: false });
        }
      },

      initialize: async () => {
        const supabase = createClient();
        set({ isLoading: true });

        try {
          // Get initial session
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (session?.user) {
            // Set user but keep loading until profile is loaded
            set({
              user: session.user,
              isLoading: true,
            });

            // Load profile and then mark as authenticated
            await get().refreshUserProfile();

            set({
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            get().setUser(null);
          }

          // Simple auth state listener - only for logout detection
          supabase.auth.onAuthStateChange(async (event) => {
            if (event === "SIGNED_OUT") {
              console.log("User signed out, clearing state");
              get().setUser(null);
            }
            // Don't handle SIGNED_IN here to avoid loops
          });
        } catch (error) {
          console.error("Error initializing auth:", error);
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        // Only persist non-sensitive data
        userProfile: state.userProfile,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
        mustChangePassword: state.mustChangePassword,
      }),
    }
  )
);

// Initialize store only when first used via hook (to avoid SSR hydration issues)
