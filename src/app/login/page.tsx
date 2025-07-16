"use client";

import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LoginForm from "@/components/login/LoginForm";
import PasswordChangeForm from "@/components/login/PasswordChangeForm";

export default function LoginPage() {
  const router = useRouter();
  const { isLoading, isAuthenticated, mustChangePassword } = useAuth();
  // isLoading false, isAuthenticated false, mustChangePassword false
  console.log('🔑 isLoading:', isLoading);
  console.log('🔑 isAuthenticated:', isAuthenticated);
  console.log('🔑 mustChangePassword:', mustChangePassword);

/*   useEffect(() => {
    if (isLoading === false && isAuthenticated === true && mustChangePassword === false) {
      redirect("/home")
    }
  }, [isLoading, isAuthenticated, mustChangePassword]); */

  // Show password change form if required
  if (isAuthenticated && mustChangePassword) {
    return <PasswordChangeForm />;
  }

  // Show login form for non-authenticated users
  return <LoginForm />;
}
