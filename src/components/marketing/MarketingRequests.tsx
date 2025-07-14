"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMarketingRequests } from "@/apis/marketingAPI";
import { LoadingSpinner } from "../ui/Loadings";
import HeaderPage from "../ui/HeaderPage";

function ErrorMessage({
  error,
  onRetry,
}: {
  readonly error: Error;
  readonly onRetry: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[400px] space-y-4"
      style={{
        background:
          "linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)",
      }}
    >
      <div
        className="text-center p-8 rounded-2xl border backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderColor: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2 className="text-xl font-semibold mb-2" style={{ color: "#F0F6FC" }}>
          Error al cargar las solicitudes
        </h2>
        <p className="mb-4" style={{ color: "#8B949E" }}>
          {error.message}
        </p>
        <button
          onClick={onRetry}
          className="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:-translate-y-1"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#FFFFFF",
            boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)",
          }}
        >
          🔄 Reintentar
        </button>
      </div>
    </div>
  );
}

export default function MarketingRequests() {
  const {
    data: requests,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["marketing-requests"],
    queryFn: fetchMarketingRequests,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "from-yellow-500/20 to-orange-500/20 border-yellow-500/30";
      case "approved":
        return "from-green-500/20 to-emerald-500/20 border-green-500/30";
      case "in_progress":
        return "from-blue-500/20 to-cyan-500/20 border-blue-500/30";
      case "completed":
        return "from-purple-500/20 to-violet-500/20 border-purple-500/30";
      case "rejected":
        return "from-red-500/20 to-pink-500/20 border-red-500/30";
      default:
        return "from-gray-500/20 to-slate-500/20 border-gray-500/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "approved":
        return "Aprobado";
      case "in_progress":
        return "En Progreso";
      case "completed":
        return "Completado";
      case "rejected":
        return "Rechazado";
      default:
        return "Desconocido";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "approved":
        return "✅";
      case "in_progress":
        return "🔄";
      case "completed":
        return "🎉";
      case "rejected":
        return "❌";
      default:
        return "❓";
    }
  };

  if (!requests || requests.length === 0) {
    return (
      <div className="space-y-6">
        <HeaderPage overlayColor="blue">
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(145deg, #3B82F6 0%, #1D4ED8 100%)",
                    boxShadow: "0 8px 16px rgba(59, 130, 246, 0.3)",
                    border: "3px solid rgba(59, 130, 246, 0.2)",
                  }}
                >
                  <span className="text-6xl">📋</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Mis Solicitudes de Marketing
                  </h3>
                  <p className="text-blue-100">
                    Seguimiento de campañas • 0 solicitudes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </HeaderPage>

        <div
          className="bg-gradient-to-br from-gray-900/80 to-blue-900/20 backdrop-blur rounded-xl p-12 text-center border border-blue-500/30"
          style={{ boxShadow: "0 8px 32px rgba(59, 130, 246, 0.15)" }}
        >
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No hay solicitudes aún
          </h3>
          <p className="text-gray-400 mb-6">
            Comienza creando tu primera solicitud de marketing desde la pestaña
            Solicitar
          </p>
        </div>
      </div>
    );
  }

  // Estadísticas de estado
  const statusStats = [
    {
      status: "pending",
      count: requests.filter((r) => r.status === "pending").length,
      label: "Pendientes",
      icon: "⏳",
    },
    {
      status: "approved",
      count: requests.filter((r) => r.status === "approved").length,
      label: "Aprobadas",
      icon: "✅",
    },
    {
      status: "in_progress",
      count: requests.filter((r) => r.status === "in_progress").length,
      label: "En Progreso",
      icon: "🔄",
    },
    {
      status: "completed",
      count: requests.filter((r) => r.status === "completed").length,
      label: "Completadas",
      icon: "🎉",
    },
    {
      status: "rejected",
      count: requests.filter((r) => r.status === "rejected").length,
      label: "Rechazadas",
      icon: "❌",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Profile Section */}
      <HeaderPage overlayColor="blue">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Mis Solicitudes de Marketing
                </h3>
                <p className="text-blue-100">
                  Seguimiento de campañas • {requests.length} solicitudes
                </p>
              </div>
            </div>
          </div>

          {/* Status badges */}
          <div className="flex items-center space-x-3 mt-4">
            <span
              className="text-xs px-3 py-1 rounded-full bg-white text-gray-800"
              style={{
                border: "1px solid #60A5FA",
              }}
            >
              📊 Panel Activo
            </span>
            <span
              className="text-xs px-3 py-1 rounded-full bg-white text-gray-800"
              style={{
                border: "1px solid #60A5FA",
              }}
            >
              🔄 Actualizado
            </span>
          </div>
        </div>
      </HeaderPage>

      {/* Status Summary Metrics */}
      <div
        className="bg-gradient-to-r from-indigo-900/20 to-blue-900/20 rounded-xl border border-blue-500/30 p-6"
        style={{ boxShadow: "0 8px 32px rgba(59, 130, 246, 0.15)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {statusStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-sm text-gray-100 mb-2 font-medium">
                {stat.label}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.count}
              </div>
              <div className="text-xs text-gray-500">Solicitudes</div>
            </div>
          ))}
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-gradient-to-br from-violet-900/20 to-indigo-900/20 backdrop-blur border border-sky-500/40 rounded-xl p-6 shadow-md"
            style={{ boxShadow: "0 8px 32px rgba(59, 130, 246, 0.15)" }}
          >
            {/* Header de la solicitud */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white mb-2">
                  {request.title}
                </h4>
                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border bg-gradient-to-r ${getStatusColor(request.status)}`}
                  >
                    {getStatusIcon(request.status)}{" "}
                    {getStatusText(request.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Información principal */}
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div
                className="bg-gray-800/80 rounded-lg p-4 border border-blue-500/20"
                style={{ boxShadow: "0 4px 16px rgba(59, 130, 246, 0.1)" }}
              >
                <p className="text-sm text-white mb-2">💰 Presupuesto</p>
                <p className="text-white font-semibold text-lg">
                  {request.budget}
                </p>
              </div>
            </div>

            {/* Herramientas */}
            <div className="mb-4">
              <p className="text-sm text-white mb-2">🚀 Herramientas</p>
              <div className="flex flex-wrap gap-2">
                {request.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Segmentación */}
            <div className="mb-4">
              <p className="text-sm text-white mb-3">🎯 Segmentación</p>
              <div className="grid grid-cols-2 gap-3">
                {request.segmentation &&
                  request.segmentation.countries.length > 0 && (
                    <div className="bg-gray-700/30 rounded-lg p-3">
                      <p className="text-xs text-white mb-1">🌍 Países</p>
                      <div className="flex flex-wrap gap-1">
                        {request.segmentation.countries
                          .slice(0, 3)
                          .map((country, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded"
                            >
                              {country}
                            </span>
                          ))}
                        {request.segmentation.countries.length > 3 && (
                          <span className="text-xs text-white">
                            +{request.segmentation.countries.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                {request.segmentation &&
                  request.segmentation.ages.length > 0 && (
                    <div className="bg-gray-700/30 rounded-lg p-3">
                      <p className="text-xs text-white mb-1">👥 Edades</p>
                      <div className="flex flex-wrap gap-1">
                        {request.segmentation.ages.map((age, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded"
                          >
                            {age}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {request.segmentation &&
                  request.segmentation.genders.length > 0 && (
                    <div className="bg-gray-700/30 rounded-lg p-3">
                      <p className="text-xs text-white mb-1">⚧️ Géneros</p>
                      <div className="flex flex-wrap gap-1">
                        {request.segmentation.genders.map((gender, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-purple-600/20 text-purple-400 px-2 py-1 rounded"
                          >
                            {gender}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {request.segmentation &&
                  request.segmentation.genres.length > 0 && (
                    <div className="bg-gray-700/30 rounded-lg p-3">
                      <p className="text-xs text-white mb-1">
                        🎵 Géneros Musicales
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {request.segmentation.genres
                          .slice(0, 2)
                          .map((genre, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-pink-600/20 text-pink-400 px-2 py-1 rounded"
                            >
                              {genre}
                            </span>
                          ))}
                        {request.segmentation.genres.length > 2 && (
                          <span className="text-xs text-gray-400">
                            +{request.segmentation.genres.length - 2} más
                          </span>
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Progreso para solicitudes en progreso */}
            {request.status === "in_progress" &&
              request.progress !== undefined && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-white">📈 Progreso</p>
                    <span className="text-sm text-blue-400">
                      {request.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${request.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

            {/* Notas */}
            {request.notes && (
              <div className="mb-4">
                <p className="text-sm text-white mb-2">📝 Notas</p>
                <div className="bg-gray-700/30 rounded-lg p-3">
                  <p className="text-sm text-gray-300">{request.notes}</p>
                </div>
              </div>
            )}

            {/* Footer con fechas */}
            <div className="flex items-center justify-between text-xs text-white pt-4 border-t border-gray-700/50">
              <span>📅 Creado: {request.createdAt}</span>
              <span>🔄 Actualizado: {request.updatedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
