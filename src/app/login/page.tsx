"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/config/axios/axiosInstance";

// Import login components
import LoginForm from "@/components/login/LoginForm";
import PasswordChangeForm from "@/components/login/PasswordChangeForm";
import LoadingScreen from "@/components/login/LoadingScreen";

export default function LoginPage() {
  // Estados del flujo de login
  const [currentView, setCurrentView] = useState<"login" | "passwordChange" | "loading" | "redirecting">("login");
  
  // Refs para control de ejecución única
  const checkExecutedRef = useRef(false);
  
  const router = useRouter();
  const { isLoading, isAuthenticated, user } = useAuth();

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
          setCurrentView("loading");
          
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
              setCurrentView("passwordChange");
            } else {
              setCurrentView("redirecting");
              router.push("/home");
            }
          }
        } catch (error) {
          console.error('Error checking password change requirement:', error);
          // En caso de error, redirigir a home
          setCurrentView("redirecting");
          router.push("/home");
        }
      }
    };

    if (user && isAuthenticated && !isLoading) {
      checkPasswordChangeRequired();
    }
  }, [user, isAuthenticated, isLoading, router]);

  // Handlers para los componentes
  const handleLoginSuccess = () => {
    setCurrentView("loading");
  };

  const handlePasswordChanged = () => {
    checkExecutedRef.current = false;
    setCurrentView("redirecting");
  };

  // Renderizado condicional basado en el estado actual
  if (isLoading) {
    return <LoadingScreen message="Verificando autenticación..." />;
  }

  if (currentView === "loading") {
    return <LoadingScreen message="Verificando estado del usuario..." />;
  }

  if (currentView === "redirecting") {
    return <LoadingScreen type="redirect" />;
  }

  if (currentView === "passwordChange") {
    return <PasswordChangeForm onPasswordChanged={handlePasswordChanged} />;
  }

  // Vista de login por defecto
  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
}