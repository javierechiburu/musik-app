"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllBankAccounts,
  updateBankAccountVerification,
  deleteBankAccount,
} from "@/apis/bancosAPI";
import ImageLink from "@/components/admin/ImageLink";
import { LoadingSpinner } from "@/components/ui/Loadings";

export default function CuentasBancoPage() {
  const queryClient = useQueryClient();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Query para obtener todas las cuentas bancarias
  const {
    data: accounts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: fetchAllBankAccounts,
  });

  // Mutation para actualizar verificación
  const updateVerificationMutation = useMutation({
    mutationFn: ({ id, verified }: { id: string; verified: boolean }) =>
      updateBankAccountVerification(id, verified),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccountStats"] });
      setModalMessage("Estado de verificación actualizado exitosamente");
      setShowSuccessModal(true);
    },
    onError: (error: any) => {
      setModalMessage(error.message || "Error al actualizar verificación");
      setShowErrorModal(true);
    },
  });

  // Mutation para eliminar cuenta
  const deleteMutation = useMutation({
    mutationFn: deleteBankAccount,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccountStats"] });
      setModalMessage("Cuenta bancaria eliminada exitosamente");
      setShowSuccessModal(true);
    },
    onError: (error: any) => {
      setModalMessage(error.message || "Error al eliminar cuenta");
      setShowErrorModal(true);
    },
  });

  const handleVerificationToggle = (id: string, currentStatus: boolean) => {
    updateVerificationMutation.mutate({ id, verified: !currentStatus });
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres eliminar esta cuenta bancaria?"
      )
    ) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Cuentas Bancarias
            </h1>
            <p className="text-gray-400">
              Gestiona las cuentas bancarias de los usuarios
            </p>
          </div>

          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <svg
                className="w-8 h-8 text-red-400"
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
              <div>
                <h3 className="text-lg font-semibold text-red-400">
                  Error al cargar cuentas bancarias
                </h3>
                <p className="text-gray-300">
                  No se pudieron cargar las cuentas bancarias. Intenta refrescar
                  la página.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tabla de cuentas */}
        <div className="bg-gray-800/50 rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-700/50 border-b border-gray-600">
            <h2 className="text-lg font-semibold text-white">
              Cuentas Bancarias Registradas
            </h2>
          </div>

          {accounts && accounts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/30">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Datos Bancarios
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Documentos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {accounts.map((account) => (
                    <tr
                      key={account.id}
                      className="hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">
                            {account.titular || "Sin titular"}
                          </div>
                          <div className="text-sm text-gray-400">
                            {account.usuario?.email || "Sin email"}
                          </div>
                          <div className="text-sm text-gray-400">
                            {account.rut || "Sin RUT"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-white">
                            {account.banco || "Sin banco"}
                          </div>
                          <div className="text-sm text-gray-400">
                            {account.tipo_cuenta || "Sin tipo"}
                          </div>
                          <div className="text-sm text-gray-400">
                            {account.numero_cuenta || "Sin número"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          {account.img_cedula ? (
                            <ImageLink
                              imageUrl={account.img_cedula}
                              label="Cédula"
                            />
                          ) : (
                            <span className="text-xs text-gray-500 px-2 py-1 bg-gray-700 rounded">
                              Sin cédula
                            </span>
                          )}
                          {account.img_selfie ? (
                            <ImageLink
                              imageUrl={account.img_selfie}
                              label="Selfie"
                            />
                          ) : (
                            <span className="text-xs text-gray-500 px-2 py-1 bg-gray-700 rounded">
                              Sin selfie
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            account.cuenta_verificada
                              ? "bg-green-900/50 text-green-300 border border-green-700"
                              : "bg-yellow-900/50 text-yellow-300 border border-yellow-700"
                          }`}
                        >
                          {account.cuenta_verificada
                            ? "Verificada"
                            : "Pendiente"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              handleVerificationToggle(
                                account.id,
                                account.cuenta_verificada
                              )
                            }
                            disabled={updateVerificationMutation.isPending}
                            className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white transition-colors ${
                              account.cuenta_verificada
                                ? "bg-yellow-600 hover:bg-yellow-700"
                                : "bg-green-600 hover:bg-green-700"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {updateVerificationMutation.isPending ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                Procesando...
                              </>
                            ) : (
                              <>
                                <svg
                                  className="mr-2 h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                      account.cuenta_verificada
                                        ? "M6 18L18 6M6 6l12 12"
                                        : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    }
                                  />
                                </svg>
                                {account.cuenta_verificada
                                  ? "Desverificar"
                                  : "Verificar"}
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(account.id)}
                            disabled={deleteMutation.isPending}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {deleteMutation.isPending ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                Eliminando...
                              </>
                            ) : (
                              <>
                                <svg
                                  className="mr-2 h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                Eliminar
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <p className="mt-4 text-lg text-gray-400">
                No hay cuentas bancarias registradas
              </p>
              <p className="text-sm text-gray-500">
                Las nuevas cuentas aparecerán aquí
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 border border-green-500/30">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400">
                  ¡Éxito!
                </h3>
                <p className="text-gray-300 text-sm mt-1">{modalMessage}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Error */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 border border-red-500/30">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0">
                <svg
                  className="w-8 h-8 text-red-400"
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
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-400">Error</h3>
                <p className="text-gray-300 text-sm mt-1">{modalMessage}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowErrorModal(false)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
