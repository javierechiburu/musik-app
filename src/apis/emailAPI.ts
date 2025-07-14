
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



