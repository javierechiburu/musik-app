"use client";

import { useState } from "react";
import SongsNavigation from "@/components/canciones/SongsNavigation";
import SongsTabContent from "@/components/canciones/SongsTabContent";

export default function CancionesPage() {
  const [activeTab, setActiveTab] = useState("mis-tracks");

  // Mock data for tracks
  const tracksData = [
    {
      id: "1",
      title: "Midnight Dreams",
      album: "Neon Nights",
      releaseDate: "2024-01-15",
      duration: "3:42",
      streams: "2.4M",
      chartPosition: 12,
      previousPosition: 18,
      spotifyStreams: "1.8M",
      appleStreams: "420K",
      youtubeViews: "180K",
      saves: "89K",
      isrc: "USUM71234567",
      mood: "Melancólico",
      genre: "Electronic Pop",
    },
    {
      id: "2",
      title: "Electric Soul",
      album: "Future Beats",
      releaseDate: "2024-02-28",
      duration: "4:15",
      streams: "1.8M",
      chartPosition: 25,
      previousPosition: 32,
      spotifyStreams: "1.2M",
      appleStreams: "380K",
      youtubeViews: "220K",
      saves: "67K",
      isrc: "USUM71234568",
      mood: "Energético",
      genre: "Electronic",
    },
    {
      id: "3",
      title: "Stellar Waves",
      album: "Cosmic Journey",
      releaseDate: "2024-03-10",
      duration: "3:28",
      streams: "3.1M",
      chartPosition: 8,
      previousPosition: 15,
      spotifyStreams: "2.1M",
      appleStreams: "560K",
      youtubeViews: "440K",
      saves: "112K",
      isrc: "USUM71234569",
      mood: "Inspirador",
      genre: "Ambient Electronic",
    },
  ];

  // Mock data for playlists
  const playlistsData = [
    {
      id: "1",
      playlistName: "Electronic Hits 2024",
      platform: "Spotify",
      curator: "Spotify Editorial",
      followers: "2.4M",
      trackTitle: "Midnight Dreams",
      position: 15,
      dateAdded: "2024-01-20",
      streams: "890K",
      playlistType: "editorial" as const,
      isActive: true,
    },
    {
      id: "2",
      playlistName: "Future Bass Essentials",
      platform: "Apple Music",
      curator: "Apple Music",
      followers: "1.8M",
      trackTitle: "Electric Soul",
      position: 8,
      dateAdded: "2024-03-01",
      streams: "567K",
      playlistType: "editorial" as const,
      isActive: true,
    },
    {
      id: "3",
      playlistName: "Chill Electronic Vibes",
      platform: "YouTube Music",
      curator: "Independent Creator",
      followers: "340K",
      trackTitle: "Stellar Waves",
      position: 3,
      dateAdded: "2024-03-15",
      streams: "234K",
      playlistType: "user" as const,
      isActive: true,
    },
  ];

  // Mock data for charts
  const chartsData = [
    {
      id: "1",
      trackTitle: "Midnight Dreams",
      chartName: "Global Electronic Charts",
      position: 12,
      previousPosition: 18,
      peakPosition: 8,
      weeksOnChart: 8,
      country: "Global",
      platform: "Spotify",
      lastUpdated: "2024-04-01",
      trend: "up" as const,
    },
    {
      id: "2",
      trackTitle: "Electric Soul",
      chartName: "Dance/Electronic Songs",
      position: 25,
      previousPosition: 32,
      peakPosition: 22,
      weeksOnChart: 6,
      country: "Estados Unidos",
      platform: "Billboard",
      lastUpdated: "2024-04-01",
      trend: "up" as const,
    },
    {
      id: "3",
      trackTitle: "Stellar Waves",
      chartName: "Electronic Hot 100",
      position: 8,
      previousPosition: 15,
      peakPosition: 5,
      weeksOnChart: 4,
      country: "Reino Unido",
      platform: "Spotify",
      lastUpdated: "2024-04-01",
      trend: "up" as const,
    },
  ];

  // Mock data for trending
  const trendingData = [
    {
      id: "1",
      trackTitle: "Midnight Dreams",
      platform: "TikTok",
      trendingScore: 92,
      growthPercentage: "+340%",
      viralMoment: "Trending con challenge #MidnightVibes",
      hashtags: ["MidnightVibes", "ElectronicMusic", "DanceChallenge"],
      influencerMentions: 847,
      userGeneratedContent: 12400,
      predictedPeak: "Próxima semana",
      currentMomentum: "rising" as const,
      regions: ["US", "UK", "CA", "AU"],
      ageGroup: "18-24",
    },
    {
      id: "2",
      trackTitle: "Electric Soul",
      platform: "Instagram",
      trendingScore: 78,
      growthPercentage: "+180%",
      viralMoment: "Viral en Reels de fitness",
      hashtags: ["ElectricSoul", "WorkoutMusic", "FitnessMotivation"],
      influencerMentions: 523,
      userGeneratedContent: 8900,
      predictedPeak: "En 3 días",
      currentMomentum: "peak" as const,
      regions: ["US", "MX", "BR"],
      ageGroup: "25-34",
    },
    {
      id: "3",
      trackTitle: "Stellar Waves",
      platform: "YouTube",
      trendingScore: 85,
      growthPercentage: "+220%",
      viralMoment: "Usado en videos de relajación",
      hashtags: ["StellarWaves", "ChillMusic", "Meditation"],
      influencerMentions: 234,
      userGeneratedContent: 5600,
      predictedPeak: "Hace 2 días",
      currentMomentum: "declining" as const,
      regions: ["US", "UK", "DE", "FR"],
      ageGroup: "25-45",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header del Dashboard de Canciones */}
      <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-lg shadow p-6 border border-blue-500/20">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Mis Canciones</h2>
            <p className="text-blue-200">
              Gestión completa de tracks • Análisis de rendimiento • Chartmetric
              API
            </p>
          </div>
        </div>
      </div>

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
