"use client";

import LoginForm from "@/components/login/LoginForm";
import PasswordChangeForm from "@/components/login/PasswordChangeForm";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const { isLoading, isAuthenticated, mustChangePassword } = useAuthStore();
  // isLoading false, isAuthenticated false, mustChangePassword false
  console.log("🔑 isLoading:", isLoading);
  console.log("🔑 isAuthenticated:", isAuthenticated);
  console.log("🔑 mustChangePassword:", mustChangePassword);

  // Show login form for non-authenticated users
  return <LoginForm />;
}
