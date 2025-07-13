"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchArtistData,
  type ChartmetricArtistResponse,
} from "@/apis/homeAPI";

import Image from "next/image";
import { LoadingSpinner } from "@/components/ui/Loadings";
import HeaderPage from "@/components/ui/HeaderPage";

function ErrorMessage({
  error,
  onRetry,
}: {
  readonly error: Error;
  readonly onRetry: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen space-y-4"
      style={{
        background:
          "linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)",
      }}
    >
      <div
        className="text-center p-8 rounded-2xl border backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderColor: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2 className="text-xl font-semibold mb-2" style={{ color: "#F0F6FC" }}>
          Error al cargar los datos
        </h2>
        <p className="mb-4" style={{ color: "#8B949E" }}>
          {error.message}
        </p>
        <button
          onClick={onRetry}
          className="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:-translate-y-1"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#FFFFFF",
            boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)",
          }}
        >
          🔄 Reintentar
        </button>
      </div>
    </div>
  );
}

function NoissProfile() {
  return (
    <HeaderPage overlayColor="pink" height="md">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(145deg, #A78BFA 0%, #8B5CF6 100%)",
                boxShadow: "0 8px 16px rgba(139, 92, 246, 0.3)",
                border: "3px solid rgba(139, 92, 246, 0.2)",
              }}
            >
              <span className="text-6xl font-bold text-white">N</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Noiss</h3>
              <p className="text-purple-100">
                Artista Chileno • Ranking #4237 🇨🇱 • ALDIA Records
              </p>
            </div>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex items-center space-x-3 mt-4">
          <span
            className="text-xs px-3 py-1 rounded-full"
            style={{
              background: "#EDE9FE",
              border: "1px solid #C4B5FD",
              color: "#7C3AED",
            }}
          >
            🎵 En desarrollo
          </span>
          <span
            className="text-xs px-3 py-1 rounded-full"
            style={{
              background: "#EDE9FE",
              border: "1px solid #C4B5FD",
              color: "#7C3AED",
            }}
          >
            📈 Crecimiento
          </span>
          <span
            className="text-xs px-3 py-1 rounded-full"
            style={{
              background: "#EDE9FE",
              border: "1px solid #C4B5FD",
              color: "#7C3AED",
            }}
          >
            ⭐ Premium
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <div className="text-sm text-purple-100 font-medium">
          Redes Sociales
        </div>
        <div className="flex space-x-3">
          {/* Spotify */}
          <a
            href="#"
            className="w-10 h-10 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg flex items-center justify-center transition-all duration-300 group border border-purple-500/30"
          >
            <svg
              className="w-6 h-6 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ color: "#A78BFA" }}
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.359.24-.66.599-.78 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.183 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="#"
            className="w-10 h-10 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg flex items-center justify-center transition-all duration-300 group border border-purple-500/30"
          >
            <svg
              className="w-6 h-6 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ color: "#8B5CF6" }}
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="#"
            className="w-10 h-10 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg flex items-center justify-center transition-all duration-300 group border border-purple-500/30"
          >
            <svg
              className="w-6 h-6 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ color: "#7C3AED" }}
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>

          {/* TikTok */}
          <a
            href="#"
            className="w-10 h-10 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg flex items-center justify-center transition-all duration-300 group border border-purple-500/30"
          >
            <svg
              className="w-6 h-6 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ color: "#C4B5FD" }}
            >
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>
        </div>
      </div>
    </HeaderPage>
  );
}

