// Tipos para las solicitudes de marketing
export interface MarketingRequest {
  id: string;
  title: string;
  tools: string[];
  budget: string;
  objective: string;
  timeline: string;
  status: "pending" | "in_progress" | "completed" | "rejected" | "approved";
  createdAt: string;
  updatedAt: string;
  progress?: number;
  notes: string;
  segmentation?: {
    countries: string[];
    genders: string[];
    ages: string[];
    genres: string[];
  };
}

// Tipos para los estándares de marketing
export interface MarketingStandard {
  platform: string;
  icon: string;
  description: string;
  color: string;
  terms: string[];
}

// Data de prueba para estándares
const mockMarketingStandards: MarketingStandard[] = [
  {
    platform: "Google Ads",
    icon: "📊",
    description: "Normas y condiciones de Google Ads para cuidar la comunidad",
    color: "from-blue-900/40 to-blue-800/40 border-blue-500/30",
    terms: [
      "Prohibido contenido engañoso o fraudulento",
      "Respeto a derechos de autor y propiedad intelectual",
      "No promoción de contenido inapropiado o ofensivo",
      "Cumplimiento de políticas de contenido musical",
      "Transparencia en información de contacto y términos",
      "Respeto a las políticas de privacidad de usuarios",
    ],
  },
  {
    platform: "Meta Ads",
    icon: "📱",
    description: "Normas y condiciones de Meta para cuidar la comunidad",
    color: "from-blue-900/40 to-purple-800/40 border-blue-500/30",
    terms: [
      "Prohibición de spam y contenido irrelevante",
      "Respeto a la privacidad y datos personales",
      "No discriminación en targeting publicitario",
      "Contenido apropiado para todas las edades",
      "Cumplimiento de estándares de la comunidad",
      "Verificación de identidad para anunciantes",
    ],
  },
  {
    platform: "TikTok Ads",
    icon: "🎵",
    description: "Normas y condiciones de TikTok Ads para cuidar la comunidad",
    color: "from-pink-900/40 to-red-800/40 border-pink-500/30",
    terms: [
      "Contenido original y creativo requerido",
      "Respeto a derechos musicales y licensing",
      "No contenido violento o inapropiado",
      "Cumplimiento de políticas de menores",
      "Transparencia en colaboraciones promocionales",
      "Respeto a las tendencias y cultura de la plataforma",
    ],
  },
  {
    platform: "Spotify Marquee",
    icon: "🎧",
    description:
      "Normas y condiciones de Spotify Marquee para cuidar la comunidad",
    color: "from-green-900/40 to-teal-800/40 border-green-500/30",
    terms: [
      "Solo contenido musical distribuido en Spotify",
      "Targeting basado en géneros y preferencias",
      "Presupuesto mínimo y máximo establecido",
      "Contenido promocional apropiado",
      "Cumplimiento de políticas de la plataforma",
      "Métricas transparentes y reportes detallados",
    ],
  },
];

// Función para obtener solicitudes de marketing desde la API
export const fetchMarketingRequests = async (): Promise<MarketingRequest[]> => {
  const response = await fetch("/api/marketing-requests", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Error al obtener solicitudes: ${error.error}`);
  }

  return await response.json();
};

// Función para obtener estándares de marketing
export const fetchMarketingStandards = async (): Promise<
  MarketingStandard[]
> => {
  // Simulación de delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Simulación de error ocasional
  if (Math.random() > 0.95) {
    throw new Error("Error simulado al obtener estándares de marketing");
  }

  return mockMarketingStandards;
};

// Función para crear una nueva solicitud (solo para compatibilidad)
export const createMarketingRequest = async (
  request: Omit<MarketingRequest, "id" | "createdAt" | "updatedAt">
): Promise<MarketingRequest> => {
  // Crear objeto temporal para compatibilidad
  const newRequest: MarketingRequest = {
    ...request,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return newRequest;
};

// Función para insertar datos en la tabla marketing de Supabase
export const insertMarketingData = async (formData: any) => {
  // Transformar los datos del formulario al formato de la tabla
  const marketingData = {
    ids_paises: formData.segmentation.countries,
    ids_generos: formData.segmentation.genders,
    ids_edades: formData.segmentation.ages,
    ids_generos_musicales: formData.segmentation.genres,
    monto: parseInt(formData.budget.replace(/\D/g, "")) || 0,
    descripcion: formData.additional_notes,
    id_estado: 1,
    id_usuario: "3f6427e4-78b4-476f-a442-0a6606f5db77",
  };

  // Llamar a la API route para insertar datos
  const response = await fetch("/api/marketing", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(marketingData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Error al insertar datos: ${error.error}`);
  }

  return await response.json();
};

// Función para enviar email de marketing
export const sendMarketingEmailAPI = async (formData: unknown) => {
  // Llamar a la API route para enviar email
  const response = await fetch("/api/marketing-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Error al enviar email: ${error.error}`);
  }

  return await response.json();
};

// Función principal para procesar solicitud de marketing
export const processMarketingRequest = async (formData: any) => {
  try {
    // 1. Insertar datos en Supabase
    const dbResult = await insertMarketingData(formData);

    // 2. Enviar email de notificación
    const emailResult = await sendMarketingEmailAPI(formData);

    // 3. Crear solicitud para el mock data
    const requestData = formatMarketingRequestForAPI(formData);
    const mockRequest = await createMarketingRequest(requestData);

    return {
      database: dbResult,
      email: emailResult,
      request: mockRequest,
    };
  } catch (error) {
    console.error("Error procesando solicitud:", error);
    throw error;
  }
};

// Función para formatear datos para API
const formatMarketingRequestForAPI = (formData: any) => {
  const selectedTools = Object.entries(formData.tools)
    .filter(([selected]) => selected)
    .map(([tool]) => {
      const toolNames: { [key: string]: string } = {
        googleAds: "Google Ads",
        marquee: "Spotify Marquee",
        meta: "Meta Ads",
        tiktokAds: "TikTok Ads",
        kali: "Kali",
        mediosDigitales: "Medios Digitales",
        mediosTradicionales: "Medios Tradicionales",
      };
      return toolNames[tool] || tool;
    });

  return {
    title: `Campaña Marketing - ${new Date().toLocaleDateString()}`,
    tools: selectedTools,
    budget: formData.budget || "No especificado",
    objective: "Promoción musical",
    timeline: "Por definir",
    status: "pending" as const,
    notes: formData.additional_notes || "Nueva solicitud creada.",
    segmentation: formData.segmentation,
  };
};
