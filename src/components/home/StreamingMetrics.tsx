"use client";

interface StreamingMetricsProps {
  streaming: {
    monthlyListeners: number;
    playlistReach: number;
    totalStreams: number;
  };
}

export default function StreamingMetrics({ streaming }: StreamingMetricsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const metrics = [
    {
      label: 'Oyentes Mensuales',
      value: streaming.monthlyListeners,
      color: 'text-green-400',
      size: 'text-3xl',
      icon: '👥'
    },
    {
      label: 'Alcance Playlists',
      value: streaming.playlistReach,
      color: 'text-blue-400',
      size: 'text-lg',
      icon: '📋'
    },
    {
      label: 'Total Streams',
      value: streaming.totalStreams,
      color: 'text-purple-400',
      size: 'text-lg',
      icon: '▶️'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-green-900/40 to-teal-900/40 backdrop-blur border border-green-500/30 rounded-lg p-6 hover:border-green-400/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-green-400">Métricas de Streaming</h3>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      </div>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="p-3 rounded-lg bg-green-800/20 hover:bg-green-700/30 transition-colors border border-green-600/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg">{metric.icon}</span>
              <span className="text-gray-400 text-sm">{metric.label}</span>
            </div>
            <p className={`${metric.size} font-bold ${metric.color}`}>
              {formatNumber(metric.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}