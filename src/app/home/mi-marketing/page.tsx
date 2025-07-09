export default function MiMarketingPage() {
  return (
    <div className="space-y-6">
      {/* Header del Dashboard de Marketing */}
      <div className="bg-gradient-to-r from-violet-900/50 to-fuchsia-900/50 rounded-lg shadow p-6 border border-violet-500/20">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
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
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Mi Marketing</h2>
            <p className="text-violet-200">
              Gestión de campañas • Meta Ads • Kali Music • Promoción directa
            </p>
          </div>
        </div>
      </div>

      {/* Métricas principales de marketing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
              Disponible
            </span>
          </div>
          <h3 className="font-semibold text-blue-200 mb-2">
            Presupuesto Restante
          </h3>
          <p className="text-3xl font-bold text-blue-400 mb-1">$87,450</p>
          <p className="text-sm text-blue-300">de $120,000 CLP</p>
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
              5 activas
            </span>
          </div>
          <h3 className="font-semibold text-purple-200 mb-2">
            Campañas Activas
          </h3>
          <p className="text-3xl font-bold text-purple-400 mb-1">8</p>
          <p className="text-sm text-purple-300">en diferentes plataformas</p>
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              +245%
            </span>
          </div>
          <h3 className="font-semibold text-green-200 mb-2">ROI Promedio</h3>
          <p className="text-3xl font-bold text-green-400 mb-1">3.4x</p>
          <p className="text-sm text-green-300">retorno de inversión</p>
        </div>

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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded-full">
              +89K reach
            </span>
          </div>
          <h3 className="font-semibold text-pink-200 mb-2">Alcance Total</h3>
          <p className="text-3xl font-bold text-pink-400 mb-1">234K</p>
          <p className="text-sm text-pink-300">personas alcanzadas</p>
        </div>
      </div>

      {/* Plataformas de Marketing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meta Ads (Facebook & Instagram) */}
        <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-500/30 rounded-lg p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Meta Ads</h3>
              <p className="text-sm text-blue-300">Facebook & Instagram</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Campañas Activas</span>
                <span className="text-sm font-bold text-blue-400">3</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Presupuesto Usado</span>
                <span className="text-sm font-bold text-white">$18,500</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Alcance Total</span>
                <span className="text-sm font-bold text-blue-400">89,450</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">
                    Summer Nights
                  </p>
                  <p className="text-xs text-gray-400">Facebook • Activa</p>
                </div>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  $6,200
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">Urban Pulse</p>
                  <p className="text-xs text-gray-400">Instagram • Activa</p>
                </div>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  $8,900
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">
                    Midnight City
                  </p>
                  <p className="text-xs text-gray-400">Stories • Finalizada</p>
                </div>
                <span className="text-xs bg-gray-500/20 text-gray-400 px-2 py-1 rounded-full">
                  $3,400
                </span>
              </div>
            </div>

            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Crear Campaña en Meta
            </button>
          </div>
        </div>

        {/* Kali Music */}
        <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border border-purple-500/30 rounded-lg p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
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
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Kali Music</h3>
              <p className="text-sm text-purple-300">Promoción especializada</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">
                  Promociones Activas
                </span>
                <span className="text-sm font-bold text-purple-400">2</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Inversión Total</span>
                <span className="text-sm font-bold text-white">$12,800</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Streams Generados</span>
                <span className="text-sm font-bold text-purple-400">
                  124,300
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">
                    Electric Dreams
                  </p>
                  <p className="text-xs text-gray-400">
                    Playlist Push • Activa
                  </p>
                </div>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  $7,500
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">Ocean Waves</p>
                  <p className="text-xs text-gray-400">
                    Blog Features • Activa
                  </p>
                </div>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  $5,300
                </span>
              </div>
            </div>

            <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-500/20">
              <p className="text-xs text-purple-300 mb-2">
                Próxima oportunidad
              </p>
              <p className="text-sm font-medium text-white mb-1">
                Editorial Playlist
              </p>
              <p className="text-xs text-gray-400">Disponible en 3 días</p>
            </div>

            <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
              Gestionar con Kali
            </button>
          </div>
        </div>

        {/* Promoción Directa */}
        <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-500/30 rounded-lg p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
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
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Promoción Directa
              </h3>
              <p className="text-sm text-green-300">Links y campañas propias</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Links Activos</span>
                <span className="text-sm font-bold text-green-400">5</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Clicks Totales</span>
                <span className="text-sm font-bold text-white">23,890</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Conversión</span>
                <span className="text-sm font-bold text-green-400">12.4%</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">
                    fader.ly/summer-nights
                  </p>
                  <p className="text-xs text-gray-400">Smart Link • Activo</p>
                </div>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  8.9K clicks
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">
                    fader.ly/urban-pulse
                  </p>
                  <p className="text-xs text-gray-400">Landing Page • Activo</p>
                </div>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  12.3K clicks
                </span>
              </div>
            </div>

            <div className="p-3 bg-gray-700/50 rounded-lg">
              <p className="text-sm font-medium text-white mb-2">
                Crear nuevo link promocional
              </p>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="URL de tu canción"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                />
                <button className="px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                  Crear
                </button>
              </div>
            </div>

            <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              Gestionar Links
            </button>
          </div>
        </div>
      </div>

      {/* Nueva Campaña */}
      <div className="bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20 border border-violet-500/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center mr-3">
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">
              Crear Nueva Campaña
            </h3>
          </div>
          <span className="text-sm bg-violet-500/20 text-violet-400 px-3 py-1 rounded-full">
            Máximo: $120,000 CLP
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulario de campaña */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Seleccionar Canción
              </label>
              <select className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white">
                <option>Summer Nights - DJ Phoenix</option>
                <option>Electric Dreams - Luna Rodriguez</option>
                <option>Ocean Waves - Acoustic Soul</option>
                <option>Urban Pulse - Street Beats</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Plataforma de Marketing
              </label>
              <div className="grid grid-cols-3 gap-3">
                <label className="flex items-center p-3 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    name="platform"
                    value="meta"
                    className="mr-2"
                  />
                  <span className="text-sm text-white">Meta Ads</span>
                </label>
                <label className="flex items-center p-3 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                  <input
                    type="radio"
                    name="platform"
                    value="kali"
                    className="mr-2"
                  />
                  <span className="text-sm text-white">Kali Music</span>
                </label>
                <label className="flex items-center p-3 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                  <input
                    type="radio"
                    name="platform"
                    value="direct"
                    className="mr-2"
                  />
                  <span className="text-sm text-white">Promoción Directa</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Presupuesto (CLP)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">$</span>
                <input
                  type="number"
                  placeholder="15000"
                  max="120000"
                  className="w-full pl-8 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                />
                <span className="absolute right-3 top-3 text-xs text-gray-400">
                  máx. $120,000
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Duración
              </label>
              <select className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white">
                <option>7 días</option>
                <option>14 días</option>
                <option>30 días</option>
                <option>60 días</option>
              </select>
            </div>
          </div>

          {/* Vista previa y objetivos */}
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">
                Objetivos Esperados
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">
                    Alcance estimado
                  </span>
                  <span className="text-sm text-white">25,000 - 35,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">
                    Clicks esperados
                  </span>
                  <span className="text-sm text-white">1,800 - 2,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">
                    Streams potenciales
                  </span>
                  <span className="text-sm text-green-400">850 - 1,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">ROI estimado</span>
                  <span className="text-sm text-green-400">2.1x - 3.5x</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">
                Audiencia Objetivo
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Rango de edad
                  </label>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm">
                    <option>18-35 años</option>
                    <option>25-45 años</option>
                    <option>16-28 años</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Ubicación
                  </label>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm">
                    <option>Chile</option>
                    <option>Latinoamérica</option>
                    <option>Global</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Intereses
                  </label>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm">
                    <option>Música Electrónica</option>
                    <option>Pop Latino</option>
                    <option>Hip-Hop</option>
                    <option>Música Alternativa</option>
                  </select>
                </div>
              </div>
            </div>

            <button className="w-full px-6 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:from-violet-700 hover:to-fuchsia-700 transition-all font-semibold text-lg">
              🚀 Lanzar Campaña
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
