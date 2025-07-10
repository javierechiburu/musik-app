"use client";

import SocialMediaStats from './SocialMediaStats';
import StreamingMetrics from './StreamingMetrics';
import ChartPositions from './ChartPositions';
import ChartVisualization from './ChartVisualization';

interface TabContentProps {
  activeTab: string;
  artistData: {
    followers: {
      spotify: number;
      instagram: number;
      tiktok: number;
      youtube: number;
      twitter: number;
    };
    streaming: {
      monthlyListeners: number;
      playlistReach: number;
      totalStreams: number;
    };
    charts: {
      spotifyGlobal: number;
      spotifyUS: number;
      appleMusic: number;
      shazam: number;
    };
  };
}

export default function TabContent({ activeTab, artistData }: TabContentProps) {
  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SocialMediaStats followers={artistData.followers} />
        <StreamingMetrics streaming={artistData.streaming} />
        <ChartPositions charts={artistData.charts} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartVisualization
          title="Evolución de Oyentes"
          type="monthly-listeners"
        />
        <ChartVisualization
          title="Evolución en Charts"
          type="chart-evolution"
        />
      </div>

      <div className="bg-gradient-to-br from-violet-900/40 to-pink-900/40 backdrop-blur border border-violet-500/30 rounded-lg p-6 hover:border-violet-400/50 transition-colors">
        <h3 className="text-xl font-semibold mb-4 text-violet-400">Análisis Detallado</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-violet-800/20 rounded-lg border border-violet-600/30">
            <div className="text-3xl mb-2">🎯</div>
            <h4 className="font-semibold text-white mb-2">Audiencia Principal</h4>
            <p className="text-sm text-gray-300">18-34 años, Global</p>
          </div>
          <div className="text-center p-4 bg-pink-800/20 rounded-lg border border-pink-600/30">
            <div className="text-3xl mb-2">📈</div>
            <h4 className="font-semibold text-white mb-2">Crecimiento</h4>
            <p className="text-sm text-gray-300">+15% este mes</p>
          </div>
          <div className="text-center p-4 bg-indigo-800/20 rounded-lg border border-indigo-600/30">
            <div className="text-3xl mb-2">🌍</div>
            <h4 className="font-semibold text-white mb-2">Top Países</h4>
            <p className="text-sm text-gray-300">US, UK, BR, MX</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSocialTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SocialMediaStats followers={artistData.followers} />
        <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 backdrop-blur border border-emerald-500/30 rounded-lg p-6 hover:border-emerald-400/50 transition-colors">
          <h3 className="text-lg font-semibold text-emerald-400 mb-4">Crecimiento de Seguidores</h3>
          <div className="space-y-4">
            {[
              { platform: 'Spotify', growth: '+12.5%', period: 'Últimos 30 días', color: 'text-green-400' },
              { platform: 'Instagram', growth: '+8.3%', period: 'Últimos 30 días', color: 'text-purple-400' },
              { platform: 'TikTok', growth: '+25.1%', period: 'Últimos 30 días', color: 'text-red-400' },
              { platform: 'YouTube', growth: '+6.7%', period: 'Últimos 30 días', color: 'text-red-500' }
            ].map((item) => (
              <div key={item.platform} className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                <div>
                  <p className={`font-medium ${item.color}`}>{item.platform}</p>
                  <p className="text-xs text-gray-400">{item.period}</p>
                </div>
                <span className="text-green-400 font-semibold">{item.growth}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ChartVisualization title="Evolución de Seguidores" type="monthly-listeners" />
    </div>
  );

  const renderStreamingTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StreamingMetrics streaming={artistData.streaming} />
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Top Canciones</h3>
          <div className="space-y-3">
            {[
              { song: 'Hit Song #1', streams: '25.2M', change: '+5%' },
              { song: 'Popular Track', streams: '18.7M', change: '+12%' },
              { song: 'Latest Single', streams: '12.3M', change: '+25%' },
              { song: 'Classic Hit', streams: '9.8M', change: '+2%' }
            ].map((track, index) => (
              <div key={track.song} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400 font-bold">#{index + 1}</span>
                  <span className="text-white">{track.song}</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{track.streams}</p>
                  <p className="text-green-400 text-sm">{track.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ChartVisualization title="Streams por Canción" type="monthly-listeners" />
    </div>
  );

  const renderChartsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartPositions charts={artistData.charts} />
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Histórico de Charts</h3>
          <div className="space-y-3">
            {[
              { chart: 'Spotify Global Top 50', peak: '#15', current: '#45', trend: 'down' },
              { chart: 'Billboard Hot 100', peak: '#28', current: '#32', trend: 'down' },
              { chart: 'UK Singles Chart', peak: '#12', current: '#28', trend: 'down' },
              { chart: 'Viral 50 Global', peak: '#3', current: '#15', trend: 'down' }
            ].map((chart) => (
              <div key={chart.chart} className="p-3 bg-gray-700/30 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{chart.chart}</span>
                  <span className={`text-sm ${chart.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {chart.trend === 'up' ? '↗️' : '↘️'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Pico: {chart.peak}</span>
                  <span className="text-gray-300">Actual: {chart.current}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ChartVisualization title="Evolución en Charts" type="chart-evolution" />
    </div>
  );

  const renderPlaylistsTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-400 mb-4">Playlists Principales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Today\'s Top Hits', followers: '32.1M', songs: 3, platform: 'Spotify' },
            { name: 'Pop Rising', followers: '8.7M', songs: 2, platform: 'Spotify' },
            { name: 'New Music Friday', followers: '15.3M', songs: 1, platform: 'Spotify' },
            { name: 'Viral Hits', followers: '5.2M', songs: 4, platform: 'Apple Music' }
          ].map((playlist) => (
            <div key={playlist.name} className="p-4 bg-gray-700/30 rounded-lg">
              <h4 className="font-semibold text-white mb-2">{playlist.name}</h4>
              <div className="space-y-1 text-sm">
                <p className="text-gray-300">{playlist.platform}</p>
                <p className="text-gray-400">{playlist.followers} seguidores</p>
                <p className="text-blue-400">{playlist.songs} canciones incluidas</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ChartVisualization title="Alcance de Playlists" type="playlist-reach" />
    </div>
  );

  const renderAudienceTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Demografía de Edad</h3>
          <div className="space-y-3">
            {[
              { age: '13-17', percentage: 15 },
              { age: '18-24', percentage: 35 },
              { age: '25-34', percentage: 28 },
              { age: '35-44', percentage: 15 },
              { age: '45+', percentage: 7 }
            ].map((demo) => (
              <div key={demo.age} className="flex justify-between items-center">
                <span className="text-gray-300">{demo.age}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div className="h-2 rounded-full bg-blue-500" style={{width: `${demo.percentage * 2}%`}}></div>
                  </div>
                  <span className="text-white text-sm w-8">{demo.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Género</h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-2">👨</div>
              <p className="text-2xl font-bold text-blue-400">52%</p>
              <p className="text-gray-300">Masculino</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">👩</div>
              <p className="text-2xl font-bold text-purple-400">48%</p>
              <p className="text-gray-300">Femenino</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Top Países</h3>
          <div className="space-y-3">
            {[
              { country: 'Estados Unidos', flag: '🇺🇸', percentage: 28 },
              { country: 'Reino Unido', flag: '🇬🇧', percentage: 18 },
              { country: 'Brasil', flag: '🇧🇷', percentage: 15 },
              { country: 'México', flag: '🇲🇽', percentage: 12 },
              { country: 'Canadá', flag: '🇨🇦', percentage: 8 }
            ].map((country) => (
              <div key={country.country} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-gray-300 text-sm">{country.country}</span>
                </div>
                <span className="text-white font-semibold">{country.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  switch (activeTab) {
    case 'overview':
      return renderOverviewTab();
    case 'social':
      return renderSocialTab();
    case 'streaming':
      return renderStreamingTab();
    case 'charts':
      return renderChartsTab();
    case 'playlists':
      return renderPlaylistsTab();
    case 'audience':
      return renderAudienceTab();
    default:
      return renderOverviewTab();
  }
}