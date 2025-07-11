"use client";

import { useState } from "react";
import ArtistProfileHeader from "@/components/home/ArtistProfileHeader";
import ArtistNavigation from "@/components/home/ArtistNavigation";
import TabContent from "@/components/home/TabContent";
import { useQuery } from "@tanstack/react-query";
import {
  fetchArtistData,
  type ChartmetricArtistResponse,
} from "@/apis/homeAPI";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
}

function ErrorMessage({
  error,
  onRetry,
}: {
  readonly error: Error;
  readonly onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className="text-red-500 text-center">
        <h2 className="text-xl font-semibold mb-2">
          Error al cargar los datos
        </h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}

function transformArtistData(data: ChartmetricArtistResponse) {
  return {
    name: data.name,
    image: data.image_url,
    verifiedBadge: data.verified,
    chartmetricRank: data.cm_artist_rank,
    description: data.description,
    socialLinks: data.social_links,
    followers: data.followers,
    streaming: {
      monthlyListeners: data.streaming_metrics.monthly_listeners,
      playlistReach: data.streaming_metrics.playlist_reach,
      totalStreams: data.streaming_metrics.total_streams,
    },
    charts: {
      spotifyGlobal: data.chart_positions.spotify_global,
      spotifyUS: data.chart_positions.spotify_us,
      appleMusic: data.chart_positions.apple_music,
      shazam: data.chart_positions.shazam,
    },
  };
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const {
    data: rawArtistData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["artist-data"],
    queryFn: () => fetchArtistData(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />;
  }

  if (!rawArtistData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No se encontraron datos del artista</p>
      </div>
    );
  }

  const artistData = transformArtistData(rawArtistData);

  return (
    <div className="space-y-6">
      {/* Artist Profile Header */}
      <ArtistProfileHeader
        name={artistData.name}
        image={artistData.image}
        verifiedBadge={artistData.verifiedBadge}
        chartmetricRank={artistData.chartmetricRank}
        description={artistData.description}
        socialLinks={artistData.socialLinks}
      />

      {/* Navigation Tabs */}
      <ArtistNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <TabContent activeTab={activeTab} artistData={artistData} />
    </div>
  );
}
