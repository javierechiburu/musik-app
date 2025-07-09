export default function CancionesPage() {
  return (
    <div className="space-y-6">
      {/* Header del Dashboard de Canciones */}
      <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-lg shadow p-6 border border-blue-500/20">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Track Analytics
            </h2>
            <p className="text-blue-200">
              Análisis de rendimiento de canciones • Chartmetric API Integration
            </p>
          </div>
        </div>
      </div>

      {/* Métricas principales de tracks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 border border-green-500/30 rounded-lg p-6 hover:border-green-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">+24.5%</span>
          </div>
          <h3 className="font-semibold text-green-200 mb-2">Total Streams</h3>
          <p className="text-3xl font-bold text-green-400 mb-1">847M</p>
          <p className="text-sm text-green-300">últimas 24h</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-500/30 rounded-lg p-6 hover:border-blue-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">+12.8%</span>
          </div>
          <h3 className="font-semibold text-blue-200 mb-2">Nuevos Tracks</h3>
          <p className="text-3xl font-bold text-blue-400 mb-1">15,234</p>
          <p className="text-sm text-blue-300">esta semana</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">+5.2%</span>
          </div>
          <h3 className="font-semibold text-purple-200 mb-2">Duración Promedio</h3>
          <p className="text-3xl font-bold text-purple-400 mb-1">3:42</p>
          <p className="text-sm text-purple-300">tiempo reproducción</p>
        </div>

        <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/40 border border-pink-500/30 rounded-lg p-6 hover:border-pink-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded-full">+18.9%</span>
          </div>
          <h3 className="font-semibold text-pink-200 mb-2">Saves Total</h3>
          <p className="text-3xl font-bold text-pink-400 mb-1">234K</p>
          <p className="text-sm text-pink-300">últimas 24h</p>
        </div>
      </div>

      {/* Secciones principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Global Top Tracks */}
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Global Top Tracks</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-green-600 text-white text-xs rounded">Spotify</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">Apple</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">YouTube</button>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { track: "Anti-Hero", artist: "Taylor Swift", streams: "89.2M", chart: "#1", change: "+5%" },
              { track: "Flowers", artist: "Miley Cyrus", streams: "76.8M", chart: "#2", change: "+12%" },
              { track: "As It Was", artist: "Harry Styles", streams: "65.4M", chart: "#3", change: "-1%" },
              { track: "Unholy", artist: "Sam Smith", streams: "58.9M", chart: "#4", change: "+8%" },
              { track: "Bad Habit", artist: "Steve Lacy", streams: "52.1M", chart: "#5", change: "+3%" },
            ].map((item, index) => (
              <div key={item.track} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center">
                    <span className="text-xs bg-gray-600 text-gray-300 w-8 h-6 rounded flex items-center justify-center font-medium">
                      {index + 1}
                    </span>
                    <span className="text-xs text-green-400 font-medium mt-1">{item.chart}</span>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.track}</p>
                    <p className="text-sm text-gray-400">{item.artist}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{item.streams}</p>
                    <p className="text-xs text-gray-400">streams/day</p>
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

        {/* Viral Tracks */}
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Viral Tracks</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-red-400">Live</span>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { track: "Paint The Town Red", artist: "Doja Cat", viral: "TikTok", growth: "+845%" },
              { track: "Vampire", artist: "Olivia Rodrigo", viral: "Instagram", growth: "+342%" },
              { track: "Seven", artist: "Jung Kook", viral: "YouTube", growth: "+567%" },
              { track: "Calm Down", artist: "Rema", viral: "TikTok", growth: "+234%" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.track}</p>
                    <p className="text-sm text-gray-400">{item.artist}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-red-400 font-medium">{item.viral}</p>
                  <p className="text-sm text-green-400 font-bold">{item.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics y Performance Detallado */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Track Performance Timeline</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded">7d</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">30d</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">90d</button>
            </div>
          </div>
          <div className="h-64 bg-gray-700/30 rounded-lg flex items-center justify-center border border-gray-600/50">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              <p className="text-gray-400">Track Performance Analytics</p>
              <p className="text-sm text-gray-500">Streaming, charts, and engagement metrics</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Genre Distribution</h3>
          <div className="space-y-4">
            {[
              { genre: "Pop", tracks: "34.2K", color: "bg-pink-500", percentage: 45 },
              { genre: "Hip-Hop", tracks: "28.7K", color: "bg-purple-500", percentage: 38 },
              { genre: "Rock", tracks: "15.3K", color: "bg-red-500", percentage: 20 },
              { genre: "Electronic", tracks: "12.1K", color: "bg-blue-500", percentage: 16 },
              { genre: "R&B", tracks: "9.8K", color: "bg-green-500", percentage: 13 },
            ].map((item) => (
              <div key={item.genre} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{item.genre}</span>
                  <span className="text-sm font-medium text-white">{item.tracks}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${item.color}`} 
                    style={{width: `${item.percentage}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg border border-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-400">Track Analysis</p>
                <p className="text-xs text-blue-300">Real-time monitoring</p>
              </div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Features Analysis */}
      <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Audio Features Analysis</h3>
          <button className="px-3 py-1 bg-purple-600 text-white text-xs rounded">Spotify Audio API</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { feature: "Danceability", value: 0.68, color: "text-green-400" },
            { feature: "Energy", value: 0.84, color: "text-red-400" },
            { feature: "Valence", value: 0.45, color: "text-blue-400" },
            { feature: "Acousticness", value: 0.23, color: "text-yellow-400" },
            { feature: "Speechiness", value: 0.12, color: "text-purple-400" },
            { feature: "Instrumentalness", value: 0.05, color: "text-orange-400" },
          ].map((item) => (
            <div key={item.feature} className="bg-gray-700/50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-400 mb-2">{item.feature}</p>
              <p className={`text-2xl font-bold ${item.color} mb-2`}>
                {Math.round(item.value * 100)}%
              </p>
              <div className="w-full bg-gray-600 rounded-full h-1">
                <div 
                  className={`h-1 rounded-full transition-all duration-500 ${item.color.replace('text-', 'bg-')}`}
                  style={{width: `${item.value * 100}%`}}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}