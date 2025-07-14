"use client";

import TrackListComponent, { Track } from "./TrackListComponent";
import PlaylistAppearances, { PlaylistAppearance } from "./PlaylistAppearances";

interface SongsTabContentProps {
  readonly activeTab: string;
  readonly tracksData: Track[];
  readonly playlistsData: PlaylistAppearance[];
}

export default function SongsTabContent({
  activeTab,
  tracksData,
  playlistsData,
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
