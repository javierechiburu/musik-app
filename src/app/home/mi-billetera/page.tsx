"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchArtistEarnings, getMockEarningsData } from "@/apis/sonosuiteAPI";
import {
  processWithdrawalRequest,
  fetchFormattedWithdrawalRequests,
} from "@/apis/billeteraAPI";
import { LoadingSpinner } from "@/components/ui/Loadings";

// Importar componentes separados
import WalletProfile from "@/components/billetera/WalletProfile";
import ResumenGanancias from "@/components/billetera/ResumenGanancias";
import SolicitudRetiroBanner from "@/components/billetera/SolicitudRetiroBanner";
import HistorialRetiros from "@/components/billetera/HistorialRetiros";
import { useAuthStore } from "@/store/authStore";

interface WithdrawalRequest {
  id: string;
  amount: number;
  method: string;
  accountInfo: string;
  status: "pending" | "approved" | "rejected";
  requestDate: string;
  processedDate?: string;
  description?: string;
}

interface EarningsData {
  totalEarnings: number;
  availableBalance: number;
  pendingPayments: number;
  lastPaymentDate: string;
  monthlyEarnings: Array<{
    month: string;
    amount: number;
    streams: number;
  }>;
}

export default function MiBilleteraPage() {
  // Obtener datos reales de solicitudes de retiro
  const {
    data: withdrawalData,
    isLoading: isLoadingWithdrawals,
    refetch: refetchWithdrawals,
  } = useQuery({
    queryKey: ["withdrawal-requests", "default_user_id"],
    queryFn: () => fetchFormattedWithdrawalRequests("default_user_id"),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  });

  const id_usuario = useAuthStore().user?.id;

  // Usar datos de Sonosuite o mock data
  const { data: sonosuiteData, isLoading: isLoadingEarnings } = useQuery({
    queryKey: ["artist-earnings", "noiss_artist_001"],
    queryFn: () => {
      // Si no hay API key de Sonosuite, usar datos mock
      if (!process.env.NEXT_PUBLIC_SONOSUITE_API_KEY) {
        return Promise.resolve(getMockEarningsData());
      }
      return fetchArtistEarnings("noiss_artist_001");
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  });

  // Transformar datos de Sonosuite a formato local
  const earningsData: EarningsData = sonosuiteData
    ? {
        totalEarnings: sonosuiteData.total_earnings,
        availableBalance: sonosuiteData.available_balance,
        pendingPayments: sonosuiteData.pending_payments,
        lastPaymentDate: sonosuiteData.last_payment_date,
        monthlyEarnings: sonosuiteData.monthly_breakdown.map((month) => ({
          month: `${new Date(2025, month.month - 1).toLocaleDateString("es", {
            month: "short",
          })} ${month.year}`,
          amount: month.net_earnings,
          streams: month.streams,
        })),
      }
    : {
        totalEarnings: 0,
        availableBalance: 0,
        pendingPayments: 0,
        lastPaymentDate: "",
        monthlyEarnings: [],
      };

  console.log(earningsData);

  const handleWithdrawalSubmit = async (
    requestData: Partial<WithdrawalRequest>
  ) => {
    try {
      // Usar la nueva función de la API
      const result = await processWithdrawalRequest(requestData, id_usuario);

      // Refrescar datos de la base de datos
      await refetchWithdrawals();

      if (result && result.database.success) {
        alert("Solicitud guardada exitosamente en la base de datos");
      } else {
        alert(
          "Error al guardar en la base de datos, pero el email fue enviado"
        );
      }
    } catch (error) {
      console.error("Error al procesar solicitud:", error);
      alert("Error al procesar la solicitud. Inténtalo nuevamente.");
    }
  };

  if (isLoadingEarnings || isLoadingWithdrawals) {
    return <LoadingSpinner />;
  }

  // Usar datos reales de la base de datos
  const currentWithdrawalRequests = withdrawalData || [];

  return (
    <div className="space-y-6">
      {/* Header Profile Section */}
      <WalletProfile />

      {/* Resumen de ganancias */}
      <ResumenGanancias />

      {/* Sección prominente para solicitar retiro */}
      <SolicitudRetiroBanner onSubmit={handleWithdrawalSubmit} />

      {/* Solicitudes de retiro */}
      <HistorialRetiros requests={currentWithdrawalRequests} />
    </div>
  );
}
