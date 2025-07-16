"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function LogoutButton() {
  const { signOut } = useAuthStore();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="bg-red-500/50 hover:bg-red-700/60 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
    >
      {isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}
    </button>
  );
}
