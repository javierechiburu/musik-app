"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/config/axios/axiosInstance";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  
  // Estados para cambio de contraseña
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Refs para control de ejecución única
  const checkExecutedRef = useRef(false);
  const lastUserIdRef = useRef<string | null>(null);
  
  const router = useRouter();
  const { signIn, isLoading, isAuthenticated, user } = useAuth();

  // Redirect if already authenticated (using useEffect to avoid render-time setState)
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/home");
    }
  }, [isAuthenticated, isLoading, router]);

  // Effect para manejar el cambio de contraseña después del login exitoso
  useEffect(() => {
    const checkPasswordChangeRequired = async () => {
      if (user && isAuthenticated && !checkExecutedRef.current) {
        try {
          checkExecutedRef.current = true;
          
          // Verificar si el usuario debe cambiar contraseña
          const { createClient } = await import('@supabase/supabase-js');
          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          );
          
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.access_token) {
            const response = await axiosInstance.get('/api/check-password-change-required', {
              headers: {
                'Authorization': `Bearer ${session.access_token}`
              }
            });
            
            if (response.data.mustChangePassword) {
              setShowPasswordChange(true);
            } else {
              setIsRedirecting(true);
              router.push("/home");
            }
          }
        } catch (error) {
          console.error('Error checking password change requirement:', error);
          // En caso de error, redirigir a home
          router.push("/home");
        }
      }
    };

    if (user && isAuthenticated && !isLoading) {
      checkPasswordChangeRequired();
    }
  }, [user, isAuthenticated, isLoading, router]);

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
          // Reset para permitir futuras verificaciones
          checkExecutedRef.current = false;
          lastUserIdRef.current = null;
          setShowPasswordChange(false);
          router.push("/home");
        } else {
          setError(response.data.error || 'Error al cambiar la contraseña');
        }
      } catch (error: any) {
        setError(error.response?.data?.error || 'Error al cambiar la contraseña');
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email y contraseña son requeridos");
      return;
    }

    if (!email.includes("@")) {
      setError("Por favor ingresa un email válido");
      return;
    }

    startTransition(async () => {
      try {
        const { error: signInError } = await signIn(email, password);

        if (signInError) {
          setError(signInError.message || "Error al iniciar sesión");
        }
        // Don't manually redirect here - let the useEffect handle it when isAuthenticated changes
      } catch (err) {
        setError("Error interno. Intenta de nuevo");
        console.error("Login error:", err);
      }
    });
  };

  // Si está redirigiendo, mostrar loading
  if (isRedirecting) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 border border-gray-700">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-white mb-2">Acceso autorizado</h2>
            <p className="text-gray-400">Redirigiendo a la aplicación...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Verificando autenticación...</div>
      </div>
    );
  }

  // Renderizado condicional para cambio de contraseña
  if (showPasswordChange) {
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
              Tu plataforma de gestión musical profesional. Accede a métricas,
              analytics y herramientas para impulsar tu carrera artística.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
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

            {/* Login Card */}
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
                <p className="text-gray-400">Accede a tu panel de control</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800/80 text-white placeholder-gray-400 transition-all"
                    placeholder="tu@email.com"
                    required
                    disabled={isPending}
                    autoComplete="email"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800/80 text-white placeholder-gray-400 transition-all"
                    placeholder="••••••••"
                    required
                    disabled={isPending}
                    autoComplete="current-password"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="text-red-400 text-sm font-medium bg-red-900/30 p-3 rounded-xl border border-red-800/50">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-purple-600"
                >
                  {isPending ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Iniciando sesión...
                    </div>
                  ) : (
                    "Iniciar Sesión"
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