"use client";

import { useState } from "react";
import { createUser, validateUserForm, formatUserData } from "@/apis/adminAPI";

export default function RegistrarPage() {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    nombreArtista: "",
    fechaNacimiento: "",
    correo: "",
    telefono: "",
    pais: "",
    ciudad: "",
    generoMusical: "",
    biografia: "",
    redesSociales: {
      instagram: "",
      youtube: "",
      spotify: "",
      tiktok: "",
    },
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const validateForm = (): string[] => {
    const validationErrors = [];

    if (!formData.nombreCompleto.trim()) {
      validationErrors.push("El nombre completo es requerido");
    }

    if (!formData.nombreArtista.trim()) {
      validationErrors.push("El nombre de artista es requerido");
    }

    /*  if (!formData.fechaNacimiento) {
       validationErrors.push('La fecha de nacimiento es requerida');
     } */

    if (!formData.correo.trim()) {
      validationErrors.push("El correo electrónico es requerido");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      validationErrors.push("El formato del correo electrónico no es válido");
    }

    /*  if (!formData.telefono.trim()) {
       validationErrors.push('El número de teléfono es requerido');
     }
 
     if (!formData.pais.trim()) {
       validationErrors.push('El país es requerido');
     }
 
     if (!formData.ciudad.trim()) {
       validationErrors.push('La ciudad es requerida');
     }
 
     if (!formData.generoMusical.trim()) {
       validationErrors.push('El género musical es requerido');
     } */

    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(false);

    const validationErrors = validateUserForm(formData);
    if (validationErrors.length > 0) {
      setModalMessage(
        `Por favor corrige los siguientes errores:\n\n${validationErrors.map((error) => `• ${error}`).join("\n")}`
      );
      setShowErrorModal(true);
      return;
    }

    setIsLoading(true);

    try {
      const userData = formatUserData(formData);
      const result = await createUser(userData);

      if (result.success) {
        setModalMessage(result.message);
        setShowSuccessModal(true);
      } else {
        setModalMessage(result.message);
        setShowErrorModal(true);
      }
    } catch (error) {
      setModalMessage(
        "Error inesperado. Inténtalo de nuevo más tarde."
      );
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      redesSociales: {
        ...prev.redesSociales,
        [platform]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Registrar Nuevo Usuario
          </h1>
          <p className="text-gray-400">
            Complete el formulario para agregar un nuevo usuario al sistema
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Personal */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">
                Información Personal
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.nombreCompleto}
                    onChange={(e) =>
                      handleInputChange("nombreCompleto", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ingresa el nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre de Artista *
                  </label>
                  <input
                    type="text"
                    value={formData.nombreArtista}
                    onChange={(e) =>
                      handleInputChange("nombreArtista", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ingresa el nombre de artista"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Fecha de Nacimiento *
                  </label>
                  <input
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={(e) =>
                      handleInputChange("fechaNacimiento", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    value={formData.correo}
                    onChange={(e) =>
                      handleInputChange("correo", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Número de Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) =>
                      handleInputChange("telefono", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    País *
                  </label>
                  <input
                    type="text"
                    value={formData.pais}
                    onChange={(e) => handleInputChange("pais", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ingresa el país"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    value={formData.ciudad}
                    onChange={(e) =>
                      handleInputChange("ciudad", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ingresa la ciudad"
                  />
                </div>
              </div>
            </div>

            {/* Información Musical */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">
                Información Musical
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Género Musical *
                  </label>
                  <select
                    value={formData.generoMusical}
                    onChange={(e) =>
                      handleInputChange("generoMusical", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Selecciona un género</option>
                    <option value="pop">Pop</option>
                    <option value="rock">Rock</option>
                    <option value="hip-hop">Hip Hop</option>
                    <option value="electronic">Electrónico</option>
                    <option value="jazz">Jazz</option>
                    <option value="classical">Clásico</option>
                    <option value="reggaeton">Reggaetón</option>
                    <option value="latin">Latino</option>
                    <option value="alternative">Alternativo</option>
                    <option value="indie">Indie</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Biografía
                  </label>
                  <textarea
                    value={formData.biografia}
                    onChange={(e) =>
                      handleInputChange("biografia", e.target.value)
                    }
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Describe la biografía del artista..."
                  />
                </div>
              </div>
            </div>

            {/* Redes Sociales */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">
                Redes Sociales (Opcional)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={formData.redesSociales.instagram}
                    onChange={(e) =>
                      handleSocialChange("instagram", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://instagram.com/usuario"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    YouTube
                  </label>
                  <input
                    type="url"
                    value={formData.redesSociales.youtube}
                    onChange={(e) =>
                      handleSocialChange("youtube", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://youtube.com/c/canal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Spotify
                  </label>
                  <input
                    type="url"
                    value={formData.redesSociales.spotify}
                    onChange={(e) =>
                      handleSocialChange("spotify", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://open.spotify.com/artist/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    TikTok
                  </label>
                  <input
                    type="url"
                    value={formData.redesSociales.tiktok}
                    onChange={(e) =>
                      handleSocialChange("tiktok", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://tiktok.com/@usuario"
                  />
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    nombreCompleto: "",
                    nombreArtista: "",
                    fechaNacimiento: "",
                    correo: "",
                    telefono: "",
                    pais: "",
                    ciudad: "",
                    generoMusical: "",
                    biografia: "",
                    redesSociales: {
                      instagram: "",
                      youtube: "",
                      spotify: "",
                      tiktok: "",
                    },
                  });
                  setErrors([]);
                  setSuccess(false);
                }}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Limpiar Formulario
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                {isLoading && (
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                <span>
                  {isLoading ? "Registrando..." : "Registrar Usuario"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 border border-green-500/30">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400">
                  ¡Éxito!
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                  {modalMessage || "Usuario registrado exitosamente"}
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setFormData({
                    nombreCompleto: "",
                    nombreArtista: "",
                    fechaNacimiento: "",
                    correo: "",
                    telefono: "",
                    pais: "",
                    ciudad: "",
                    generoMusical: "",
                    biografia: "",
                    redesSociales: {
                      instagram: "",
                      youtube: "",
                      spotify: "",
                      tiktok: "",
                    },
                  });
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Error */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 border border-red-500/30">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-400">Error</h3>
                <div className="text-gray-300 text-sm mt-1">
                  {modalMessage?.includes("•") ? (
                    <div className="whitespace-pre-line">{modalMessage}</div>
                  ) : (
                    <p>
                      {modalMessage ||
                        "Ocurrió un error al procesar la solicitud"}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowErrorModal(false)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
