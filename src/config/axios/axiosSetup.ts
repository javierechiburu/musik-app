// Archivo para inicializar todos los interceptors de axios
// Importar este archivo en _app.tsx o layout.tsx para activar los interceptors

import "./requestInterceptor";
import "./responseInterceptor";

// Función para inicializar configuración de axios
export const initializeAxios = () => {
  console.log("Axios interceptors initialized");
  
  // Configuraciones adicionales si es necesario
  return true;
};

// Exportar la instancia configurada
export { axiosInstance } from "./axiosInstance";