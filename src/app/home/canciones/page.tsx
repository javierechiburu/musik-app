"use client";

import { useState } from "react";
import Image from "next/image";
import SongsNavigation from "@/components/canciones/SongsNavigation";
import { useQuery } from "@tanstack/react-query";
import {
  fetchSongsData,
  type ChartmetricTrackResponse,
  type ChartmetricPlaylistResponse,
  type ChartmetricChartResponse,
  type ChartmetricTrendingResponse,
} from "@/apis/cancionesAPI";
import HeaderPage, { HeaderIcon } from "@/components/ui/HeaderPage";
import { LoadingSpinner } from "@/components/ui/Loadings";

function ErrorMessage({
  error,
  onRetry,
}: {
  readonly error: Error;
  readonly onRetry: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen space-y-4"
      style={{
        background:
          "linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)",
      }}
    >
      <div
        className="text-center p-8 rounded-2xl border backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderColor: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2 className="text-xl font-semibold mb-2" style={{ color: "#F0F6FC" }}>
          Error al cargar los datos
        </h2>
        <p className="mb-4" style={{ color: "#8B949E" }}>
          {error.message}
        </p>
        <button
          onClick={onRetry}
          className="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:-translate-y-1"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#FFFFFF",
            boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)",
          }}
        >
          🔄 Reintentar
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

function SongsHeader() {
  return (
    <HeaderPage overlayColor="purple" height="md">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <HeaderIcon colorGradient="from-purple-500 to-pink-500">
            <svg
              className="w-8 h-8 text-white"
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
          </HeaderIcon>
          <div>
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">
              Mis Canciones
            </h3>
            <p className="text-purple-200 drop-shadow-md">
              Catálogo completo de tracks y albums
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="text-sm text-purple-200 font-medium">
            Métricas Globales
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">127</div>
              <div className="text-xs text-purple-300">Total Tracks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">2.8M</div>
              <div className="text-xs text-purple-300">Total Streams</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">45</div>
              <div className="text-xs text-purple-300">En Charts</div>
            </div>
          </div>
        </div>
      </div>
    </HeaderPage>
  );
}

