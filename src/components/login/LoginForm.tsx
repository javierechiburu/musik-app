"use client";

import { useState, useTransition } from "react";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

interface LoginFormProps {
  readonly onLoginSuccess: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email y contraseña son requeridos");
      return;
    }

    if (!email.includes("@")) {
      setError("Por favor ingresa un email válido");
      return;
    }

    startTransition(async () => {
      try {
        const { error: signInError } = await signIn(email, password);

        if (signInError) {
          setError(signInError.message || "Error al iniciar sesión");
        } else {
          onLoginSuccess();
        }
      } catch (err) {
        setError("Error interno. Intenta de nuevo");
        console.error("Login error:", err);
      }
    });
  };

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

        {/* Right Side - Login Form */}
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

            {/* Login Card */}
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

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800/80 text-white placeholder-gray-400 transition-all"
                    placeholder="tu@email.com"
                    required
                    disabled={isPending}
                    autoComplete="email"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800/80 text-white placeholder-gray-400 transition-all"
                    placeholder="••••••••"
                    required
                    disabled={isPending}
                    autoComplete="current-password"
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
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Iniciando sesión...
                    </div>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </button>
              </form>

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