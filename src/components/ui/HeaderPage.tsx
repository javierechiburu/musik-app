"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface HeaderPageProps {
  children: ReactNode;
  backgroundImage?: string;
  overlayColor?: "blue" | "purple" | "green" | "red" | "yellow" | "cyan" | "pink" | "indigo" | "hero";
  className?: string;
  height?: "sm" | "md" | "lg" | "xl";
}

const overlayColorMap = {
  blue: "from-purple-900/70 via-indigo-600/60 to-purple-800/70",
  purple: "from-purple-900/20 via-purple-600/20 to-purple-700/20", 
  green: "from-purple-800/70 via-purple-500/60 to-purple-600/70",
  red: "from-purple-700/70 via-purple-600/50 to-purple-800/70",
  yellow: "from-purple-600/70 via-purple-500/50 to-purple-700/70",
  cyan: "from-purple-800/70 via-purple-600/50 to-purple-900/70",
  pink: "from-purple-700/20 via-pink-500/20 to-purple-800/20",
  indigo: "from-purple-900/70 via-purple-600/50 to-purple-800/70",
  hero: "from-purple-600/90 via-purple-700/80 to-purple-800/90",
  fader: "from-purple-900/80 via-purple-600/60 to-purple-700/70",
};

const heightMap = {
  sm: "min-h-[80px]",
  md: "min-h-[120px]",
  lg: "min-h-[160px]",
  xl: "min-h-[200px]",
};

export default function HeaderPage({
  children,
  backgroundImage = "/FADER-1920X1080.jpg",
  overlayColor = "blue",
  className = "",
  height = "md",
}: HeaderPageProps) {
  const overlayGradient = overlayColorMap[overlayColor];
  const headerHeight = heightMap[height];

  return (
    <div 
      className={`relative rounded-lg p-6 border shadow mb-6 overflow-hidden ${headerHeight} ${className}`}
      style={{
        borderColor: 'rgba(139, 92, 246, 0.2)',
        boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.1), 0 2px 4px -1px rgba(139, 92, 246, 0.06)',
      }}
    >
      {/* Imagen de fondo */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt="Background texture"
          fill
          className="object-cover opacity-20"
          priority
        />
      )}
      
      {/* Overlay con gradiente púrpura hero */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r ${overlayGradient}`}
        style={{
          background: overlayColor === 'hero' ? 
            'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)' : 
            undefined
        }}
      ></div>
      
      {/* Contenido personalizable */}
      <div className="relative z-10 h-full flex items-center">
        {children}
      </div>
    </div>
  );
}

// Componente auxiliar para el icono del header
interface HeaderIconProps {
  children: ReactNode;
  colorGradient?: string;
  size?: "sm" | "md" | "lg";
}

const iconSizeMap = {
  sm: "w-12 h-12",
  md: "w-16 h-16", 
  lg: "w-20 h-20",
};

export function HeaderIcon({ 
  children, 
  colorGradient = "from-purple-500 to-purple-600",
  size = "md" 
}: HeaderIconProps) {
  const iconSize = iconSizeMap[size];
  
  return (
    <div 
      className={`${iconSize} bg-gradient-to-r ${colorGradient} rounded-lg flex items-center justify-center shadow-lg`}
      style={{
        background: 'linear-gradient(145deg, #A78BFA 0%, #8B5CF6 100%)',
        boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.3), 0 2px 4px -1px rgba(139, 92, 246, 0.15)',
        filter: 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.3))'
      }}
    >
      {children}
    </div>
  );
}

// Componente auxiliar para botones del header
interface HeaderButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  className?: string;
}

const buttonVariantMap = {
  primary: "bg-purple-600 hover:bg-purple-700",
  secondary: "bg-purple-100 hover:bg-purple-200 text-purple-700",
  success: "bg-green-600 hover:bg-green-700",
  warning: "bg-yellow-600 hover:bg-yellow-700",
  danger: "bg-red-600 hover:bg-red-700",
};

export function HeaderButton({ 
  children, 
  onClick, 
  variant = "primary",
  className = "" 
}: HeaderButtonProps) {
  const buttonStyles = buttonVariantMap[variant];
  
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 ${buttonStyles} text-white rounded-lg transition-all duration-200 text-sm flex items-center space-x-2 shadow-lg backdrop-blur-sm hover:scale-105 ${className}`}
      style={{
        background: variant === 'primary' ? 
          'linear-gradient(90deg, #7C3AED 0%, #8B5CF6 100%)' : 
          undefined,
        borderColor: variant === 'secondary' ? 
          'rgba(139, 92, 246, 0.3)' : 
          undefined,
        boxShadow: variant === 'primary' ? 
          '0 4px 6px -1px rgba(139, 92, 246, 0.2), 0 2px 4px -1px rgba(139, 92, 246, 0.1)' : 
          '0 2px 4px -1px rgba(139, 92, 246, 0.1)'
      }}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(139, 92, 246, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(139, 92, 246, 0.2), 0 2px 4px -1px rgba(139, 92, 246, 0.1)';
        }
      }}
    >
      {children}
    </button>
  );
}