"use client";

import { useState } from "react";
import MarketingNavigation from "@/components/marketing/MarketingNavigation";
import MarketingTabContent from "@/components/marketing/MarketingTabContent";

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState("solicitar");
  const [requests, setRequests] = useState([
    {
      id: "1",
      title: "Campaña Lanzamiento Álbum 'Neon Dreams'",
      tools: ["Google Ads", "Meta", "TikTok Ads"],
      budget: "$2,500 - $5,000",
      objective: "Incrementar streams",
      timeline: "Este mes",
      status: "in_progress" as const,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      progress: 65,
      notes:
        "Campaña ejecutándose según lo planificado. Resultados por encima de las expectativas.",
    },
    {
      id: "2",
      title: "Promoción Single 'Electric Soul'",
      tools: ["Spotify Marquee", "Meta"],
      budget: "$1,000 - $2,000",
      objective: "Reconocimiento de marca",
      timeline: "Esta semana",
      status: "completed" as const,
      createdAt: "2024-01-05",
      updatedAt: "2024-01-12",
      notes: "Campaña completada exitosamente. ROI del 340%.",
    },
    {
      id: "3",
      title: "Tour Promocional 2024",
      tools: ["Google Ads", "Medios Digitales", "Medios Tradicionales"],
      budget: "$10,000 - $15,000",
      objective: "Conversiones",
      timeline: "Este trimestre",
      status: "pending" as const,
      createdAt: "2024-01-22",
      updatedAt: "2024-01-22",
      notes: "Esperando aprobación de presupuesto del equipo de management.",
    },
    {
      id: "4",
      title: "Campaña TikTok Challenge #MidnightVibes",
      tools: ["TikTok Ads"],
      budget: "$500 - $1,000",
      objective: "Aumentar engagement",
      timeline: "Inmediato",
      status: "rejected" as const,
      createdAt: "2024-01-18",
      updatedAt: "2024-01-19",
      notes:
        "Rechazado por no cumplir con las políticas de contenido de TikTok.",
    },
  ]);

  const standardsData = [
    {
      platform: "Google Ads",
      icon: "📊",
      description:
        "Normas y condiciones de Google Ads para cuidar la comunidad",
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
      description:
        "Normas y condiciones de TikTok Ads para cuidar la comunidad",
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

  const handleSubmitRequest = (formData: any) => {
    const selectedTools = Object.entries(formData.tools || {})
      .filter(([_, selected]) => selected)
      .map(([tool, _]) => {
        switch (tool) {
          case "googleAds":
            return "Google Ads";
          case "marquee":
            return "Spotify Marquee";
          case "meta":
            return "Meta";
          case "tiktokAds":
            return "TikTok Ads";
          case "kali":
            return "Kali";
          case "mediosDigitales":
            return "Medios Digitales";
          case "mediosTradicionales":
            return "Medios Tradicionales";
          default:
            return tool;
        }
      });

    const newRequest = {
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
    };

    setRequests((prev) => [newRequest, ...prev]);
    setActiveTab("solicitudes");
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <MarketingNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <MarketingTabContent
        activeTab={activeTab}
        requestsData={requests}
        standardsData={standardsData}
        onSubmitRequest={handleSubmitRequest}
      />
    </div>
  );
}
