export default function ArtistasPage() {
  return (
    <div className="space-y-6">
      {/* Header del Dashboard de Artistas */}
      <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg shadow p-6 border border-purple-500/20">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Artist Analytics
            </h2>
            <p className="text-purple-200">
              Análisis detallado de artistas • Powered by Chartmetric API
            </p>
          </div>
        </div>
      </div>

      {/* Métricas principales de artistas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-500/30 rounded-lg p-6 hover:border-blue-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">+15.8%</span>
          </div>
          <h3 className="font-semibold text-blue-200 mb-2">Artistas Activos</h3>
          <p className="text-3xl font-bold text-blue-400 mb-1">12,847</p>
          <p className="text-sm text-blue-300">en seguimiento</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 border border-green-500/30 rounded-lg p-6 hover:border-green-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">+8.3%</span>
          </div>
          <h3 className="font-semibold text-green-200 mb-2">Artistas Verificados</h3>
          <p className="text-3xl font-bold text-green-400 mb-1">8,234</p>
          <p className="text-sm text-green-300">certificados</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">+12.1%</span>
          </div>
          <h3 className="font-semibold text-purple-200 mb-2">Tendencia Promedio</h3>
          <p className="text-3xl font-bold text-purple-400 mb-1">+5.4%</p>
          <p className="text-sm text-purple-300">crecimiento mensual</p>
        </div>

        <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/40 border border-orange-500/30 rounded-lg p-6 hover:border-orange-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">+23.7%</span>
          </div>
          <h3 className="font-semibold text-orange-200 mb-2">Nuevos Lanzamientos</h3>
          <p className="text-3xl font-bold text-orange-400 mb-1">1,432</p>
          <p className="text-sm text-orange-300">esta semana</p>
        </div>
      </div>

      {/* Secciones principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Artists por Streaming */}
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Top Artists - Streaming</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded">Spotify</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">Apple</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">YouTube</button>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { artist: "Bad Bunny", streams: "2.1B", change: "+15%", chartmetric: 95 },
              { artist: "Taylor Swift", streams: "1.8B", change: "+8%", chartmetric: 98 },
              { artist: "The Weeknd", streams: "1.5B", change: "+12%", chartmetric: 92 },
              { artist: "Drake", streams: "1.3B", change: "-2%", chartmetric: 89 },
              { artist: "Billie Eilish", streams: "1.1B", change: "+18%", chartmetric: 94 },
            ].map((item, index) => (
              <div key={item.artist} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
                <div className="flex items-center space-x-4">
                  <span className="text-sm bg-gray-600 text-gray-300 w-8 h-8 rounded-full flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {item.artist.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.artist}</p>
                    <p className="text-sm text-gray-400">Chartmetric Score: {item.chartmetric}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{item.streams}</p>
                    <p className="text-xs text-gray-400">streams</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.change.startsWith('+') ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20'
                  }`}>
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Artist Social Media Performance */}
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Social Media Performance</h3>
            <button className="px-3 py-1 bg-pink-600 text-white text-xs rounded">TikTok</button>
          </div>
          <div className="space-y-4">
            {[
              { artist: "Olivia Rodrigo", platform: "TikTok", followers: "12.3M", engagement: "8.4%" },
              { artist: "Lil Nas X", platform: "TikTok", followers: "23.1M", engagement: "6.7%" },
              { artist: "Doja Cat", platform: "TikTok", followers: "18.5M", engagement: "9.2%" },
              { artist: "Harry Styles", platform: "TikTok", followers: "9.8M", engagement: "7.1%" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {item.artist.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.artist}</p>
                    <p className="text-sm text-gray-400">{item.platform}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{item.followers}</p>
                  <p className="text-xs text-pink-400">{item.engagement} engagement</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Performance y Análisis Detallado */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Artist Chart Performance</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-green-600 text-white text-xs rounded">Global</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">US</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">UK</button>
            </div>
          </div>
          <div className="h-64 bg-gray-700/30 rounded-lg flex items-center justify-center border border-gray-600/50">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-400">Chart Performance Timeline</p>
              <p className="text-sm text-gray-500">Integración con Chartmetric API</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Análisis por Plataforma</h3>
          <div className="space-y-4">
            {[
              { platform: "Spotify", artists: "8,234", color: "bg-green-500" },
              { platform: "Apple Music", artists: "7,891", color: "bg-gray-500" },
              { platform: "YouTube Music", artists: "9,156", color: "bg-red-500" },
              { platform: "Amazon Music", artists: "6,543", color: "bg-blue-500" },
              { platform: "Deezer", artists: "4,321", color: "bg-orange-500" },
            ].map((item) => (
              <div key={item.platform} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{item.platform}</span>
                  <span className="text-sm font-medium text-white">{item.artists}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${item.color}`} 
                    style={{width: `${Math.round((parseInt(item.artists.replace(',', '')) / 9156) * 100)}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-400">API Status</p>
                <p className="text-xs text-purple-300">Chartmetric conectado</p>
              </div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}