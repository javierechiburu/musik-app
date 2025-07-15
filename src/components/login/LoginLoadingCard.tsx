"use client";

import Image from "next/image";

interface LoginLoadingCardProps {
  message?: string;
}

export default function LoginLoadingCard({ message = "Cargando..." }: LoginLoadingCardProps) {
  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/FADER-1920X1080.jpg"
          alt="FADER Records Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="max-w-md text-center">
            <div className="mb-8">
              {/* Logo */}
              <div className="mb-6 flex justify-center">
                <Image
                  src="/FADER_LOGO.svg"
                  alt="FADER Records Logo"
                  width={200}
                  height={80}
                  className="drop-shadow-2xl invert"
                />
              </div>
              <h2 className="text-2xl font-light text-gray-200 drop-shadow-md">
                RECORDS
              </h2>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed drop-shadow-md">
              Tu plataforma de gestión musical profesional. Accede a métricas,
              analytics y herramientas para impulsar tu carrera artística.
            </p>
          </div>
        </div>

        {/* Right Side - Loading Card */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="mb-4 flex justify-center">
                <Image
                  src="/FADER_LOGO.svg"
                  alt="FADER Records Logo"
                  width={150}
                  height={60}
                  className="drop-shadow-2xl invert"
                />
              </div>
              <h2 className="text-lg font-light text-gray-200 drop-shadow-md">
                RECORDS
              </h2>
            </div>

            {/* Loading Card */}
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700/50">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/FADER_LOGO.svg"
                    alt="FADER Records Logo"
                    width={120}
                    height={48}
                    className="drop-shadow-lg opacity-90 invert"
                  />
                </div>
                <p className="text-gray-400">Accede a tu panel de control</p>
              </div>

              {/* Loading Spinner - Disco Musical */}
              <div className="flex flex-col items-center space-y-6 py-8">
                {/* Disco CD girando */}
                <div className="relative w-32 h-32 rounded-full border-4 border-purple-400 shadow-lg overflow-hidden spin-slow cd-shine">
                  <Image
                    src="/FADER-FOTOPERFIL.jpg"
                    alt="FADER CD"
                    className="w-full h-full object-cover rounded-full"
                    width={128}
                    height={128}
                  />
                </div>

                {/* Loading Message */}
                <div className="text-center">
                  <p className="text-white text-lg font-medium mb-2">
                    {message}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Preparando tu experiencia musical...
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  ¿Necesitas ayuda?{" "}
                  <a
                    href="#"
                    className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Contacta soporte
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}