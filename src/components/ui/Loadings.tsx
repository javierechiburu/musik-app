import Image from "next/image";
import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-20vh)]">
      <div className="flex flex-col items-center space-y-6">
        {/* Imagen girando como CD con brillo */}
        <div className="relative w-40 h-40 rounded-full border-4 border-[#A78BFA] shadow-lg overflow-hidden spin-slow cd-shine">
          <Image
            src="/FADER-FOTOPERFIL.jpg"
            alt="FADER CD"
            className="w-full h-full object-cover rounded-full"
            width={300}
            height={300}
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

export const LoadingChatBubble = () => {
  return (
    <div className="flex items-start px-4 py-2 animate-pulse">
      {/* Avatar del bot */}
      <div className="w-8 h-8 rounded-full bg-[#A78BFA] flex items-center justify-center text-white font-bold mr-3">
        🤖
      </div>

      {/* Burbuja de mensaje "typing" */}
      <div className="bg-[#F3F4F6] dark:bg-[#2D2D2D] rounded-xl px-4 py-2 max-w-xs shadow-md">
        <div className="flex space-x-1 justify-center items-center h-5">
          <span className="w-2 h-2 bg-[#A78BFA] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-[#A78BFA] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-[#A78BFA] rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};
