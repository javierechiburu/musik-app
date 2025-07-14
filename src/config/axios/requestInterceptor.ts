import { axiosInstance } from "@/config/axios/axiosInstance";

// Función para obtener token desde cookies
const getTokenFromCookies = (): string | null => {
  if (typeof document === 'undefined') return null;
  
  const cookieToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
    
  return cookieToken ? cookieToken.split("=")[1] : null;
};

// Función para obtener token desde Supabase
const getTokenFromSupabase = async (): Promise<string | null> => {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  } catch (error) {
    console.error('Error getting token from Supabase:', error);
    return null;
  }
};

// Interceptor para agregar el token a las peticiones
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // Intentar obtener token desde cookies primero
      let token = getTokenFromCookies();
      
      // Si no hay token en cookies, intentar obtenerlo desde Supabase
      if (!token) {
        token = await getTokenFromSupabase();
        
        // Si obtenemos token desde Supabase, sincronizarlo con cookies
        if (token && typeof document !== 'undefined') {
          document.cookie = `token=${token}; path=/; max-age=86400; secure; samesite=strict`;
        }
      }

      // Agregar token al header si existe
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Agregar headers adicionales de seguridad
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';
      
      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      return config;
    }
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(new Error(error));
  }
);
