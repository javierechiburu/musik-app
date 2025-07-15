"use client";

import { useState, useEffect } from "react";
import { axiosInstance } from "@/config/axios/axiosInstance";
import { createClient } from "@/lib/supabase/client";

export default function PasswordChangeForm() {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [newPasswordValid, setNewPasswordValid] = useState(false);

  // Verificar si las contraseñas coinciden y la nueva es válida
  useEffect(() => {
    if (passwords.new && passwords.confirm) {
      setPasswordsMatch(passwords.new === passwords.confirm && passwords.new.length >= 6);
    } else {
      setPasswordsMatch(false);
    }
    
    setNewPasswordValid(passwords.new.length >= 6);
  }, [passwords.new, passwords.confirm]);

  const validatePassword = (password: string): string[] => {
    const errors = [];
    if (password.length < 6) {
      errors.push("Debe tener al menos 6 caracteres");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Debe contener al menos una mayúscula");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Debe contener al menos una minúscula");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Debe contener al menos un número");
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(false);

    // Validaciones
    const validationErrors = [];

    if (!passwords.current) {
      validationErrors.push("La contraseña actual es requerida");
    }

    if (!passwords.new) {
      validationErrors.push("La nueva contraseña es requerida");
    } else {
      const passwordErrors = validatePassword(passwords.new);
      validationErrors.push(...passwordErrors);
    }

    if (passwords.new !== passwords.confirm) {
      validationErrors.push("Las contraseñas no coinciden");
    }

    if (passwords.current === passwords.new) {
      validationErrors.push(
        "La nueva contraseña debe ser diferente a la actual"
      );
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Usar la instancia de Supabase del store
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        setErrors(["Error: No se pudo obtener el token de autenticación"]);
        return;
      }

      // Llamar a la API unificada para cambiar contraseña
      const response = await axiosInstance.post('/api/change-password', 
        { 
          currentPassword: passwords.current,
          newPassword: passwords.new 
        },
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        }
      );

      if (response.data.success) {
        console.log('✅ Contraseña de perfil cambiada exitosamente');
        setSuccess(true);
        setPasswords({ current: "", new: "", confirm: "" });
        
        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setErrors([response.data.error || 'Error al cambiar la contraseña']);
      }
    } catch (error: any) {
      console.error('Error cambiando contraseña del perfil:', error);
      setErrors([error.response?.data?.error || 'Error al cambiar la contraseña. Inténtalo de nuevo.']);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return 0;
    if (password.length < 4) return 1;
    if (password.length < 6) return 2;
    if (password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)) return 4;
    if (password.length >= 6) return 3;
    return 2;
  };

  const getPasswordStrengthLabel = (strength: number) => {
    switch (strength) {
      case 0: return "";
      case 1: return "Muy débil";
      case 2: return "Débil";
      case 3: return "Buena";
      case 4: return "Fuerte";
      default: return "";
    }
  };

  const getPasswordStrengthColor = (strength: number) => {
    switch (strength) {
      case 1: return "bg-red-500";
      case 2: return "bg-yellow-500";
      case 3: return "bg-blue-500";
      case 4: return "bg-green-500";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Card de cambio de contraseña integrado */}
      <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur border border-purple-500/20 rounded-xl p-6">
        {/* Header del card */}
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-purple-500/20">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Cambiar Contraseña</h3>
            <p className="text-purple-300 text-sm">Mantén tu cuenta segura actualizando tu contraseña</p>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contraseña Actual */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Contraseña Actual *
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                value={passwords.current}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    current: e.target.value,
                  }))
                }
                className={`w-full px-4 py-3 bg-black/20 border rounded-lg text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                  passwords.current.length === 0 
                    ? 'border-gray-600 focus:border-purple-400' 
                    : passwords.current.length > 0
                      ? 'border-blue-400 focus:border-blue-300'
                      : 'border-gray-600'
                }`}
                placeholder="Ingresa tu contraseña actual"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPasswords.current ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Nueva Contraseña */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Nueva Contraseña *
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                value={passwords.new}
                onChange={(e) =>
                  setPasswords((prev) => ({ ...prev, new: e.target.value }))
                }
                className={`w-full px-4 py-3 bg-black/20 border rounded-lg text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                  passwords.new.length === 0 
                    ? 'border-gray-600 focus:border-purple-400' 
                    : newPasswordValid
                      ? 'border-green-400 focus:border-green-300'
                      : 'border-red-400 focus:border-red-300'
                }`}
                placeholder="Ingresa tu nueva contraseña"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPasswords.new ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
              {newPasswordValid && (
                <div className="absolute inset-y-0 right-10 flex items-center pr-3">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
              
            {/* Indicador de fortaleza de contraseña */}
            {passwords.new && (
              <div className="mt-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded transition-colors ${
                        getPasswordStrength(passwords.new) >= level
                          ? getPasswordStrengthColor(getPasswordStrength(passwords.new))
                          : 'bg-gray-600'
                      }`}
                    ></div>
                  ))}
                </div>
                <p className="text-xs mt-1 text-gray-300">
                  {getPasswordStrengthLabel(getPasswordStrength(passwords.new))}
                </p>
              </div>
            )}
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Confirmar Nueva Contraseña *
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    confirm: e.target.value,
                  }))
                }
                className={`w-full px-4 py-3 bg-black/20 border rounded-lg text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                  passwords.confirm.length === 0 
                    ? 'border-gray-600 focus:border-purple-400'
                    : passwordsMatch
                      ? 'border-green-400 focus:border-green-300'
                      : 'border-red-400 focus:border-red-300'
                }`}
                placeholder="Confirma tu nueva contraseña"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPasswords.confirm ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
              {passwordsMatch && (
                <div className="absolute inset-y-0 right-10 flex items-center pr-3">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Mensaje de coincidencia */}
            {passwords.confirm && (
              <p className={`text-xs mt-1 ${passwordsMatch ? 'text-green-300' : 'text-red-300'}`}>
                {passwordsMatch ? '✓ Las contraseñas coinciden' : '✗ Las contraseñas no coinciden'}
              </p>
            )}
          </div>

            {/* Panel de recomendaciones interactivo */}
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-blue-200 text-sm font-medium">
                    Recomendaciones para tu nueva contraseña:
                  </p>
                  <ul className="text-blue-200 text-xs mt-2 space-y-1">
                    <li className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${passwords.new.length >= 6 ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      <span>Al menos 6 caracteres</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(passwords.new) && /[a-z]/.test(passwords.new) ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      <span>Combina mayúsculas y minúsculas</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${/\d/.test(passwords.new) ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      <span>Incluye números</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${passwords.current !== passwords.new && passwords.new.length > 0 ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      <span>Diferente a la contraseña actual</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Errores */}
            {errors.length > 0 && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-red-200 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-red-200 font-medium mb-1">
                      ⚠️ Error en el formulario
                    </h4>
                    <ul className="text-red-100 text-sm space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Mensaje de éxito */}
            {success && (
              <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-green-200 font-medium">
                      🎉 ¡Contraseña actualizada!
                    </h4>
                    <p className="text-green-100 text-sm">
                      Tu contraseña ha sido cambiada exitosamente.
                    </p>
                  </div>
                </div>
              </div>
            )}

          {/* Botón */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isLoading || !passwordsMatch || !passwords.current}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                passwordsMatch && passwords.current && !isLoading
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isLoading && (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <span>
                {isLoading ? "Cambiando..." : "Cambiar Contraseña"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}