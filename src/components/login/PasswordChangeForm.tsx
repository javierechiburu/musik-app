"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/config/axios/axiosInstance";

interface PasswordChangeFormProps {
  readonly onPasswordChanged: () => void;
}

export default function PasswordChangeForm({ onPasswordChanged }: PasswordChangeFormProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  // Verificar si las contraseñas coinciden
  useEffect(() => {
    if (newPassword && confirmPassword) {
      setPasswordsMatch(newPassword === confirmPassword && newPassword.length >= 6);
    } else {
      setPasswordsMatch(false);
    }
  }, [newPassword, confirmPassword]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    startTransition(async () => {
      try {
        // Obtener el token de autenticación actual
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.access_token) {
          setError("Error: No se pudo obtener el token de autenticación");
          return;
        }

        const response = await axiosInstance.post('/api/change-password', 
          { newPassword },
          {
            headers: {
              'Authorization': `Bearer ${session.access_token}`
            }
          }
        );

        if (response.data.success) {
          console.log('✅ Contraseña cambiada exitosamente');
          onPasswordChanged();
          router.push("/home");
        } else {
          setError(response.data.error || 'Error al cambiar la contraseña');
        }
      } catch (error: any) {
        setError(error.response?.data?.error || 'Error al cambiar la contraseña');
      }
    });
  };

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 border border-gray-700 max-w-md w-full">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Cambio de contraseña requerido
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Debes cambiar tu contraseña temporal antes de continuar
          </p>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4 sm:space-y-6">
          <div className="relative">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Nueva contraseña
            </label>
            <div className="relative">
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none transition-all duration-200 bg-gray-700 text-white placeholder-gray-400 text-sm sm:text-base ${
                  newPassword.length === 0 
                    ? 'border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' 
                    : newPassword.length >= 6 
                      ? 'border-green-500 focus:border-green-400 focus:ring-2 focus:ring-green-500/20'
                      : 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20'
                }`}
                placeholder="Mínimo 6 caracteres"
                required
              />
              {newPassword.length >= 6 && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Indicador de fortaleza de contraseña */}
            {newPassword && (
              <div className="mt-2">
                <div className="flex space-x-1">
                  <div className={`h-1 flex-1 rounded ${newPassword.length >= 2 ? 'bg-red-500' : 'bg-gray-600'}`}></div>
                  <div className={`h-1 flex-1 rounded ${newPassword.length >= 4 ? 'bg-yellow-500' : 'bg-gray-600'}`}></div>
                  <div className={`h-1 flex-1 rounded ${newPassword.length >= 6 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                  <div className={`h-1 flex-1 rounded ${newPassword.length >= 8 ? 'bg-green-600' : 'bg-gray-600'}`}></div>
                </div>
                <p className="text-xs mt-1 text-gray-400">
                  {newPassword.length < 6 ? 'Contraseña débil' : newPassword.length < 8 ? 'Contraseña buena' : 'Contraseña fuerte'}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none transition-all duration-200 bg-gray-700 text-white placeholder-gray-400 text-sm sm:text-base ${
                  confirmPassword.length === 0 
                    ? 'border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    : passwordsMatch
                      ? 'border-green-500 focus:border-green-400 focus:ring-2 focus:ring-green-500/20'
                      : 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20'
                }`}
                placeholder="Repite la nueva contraseña"
                required
              />
              {passwordsMatch && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Mensaje de coincidencia */}
            {confirmPassword && (
              <p className={`text-xs mt-1 ${passwordsMatch ? 'text-green-400' : 'text-red-400'}`}>
                {passwordsMatch ? '✓ Las contraseñas coinciden' : '✗ Las contraseñas no coinciden'}
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-500 font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={isPending || !passwordsMatch}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed ${
              passwordsMatch && !isPending
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                : 'bg-gray-600 opacity-50'
            }`}
          >
            {isPending ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Cambiando contraseña...</span>
              </div>
            ) : passwordsMatch ? (
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Cambiar contraseña</span>
              </div>
            ) : (
              "Cambiar contraseña"
            )}
          </button>
        </form>

        <div className="mt-4 sm:mt-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg p-4">
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
                  <div className={`w-1.5 h-1.5 rounded-full ${newPassword.length >= 6 ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  <span>Al menos 6 caracteres</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  <span>Combina mayúsculas y minúsculas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${/\d/.test(newPassword) ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  <span>Incluye números</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${!/(.)\1{2,}/.test(newPassword) && newPassword.length > 0 ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  <span>Evita repetir caracteres</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}