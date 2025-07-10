"use client";

interface TrendingTrack {
  id: string;
  trackTitle: string;
  platform: string;
  trendingScore: number;
  growthPercentage: string;
  viralMoment: string;
  hashtags: string[];
  influencerMentions: number;
  userGeneratedContent: number;
  predictedPeak: string;
  currentMomentum: "rising" | "peak" | "declining";
  regions: string[];
  ageGroup: string;
}

interface TrendingAnalyticsProps {
  trendingData: TrendingTrack[];
}

export default function TrendingAnalytics({ trendingData }: TrendingAnalyticsProps) {
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "tiktok":
        return "bg-pink-500/20 text-pink-400";
      case "instagram":
        return "bg-purple-500/20 text-purple-400";
      case "youtube":
        return "bg-red-500/20 text-red-400";
      case "twitter":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getMomentumColor = (momentum: string) => {
    switch (momentum) {
      case "rising":
        return "text-green-400 bg-green-500/20";
      case "peak":
        return "text-yellow-400 bg-yellow-500/20";
      case "declining":
        return "text-red-400 bg-red-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  const getMomentumIcon = (momentum: string) => {
    switch (momentum) {
      case "rising":
        return "🚀";
      case "peak":
        return "⭐";
      case "declining":
        return "📉";
      default:
        return "➡️";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-900/50 to-red-900/50 rounded-lg p-6 border border-pink-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Trending Analytics</h3>
              <p className="text-pink-200">Análisis de tendencias virales • {trendingData.length} tracks trending</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-red-400">Live Monitoring</span>
          </div>
        </div>
      </div>

      {/* Trending Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/40 border border-pink-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded-full">Viral</span>
          </div>
          <h3 className="font-semibold text-pink-200 mb-2">Viral Score</h3>
          <p className="text-3xl font-bold text-pink-400 mb-1">
            {Math.max(...trendingData.map(t => t.trendingScore))}
          </p>
          <p className="text-sm text-pink-300">máximo trending</p>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 border border-green-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Rising</span>
          </div>
          <h3 className="font-semibold text-green-200 mb-2">En Crecimiento</h3>
          <p className="text-3xl font-bold text-green-400 mb-1">
            {trendingData.filter(t => t.currentMomentum === 'rising').length}
          </p>
          <p className="text-sm text-green-300">tracks subiendo</p>
        </div>

        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">Total</span>
          </div>
          <h3 className="font-semibold text-purple-200 mb-2">Influencer Mentions</h3>
          <p className="text-3xl font-bold text-purple-400 mb-1">
            {trendingData.reduce((sum, t) => sum + t.influencerMentions, 0).toLocaleString()}
          </p>
          <p className="text-sm text-purple-300">menciones totales</p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2m5 1V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v1M7 10h10M7 14h10M5 8h14l-1 8H6L5 8z" />
              </svg>
            </div>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">UGC</span>
          </div>
          <h3 className="font-semibold text-blue-200 mb-2">User Content</h3>
          <p className="text-3xl font-bold text-blue-400 mb-1">
            {trendingData.reduce((sum, t) => sum + t.userGeneratedContent, 0).toLocaleString()}
          </p>
          <p className="text-sm text-blue-300">contenido generado</p>
        </div>
      </div>

      {/* Trending Tracks List */}
      <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-700/50">
          <h4 className="text-lg font-semibold text-white">Tracks en Tendencia</h4>
          <p className="text-sm text-gray-400">Análisis en tiempo real de popularidad viral</p>
        </div>
        <div className="p-6 space-y-4">
          {trendingData.map((track, index) => (
            <div key={track.id} className="bg-gray-700/30 rounded-lg p-6 hover:bg-gray-700/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-yellow-400">#{index + 1}</span>
                    <span className="text-xs text-gray-400">trending</span>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-white mb-1">{track.trackTitle}</h5>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPlatformColor(track.platform)}`}>
                        {track.platform}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getMomentumColor(track.currentMomentum)}`}>
                        {getMomentumIcon(track.currentMomentum)} {track.currentMomentum}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{track.viralMoment}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-pink-400 mb-1">{track.trendingScore}</div>
                  <div className="text-sm text-gray-400">viral score</div>
                  <div className="text-green-400 font-bold">{track.growthPercentage}</div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <div className="text-purple-400 font-bold text-lg">{track.influencerMentions}</div>
                  <div className="text-xs text-gray-400">Influencer Mentions</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <div className="text-blue-400 font-bold text-lg">{track.userGeneratedContent}</div>
                  <div className="text-xs text-gray-400">User Content</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <div className="text-yellow-400 font-bold text-lg">{track.regions.length}</div>
                  <div className="text-xs text-gray-400">Trending Regions</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <div className="text-green-400 font-bold text-lg">{track.ageGroup}</div>
                  <div className="text-xs text-gray-400">Target Age</div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {track.hashtags.map((hashtag, i) => (
                    <span key={i} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                      #{hashtag}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-400">
                  Predicción pico: <span className="text-yellow-400">{track.predictedPeak}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}