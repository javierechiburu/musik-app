import { axiosInstance } from "@/config/axios/axiosInstance";

// Interfaz para cuenta bancaria
interface CuentaBancaria {
  id: string;
  usuario_id: string;
  titular: string;
  rut: string;
  banco: string;
  tipo_cuenta: string;
  numero_cuenta: string;
  img_cedula?: string;
  img_selfie?: string;
  cuenta_verificada: boolean;
  creado_en: string;
  // Información adicional del usuario
  usuario?: {
    email: string;
    nombre?: string;
  };
}

// Interfaz para la respuesta de la API
interface BancosAPIResponse {
  success: boolean;
  data: CuentaBancaria[];
  total?: number;
  message?: string;
}

// Función para obtener todas las cuentas bancarias (solo admin)
export const fetchAllBankAccounts = async (): Promise<CuentaBancaria[]> => {
  try {
    const response = await axiosInstance.get<BancosAPIResponse>("/api/admin/lista-bancos");
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Error al obtener cuentas bancarias");
    }
  } catch (error: any) {
    console.error("Error al obtener cuentas bancarias:", error);
    
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error al obtener cuentas bancarias"
      );
    } else if (error.request) {
      throw new Error("Error de conexión");
    } else {
      throw new Error("Error inesperado");
    }
  }
};

// Función para actualizar estado de verificación de cuenta bancaria
export const updateBankAccountVerification = async (
  accountId: string,
  verified: boolean
): Promise<void> => {
  try {
    const response = await axiosInstance.patch(`/api/admin/lista-bancos/${accountId}`, {
      cuenta_verificada: verified,
    });
    
    if (!response.data.success) {
      throw new Error(response.data.message || "Error al actualizar verificación");
    }
  } catch (error: any) {
    console.error("Error al actualizar verificación:", error);
    
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error al actualizar verificación"
      );
    } else if (error.request) {
      throw new Error("Error de conexión");
    } else {
      throw new Error("Error inesperado");
    }
  }
};

// Función para obtener cuentas bancarias con filtros
export const fetchBankAccountsWithFilters = async (filters: {
  verified?: boolean;
  banco?: string;
  search?: string;
}): Promise<CuentaBancaria[]> => {
  try {
    const params = new URLSearchParams();
    
    if (filters.verified !== undefined) {
      params.append('verified', filters.verified.toString());
    }
    if (filters.banco) {
      params.append('banco', filters.banco);
    }
    if (filters.search) {
      params.append('search', filters.search);
    }
    
    const response = await axiosInstance.get<BancosAPIResponse>(
      `/api/admin/lista-bancos?${params.toString()}`
    );
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Error al obtener cuentas bancarias");
    }
  } catch (error: any) {
    console.error("Error al obtener cuentas bancarias con filtros:", error);
    
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error al obtener cuentas bancarias"
      );
    } else if (error.request) {
      throw new Error("Error de conexión");
    } else {
      throw new Error("Error inesperado");
    }
  }
};

// Función para eliminar cuenta bancaria (solo admin)
export const deleteBankAccount = async (accountId: string): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/api/admin/lista-bancos/${accountId}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || "Error al eliminar cuenta bancaria");
    }
  } catch (error: any) {
    console.error("Error al eliminar cuenta bancaria:", error);
    
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error al eliminar cuenta bancaria"
      );
    } else if (error.request) {
      throw new Error("Error de conexión");
    } else {
      throw new Error("Error inesperado");
    }
  }
};

// Función para obtener estadísticas de cuentas bancarias
export const fetchBankAccountStats = async (): Promise<{
  total: number;
  verified: number;
  pending: number;
  byBank: Record<string, number>;
}> => {
  try {
    const response = await axiosInstance.get("/api/admin/lista-bancos/stats");
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Error al obtener estadísticas");
    }
  } catch (error: any) {
    console.error("Error al obtener estadísticas:", error);
    
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error al obtener estadísticas"
      );
    } else if (error.request) {
      throw new Error("Error de conexión");
    } else {
      throw new Error("Error inesperado");
    }
  }
};

// Función para obtener signed URL desde el servidor
export const getSignedUrl = async (path: string): Promise<string | null> => {
  try {
    const response = await axiosInstance.post("/api/admin/signed-url", { path });
    
    if (response.data.success) {
      return response.data.signedUrl;
    } else {
      throw new Error(response.data.error || "Error al obtener signed URL");
    }
  } catch (error: any) {
    console.error("Error al obtener signed URL:", error);
    return null;
  }
};

export type { CuentaBancaria, BancosAPIResponse };