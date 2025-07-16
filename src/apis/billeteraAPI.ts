import { axiosInstance } from "@/config/axios/axiosInstance";
import { supabase } from "@/config/supabase/supabaseClient";

// Interfaz para datos de solicitud de retiro
interface WithdrawalRequestData {
  id_usuario: string;
  monto: number;
  tipo_pago: string;
  datos_pago: string;
}

// Interfaz para respuesta de la base de datos
interface BilleteraRecord {
  id: string;
  id_usuario: string;
  monto: number;
  tipo_pago: string;
  datos_pago: string;
  created_at: string;
}

// Interfaz para formato de interfaz
interface WithdrawalRequest {
  id: string;
  amount: number;
  method: string;
  accountInfo: string;
  status: "pending" | "approved" | "rejected";
  requestDate: string;
  processedDate?: string;
  description?: string;
}

// Función para insertar solicitud de retiro en la base de datos
export const insertWithdrawalRequest = async (
  requestData: WithdrawalRequestData
) => {
  try {
    const response = await axiosInstance.post("/api/billetera", requestData);
    return response.data;
  } catch (error: any) {
    console.error("Error al insertar solicitud de retiro:", error);

    if (error.response) {
      throw new Error(
        error.response.data.error || "Error al guardar la solicitud"
      );
    } else if (error.request) {
      throw new Error("Error de conexión");
    } else {
      throw new Error("Error inesperado");
    }
  }
};

// Función para obtener solicitudes de retiro del usuario
export const fetchWithdrawalRequests = async (
  id_usuario: string = "default_user_id"
): Promise<BilleteraRecord[]> => {
  try {
    const response = await axiosInstance.get(
      `/api/billetera?id_usuario=${id_usuario}`
    );
    return response.data.data || [];
  } catch (error: any) {
    console.error("Error al obtener solicitudes de retiro:", error);

    if (error.response) {
      throw new Error(
        error.response.data.error || "Error al obtener solicitudes"
      );
    } else if (error.request) {
      throw new Error("Error de conexión");
    } else {
      throw new Error("Error inesperado");
    }
  }
};

// Función para obtener y formatear solicitudes de retiro
export const fetchFormattedWithdrawalRequests = async (
  id_usuario: string = "default_user_id"
) => {
  try {
    const records = await fetchWithdrawalRequests(id_usuario);
    return records.map(formatWithdrawalRequest);
  } catch (error) {
    console.error("Error al obtener solicitudes formateadas:", error);
    throw error;
  }
};

// Función para formatear datos de la base de datos al formato de la interfaz
export const formatWithdrawalRequest = (
  record: BilleteraRecord
): WithdrawalRequest => {
  return {
    id: record.id,
    amount: record.monto,
    method: record.tipo_pago,
    accountInfo: record.datos_pago,
    status: "pending", // Por defecto, nuevas solicitudes están pendientes
    requestDate: new Date(record.created_at).toISOString().split("T")[0],
    description: undefined,
  };
};

// Función para formatear datos del formulario al formato de la base de datos
export const formatRequestForDatabase = (
  formData: Partial<WithdrawalRequest>,
  id_usuario: string
): WithdrawalRequestData => {
  return {
    id_usuario,
    monto: formData.amount || 0,
    tipo_pago: formData.method || "bank_transfer",
    datos_pago: formData.accountInfo || "",
  };
};

