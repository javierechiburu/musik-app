import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-20vh)]">
      <div className="flex flex-col items-center space-y-6">
        {/* Imagen girando como CD con brillo */}
        <div className="relative w-40 h-40 rounded-full border-4 border-[#A78BFA] shadow-lg overflow-hidden spin-slow cd-shine">
          <img
            src="/FADER-FOTOPERFIL.jpg"
            alt="FADER CD"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Texto sutil */}
        <p className="text-sm text-[#8B949E] font-medium tracking-wide mt-2">
          Cargando...
        </p>
      </div>
    </div>
  );
};
