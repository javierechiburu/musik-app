"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchArtistData } from "@/apis/homeAPI";
import { LoadingSpinner } from "@/components/ui/Loadings";

// Importar todos los componentes nuevos
import ErrorMessage from "@/components/home/ErrorMessage";
import NoissProfile from "@/components/home/NoissProfile";
import ResumenAudiencia from "@/components/home/ResumenAudiencia";
import MovimientosMetricas from "@/components/home/MovimientosMetricas";
import TopRecentMilestones from "@/components/home/TopRecentMilestones";
import RankingChartmetric from "@/components/home/RankingChartmetric";
import EstadisticasPlataformas from "@/components/home/EstadisticasPlataformas";
import RecuentoPlaylists from "@/components/home/RecuentoPlaylists";
import CancionesPrincipales from "@/components/home/CancionesPrincipales";
import UltimosLanzamientos from "@/components/home/UltimosLanzamientos";

export default function HomePage() {
  const {
    data: rawArtistData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["artist-data"],
    queryFn: () => fetchArtistData(),
    staleTime: 5 * 60 * 1000,
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
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-gray-400">No se encontraron datos del artista</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Profile Section */}
      <NoissProfile />

      {/* Metrics Overview */}
      <MovimientosMetricas />

      {/* Rankings and Milestones Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TopRecentMilestones />
        <RankingChartmetric />
      </div>

      {/* Audience Summary */}
      <ResumenAudiencia />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="col-span-2">
          {/* Platform Statistics */}
          <EstadisticasPlataformas />
        </div>

        {/* Playlist Counts */}
        <RecuentoPlaylists />
      </div>

      {/* Top Songs */}
      <CancionesPrincipales />

      {/* Recent Releases */}
      <UltimosLanzamientos />
    </div>
  );
}
