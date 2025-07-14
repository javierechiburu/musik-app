"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/config/clsx/clsxMerge";

const analyticsMenuItems = [
  {
    name: "Analitica y Métricas",
    href: "/home",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    name: "Mi perfil",
    href: "/home/perfil",
    icon: (
      <svg
        className="w-5 h-5"
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
    ),
  },
  {
    name: "Mis Canciones",
    href: "/home/canciones",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
        />
      </svg>
    ),
  },
  {
    name: "Mi Equipo Marketing",
    href: "/home/equipo-marketing",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
      </svg>
    ),
  },
];

const userMenuItems = [
  {
    name: "Mi Billetera",
    href: "/home/mi-billetera",
    icon: (
      <svg
        className="w-5 h-5 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>
    ),
  },
  {
    name: "Mi Distribución",
    href: "/home/mi-distribucion",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    name: "Mis Lanzamientos",
    href: "/home/mis-lanzamientos",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
        />
      </svg>
    ),
  },
  {
    name: "Mi Marketing",
    href: "/home/mi-marketing",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
        />
      </svg>
    ),
  },
];

const adminMenuItems = [
  {
    name: "Registrar",
    href: "/home/admin/registrar",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
        />
      </svg>
    ),
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('logged_in_user_role');
    setUserRole(role);
  }, []);

  return (
    <>
      {/* Mobile overlay - only show on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`overflow-y-auto bg-violet-950/20
        fixed top-0 left-0 h-full w-64 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:block
      `}
        style={{
          borderRight: "1px solid rgba(139, 92, 246, 0.3)",
          boxShadow: "4px 0 20px rgba(139, 92, 246, 0.15)",
        }}
      >
        <div
          className="p-6"
          style={{ borderBottom: "1px solid rgba(139, 92, 246, 0.2)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <Image
                src="/FADER_LOGO.svg"
                width={200}
                height={80}
                alt="logo fader"
                className="invert"
              />
              <p>Contenido Musical</p>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg transition-all duration-200"
              style={{ color: "#8B5CF6" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#7C3AED";
                e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#8B5CF6";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <nav className="mt-6 flex-1 overflow-y-auto">
          {/* Admin Section - Only show for admin users */}
          {userRole === 'admin' && (
            <div className="px-3 mb-6">
              <div
                className="flex items-center mb-3 px-3 py-2 rounded-lg"
                style={{
                  background: "rgba(34, 197, 94, 0.05)",
                  border: "1px solid rgba(34, 197, 94, 0.2)",
                }}
              >
                <svg
                  className="w-4 h-4 mr-2 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <h3
                  className="text-xs font-semibold uppercase tracking-wider text-green-400"
                >
                  ADMIN
                </h3>
              </div>
              {adminMenuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center px-3 py-3 mb-1 rounded-lg transition-all duration-300 group relative",
                      {
                        // Estilos cuando está activo
                        "bg-green-500 text-white shadow-md shadow-green-500/30":
                          isActive,

                        // Estilos cuando NO está activo
                        "text-white hover:bg-green-500/10 hover:text-green-500 hover:border-l-4 hover:border-green-500":
                          !isActive,
                      }
                    )}
                  >
                    <span
                      className={cn("mr-3 transition-colors duration-300", {
                        "text-green-300": isActive,
                      })}
                    >
                      {item.icon}
                    </span>

                    <span className="font-medium text-sm">{item.name}</span>

                    {isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Analytics Section */}
          <div className="px-3 mb-6">
            <div
              className="flex items-center mb-3 px-3 py-2 rounded-lg"
              style={{
                background: "rgba(139, 92, 246, 0.05)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
              }}
            >
              <svg
                className="w-4 h-4 mr-2"
                style={{ color: "#8B5CF6" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <h3
                className="text-xs font-semibold uppercase tracking-wider text-violet-300"
              >
                Analytics
              </h3>
            </div>
            {analyticsMenuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center px-3 py-3 mb-1 rounded-lg transition-all duration-300 group relative",
                    {
                      // Estilos cuando está activo
                      "bg-violet-600 text-white shadow-md shadow-violet-500/30":
                        isActive,

                      // Estilos cuando NO está activo
                      "text-white hover:bg-violet-500/10 hover:text-violet-500 hover:border-l-4 hover:border-violet-500":
                        !isActive,
                    }
                  )}
                >
                  <span
                    className={cn("mr-3 transition-colors duration-300", {
                      "text-violet-300": isActive,
                    })}
                  >
                    {item.icon}
                  </span>

                  <span className="font-medium text-sm">{item.name}</span>

                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Section */}
          <div className="px-3">
            <div
              className="flex items-center mb-3 px-3 py-2 rounded-lg"
              style={{
                background: "rgba(139, 92, 246, 0.05)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
              }}
            >
              <svg
                className="w-4 h-4 mr-2 text-pink-400"
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
              <h3
                className="text-xs font-semibold uppercase tracking-wider text-pink-400"
              >
                Mi Cuenta
              </h3>
            </div>
            {userMenuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center px-3 py-3 mb-1 rounded-lg transition-all duration-300 group relative",
                    {
                      // Estilos cuando está activo
                      "bg-pink-500 text-white shadow-md shadow-pink-500/30":
                        isActive,

                      // Estilos cuando NO está activo
                      "text-white hover:bg-pink-500/10 hover:text-pink-500 hover:border-l-4 hover:border-pink-500":
                        !isActive,
                    }
                  )}
                >
                  <span
                    className={cn("mr-3 transition-colors duration-300", {
                      "text-violet-300": isActive,
                    })}
                  >
                    {item.icon}
                  </span>

                  <span className="font-medium text-sm">{item.name}</span>

                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  )}
                </Link>

              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
