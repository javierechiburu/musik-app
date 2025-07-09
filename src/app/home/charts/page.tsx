export default function ChartsPage() {
  return (
    <div className="space-y-6">
      {/* Header del Dashboard de Charts */}
      <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-lg shadow p-6 border border-emerald-500/20">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Charts & Trends
            </h2>
            <p className="text-emerald-200">
              Rankings globales y tendencias • Multi-platform Chart Tracking
            </p>
          </div>
        </div>
      </div>

      {/* Métricas principales de charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 border border-emerald-500/30 rounded-lg p-6 hover:border-emerald-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">#1 Global</span>
          </div>
          <h3 className="font-semibold text-emerald-200 mb-2">Top Chart Position</h3>
          <p className="text-3xl font-bold text-emerald-400 mb-1">Hot 100</p>
          <p className="text-sm text-emerald-300">Billboard</p>
        </div>
        
        <div className="bg-gradient-to-br from-teal-900/40 to-teal-800/40 border border-teal-500/30 rounded-lg p-6 hover:border-teal-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs bg-teal-500/20 text-teal-400 px-2 py-1 rounded-full">184 países</span>
          </div>
          <h3 className="font-semibold text-teal-200 mb-2">Mercados Globales</h3>
          <p className="text-3xl font-bold text-teal-400 mb-1">67</p>
          <p className="text-sm text-teal-300">charts activos</p>
        </div>
        
        <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/40 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">+32%</span>
          </div>
          <h3 className="font-semibold text-cyan-200 mb-2">Nuevos Entrantes</h3>
          <p className="text-3xl font-bold text-cyan-400 mb-1">1,247</p>
          <p className="text-sm text-cyan-300">esta semana</p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-500/30 rounded-lg p-6 hover:border-blue-400/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">Live</span>
          </div>
          <h3 className="font-semibold text-blue-200 mb-2">Actualización</h3>
          <p className="text-3xl font-bold text-blue-400 mb-1">15min</p>
          <p className="text-sm text-blue-300">tiempo real</p>
        </div>
      </div>

      {/* Secciones principales de charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Global Top 50 */}
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Global Top 50</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-emerald-600 text-white text-xs rounded">Spotify</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">Apple</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">Shazam</button>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { position: 1, track: "Flowers", artist: "Miley Cyrus", movement: "stable", streams: "89.2M" },
              { position: 2, track: "Anti-Hero", artist: "Taylor Swift", movement: "up", streams: "76.8M" },
              { position: 3, track: "Unholy", artist: "Sam Smith ft. Kim Petras", movement: "down", streams: "65.4M" },
              { position: 4, track: "As It Was", artist: "Harry Styles", movement: "up", streams: "58.9M" },
              { position: 5, track: "Creepin'", artist: "Metro Boomin", movement: "new", streams: "52.1M" },
              { position: 6, track: "Kill Bill", artist: "SZA", movement: "up", streams: "47.3M" },
              { position: 7, track: "Seven", artist: "Jung Kook", movement: "new", streams: "43.8M" },
            ].map((item) => (
              <div key={item.position} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-white w-8 text-center">
                      {item.position}
                    </span>
                    <div className="flex items-center">
                      {item.movement === 'up' && (
                        <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                      )}
                      {item.movement === 'down' && (
                        <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                        </svg>
                      )}
                      {item.movement === 'stable' && (
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                        </svg>
                      )}
                      {item.movement === 'new' && (
                        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-1 rounded">NEW</span>
                      )}
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.track}</p>
                    <p className="text-sm text-gray-400">{item.artist}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{item.streams}</p>
                  <p className="text-xs text-gray-400">daily</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Charts */}
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Regional Performance</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded">USA</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">UK</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">DE</button>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { region: "United States", chart: "Billboard Hot 100", topTrack: "Anti-Hero", growth: "+15%" },
              { region: "United Kingdom", chart: "Official Chart", topTrack: "Flowers", growth: "+8%" },
              { region: "Canada", chart: "Canadian Hot 100", topTrack: "As It Was", growth: "+12%" },
              { region: "Australia", chart: "ARIA Chart", topTrack: "Unholy", growth: "+6%" },
              { region: "Germany", chart: "Media Control", topTrack: "Creepin'", growth: "+18%" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {item.region.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.region}</p>
                    <p className="text-sm text-gray-400">{item.chart}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{item.topTrack}</p>
                  <p className="text-xs text-emerald-400">{item.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Analysis y Chart History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Chart Movement Timeline</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-emerald-600 text-white text-xs rounded">7d</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">30d</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">3m</button>
            </div>
          </div>
          <div className="h-64 bg-gray-700/30 rounded-lg flex items-center justify-center border border-gray-600/50">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-400">Historical Chart Performance</p>
              <p className="text-sm text-gray-500">Track position movements over time</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Trending Insights</h3>
          <div className="space-y-4">
            {[
              { type: "Peak Movement", value: "+47 positions", color: "text-green-400" },
              { type: "Fastest Rising", value: "Seven - Jung Kook", color: "text-emerald-400" },
              { type: "Longest Charting", value: "As It Was - 52 weeks", color: "text-blue-400" },
              { type: "Biggest Drop", value: "-23 positions", color: "text-red-400" },
            ].map((item, index) => (
              <div key={index} className="p-3 bg-gray-700/30 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">{item.type}</p>
                <p className={`text-sm font-medium ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-lg border border-emerald-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-400">Chart Tracker</p>
                <p className="text-xs text-emerald-300">Real-time updates</p>
              </div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Genre Charts y Viral Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Genre Charts</h3>
            <button className="px-3 py-1 bg-purple-600 text-white text-xs rounded">All Genres</button>
          </div>
          <div className="space-y-4">
            {[
              { genre: "Pop", leader: "Anti-Hero - Taylor Swift", position: "#1", trend: "+5%" },
              { genre: "Hip-Hop", leader: "Creepin' - Metro Boomin", position: "#1", trend: "+12%" },
              { genre: "Rock", leader: "People - Libianca", position: "#1", trend: "+8%" },
              { genre: "R&B", leader: "Kill Bill - SZA", position: "#1", trend: "+18%" },
              { genre: "Electronic", leader: "I'm Good - David Guetta", position: "#1", trend: "-3%" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-medium text-xs">
                      {item.genre.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.genre}</p>
                    <p className="text-sm text-gray-400">{item.leader}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{item.position}</p>
                  <p className={`text-xs ${item.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {item.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Viral Trends</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-red-400">Trending</span>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { platform: "TikTok", track: "Paint The Town Red", viral: "+2.3M videos", growth: "+340%" },
              { platform: "Instagram", track: "Vampire", viral: "+890K reels", growth: "+180%" },
              { platform: "YouTube", track: "Seven", viral: "+1.2M shorts", growth: "+240%" },
              { platform: "Twitter", track: "Flowers", viral: "+567K tweets", growth: "+95%" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.track}</p>
                    <p className="text-sm text-gray-400">{item.platform} • {item.viral}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-red-400">{item.growth}</p>
                  <p className="text-xs text-gray-400">24h growth</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}