"use client";

import { createContext, useContext, ReactNode } from 'react';
import { faderTheme } from '@/styles/theme';

interface ThemeContextType {
  theme: typeof faderTheme;
  colors: typeof faderTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const value = {
    theme: faderTheme,
    colors: faderTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div 
        className="min-h-screen"
        style={{
          background: faderTheme.gradients.background,
          color: faderTheme.text.primary,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Hook para usar colores fácilmente
export function useFaderColors() {
  const { colors } = useTheme();
  return {
    // Shortcuts para colores comunes
    primary: colors.primary[500],
    primaryDark: colors.primary[600],
    primaryLight: colors.primary[400],
    accent: colors.accent,
    bg: colors.background,
    text: colors.text,
    border: colors.border,
    gradients: colors.gradients,
    
    // Función helper para obtener transparencia
    withOpacity: (color: string, opacity: number) => `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
    
    // Gradientes predefinidos
    getGradient: (type: keyof typeof colors.gradients) => colors.gradients[type],
  };
}