"use client";

interface SocialMediaStatsProps {
  followers: {
    spotify: number;
    instagram: number;
    tiktok: number;
    youtube: number;
    twitter?: number;
  };
}

export default function SocialMediaStats({ followers }: SocialMediaStatsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const socialPlatforms = [
    { name: 'Spotify', value: followers.spotify, color: 'text-green-400', icon: '🎵' },
    { name: 'Instagram', value: followers.instagram, color: 'text-purple-400', icon: '📷' },
    { name: 'TikTok', value: followers.tiktok, color: 'text-red-400', icon: '🎬' },
    { name: 'YouTube', value: followers.youtube, color: 'text-red-500', icon: '▶️' },
    ...(followers.twitter ? [{ name: 'Twitter', value: followers.twitter, color: 'text-blue-400', icon: '🐦' }] : [])
  ];

  return (
    <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-blue-400">Seguidores en Redes</h3>
        <button 
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          onClick={() => console.log('Actualizar datos de redes sociales')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      <div className="space-y-3">
        {socialPlatforms.map((platform) => (
          <button 
            key={platform.name} 
            className="w-full flex justify-between items-center p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer"
            onClick={() => console.log(`Ver detalles de ${platform.name}`)}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{platform.icon}</span>
              <span className={`font-medium ${platform.color}`}>{platform.name}</span>
            </div>
            <span className="font-semibold text-white">{formatNumber(platform.value)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}