"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { preRegistroUsuario } from "@/apis/usuariosAPI";

export default function PreRegistroPage() {
  const [formData, setFormData] = useState({
    nombreArtista: "",
    nombreCompleto: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Basic validation
    if (!formData.nombreArtista || !formData.nombreCompleto || !formData.email) {
      setError("Todos los campos son requeridos");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Por favor ingresa un email válido");
      return;
    }

    startTransition(async () => {
      try {
        const result = await preRegistroUsuario(formData);
        
        if (result.success) {
          setSuccess(true);
          setFormData({
            nombreArtista: "",
            nombreCompleto: "",
            email: "",
          });
        } else {
          setError(result.message || "Error al registrar usuario");
        }
      } catch (err) {
        setError("Error interno. Intenta de nuevo");
        console.error("Pre-registro error:", err);
      }
    });
  };

  if (success) {
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
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Success Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700/50 text-center">
              <div className="mb-6 flex justify-center">
                <Image
                  src="/FADER_LOGO.svg"
                  alt="FADER Records Logo"
                  width={120}
                  height={48}
                  className="drop-shadow-lg opacity-90 invert"
                />
              </div>
              
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">¡Registro Exitoso!</h2>
                <p className="text-gray-300">
                  Tu solicitud de pre-registro ha sido enviada exitosamente. 
                  Te contactaremos pronto para completar el proceso.
                </p>
              </div>

              <a
                href="/login"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200"
              >
                Volver al Login
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="max-w-md text-center">
            <div className="mb-8">
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
              Únete a nuestra plataforma de gestión musical profesional. 
              Solicita tu acceso y comienza a impulsar tu carrera artística.
            </p>
          </div>
        </div>

        {/* Right Side - Pre-Registration Form */}
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

            {/* Registration Card */}
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
                <h1 className="text-xl font-semibold text-white mb-2">Pre-registro</h1>
                <p className="text-gray-400">Solicita tu acceso a la plataforma</p>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre Artístico */}
                <div>
                  <label
                    htmlFor="nombreArtista"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Nombre Artístico
                  </label>
                  <input
                    type="text"
                    id="nombreArtista"
                    name="nombreArtista"
                    value={formData.nombreArtista}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800/80 text-white placeholder-gray-400 transition-all"
                    placeholder="Tu nombre artístico"
                    required
                    disabled={isPending}
                  />
                </div>

                {/* Nombre Completo */}
                <div>
                  <label
                    htmlFor="nombreCompleto"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="nombreCompleto"
                    name="nombreCompleto"
                    value={formData.nombreCompleto}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800/80 text-white placeholder-gray-400 transition-all"
                    placeholder="Tu nombre completo"
                    required
                    disabled={isPending}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800/80 text-white placeholder-gray-400 transition-all"
                    placeholder="tu@email.com"
                    required
                    disabled={isPending}
                    autoComplete="email"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="text-red-400 text-sm font-medium bg-red-900/30 p-3 rounded-xl border border-red-800/50">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-purple-600"
                >
                  {isPending ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full border border-white/30 overflow-hidden mr-2 spin-slow">
                        <Image
                          src="/FADER-FOTOPERFIL.jpg"
                          alt="Loading"
                          width={20}
                          height={20}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      Registrando...
                    </div>
                  ) : (
                    "Solicitar Acceso"
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  ¿Ya tienes una cuenta?{" "}
                  <a
                    href="/login"
                    className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Inicia sesión
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