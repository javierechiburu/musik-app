import { axiosInstance } from "@/config/axios/axiosInstance";

// Función para obtener token desde cookies
const getTokenFromCookies = (): string | null => {
  if (typeof document === "undefined") return null;

  const cookieToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  return cookieToken ? cookieToken.split("=")[1] : null;
};

// Función para obtener token desde Supabase usando el cliente existente
const getTokenFromSupabase = async (): Promise<string | null> => {
  try {
    console.log("🔍 Intentando obtener token desde Supabase...");
    
    // Usar el createClient centralizado en lugar de crear uno nuevo
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();

    // Usar getUser() en lugar de getSession() para validación segura
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.log("⚠️ Usuario no válido o no autenticado:", userError?.message);
      return null;
    }

    // Si el usuario es válido, obtener la sesión
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    console.log("📋 Estado de autenticación:", {
      hasUser: !!user,
      hasSession: !!session,
      userEmail: user?.email || "N/A",
      hasToken: !!session?.access_token,
      sessionError: sessionError?.message || "N/A",
    });

    return session?.access_token || null;
  } catch (error) {
    console.error("❌ Error getting token from Supabase:", error);
    return null;
  }
};

// Interceptor para agregar el token a las peticiones
axiosInstance.interceptors.request.use(
  async (config) => {
    console.log("🚀 === INTERCEPTOR DE AXIOS EJECUTÁNDOSE ===");
    try {
      // Solo ejecutar interceptor en el cliente
      if (typeof window === "undefined") {
        console.log(
          "🔧 Interceptor ejecutándose en el servidor - saltando autenticación"
        );
        return config;
      }

      console.log("🚀 === INTERCEPTOR DE AXIOS EJECUTÁNDOSE ===");
      console.log("📍 URL de la petición:", config.url);

      // Siempre intentar obtener token desde Supabase (más confiable)
      let token = await getTokenFromSupabase();

      // Si no hay token en Supabase, intentar cookies como fallback
      if (!token) {
        console.log("🍪 Intentando obtener token desde cookies...");
        token = getTokenFromCookies();
        console.log(
          "🍪 Token desde cookies:",
          token ? "Encontrado" : "No encontrado"
        );
      }

      // Agregar token al header si existe
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("✅ Token agregado al request exitosamente");
        console.log(
          "🔑 Primeros caracteres del token:",
          token.substring(0, 20) + "..."
        );
      } else {
        console.warn(
          "⚠️ NO SE ENCONTRÓ TOKEN - La petición será sin autorización"
        );
      }

      // Agregar headers adicionales de seguridad
      config.headers["X-Requested-With"] = "XMLHttpRequest";
      config.headers["Content-Type"] =
        config.headers["Content-Type"] || "application/json";

      console.log("📤 Headers finales:", config.headers);
      console.log("🏁 === FIN DEL INTERCEPTOR ===");

      return config;
    } catch (error) {
      console.error("❌ Error in request interceptor:", error);
      return config;
    }
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(new Error(error));
  }
);
