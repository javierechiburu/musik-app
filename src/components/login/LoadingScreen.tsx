"use client";

interface LoadingScreenProps {
  readonly message?: string;
  readonly type?: "auth" | "redirect";
}

export default function LoadingScreen({ 
  message = "Verificando autenticación...", 
  type = "auth" 
}: LoadingScreenProps) {
  if (type === "redirect") {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 border border-gray-700">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-white mb-2">Acceso autorizado</h2>
            <p className="text-gray-400">Redirigiendo a la aplicación...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-lg">{message}</div>
    </div>
  );
}