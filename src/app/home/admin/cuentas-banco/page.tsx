"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllBankAccounts,
  updateBankAccountVerification,
  deleteBankAccount,
} from "@/apis/bancosAPI";
import ImageLink from "@/components/admin/ImageLink";

export default function CuentasBancoPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedBank, setSelectedBank] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccountStats"] });
    },
  });

  // Mutation para eliminar cuenta
  const deleteMutation = useMutation({
    mutationFn: deleteBankAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccountStats"] });
    },
  });

  // Filtrar cuentas
  const filteredAccounts = accounts.filter((account) => {
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "verified" && account.cuenta_verificada) ||
      (selectedFilter === "pending" && !account.cuenta_verificada);

    const matchesBank =
      selectedBank === "all" || account.banco === selectedBank;

    const matchesSearch =
      searchTerm === "" ||
      account.titular.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.rut.includes(searchTerm) ||
      account.numero_cuenta.includes(searchTerm) ||
      account.usuario?.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesBank && matchesSearch;
  });

  // Obtener bancos únicos para el filtro
  const uniqueBanks = [...new Set(accounts.map((account) => account.banco))];

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
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error al cargar las cuentas bancarias: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur border border-gray-700/50 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtro por estado */}
          <div>
            <label
              htmlFor="estado"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Estado
            </label>
            <select
              id="estado"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">Todas</option>
              <option value="verified">Verificadas</option>
              <option value="pending">Pendientes</option>
            </select>
          </div>

          {/* Filtro por banco */}
          <div>
            <label
              htmlFor="banco"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Banco
            </label>
            <select
              id="banco"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">Todos los bancos</option>
              {uniqueBanks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>

          {/* Búsqueda */}
          <div>
            <label
              htmlFor="buscar"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Buscar
            </label>
            <input
              id="buscar"
              type="text"
              placeholder="Titular, RUT, cuenta, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Tabla de cuentas */}
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur border border-gray-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Datos Bancarios
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Documentos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-700/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {account.titular}
                      </div>
                      <div className="text-sm text-gray-400">
                        {account.usuario?.email}
                      </div>
                      <div className="text-sm text-gray-400">{account.rut}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-white">{account.banco}</div>
                      <div className="text-sm text-gray-400">
                        {account.tipo_cuenta}
                      </div>
                      <div className="text-sm text-gray-400">
                        {account.numero_cuenta}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <ImageLink
                        imageUrl={account.img_cedula!}
                        label="Cédula"
                      />
                      <ImageLink
                        imageUrl={account.img_selfie!}
                        label="Selfie"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        account.cuenta_verificada
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {account.cuenta_verificada ? "Verificada" : "Pendiente"}
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
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          account.cuenta_verificada
                            ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                            : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                      >
                        {account.cuenta_verificada
                          ? "Desverificar"
                          : "Verificar"}
                      </button>
                      <button
                        onClick={() => handleDelete(account.id)}
                        disabled={deleteMutation.isPending}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-medium transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAccounts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400">
              No se encontraron cuentas bancarias
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
