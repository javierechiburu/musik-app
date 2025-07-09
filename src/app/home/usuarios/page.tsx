export default function UsuariosPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          Configuración de Usuarios
        </h2>
        <p className="text-gray-400 mb-6">
          Gestiona usuarios y permisos de acceso al panel de analytics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de usuarios */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Usuarios del Sistema
            </h3>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Agregar Usuario
            </button>
          </div>

          <div className="space-y-4">
            {[
              { name: "Admin Principal", email: "admin@musicanalytics.com", role: "Administrador", status: "Activo" },
              { name: "Analista Senior", email: "analyst@musicanalytics.com", role: "Analista", status: "Activo" },
              { name: "Usuario Demo", email: "demo@musicanalytics.com", role: "Visualizador", status: "Inactivo" },
            ].map((user, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-300">{user.role}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === "Activo" 
                      ? "bg-green-900/20 text-green-400" 
                      : "bg-red-900/20 text-red-400"
                  }`}>
                    {user.status}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-600 rounded">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel de configuración */}
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Configuración General
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Permisos por Defecto
              </label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white">
                <option>Visualizador</option>
                <option>Analista</option>
                <option>Administrador</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Expiración de Sesión
              </label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white">
                <option>1 hora</option>
                <option>4 horas</option>
                <option>8 horas</option>
                <option>24 horas</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Autenticación 2FA</span>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Notificaciones Email</span>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
              </button>
            </div>

            <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors mt-6">
              Guardar Configuración
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}