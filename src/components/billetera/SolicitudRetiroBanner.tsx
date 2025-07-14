"use client";

import { useState } from "react";

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

interface SolicitudRetiroBannerProps {
  readonly onSubmit: (request: Partial<WithdrawalRequest>) => void;
}

export default function SolicitudRetiroBanner({
  onSubmit,
}: SolicitudRetiroBannerProps) {
  const [formData, setFormData] = useState({
    amount: "",
    method: "bank_transfer",
    accountInfo: "",
    description: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [verificationStep, setVerificationStep] = useState<
    "form" | "verification" | "success"
  >("form");
  const [verificationCode, setVerificationCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  // Generar código de verificación de 6 dígitos
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos del formulario
    if (!formData.amount || !formData.accountInfo) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    // Enviar código de verificación
    sendVerificationCode();
  };

  const sendVerificationCode = async () => {
    setIsLoading(true);
    const code = generateVerificationCode();
    setSentCode(code);

    try {
      // Simular envío de email
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Aquí iría la llamada real para enviar el email
      const response = await fetch("/api/send-verification-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "artist@email.com", // Usar email del usuario actual
          code: code,
          amount: formData.amount,
        }),
      });

      console.log("Código de verificación enviado:", code); // Solo para desarrollo
      setVerificationStep("verification");
    } catch (error) {
      console.error("Error al enviar código:", error);
      alert("Error al enviar código de verificación. Inténtalo nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCodeAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationError("");

    if (verificationCode !== sentCode) {
      setVerificationError(
        "Código incorrecto. Verifica e inténtalo nuevamente."
      );
      return;
    }

    // Código correcto, procesar retiro
    onSubmit({
      amount: parseFloat(formData.amount),
      method: formData.method,
      accountInfo: formData.accountInfo,
      description: formData.description,
    });

    setVerificationStep("success");

    // Limpiar formulario después de un momento
    setTimeout(() => {
      setFormData({
        amount: "",
        method: "bank_transfer",
        accountInfo: "",
        description: "",
      });
      setShowForm(false);
      setVerificationStep("form");
      setVerificationCode("");
      setSentCode("");
    }, 3000);
  };

  return (
    <div
      className="relative rounded-xl p-8 overflow-hidden bg-emerald-600/40"
      style={{
        border: "1px solid rgba(16, 185, 129, 0.3)",
        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-cyan-700/20"></div>

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
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                <div className="text-2xl mb-2">🔒</div>
                <p className="font-semibold">100% Seguro</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                <div className="text-2xl mb-2">💳</div>
                <p className="font-semibold">Múltiples Métodos</p>
              </div>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-4 bg-white text-green-600 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              💸 Solicitar Retiro Ahora
            </button>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            {/* Paso 1: Formulario de datos */}
            {verificationStep === "form" && (
              <>
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-2xl font-bold mb-6">
                  Completa tu solicitud de retiro
                </h3>

                <form
                  onSubmit={handleFormSubmit}
                  className="space-y-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-left">
                      <label className="block text-sm font-medium text-white mb-2">
                        💰 Monto a retirar (CLP)
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
                        setFormData({
                          ...formData,
                          accountInfo: e.target.value,
                        })
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
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:border-white focus:ring-2 focus:ring-white/20"
                      placeholder="Información adicional sobre el retiro..."
                      rows={2}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {isLoading && (
                        <svg
                          className="animate-spin w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      )}
                      <span>
                        {isLoading
                          ? "📧 Enviando código..."
                          : "📧 Enviar código de verificación"}
                      </span>
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
              </>
            )}

            {/* Paso 2: Verificación por email */}
            {verificationStep === "verification" && (
              <>
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-2xl font-bold mb-4">
                  Verificación de identidad
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  Hemos enviado un código de verificación a tu email. Ingrésalo
                  para confirmar tu solicitud de retiro.
                </p>

                <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-blue-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h4 className="text-blue-200 font-medium">
                        💡 Código de desarrollo
                      </h4>
                      <p className="text-blue-100 text-sm">
                        Para pruebas, el código es: <strong>{sentCode}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={verifyCodeAndSubmit}
                  className="space-y-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="text-center">
                    <label className="block text-sm font-medium text-white mb-4">
                      🔢 Código de verificación (6 dígitos)
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) =>
                        setVerificationCode(e.target.value.replace(/\D/g, ""))
                      }
                      className="w-full max-w-xs mx-auto px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white text-center text-2xl font-bold placeholder-white/70 focus:border-white focus:ring-2 focus:ring-white/20"
                      placeholder="000000"
                      required
                    />
                  </div>

                  {verificationError && (
                    <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <svg
                          className="w-5 h-5 text-red-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-red-200 text-sm">
                          {verificationError}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      type="submit"
                      className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                    >
                      ✅ Verificar y confirmar retiro
                    </button>
                    <button
                      type="button"
                      onClick={() => setVerificationStep("form")}
                      className="px-8 py-4 bg-green-600/80 backdrop-blur-sm rounded-xl font-semibold text-lg border border-green-500/50 hover:bg-green-500/80 transition-all duration-300"
                    >
                      ⬅️ Volver
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Paso 3: Éxito */}
            {verificationStep === "success" && (
              <>
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold mb-4">
                  ¡Solicitud enviada exitosamente!
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  Tu solicitud de retiro por <strong>${formData.amount}</strong>{" "}
                  ha sido procesada y enviada al equipo de administración.
                </p>

                <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-6">
                  <div className="text-center">
                    <h4 className="text-green-200 font-medium mb-2">
                      📋 Resumen de la solicitud
                    </h4>
                    <div className="space-y-2 text-green-100 text-sm">
                      <div>
                        💰 <strong>Monto:</strong> ${formData.amount}
                      </div>
                      <div>
                        💳 <strong>Método:</strong>{" "}
                        {formData.method === "bank_transfer"
                          ? "Transferencia Bancaria"
                          : "PayPal"}
                      </div>
                      <div>
                        ⏰ <strong>Tiempo estimado:</strong> 24-48 horas hábiles
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}