"use client";

import TrackListComponent from "./TrackListComponent";
import PlaylistAppearances from "./PlaylistAppearances";
import ChartMetrics from "./ChartMetrics";
import TrendingAnalytics from "./TrendingAnalytics";

interface SongsTabContentProps {
  activeTab: string;
  tracksData: any[];
  playlistsData: any[];
  chartsData: any[];
  trendingData: any[];
}

export default function SongsTabContent({ 
  activeTab, 
  tracksData, 
  playlistsData, 
  chartsData, 
  trendingData 
}: SongsTabContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "mis-tracks":
        return <TrackListComponent tracks={tracksData} />;
      
      case "playlists":
        return <PlaylistAppearances appearances={playlistsData} />;
      
      case "metricas":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-6 border border-purple-500/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Métricas Avanzadas</h3>
                  <p className="text-purple-200">Análisis detallado de rendimiento • Chartmetric API</p>
                </div>
              </div>
            </div>
            
            {/* Aquí van las métricas específicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-500/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-400 mb-4">Engagement Rate</h4>
                <p className="text-3xl font-bold text-blue-300">4.2%</p>
                <p className="text-sm text-blue-200">Promedio mensual</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 border border-green-500/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-400 mb-4">Completion Rate</h4>
                <p className="text-3xl font-bold text-green-300">78%</p>
                <p className="text-sm text-green-200">Canciones completadas</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-500/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-400 mb-4">Skip Rate</h4>
                <p className="text-3xl font-bold text-purple-300">22%</p>
                <p className="text-sm text-purple-200">Saltos promedio</p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/40 border border-yellow-500/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-yellow-400 mb-4">Playlist Add Rate</h4>
                <p className="text-3xl font-bold text-yellow-300">12.5%</p>
                <p className="text-sm text-yellow-200">Agregadas a playlists</p>
              </div>
            </div>
          </div>
        );
      
      case "charts":
        return <ChartMetrics chartsData={chartsData} />;
      
      case "trending":
        return <TrendingAnalytics trendingData={trendingData} />;
      
      default:
        return <TrackListComponent tracks={tracksData} />;
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
}