"use client";

import { useState } from "react";
import { sendVerificationEmail } from "@/apis/emailAPI";

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
      const emailResult = await sendVerificationEmail({
        email: "artist@email.com", // Usar email del usuario actual
        code: code,
        amount: formData.amount,
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
    <div className="relative rounded-lg p-4 overflow-hidden bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-sm border border-emerald-400/30 shadow-lg ring-1 ring-emerald-400/20">
      {/* Contenido */}
      <div className="relative z-10">
        {!showForm ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-xl flex items-center justify-center border border-emerald-400/30">
                <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Solicitar Retiro</h3>
                <p className="text-sm text-gray-300">Saldo disponible: <span className="text-emerald-300 font-semibold">$2,140</span></p>
              </div>
            </div>
            
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
            >
              Retirar Fondos
            </button>
          </div>
        ) : (
          <div>
            {/* Paso 1: Formulario de datos */}
            {verificationStep === "form" && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Completar solicitud</h3>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Monto (CLP)
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
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
                        placeholder="0.00"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Método
                      </label>
                      <select
                        value={formData.method}
                        onChange={(e) =>
                          setFormData({ ...formData, method: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
                      >
                        <option value="bank_transfer" className="bg-gray-800">
                          Transferencia
                        </option>
                        <option value="paypal" className="bg-gray-800">
                          PayPal
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Información de la cuenta
                    </label>
                    <textarea
                      value={formData.accountInfo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          accountInfo: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
                      placeholder="Ej: Banco Estado, Cuenta 123456789, RUT 12.345.678-9"
                      rows={2}
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm"
                    >
                      {isLoading && (
                        <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      <span>
                        {isLoading ? "Enviando..." : "Continuar"}
                      </span>
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Paso 2: Verificación por email */}
            {verificationStep === "verification" && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Verificación de email</h3>
                  <button
                    type="button"
                    onClick={() => setVerificationStep("form")}
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
                  <p className="text-blue-200 text-sm">
                    Código de prueba: <span className="font-mono bg-blue-900/30 px-2 py-1 rounded text-xs">{sentCode}</span>
                  </p>
                </div>

                <form onSubmit={verifyCodeAndSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Código de verificación
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) =>
                        setVerificationCode(e.target.value.replace(/\D/g, ""))
                      }
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-center font-mono placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
                      placeholder="000000"
                      required
                    />
                  </div>

                  {verificationError && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                      <p className="text-red-300 text-xs">{verificationError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm"
                  >
                    Confirmar retiro
                  </button>
                </form>
              </>
            )}

            {/* Paso 3: Éxito */}
            {verificationStep === "success" && (
              <>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Solicitud enviada</h3>
                    <p className="text-gray-400 text-sm">Se procesará en 24-48 horas</p>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Monto:</span>
                    <span className="text-white font-medium">${formData.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-400">Método:</span>
                    <span className="text-white font-medium">
                      {formData.method === "bank_transfer" ? "Transferencia" : "PayPal"}
                    </span>
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
