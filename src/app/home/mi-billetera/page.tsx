"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchArtistEarnings, getMockEarningsData } from "@/apis/sonosuiteAPI";
import HeaderPage from "@/components/ui/HeaderPage";
import { LoadingSpinner } from "@/components/ui/Loadings";
import Image from "next/image";

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

function WalletProfile() {
  return (
    <HeaderPage overlayColor="blue" height="md">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(145deg, #10B981 0%, #059669 100%)",
                boxShadow: "0 8px 16px rgba(16, 185, 129, 0.3)",
                border: "3px solid rgba(16, 185, 129, 0.2)",
              }}
            >
              <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                Mi Billetera Digital
              </h3>
              <p className="text-green-100">
                Gestión financiera para artistas • Retiros y Ganancias • FADER
                Records
              </p>
            </div>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex items-center space-x-3 mt-4">
          <span
            className="text-xs px-3 py-1 rounded-full bg-white text-gray-800"
            style={{
              border: "1px solid #10B981",
            }}
          >
            💰 Cuenta Verificada
          </span>
          <span
            className="text-xs px-3 py-1 rounded-full bg-white text-gray-800"
            style={{
              border: "1px solid #10B981",
            }}
          >
            ✅ Disponible para Retiros
          </span>
          <span
            className="text-xs px-3 py-1 rounded-full bg-white text-gray-800"
            style={{
              border: "1px solid #10B981",
            }}
          >
            🏦 Cuenta Premium
          </span>
        </div>
      </div>
    </HeaderPage>
  );
}

function ResumenGanancias() {
  const metricas = [
    {
      icon: "💰",
      label: "Balance Total",
      value: "$4,250",
      description: "Ganancias Acumuladas",
    },
    {
      icon: "💳",
      label: "Disponible",
      value: "$2,140",
      description: "Listo para Retirar",
    },
    {
      icon: "⏳",
      label: "Pendiente",
      value: "$890",
      description: "En Procesamiento",
    },
    {
      icon: "📅",
      label: "Último Retiro",
      value: "15 Jul",
      description: "Hace 2 días",
    },
    {
      icon: "📊",
      label: "Este Mes",
      value: "$1,320",
      description: "Julio 2025",
    },
  ];

  return (
    <div
      className="bg-gradient-to-r from-emerald-900/20 to-green-900/20 rounded-xl border border-green-500/30"
      style={{ boxShadow: "0 8px 32px rgba(16, 185, 129, 0.15)" }}
    >
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {metricas.map((metrica, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-3">{metrica.icon}</div>
              <div className="text-sm text-gray-100 mb-2 font-medium">
                {metrica.label}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {metrica.value}
              </div>
              {metrica.description && (
                <div className="text-xs text-gray-500">
                  {metrica.description}
                </div>
              )}
            </div>
          ))}
        </div>
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

function SolicitudRetiroBanner({
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

  const [showForm, setShowForm] = useState(false);

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
    setShowForm(false);
  };

  return (
    <div
      className="relative rounded-xl p-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)",
        border: "1px solid rgba(16, 185, 129, 0.3)",
        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
      }}
    >
      {/* Fondo con imagen */}
      <div className="absolute inset-0">
        <Image
          src="/FADER-1920X1080.jpg"
          alt="Withdraw Background"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.9) 50%, rgba(4, 120, 87, 0.85) 100%)",
        }}
      ></div>

      {/* Contenido */}
      <div className="relative z-10 text-center text-white">
        {!showForm ? (
          <>
            <div className="text-6xl mb-4">💰</div>
            <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
              ¡Retira tus Ganancias!
            </h2>
            <p className="text-xl mb-6 drop-shadow-md opacity-95 max-w-2xl mx-auto">
              Tienes <span className="font-bold text-2xl">$2,140</span>{" "}
              disponibles para retirar. Solicita tu retiro de forma rápida y
              segura.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                <div className="text-2xl mb-2">⚡</div>
                <p className="font-semibold">Procesamiento Rápido</p>
                <p className="text-sm opacity-90">24-48 horas hábiles</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                <div className="text-2xl mb-2">🔒</div>
                <p className="font-semibold">100% Seguro</p>
                <p className="text-sm opacity-90">Transferencias encriptadas</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                <div className="text-2xl mb-2">💳</div>
                <p className="font-semibold">Múltiples Métodos</p>
                <p className="text-sm opacity-90">Banco, PayPal, Crypto</p>
              </div>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="px-12 py-6 bg-white text-green-600 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              💸 Solicitar Retiro Ahora
            </button>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-6">
              Completa tu solicitud de retiro
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-left">
                  <label className="block text-sm font-medium text-white mb-2">
                    💰 Monto a retirar (USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    max="2140"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:border-white focus:ring-2 focus:ring-white/20"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="text-left">
                  <label className="block text-sm font-medium text-white mb-2">
                    💳 Método de pago
                  </label>
                  <select
                    value={formData.method}
                    onChange={(e) =>
                      setFormData({ ...formData, method: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:border-white focus:ring-2 focus:ring-white/20"
                  >
                    <option value="bank_transfer" className="text-gray-800">
                      Transferencia Bancaria
                    </option>
                    <option value="paypal" className="text-gray-800">
                      PayPal
                    </option>
                    <option value="crypto" className="text-gray-800">
                      Criptomonedas
                    </option>
                  </select>
                </div>
              </div>

              <div className="text-left">
                <label className="block text-sm font-medium text-white mb-2">
                  🏦 Información de la cuenta
                </label>
                <textarea
                  value={formData.accountInfo}
                  onChange={(e) =>
                    setFormData({ ...formData, accountInfo: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:border-white focus:ring-2 focus:ring-white/20"
                  placeholder="Ej: Banco Estado, Cuenta Corriente 123456789, RUT 12.345.678-9"
                  rows={3}
                  required
                />
              </div>

              <div className="text-left">
                <label className="block text-sm font-medium text-white mb-2">
                  📝 Descripción adicional (opcional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:border-white focus:ring-2 focus:ring-white/20"
                  placeholder="Información adicional sobre el retiro..."
                  rows={2}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="submit"
                  className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                >
                  ✅ Confirmar Retiro
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-8 py-4 bg-green-600/80 backdrop-blur-sm rounded-xl font-semibold text-lg border border-green-500/50 hover:bg-green-500/80 transition-all duration-300"
                >
                  ❌ Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function HistorialRetiros({ requests }: { requests: WithdrawalRequest[] }) {
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

  if (isLoadingEarnings) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Header Profile Section */}
      <WalletProfile />

      {/* Resumen de ganancias */}
      <ResumenGanancias />

      {/* Sección prominente para solicitar retiro */}
      <SolicitudRetiroBanner onSubmit={handleWithdrawalSubmit} />

      {/* Solicitudes de retiro */}
      <HistorialRetiros requests={withdrawalRequests} />
    </div>
  );
}
