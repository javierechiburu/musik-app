export default function MisLanzamientosPage() {
  return (
    <div className="space-y-6">
      {/* Header del Dashboard de Lanzamientos */}
      <div className="bg-gradient-to-r from-pink-900/50 to-purple-900/50 rounded-lg shadow p-6 border border-pink-500/20">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
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
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Mis Lanzamientos</h2>
            <p className="text-pink-200">
              Gestión de releases y campañas • Tracking de performance musical
            </p>
          </div>
        </div>
      </div>

      {/* Métricas principales de lanzamientos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/40 border border-pink-500/30 rounded-lg p-6 hover:border-pink-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-pink-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
            <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded-full">
              12 activos
            </span>
          </div>
          <h3 className="font-semibold text-pink-200 mb-2">
            Total Lanzamientos
          </h3>
          <p className="text-3xl font-bold text-pink-400 mb-1">24</p>
          <p className="text-sm text-pink-300">este año</p>
        </div>

        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </div>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              8 activas
            </span>
          </div>
          <h3 className="font-semibold text-purple-200 mb-2">
            Campañas Activas
          </h3>
          <p className="text-3xl font-bold text-purple-400 mb-1">15</p>
          <p className="text-sm text-purple-300">en curso</p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-500/30 rounded-lg p-6 hover:border-blue-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
              +87%
            </span>
          </div>
          <h3 className="font-semibold text-blue-200 mb-2">
            Performance Promedio
          </h3>
          <p className="text-3xl font-bold text-blue-400 mb-1">8.4/10</p>
          <p className="text-sm text-blue-300">score general</p>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 border border-green-500/30 rounded-lg p-6 hover:border-green-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              ROI +156%
            </span>
          </div>
          <h3 className="font-semibold text-green-200 mb-2">
            Inversión Marketing
          </h3>
          <p className="text-3xl font-bold text-green-400 mb-1">$89K</p>
          <p className="text-sm text-green-300">este año</p>
        </div>
      </div>

      {/* Lanzamientos Recientes */}
      <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">
            Lanzamientos Recientes
          </h3>
          <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
            Nuevo Lanzamiento
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[
            {
              title: "Summer Nights",
              artist: "DJ Phoenix",
              date: "15 Oct 2024",
              status: "Activo",
              campaign: true,
              streams: "234K",
              revenue: "$4,560",
              platforms: ["Spotify", "Apple Music", "YouTube Music"],
              image: "gradient-blue",
            },
            {
              title: "Electric Dreams",
              artist: "Luna Rodriguez",
              date: "8 Oct 2024",
              status: "Sin Campaña",
              campaign: false,
              streams: "89K",
              revenue: "$1,780",
              platforms: ["Spotify", "Apple Music"],
              image: "gradient-purple",
            },
            {
              title: "Midnight City",
              artist: "The Collective",
              date: "1 Oct 2024",
              status: "Campaña Finalizada",
              campaign: true,
              streams: "456K",
              revenue: "$8,920",
              platforms: [
                "Spotify",
                "Apple Music",
                "YouTube Music",
                "Amazon Music",
              ],
              image: "gradient-green",
            },
            {
              title: "Ocean Waves",
              artist: "Acoustic Soul",
              date: "25 Sep 2024",
              status: "Sin Campaña",
              campaign: false,
              streams: "67K",
              revenue: "$1,340",
              platforms: ["Spotify", "Apple Music"],
              image: "gradient-cyan",
            },
            {
              title: "Urban Pulse",
              artist: "Street Beats",
              date: "18 Sep 2024",
              status: "Activo",
              campaign: true,
              streams: "312K",
              revenue: "$6,240",
              platforms: ["Spotify", "Apple Music", "YouTube Music"],
              image: "gradient-orange",
            },
            {
              title: "Peaceful Mind",
              artist: "Zen Harmony",
              date: "12 Sep 2024",
              status: "Sin Campaña",
              campaign: false,
              streams: "45K",
              revenue: "$890",
              platforms: ["Spotify"],
              image: "gradient-indigo",
            },
          ].map((release, index) => (
            <div
              key={index}
              className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors"
            >
              {/* Album Cover Placeholder */}
              <div
                className={`w-full h-32 ${
                  release.image === "gradient-blue"
                    ? "bg-gradient-to-br from-blue-400 to-blue-600"
                    : release.image === "gradient-purple"
                    ? "bg-gradient-to-br from-purple-400 to-purple-600"
                    : release.image === "gradient-green"
                    ? "bg-gradient-to-br from-green-400 to-green-600"
                    : release.image === "gradient-cyan"
                    ? "bg-gradient-to-br from-cyan-400 to-cyan-600"
                    : release.image === "gradient-orange"
                    ? "bg-gradient-to-br from-orange-400 to-orange-600"
                    : "bg-gradient-to-br from-indigo-400 to-indigo-600"
                } rounded-lg mb-4 flex items-center justify-center`}
              >
                <svg
                  className="w-8 h-8 text-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>

              {/* Release Info */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-white">{release.title}</h4>
                  <p className="text-sm text-gray-400">{release.artist}</p>
                  <p className="text-xs text-gray-500">{release.date}</p>
                </div>

                {/* Campaign Status */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      release.status === "Activo"
                        ? "bg-green-500/20 text-green-400"
                        : release.status === "Sin Campaña"
                        ? "bg-gray-500/20 text-gray-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {release.status}
                  </span>
                  {!release.campaign && (
                    <button className="text-xs text-pink-400 hover:text-pink-300 transition-colors">
                      Crear Campaña
                    </button>
                  )}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-800/50 rounded p-2">
                    <p className="text-xs text-gray-400">Streams</p>
                    <p className="text-sm font-semibold text-white">
                      {release.streams}
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded p-2">
                    <p className="text-xs text-gray-400">Revenue</p>
                    <p className="text-sm font-semibold text-green-400">
                      {release.revenue}
                    </p>
                  </div>
                </div>

                {/* Platforms */}
                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    Plataformas ({release.platforms.length})
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {release.platforms.map((platform, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-600/50 text-gray-300 px-2 py-1 rounded"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sin Campaña - Recomendación */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tracks Sin Marketing */}
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Tracks Sin Marketing
            </h3>
            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
              ⚠️ Necesita Atención
            </span>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Electric Dreams",
                potential: "Alto",
                reason: "Crecimiento orgánico +45%",
              },
              {
                title: "Ocean Waves",
                potential: "Medio",
                reason: "Buen engagement inicial",
              },
              {
                title: "Peaceful Mind",
                potential: "Bajo",
                reason: "Performance estable",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 border border-gray-600/50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">{item.title}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.potential === "Alto"
                        ? "bg-green-500/20 text-green-400"
                        : item.potential === "Medio"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    Potencial {item.potential}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{item.reason}</p>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all">
                  🚀 Crear Campaña de Marketing
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing Recommendations */}
        <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 border border-pink-500/30 rounded-lg p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">
              Impulsa Tu Música
            </h3>
          </div>

          <div className="space-y-4">
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                ¿Listo para hacer marketing?
              </h4>
              <p className="text-gray-400 mb-6">
                Impulsa tus lanzamientos con campañas profesionales
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span className="text-sm text-gray-300">
                  Ads en Meta (Facebook & Instagram)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-sm text-gray-300">
                  Promoción con Kali Music
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm text-gray-300">
                  Promoción directa con link
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-300">
                  Presupuesto máximo: $120,000 CLP
                </span>
              </div>
            </div>

            <button className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all font-semibold">
              Comenzar Campaña de Marketing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