function CancionesPrincipales({ viewAll = false }: { viewAll?: boolean }) {
  const todasLasCanciones = [
    {
      titulo: "PERREA KTM",
      fecha: "18 ago 2022",
      puntaje: 85.2,
      popularidad: 58,
      streams: "1.2M",
      portada: "/perrea.png",
    },
    {
      titulo: "Apago",
      fecha: "9 ene 2020",
      puntaje: 63.8,
      popularidad: 36,
      streams: "890K",
      publicaciones: 29,
      portada: "/apago.png",
    },
    {
      titulo: "Te Rajo",
      fecha: "1 feb 2024",
      puntaje: 68.4,
      popularidad: 43,
      streams: "650K",
      portada: "/te_rajo.png",
    },
    {
      titulo: "Freestyle Session",
      fecha: "15 mar 2023",
      puntaje: 72.1,
      popularidad: 47,
      streams: "720K",
      portada: "/perrea.png",
    },
    {
      titulo: "Noche en Chile",
      fecha: "22 jul 2023",
      puntaje: 69.5,
      popularidad: 41,
      streams: "580K",
      portada: "/apago.png",
    },
    {
      titulo: "Ritmo Urbano",
      fecha: "10 nov 2023",
      puntaje: 74.8,
      popularidad: 52,
      streams: "830K",
      portada: "/te_rajo.png",
    },
    // Canciones adicionales para mostrar cuando viewAll = true
    {
      titulo: "Flow Latino",
      fecha: "5 dic 2023",
      puntaje: 67.3,
      popularidad: 39,
      streams: "520K",
      portada: "/perrea.png",
    },
    {
      titulo: "Barrio Norte",
      fecha: "14 feb 2024",
      puntaje: 71.8,
      popularidad: 44,
      streams: "680K",
      portada: "/apago.png",
    },
    {
      titulo: "Sueños de Calle",
      fecha: "28 mar 2024",
      puntaje: 69.1,
      popularidad: 42,
      streams: "590K",
      portada: "/te_rajo.png",
    },
    {
      titulo: "Madrugada",
      fecha: "10 may 2024",
      puntaje: 73.5,
      popularidad: 48,
      streams: "750K",
      portada: "/perrea.png",
    },
    {
      titulo: "Rumba Chilena",
      fecha: "18 jun 2024",
      puntaje: 68.9,
      popularidad: 40,
      streams: "630K",
      portada: "/apago.png",
    },
    {
      titulo: "Trap del Sur",
      fecha: "2 ago 2024",
      puntaje: 75.2,
      popularidad: 54,
      streams: "890K",
      portada: "/te_rajo.png",
    },
  ];

  const canciones = viewAll ? todasLasCanciones : todasLasCanciones.slice(0, 6);

  return (
    <div className="bg-gradient-to-r from-emerald-900/40 to-sky-900/50 text-white p-6 rounded-lg shadow border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Canciones
          <span
            className="text-gray-400 text-base cursor-help"
            title="Canciones con mejor desempeño"
          >
            ℹ️
          </span>
        </h2>
      </div>

      {/* Grid de canciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {canciones.map((cancion, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-blue-900/50 via-indigo-900/50 to-sky-900/50 rounded-xl overflow-hidden border border-gray-100/20 flex flex-col"
          >
            {/* Portada */}
            <div className="relative w-full h-48">
              <Image
                src={cancion.portada}
                alt={cancion.titulo}
                fill
                className="object-cover"
              />
              {/* Botón play superpuesto */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-black ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Detalles */}
            <div className="p-4 flex-1">
              <h4 className="text-blue-400 font-semibold text-lg hover:underline cursor-pointer mb-2">
                {cancion.titulo}
              </h4>
              <p className="text-xs text-gray-400 mb-3">
                Fecha de Lanzamiento: {cancion.fecha}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Streams:</span>
                  <span className="text-sm font-medium text-green-400">
                    {cancion.streams}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Puntaje:</span>
                  <span className="text-sm font-medium text-teal-300">
                    {cancion.puntaje}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Popularidad:</span>
                  <span className="text-sm font-medium text-yellow-300">
                    {cancion.popularidad}/100
                  </span>
                </div>
                {cancion.publicaciones && (
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      Publicaciones:
                    </span>
                    <span className="text-sm font-medium text-pink-300">
                      {cancion.publicaciones}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlbumsSection({ viewAll = false }: { viewAll?: boolean }) {
  const todosLosAlbums = [
    {
      titulo: "BB Bandia",
      fecha: "20 jun 2025",
      puntaje: 32,
      popularidad: "32/100",
      alcance: "159 MI",
      tracks: 12,
      portada: "/bb_bandia.png",
    },
    {
      titulo: "Dedicatoria",
      fecha: "22 may 2025",
      puntaje: 32,
      popularidad: "32/100",
      alcance: "489,8 MI",
      tracks: 8,
      portada: "/dedicatoria.png",
    },
    {
      titulo: "Te Rajo",
      fecha: "1 feb 2024",
      puntaje: 29,
      popularidad: "29/100",
      alcance: "89,2 MI",
      tracks: 1,
      portada: "/te_rajo.png",
    },
    {
      titulo: "Apago",
      fecha: "9 ene 2020",
      puntaje: 23,
      popularidad: "23/100",
      alcance: "111,3 MI",
      tracks: 1,
      portada: "/apago.png",
    },
    // Álbumes adicionales para viewAll
    {
      titulo: "Underground",
      fecha: "15 dic 2023",
      puntaje: 28,
      popularidad: "28/100",
      alcance: "75,3 MI",
      tracks: 10,
      portada: "/perrea.png",
    },
    {
      titulo: "Noches de Santiago",
      fecha: "8 nov 2023",
      puntaje: 31,
      popularidad: "31/100",
      alcance: "95,7 MI",
      tracks: 6,
      portada: "/apago.png",
    },
    {
      titulo: "Freestyle Mixtape",
      fecha: "22 sep 2023",
      puntaje: 26,
      popularidad: "26/100",
      alcance: "58,2 MI",
      tracks: 15,
      portada: "/te_rajo.png",
    },
    {
      titulo: "Barrio Sessions",
      fecha: "5 jul 2023",
      puntaje: 30,
      popularidad: "30/100",
      alcance: "82,1 MI",
      tracks: 8,
      portada: "/bb_bandia.png",
    },
  ];

  const albums = viewAll ? todosLosAlbums : todosLosAlbums.slice(0, 4);

  return (
    <div className="bg-gradient-to-br from-cyan-900/40 to-emerald-900/20 text-white p-6 rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Álbumes y EPs</h2>
          <p className="text-sm text-gray-400">Discografía completa</p>
        </div>
      </div>

      {/* Último lanzamiento destacado - solo mostrar en vista resumida */}
      {!viewAll && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-violet-900/20 via-green-900/10 to-lime-800/10 rounded-lg p-6 flex gap-6 items-center border border-gray-700/20">
            <div className="w-32 h-32 relative">
              <Image
                src="/bb_bandia.png"
                alt="BB Bandia"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-yellow-600/50 text-yellow-300 px-2 py-1 rounded">
                  🆕 Último Lanzamiento
                </span>
              </div>
              <h4 className="text-yellow-300 font-semibold text-2xl mb-2">
                BB Bandia
              </h4>
              <p className="text-gray-400 text-sm mb-3">
                Fecha de Lanzamiento: 20 jun 2025 • 12 tracks
              </p>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-gray-400">Puntaje:</span>
                  <div className="text-yellow-200 font-medium">
                    {albums[0].puntaje}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">Popularidad:</span>
                  <div className="text-yellow-200 font-medium">
                    {albums[0].popularidad}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">Alcance:</span>
                  <div className="text-yellow-200 font-medium">
                    {albums[0].alcance}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid de álbumes */}
      <div
        className={`grid gap-6 ${
          viewAll
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {albums.map((album, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-violet-900/20 to-emerald-800/20 border border-gray-700/20 rounded-lg p-4 hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="w-full aspect-square mb-4 relative">
              <Image
                src={album.portada}
                alt={album.titulo}
                fill
                className="rounded-md object-cover"
              />
            </div>
            <h4 className="text-yellow-300 font-semibold mb-1">
              {album.titulo}
            </h4>
            <p className="text-sm text-gray-400 mb-2">{album.fecha}</p>
            <p className="text-xs text-gray-500 mb-3">{album.tracks} tracks</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Puntaje:</span>
                <span className="text-yellow-200">{album.puntaje}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Popularidad:</span>
                <span className="text-yellow-200">{album.popularidad}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EstadisticasGenerales() {
  const estadisticas = [
    {
      label: "Total de Canciones",
      value: "127",
      icon: "🎵",
      color: "from-blue-500 to-cyan-500",
      description: "En catálogo",
    },
    {
      label: "Total Streams",
      value: "8.2M",
      icon: "📊",
      color: "from-green-500 to-emerald-500",
      description: "Reproducciones",
    },
    {
      label: "Álbumes Lanzados",
      value: "15",
      icon: "💿",
      color: "from-purple-500 to-pink-500",
      description: "Discografía",
    },
    {
      label: "En Charts",
      value: "45",
      icon: "📈",
      color: "from-yellow-500 to-orange-500",
      description: "Posiciones",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {estadisticas.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-4"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div
              className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
            >
              <span className="text-lg">{stat.icon}</span>
            </div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-xs text-gray-500">{stat.description}</div>
        </div>
      ))}
    </div>
  );
}

export default function CancionesPage() {
  const [activeTab, setActiveTab] = useState("overview");

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
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-gray-400">No se encontraron datos de canciones</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "mis-tracks":
        return <CancionesPrincipales viewAll={true} />;
      case "playlists":
        return <AlbumsSection viewAll={true} />;
      default:
        return (
          <>
            {/* Estadísticas Generales */}
            <EstadisticasGenerales />

            {/* Top Canciones */}
            <CancionesPrincipales />

            {/* Álbumes */}
            <AlbumsSection />
          </>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <SongsHeader />

      {/* Navigation */}
      <SongsNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content based on active tab */}
      {renderContent()}
    </div>
  );
}
