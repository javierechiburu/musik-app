"use client";

import PasswordChangeForm from "@/components/perfil/PasswordChangeForm";

interface ProfileTabContentProps {
  activeTab: string;
  userData: {
    personalInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      country: string;
      city: string;
    };
    artistInfo: {
      artistName: string;
      genre: string;
      label: string;
      yearsActive: string;
      website: string;
      bio: string;
    };
  };
}

export default function ProfileTabContent({
  activeTab,
  userData,
}: ProfileTabContentProps) {
  const renderPersonalTab = () => (
    <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur border border-green-500/20 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-green-400">
            Información Personal
          </h3>
          <p className="text-green-300/60 text-sm">
            Gestiona tus datos personales y de contacto
          </p>
        </div>
        <button className="px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-500/30 rounded-lg transition-colors text-sm">
          Editar
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
              Nombre
            </label>
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3">
              <p className="text-white font-medium">
                {userData.personalInfo.firstName}
              </p>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
              Apellido
            </label>
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3">
              <p className="text-white font-medium">
                {userData.personalInfo.lastName}
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
            Correo Electrónico
          </label>
          <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3">
            <p className="text-white font-medium">
              {userData.personalInfo.email}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
            Teléfono
          </label>
          <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3">
            <p className="text-white font-medium">
              {userData.personalInfo.phone}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
              País
            </label>
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3">
              <p className="text-white font-medium">
                {userData.personalInfo.country}
              </p>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
              Ciudad
            </label>
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3">
              <p className="text-white font-medium">
                {userData.personalInfo.city}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderArtistTab = () => (
    <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur border border-orange-500/20 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-orange-400">
            Información Artística
          </h3>
          <p className="text-orange-300/60 text-sm">
            Administra los detalles de tu carrera musical
          </p>
        </div>
        <button className="px-4 py-2 bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 border border-orange-500/30 rounded-lg transition-colors text-sm">
          Editar
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
            Nombre Artístico
          </label>
          <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3">
            <p className="text-white font-medium">
              {userData.artistInfo.artistName}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
            Género Musical
          </label>
          <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3">
            <p className="text-white font-medium">
              {userData.artistInfo.genre}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
              Sello Discográfico
            </label>
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3">
              <p className="text-white font-medium">
                {userData.artistInfo.label}
              </p>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
              Años Activo
            </label>
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3">
              <p className="text-white font-medium">
                {userData.artistInfo.yearsActive}
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
            Sitio Web
          </label>
          <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3">
            <a
              href={userData.artistInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              {userData.artistInfo.website}
            </a>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
            Biografía
          </label>
          <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              {userData.artistInfo.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 backdrop-blur border border-red-500/20 rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-red-400">
          Configuración de Seguridad
        </h3>
        <p className="text-red-300/60 text-sm">
          Mantén tu cuenta segura actualizando tu contraseña
        </p>
      </div>
      <PasswordChangeForm />
    </div>
  );

  switch (activeTab) {
    case "personal":
      return renderPersonalTab();
    case "artist":
      return renderArtistTab();
    case "security":
      return renderSecurityTab();
    default:
      return renderPersonalTab();
  }
}
