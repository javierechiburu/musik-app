export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* Header del Dashboard */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg shadow p-6 border border-purple-500/20">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Music Analytics Dashboard
            </h2>
            <p className="text-purple-200">
              Análisis en tiempo real • Última actualización: hace 2 minutos
            </p>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-500/30 rounded-lg p-6 hover:border-blue-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <h3 className="font-semibold text-blue-200 mb-2">Reproducciones Totales</h3>
          <p className="text-3xl font-bold text-blue-400 mb-1">2,847,392</p>
          <p className="text-sm text-blue-300">vs mes anterior</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 border border-green-500/30 rounded-lg p-6 hover:border-green-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">+8.3%</span>
          </div>
          <h3 className="font-semibold text-green-200 mb-2">Usuarios Activos</h3>
          <p className="text-3xl font-bold text-green-400 mb-1">156,743</p>
          <p className="text-sm text-green-300">últimos 30 días</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">+2.1%</span>
          </div>
          <h3 className="font-semibold text-purple-200 mb-2">Tiempo Promedio</h3>
          <p className="text-3xl font-bold text-purple-400 mb-1">4:32</p>
          <p className="text-sm text-purple-300">por sesión</p>
        </div>

        <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/40 border border-orange-500/30 rounded-lg p-6 hover:border-orange-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">-1.2%</span>
          </div>
          <h3 className="font-semibold text-orange-200 mb-2">Canciones Favoritas</h3>
          <p className="text-3xl font-bold text-orange-400 mb-1">89,432</p>
          <p className="text-sm text-orange-300">agregadas hoy</p>
        </div>
      </div>

      {/* Métricas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Géneros Populares</h3>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <div className="space-y-3">
            {[
              { genre: "Pop", percentage: 34, color: "bg-pink-500" },
              { genre: "Rock", percentage: 28, color: "bg-red-500" },
              { genre: "Hip-Hop", percentage: 22, color: "bg-purple-500" },
              { genre: "Electronic", percentage: 16, color: "bg-blue-500" },
            ].map((item) => (
              <div key={item.genre} className="flex items-center justify-between">
                <span className="text-sm text-gray-300">{item.genre}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div className={`h-2 rounded-full ${item.color}`} style={{width: `${item.percentage}%`}}></div>
                  </div>
                  <span className="text-xs text-gray-400 w-8">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Top Artistas</h3>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="space-y-3">
            {[
              { artist: "Artist One", plays: "1.2M", change: "+15%" },
              { artist: "Artist Two", plays: "980K", change: "+8%" },
              { artist: "Artist Three", plays: "765K", change: "+12%" },
              { artist: "Artist Four", plays: "643K", change: "-2%" },
            ].map((item, index) => (
              <div key={item.artist} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xs bg-gray-700 text-gray-300 w-6 h-6 rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-300">{item.artist}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">{item.plays}</span>
                  <span className={`text-xs px-1 py-0.5 rounded ${
                    item.change.startsWith('+') ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20'
                  }`}>
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Dispositivos</h3>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="space-y-4">
            {[
              { device: "Móvil", percentage: 68, icon: "📱" },
              { device: "Desktop", percentage: 24, icon: "💻" },
              { device: "Tablet", percentage: 8, icon: "📟" },
            ].map((item) => (
              <div key={item.device} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm text-gray-300">{item.device}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500" 
                    style={{width: `${item.percentage}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección de gráficos y actividad */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Reproducciones por Hora</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded">24h</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">7d</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">30d</button>
            </div>
          </div>
          <div className="h-64 bg-gray-700/30 rounded-lg flex items-center justify-center border border-gray-600/50">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-gray-400">Gráfico de reproducciones</p>
              <p className="text-sm text-gray-500">Los datos se cargarán aquí</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Actividad en Tiempo Real</h3>
          <div className="space-y-4">
            {[
              { time: "Ahora", event: "🎵 'Bohemian Rhapsody' - 1,234 plays", color: "text-green-400" },
              { time: "2 min", event: "📈 Pico de usuarios: 15,678 conectados", color: "text-blue-400" },
              { time: "5 min", event: "🔥 Trending: 'New Song' subió al #3", color: "text-orange-400" },
              { time: "8 min", event: "⭐ Nuevo artista verificado", color: "text-purple-400" },
              { time: "12 min", event: "📊 API sincronizada exitosamente", color: "text-gray-400" },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors">
                <span className="text-xs text-gray-500 mt-1 w-12">{item.time}</span>
                <span className={`text-sm ${item.color} flex-1`}>{item.event}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg border border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-400">Estado del Sistema</p>
                <p className="text-xs text-green-300">Todos los servicios operativos</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}