"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMarketingRequests } from "@/apis/marketingAPI";
import { LoadingSpinner } from "../ui/Loadings";


function ErrorMessage({
  error,
  onRetry,
}: {
  readonly error: Error;
  readonly onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="text-red-500 text-center">
        <h3 className="text-lg font-semibold mb-2">
          Error al cargar las solicitudes
        </h3>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Reintentar
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
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />;
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-500 mb-4">
            No tienes solicitudes de marketing aún
          </p>
          <p className="text-gray-400 text-sm">
            Crea tu primera solicitud desde la pestaña Solicitar
          </p>
        </div>
      </div>
    );
  }
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in_progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "completed":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-lg p-6 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Mis Solicitudes</h3>
              <p className="text-blue-200">
                Seguimiento de campañas de marketing • {requests.length}{" "}
                solicitudes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            status: "pending",
            count: (requests || []).filter((r) => r?.status === "pending")
              .length,
            color: "from-yellow-900/40 to-yellow-800/40 border-yellow-500/30",
          },
          {
            status: "approved",
            count: (requests || []).filter((r) => r?.status == "approved")
              .length,
            color: "from-green-900/40 to-green-800/40 border-green-500/30",
          },
          {
            status: "in_progress",
            count: (requests || []).filter((r) => r?.status === "in_progress")
              .length,
            color: "from-blue-900/40 to-blue-800/40 border-blue-500/30",
          },
          {
            status: "completed",
            count: (requests || []).filter((r) => r?.status === "completed")
              .length,
            color: "from-purple-900/40 to-purple-800/40 border-purple-500/30",
          },
          {
            status: "rejected",
            count: (requests || []).filter((r) => r?.status === "rejected")
              .length,
            color: "from-red-900/40 to-red-800/40 border-red-500/30",
          },
        ].map((item) => (
          <div
            key={item.status}
            className={`bg-gradient-to-br ${item.color} border rounded-lg p-4 text-center`}
          >
            <div className="text-2xl mb-2">{getStatusIcon(item.status)}</div>
            <div className="text-2xl font-bold text-white">{item.count}</div>
            <div className="text-sm text-gray-400">
              {getStatusText(item.status)}
            </div>
          </div>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {(requests || []).map((request) => (
          <div
            key={request.id}
            className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6 hover:bg-gray-800/90 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-lg font-semibold text-white">
                    {request.title}
                  </h4>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {getStatusIcon(request.status)}{" "}
                    {getStatusText(request.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Herramientas</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(request.tools || []).map((tool, index) => (
                        <span
                          key={index}
                          className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Presupuesto</p>
                    <p className="text-white font-medium">{request.budget}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Objetivo</p>
                    <p className="text-white font-medium">
                      {request.objective}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Timeline</p>
                    <p className="text-white font-medium">{request.timeline}</p>
                  </div>
                </div>

                {request.status === "in_progress" &&
                  request.progress !== undefined && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-gray-400">Progreso</p>
                        <span className="text-sm text-blue-400">
                          {request.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${request.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Creado: {request.createdAt}</span>
                  <span>Actualizado: {request.updatedAt}</span>
                </div>

                {request.notes && (
                  <div className="mt-3 p-3 bg-gray-700/30 rounded-lg">
                    <p className="text-sm text-gray-300">{request.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {(!requests || requests.length === 0) && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No hay solicitudes aún
          </h3>
          <p className="text-gray-400 mb-4">
            Comienza creando tu primera solicitud de marketing
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors">
            Crear Primera Solicitud
          </button>
        </div>
      )}
    </div>
  );
}
