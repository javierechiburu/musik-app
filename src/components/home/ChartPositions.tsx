"use client";

interface ChartPositionsProps {
  charts: {
    spotifyGlobal: number;
    spotifyUS: number;
    appleMusic: number;
    shazam: number;
  };
}

export default function ChartPositions({ charts }: ChartPositionsProps) {
  const chartData = [
    { name: 'Spotify Global', position: charts.spotifyGlobal, color: 'text-green-400', icon: '🌍' },
    { name: 'Spotify US', position: charts.spotifyUS, color: 'text-green-400', icon: '🇺🇸' },
    { name: 'Apple Music', position: charts.appleMusic, color: 'text-gray-300', icon: '🍎' },
    { name: 'Shazam', position: charts.shazam, color: 'text-blue-400', icon: '🔍' }
  ];

  const getPositionColor = (position: number) => {
    if (position <= 10) return 'text-yellow-400';
    if (position <= 50) return 'text-green-400';
    if (position <= 100) return 'text-blue-400';
    return 'text-gray-400';
  };

  return (
    <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 backdrop-blur border border-orange-500/30 rounded-lg p-6 hover:border-orange-400/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-orange-400">Posiciones en Charts</h3>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
      <div className="space-y-3">
        {chartData.map((chart) => (
          <div key={chart.name} className="flex justify-between items-center p-3 rounded-lg bg-orange-800/20 hover:bg-orange-700/30 transition-colors border border-orange-600/20">
            <div className="flex items-center space-x-3">
              <span className="text-lg">{chart.icon}</span>
              <span className={`font-medium ${chart.color}`}>{chart.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">Pos.</span>
              <span className={`font-bold text-lg ${getPositionColor(chart.position)}`}>
                #{chart.position}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}