import { axiosInstance } from "@/config/axios/axiosInstance";

// Tipos para los datos del formulario de marketing
export interface MarketingFormData {
  tools: {
    googleAds: boolean;
    marquee: boolean;
    meta: boolean;
    tiktokAds: boolean;
    kali: boolean;
    mediosDigitales: boolean;
    mediosTradicionales: boolean;
  };
  segmentation: {
    countries: string[];
    genders: string[];
    ages: string[];
    genres: string[];
  };
  budget: string;
  campaign_objective: string;
  content_type: string;
  timeline: string;
  additional_notes: string;
}

// Respuesta de la API de envío de email
export interface EmailResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

// Respuesta de error
export interface EmailError {
  error: string;
  details?: string;
}

// Interfaces para diferentes tipos de email
interface VerificationEmailData {
  email: string;
  code: string;
  amount?: string;
}

interface WithdrawalEmailData {
  artistName: string;
  amount: number;
  method: string;
  accountInfo: string;
  description?: string;
}

interface WelcomeEmailData {
  email: string;
  fullname: string;
  tempPassword: string;
  username: string;
}

// Función para enviar email de verificación
export const sendVerificationEmail = async (
  data: VerificationEmailData
): Promise<EmailResponse> => {
  try {
    const response = await axiosInstance.post(
      "/api/send-verification-email",
      data
    );

    if (response.status !== 200) {
      console.error("Error al enviar email de verificación");

      return {
        success: false,
        message: "Error al enviar el email de verificación",
        timestamp: new Date().toISOString(),
      };
    }

    return {
      success: true,
      message: "Email de verificación enviado exitosamente",
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error("Error al enviar email de verificación:", error);

    return {
      success: false,
      message: "Error al enviar el email de verificación",
      timestamp: new Date().toISOString(),
    };
  }
};

// Función para enviar email de marketing
export const sendMarketingEmailAPI = async (
  data: MarketingFormData
): Promise<EmailResponse> => {
  try {
    const response = await axiosInstance.post(
      "/api/send-marketing-email",
      data
    );

    if (response.status !== 200) {
      console.error("Error API");
      return {
        success: false,
        message: "Error al enviar el email de marketing",
        timestamp: new Date().toISOString(),
      };
    }

    return {
      success: true,
      message: "Email de marketing enviado exitosamente",
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error("Error al enviar email de marketing:", error);

    return {
      success: false,
      message: "Error al enviar el email de marketing",
      timestamp: new Date().toISOString(),
    };
  }
};

// Función para enviar email de solicitud de retiro
export const sendWithdrawalEmail = async (
  data: WithdrawalEmailData
): Promise<EmailResponse> => {
  try {
    const response = await axiosInstance.post(
      "/api/send-withdrawal-request",
      data
    );

    if (response.status !== 200) {
      console.error("Error al enviar email de verificación");

      return {
        success: false,
        message: "Error al enviar el email de verificación",
        timestamp: new Date().toISOString(),
      };
    }

    return {
      success: true,
      message: "Email de solicitud de retiro enviado exitosamente",
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error("Error al enviar email de retiro:", error);

    return {
      success: false,
      message: "Error al enviar el email de solicitud de retiro",
      timestamp: new Date().toISOString(),
    };
  }
};

/**
 * Valida los datos del formulario antes de enviar
 * @param formData - Datos del formulario a validar
 * @returns true si es válido, lanza error si no
 */
export const validateMarketingFormData = (
  formData: MarketingFormData
): boolean => {
  // Validar que al menos una herramienta esté seleccionada
  const hasSelectedTools = Object.values(formData.tools).some(Boolean);

  if (!hasSelectedTools) {
    throw new Error("Debe seleccionar al menos una herramienta de marketing");
  }

  // Validar que haya al menos un criterio de segmentación
  const hasSegmentation =
    formData.segmentation.countries.length > 0 ||
    formData.segmentation.genders.length > 0 ||
    formData.segmentation.ages.length > 0 ||
    formData.segmentation.genres.length > 0;

  if (!hasSegmentation) {
    throw new Error("Debe especificar al menos un criterio de segmentación");
  }

  // Validar presupuesto (opcional pero recomendado)
  if (!formData.budget.trim()) {
    console.warn(
      "Presupuesto no especificado - recomendamos agregar esta información"
    );
  }

  return true;
};

// Función para enviar email de bienvenida
export const sendWelcomeEmail = async (
  data: WelcomeEmailData
): Promise<EmailResponse> => {
  try {
    const response = await axiosInstance.post(
      "/api/send-welcome-email",
      data
    );

    if (response.status !== 200) {
      console.error("Error al enviar email de bienvenida");

      return {
        success: false,
        message: "Error al enviar el email de bienvenida",
        timestamp: new Date().toISOString(),
      };
    }

    return {
      success: true,
      message: "Email de bienvenida enviado exitosamente",
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error("Error al enviar email de bienvenida:", error);

    return {
      success: false,
      message: "Error al enviar el email de bienvenida",
      timestamp: new Date().toISOString(),
    };
  }
};
