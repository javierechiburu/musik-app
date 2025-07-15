import { useAuthStore } from '@/store/authStore'
import { useEffect, useState } from 'react'
import type { User, AuthError } from '@supabase/supabase-js'
import type { UserProfile } from '@/store/authStore'

// Global flag to prevent multiple initializations
let globalInitialized = false

export interface UseAuthReturn {
  // State
  user: User | null
  userProfile: UserProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  mustChangePassword: boolean
  
  // Actions
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const {
    user,
    userProfile,
    isLoading,
    isAuthenticated,
    isAdmin,
    mustChangePassword,
    signIn,
    signOut,
    refreshUserProfile,
    initialize,
  } = useAuthStore()

  // Hydration fix for Next.js SSR
  const [hydrated, setHydrated] = useState(false)
  const [initialized, setInitialized] = useState(false)
  
  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    // Initialize auth store only once globally
    if (hydrated && !globalInitialized) {
      console.log('Initializing auth store globally...')
      globalInitialized = true
      initialize()
      setInitialized(true)
    } else if (hydrated && globalInitialized) {
      setInitialized(true)
    }
  }, [hydrated, initialize])

  // Return consistent state during hydration
  return {
    user: hydrated ? user : null,
    userProfile: hydrated ? userProfile : null,
    isLoading: hydrated ? isLoading : true,
    isAuthenticated: hydrated ? isAuthenticated : false,
    isAdmin: hydrated ? isAdmin : false,
    mustChangePassword: hydrated ? mustChangePassword : false,
    signIn,
    signOut,
    refreshProfile: refreshUserProfile,
  }
}

// Hook for server components (requires user to be authenticated)
export function useRequireAuth(): UseAuthReturn {
  const auth = useAuth()
  
  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      throw new Error('Authentication required')
    }
  }, [auth.isLoading, auth.isAuthenticated])

  return auth
}

// Hook for admin-only access
export function useRequireAdmin(): UseAuthReturn {
  const auth = useAuth()
  
  useEffect(() => {
    if (!auth.isLoading && (!auth.isAuthenticated || !auth.isAdmin)) {
      throw new Error('Admin access required')
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.isAdmin])

  return auth
}