"use client";

import { useState, useEffect } from "react";
import { obtenerSignedUrlFromFullUrl } from "@/utils/supabaseStorage";
import { getSignedUrl } from "@/apis/bancosAPI";

interface ImageLinkProps {
  imageUrl: string;
  label: string;
  className?: string;
}

export default function ImageLink({
  imageUrl,
  label,
  className = "",
}: ImageLinkProps) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSignedUrlWithFallback = async () => {
      if (!imageUrl) {
        setIsLoading(false);
        return;
      }

      try {
        // Intentar primero con el cliente (más rápido)
        let url = await obtenerSignedUrlFromFullUrl(imageUrl);

        // Si falla, intentar con el servidor como fallback
        if (!url) {
          console.log("Cliente falló, intentando con servidor...");
          url = await getSignedUrl(imageUrl);
        }

        setSignedUrl(url);
      } catch (error) {
        console.error("Error obteniendo signed URL:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getSignedUrlWithFallback();
  }, [imageUrl]);

  if (!imageUrl) {
    return <span className="text-gray-500 text-sm">No disponible</span>;
  }

  if (isLoading) {
    return <span className="text-gray-400 text-sm">Cargando...</span>;
  }

  if (!signedUrl) {
    return <span className="text-red-400 text-sm">Error al cargar</span>;
  }

  return (
    <a
      href={signedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-blue-400 hover:text-blue-300 text-sm transition-colors ${className}`}
    >
      {label}
    </a>
  );
}
