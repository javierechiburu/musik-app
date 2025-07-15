'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // NO redirigir automáticamente - dejar que el middleware maneje la lógica
    // El middleware redirigirá apropiadamente basado en autenticación y must_change_password
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-400">
          Cargando...
        </p>
      </div>
    </div>
  );
}