function ResumenAudiencia() {
  const metricas = [
    {
      icon: "👥",
      label: "Huella Social",
      value: "4,6 MI",
      description: "Base Total de Fans",
    },
    {
      icon: "🌍",
      label: "Mercado Principal",
      value: "Chile",
      description: null,
    },
    {
      icon: "🎯",
      label: "Mercado Secundario",
      value: "______",
      description: null,
    },
    {
      icon: "🎵",
      label: "Género Principal",
      value: "______",
      description: null,
    },
    {
      icon: "📊",
      label: "Edad Principal",
      value: "______",
      description: null,
    },
  ];

  return (
    <div
      className="bg-gradient-to-r from-indigo-900/60 to-violet-900/40 rounded-xl border border-purple-500/30"
      style={{ boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)" }}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-bold">Resumen de la Audiencia</h3>
          </div>
        </div>
      </div>

      {/* Grid de Métricas */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {metricas.map((metrica, index) => (
            <div key={index} className="text-center">
              {/* Icono */}
              <div className="text-3xl mb-3">{metrica.icon}</div>

              {/* Label */}
              <div className="text-sm text-gray-100 mb-2 font-medium">
                {metrica.label}
              </div>

              {/* Valor principal */}
              <div className="text-2xl font-bold text-white mb-1">
                {metrica.value}
              </div>

              {/* Descripción */}
              {metrica.description && (
                <div className="text-xs text-gray-500">
                  {metrica.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MovimientosMetricas() {
  const metricas = [
    { nombre: "Transmisiones de por vida", valor: "+2,22%", positivo: true },
    { nombre: "Seguidores", valor: "+0,48%", positivo: true },
    { nombre: "Listas de reproducción", valor: "+0,37%", positivo: true },
    { nombre: "Alcance de lista editorial", valor: "+0,07%", positivo: true },
    { nombre: "Contar", valor: "+0,03%", positivo: true },
    { nombre: "Oyentes mensuales", valor: "-1,35%", positivo: false },
    { nombre: "Alcance total de lista", valor: "-1,97%", positivo: false },
  ];

  return (
    <div
      className="bg-gradient-to-br from-gray-900/80 to-purple-900/60 text-white rounded-xl p-6 shadow-md backdrop-blur border border-purple-500/30"
      style={{ boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)" }}
    >
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📊</span>
          <div>
            <h2 className="text-xl font-bold">Movimientos de Métricas</h2>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Cambio porcentual por 1 semana
            </p>
          </div>
        </div>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricas.map((m, i) => (
          <div
            key={i}
            className="bg-gray-800/80 rounded-lg p-5 shadow hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-purple-500/30"
            style={{ boxShadow: "0 4px 16px rgba(139, 92, 246, 0.1)" }}
          >
            <h4 className="text-sm text-gray-300 mb-2">{m.nombre}</h4>
            <div className="flex items-center gap-2">
              <span
                className={`text-xl animate-pulse ${
                  m.positivo ? "text-green-400" : "text-red-400"
                }`}
                style={{
                  filter: "drop-shadow(0 0 4px rgba(139, 92, 246, 0.3))",
                }}
              >
                {m.positivo ? "⬤" : "⬤"}
              </span>
              <p
                className={`text-2xl font-semibold ${
                  m.positivo ? "text-green-300" : "text-red-300"
                }`}
                style={{ color: m.positivo ? "#10B981" : "#EF4444" }}
              >
                {m.valor}
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-1">Cambio semanal</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopRecentMilestones() {
  const milestones = [
    {
      description:
        "clasificado entre los 10 mejores artistas de 'chilean reggaeton' en el mundo",
      rating: 5,
      date: "1 jul 2025",
    },
    {
      description:
        "clasificado entre los 10 mejores artistas de 'chilean hip-hop' en el mundo",
      rating: 5,
      date: "1 jul 2025",
    },
    {
      description:
        "clasificado entre los 50 mejores artistas de 'latin worldbeat' en el mundo",
      rating: 5,
      date: "1 jul 2025",
    },
  ];

  return (
    <div
      className="bg-gradient-to-r from-purple-900/40 to-indigo-900/50 rounded-lg p-6 shadow border border-purple-500/30"
      style={{ boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">
            Top Recent Milestones
          </h3>
        </div>
      </div>

      {/* Descripción */}
      <p className="text-purple-300/80 text-sm mb-6 leading-relaxed">
        Mostramos los logros más significativos del artista, calculados en
        función de factores como el tamaño y la posición de listas de
        reproducción/charts, género, país y el rango de Chartmetric.
      </p>

      {/* Milestones Container */}
      <div
        className="bg-gray-800/90 backdrop-blur border border-purple-500/30 rounded-lg p-6"
        style={{ boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)" }}
      >
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="flex items-center space-x-6 py-4 border-b border-gray-700/50 last:border-b-0"
            >
              {/* 2. Imagen del artista + contenido */}
              <div className="flex items-center space-x-4 flex-1">
                {/* Imagen del artista */}
                <div
                  className="w-24 h-24 rounded-lg flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(145deg, #A78BFA 0%, #8B5CF6 100%)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    boxShadow: "0 4px 6px -1px rgba(139, 92, 246, 0.2)",
                  }}
                >
                  <span className="text-2xl font-bold text-white">N</span>
                </div>

                {/* Contenido del logro */}
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-base mb-2">
                    Chartmetric Hito: Noiss
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <a
                      href="#"
                      className="hover:underline"
                      style={{ color: "#8B5CF6" }}
                    >
                      Noiss
                    </a>{" "}
                    {milestone.description}
                  </p>
                </div>
              </div>

              {/* 3. Rating de estrellas */}
              <div className="flex space-x-1">
                {[...Array(milestone.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    style={{ color: "#C4B5FD" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RankingChartmetric() {
  const rankings = [
    {
      label: "Rank de Artista de Cha...",
      value: "#4237",
      type: "global",
      icon: null,
    },
    {
      label: "Chile",
      value: "#17",
      type: "country",
      icon: "🇨🇱",
    },
    {
      label: "Hip-Hop/Rap",
      value: "#1470",
      type: "genre",
      icon: null,
    },
    {
      label: "Worldbeat",
      value: "#172",
      type: "genre",
      icon: null,
    },
    {
      label: "Dance",
      value: "#1256",
      type: "genre",
      icon: null,
    },
  ];

  const MiniChart = () => (
    <svg width="60" height="40" viewBox="0 0 60 40" className="mt-2">
      <polyline
        points="5,35 15,30 25,25 35,20 45,15 55,10"
        fill="none"
        stroke="#8B5CF6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-bold">
              Ranking de Artistas de Chartmetric
            </h3>
          </div>
        </div>
      </div>

      {/* Grid de Rankings */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rankings.map((rank, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/60 to-purple-800/40 rounded-xl p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-purple-500/30"
              style={{ boxShadow: "0 4px 16px rgba(139, 92, 246, 0.1)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(107, 114, 128, 0.8) 0%, rgba(139, 92, 246, 0.6) 100%)";
                e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.6)";
                e.currentTarget.style.boxShadow =
                  "0 20px 25px -5px rgba(139, 92, 246, 0.3), 0 10px 10px -5px rgba(139, 92, 246, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "";
                e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(139, 92, 246, 0.1)";
              }}
            >
              {/* Header con icono Chartmetric */}
              <div className="flex justify-between items-start mb-4">
                <div></div>
                <div className="flex items-center space-x-1">
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(45deg, #C4B5FD 0%, #A78BFA 100%)",
                    }}
                  >
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ color: "#8B5CF6" }}
                    >
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  </div>
                  {rank.icon && <span className="text-lg">{rank.icon}</span>}
                </div>
              </div>

              {/* Ranking número */}
              <div className="mb-2">
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#7C3AED" }}
                >
                  {rank.value}
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-3">
                <div className="text-sm text-gray-300">{rank.label}</div>
              </div>

              {/* Mini gráfico */}
              <div className="flex justify-start">
                <MiniChart />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EstadisticasPlataformas() {
  const plataformas = [
    {
      nombre: "Spotify",
      seguidores: "4,59 MI",
      oyentes: "345,15 MI",
      popularidad: "43/100",
      alcance: "2,56 M",
      conversion: "1,33%",
      ratio: "557,03x",
      icon: "🎵",
    },
    {
      nombre: "TikTok",
      views: "1,18 M",
      posts: "545",
      icon: "📱",
    },
    {
      nombre: "Shazam",
      total: "84,28 MI",
      icon: "🔍",
    },
    {
      nombre: "Deezer",
      fans: "139",
      icon: "🎼",
    },
    {
      nombre: "Genius",
      views: "6,47 MI",
      icon: "🧠",
    },
  ];

  return (
    <div
      className="bg-gradient-to-br from-gray-900/80 to-purple-900/40 backdrop-blur rounded-xl p-6 text-white shadow-md border border-purple-500/30"
      style={{ boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📊</span>
          <div>
            <h2 className="text-xl font-bold">Estadísticas por Plataforma</h2>
            <p className="text-sm text-purple-300">
              Rendimiento multiplataforma
            </p>
          </div>
        </div>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {plataformas.map((p, i) => (
          <div
            key={i}
            style={{
              background: "rgba(31, 41, 55, 0.8)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 4px 16px rgba(139, 92, 246, 0.1)",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 20px 25px -5px rgba(139, 92, 246, 0.3), 0 10px 10px -5px rgba(139, 92, 246, 0.1)";
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.5)";
              e.currentTarget.style.background = "rgba(31, 41, 55, 0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(139, 92, 246, 0.1)";
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)";
              e.currentTarget.style.background = "rgba(31, 41, 55, 0.8)";
            }}
            className={`${
              p.nombre.toLowerCase() === "spotify" ? "xl:col-span-2" : ""
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                style={{
                  background:
                    "linear-gradient(90deg, #7C3AED 0%, #8B5CF6 100%)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  filter: "drop-shadow(0 0 4px rgba(139, 92, 246, 0.3))",
                }}
              >
                {p.icon}
              </div>
              <h3 className="text-base font-semibold text-white">{p.nombre}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
              {p.seguidores && (
                <div className="flex justify-between">
                  <span>Seguidores:</span>
                  <span>{p.seguidores}</span>
                </div>
              )}
              {p.oyentes && (
                <div className="flex justify-between">
                  <span>Oyentes Mensuales:</span>
                  <span>{p.oyentes}</span>
                </div>
              )}
              {p.popularidad && (
                <div className="flex justify-between">
                  <span>Popularidad:</span>
                  <span>{p.popularidad}</span>
                </div>
              )}
              {p.alcance && (
                <div className="flex justify-between">
                  <span>Alcance:</span>
                  <span>{p.alcance}</span>
                </div>
              )}
              {p.conversion && (
                <div className="flex justify-between">
                  <span>Conversión:</span>
                  <span>{p.conversion}</span>
                </div>
              )}
              {p.ratio && (
                <div className="flex justify-between">
                  <span>Ratio:</span>
                  <span>{p.ratio}</span>
                </div>
              )}
              {p.views && (
                <div className="flex justify-between">
                  <span>Views:</span>
                  <span>{p.views}</span>
                </div>
              )}
              {p.posts && (
                <div className="flex justify-between">
                  <span>Posts:</span>
                  <span>{p.posts}</span>
                </div>
              )}
              {p.total && (
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>{p.total}</span>
                </div>
              )}
              {p.fans && (
                <div className="flex justify-between">
                  <span>Fans:</span>
                  <span>{p.fans}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecuentoPlaylists() {
  const playlists = [
    { plataforma: "Spotify", editorial: "2", total: "20 MI" },
    { plataforma: "Apple Music", editorial: "N/A", total: "1" },
    { plataforma: "Deezer", editorial: "2", total: "3" },
    { plataforma: "Amazon Music", editorial: "1", total: "1" },
    { plataforma: "YouTube", editorial: "N/A", total: "N/A" },
  ];

  return (
    <div
      className="bg-gradient-to-br from-gray-900/60 to-purple-900/30 backdrop-blur shadow rounded-lg border border-purple-500/30"
      style={{ boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)" }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(90deg, #7C3AED 0%, #8B5CF6 100%)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                filter: "drop-shadow(0 0 4px rgba(139, 92, 246, 0.3))",
              }}
            >
              <span className="text-xl font-bold text-white">📋</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Recuento de Playlists
              </h3>
              <p className="text-purple-100">
                Última actualización: 12 jul 2025
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody className="">
                {playlists.map((playlist, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                      {playlist.plataforma}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {playlist.editorial}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {playlist.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function CancionesPrincipales() {
  const canciones = [
    {
      titulo: "PERREA KTM",
      fecha: "18 ago 2022",
      puntaje: 85.2,
      popularidad: 58,
      portada: "/perrea.png",
    },
    {
      titulo: "Apago",
      fecha: "9 ene 2020",
      puntaje: 63.8,
      popularidad: 36,
      publicaciones: 29,
      portada: "/apago.png",
    },
    {
      titulo: "Te Rajo",
      fecha: "1 feb 2024",
      puntaje: 68.4,
      popularidad: 43,
      portada: "/te_rajo.png",
    },
  ];

  return (
    <div
      className="bg-gradient-to-r from-gray-900/60 to-purple-900/50 text-white p-6 rounded-lg shadow border border-purple-500/30"
      style={{
        background:
          "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.15) 50%, rgba(124, 58, 237, 0.2) 100%)",
        boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Canciones Principales
          <span
            className="text-base cursor-help"
            style={{ color: "#6B7280" }}
            title="Canciones con mejor desempeño"
          >
            ℹ️
          </span>
        </h2>
        <button
          className="hover:underline text-sm transition-colors"
          style={{ color: "#8B5CF6" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#7C3AED";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#8B5CF6";
          }}
        >
          Ver Todo &raquo;
        </button>
      </div>

      {/* Lista horizontal */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {canciones.map((cancion, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[350px] bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-purple-800/40 rounded-xl overflow-hidden border border-purple-500/30 flex"
              style={{ boxShadow: "0 4px 16px rgba(139, 92, 246, 0.2)" }}
            >
              {/* Portada */}
              <div className="relative w-[100px] h-full">
                <Image
                  src={cancion.portada}
                  alt={cancion.titulo}
                  fill
                  className="object-cover"
                />
                {/* Botón play superpuesto */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                    ▶️
                  </div>
                </div>
              </div>

              {/* Detalles */}
              <div className="flex flex-col justify-between p-3 flex-1">
                <div>
                  <h4 className="text-purple-300 font-semibold text-sm hover:underline cursor-pointer hover:text-purple-200 transition-colors">
                    {cancion.titulo}
                  </h4>
                  <p className="text-xs text-gray-400 mb-1">
                    Fecha de Lanzamiento: {cancion.fecha}
                  </p>
                  <div className="text-xs space-y-1">
                    <p className="text-purple-300">
                      🔊 Puntaje de la Canción:{" "}
                      <span className="text-white">{cancion.puntaje}</span>
                    </p>
                    <p className="text-purple-400">
                      <span className="mr-1">🟢</span>Popularidad:{" "}
                      <span className="text-white">{cancion.popularidad}</span>
                    </p>
                    {cancion.publicaciones && (
                      <p className="text-purple-300">
                        <span className="mr-1">🎵</span>Publicaciones:{" "}
                        <span className="text-white">
                          {cancion.publicaciones}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UltimosLanzamientos() {
  const albums = [
    {
      titulo: "BB Bandia",
      fecha: "20 jun 2025",
      puntaje: 32,
      popularidad: "32/100",
      alcance: "159 MI",
      portada: "/bb_bandia.png",
    },
    {
      titulo: "Dedicatoria",
      fecha: "22 may 2025",
      puntaje: 32,
      popularidad: "32/100",
      alcance: "489,8 MI",
      portada: "/dedicatoria.png",
    },
    {
      titulo: "Te Rajo",
      fecha: "1 feb 2024",
      puntaje: 29,
      popularidad: "29/100",
      alcance: "89,2 MI",
      portada: "/te_rajo.png",
    },
    {
      titulo: "Apago",
      fecha: "9 ene 2020",
      puntaje: 23,
      popularidad: "23/100",
      alcance: "111,3 MI",
      portada: "/apago.png",
    },
  ];

  return (
    <div
      className="bg-gradient-to-br from-gray-900/60 to-purple-900/40 text-white p-6 rounded-lg shadow border border-purple-500/30"
      style={{
        background:
          "linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(99, 102, 241, 0.15) 50%, rgba(139, 92, 246, 0.2) 100%)",
        boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Álbumes</h2>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Últimos lanzamientos
          </p>
        </div>
        <button
          className="hover:underline text-sm transition-colors"
          style={{ color: "#8B5CF6" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#7C3AED";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#8B5CF6";
          }}
        >
          Ver Todo &raquo;
        </button>
      </div>

      {/* Último lanzamiento */}
      <div className="mb-8">
        <div
          className="bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-purple-800/30 rounded-lg p-4 flex gap-4 items-center border border-purple-500/30"
          style={{ boxShadow: "0 4px 16px rgba(139, 92, 246, 0.15)" }}
        >
          <div className="w-24 h-24 relative">
            <Image
              src="/bb_bandia.png"
              alt="BB Bandia"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="text-purple-200 font-semibold text-lg">BB Bandia</h4>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Fecha de Lanzamiento: 20 jun 2025
            </p>
            <div className="mt-2 text-xs space-y-1">
              <p>
                Puntaje:{" "}
                <span className="text-purple-300">{albums[0].puntaje}</span>
              </p>
              <p>
                Popularidad:{" "}
                <span className="text-purple-300">{albums[0].popularidad}</span>
              </p>
              <p>
                Alcance de Playlists:{" "}
                <span className="text-purple-300">{albums[0].alcance}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Carrusel horizontal */}
      <div className="overflow-x-auto">
        <div className="flex gap-6">
          {albums.map((album, index) => (
            <div
              key={index}
              className="min-w-[200px] bg-gradient-to-br from-purple-900/30 to-indigo-800/20 border border-purple-500/30 rounded-lg p-3 flex-shrink-0"
              style={{ boxShadow: "0 4px 8px rgba(139, 92, 246, 0.1)" }}
            >
              <div className="w-full aspect-square mb-3 relative">
                <Image
                  src={album.portada}
                  alt={album.titulo}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              <h4 className="text-purple-300 font-semibold">{album.titulo}</h4>
              <p className="text-sm text-gray-400 mb-2">{album.fecha}</p>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Puntaje:</span>
                  <span className="text-purple-200">{album.puntaje}</span>
                </div>
                <div className="flex justify-between">
                  <span>Popularidad:</span>
                  <span className="text-purple-200">{album.popularidad}</span>
                </div>
                <div className="flex justify-between">
                  <span>Alcance:</span>
                  <span className="text-purple-200">{album.alcance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const {
    data: rawArtistData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["artist-data"],
    queryFn: () => fetchArtistData(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />;
  }

  if (!rawArtistData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-gray-400">No se encontraron datos del artista</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Profile Section */}
      <NoissProfile />

      {/* Metrics Overview */}
      <MovimientosMetricas />

      {/* Rankings and Milestones Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TopRecentMilestones />
        <RankingChartmetric />
      </div>

      {/* Audience Summary */}
      <ResumenAudiencia />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="col-span-2">
          {/* Platform Statistics */}
          <EstadisticasPlataformas />
        </div>

        {/* Playlist Counts */}
        <RecuentoPlaylists />
      </div>

      {/* Top Songs */}
      <CancionesPrincipales />

      {/* Recent Releases */}
      <UltimosLanzamientos />
    </div>
  );
}
