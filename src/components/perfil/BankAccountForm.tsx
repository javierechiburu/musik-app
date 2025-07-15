"use client";

import { useState } from "react";
import { processBankAccountRegistration } from "@/apis/billeteraAPI";
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
  const [formData, setFormData] = useState<BankAccountFormData>({
    titular: "",
    rut: "",
    banco: "",
    tipo_cuenta: "",
    numero_cuenta: "",
  });
  const [cedulaFile, setCedulaFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<BankAccountFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof BankAccountFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'cedula' | 'selfie') => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona solo archivos de imagen');
        return;
      }
      
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('El archivo debe ser menor a 5MB');
        return;
      }

      if (fileType === 'cedula') {
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
    if (!formData.tipo_cuenta.trim()) newErrors.tipo_cuenta = "El tipo de cuenta es requerido";
    if (!formData.numero_cuenta.trim()) newErrors.numero_cuenta = "El número de cuenta es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!user?.id) {
      alert("Error: Usuario no autenticado");
      return;
    }

    setLoading(true);
    try {
      const bankAccountData = {
        ...formData,
        usuario_id: user.id,
      };

      await processBankAccountRegistration(bankAccountData, cedulaFile || undefined, selfieFile || undefined);
      
      alert("Cuenta bancaria registrada correctamente");
      
      // Limpiar formulario
      setFormData({
        titular: "",
        rut: "",
        banco: "",
        tipo_cuenta: "",
        numero_cuenta: "",
      });
      setCedulaFile(null);
      setSelfieFile(null);
    } catch (error: any) {
      console.error("Error al registrar cuenta bancaria:", error);
      alert(error.message || "Error al registrar cuenta bancaria");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur border border-gray-700/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Registrar Cuenta Bancaria</h3>
      
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
                errors.titular ? 'border-red-500' : 'border-gray-600'
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Nombre completo del titular"
            />
            {errors.titular && <p className="text-red-400 text-sm mt-1">{errors.titular}</p>}
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
                errors.rut ? 'border-red-500' : 'border-gray-600'
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="12.345.678-9"
            />
            {errors.rut && <p className="text-red-400 text-sm mt-1">{errors.rut}</p>}
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
                errors.banco ? 'border-red-500' : 'border-gray-600'
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
            {errors.banco && <p className="text-red-400 text-sm mt-1">{errors.banco}</p>}
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
                errors.tipo_cuenta ? 'border-red-500' : 'border-gray-600'
              } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="">Seleccionar tipo</option>
              <option value="Cuenta Corriente">Cuenta Corriente</option>
              <option value="Cuenta de Ahorro">Cuenta de Ahorro</option>
              <option value="Cuenta Vista">Cuenta Vista</option>
            </select>
            {errors.tipo_cuenta && <p className="text-red-400 text-sm mt-1">{errors.tipo_cuenta}</p>}
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
                errors.numero_cuenta ? 'border-red-500' : 'border-gray-600'
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Número de cuenta bancaria"
            />
            {errors.numero_cuenta && <p className="text-red-400 text-sm mt-1">{errors.numero_cuenta}</p>}
          </div>
        </div>

        {/* Documentos de Verificación */}
        <div className="border-t border-gray-700/50 pt-6">
          <h4 className="text-lg font-semibold text-white mb-4">Documentos de Verificación</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Foto de Cédula/Pasaporte/DNI
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'cedula')}
                  className="hidden"
                  id="cedula-upload"
                />
                <label
                  htmlFor="cedula-upload"
                  className="cursor-pointer block"
                >
                  <div className="text-gray-400 mb-2">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400">
                    {cedulaFile ? cedulaFile.name : "Haz clic para subir imagen"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG hasta 5MB</p>
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
                  onChange={(e) => handleFileChange(e, 'selfie')}
                  className="hidden"
                  id="selfie-upload"
                />
                <label
                  htmlFor="selfie-upload"
                  className="cursor-pointer block"
                >
                  <div className="text-gray-400 mb-2">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400">
                    {selfieFile ? selfieFile.name : "Haz clic para subir imagen"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG hasta 5MB</p>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de Envío */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {loading ? "Registrando..." : "Registrar Cuenta Bancaria"}
          </button>
        </div>
      </form>
    </div>
  );
}