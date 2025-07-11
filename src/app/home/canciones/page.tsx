"use client";

import { useState } from "react";
import SongsNavigation from "@/components/canciones/SongsNavigation";
import SongsTabContent from "@/components/canciones/SongsTabContent";
import { useQuery } from "@tanstack/react-query";
import {
  fetchSongsData,
  type ChartmetricTrackResponse,
  type ChartmetricPlaylistResponse,
  type ChartmetricChartResponse,
  type ChartmetricTrendingResponse,
} from "@/apis/cancionesAPI";

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
  error: Error;
  onRetry: () => void;
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

function transformTracksData(tracks: ChartmetricTrackResponse[]) {
  return tracks.map((track) => ({
    id: track.id,
    title: track.title,
    album: track.album,
    releaseDate: track.release_date,
    duration: track.duration,
    streams: track.streaming_metrics.total_streams,
    chartPosition: track.chart_data.current_position,
    previousPosition: track.chart_data.previous_position,
    spotifyStreams: track.streaming_metrics.spotify_streams,
    appleStreams: track.streaming_metrics.apple_streams,
    youtubeViews: track.streaming_metrics.youtube_views,
    saves: track.streaming_metrics.saves,
    isrc: track.isrc,
    mood: track.mood,
    genre: track.genre,
  }));
}

function transformPlaylistsData(playlists: ChartmetricPlaylistResponse[]) {
  return playlists.map((playlist) => ({
    id: playlist.id,
    playlistName: playlist.playlist_name,
    platform: playlist.platform,
    curator: playlist.curator,
    followers: playlist.followers,
    trackTitle: playlist.track_title,
    position: playlist.position,
    dateAdded: playlist.date_added,
    streams: playlist.streams,
    playlistType: playlist.playlist_type,
    isActive: playlist.is_active,
  }));
}

function transformChartsData(charts: ChartmetricChartResponse[]) {
  return charts.map((chart) => ({
    id: chart.id,
    trackTitle: chart.track_title,
    chartName: chart.chart_name,
    position: chart.position,
    previousPosition: chart.previous_position,
    peakPosition: chart.peak_position,
    weeksOnChart: chart.weeks_on_chart,
    country: chart.country,
    platform: chart.platform,
    lastUpdated: chart.last_updated,
    trend: chart.trend,
  }));
}

function transformTrendingData(trending: ChartmetricTrendingResponse[]) {
  return trending.map((trend) => ({
    id: trend.id,
    trackTitle: trend.track_title,
    platform: trend.platform,
    trendingScore: trend.trending_score,
    growthPercentage: trend.growth_percentage,
    viralMoment: trend.viral_moment,
    hashtags: trend.hashtags,
    influencerMentions: trend.influencer_mentions,
    userGeneratedContent: trend.user_generated_content,
    predictedPeak: trend.predicted_peak,
    currentMomentum: trend.current_momentum,
    regions: trend.regions,
    ageGroup: trend.age_group,
  }));
}

export default function CancionesPage() {
  const [activeTab, setActiveTab] = useState("mis-tracks");

  const {
    data: rawSongsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["songs-data"],
    queryFn: () => fetchSongsData(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error as Error} onRetry={refetch} />;
  }

  if (!rawSongsData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No se encontraron datos de canciones</p>
      </div>
    );
  }

  const tracksData = transformTracksData(rawSongsData.tracks);
  const playlistsData = transformPlaylistsData(rawSongsData.playlists);
  const chartsData = transformChartsData(rawSongsData.charts);
  const trendingData = transformTrendingData(rawSongsData.trending);

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <SongsNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <SongsTabContent
        activeTab={activeTab}
        tracksData={tracksData}
        playlistsData={playlistsData}
        chartsData={chartsData}
        trendingData={trendingData}
      />
    </div>
  );
}
