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
    <div className="px-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold">Información Personal</h3>
          <p className="text-gray-200/80">
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

  const renderSecurityTab = () => (
    <div className="px-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Configuración de Seguridad</h3>
        <p className="text-gray-200/80">
          Mantén tu cuenta segura actualizando tu contraseña
        </p>
      </div>
      <PasswordChangeForm />
    </div>
  );

  switch (activeTab) {
    case "personal":
      return renderPersonalTab();
    case "security":
      return renderSecurityTab();
    default:
      return renderPersonalTab();
  }
}
