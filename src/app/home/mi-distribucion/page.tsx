export default function MiDistribucionPage() {
  return (
    <div className="space-y-6">
      {/* Header del Dashboard de Distribución */}
      <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 rounded-lg shadow p-6 border border-orange-500/20">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Mi Distribución
            </h2>
            <p className="text-orange-200">
              Gestión completa con SonoSuite • Dashboard de distribución musical
            </p>
          </div>
        </div>
      </div>

      {/* Métricas principales de distribución */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 border border-green-500/30 rounded-lg p-6 hover:border-green-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">+18.5%</span>
          </div>
          <h3 className="font-semibold text-green-200 mb-2">Ingresos Total</h3>
          <p className="text-3xl font-bold text-green-400 mb-1">$847,230</p>
          <p className="text-sm text-green-300">CLP este mes</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-500/30 rounded-lg p-6 hover:border-blue-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">12 activos</span>
          </div>
          <h3 className="font-semibold text-blue-200 mb-2">Tracks Distribuidos</h3>
          <p className="text-3xl font-bold text-blue-400 mb-1">47</p>
          <p className="text-sm text-blue-300">en plataformas</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">+124%</span>
          </div>
          <h3 className="font-semibold text-purple-200 mb-2">Reproducciones</h3>
          <p className="text-3xl font-bold text-purple-400 mb-1">2.4M</p>
          <p className="text-sm text-purple-300">último mes</p>
        </div>

        <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/40 border border-orange-500/30 rounded-lg p-6 hover:border-orange-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">45 países</span>
          </div>
          <h3 className="font-semibold text-orange-200 mb-2">Alcance Global</h3>
          <p className="text-3xl font-bold text-orange-400 mb-1">89%</p>
          <p className="text-sm text-orange-300">cobertura mundial</p>
        </div>
      </div>

      {/* Dashboard principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ingresos por Plataforma */}
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Ingresos por Plataforma</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-400">SonoSuite Connected</span>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { platform: "Spotify", revenue: "$324,580", percentage: 38.3, streams: "1.2M", color: "bg-green-500" },
              { platform: "Apple Music", revenue: "$198,450", percentage: 23.4, streams: "780K", color: "bg-gray-500" },
              { platform: "YouTube Music", revenue: "$145,220", percentage: 17.1, streams: "650K", color: "bg-red-500" },
              { platform: "Amazon Music", revenue: "$89,340", percentage: 10.5, streams: "420K", color: "bg-blue-500" },
              { platform: "Deezer", revenue: "$52,180", percentage: 6.2, streams: "280K", color: "bg-orange-500" },
              { platform: "Tidal", revenue: "$37,460", percentage: 4.5, streams: "150K", color: "bg-cyan-500" },
            ].map((item) => (
              <div key={item.platform} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-medium text-white">{item.platform}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-400">{item.revenue}</p>
                    <p className="text-xs text-gray-400">{item.streams} streams</p>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${item.color}`} 
                    style={{width: `${item.percentage}%`}}
                  ></div>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">{item.percentage}%</span>
                  <span className="text-xs text-gray-400">del total</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tracks en Distribución */}
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Mis Tracks</h3>
            <button className="px-3 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700 transition-colors">
              Subir Nueva Canción
            </button>
          </div>
          <div className="space-y-4">
            {[
              { title: "Summer Nights", status: "Distribuido", platforms: 18, revenue: "$45,230", trend: "+12%" },
              { title: "Electric Dreams", status: "Procesando", platforms: 0, revenue: "$0", trend: "Nuevo" },
              { title: "Midnight City", status: "Distribuido", platforms: 18, revenue: "$38,450", trend: "+8%" },
              { title: "Ocean Waves", status: "Distribuido", platforms: 18, revenue: "$52,180", trend: "+24%" },
              { title: "Urban Pulse", status: "Pendiente", platforms: 0, revenue: "$0", trend: "Revisión" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.status === 'Distribuido' ? 'bg-green-500/20 text-green-400' :
                        item.status === 'Procesando' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {item.status}
                      </span>
                      {item.platforms > 0 && (
                        <span className="text-xs text-gray-400">{item.platforms} plataformas</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{item.revenue}</p>
                  <p className={`text-xs ${
                    item.trend.startsWith('+') ? 'text-green-400' : 
                    item.trend === 'Nuevo' || item.trend === 'Revisión' ? 'text-gray-400' : 'text-red-400'
                  }`}>
                    {item.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Detallado y SonoSuite Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Performance Timeline</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-orange-600 text-white text-xs rounded">30d</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">90d</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">1y</button>
            </div>
          </div>
          <div className="h-64 bg-gray-700/30 rounded-lg flex items-center justify-center border border-gray-600/50">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              <p className="text-gray-400">Ingresos y Reproducciones</p>
              <p className="text-sm text-gray-500">Análisis temporal de performance</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">SonoSuite Dashboard</h3>
          <div className="space-y-4">
            <div className="p-4 bg-orange-900/30 rounded-lg border border-orange-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-orange-400">Estado de Cuenta</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-lg font-bold text-white">Activo</p>
              <p className="text-xs text-orange-300">Último sync: hace 2 min</p>
            </div>
            
            <div className="p-4 bg-gray-700/50 rounded-lg">
              <p className="text-sm font-medium text-gray-300 mb-1">Balance Pendiente</p>
              <p className="text-xl font-bold text-green-400">$127,890</p>
              <p className="text-xs text-gray-400">Próximo pago: 15 Nov</p>
            </div>
            
            <div className="p-4 bg-gray-700/50 rounded-lg">
              <p className="text-sm font-medium text-gray-300 mb-1">Comisión SonoSuite</p>
              <p className="text-lg font-bold text-white">15%</p>
              <p className="text-xs text-gray-400">Estándar para distribución</p>
            </div>
            
            <button className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm">
              Ver Reporte Detallado
            </button>
          </div>
        </div>
      </div>

      {/* Geografía y Estadísticas Avanzadas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Top Países por Ingresos</h3>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">Global</span>
          </div>
          <div className="space-y-4">
            {[
              { country: "Estados Unidos", flag: "🇺🇸", revenue: "$298,450", percentage: 35.2 },
              { country: "Reino Unido", flag: "🇬🇧", revenue: "$134,280", percentage: 15.8 },
              { country: "Alemania", flag: "🇩🇪", revenue: "$89,120", percentage: 10.5 },
              { country: "Francia", flag: "🇫🇷", revenue: "$67,890", percentage: 8.0 },
              { country: "Chile", flag: "🇨🇱", revenue: "$45,230", percentage: 5.3 },
              { country: "Otros", flag: "🌍", revenue: "$212,260", percentage: 25.2 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{item.flag}</span>
                  <span className="text-sm font-medium text-white">{item.country}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-400">{item.revenue}</p>
                  <p className="text-xs text-gray-400">{item.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Configuración de Distribución</h3>
            <button className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-500 transition-colors">
              Editar
            </button>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-700/50 rounded-lg">
              <p className="text-sm font-medium text-gray-300 mb-2">Plataformas Activas</p>
              <div className="grid grid-cols-3 gap-2">
                {["Spotify", "Apple", "YouTube", "Amazon", "Deezer", "Tidal"].map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-400">{platform}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-gray-700/50 rounded-lg">
              <p className="text-sm font-medium text-gray-300 mb-2">Configuración de Release</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Auto-distribute</span>
                  <span className="text-xs text-green-400">Activo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Pre-save campaigns</span>
                  <span className="text-xs text-green-400">Activo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Smart linking</span>
                  <span className="text-xs text-green-400">Activo</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-orange-900/30 rounded-lg border border-orange-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-400">SonoSuite Pro</p>
                  <p className="text-xs text-orange-300">Plan actual activo</p>
                </div>
                <button className="px-3 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700 transition-colors">
                  Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}