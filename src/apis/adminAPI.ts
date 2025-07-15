import { axiosInstance } from "@/config/axios/axiosInstance";

// Interfaz para los datos del usuario
interface UserData {
  email: string;
  fullname: string;
  username: string;
  role: string;
}

// Interfaz para la respuesta de la API
interface CreateUserResponse {
  success: boolean;
  message: string;
  user?: any;
  error?: string;
}

// Función para crear usuario
export const createUser = async (userData: UserData): Promise<CreateUserResponse> => {
  try {
    console.log('🚀 Enviando datos a API:', userData);
    const response = await axiosInstance.post("/api/debug-create-user", userData);
    
    return {
      success: true,
      message: "Usuario registrado exitosamente en el sistema",
      user: response.data,
    };
  } catch (error: any) {
    console.error("Error al crear usuario:", error);
    
    // Manejar errores de axios
    if (error.response) {
      return {
        success: false,
        message: error.response.data.error || "Error desconocido al crear el usuario",
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
        message: "Error inesperado al crear el usuario",
        error: error.message,
      };
    }
  }
};

// Función para validar los datos del formulario (puede ser reutilizada)
export const validateUserForm = (formData: any): string[] => {
  const errors: string[] = [];

  if (!formData.nombreCompleto || formData.nombreCompleto.trim() === "") {
    errors.push("El nombre completo es requerido");
  }

  if (!formData.correo || formData.correo.trim() === "") {
    errors.push("El correo electrónico es requerido");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
    errors.push("El formato del correo electrónico no es válido");
  }

  if (!formData.nombreArtista || formData.nombreArtista.trim() === "") {
    errors.push("El nombre de artista es requerido");
  }

  // Agregar más validaciones según sea necesario
  if (formData.telefono && !/^\+?[\d\s-()]+$/.test(formData.telefono)) {
    errors.push("El formato del teléfono no es válido");
  }

  return errors;
};

// Función para formatear datos del formulario a formato de API
export const formatUserData = (formData: any): UserData => {
  return {
    email: formData.correo,
    fullname: formData.nombreCompleto,
    username: formData.nombreArtista,
    role: "user",
  };
};