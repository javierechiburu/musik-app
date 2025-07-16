"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  processBankAccountRegistration,
  fetchUserBankAccount,
} from "@/apis/billeteraAPI";
import { useAuthStore } from "@/store/authStore";

interface BankAccountFormData {
  titular: string;
  rut: string;
  banco: string;
  tipo_cuenta: string;
  numero_cuenta: string;
}

export default function BankAccountForm() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<BankAccountFormData>({
    titular: "",
    rut: "",
    banco: "",
    tipo_cuenta: "",
    numero_cuenta: "",
  });
  const [cedulaFile, setCedulaFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<BankAccountFormData>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Query para obtener cuenta bancaria existente
  const {
    data: existingAccount,
    isLoading: loadingData,
    error,
  } = useQuery({
    queryKey: ["userBankAccount"],
    queryFn: fetchUserBankAccount,
  });

  // Mutation para procesar registro/actualización
  const bankAccountMutation = useMutation({
    mutationFn: ({
      formData,
      cedulaFile,
      selfieFile,
    }: {
      formData: Omit<any, "img_cedula" | "img_selfie">;
      cedulaFile?: File;
      selfieFile?: File;
    }) => processBankAccountRegistration(formData, cedulaFile, selfieFile),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userBankAccount"] });
      const message =
        data.operation === "actualizada"
          ? "Cuenta bancaria actualizada correctamente"
          : "Cuenta bancaria registrada correctamente";
      setModalMessage(message);
      setShowSuccessModal(true);

      // Clear file inputs but keep form data
      setCedulaFile(null);
      setSelfieFile(null);
    },
    onError: (error: any) => {
      setModalMessage(error.message || "Error al procesar cuenta bancaria");
      setShowErrorModal(true);
    },
  });

  // Load existing data into form when it's available
  useEffect(() => {
    if (existingAccount) {
      setFormData({
        titular: existingAccount.titular || "",
        rut: existingAccount.rut || "",
        banco: existingAccount.banco || "",
        tipo_cuenta: existingAccount.tipo_cuenta || "",
        numero_cuenta: existingAccount.numero_cuenta || "",
      });
    }
  }, [existingAccount]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof BankAccountFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: "cedula" | "selfie"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith("image/")) {
        alert("Por favor selecciona solo archivos de imagen");
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("El archivo debe ser menor a 5MB");
        return;
      }

      if (fileType === "cedula") {
        setCedulaFile(file);
      } else {
        setSelfieFile(file);
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BankAccountFormData> = {};

    if (!formData.titular.trim()) newErrors.titular = "El titular es requerido";
    if (!formData.rut.trim()) newErrors.rut = "El RUT es requerido";
    if (!formData.banco.trim()) newErrors.banco = "El banco es requerido";
    if (!formData.tipo_cuenta.trim())
      newErrors.tipo_cuenta = "El tipo de cuenta es requerido";
    if (!formData.numero_cuenta.trim())
      newErrors.numero_cuenta = "El número de cuenta es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(user);
    if (!validateForm()) return;
    if (!user?.id) {
      setModalMessage("Error: Usuario no autenticado");
      setShowErrorModal(true);
      return;
    }

    const bankAccountData = {
      ...formData,
      usuario_id: user.id,
    };

    bankAccountMutation.mutate({
      formData: bankAccountData,
      cedulaFile: cedulaFile || undefined,
      selfieFile: selfieFile || undefined,
    });
  };

  const hasExistingAccount = !!existingAccount;

  if (loadingData) {
    return (
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <span className="ml-2 text-white">Cargando información...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur border border-gray-700/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">
        {hasExistingAccount
          ? "Actualizar Cuenta Bancaria"
          : "Registrar Cuenta Bancaria"}
      </h3>

      {hasExistingAccount && (
        <div className="mb-4 p-3 bg-blue-900/30 border border-blue-500/50 rounded-lg">
          <p className="text-sm text-blue-300">
            Ya tienes una cuenta bancaria registrada. Puedes actualizar la
            información a continuación.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información Bancaria */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Titular de la Cuenta *
            </label>
            <input
              type="text"
              name="titular"
              value={formData.titular}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-700/50 border ${
                errors.titular ? "border-red-500" : "border-gray-600"
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Nombre completo del titular"
            />
            {errors.titular && (
              <p className="text-red-400 text-sm mt-1">{errors.titular}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              RUT *
            </label>
            <input
              type="text"
              name="rut"
              value={formData.rut}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-700/50 border ${
                errors.rut ? "border-red-500" : "border-gray-600"
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="12.345.678-9"
            />
            {errors.rut && (
              <p className="text-red-400 text-sm mt-1">{errors.rut}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Banco *
            </label>
            <select
              name="banco"
              value={formData.banco}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-700/50 border ${
                errors.banco ? "border-red-500" : "border-gray-600"
              } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="">Seleccionar banco</option>
              <option value="Banco de Chile">Banco de Chile</option>
              <option value="Banco Santander">Banco Santander</option>
              <option value="Banco Estado">Banco Estado</option>
              <option value="Banco BCI">Banco BCI</option>
              <option value="Banco Itaú">Banco Itaú</option>
              <option value="Banco Security">Banco Security</option>
              <option value="Banco Falabella">Banco Falabella</option>
              <option value="Banco Ripley">Banco Ripley</option>
              <option value="Scotiabank">Scotiabank</option>
              <option value="Banco Consorcio">Banco Consorcio</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.banco && (
              <p className="text-red-400 text-sm mt-1">{errors.banco}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de Cuenta *
            </label>
            <select
              name="tipo_cuenta"
              value={formData.tipo_cuenta}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-700/50 border ${
                errors.tipo_cuenta ? "border-red-500" : "border-gray-600"
              } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="">Seleccionar tipo</option>
              <option value="Cuenta Corriente">Cuenta Corriente</option>
              <option value="Cuenta de Ahorro">Cuenta de Ahorro</option>
              <option value="Cuenta Vista">Cuenta Vista</option>
            </select>
            {errors.tipo_cuenta && (
              <p className="text-red-400 text-sm mt-1">{errors.tipo_cuenta}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Número de Cuenta *
            </label>
            <input
              type="text"
              name="numero_cuenta"
              value={formData.numero_cuenta}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-700/50 border ${
                errors.numero_cuenta ? "border-red-500" : "border-gray-600"
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Número de cuenta bancaria"
            />
            {errors.numero_cuenta && (
              <p className="text-red-400 text-sm mt-1">
                {errors.numero_cuenta}
              </p>
            )}
          </div>
        </div>

        {/* Documentos de Verificación */}
        <div className="border-t border-gray-700/50 pt-6">
          <h4 className="text-lg font-semibold text-white mb-4">
            Documentos de Verificación
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Foto de Cédula/Pasaporte/DNI
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "cedula")}
                  className="hidden"
                  id="cedula-upload"
                />
                <label htmlFor="cedula-upload" className="cursor-pointer block">
                  <div className="text-gray-400 mb-2">
                    <svg
                      className="w-12 h-12 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400">
                    {cedulaFile
                      ? cedulaFile.name
                      : "Haz clic para subir imagen"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG hasta 5MB
                  </p>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Selfie con Documento
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "selfie")}
                  className="hidden"
                  id="selfie-upload"
                />
                <label htmlFor="selfie-upload" className="cursor-pointer block">
                  <div className="text-gray-400 mb-2">
                    <svg
                      className="w-12 h-12 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400">
                    {selfieFile
                      ? selfieFile.name
                      : "Haz clic para subir imagen"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG hasta 5MB
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de Envío */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={bankAccountMutation.isPending}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              bankAccountMutation.isPending
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {bankAccountMutation.isPending
              ? hasExistingAccount
                ? "Actualizando..."
                : "Registrando..."
              : hasExistingAccount
              ? "Actualizar Cuenta Bancaria"
              : "Registrar Cuenta Bancaria"}
          </button>
        </div>
      </form>

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
