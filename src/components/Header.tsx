"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const router = useRouter();
  const { logout: authLogout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevenir múltiples clicks
    
    setIsLoggingOut(true);
    console.log('🚪 Iniciando logout...');

    // Timeout de seguridad para evitar que se quede colgado
    const timeoutId = setTimeout(() => {
      console.log('⚠️ Timeout de logout - redirigiendo forzosamente');
      setIsLoggingOut(false);
      try {
        router.push("/login");
      } catch (error) {
        console.error('Error con router.push en timeout, usando window.location:', error);
        window.location.href = "/login";
      }
    }, 3000); // 3 segundos máximo

    try {
      // Usar la función logout del AuthContext que maneja todo correctamente
      await authLogout();
      console.log('✅ Logout completado por AuthContext');
      
      // Limpiar sessionStorage adicional
      try {
        sessionStorage.clear();
        console.log('✅ sessionStorage limpiado');
      } catch (error) {
        console.error('Error limpiando sessionStorage:', error);
      }

      // Limpiar cookies manualmente como extra
      try {
        const cookiesToClear = [
          'token',
          'sb-access-token', 
          'sb-refresh-token',
          'supabase-auth-token',
          'auth-token'
        ];
        
        cookiesToClear.forEach(cookieName => {
          document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${window.location.hostname}`;
          document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        });
        console.log('✅ Cookies limpiadas');
      } catch (error) {
        console.error('Error limpiando cookies:', error);
      }
      
    } catch (error) {
      console.error('Error durante el logout:', error);
    } finally {
      // Limpiar timeout y redirigir
      clearTimeout(timeoutId);
      setIsLoggingOut(false);
      console.log('🔄 Redirigiendo al login...');
      
      // Redirigir al login
      try {
        router.push("/login");
      } catch (error) {
        console.error('Error con router.push, usando window.location:', error);
        window.location.href = "/login";
      }
    }
  };

  return (
    <header className="bg-violet-950 shadow-sm border-b border-gray-700 fixed top-0 left-0 right-0 lg:left-64 z-30 h-16">
      <div className="h-full px-4 lg:px-6">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <Image
              src={"/FADER_LOGO.svg"}
              width={100}
              height={80}
              alt="logo fader"
              className="invert"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="h-6 w-px bg-gray-600"></div>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                isLoggingOut 
                  ? 'bg-gray-600 cursor-not-allowed opacity-75' 
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isLoggingOut ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="hidden sm:inline">Cerrando...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="hidden sm:inline">Salir</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
