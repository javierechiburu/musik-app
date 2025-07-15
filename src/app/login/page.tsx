"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { axiosInstance } from "@/config/axios/axiosInstance";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  
  // Estados simplificados para cambio de contraseña
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  
  // Refs para control de ejecución única
  const checkExecutedRef = useRef(false);
  const lastUserIdRef = useRef<string | null>(null);
  
  const router = useRouter();
  const { login, user, loading, mustChangePassword: contextMustChangePassword, refreshUserData } = useAuth();

  // Rate limiting simple
  const MAX_ATTEMPTS = 5;

  // Función para verificar datos del usuario una sola vez
  const checkUserAndDecide = useCallback(async (authenticatedUser: any) => {
    const userId = authenticatedUser?.id;
    
    if (!userId) {
      console.error('❌ No hay usuario autenticado');
      return;
    }

    // Prevenir ejecuciones duplicadas
    if (checkExecutedRef.current && lastUserIdRef.current === userId) {
      console.log('✅ Verificación ya ejecutada para este usuario');
      return;
    }

    console.log('🔍 Verificando datos del usuario:', userId);
    checkExecutedRef.current = true;
    lastUserIdRef.current = userId;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/usuario?select=role,must_change_password&auth_id=eq.${userId}`,
        {
          method: 'GET',
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const userData = await response.json();
      console.log('📊 Datos recibidos:', userData);

      if (userData && userData.length > 0) {
        const userInfo = userData[0];
        
        console.log('🎯 Procesando usuario:', {
          role: userInfo.role,
          mustChangePassword: userInfo.must_change_password,
          userId
        });

        // Limpiar cualquier error previo ya que SÍ encontramos datos
        setErrorMessage("");

        if (userInfo.must_change_password === true) {
          console.log('🔒 Mostrando formulario de cambio de contraseña');
          setShowPasswordChange(true);
        } else {
          console.log('🏠 Redirigiendo a home');
          router.push("/home");
        }
      } else {
        console.error('❌ No se encontraron datos del usuario');
        setErrorMessage("Error: No se encontraron datos del usuario");
      }
    } catch (error) {
      console.error('❌ Error verificando datos:', error);
      setErrorMessage("Error verificando datos del usuario");
      // Reset para permitir retry
      checkExecutedRef.current = false;
      lastUserIdRef.current = null;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Effect principal - manejo simplificado del estado
  useEffect(() => {
    console.log('🔄 Estado actual:', {
      hasUser: !!user,
      loading,
      contextMustChangePassword,
      showPasswordChange,
      checkExecuted: checkExecutedRef.current,
      lastUserId: lastUserIdRef.current
    });

    // Si está cargando, no hacer nada
    if (loading) {
      return;
    }

    // Si no hay usuario, limpiar todo
    if (!user) {
      setShowPasswordChange(false);
      setErrorMessage("");
      checkExecutedRef.current = false;
      lastUserIdRef.current = null;
      return;
    }

    // Si hay usuario y no se ha verificado
    if (user && !checkExecutedRef.current) {
      console.log('🚀 Usuario detectado, iniciando verificación...');
      checkUserAndDecide(user);
    }
    
    // Si hay usuario y ya se verificó, usar contextMustChangePassword como fallback
    if (user && checkExecutedRef.current && contextMustChangePassword && !showPasswordChange) {
      console.log('🔄 Usando contextMustChangePassword como fallback');
      setErrorMessage(""); // Limpiar errores ya que tenemos datos válidos
      setShowPasswordChange(true);
    }
  }, [user, loading, contextMustChangePassword, checkUserAndDecide]);

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
    setErrorMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      // Obtener el token de autenticación actual
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        setErrorMessage("Error: No se pudo obtener el token de autenticación");
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
        await refreshUserData();
        router.push("/home");
      } else {
        setErrorMessage(response.data.error || 'Error al cambiar la contraseña');
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || 'Error al cambiar la contraseña');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    if (!email || !password) {
      setErrorMessage("Debes ingresar email y contraseña.");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Por favor ingresa un email válido.");
      setIsLoading(false);
      return;
    }

    if (attemptCount >= MAX_ATTEMPTS) {
      setErrorMessage(
        "Demasiados intentos fallidos. Intenta de nuevo en 15 minutos."
      );
      setIsLoading(false);
      return;
    }

    try {
      console.log('🔑 Intentando login...');
      const { error } = await login(email, password);

      if (error) {
        setAttemptCount((prev) => prev + 1);
        setErrorMessage("Credenciales incorrectas o usuario no existe.");
        setIsLoading(false);
        return;
      }

      // Reset attempt count on success
      setAttemptCount(0);
      console.log('✅ Login exitoso - esperando verificación de datos');
      // No setear isLoading(false) aquí - lo hará checkUserAndDecide
    } catch (error) {
      console.error("Error durante el login:", error);
      setAttemptCount((prev) => prev + 1);
      setErrorMessage("Error interno. Intenta de nuevo.");
      setIsLoading(false);
      // Reset refs en caso de error
      checkExecutedRef.current = false;
      lastUserIdRef.current = null;
    }
  };

  // Renderizado condicional simplificado
  if (showPasswordChange) {
    // Solo limpiar error una vez si existe, sin console.log en cada render
    if (errorMessage.includes("No se encontraron datos del usuario")) {
      setErrorMessage("");
    }
    
    return (
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 border border-gray-700">
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
                onFocus={() => setShowPasswordRequirements(true)}
                onBlur={() => setShowPasswordRequirements(false)}
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

          {errorMessage && (
            <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || !passwordsMatch}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed ${
              passwordsMatch && !isLoading
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                : 'bg-gray-600 opacity-50'
            }`}
          >
            {isLoading ? (
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
    );
  }

  // Formulario de login normal (sin log en cada render)
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 border border-gray-700">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Bienvenido
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Ingresa a tu cuenta
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
            className="w-full px-3 py-2 sm:py-3 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400 text-sm sm:text-base"
            placeholder="tu@email.com"
            required
          />
        </div>

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
            className="w-full px-3 py-2 sm:py-3 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400 text-sm sm:text-base"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-300"
            >
              Recordarme
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        {errorMessage && (
          <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={isLoading || loading}
          className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading 
            ? "Iniciando sesión..." 
            : loading 
              ? "Cargando..."
              : "Iniciar Sesión"
          }
        </button>
      </form>

      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-sm text-gray-400">
          ¿No tienes cuenta?{" "}
          <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}