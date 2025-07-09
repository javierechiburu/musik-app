export default function PlaylistsPage() {
  return (
    <div className="space-y-6">
      {/* Header del Dashboard de Playlists */}
      <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-lg shadow p-6 border border-indigo-500/20">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Playlist Analytics
            </h2>
            <p className="text-indigo-200">
              Análisis de playlists y curatoría • Chartmetric Playlist Insights
            </p>
          </div>
        </div>
      </div>

      {/* Métricas principales de playlists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-indigo-900/40 to-indigo-800/40 border border-indigo-500/30 rounded-lg p-6 hover:border-indigo-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">+18.7%</span>
          </div>
          <h3 className="font-semibold text-indigo-200 mb-2">Total Playlists</h3>
          <p className="text-3xl font-bold text-indigo-400 mb-1">24,891</p>
          <p className="text-sm text-indigo-300">monitoreadas</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">+7.3%</span>
          </div>
          <h3 className="font-semibold text-purple-200 mb-2">Total Followers</h3>
          <p className="text-3xl font-bold text-purple-400 mb-1">182M</p>
          <p className="text-sm text-purple-300">seguidores activos</p>
        </div>
        
        <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/40 border border-pink-500/30 rounded-lg p-6 hover:border-pink-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">+25.1%</span>
          </div>
          <h3 className="font-semibold text-pink-200 mb-2">Nuevas Adiciones</h3>
          <p className="text-3xl font-bold text-pink-400 mb-1">3,247</p>
          <p className="text-sm text-pink-300">esta semana</p>
        </div>

        <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/40 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full">+11.4%</span>
          </div>
          <h3 className="font-semibold text-cyan-200 mb-2">Playlists Editoriales</h3>
          <p className="text-3xl font-bold text-cyan-400 mb-1">1,892</p>
          <p className="text-sm text-cyan-300">oficiales</p>
        </div>
      </div>

      {/* Secciones principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Playlists por Followers */}
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Top Playlists - Followers</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-green-600 text-white text-xs rounded">Spotify</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">Apple</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">Deezer</button>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { name: "Today's Top Hits", curator: "Spotify", followers: "32.4M", tracks: "50", type: "Editorial" },
              { name: "RapCaviar", curator: "Spotify", followers: "15.8M", tracks: "65", type: "Editorial" },
              { name: "Pop Rising", curator: "Spotify", followers: "12.3M", tracks: "75", type: "Editorial" },
              { name: "Viral 50 - Global", curator: "Spotify", followers: "8.9M", tracks: "50", type: "Editorial" },
              { name: "New Music Friday", curator: "Spotify", followers: "7.6M", tracks: "100", type: "Editorial" },
            ].map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
                <div className="flex items-center space-x-4">
                  <span className="text-sm bg-gray-600 text-gray-300 w-8 h-8 rounded-full flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.name}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-400">{item.curator}</p>
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">{item.type}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{item.followers}</p>
                  <p className="text-xs text-gray-400">{item.tracks} tracks</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Playlist Curation Insights */}
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Curation Insights</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-purple-400">AI Analysis</span>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { insight: "Peak Addition Time", value: "Friday 12PM EST", type: "timing" },
              { insight: "Average Playlist Size", value: "67 tracks", type: "size" },
              { insight: "Track Retention", value: "85% stay 30+ days", type: "retention" },
              { insight: "Genre Diversity", value: "3.2 genres avg", type: "diversity" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    {item.type === 'timing' && (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {item.type === 'size' && (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    )}
                    {item.type === 'retention' && (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {item.type === 'diversity' && (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-gray-300">{item.insight}</p>
                </div>
                <p className="text-sm font-medium text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Análisis de Plataformas y Trending */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Playlist Performance by Platform</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-indigo-600 text-white text-xs rounded">All</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">Editorial</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">User</button>
            </div>
          </div>
          <div className="h-64 bg-gray-700/30 rounded-lg flex items-center justify-center border border-gray-600/50">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-gray-400">Cross-Platform Analytics</p>
              <p className="text-sm text-gray-500">Comparative playlist performance metrics</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Platform Distribution</h3>
          <div className="space-y-4">
            {[
              { platform: "Spotify", playlists: "18.4K", color: "bg-green-500", percentage: 74 },
              { platform: "Apple Music", playlists: "4.2K", color: "bg-gray-500", percentage: 17 },
              { platform: "YouTube Music", playlists: "1.8K", color: "bg-red-500", percentage: 7 },
              { platform: "Amazon Music", playlists: "0.5K", color: "bg-blue-500", percentage: 2 },
            ].map((item) => (
              <div key={item.platform} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{item.platform}</span>
                  <span className="text-sm font-medium text-white">{item.playlists}</span>
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
          
          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-lg border border-indigo-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-400">Playlist Monitor</p>
                <p className="text-xs text-indigo-300">24/7 tracking active</p>
              </div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial vs User Playlists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Editorial Playlists</h3>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Official</span>
          </div>
          <div className="space-y-4">
            {[
              { name: "Hot Hits USA", followers: "8.2M", influence: "Very High", growth: "+12%" },
              { name: "Indie Mix", followers: "3.4M", influence: "High", growth: "+8%" },
              { name: "Chill Vibes", followers: "5.7M", influence: "High", growth: "+15%" },
              { name: "Workout Beats", followers: "2.1M", influence: "Medium", growth: "+6%" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.influence} influence</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white">{item.followers}</p>
                  <p className="text-xs text-green-400">{item.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Trending User Playlists</h3>
            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">Community</span>
          </div>
          <div className="space-y-4">
            {[
              { name: "Late Night Vibes 2024", followers: "124K", viral: "TikTok", growth: "+340%" },
              { name: "Y2K Pop Revival", followers: "89K", viral: "Instagram", growth: "+180%" },
              { name: "Study Beats", followers: "267K", viral: "YouTube", growth: "+95%" },
              { name: "Road Trip Mix", followers: "156K", viral: "Twitter", growth: "+67%" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{item.name}</p>
                    <p className="text-xs text-gray-400">Viral on {item.viral}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white">{item.followers}</p>
                  <p className="text-xs text-purple-400">{item.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}