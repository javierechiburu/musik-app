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
export const insertWithdrawalRequest = async (requestData: WithdrawalRequestData) => {
  try {
    const response = await fetch("/api/billetera", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al insertar solicitud de retiro:", error);
    throw error;
  }
};

// Función para obtener solicitudes de retiro del usuario
export const fetchWithdrawalRequests = async (id_usuario: string = "default_user_id"): Promise<BilleteraRecord[]> => {
  try {
    const response = await fetch(`/api/billetera?id_usuario=${id_usuario}`);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error al obtener solicitudes de retiro:", error);
    throw error;
  }
};

// Función para obtener y formatear solicitudes de retiro
export const fetchFormattedWithdrawalRequests = async (id_usuario: string = "default_user_id") => {
  try {
    const records = await fetchWithdrawalRequests(id_usuario);
    return records.map(formatWithdrawalRequest);
  } catch (error) {
    console.error("Error al obtener solicitudes formateadas:", error);
    throw error;
  }
};

// Función para formatear datos de la base de datos al formato de la interfaz
export const formatWithdrawalRequest = (record: BilleteraRecord): WithdrawalRequest => {
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
    // 1. Formatear datos para la base de datos
    const dbData = formatRequestForDatabase(formData, id_usuario);

    // 2. Insertar en la base de datos
    const dbResult = await insertWithdrawalRequest(dbData);

    // 3. Enviar email de notificación al administrador (si es necesario)
    const emailResult = await fetch("/api/send-withdrawal-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artistName: "Usuario", // En producción, esto vendría del contexto del usuario
        amount: formData.amount,
        method: formData.method,
        accountInfo: formData.accountInfo,
        description: formData.description,
      }),
    });

    return {
      database: dbResult,
      email: emailResult.ok ? { success: true } : { success: false },
    };
  } catch (error) {
    console.error("Error al procesar solicitud de retiro:", error);
    throw error;
  }
};