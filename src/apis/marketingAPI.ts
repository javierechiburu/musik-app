import { axiosInstance } from "@/config/axios/axiosInstance";

// Tipos para las solicitudes de marketing
export interface MarketingRequest {
  id: string;
  title: string;
  tools: string[];
  budget: string;
  objective: string;
  timeline: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
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

// Data de prueba para requests
const mockMarketingRequests: MarketingRequest[] = [
  {
    id: "1",
    title: "Campaña Lanzamiento Álbum 'Neon Dreams'",
    tools: ["Google Ads", "Meta", "TikTok Ads"],
    budget: "$2,500 - $5,000",
    objective: "Incrementar streams",
    timeline: "Este mes",
    status: "in_progress",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    progress: 65,
    notes: "Campaña ejecutándose según lo planificado. Resultados por encima de las expectativas.",
    segmentation: {
      countries: ["Estados Unidos", "México", "España"],
      genders: ["Mujer", "Hombre"],
      ages: ["18-24", "24-34"],
      genres: ["Pop", "Electronic Pop"]
    }
  },
  {
    id: "2",
    title: "Promoción Single 'Electric Soul'",
    tools: ["Spotify Marquee", "Meta"],
    budget: "$1,000 - $2,000",
    objective: "Reconocimiento de marca",
    timeline: "Esta semana",
    status: "completed",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-12",
    notes: "Campaña completada exitosamente. ROI del 340%.",
    segmentation: {
      countries: ["Chile", "Argentina", "Colombia"],
      genders: ["Mujer", "Hombre", "No binario"],
      ages: ["24-34", "34-44"],
      genres: ["Electronic", "Dance"]
    }
  },
  {
    id: "3",
    title: "Tour Promocional 2024",
    tools: ["Google Ads", "Medios Digitales", "Medios Tradicionales"],
    budget: "$10,000 - $15,000",
    objective: "Conversiones",
    timeline: "Este trimestre",
    status: "pending",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-22",
    notes: "Esperando aprobación de presupuesto del equipo de management.",
    segmentation: {
      countries: ["Estados Unidos", "Canadá", "Reino Unido"],
      genders: ["Mujer", "Hombre"],
      ages: ["18-24", "24-34", "34-44"],
      genres: ["Rock", "Pop Rock", "Alternative"]
    }
  },
  {
    id: "4",
    title: "Campaña TikTok Challenge #MidnightVibes",
    tools: ["TikTok Ads"],
    budget: "$500 - $1,000",
    objective: "Aumentar engagement",
    timeline: "Inmediato",
    status: "rejected",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-19",
    notes: "Rechazado por no cumplir con las políticas de contenido de TikTok.",
    segmentation: {
      countries: ["Estados Unidos", "México", "Brasil"],
      genders: ["Mujer", "Hombre", "No binario"],
      ages: ["18-24"],
      genres: ["Pop", "Electronic", "Dance"]
    }
  },
];

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
    description: "Normas y condiciones de Spotify Marquee para cuidar la comunidad",
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

// Función para obtener solicitudes de marketing
export const fetchMarketingRequests = async (): Promise<MarketingRequest[]> => {
  // Simulación de delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulación de error ocasional
  if (Math.random() > 0.9) {
    throw new Error("Error simulado al obtener solicitudes de marketing");
  }
  
  return mockMarketingRequests;
};

// Función para obtener estándares de marketing
export const fetchMarketingStandards = async (): Promise<MarketingStandard[]> => {
  // Simulación de delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Simulación de error ocasional
  if (Math.random() > 0.95) {
    throw new Error("Error simulado al obtener estándares de marketing");
  }
  
  return mockMarketingStandards;
};

// Función para obtener una solicitud específica
export const fetchMarketingRequest = async (id: string): Promise<MarketingRequest | null> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const request = mockMarketingRequests.find(req => req.id === id);
  return request || null;
};

// Función para crear una nueva solicitud
export const createMarketingRequest = async (request: Omit<MarketingRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<MarketingRequest> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulación de error ocasional
  if (Math.random() > 0.8) {
    throw new Error("Error simulado al crear solicitud de marketing");
  }
  
  const newRequest: MarketingRequest = {
    ...request,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  // En una aplicación real, esto se guardaría en la base de datos
  mockMarketingRequests.unshift(newRequest);
  
  return newRequest;
};

// Función para actualizar una solicitud
export const updateMarketingRequest = async (id: string, updates: Partial<MarketingRequest>): Promise<MarketingRequest> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const index = mockMarketingRequests.findIndex(req => req.id === id);
  if (index === -1) {
    throw new Error("Solicitud no encontrada");
  }
  
  const updatedRequest = {
    ...mockMarketingRequests[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  mockMarketingRequests[index] = updatedRequest;
  
  return updatedRequest;
};

// Función para eliminar una solicitud
export const deleteMarketingRequest = async (id: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const index = mockMarketingRequests.findIndex(req => req.id === id);
  if (index === -1) {
    throw new Error("Solicitud no encontrada");
  }
  
  mockMarketingRequests.splice(index, 1);
  return true;
};