"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthInitializer() {
  const { initialize } = useAuthStore();

  useEffect(() => {
    console.log("🔄 Initializing auth store...");
    initialize();
  }, [initialize]);

  return null;
}