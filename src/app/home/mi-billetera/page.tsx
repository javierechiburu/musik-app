"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchArtistEarnings, getMockEarningsData } from "@/apis/sonosuiteAPI";
import HeaderPage, {
  HeaderIcon,
  HeaderButton,
} from "@/components/ui/HeaderPage";

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

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative">
        <div className="flex items-end space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="rounded-sm animate-pulse"
              style={{
                width: "3px",
                height: `${16 + i * 4}px`,
                background: "linear-gradient(to top, #667eea, #764ba2)",
                animationDelay: `${i * 0.15}s`,
                animationDuration: "1.2s",
              }}
            ></div>
          ))}
        </div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <p className="text-sm font-medium" style={{ color: "#8B949E" }}>
            Cargando...
          </p>
        </div>
      </div>
    </div>
  );
}

function WalletHeader() {
  return (
    <HeaderPage overlayColor="green" height="md">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <HeaderIcon colorGradient="from-green-500 to-emerald-500">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
          </HeaderIcon>
          <div>
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">
              Mi Billetera
            </h3>
            <p className="text-green-200 drop-shadow-md">
              Gestiona tus ingresos y solicitudes de retiro
            </p>
          </div>
        </div>
      </div>
    </HeaderPage>
  );
}

function EarningsOverview({ earnings }: { earnings: EarningsData }) {
  const metricas = [
    {
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 4V2C7 1.45 7.45 1 8 1S9 1.45 9 2V4H15V2C15 1.45 15.45 1 16 1S17 1.45 17 2V4H20C21.11 4 22 4.89 22 6V20C22 21.11 21.11 22 20 22H4C2.89 22 2 21.11 2 20V6C2 4.89 2.89 4 4 4H7M4 8V20H20V8H4M12 9L17 14H14V18H10V14H7L12 9Z" />
        </svg>
      ),
      label: "Total Generado",
      value: `$${earnings.totalEarnings.toLocaleString()}`,
      description: "Ingresos de por vida",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
      ),
      label: "Disponible",
      value: `$${earnings.availableBalance.toLocaleString()}`,
      description: "Listo para retirar",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
        </svg>
      ),
      label: "Pendiente",
      value: `$${earnings.pendingPayments.toLocaleString()}`,
      description: "En procesamiento",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
        </svg>
      ),
      label: "Último Pago",
      value: earnings.lastPaymentDate,
      description: "Fecha del retiro",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6 border border-blue-900/20 shadow mb-6">
      <h3 className="text-xl font-bold text-white mb-6">Resumen de Ingresos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricas.map((metrica, index) => (
          <div
            key={index}
            className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div
                className={`w-10 h-10 bg-gradient-to-r ${metrica.color} rounded-lg flex items-center justify-center`}
              >
                {metrica.icon}
              </div>
              <div className="text-sm text-gray-400">{metrica.label}</div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {metrica.value}
            </div>
            <div className="text-xs text-gray-500">{metrica.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WithdrawalForm({
  onSubmit,
}: {
  onSubmit: (request: Partial<WithdrawalRequest>) => void;
}) {
  const [formData, setFormData] = useState({
    amount: "",
    method: "bank_transfer",
    accountInfo: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: parseFloat(formData.amount),
      method: formData.method,
      accountInfo: formData.accountInfo,
      description: formData.description,
    });
    setFormData({
      amount: "",
      method: "bank_transfer",
      accountInfo: "",
      description: "",
    });
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Solicitar Retiro</h3>
          <p className="text-gray-400">
            Completa el formulario para retirar tus fondos
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Monto a retirar (USD)
            </label>
            <input
              type="number"
              step="0.01"
              min="1"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              M�todo de pago
            </label>
            <select
              value={formData.method}
              onChange={(e) =>
                setFormData({ ...formData, method: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="bank_transfer">Transferencia Bancaria</option>
              <option value="paypal">PayPal</option>
              <option value="crypto">Criptomonedas</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Informaci�n de la cuenta
          </label>
          <textarea
            value={formData.accountInfo}
            onChange={(e) =>
              setFormData({ ...formData, accountInfo: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Ej: Banco Estado, Cuenta Corriente 123456789, RUT 12.345.678-9"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Descripci�n adicional (opcional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Informaci�n adicional sobre el retiro..."
            rows={2}
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 hover:-translate-y-1 shadow-lg flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>Solicitar Retiro</span>
        </button>
      </form>
    </div>
  );
}

function WithdrawalHistory({ requests }: { requests: WithdrawalRequest[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-400";
      case "rejected":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-yellow-500/20 text-yellow-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Aprobado";
      case "rejected":
        return "Rechazado";
      default:
        return "Pendiente";
    }
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2-7H3v2h2v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h2V4zm-4 15H7V6h10v13z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Historial de Solicitudes
            </h3>
            <p className="text-gray-400">Todas tus solicitudes de retiro</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700/50 border-b border-gray-600/50">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Monto
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                M�todo
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {requests.map((request) => (
              <tr
                key={request.id}
                className="hover:bg-gray-700/30 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {request.requestDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-white font-medium">
                    ${request.amount.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {request.method}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {getStatusText(request.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function MiBilleteraPage() {
  const [withdrawalRequests, setWithdrawalRequests] = useState<
    WithdrawalRequest[]
  >([
    {
      id: "1",
      amount: 1250.0,
      method: "Transferencia Bancaria",
      accountInfo: "Banco Estado - 123456789",
      status: "approved",
      requestDate: "2025-07-10",
      processedDate: "2025-07-11",
    },
    {
      id: "2",
      amount: 750.5,
      method: "PayPal",
      accountInfo: "artist@email.com",
      status: "pending",
      requestDate: "2025-07-12",
    },
  ]);

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

  const handleWithdrawalSubmit = async (
    requestData: Partial<WithdrawalRequest>
  ) => {
    const newRequest: WithdrawalRequest = {
      id: Date.now().toString(),
      amount: requestData.amount!,
      method: requestData.method!,
      accountInfo: requestData.accountInfo!,
      status: "pending",
      requestDate: new Date().toISOString().split("T")[0],
      description: requestData.description,
    };

    setWithdrawalRequests((prev) => [newRequest, ...prev]);

    try {
      const response = await fetch("/api/send-withdrawal-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artistName: "Noiss",
          amount: requestData.amount,
          method: requestData.method,
          accountInfo: requestData.accountInfo,
          description: requestData.description,
        }),
      });

      if (response.ok) {
        alert("Solicitud enviada exitosamente al administrador");
      } else {
        alert("Error al enviar la solicitud. Int�ntalo nuevamente.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexi�n. Int�ntalo nuevamente.");
    }
  };

  return (
    <div className="space-y-6">
      <WalletHeader />

      {isLoadingEarnings ? (
        <LoadingSpinner />
      ) : (
        <>
          <EarningsOverview earnings={earningsData} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <WithdrawalForm onSubmit={handleWithdrawalSubmit} />

            <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Ingresos por Mes
              </h3>
              <div className="space-y-4">
                {earningsData.monthlyEarnings.map((month, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg"
                  >
                    <div>
                      <div className="text-white font-medium">
                        {month.month}
                      </div>
                      <div className="text-sm text-gray-400">
                        {month.streams.toLocaleString()} streams
                      </div>
                    </div>
                    <div className="text-green-400 font-bold">
                      ${month.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <WithdrawalHistory requests={withdrawalRequests} />
    </div>
  );
}