// Función principal para procesar solicitud de retiro
export const processWithdrawalRequest = async (
  formData: Partial<WithdrawalRequest>,
  id_usuario: string = "default_user_id" // En producción, esto vendría del contexto de autenticación
) => {
  try {
    if (!id_usuario) return;
    // 1. Formatear datos para la base de datos
    const dbData = formatRequestForDatabase(formData, id_usuario);

    // 2. Insertar en la base de datos
    const dbResult = await insertWithdrawalRequest(dbData);

    // 3. Enviar email de notificación al administrador (si es necesario)
    const { sendWithdrawalEmail } = await import("@/apis/emailAPI");
    const emailResult = await sendWithdrawalEmail({
      artistName: "Usuario", // En producción, esto vendría del contexto del usuario
      amount: formData.amount || 0,
      method: formData.method || "bank_transfer",
      accountInfo: formData.accountInfo || "",
      description: formData.description,
    });

    return {
      database: dbResult,
      email: emailResult,
    };
  } catch (error) {
    console.error("Error al procesar solicitud de retiro:", error);
    throw error;
  }
};

// Interfaz para datos de cuenta bancaria
interface BankAccountData {
  usuario_id: string;
  titular: string;
  rut: string;
  banco: string;
  tipo_cuenta: string;
  numero_cuenta: string;
  img_cedula?: string;
  img_selfie?: string;
}

// Función para subir imagen a Supabase Storage
export const uploadVerificationImage = async (
  file: File,
  fileName: string
): Promise<string> => {
  try {
    const { data, error } = await supabase.storage
      .from("verificacion")
      .upload(fileName, file);

    if (error) {
      throw new Error(`Error al subir imagen: ${error.message}`);
    }

    // Obtener URL pública
    const { data: publicData } = supabase.storage
      .from("verificacion")
      .getPublicUrl(data.path);

    return publicData.publicUrl;
  } catch (error: any) {
    console.error("Error al subir imagen:", error);
    throw error;
  }
};

// Función para registrar cuenta bancaria
export const registerBankAccount = async (accountData: BankAccountData) => {
  try {
    const response = await axiosInstance.post(
      "/api/cuenta-bancaria",
      accountData
    );
    return response.data;
  } catch (error: any) {
    console.error("Error al registrar cuenta bancaria:", error);

    if (error.response) {
      throw new Error(
        error.response.data.error || "Error al registrar cuenta bancaria"
      );
    } else if (error.request) {
      throw new Error("Error de conexión");
    } else {
      throw new Error("Error inesperado");
    }
  }
};

// Función para obtener cuenta bancaria del usuario
export const fetchUserBankAccount = async () => {
  try {
    const response = await axiosInstance.get("/api/cuenta-bancaria");
    return response.data.data || null;
  } catch (error: any) {
    console.error("Error al obtener cuenta bancaria:", error);
    
    if (error.response?.status === 404 || error.response?.data?.error?.includes("no encontrado")) {
      return null; // No hay cuenta bancaria registrada
    }
    
    if (error.response) {
      throw new Error(error.response.data.error || "Error al obtener cuenta bancaria");
    } else if (error.request) {
      throw new Error("Error de conexión");
    } else {
      throw new Error("Error inesperado");
    }
  }
};

// Función principal para procesar registro de cuenta bancaria con imágenes
export const processBankAccountRegistration = async (
  formData: Omit<BankAccountData, "img_cedula" | "img_selfie">,
  cedulaFile?: File,
  selfieFile?: File
) => {
  try {
    // Crear FormData para enviar archivos al servidor
    const formDataToSend = new FormData();
    
    // Agregar datos del formulario
    formDataToSend.append('usuario_id', formData.usuario_id);
    formDataToSend.append('titular', formData.titular);
    formDataToSend.append('rut', formData.rut);
    formDataToSend.append('banco', formData.banco);
    formDataToSend.append('tipo_cuenta', formData.tipo_cuenta);
    formDataToSend.append('numero_cuenta', formData.numero_cuenta);
    
    // Agregar archivos si existen
    if (cedulaFile) {
      formDataToSend.append('cedula_file', cedulaFile);
    }
    if (selfieFile) {
      formDataToSend.append('selfie_file', selfieFile);
    }

    // Enviar todo al servidor
    const response = await axiosInstance.post("/api/cuenta-bancaria", formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al procesar registro de cuenta bancaria:", error);
    throw error;
  }
};
