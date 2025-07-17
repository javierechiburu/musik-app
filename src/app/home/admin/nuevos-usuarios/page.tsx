"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { obtenerNuevosUsuarios, verificarUsuario } from "@/apis/usuariosAPI";
import { LoadingSpinner } from "@/components/ui/Loadings";

interface Usuario {
  id: string;
  username: string;
  fullname: string;
  email: string;
  created_at: string;
  verified: boolean;
  role: string;
  auth_id: string;
}

export default function NuevosUsuariosPage() {
  const queryClient = useQueryClient();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [verifyingUserId, setVerifyingUserId] = useState<string | null>(null);
  const [slidingOutId, setSlidingOutId] = useState<string | null>(null);
  const [successAnimationId, setSuccessAnimationId] = useState<string | null>(null);
  
  // Estado local para manejar la lista de usuarios
  const [localUsuarios, setLocalUsuarios] = useState<Usuario[]>([]);

  const {
    data: usuarios,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["nuevos-usuarios"],
    queryFn: obtenerNuevosUsuarios,
    refetchInterval: 30000,
  });

  // Sincronizar estado local con los datos del servidor
  useEffect(() => {
    if (usuarios) {
      setLocalUsuarios(usuarios.filter((user: Usuario) => !user.verified));
    }
  }, [usuarios]);

  const verificarUsuarioMutation = useMutation({
    mutationFn: verificarUsuario,
    onMutate: (usuarioId: string) => {
      setVerifyingUserId(usuarioId);
    },
    onSuccess: async (data, usuarioId) => {
      // Mostrar animación de éxito con blur y texto VERIFICADO
      setSuccessAnimationId(usuarioId);
      await new Promise((res) => setTimeout(res, 800));
      
      // Iniciar animación de slide-out
      setSlidingOutId(usuarioId);
      setSuccessAnimationId(null);
      
      // Esperar a que termine la animación de slide-out
      await new Promise((res) => setTimeout(res, 700));
      
      // Remover usuario del estado local (animación fluida)
      setLocalUsuarios(prev => prev.filter(user => user.id !== usuarioId));
      
      // Limpiar estados de animación
      setVerifyingUserId(null);
      setSlidingOutId(null);
      
      // Actualizar datos del servidor en background
      queryClient.invalidateQueries({ queryKey: ["nuevos-usuarios"] });
      
      // Mostrar mensaje de éxito
      setModalMessage("Usuario verificado exitosamente");
      setShowSuccessModal(true);
    },
    onError: (error: any) => {
      setModalMessage(error.message || "Error al verificar usuario");
      setShowErrorModal(true);
      setVerifyingUserId(null);
      setSlidingOutId(null);
      setSuccessAnimationId(null);
    },
  });

  const handleVerificarUsuario = (usuarioId: string) => {
    verificarUsuarioMutation.mutate(usuarioId);
  };

  // Función para obtener las clases de animación de fila
  const getRowAnimationClasses = (usuario: Usuario) => {
    const isSliding = slidingOutId === usuario.id;
    const isVerifying = verifyingUserId === usuario.id;
    const isSuccessAnimating = successAnimationId === usuario.id;

    return {
      base: "transition-all duration-500 ease-in-out relative overflow-hidden",
      transform: isSliding 
        ? 'transform translate-x-full opacity-0 scale-95 max-h-0' 
        : 'transform translate-x-0 opacity-100 scale-100 max-h-96',
      background: isSuccessAnimating
        ? 'bg-green-400/20 border-green-400/30 shadow-xl shadow-green-400/20'
        : isVerifying && !isSliding
          ? 'bg-green-500/10 border-green-500/20 shadow-lg shadow-green-500/10'
          : 'hover:bg-gray-700/30',
      transition: isSliding 
        ? 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms cubic-bezier(0.4, 0, 0.2, 1), max-height 400ms ease-in 200ms'
        : 'background-color 200ms ease-in-out, box-shadow 200ms ease-in-out, transform 200ms ease-in-out'
    };
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-red-400">Error al cargar usuarios</h3>
                <p className="text-gray-300">No se pudieron cargar los usuarios. Intenta refrescar la página.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gray-800/50 rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-700/50 border-b border-gray-600">
            <h2 className="text-lg font-semibold text-white">Solicitudes de Pre-registro</h2>
          </div>

          {localUsuarios && localUsuarios.length > 0 ? (
            <div className="overflow-x-auto">
              <div className="overflow-hidden">
                <table className="w-full table-fixed">
                <thead className="bg-gray-700/30">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Usuario</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha Solicitud</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 relative">
                  {localUsuarios.map((usuario: Usuario) => {
                    const animationClasses = getRowAnimationClasses(usuario);
                    const isSliding = slidingOutId === usuario.id;
                    const isVerifying = verifyingUserId === usuario.id;
                    const isSuccessAnimating = successAnimationId === usuario.id;
                    
                    return (
                    <tr
                      key={usuario.id}
                      className={`${animationClasses.base} ${animationClasses.transform} ${animationClasses.background}`}
                      style={{ transition: animationClasses.transition }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{usuario.fullname}</div>
                        <div className="text-sm text-gray-400">@{usuario.username}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{usuario.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{formatearFecha(usuario.created_at)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`
                          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-300
                          ${isSuccessAnimating || isSliding
                            ? "bg-green-200 text-green-900 font-bold animate-pulse"
                            : isVerifying && !isSliding
                              ? "bg-green-200 text-green-900 animate-pulse"
                              : usuario.verified 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                          }
                        `}>
                          {(isSuccessAnimating || isSliding) 
                            ? "VERIFICADO" 
                            : isVerifying && !isSliding 
                              ? "Verificando..." 
                              : usuario.verified 
                                ? "Verificado" 
                                : "No Verificado"
                          }
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {usuario.verified ? (
                          <span className="text-gray-400">-</span>
                        ) : (
                          <button
                            onClick={() => handleVerificarUsuario(usuario.id)}
                            disabled={verifyingUserId === usuario.id}
                            className={`
                              inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md 
                              transition-all duration-200 transform
                              ${isVerifying
                                ? 'bg-green-500 text-white scale-105 shadow-lg shadow-green-500/25'
                                : 'bg-green-600 hover:bg-green-700 hover:scale-105 text-white'
                              }
                              disabled:opacity-50 disabled:cursor-not-allowed
                            `}
                          >
                            {verifyingUserId === usuario.id ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Verificando...
                              </>
                            ) : (
                              <>
                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Verificar
                              </>
                            )}
                          </button>
                        )}
                      </td>
                      
                    </tr>
                    );
                  })}
                </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="mt-4 text-lg text-gray-400">No hay usuarios pendientes</p>
              <p className="text-sm text-gray-500">Las nuevas solicitudes aparecerán aquí</p>
            </div>
          )}
        </div>
      </div>
      {/* Modales... (sin cambios) */}
    </div>
  );
}
