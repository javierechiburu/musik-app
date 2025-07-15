"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

// Import login components
import LoginForm from "@/components/login/LoginForm";
import PasswordChangeForm from "@/components/login/PasswordChangeForm";
import LoadingScreen from "@/components/login/LoadingScreen";

export default function LoginPage() {
  const router = useRouter();
  const { isLoading, isAuthenticated, mustChangePassword } = useAuth();

  console.log("🔑 Authenticated:", isAuthenticated);
  console.log("🔑 Loading:", isLoading);
  console.log("🔑 Must Change Password:", mustChangePassword);

  // Simple redirect logic - only redirect if authenticated and no password change needed
  useEffect(() => {
    if (isAuthenticated && !isLoading && !mustChangePassword) {
      router.push("/home");
    }
  }, [isAuthenticated, isLoading, mustChangePassword, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return <LoadingScreen message="Verificando autenticación..." />;
  }

  // Show password change form if authenticated and needs password change
  if (isAuthenticated && mustChangePassword) {
    return <PasswordChangeForm onPasswordChanged={() => router.push("/home")} />;
  }

  // Show login form for non-authenticated users or those who don't need password change
  return <LoginForm onLoginSuccess={() => {}} />;
}