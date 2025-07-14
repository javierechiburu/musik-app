// 🟣 NUEVA PALETA PÚRPURA VIBRANTE - Dashboard Musical
export const purpleTheme = {
  // COLORES PRINCIPALES PÚRPURA
  primary: {
    50: "#FAFAFF", // Blanco con tinte púrpura
    100: "#F3F0FF", // Púrpura ultra claro
    200: "#EDE9FE", // Púrpura muy claro para backgrounds
    300: "#DDD6FE", // Púrpura claro
    400: "#C4B5FD", // Púrpura medio claro
    500: "#A78BFA", // Púrpura claro para hovers
    600: "#8B5CF6", // Púrpura vibrante principal
    700: "#7C3AED", // Púrpura profundo para acentos
    800: "#6D28D9", // Púrpura muy profundo
    900: "#5B21B6", // Púrpura ultra profundo
  },

  // COLORES DE APOYO - MODO OSCURO CON ACENTOS PÚRPURA
  background: {
    primary: "#0F0D1A", // Background oscuro principal
    secondary: "#1A1625", // Background secundario
    tertiary: "#2A2439", // Background terciario
    card: "rgba(139, 92, 246, 0.1)", // Card background con tinte púrpura
    cardHover: "rgba(139, 92, 246, 0.15)", // Card hover más intenso
    accent: "rgba(139, 92, 246, 0.05)", // Background muy sutil
  },

  // BORDES Y DIVISORES
  border: {
    light: "rgba(139, 92, 246, 0.1)", // Muy sutil
    default: "rgba(139, 92, 246, 0.2)", // Default
    medium: "rgba(139, 92, 246, 0.3)", // Medio
    strong: "rgba(139, 92, 246, 0.4)", // Fuerte
    accent: "#C4B5FD", // Accent border
  },

  // TEXTOS - MODO OSCURO
  text: {
    primary: "#F8FAFC", // Blanco principal para fondos oscuros
    secondary: "#E2E8F0", // Blanco secundario
    muted: "#94A3B8", // Gris claro para fondos oscuros
    accent: "#8B5CF6", // Púrpura para links
    light: "#CBD5E1", // Gris muy claro
    white: "#FFFFFF", // Blanco puro
    purple: {
      light: "#C4B5FD", // Púrpura claro para textos
      main: "#A78BFA", // Púrpura medio
      dark: "#8B5CF6", // Púrpura principal
      darker: "#7C3AED", // Púrpura profundo
    },
  },

  // GRADIENTES PRINCIPALES
  gradients: {
    hero: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)",
    card: "linear-gradient(145deg, #A78BFA 0%, #8B5CF6 100%)",
    button: "linear-gradient(90deg, #7C3AED 0%, #8B5CF6 100%)",
    accent: "linear-gradient(45deg, #C4B5FD 0%, #A78BFA 100%)",
    soft: "linear-gradient(135deg, #F3F0FF 0%, #EDE9FE 100%)",
    glow: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)",
  },

  // COLORES DE ESTADO (mantener algunos originales para UX)
  states: {
    success: "#10B981", // Verde para métricas positivas
    warning: "#F59E0B", // Naranja para advertencias
    error: "#EF4444", // Rojo para errores
    info: "#8B5CF6", // Púrpura principal para info
  },

  // SOMBRAS PÚRPURA
  shadows: {
    sm: "0 1px 2px 0 rgba(139, 92, 246, 0.05)",
    default:
      "0 4px 6px -1px rgba(139, 92, 246, 0.1), 0 2px 4px -1px rgba(139, 92, 246, 0.06)",
    md: "0 4px 6px -1px rgba(139, 92, 246, 0.1), 0 2px 4px -1px rgba(139, 92, 246, 0.06)",
    lg: "0 10px 15px -3px rgba(139, 92, 246, 0.2), 0 4px 6px -2px rgba(139, 92, 246, 0.1)",
    xl: "0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)",
    glow: "0 0 20px rgba(139, 92, 246, 0.1)",
    glowMedium: "0 0 20px rgba(139, 92, 246, 0.2)",
    glowStrong: "0 0 30px rgba(139, 92, 246, 0.3)",
    focus: "0 0 0 3px rgba(139, 92, 246, 0.2)",
  },

  // EFECTOS HOVER Y FOCUS
  effects: {
    cardHover: {
      background: "rgba(139, 92, 246, 0.1)",
      borderColor: "rgba(139, 92, 246, 0.3)",
      transform: "translateY(-2px)",
      boxShadow:
        "0 10px 15px -3px rgba(139, 92, 246, 0.2), 0 4px 6px -2px rgba(139, 92, 246, 0.1)",
    },
    buttonHover: {
      transform: "scale(1.02)",
      boxShadow: "0 8px 16px rgba(139, 92, 246, 0.2)",
    },
    iconGlow: "drop-shadow(0 0 4px rgba(139, 92, 246, 0.3))",
  },
};

// Utilidades para Tailwind - Nueva Paleta Púrpura
export const purpleTailwindColors = {
  purple: {
    50: "#FAFAFF",
    100: "#F3F0FF",
    200: "#EDE9FE",
    300: "#DDD6FE",
    400: "#C4B5FD",
    500: "#A78BFA",
    600: "#8B5CF6",
    700: "#7C3AED",
    800: "#6D28D9",
    900: "#5B21B6",
  },
  "purple-bg": "rgba(139, 92, 246, 0.05)",
  "purple-border": "rgba(139, 92, 246, 0.2)",
  "purple-accent": "#8B5CF6",
  "purple-deep": "#7C3AED",
  "purple-light": "#A78BFA",
  "purple-ultra-light": "#EDE9FE",
  "background-tint": "#FAFAFF",
};

// CSS Variables para fácil implementación
export const purpleCSSVariables = `
:root {
  /* Colores principales */
  --primary: #8B5CF6;
  --primary-dark: #7C3AED;
  --primary-light: #A78BFA;
  --primary-ultra-light: #EDE9FE;
  
  /* Backgrounds */
  --background: #FAFAFF;
  --card-bg: rgba(139, 92, 246, 0.05);
  --card-hover-bg: rgba(139, 92, 246, 0.1);
  
  /* Bordes */
  --border: rgba(139, 92, 246, 0.2);
  --border-hover: rgba(139, 92, 246, 0.3);
  
  /* Textos */
  --text-primary: #1F2937;
  --text-secondary: #6B7280;
  --text-accent: #8B5CF6;
  
  /* Gradientes */
  --gradient-hero: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%);
  --gradient-card: linear-gradient(145deg, #A78BFA 0%, #8B5CF6 100%);
  --gradient-button: linear-gradient(90deg, #7C3AED 0%, #8B5CF6 100%);
  --gradient-accent: linear-gradient(45deg, #C4B5FD 0%, #A78BFA 100%);
  
  /* Sombras */
  --shadow-default: 0 4px 6px -1px rgba(139, 92, 246, 0.1), 0 2px 4px -1px rgba(139, 92, 246, 0.06);
  --shadow-hover: 0 10px 15px -3px rgba(139, 92, 246, 0.2), 0 4px 6px -2px rgba(139, 92, 246, 0.1);
  --shadow-glow: 0 0 20px rgba(139, 92, 246, 0.1);
  --shadow-focus: 0 0 0 3px rgba(139, 92, 246, 0.2);
}
`;

// Exportar tema principal (reemplaza faderTheme)
export const faderTheme = purpleTheme;
export const faderTailwindColors = purpleTailwindColors;

export default purpleTheme;
