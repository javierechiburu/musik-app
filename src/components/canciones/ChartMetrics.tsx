"use client";

interface ChartEntry {
  id: string;
  trackTitle: string;
  chartName: string;
  position: number;
  previousPosition?: number;
  peakPosition: number;
  weeksOnChart: number;
  country: string;
  platform: string;
  lastUpdated: string;
  trend: "up" | "down" | "stable";
}

interface ChartMetricsProps {
  chartsData: ChartEntry[];
}

export default function ChartMetrics({ chartsData }: ChartMetricsProps) {
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "spotify":
        return "bg-green-500/20 text-green-400";
      case "apple music":
        return "bg-gray-500/20 text-gray-400";
      case "billboard":
        return "bg-yellow-500/20 text-yellow-400";
      case "youtube":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-blue-500/20 text-blue-400";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "↗️";
      case "down":
        return "↘️";
      case "stable":
        return "➡️";
      default:
        return "➡️";
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-400";
      case "down":
        return "text-red-400";
      case "stable":
        return "text-gray-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-lg p-6 border border-yellow-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                Posiciones en Charts
              </h3>
              <p className="text-yellow-200">
                Ranking global y regional • {chartsData.length} entradas activas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/40 border border-yellow-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
              Top
            </span>
          </div>
          <h3 className="font-semibold text-yellow-200 mb-2">Mejor Posición</h3>
          <p className="text-3xl font-bold text-yellow-400 mb-1">
            #{Math.min(...chartsData.map((c) => c.peakPosition))}
          </p>
          <p className="text-sm text-yellow-300">posición histórica</p>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 border border-green-500/30 rounded-lg p-6">
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              +{chartsData.filter((c) => c.trend === "up").length}
            </span>
          </div>
          <h3 className="font-semibold text-green-200 mb-2">Subiendo</h3>
          <p className="text-3xl font-bold text-green-400 mb-1">
            {chartsData.filter((c) => c.trend === "up").length}
          </p>
          <p className="text-sm text-green-300">charts en ascenso</p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-500/30 rounded-lg p-6">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
              Prom
            </span>
          </div>
          <h3 className="font-semibold text-blue-200 mb-2">Semanas en Chart</h3>
          <p className="text-3xl font-bold text-blue-400 mb-1">
            {Math.round(
              chartsData.reduce((sum, c) => sum + c.weeksOnChart, 0) /
                chartsData.length
            )}
          </p>
          <p className="text-sm text-blue-300">semanas promedio</p>
        </div>

        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-500/30 rounded-lg p-6">
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
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
              Global
            </span>
          </div>
          <h3 className="font-semibold text-purple-200 mb-2">Países</h3>
          <p className="text-3xl font-bold text-purple-400 mb-1">
            {new Set(chartsData.map((c) => c.country)).size}
          </p>
          <p className="text-sm text-purple-300">mercados activos</p>
        </div>
      </div>

      {/* Charts Table */}
      <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700/50 border-b border-gray-600/50">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Track
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Chart
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Posición
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tendencia
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Pico
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Semanas
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  País
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actualizado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {chartsData.map((chart) => (
                <tr
                  key={chart.id}
                  className="hover:bg-gray-700/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
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
                            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {chart.trackTitle}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">
                        {chart.chartName}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getPlatformColor(
                          chart.platform
                        )}`}
                      >
                        {chart.platform}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-yellow-400">
                        #{chart.position}
                      </span>
                      {chart.previousPosition && (
                        <span className="text-xs text-gray-400">
                          (era #{chart.previousPosition})
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        {getTrendIcon(chart.trend)}
                      </span>
                      <span
                        className={`text-sm font-medium ${getTrendColor(
                          chart.trend
                        )}`}
                      >
                        {chart.trend === "up"
                          ? "Subiendo"
                          : chart.trend === "down"
                          ? "Bajando"
                          : "Estable"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-green-400 font-bold">
                      #{chart.peakPosition}
                    </div>
                    <div className="text-xs text-gray-400">mejor posición</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-white font-medium">
                      {chart.weeksOnChart}
                    </div>
                    <div className="text-xs text-gray-400">semanas</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-white">{chart.country}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-300 text-sm">
                      {chart.lastUpdated}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
