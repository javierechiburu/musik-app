import { axiosInstance } from "@/config/axios/axiosInstance";

// Función para limpiar sesión y redirigir al login
const clearSessionAndRedirect = async () => {
  try {
    console.log("🧹 Limpiando sesión completa...");
    
    // Limpiar authStore
    try {
      const { useAuthStore } = await import("@/store/authStore");
      const { signOut } = useAuthStore.getState();
      await signOut();
    } catch (storeError) {
      console.warn("Error clearing authStore:", storeError);
    }
    
    // Limpiar cookies de token
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    
    // Limpiar cookies de Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl) {
      const domain = supabaseUrl.split("://")[1];
      document.cookie = `sb-${domain}-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
    
    // Limpiar localStorage
    localStorage.removeItem("logged_in_user_role");
    localStorage.removeItem("auth-storage");
    
    // Limpiar todos los items de Supabase en localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith("sb-") && key.includes("auth")) {
        localStorage.removeItem(key);
      }
    });
    
    // Limpiar sessionStorage
    sessionStorage.clear();
    
    console.log("✅ Sesión limpiada, redirigiendo al login");
    // Redirigir al login
    window.location.href = "/login";
  } catch (error) {
    console.error('Error clearing session:', error);
    // Fallback: solo redirigir
    window.location.href = "/login";
  }
};

// Interceptor para manejar respuestas
axiosInstance.interceptors.response.use(
  (response) => {
    // Respuesta exitosa, retornar tal como está
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Manejar error 401 (No autorizado)
    if (error.response && error.response.status === 401) {
      console.warn('Token inválido o expirado, limpiando sesión...');
      
      // Evitar loop infinito
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        
        // Intentar refrescar token desde Supabase usando cliente centralizado
        try {
          const { createClient } = await import('@/lib/supabase/client');
          const supabase = createClient();
          
          // Primero validar que el usuario sea auténtico
          const { data: { user }, error: userError } = await supabase.auth.getUser();
          
          if (userError || !user) {
            console.warn('Usuario no válido durante refresh:', userError?.message);
            throw new Error('Invalid user');
          }
          
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.access_token) {
            // Actualizar token en cookies
            document.cookie = `token=${session.access_token}; path=/; max-age=86400; secure; samesite=strict`;
            
            // Actualizar header para la petición original
            originalRequest.headers.Authorization = `Bearer ${session.access_token}`;
            
            // Reintentar petición original
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
        }
      }
      
      // Si no se pudo refrescar el token, limpiar sesión
      clearSessionAndRedirect();
      return Promise.reject(error);
    }
    
    // Manejar error 403 (Prohibido)
    if (error.response && error.response.status === 403) {
      console.warn('Acceso denegado:', error.response.data?.error);
      
      // Mostrar mensaje de error amigable
      if (typeof window !== 'undefined' && window.alert) {
        window.alert(error.response.data?.error || 'No tienes permisos para realizar esta acción');
      }
      
      return Promise.reject(error);
    }
    
    // Manejar error 429 (Too Many Requests)
    if (error.response && error.response.status === 429) {
      console.warn('Demasiadas peticiones, reintentando...');
      
      // Implementar retry con exponential backoff
      const retryAfter = error.response.headers['retry-after'] || 1;
      const delay = Math.min(retryAfter * 1000, 10000); // Max 10 segundos
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(axiosInstance(originalRequest));
        }, delay);
      });
    }
    
    // Manejar errores de red
    if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED') {
      console.error('Error de red:', error.message);
      
      if (typeof window !== 'undefined' && window.alert) {
        window.alert('Error de conexión. Verifica tu conexión a internet.');
      }
    }
    
    // Para otros errores, loguear y rechazar
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method
    });
    
    return Promise.reject(new Error(error));
  }
);
