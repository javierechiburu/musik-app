"use client";

import { useState } from "react";
import ProfilePictureUpload from "@/components/perfil/ProfilePictureUpload";
import ProfileNavigation from "@/components/perfil/ProfileNavigation";
import ProfileTabContent from "@/components/perfil/ProfileTabContent";
import HeaderPage from "@/components/ui/HeaderPage";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");

  // Mock user data - replace with actual user data from authentication
  const [userData] = useState({
    personalInfo: {
      firstName: "Carlos",
      lastName: "Rodríguez",
      email: "carlos.rodriguez@email.com",
      phone: "+1 (555) 123-4567",
      country: "México",
      city: "Ciudad de México",
    },
    artistInfo: {
      artistName: "DJ Carlos",
      genre: "Electronic, House",
      label: "Independent",
      yearsActive: "2018 - Presente",
      website: "https://djcarlos.com",
      bio: "DJ y productor mexicano especializado en música electrónica y house. Con más de 5 años de experiencia en la industria musical.",
    },
    accountInfo: {
      memberSince: "Enero 2020",
      subscription: "Premium",
      lastLogin: "Hace 2 horas",
      totalTracks: 45,
      totalFollowers: 12847,
    },
  });

  const handleImageUpload = (file: File) => {
    console.log("Nueva imagen de perfil:", file);
    // Aquí iría la lógica para subir la imagen
  };

  return (
    <div className="space-y-6">
      {/* Header del Perfil */}
      <HeaderPage overlayColor="pink" height="md">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Mi Perfil</h2>
              <p className="text-purple-200">
                Gestiona tu información personal y configuración de cuenta
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-sm text-gray-400">
            <div className="text-center">
              <p className="text-white font-semibold">
                {userData.accountInfo.totalTracks}
              </p>
              <p>Tracks</p>
            </div>
            <div className="text-center">
              <p className="text-white font-semibold">
                {userData.accountInfo.totalFollowers.toLocaleString()}
              </p>
              <p>Seguidores</p>
            </div>
            <div className="text-center">
              <p className="text-green-400 font-semibold">
                {userData.accountInfo.subscription}
              </p>
              <p>Plan</p>
            </div>
          </div>
        </div>
      </HeaderPage>

      {/* Layout Principal del Perfil */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Sidebar Izquierdo - Información del Usuario */}
        <div className="xl:col-span-1">
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur border border-purple-500/20 rounded-xl p-6 text-center sticky top-6">
            <ProfilePictureUpload onImageChange={handleImageUpload} />

            <div className="mt-6 pt-6 border-t border-purple-500/20">
              <h3 className="text-xl font-bold text-white mb-1">
                {userData.personalInfo.firstName}{" "}
                {userData.personalInfo.lastName}
              </h3>
              <p className="text-purple-300 text-sm mb-4">
                @{userData.artistInfo.artistName}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-purple-800/20 rounded-lg p-3">
                  <p className="text-lg font-bold text-purple-400">
                    {userData.accountInfo.totalTracks}
                  </p>
                  <p className="text-xs text-gray-400">Tracks</p>
                </div>
                <div className="bg-blue-800/20 rounded-lg p-3">
                  <p className="text-lg font-bold text-blue-400">
                    {userData.accountInfo.totalFollowers.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">Seguidores</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Plan:</span>
                  <span className="text-green-400 font-medium">
                    {userData.accountInfo.subscription}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Miembro desde:</span>
                  <span className="text-white">
                    {userData.accountInfo.memberSince}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Último acceso:</span>
                  <span className="text-white">
                    {userData.accountInfo.lastLogin}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Área Principal - Navegación y Contenido por Pestañas */}
        <div className="xl:col-span-3">
          {/* Navegación por Pestañas */}
          <ProfileNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Contenido de las Pestañas */}
          <ProfileTabContent activeTab={activeTab} userData={userData} />
        </div>
      </div>
    </div>
  );
}
