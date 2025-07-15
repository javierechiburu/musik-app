"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { signOut, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="bg-red-500/50 hover:bg-red-700/60 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
    >
      {isLoading ? "Cerrando sesión..." : "Cerrar Sesión"}
    </button>
  );
}
