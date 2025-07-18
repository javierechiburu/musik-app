"use client";

import { useState, useEffect, useTransition } from "react";
import { redirect } from "next/navigation";
import { axiosInstance } from "@/config/axios/axiosInstance";
import { useAuthStore } from "@/store/authStore";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

export default function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { refreshUserProfile, setUserProfile, userProfile } = useAuthStore();

  // Verificar si las contraseñas coinciden
  useEffect(() => {
    if (newPassword && confirmPassword) {
      setPasswordsMatch(
        newPassword === confirmPassword && newPassword.length >= 6
      );
    } else {
      setPasswordsMatch(false);
    }
  }, [newPassword, confirmPassword]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRedirecting(true);
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
        // Usar la instancia de Supabase del store
        const supabase = createClient();
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          setError("Error: No se pudo autenticar el usuario");
          return;
        }
        
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.access_token) {
          setError("Error: No se pudo obtener el token de autenticación");
          return;
        }

        const response = await axiosInstance.post(
          "/api/change-password",
          { newPassword },
          {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          }
        );

        if (response.data.success) {
          console.log("✅ Contraseña cambiada exitosamente");

          // Update profile locally first for immediate UI response
          if (userProfile) {
            setUserProfile({
              ...userProfile,
              must_change_password: false,
            });
          }
          // Set redirecting state and redirect
          /* redirect("/home"); */
          window.location.href = "/home";
        } else {
          setError(response.data.error || "Error al cambiar la contraseña");
        }
      } catch (error: any) {
        setError(
          error.response?.data?.error || "Error al cambiar la contraseña"
        );
      }
    });
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/FADER-1920X1080.jpg"
          alt="FADER Records Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="max-w-md text-center">
            <div className="mb-8">
              {/* Logo */}
              <div className="mb-6 flex justify-center">
                <Image
                  src="/FADER_LOGO.svg"
                  alt="FADER Records Logo"
                  width={200}
                  height={80}
                  className="drop-shadow-2xl invert"
                />
              </div>
              <h2 className="text-2xl font-light text-gray-200 drop-shadow-md">
                RECORDS
              </h2>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed drop-shadow-md">
              Actualiza tu contraseña para acceder a tu plataforma de gestión
              musical profesional.
            </p>
          </div>
        </div>

        {/* Right Side - Password Change Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="mb-4 flex justify-center">
                <Image
                  src="/FADER_LOGO.svg"
                  alt="FADER Records Logo"
                  width={150}
                  height={60}
                  className="drop-shadow-2xl invert"
                />
              </div>
              <h2 className="text-lg font-light text-gray-200 drop-shadow-md">
                RECORDS
              </h2>
            </div>

            {/* Password Change Card */}
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700/50">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/FADER_LOGO.svg"
                    alt="FADER Records Logo"
                    width={120}
                    height={48}
                    className="drop-shadow-lg opacity-90 invert"
                  />
                </div>
                <h1 className="text-xl font-semibold text-white mb-2">
                  Cambio de contraseña requerido
                </h1>
                <p className="text-gray-400 text-sm">
                  Debes cambiar tu contraseña temporal antes de continuar
                </p>
              </div>

              {/* Warning Banner */}
              <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-yellow-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <p className="text-yellow-200 text-sm">
                    Tu contraseña actual es temporal y debe ser actualizada por
                    seguridad.
                  </p>
                </div>
              </div>

              {/* Password Change Form */}
              <form onSubmit={handlePasswordChange} className="space-y-6">
                {/* New Password */}
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800/80 text-white placeholder-gray-400 transition-all"
                    placeholder="••••••••"
                    required
                    disabled={isPending}
                    minLength={6}
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Confirmar Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800/80 text-white placeholder-gray-400 transition-all"
                    placeholder="••••••••"
                    required
                    disabled={isPending}
                    minLength={6}
                  />
                </div>

                {/* Password Match Indicator */}
                {newPassword && confirmPassword && (
                  <div
                    className={`text-sm p-3 rounded-xl border ${
                      passwordsMatch
                        ? "text-green-400 bg-green-900/30 border-green-700/50"
                        : "text-red-400 bg-red-900/30 border-red-700/50"
                    }`}
                  >
                    {passwordsMatch
                      ? "✓ Las contraseñas coinciden"
                      : "✗ Las contraseñas no coinciden"}
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="text-red-400 text-sm font-medium bg-red-900/30 p-3 rounded-xl border border-red-800/50">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    isPending ||
                    isRedirecting ||
                    !passwordsMatch ||
                    !newPassword
                  }
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRedirecting ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full border border-white/30 overflow-hidden mr-2 spin-slow">
                        <Image
                          src="/FADER-FOTOPERFIL.jpg"
                          alt="Loading"
                          width={20}
                          height={20}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      Redirigiendo...
                    </div>
                  ) : isPending ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full border border-white/30 overflow-hidden mr-2 spin-slow">
                        <Image
                          src="/FADER-FOTOPERFIL.jpg"
                          alt="Loading"
                          width={20}
                          height={20}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      Cambiando contraseña...
                    </div>
                  ) : (
                    "Cambiar Contraseña"
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  ¿Necesitas ayuda?{" "}
                  <a
                    href="#"
                    className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Contacta soporte
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}