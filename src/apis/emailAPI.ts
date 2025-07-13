import { axiosInstance } from "@/config/axios/axiosInstance";
import { createMarketingRequest, type MarketingRequest } from "./marketingAPI";

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

/**
 * Envía un email con los datos del formulario de marketing y crea la solicitud
 * @param formData - Datos del formulario de marketing
 * @param authToken - Token de autorización (opcional por ahora)
 * @returns Promise con la solicitud creada
 */
export const sendMarketingEmail = async (
  formData: MarketingFormData,
  authToken?: string
): Promise<MarketingRequest> => {
  try {
    // Configurar headers base
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Agregar token de autorización si se proporciona
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    // Realizar la llamada a la API de email
    console.log("acaaaaaaaa");
    const emailResponse = await axiosInstance.post<EmailResponse>(
      "/api/send-marketing-email",
      formData,
      {
        headers,
        timeout: 30000, // 30 segundos timeout
      }
    );

    // Si el email se envió exitosamente, crear la solicitud
    const marketingRequest = formatMarketingRequestForAPI(formData);
    const createdRequest = await createMarketingRequest(marketingRequest);

    return createdRequest;
  } catch (error: any) {
    // Manejar errores de la respuesta
    if (error.response) {
      // El servidor respondió con un código de error
      const errorData: EmailError = error.response.data;
      throw new Error(
        errorData.details || errorData.error || "Error al enviar el email"
      );
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      throw new Error(
        "No se pudo conectar con el servidor. Verifica tu conexión a internet."
      );
    } else {
      // Algo pasó al configurar la petición
      throw new Error("Error al configurar la petición: " + error.message);
    }
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

/**
 * Obtiene un resumen de la solicitud de marketing
 * @param formData - Datos del formulario
 * @returns Resumen legible de la solicitud
 */
export const getMarketingRequestSummary = (
  formData: MarketingFormData
): string => {
  const selectedTools = Object.entries(formData.tools)
    .filter(([_, selected]) => selected)
    .map(([tool, _]) => {
      const toolNames = {
        googleAds: "Google Ads",
        marquee: "Spotify Marquee",
        meta: "Meta Ads",
        tiktokAds: "TikTok Ads",
        kali: "Kali",
        mediosDigitales: "Medios Digitales",
        mediosTradicionales: "Medios Tradicionales",
      };
      return toolNames[tool as keyof typeof toolNames] || tool;
    });

  const segmentationSummary = [];
  if (formData.segmentation.countries.length > 0) {
    segmentationSummary.push(
      `${formData.segmentation.countries.length} países`
    );
  }
  if (formData.segmentation.genres.length > 0) {
    segmentationSummary.push(
      `${formData.segmentation.genres.length} géneros musicales`
    );
  }
  if (formData.segmentation.ages.length > 0) {
    segmentationSummary.push(
      `${formData.segmentation.ages.length} grupos de edad`
    );
  }
  if (formData.segmentation.genders.length > 0) {
    segmentationSummary.push(`${formData.segmentation.genders.length} géneros`);
  }

  return `Solicitud de marketing con ${
    selectedTools.length
  } herramientas seleccionadas (${selectedTools.join(
    ", "
  )}) y segmentación por ${segmentationSummary.join(", ")}. Presupuesto: ${
    formData.budget || "No especificado"
  }.`;
};

/**
 * Transforma los datos del formulario para la API
 * @param formData - Datos del formulario
 * @returns Datos formateados para la API
 */
export const formatMarketingRequestForAPI = (
  formData: MarketingFormData
): Omit<MarketingRequest, "id" | "createdAt" | "updatedAt"> => {
  const selectedTools = Object.entries(formData.tools)
    .filter(([_, selected]) => selected)
    .map(([tool, _]) => {
      const toolNames = {
        googleAds: "Google Ads",
        marquee: "Spotify Marquee",
        meta: "Meta Ads",
        tiktokAds: "TikTok Ads",
        kali: "Kali",
        mediosDigitales: "Medios Digitales",
        mediosTradicionales: "Medios Tradicionales",
      };
      return toolNames[tool as keyof typeof toolNames] || tool;
    });

  return {
    title: `Campaña ${
      formData.content_type || "Marketing"
    } - ${new Date().toLocaleDateString()}`,
    tools: selectedTools,
    budget: formData.budget || "No especificado",
    objective: formData.campaign_objective || "No especificado",
    timeline: formData.timeline || "No especificado",
    status: "pending" as const,
    notes: formData.additional_notes || "Nueva solicitud creada.",
    segmentation: {
      countries: formData.segmentation.countries,
      genders: formData.segmentation.genders,
      ages: formData.segmentation.ages,
      genres: formData.segmentation.genres,
    },
  };
};

/**
 * Transforma los datos del formulario para mostrar en la interfaz
 * @param formData - Datos del formulario
 * @returns Datos formateados para la UI
 */
export const formatMarketingRequestForUI = (formData: MarketingFormData) => {
  const selectedTools = Object.entries(formData.tools)
    .filter(([_, selected]) => selected)
    .map(([tool, _]) => {
      const toolNames = {
        googleAds: "Google Ads",
        marquee: "Spotify Marquee",
        meta: "Meta Ads",
        tiktokAds: "TikTok Ads",
        kali: "Kali",
        mediosDigitales: "Medios Digitales",
        mediosTradicionales: "Medios Tradicionales",
      };
      return toolNames[tool as keyof typeof toolNames] || tool;
    });

  return {
    id: Date.now().toString(),
    title: `Campaña ${
      formData.content_type || "Marketing"
    } - ${new Date().toLocaleDateString()}`,
    tools: selectedTools,
    budget: formData.budget || "No especificado",
    objective: formData.campaign_objective || "No especificado",
    timeline: formData.timeline || "No especificado",
    status: "pending" as const,
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
    notes: formData.additional_notes || "Nueva solicitud creada.",
    segmentation: {
      countries: formData.segmentation.countries,
      genders: formData.segmentation.genders,
      ages: formData.segmentation.ages,
      genres: formData.segmentation.genres,
    },
  };
};
