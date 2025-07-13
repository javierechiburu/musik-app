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
  trendingData,
}: SongsTabContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "playlists":
        return <PlaylistAppearances appearances={playlistsData} />;

      default:
        return <TrackListComponent tracks={tracksData} />;
    }
  };

  return <div className="space-y-6">{renderContent()}</div>;
}
