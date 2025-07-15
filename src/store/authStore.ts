import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createClient } from '@/lib/supabase/client'
import type { User, AuthError } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

export type UserProfile = Database['public']['Tables']['usuario']['Row']

interface AuthState {
  // Core state
  user: User | null
  userProfile: UserProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  isLoadingProfile: boolean
  
  // Computed properties
  isAdmin: boolean
  
  // Actions
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
  setUser: (user: User | null) => void
  setUserProfile: (profile: UserProfile | null) => void
  setLoading: (loading: boolean) => void
  initialize: () => Promise<void>
  refreshUserProfile: () => Promise<void>
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

      // Actions
      setUser: (user: User | null) => {
        set({ 
          user, 
          isAuthenticated: !!user,
          isLoading: false 
        })
        
        // Clear profile when user is cleared
        if (!user) {
          set({ userProfile: null, isAdmin: false })
        }
      },

      setUserProfile: (profile: UserProfile | null) => {
        set({ 
          userProfile: profile,
          isAdmin: profile?.role === 'admin'
        })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      signIn: async (email: string, password: string) => {
        const supabase = createClient()
        set({ isLoading: true })

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })

          if (error) {
            set({ isLoading: false })
            return { error }
          }

          if (data.user) {
            // Set user and load profile directly
            get().setUser(data.user)
            await get().refreshUserProfile()
          }

          return { error: null }
        } catch (error) {
          set({ isLoading: false })
          return { error: error as AuthError }
        }
      },

      signOut: async () => {
        const supabase = createClient()
        set({ isLoading: true })

        try {
          await supabase.auth.signOut()
          // User will be cleared by the auth state change listener
        } catch (error) {
          console.error('Error signing out:', error)
          // Clear state anyway
          set({
            user: null,
            userProfile: null,
            isAuthenticated: false,
            isAdmin: false,
            isLoading: false,
          })
        }
      },

      refreshUserProfile: async () => {
        const { user, isLoadingProfile } = get()
        if (!user || isLoadingProfile) return

        set({ isLoadingProfile: true })
        const supabase = createClient()
        
        try {
          console.log('Fetching user profile for:', user.id)
          const { data: profile, error } = await supabase
            .from('usuario')
            .select('*')
            .eq('auth_id', user.id)
            .single()

          if (error) {
            console.error('Error fetching user profile:', error)
            return
          }

          console.log('Profile loaded:', profile)
          get().setUserProfile(profile)
        } catch (error) {
          console.error('Error refreshing user profile:', error)
        } finally {
          set({ isLoadingProfile: false })
        }
      },

      initialize: async () => {
        const supabase = createClient()
        set({ isLoading: true })

        try {
          // Get initial session
          const { data: { session } } = await supabase.auth.getSession()
          
          if (session?.user) {
            get().setUser(session.user)
            await get().refreshUserProfile()
          } else {
            get().setUser(null)
          }

          // Simple auth state listener - only for logout detection
          supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_OUT') {
              console.log('User signed out, clearing state')
              get().setUser(null)
              get().setUserProfile(null)
            }
            // Don't handle SIGNED_IN here to avoid loops
          })

        } catch (error) {
          console.error('Error initializing auth:', error)
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        // Only persist non-sensitive data
        userProfile: state.userProfile,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
      }),
    }
  )
)

// Initialize store only when first used via hook (to avoid SSR hydration issues)