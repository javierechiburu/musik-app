import { axiosInstance } from "@/config/axios/axiosInstance";

// Interfaz para los datos del pre-registro
interface PreRegistroData {
  nombreArtista: string;
  nombreCompleto: string;
  email: string;
}

// Interfaz para la respuesta de la API
interface PreRegistroResponse {
  success: boolean;
  message: string;
  user?: any;
  error?: string;
}

// Función para pre-registro de usuario
export const preRegistroUsuario = async (formData: PreRegistroData): Promise<PreRegistroResponse> => {
  try {
    console.log('🚀 Enviando datos de pre-registro:', formData);
    
    // Formatear los datos para la API
    const dataToSend = {
      username: formData.nombreArtista,
      fullname: formData.nombreCompleto,
      email: formData.email,
      role: "user",
      must_change_password: true,
      verified: false
    };

    const response = await axiosInstance.post("/api/usuarios/pre-registro", dataToSend);
    
    return {
      success: true,
      message: "Pre-registro exitoso. Te contactaremos pronto.",
      user: response.data,
    };
  } catch (error: any) {
    console.error("Error en pre-registro:", error);
    
    // Manejar errores de axios
    if (error.response) {
      return {
        success: false,
        message: error.response.data.error || "Error desconocido al procesar el pre-registro",
        error: error.response.data.error,
      };
    } else if (error.request) {
      return {
        success: false,
        message: "Error de conexión. Verifica tu conexión a internet e inténtalo de nuevo.",
        error: "Network error",
      };
    } else {
      return {
        success: false,
        message: "Error inesperado al procesar el pre-registro",
        error: error.message,
      };
    }
  }
};

// Función para validar los datos del formulario de pre-registro
export const validatePreRegistroForm = (formData: PreRegistroData): string[] => {
  const errors: string[] = [];

  if (!formData.nombreCompleto || formData.nombreCompleto.trim() === "") {
    errors.push("El nombre completo es requerido");
  }

  if (!formData.email || formData.email.trim() === "") {
    errors.push("El correo electrónico es requerido");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push("El formato del correo electrónico no es válido");
  }

  if (!formData.nombreArtista || formData.nombreArtista.trim() === "") {
    errors.push("El nombre artístico es requerido");
  }

  return errors;
};

// Función para obtener usuarios nuevos (no verificados)
export const obtenerNuevosUsuarios = async () => {
  try {
    console.log('🔍 Obteniendo nuevos usuarios...');
    const response = await axiosInstance.get("/api/admin/nuevos-usuarios");
    
    return response.data.usuarios || [];
  } catch (error: any) {
    console.error("Error al obtener nuevos usuarios:", error);
    
    if (error.response) {
      throw new Error(error.response.data.error || "Error al obtener usuarios");
    } else if (error.request) {
      throw new Error("Error de conexión. Verifica tu conexión a internet.");
    } else {
      throw new Error("Error inesperado al obtener usuarios");
    }
  }
};

// Función para verificar un usuario
export const verificarUsuario = async (usuarioId: string) => {
  try {
    console.log('✅ Verificando usuario:', usuarioId);
    const response = await axiosInstance.post("/api/admin/nuevos-usuarios", { usuarioId });
    
    return response.data;
  } catch (error: any) {
    console.error("Error al verificar usuario:", error);
    
    if (error.response) {
      throw new Error(error.response.data.error || "Error al verificar usuario");
    } else if (error.request) {
      throw new Error("Error de conexión. Verifica tu conexión a internet.");
    } else {
      throw new Error("Error inesperado al verificar usuario");
    }
  }
};